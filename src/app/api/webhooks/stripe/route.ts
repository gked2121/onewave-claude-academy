import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Lazy instantiation - only create Resend when needed
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const ADMIN_EMAILS = ['info@onewave-ai.com', 'gabe@onewave-ai.com'];

// Validate webhook secret is configured
if (!webhookSecret) {
  console.error('CRITICAL: STRIPE_WEBHOOK_SECRET is not configured');
}

export async function POST(req: Request) {
  try {
    // Validate webhook secret is configured
    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook configuration error' },
        { status: 500 }
      );
    }

    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed.', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleNewSubscription(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(subscription);
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleNewSubscription(subscription: Stripe.Subscription) {
  console.log('New subscription created:', subscription.id);

  // Get customer details
  const customer = await stripe.customers.retrieve(
    subscription.customer as string
  );

  const customerEmail = (customer as Stripe.Customer).email || 'Unknown';
  const customerName = (customer as Stripe.Customer).name || 'New User';

  const notificationData = {
    type: 'new_subscription',
    customerName,
    customerEmail,
    subscriptionId: subscription.id,
    amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
    currency: subscription.items.data[0]?.price.currency || 'usd',
    planInterval: subscription.items.data[0]?.price.recurring?.interval || 'month',
  };

  // Send both Slack and email notifications
  await Promise.all([
    sendSlackNotification(notificationData),
    sendEmailNotification(notificationData),
  ]);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);

  const customer = await stripe.customers.retrieve(
    subscription.customer as string
  );

  const customerEmail = (customer as Stripe.Customer).email || 'Unknown';
  const customerName = (customer as Stripe.Customer).name || 'User';

  await sendSlackNotification({
    type: 'subscription_updated',
    customerName,
    customerEmail,
    subscriptionId: subscription.id,
    status: subscription.status,
  });
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  console.log('Subscription cancelled:', subscription.id);

  const customer = await stripe.customers.retrieve(
    subscription.customer as string
  );

  const customerEmail = (customer as Stripe.Customer).email || 'Unknown';
  const customerName = (customer as Stripe.Customer).name || 'User';

  await sendSlackNotification({
    type: 'subscription_cancelled',
    customerName,
    customerEmail,
    subscriptionId: subscription.id,
    cancelAt: subscription.cancel_at,
  });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);

  // Update user's plan in database
  const customerEmail = session.customer_email;
  if (customerEmail && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          plan: 'full',
          updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail)
        .select();

      if (error) {
        console.error('Failed to update user plan in database:', error);
      } else if (data && data.length > 0) {
        console.log('Updated plan to "full" for user:', customerEmail);
      } else {
        console.warn('No user found with email:', customerEmail);
      }
    } catch (dbError) {
      console.error('Database error updating plan:', dbError);
    }
  } else {
    console.warn('Missing customer email or Supabase not configured');
  }

  await sendSlackNotification({
    type: 'checkout_completed',
    customerEmail: session.customer_email || 'Unknown',
    sessionId: session.id,
    amountTotal: (session.amount_total || 0) / 100,
    currency: session.currency || 'usd',
  });
}

async function sendSlackNotification(data: any) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured, skipping Slack notification');
    return;
  }

  try {
    let message = '';
    let color = '#6366f1'; // Purple default

    switch (data.type) {
      case 'new_subscription':
        color = '#10b981'; // Green
        message = `*New Claude Academy Subscriber!*\n\n` +
          `*Name:* ${data.customerName}\n` +
          `*Email:* ${data.customerEmail}\n` +
          `*Amount:* $${data.amount}/${data.planInterval}\n` +
          `*Subscription ID:* ${data.subscriptionId}\n` +
          `*Time:* ${new Date().toLocaleString()}`;
        break;

      case 'subscription_updated':
        color = '#f59e0b'; // Orange
        message = `*Subscription Updated*\n\n` +
          `*Name:* ${data.customerName}\n` +
          `*Email:* ${data.customerEmail}\n` +
          `*Status:* ${data.status}\n` +
          `*Subscription ID:* ${data.subscriptionId}`;
        break;

      case 'subscription_cancelled':
        color = '#ef4444'; // Red
        message = `*Subscription Cancelled*\n\n` +
          `*Name:* ${data.customerName}\n` +
          `*Email:* ${data.customerEmail}\n` +
          `*Subscription ID:* ${data.subscriptionId}\n` +
          `*Cancel Date:* ${data.cancelAt ? new Date(data.cancelAt * 1000).toLocaleString() : 'Immediate'}`;
        break;

      case 'checkout_completed':
        color = '#10b981'; // Green
        message = `*Checkout Completed*\n\n` +
          `*Email:* ${data.customerEmail}\n` +
          `*Amount:* $${data.amountTotal} ${data.currency.toUpperCase()}\n` +
          `*Session ID:* ${data.sessionId}`;
        break;
    }

    const slackPayload = {
      attachments: [
        {
          color: color,
          text: message,
          footer: 'Claude Academy Notifications',
          footer_icon: 'https://claude-academy.onewave.ai/favicon-32x32.png',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      console.error('Failed to send Slack notification:', response.statusText);
    } else {
      console.log('Slack notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}

async function sendEmailNotification(data: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email notification');
    return;
  }

  try {
    let subject = '';
    let htmlContent = '';

    switch (data.type) {
      case 'new_subscription':
        subject = `New Claude Academy Subscriber: ${data.customerName}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">New Claude Academy Subscriber!</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Customer Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Amount:</strong> $${data.amount}/${data.planInterval}</p>
              <p><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">
              View in Stripe: <a href="https://dashboard.stripe.com/subscriptions/${data.subscriptionId}">Dashboard</a>
            </p>
          </div>
        `;
        break;

      case 'subscription_updated':
        subject = `Subscription Updated: ${data.customerName}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f59e0b;">Subscription Updated</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Customer Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Status:</strong> ${data.status}</p>
              <p><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
            </div>
          </div>
        `;
        break;

      case 'subscription_cancelled':
        subject = `Subscription Cancelled: ${data.customerName}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ef4444;">Subscription Cancelled</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Customer Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
              <p><strong>Cancel Date:</strong> ${data.cancelAt ? new Date(data.cancelAt * 1000).toLocaleString() : 'Immediate'}</p>
            </div>
          </div>
        `;
        break;

      case 'checkout_completed':
        subject = `Checkout Completed: ${data.customerEmail}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Checkout Completed</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Amount:</strong> $${data.amountTotal} ${data.currency.toUpperCase()}</p>
              <p><strong>Session ID:</strong> ${data.sessionId}</p>
            </div>
          </div>
        `;
        break;

      default:
        return;
    }

    // Send email to all admin emails
    // Note: If using test mode in Resend, you may need to verify domain first
    const resend = getResendClient();
    await resend.emails.send({
      from: 'Claude Academy <onboarding@resend.dev>',
      to: ADMIN_EMAILS,
      subject: subject,
      html: htmlContent,
    });

    console.log('Email notification sent successfully to', ADMIN_EMAILS.join(', '));
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}
