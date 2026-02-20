import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const isNewUser = requestUrl.searchParams.get('new') === 'true';

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.user) {
      // Check if user has completed onboarding (has a profile with department set)
      const { data: profile } = await supabase
        .from('profiles')
        .select('department, onboarding_completed')
        .eq('id', session.user.id)
        .single();

      // Redirect new users or users who haven't completed onboarding
      if (isNewUser || !profile?.onboarding_completed) {
        return NextResponse.redirect(new URL('/onboarding', requestUrl.origin));
      }
    }
  }

  // Redirect returning users to dashboard
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}