import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuthUser, unauthorizedResponse } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2024-06-20', typescript: true });
}

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');
    if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      return NextResponse.json({ ok: true, plan: 'pro', session });
    }
    return NextResponse.json({ ok: false, status: session.payment_status, session });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
