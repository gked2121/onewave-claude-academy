import { supabase, getUserProfile, updateUserProfile, saveProgress } from './supabase';

/**
 * Log organization activity to the org_activity_log table
 */
export async function logOrgActivity(
  userId: string,
  orgId: string,
  activityType: string,
  activityData: Record<string, unknown> = {}
): Promise<void> {
  try {
    const { error } = await supabase
      .from('org_activity_log')
      .insert({
        user_id: userId,
        org_id: orgId,
        activity_type: activityType,
        activity_data: activityData,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to log org activity:', error);
    }
  } catch (error) {
    console.error('Failed to log org activity:', error);
  }
}

/**
 * Sync user progress to Supabase database
 */
export async function syncProgressToDatabase(userId: string, levelId: number, data: {
  completed: boolean;
  timeSpent?: number;
  score?: number;
  xpEarned?: number;
}) {
  try {
    // Save progress to database
    const success = await saveProgress({
      user_id: userId,
      level_id: `level-${levelId}`,
      completed: data.completed,
      completion_date: data.completed ? new Date().toISOString() : undefined,
      time_spent: data.timeSpent,
      score: data.score,
    });

    // Update user profile with XP if completed
    if (data.completed && data.xpEarned) {
      const profile = await getUserProfile(userId);
      if (profile) {
        await updateUserProfile(userId, {
          xp: (profile.xp || 0) + data.xpEarned,
          level: Math.floor(((profile.xp || 0) + data.xpEarned) / 100) + 1,
        });
      }
    }

    // Log org activity for level completion
    if (data.completed) {
      try {
        const { data: memberData } = await supabase
          .from('organization_members')
          .select('org_id')
          .eq('user_id', userId)
          .single();

        if (memberData?.org_id) {
          await logOrgActivity(userId, memberData.org_id, 'level_completed', {
            level_id: levelId,
            score: data.score,
            time_spent: data.timeSpent,
            xp_earned: data.xpEarned,
          });
        }
      } catch (activityError) {
        // Activity logging is additive — never break progress sync
        console.error('Failed to log level completion activity:', activityError);
      }
    }

    return success;
  } catch (error) {
    console.error('Failed to sync progress:', error);
    return false;
  }
}

/**
 * Get user ID from current session
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user?.id || null;
  } catch (error) {
    console.error('Failed to get user ID:', error);
    return null;
  }
}

/**
 * Sync achievements to database
 */
export async function syncAchievementToDatabase(userId: string, achievementId: string) {
  try {
    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to sync achievement:', error);
    return false;
  }
}

/**
 * Load user progress from database
 */
export async function loadUserProgressFromDatabase(userId: string) {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) return null;

    const { data: progressData } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId);

    return {
      profile,
      progress: progressData || []
    };
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return null;
  }
}
