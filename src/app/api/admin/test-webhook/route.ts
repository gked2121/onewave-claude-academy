import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminAvailable } from '@/lib/supabase-admin';
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
    const { email, plan = 'full' } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ plan, updated_at: new Date().toISOString() })
      .eq('email', email)
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: 'Failed to update plan' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, message: 'No user found with that email' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Plan updated to "${plan}" for ${email}`,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
