import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const { email, plan = 'full' } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log(`TEST: Simulating webhook - updating plan to "${plan}" for ${email}`);

    // Simulate what the webhook does: update user's plan in database
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        plan: plan,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
      .select();

    if (error) {
      console.error('Failed to update user plan:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.warn('No user found with email:', email);
      return NextResponse.json(
        {
          success: false,
          message: 'No user found with that email',
          hint: 'User needs to sign up first before plan can be updated'
        },
        { status: 404 }
      );
    }

    console.log('Plan updated successfully:', data[0]);

    // Verify the update
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan')
      .eq('email', email)
      .single();

    return NextResponse.json({
      success: true,
      message: `Plan updated to "${plan}" for ${email}`,
      updatedData: data[0],
      verifiedData: verifyData
    });

  } catch (error: any) {
    console.error('Test webhook error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
