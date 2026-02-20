import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_SERVER_CONFIG } from '@/config/stripe.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const secretKey = STRIPE_SERVER_CONFIG.secretKey;

    if (!secretKey) {
      return NextResponse.json({
        error: 'STRIPE_SECRET_KEY not set',
        config: {
          hasSecretKey: false,
          hasPublishableKey: !!STRIPE_SERVER_CONFIG.publishableKey,
          hasPriceFull: !!STRIPE_SERVER_CONFIG.priceFull,
        }
      });
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20', typescript: true });

    // Try to fetch account info
    const account = await stripe.accounts.retrieve();

    // Try to fetch the price
    const priceId = STRIPE_SERVER_CONFIG.priceFull;
    let priceInfo = null;
    if (priceId) {
      try {
        priceInfo = await stripe.prices.retrieve(priceId);
      } catch (e: any) {
        priceInfo = { error: e.message };
      }
    }

    return NextResponse.json({
      account: {
        id: account.id,
        email: account.email,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
        type: account.type,
      },
      price: priceInfo ? {
        id: priceInfo.id || null,
        active: (priceInfo as any).active || null,
        type: (priceInfo as any).type || null,
        currency: (priceInfo as any).currency || null,
        unit_amount: (priceInfo as any).unit_amount || null,
        error: (priceInfo as any).error || null,
      } : null,
      config: {
        hasSecretKey: true,
        secretKeyPrefix: secretKey.substring(0, 7),
        hasPublishableKey: !!STRIPE_SERVER_CONFIG.publishableKey,
        publishableKeyPrefix: STRIPE_SERVER_CONFIG.publishableKey?.substring(0, 7),
        hasPriceFull: !!STRIPE_SERVER_CONFIG.priceFull,
        priceFull: STRIPE_SERVER_CONFIG.priceFull,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      raw: error.raw,
    }, { status: 500 });
  }
}
