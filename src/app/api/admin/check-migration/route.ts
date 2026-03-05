import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuthUser, isUserAdmin, unauthorizedResponse, forbiddenResponse } from '@/lib/auth-helpers';

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return unauthorizedResponse();

  const admin = await isUserAdmin(user.id);
  if (!admin) return forbiddenResponse('Admin access required');

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, plan')
      .limit(1);

    if (error) {
      if (error.message.includes('column') && error.message.includes('plan')) {
        return NextResponse.json({
          success: false,
          migrationApplied: false,
          needsMigration: true,
        });
      }
      return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      migrationApplied: true,
      needsMigration: false,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
