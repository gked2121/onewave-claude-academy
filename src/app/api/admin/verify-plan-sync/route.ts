import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminAvailable } from '@/lib/supabase-admin';
import { getUserProfile } from '@/lib/supabase';

export async function POST(req: Request) {
  if (!isSupabaseAdminAvailable()) {
    return NextResponse.json({ success: false, error: 'Admin not configured' }, { status: 503 });
  }
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log(`Verifying plan sync for: ${email}`);

    // Step 1: Get user ID from email
    const { data: user, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Found user in database:', user);

    // Step 2: Simulate what ProgressContext does - call getUserProfile
    const profile = await getUserProfile(user.id);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch profile via getUserProfile' },
        { status: 500 }
      );
    }

    console.log('getUserProfile returned:', profile);

    // Step 3: Verify plan is present
    if (!profile.plan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Profile plan is null/undefined',
          profile: profile
        },
        { status: 500 }
      );
    }

    // Step 4: Compare database plan with getUserProfile plan
    const plansMatch = user.plan === profile.plan;

    return NextResponse.json({
      success: true,
      message: plansMatch
        ? 'Plan sync verification PASSED - plans match.'
        : 'Plan sync verification FAILED - plans do not match.',
      verification: {
        email: user.email,
        userId: user.id,
        databasePlan: user.plan,
        getUserProfilePlan: profile.plan,
        plansMatch: plansMatch
      },
      explanation: plansMatch
        ? 'When ProgressContext calls getUserProfile, it will receive the correct plan from the database.'
        : 'WARNING: getUserProfile is not returning the same plan as stored in database!'
    });

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
