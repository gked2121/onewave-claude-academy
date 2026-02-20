import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile with progress
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    // Get detailed progress
    const { data: progress, error: progressError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }

    // Get user achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', user.id);

    if (achievementsError) {
      return NextResponse.json({ error: achievementsError.message }, { status: 500 });
    }

    return NextResponse.json({
      profile,
      progress,
      achievements
    });

  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { levelId, completed, timeSpent, score, codeSnippets } = body;

    // Save or update progress
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        level_id: levelId,
        completed,
        completion_date: completed ? new Date().toISOString() : null,
        time_spent: timeSpent,
        score,
        code_snippets: codeSnippets
      }, {
        onConflict: 'user_id,level_id'
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check for new achievements
    await checkAndUnlockAchievements(supabase, user.id);

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Progress save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkAndUnlockAchievements(supabase: any, userId: string) {
  try {
    // Get user's current stats
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) return;

    // Get all achievements
    const { data: achievements } = await supabase
      .from('achievements')
      .select('*');

    if (!achievements) return;

    // Get user's current achievements
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId);

    const unlockedIds = new Set(userAchievements?.map((ua: any) => ua.achievement_id) || []);

    // Check each achievement
    for (const achievement of achievements) {
      if (unlockedIds.has(achievement.id)) continue;

      let shouldUnlock = false;

      switch (achievement.requirement_type) {
        case 'levels_completed':
          const completedCount = Object.keys(profile.completed_levels || {}).length;
          shouldUnlock = completedCount >= achievement.requirement_value;
          break;

        case 'total_xp':
          shouldUnlock = profile.xp >= achievement.requirement_value;
          break;

        case 'streak_days':
          shouldUnlock = profile.streak >= achievement.requirement_value;
          break;

        case 'badges_earned':
          shouldUnlock = (profile.badges || []).length >= achievement.requirement_value;
          break;
      }

      if (shouldUnlock) {
        // Unlock the achievement
        await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievement.id
          });

        // Add XP reward
        await supabase
          .from('profiles')
          .update({
            xp: profile.xp + achievement.xp_reward
          })
          .eq('id', userId);
      }
    }
  } catch (error) {
    console.error('Achievement check error:', error);
  }
}