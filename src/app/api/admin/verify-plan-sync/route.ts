import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminAvailable } from '@/lib/supabase-admin';
import { getUserProfile } from '@/lib/supabase';
import { getAuthUser, isUserAdmin, unauthorizedResponse, forbiddenResponse } from '@/lib/auth-helpers';

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return unauthorizedResponse();

  const admin = await isUserAdmin(user.id);
  if (!admin) return forbiddenResponse('Admin access required');

  if (!isSupabaseAdminAvailable()) {
    return NextResponse.json({ success: false, error: 'Admin not configured' }, { status: 503 });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data: dbUser, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan')
      .eq('email', email)
      .single();

    if (userError || !dbUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const profile = await getUserProfile(dbUser.id);
    if (!profile) {
      return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
    }

    const plansMatch = dbUser.plan === profile.plan;

    return NextResponse.json({
      success: true,
      message: plansMatch ? 'Plans match' : 'Plans do not match',
      verification: {
        databasePlan: dbUser.plan,
        getUserProfilePlan: profile.plan,
        plansMatch,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
