/**
 * Diagnostics for the CMS connection, backing the /cms/health status page.
 *
 * Separate from `cms.ts` because the goals are opposite. `cms.ts` is the content
 * read path: it caches aggressively and throws on failure so a broken build fails
 * loudly. This module must never cache — a status page showing a five-minute-old
 * result is worse than no status page — and must never throw, because the whole
 * point is to render the failure.
 *
 * Server-side only. Nothing here returns a secret: the checks report whether a
 * value is configured and well-formed, never the value itself.
 */

const CMS_URL = process.env.CMS_API_URL;
const CMS_KEY = process.env.CMS_API_KEY;
const CMS_WEBHOOK_SECRET = process.env.CMS_WEBHOOK_SECRET;

/** The scopes `services/cms.ts` needs. A missing one surfaces as 403 at build time. */
const REQUIRED_SCOPES = ['content.read', 'media.read', 'search.read'] as const;

/** Render's free tier cold-starts; a probe is slow before it is broken. */
const PROBE_TIMEOUT_MS = 10_000;

export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface HealthCheck {
  /** Stable identifier, used as the React key. */
  id: string;
  label: string;
  status: CheckStatus;
  /** One line, safe to show publicly. Never contains a secret. */
  detail: string;
  /** Round-trip time for checks that made a request. */
  latencyMs?: number;
}

export interface CmsHealthReport {
  status: CheckStatus;
  checkedAt: string;
  /** Host only — the full URL is not sensitive, but the host reads better. */
  host: string | null;
  checks: HealthCheck[];
}

interface ProbeResult {
  ok: boolean;
  httpStatus: number | null;
  body: unknown;
  /** The CMS's machine-readable error code, e.g. `key_revoked`. */
  errorCode: string | null;
  errorMessage: string | null;
  latencyMs: number;
}

/**
 * One unauthenticated-or-authenticated GET against the CMS, never throwing.
 *
 * `cache: 'no-store'` is what makes this a live check. Without it Next would
 * serve the first result for the lifetime of the deployment.
 */
async function probe(path: string, withKey: boolean): Promise<ProbeResult> {
  const startedAt = Date.now();

  try {
    const response = await fetch(`${CMS_URL}${path}`, {
      headers: withKey ? { Authorization: `Bearer ${CMS_KEY}` } : {},
      cache: 'no-store',
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });

    const latencyMs = Date.now() - startedAt;
    const body: unknown = await response.json().catch(() => null);
    const error = readError(body);

    return {
      ok: response.ok,
      httpStatus: response.status,
      body,
      errorCode: error?.code ?? null,
      errorMessage: error?.message ?? null,
      latencyMs,
    };
  } catch (cause) {
    // DNS failure, TLS failure, or the 10s timeout. There is no HTTP status.
    return {
      ok: false,
      httpStatus: null,
      body: null,
      errorCode: cause instanceof Error && cause.name === 'TimeoutError' ? 'timeout' : 'unreachable',
      errorMessage: cause instanceof Error ? cause.message : String(cause),
      latencyMs: Date.now() - startedAt,
    };
  }
}

/** The CMS wraps every failure in `{ error: { code, message } }`. */
function readError(body: unknown): { code?: string; message?: string } | null {
  if (typeof body !== 'object' || body === null || !('error' in body)) return null;
  const error = (body as { error: unknown }).error;
  return typeof error === 'object' && error !== null ? (error as { code?: string; message?: string }) : null;
}

function get<T>(body: unknown, path: readonly string[]): T | undefined {
  let cursor: unknown = body;
  for (const segment of path) {
    if (typeof cursor !== 'object' || cursor === null) return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor as T | undefined;
}

/** "connection failed — key_revoked: This API key has been revoked." */
function describeFailure(result: ProbeResult): string {
  const status = result.httpStatus === null ? 'no response' : `HTTP ${result.httpStatus}`;
  const code = result.errorCode ? ` — ${result.errorCode}` : '';
  const message = result.errorMessage ? `: ${result.errorMessage}` : '';
  return `${status}${code}${message}`;
}

/** Environment variables, checked before any request so a typo is not reported as an outage. */
function checkConfiguration(): HealthCheck[] {
  const apiUrl: HealthCheck = CMS_URL
    ? {
        id: 'config-url',
        label: 'CMS_API_URL',
        status: CMS_URL.endsWith('/') ? 'warn' : 'pass',
        detail: CMS_URL.endsWith('/')
          ? `${CMS_URL} — remove the trailing slash; paths are appended directly`
          : CMS_URL,
      }
    : { id: 'config-url', label: 'CMS_API_URL', status: 'fail', detail: 'not set' };

  const apiKey: HealthCheck = !CMS_KEY
    ? { id: 'config-key', label: 'CMS_API_KEY', status: 'fail', detail: 'not set' }
    : !CMS_KEY.startsWith('sk_')
      ? {
          id: 'config-key',
          label: 'CMS_API_KEY',
          status: 'fail',
          // A pk_ key is publishable and origin-locked; server-side reads need a secret key.
          detail: 'set, but not a secret key — must begin with sk_live_ or sk_test_',
        }
      : {
          id: 'config-key',
          label: 'CMS_API_KEY',
          status: 'pass',
          detail: `set (${CMS_KEY.startsWith('sk_live_') ? 'live' : 'test'} secret key)`,
        };

  const webhookSecret: HealthCheck = !CMS_WEBHOOK_SECRET
    ? {
        id: 'config-webhook',
        label: 'CMS_WEBHOOK_SECRET',
        status: 'warn',
        // Warn, not fail: reads still work, only instant publishing is lost.
        detail: 'not set — /api/revalidate will reject every webhook, so edits appear only after the 5 minute cache expiry',
      }
    : {
        id: 'config-webhook',
        label: 'CMS_WEBHOOK_SECRET',
        status: CMS_WEBHOOK_SECRET.startsWith('whsec_') ? 'pass' : 'warn',
        detail: CMS_WEBHOOK_SECRET.startsWith('whsec_')
          ? 'set'
          : 'set, but does not look like a signing secret — expected a whsec_ prefix',
      };

  return [apiUrl, apiKey, webhookSecret];
}

/** `/v1/health` needs no key, so it separates "CMS is down" from "our key is bad". */
async function checkReachable(): Promise<HealthCheck> {
  const result = await probe('/v1/health', false);

  if (!result.ok) {
    return {
      id: 'reachable',
      label: 'CMS reachable',
      status: 'fail',
      detail: describeFailure(result),
      latencyMs: result.latencyMs,
    };
  }

  const database = get<string>(result.body, ['data', 'database']);
  const version = get<string>(result.body, ['data', 'version']);

  return {
    id: 'reachable',
    label: 'CMS reachable',
    // The API can answer while its database is unavailable — that is still degraded.
    status: database === 'ok' ? 'pass' : 'warn',
    detail: database === 'ok' ? `up, database ok${version ? `, v${version}` : ''}` : `up, but database reports "${database ?? 'unknown'}"`,
    latencyMs: result.latencyMs,
  };
}

/** `/v1/me` proves the key is live and reports what it may do. */
async function checkCredentials(): Promise<HealthCheck[]> {
  const result = await probe('/v1/me', true);

  if (!result.ok) {
    return [
      {
        id: 'auth',
        label: 'API key accepted',
        status: 'fail',
        detail: describeFailure(result),
        latencyMs: result.latencyMs,
      },
    ];
  }

  const scopes = get<string[]>(result.body, ['data', 'api_key', 'scopes']) ?? [];
  const environment = get<string>(result.body, ['data', 'api_key', 'environment']);
  const missing = REQUIRED_SCOPES.filter((scope) => !scopes.includes(scope));

  return [
    {
      id: 'auth',
      label: 'API key accepted',
      status: 'pass',
      detail: `authenticated${environment ? ` against the ${environment} environment` : ''}`,
      latencyMs: result.latencyMs,
    },
    {
      id: 'scopes',
      label: 'Scopes',
      status: missing.length === 0 ? 'pass' : 'fail',
      detail:
        missing.length === 0
          ? scopes.join(', ')
          : `missing ${missing.join(', ')} — those reads will fail with 403 insufficient_scope`,
    },
  ];
}

/** Each endpoint `services/cms.ts` actually calls, exercised the same way it calls them. */
async function checkDeliveryEndpoints(): Promise<HealthCheck[]> {
  const [content, media, search] = await Promise.all([
    probe('/v1/content/blog_post?limit=1&sort=-published_at', true),
    probe('/v1/media?limit=1', true),
    probe('/v1/search?q=touchmark&type=content&limit=1', true),
  ]);

  const publishedPosts = get<number>(content.body, ['meta', 'total']);

  return [
    {
      id: 'content',
      label: 'Published blog posts',
      status: !content.ok ? 'fail' : publishedPosts === 0 ? 'warn' : 'pass',
      detail: !content.ok
        ? describeFailure(content)
        : publishedPosts === 0
          ? 'readable, but no published posts — /blog will render empty'
          : `${publishedPosts} published`,
      latencyMs: content.latencyMs,
    },
    {
      id: 'media',
      label: 'Media library',
      status: media.ok ? 'pass' : 'fail',
      // Only entries using hero_image need this, so an empty library is normal.
      detail: media.ok ? `readable (${get<number>(media.body, ['meta', 'total']) ?? 0} assets)` : describeFailure(media),
      latencyMs: media.latencyMs,
    },
    {
      id: 'search',
      label: 'Search',
      status: search.ok ? 'pass' : 'fail',
      detail: search.ok ? 'readable' : describeFailure(search),
      latencyMs: search.latencyMs,
    },
  ];
}

/** The worst status wins: one failure makes the whole report a failure. */
function summarise(checks: HealthCheck[]): CheckStatus {
  if (checks.some((check) => check.status === 'fail')) return 'fail';
  if (checks.some((check) => check.status === 'warn')) return 'warn';
  return 'pass';
}

/**
 * Runs every check and returns a report. Never throws.
 *
 * When the URL or key is missing there is nothing to probe, so it returns the
 * configuration checks alone rather than reporting a string of misleading
 * connection failures.
 */
export async function checkCmsHealth(): Promise<CmsHealthReport> {
  const configuration = checkConfiguration();
  const host = CMS_URL ? safeHost(CMS_URL) : null;

  if (!CMS_URL || !CMS_KEY) {
    return {
      status: summarise(configuration),
      checkedAt: new Date().toISOString(),
      host,
      checks: configuration,
    };
  }

  const reachable = await checkReachable();

  // No point asking an unreachable host about scopes — it would just repeat the
  // same connection error four more times.
  if (reachable.status === 'fail') {
    const checks = [...configuration, reachable];
    return { status: summarise(checks), checkedAt: new Date().toISOString(), host, checks };
  }

  const [credentials, endpoints] = await Promise.all([checkCredentials(), checkDeliveryEndpoints()]);
  const checks = [...configuration, reachable, ...credentials, ...endpoints];

  return { status: summarise(checks), checkedAt: new Date().toISOString(), host, checks };
}

function safeHost(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
