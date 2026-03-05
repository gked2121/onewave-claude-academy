import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_SERVER_CONFIG, validateServerConfig } from '@/config/stripe.server';
import { getAuthUser, unauthorizedResponse } from '@/lib/auth-helpers';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure Node.js runtime for env var access

function getStripe() {
  const validation = validateServerConfig();
  if (!validation.isValid) {
    console.error('Stripe configuration invalid:', validation.errors);
    throw new Error(`Stripe configuration error: ${validation.errors.join(', ')}`);
  }

  const key = STRIPE_SERVER_CONFIG.secretKey;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2024-06-20', typescript: true });
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per 60 seconds per IP
  const rateLimited = checkRateLimit(req, { limit: 5, windowSeconds: 60 });
  if (rateLimited) return rateLimited;

  const user = await getAuthUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { priceId } = await req.json();
    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const stripe = getStripe();
    const origin = req.headers.get('origin') || STRIPE_SERVER_CONFIG.appOrigin || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/upgrade/cancel`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    console.error('Checkout error:', err instanceof Error ? err.message : 'Unknown error');
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
