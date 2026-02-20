import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client (or mock client if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'x-application-name': 'onewave-claude-academy'
        }
      }
    })
  : null as any; // Mock client for local dev without Supabase

// Export helper to check if Supabase is available
export const isSupabaseAvailable = () => isSupabaseConfigured;

// Database types
export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  completed_levels: Record<string, boolean>;
  achievements: Record<string, boolean>;
  character_type?: string;
  learning_path?: string;
  plan?: 'free' | 'full' | 'pro';
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  level_id: string;
  completed: boolean;
  completion_date?: string;
  time_spent?: number;
  score?: number;
  attempts?: number;
  code_snippets?: string[];
  created_at?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement_type: string;
  requirement_value: number;
  created_at?: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  code_template?: string;
  solution?: string;
  hints?: string[];
  created_at?: string;
}

// Helper functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

export const saveProgress = async (progress: Omit<UserProgress, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('progress')
      .upsert(progress, {
        onConflict: 'user_id,level_id'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }
};

export const getDailyChallenge = async (): Promise<DailyChallenge | null> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('date', today)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    return null;
  }
};

export const unlockAchievement = async (
  userId: string,
  achievementId: string
): Promise<boolean> => {
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
    console.error('Error unlocking achievement:', error);
    return false;
  }
};

// Real-time subscriptions
export const subscribeToUserProfile = (
  userId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      },
      callback
    )
    .subscribe();
};

// Auth helpers
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;

    // Send signup notification to admins
    if (data.user) {
      try {
        await fetch('/api/notifications/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            userId: data.user.id,
          }),
        });
      } catch (notificationError) {
        // Don't fail signup if notification fails
        console.warn('Failed to send signup notification:', notificationError);
      }
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, session: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};