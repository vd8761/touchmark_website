import type { CheckStatus, HealthCheck } from '@/services/cms-health';

/**
 * Colour is never the only signal — the glyph and the label carry the same
 * meaning, so the row still reads correctly in monochrome or to a screen reader.
 */
const PRESENTATION: Record<CheckStatus, { glyph: string; text: string; dot: string; label: string }> = {
  pass: { glyph: '✓', text: 'text-green-700', dot: 'bg-green-600', label: 'Pass' },
  warn: { glyph: '!', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Warning' },
  fail: { glyph: '✕', text: 'text-red-700', dot: 'bg-red-600', label: 'Fail' },
};

export function statusPresentation(status: CheckStatus) {
  return PRESENTATION[status];
}

export default function CmsHealthRow({ check }: { check: HealthCheck }) {
  const presentation = PRESENTATION[check.status];

  return (
    <li className="flex items-start gap-4 py-4 border-b border-gray-200">
      <span
        className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${presentation.dot}`}
        aria-hidden="true"
      >
        {presentation.glyph}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-inter text-sm font-medium text-gray-900">{check.label}</span>
          <span className={`font-inter text-xs uppercase tracking-wide ${presentation.text}`}>
            <span className="sr-only">Status: </span>
            {presentation.label}
          </span>
          {check.latencyMs !== undefined && (
            <span className="font-inter text-xs text-gray-400">{check.latencyMs} ms</span>
          )}
        </div>
        {/* break-words: failure details carry URLs and error messages that would
            otherwise force the page to scroll sideways on a phone. */}
        <p className="mt-1 font-inter text-sm text-gray-600 break-words">{check.detail}</p>
      </div>
    </li>
  );
}
