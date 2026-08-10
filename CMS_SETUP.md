# Connecting the CMS to the Touchmark website

How the two projects fit together, how to run them, and how to publish. For the
reasoning behind the design, see [CMS_INTEGRATION_GUIDE.md](CMS_INTEGRATION_GUIDE.md).

| | |
|---|---|
| **Website** | `C:\Projects\touchmark_website` — Next.js 16 |
| **CMS** | `C:\Projects\cms` — NestJS API + React admin portal |

---

## 1. How the connection works

```
 Editor ──▶ Admin portal ──▶ Admin API ──▶ PostgreSQL
 (browser)   :5173            :4000          :5433 (dev) / Neon (prod)
                                │
                                │  Delivery API, read-only, API key
                                ▼
                        services/cms.ts ──▶ Next.js pages
                                                  ▲
                                │  content.published webhook
                                └──▶ /api/revalidate ──┘
```

Three things to hold onto:

1. **The website never talks to the database.** It reads the Delivery API
   (`/v1/…`) with a secret API key, server-side only.
2. **All CMS access goes through `services/cms.ts`.** The `preventDirectAPICalls`
   rule in `.oes.config.json` forbids `fetch` in `app/` and `components/`.
3. **Publishing does not require a deploy.** The CMS calls `/api/revalidate`, the
   site drops its cache for the `cms` tag and re-fetches. The 5-minute
   `revalidate` is only a backstop if that call is ever missed.

### What lives in the CMS

| Content | Type `api_id` | Route |
|---|---|---|
| 46 blog articles | `blog_post` | `/blog`, `/blog/articles/<slug>`, `/blog/tag/<slug>` |
| 3 case studies | `case_study` | `/case-study?id=N` |

The homepage "Recent Blogs" section also reads `blog_post`. Service and industry
pages are deliberately *not* in the CMS — bespoke layout, rarely edited.

---

## 2. Running it locally

### 2.1 Start the CMS

From `C:\Projects\cms`:

```bash
npm install
```

```bash
npm run db:up
```

Postgres on **5433** (not 5432) and Mailhog on 8025.

First time only — create the schema, policies and seed data:

```bash
npm run build --workspace @cms/shared && npm run db:migrate --workspace @cms/api && npm run db:rls --workspace @cms/api && npm run db:seed --workspace @cms/api
```

Then, in two terminals:

```bash
npm run dev --workspace @cms/api
```

```bash
npm run dev --workspace @cms/admin
```

Check <http://localhost:4000/v1/health> returns `{"status":"ok","database":"ok"}`.

Sign in at <http://localhost:5173> as `owner@example.test` / `development-password-1`.

> **`C:\Projects\cms\.env` must point at the local Docker database in development.**
> Pointing it at Neon makes every click in the portal a production write, and the
> seeded accounts above do not exist there. The correct dev values, and the
> production ones, are both recorded in that file.

### 2.2 Start the website

From `C:\Projects\touchmark_website`, copy the template and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Where it comes from |
|---|---|
| `CMS_API_URL` | `http://localhost:4000`, no trailing slash |
| `CMS_API_KEY` | §2.3 below |
| `CMS_WEBHOOK_SECRET` | §2.4 below |
| `CMS_WORKSPACE_ID` | Site settings in the portal, or the URL. Scripts only |

```bash
npm run dev
```

`.env.local` is gitignored. **Never** rename these to `NEXT_PUBLIC_…` — that
prefix inlines the value into the browser bundle and leaks the key.

### 2.3 Get a Delivery API key

Portal → the site → **API keys** → Create:

- **Type** `secret` — the website reads during build and ISR, where there is no
  browser origin to allowlist
- **Environment** `test` for local, `live` for production
- **Scopes** `content.read`, `media.read`, `search.read`
- **Allowed IPs** empty — Vercel's build IPs are not stable

The `sk_…` value is shown **once**. If you lose it, use **Rotate**, not Revoke:
rotation issues a replacement and keeps the old key working through a grace
window.

Verify it:

```bash
curl -H "Authorization: Bearer sk_test_..." http://localhost:4000/v1/me
```

401 means the key is wrong. 403 means the scopes are.

### 2.4 Wire up instant publishing

Portal → the site → **Webhooks** → Add endpoint:

- **URL** `https://touchmarkdes.com/api/revalidate` (production) — the CMS
  rejects `localhost`, so for local testing expose the site with ngrok and use
  that URL
- **Events** `content.published`, `content.unpublished`, `content.updated`

Copy the `whsec_…` secret into `CMS_WEBHOOK_SECRET`. Use **Send test** and check
the delivery log shows a 200.

Without this the site still updates, just up to 5 minutes later.

---

## 3. Publishing

1. Portal → Content → Blog Post → **New entry**
2. Fill in Title, Excerpt, Body, Card Image, Tag Name, Tag Slug
3. **Publish**

The article appears at `/blog/articles/<slug>` within seconds of the webhook, and
on `/blog`, `/blog/tag/<slug>` and the homepage. No code change, no deploy.

`Body` holds **HTML**, not rich text — the CMS's rich-text editor is currently a
raw JSON textarea and the Delivery API has no HTML renderer for it. See §3.1 of
the integration guide.

Unpublishing an entry makes its page 404. Drafts are never visible through the
Delivery API.

### Fields worth knowing

| Field | Notes |
|---|---|
| `card_image` | Thumbnail for index cards. Separate from `hero_image`, which is a media field needing an uploaded asset; the migrated posts point at existing paths |
| `tag_name` / `tag_slug` | This CMS build cannot link an entry to a taxonomy term, so the tag lives on the entry. `tag_slug` drives the `/blog/tag/<slug>` link |
| `read_time` | Optional. Left empty, the homepage estimates it from the body |
| `legacy_id` | Case studies only — the `?id=N` value, so old links keep resolving |

---

## 4. Re-running the imports

Both scripts are safe to re-run.

```bash
node --env-file=.env.local scripts/migrate-articles.mjs
```

```bash
node --env-file=.env.local scripts/migrate-case-studies.mjs
```

They print what they would do; add `--commit` to write. Articles skip slugs that
already exist; case studies update theirs in place.

They read the pre-CMS `.tsx` sources, which have since been deleted, so a re-run
needs those files restored from git first (`git show <commit>:<path>`).

---

## 5. Production

Vercel cannot host the CMS API — a NestJS process with a polling job worker needs
to stay alive.

| Component | Host |
|---|---|
| PostgreSQL | Neon |
| CMS API + portal | Render (**not** the free tier — it sleeps, which stops scheduled publishing) |
| Website | Vercel |
| Media | Cloudflare R2 or S3 (Render's disk is ephemeral) |

Render env, build and start commands are in §11.2 of the integration guide. On
Vercel set `CMS_API_URL`, `CMS_API_KEY` (an `sk_live_…` key) and
`CMS_WEBHOOK_SECRET`, then update the webhook URL to the production domain.

### The database rule that matters most

`DATABASE_URL` must use the **`cms_app`** role, never `neondb_owner`.
`neondb_owner` has `BYPASSRLS`, which switches off row-level security entirely —
silently, with no error. `cms_app` has been created on Neon and verified
`NOBYPASSRLS`. Re-check after any infrastructure change:

```sql
SELECT rolname, rolbypassrls FROM pg_roles WHERE rolname = 'cms_app';
```

It must report `f`. `DATABASE_URL` also needs `?pgbouncer=true&connection_limit=1`
on the pooled endpoint, and `DATABASE_ADMIN_URL` must use the **direct** endpoint
(no `-pooler`) because migrations issue DDL.

### First boot

A fresh production database has no users, so registration is open **once** — the
first person to hit `/register` becomes the platform Owner. Do that immediately
after deploying, before sharing the URL.

---

## 6. When something looks wrong

| Symptom | Cause |
|---|---|
| Build fails, `CMS 401` | Key wrong, revoked, or `.env.local` missing |
| Build fails, `CMS 403` | Key is missing a scope |
| Blog is empty | The CMS is pointed at the wrong database — check `C:\Projects\cms\.env` |
| A new article 404s | Not published, or the webhook did not arrive |
| Edits do not appear | Check the webhook delivery log. `rm -rf .next` clears a stale fetch cache locally |
| Webhook 401s | The body was parsed before the signature was verified — the raw bytes are what is signed |
| Portal login succeeds, then everything 401s | Portal and API on different origins; cookies are `SameSite=Lax` |
| Cross-tenant data visible | `DATABASE_URL` is on an owner or `BYPASSRLS` role |

Full endpoint reference, with the permission and error responses for each, is at
<http://localhost:4000/docs> while the API is running.
