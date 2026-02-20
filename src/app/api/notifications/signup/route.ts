import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const ADMIN_EMAILS = ['info@onewave-ai.com', 'gabe@onewave-ai.com'];

// Lazy instantiation - only create Resend when needed (not at build time)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    console.log('Signup notification triggered for:', email);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured, skipping email notification');
    }

    const subject = `New Claude Academy Signup: ${email}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DA7756;">New User Signed Up!</h2>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          ${userId ? `<p><strong>User ID:</strong> ${userId}</p>` : ''}
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #6b7280; font-size: 12px;">
          This user has been added to Claude Academy. They start with a free account and can upgrade anytime.
        </p>
      </div>
    `;

    // Send email to all admin emails (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = getResendClient();
        await resend.emails.send({
          from: 'Claude Academy <onboarding@resend.dev>',
          to: ADMIN_EMAILS,
          subject: subject,
          html: htmlContent,
        });
        console.log('Email notification sent to', ADMIN_EMAILS.join(', '));
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    // Also send Slack notification if configured
    console.log('About to send Slack notification...');
    await sendSlackNotification(email, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending signup notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}

async function sendSlackNotification(email: string, userId?: string) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  console.log('Checking Slack webhook configuration...');
  console.log('Webhook URL exists:', !!slackWebhookUrl);

  if (!slackWebhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured, skipping Slack notification');
    return;
  }

  try {
    console.log('Sending Slack notification for:', email);
    const message = `*New Claude Academy Signup!*\n\n` +
      `*Email:* ${email}\n` +
      (userId ? `*User ID:* ${userId}\n` : '') +
      `*Time:* ${new Date().toLocaleString()}`;

    const slackPayload = {
      attachments: [
        {
          color: '#DA7756',
          text: message,
          footer: 'Claude Academy Notifications',
          footer_icon: 'https://claude-academy.onewave.ai/favicon-32x32.png',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    console.log('Making request to Slack webhook...');
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    console.log('Slack response status:', response.status);
    const responseText = await response.text();
    console.log('Slack response body:', responseText);

    if (!response.ok) {
      console.error('Failed to send Slack notification:', response.statusText);
      console.error('Response body:', responseText);
    } else {
      console.log('Slack signup notification sent successfully.');
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}
