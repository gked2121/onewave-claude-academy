import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_SERVER_CONFIG, validateServerConfig } from '@/config/stripe.server';

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
  try {
    const { priceId } = await req.json();
    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    console.log('Creating Stripe checkout session with:', {
      priceId,
      hasSecretKey: !!STRIPE_SERVER_CONFIG.secretKey,
      secretKeyPrefix: STRIPE_SERVER_CONFIG.secretKey?.substring(0, 7),
    });

    const stripe = getStripe();
    const origin = req.headers.get('origin') || STRIPE_SERVER_CONFIG.appOrigin || 'http://localhost:3000';

    console.log('Calling Stripe API with origin:', origin);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/upgrade/cancel`,
      automatic_tax: { enabled: true },
    });

    console.log('Checkout session created successfully:', session.id);
    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    // Enhanced error logging for Stripe errors
    console.error('Checkout error - Full details:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      type: (err as any)?.type,
      code: (err as any)?.code,
      statusCode: (err as any)?.statusCode,
      raw: (err as any)?.raw,
      requestId: (err as any)?.requestId,
    });

    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
