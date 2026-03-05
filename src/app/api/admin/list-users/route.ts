import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminAvailable } from '@/lib/supabase-admin';
import { getAuthUser, isUserAdmin, unauthorizedResponse, forbiddenResponse } from '@/lib/auth-helpers';

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return unauthorizedResponse();

  const admin = await isUserAdmin(user.id);
  if (!admin) return forbiddenResponse('Admin access required');

  if (!isSupabaseAdminAvailable()) {
    return NextResponse.json({ success: false, error: 'Admin not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      users: data,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
