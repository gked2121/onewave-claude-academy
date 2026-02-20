import { supabase, getUserProfile, updateUserProfile, saveProgress } from './supabase';

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
