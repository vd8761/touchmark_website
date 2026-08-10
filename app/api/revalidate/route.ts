import { createHmac, timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { CMS_CACHE_TAG } from '@/services/cms';

export const runtime = 'nodejs';

/** The CMS signs with a 5-minute tolerance; reject anything older. */
const TOLERANCE_SECONDS = 300;

export async function POST(request: Request) {
  const secret = process.env.CMS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'not configured' }, { status: 500 });
  }

  // The raw body is what was signed — parsing and re-serialising would change
  // the bytes and break verification.
  const raw = await request.text();
  const header = request.headers.get('x-signature') ?? '';

  const timestamp = header.match(/t=(\d+)/)?.[1];
  const signature = header.match(/v1=([a-f0-9]+)/)?.[1];
  if (!timestamp || !signature) {
    return NextResponse.json({ error: 'unsigned' }, { status: 401 });
  }

  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) {
    return NextResponse.json({ error: 'stale' }, { status: 401 });
  }

  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest('hex');
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    return NextResponse.json({ error: 'bad signature' }, { status: 401 });
  }

  // Delivery is at-least-once, so the same event can arrive twice. revalidateTag is
  // idempotent; anything with side effects added here must deduplicate on X-Event-Id.
  // Next 16 requires a cache profile; "max" expires the tag immediately on the next read.
  revalidateTag(CMS_CACHE_TAG, 'max');
  return NextResponse.json({ revalidated: true });
}
