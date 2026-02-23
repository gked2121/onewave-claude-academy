import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminAvailable } from '@/lib/supabase-admin';

export async function GET() {
  if (!isSupabaseAdminAvailable()) {
    return NextResponse.json({ success: false, error: 'Admin not configured' }, { status: 503 });
  }
  try {
    console.log('Fetching all users from profiles table...');

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch users:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log(`Found ${data?.length || 0} users`);

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      users: data
    });

  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
