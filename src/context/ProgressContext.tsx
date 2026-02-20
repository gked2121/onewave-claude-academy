"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { ProgressState, Plan, LevelCompletedEvent, AchievementUnlockedEvent, AiCliType, UserProject } from '@/types';
import { useLocalStorage } from '@/hooks';
import { syncProgressToDatabase, getCurrentUserId, loadUserProgressFromDatabase, syncAchievementToDatabase } from '@/lib/supabase-sync';
import { getUserProfile, updateUserProfile, isSupabaseAvailable } from '@/lib/supabase';

type ProgressContextType = ProgressState & {
  // Character actions
  setCharacter: (id: number) => void;

  // Level actions
  completeLevel: (level: number, timeSpent?: number) => void;
  unlockLevel: (level: number) => void;
  setCurrentLevel: (level: number) => void;

  // XP and achievements
  addXP: (amount: number, source?: string) => void;
  awardAchievement: (id: string, xp?: number) => void;

  // User management
  setPlan: (plan: Plan) => void;
  setLicense: (token: string | undefined) => void;
  setUserEmail: (email: string | undefined) => void;
  updatePreferences: (preferences: Partial<ProgressState['preferences']>) => void;
  setSelectedAiCli: (cli: AiCliType) => void;

  // Project management
  setProject: (project: UserProject) => void;
  updateProject: (updates: Partial<UserProject>) => void;
  clearProject: () => void;

  // Utility
  reset: () => void;
  logout: () => void;
  isLevelUnlocked: (level: number) => boolean;
  isLevelCompleted: (level: number) => boolean;
  getNextLevel: () => number | null;
  getTotalProgress: () => number;

  // Event handlers
  addEventListener: (type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => void;
  removeEventListener: (type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => void;
};

const defaultState: ProgressState = {
  character: null,
  unlockedLevels: [0],
  completedLevels: [],
  currentLevel: undefined,
  xp: 0,
  plan: 'free',
  achievements: [],
  preferences: {
    theme: 'dark',
    visualsEnabled: true,
    soundEnabled: true,
    language: 'en',
    notifications: true,
  },
  project: undefined,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'onewave:claude-academy:progress';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<ProgressState>(STORAGE_KEY, defaultState);
  const [eventListeners, setEventListeners] = useState<Map<string, Set<(event: LevelCompletedEvent | AchievementUnlockedEvent) => void>>>(
    new Map()
  );

  // Event system
  const addEventListener = useCallback((type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => {
    setEventListeners(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(type)) {
        newMap.set(type, new Set());
      }
      newMap.get(type)!.add(handler);
      return newMap;
    });
  }, []);

  const removeEventListener = useCallback((type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => {
    setEventListeners(prev => {
      const newMap = new Map(prev);
      if (newMap.has(type)) {
        newMap.get(type)!.delete(handler);
        if (newMap.get(type)!.size === 0) {
          newMap.delete(type);
        }
      }
      return newMap;
    });
  }, []);

  const dispatchEvent = useCallback((event: LevelCompletedEvent | AchievementUnlockedEvent) => {
    const handlers = eventListeners.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }, [eventListeners]);

  // Character actions
  const setCharacter = useCallback((id: number) => {
    setState(s => ({ ...s, character: id }));
  }, [setState]);

  // Level actions
  const completeLevel = useCallback(async (level: number, timeSpent = 0) => {
    setState(s => {
      if (s.completedLevels.includes(level)) return s;

      const completedLevels = [...s.completedLevels, level];
      const xpEarned = 100; // Base XP reward
      const xp = s.xp + xpEarned;

      // Unlock next level if allowed by plan
      const next = level + 1;
      let unlockedLevels = s.unlockedLevels;
      const isAdminUser = s.userEmail === 'gabe@onewave-ai.com' || s.userEmail === 'gked21@gmail.com' || s.userEmail?.toLowerCase() === 'gabe@onewave-ai.com';
      const isPaidGate = next >= 2 && s.plan === 'free' && !isAdminUser;
      if (!isPaidGate && !unlockedLevels.includes(next)) {
        unlockedLevels = [...unlockedLevels, next];
      }

      // Sync to Supabase in background
      getCurrentUserId().then(userId => {
        if (userId) {
          syncProgressToDatabase(userId, level, {
            completed: true,
            timeSpent,
            score: 100,
            xpEarned
          });
        }
      });

      // Dispatch level completed event
      const event: LevelCompletedEvent = {
        type: 'level_completed',
        payload: { levelId: level, xpEarned, timeSpent },
        timestamp: new Date(),
      };
      setTimeout(() => dispatchEvent(event), 0);

      return { ...s, completedLevels, unlockedLevels, xp };
    });
  }, [setState, dispatchEvent]);

  const unlockLevel = useCallback((level: number) => {
    setState(s => {
      if (s.unlockedLevels.includes(level)) return s;
      return { ...s, unlockedLevels: [...s.unlockedLevels, level] };
    });
  }, [setState]);

  const setCurrentLevel = useCallback((level: number) => {
    setState(s => ({ ...s, currentLevel: level }));
  }, [setState]);

  // XP and achievements
  const addXP = useCallback((amount: number, source = 'manual') => {
    setState(s => ({ ...s, xp: s.xp + amount }));
  }, [setState]);

  const awardAchievement = useCallback((id: string, xpAmount = 50) => {
    setState(s => {
      if (s.achievements.includes(id)) return s;

      const achievements = [...s.achievements, id];
      const xp = s.xp + xpAmount;

      // Sync achievement to Supabase in background
      getCurrentUserId().then(userId => {
        if (userId) {
          syncAchievementToDatabase(userId, id);
        }
      });

      // Dispatch achievement unlocked event
      const event: AchievementUnlockedEvent = {
        type: 'achievement_unlocked',
        payload: { achievementId: id, xpEarned: xpAmount },
        timestamp: new Date(),
      };
      setTimeout(() => dispatchEvent(event), 0);

      return { ...s, achievements, xp };
    });
  }, [setState, dispatchEvent]);

  // User management
  const setPlan = useCallback((plan: Plan) => {
    setState(s => {
      // When upgrading to a paid plan, unlock all levels the user should have access to
      if (s.plan === 'free' && plan !== 'free') {
        // Find the highest completed level
        const highestCompleted = Math.max(-1, ...s.completedLevels);

        // Unlock the next level after the highest completed level
        const nextLevel = highestCompleted + 1;
        const unlockedLevels = s.unlockedLevels.includes(nextLevel)
          ? s.unlockedLevels
          : [...s.unlockedLevels, nextLevel];

        return { ...s, plan, unlockedLevels };
      }

      return { ...s, plan };
    });
  }, [setState]);

  const setLicense = useCallback((token: string | undefined) => {
    setState(s => ({ ...s, license: token }));
  }, [setState]);

  const setUserEmail = useCallback((email: string | undefined) => {
    setState(s => ({ ...s, userEmail: email }));
  }, [setState]);

  const updatePreferences = useCallback((preferences: Partial<ProgressState['preferences']>) => {
    setState(s => ({
      ...s,
      preferences: { ...s.preferences, ...preferences }
    }));
  }, [setState]);

  const setSelectedAiCli = useCallback((cli: AiCliType) => {
    setState(s => ({
      ...s,
      selectedAiCli: cli,
      learningPath: cli || undefined
    }));
  }, [setState]);

  // Utility functions
  const reset = useCallback(() => {
    setState(defaultState);
  }, [setState]);

  const logout = useCallback(() => {
    setState(s => ({ ...s, userEmail: undefined }));
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, [setState]);

  // Session timeout - 4 hours
  useEffect(() => {
    if (!state.userEmail) return;

    const SESSION_TIMEOUT = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const timeout = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [state.userEmail, logout]);

  // Sync plan from database when user logs in
  const planSyncedRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!state.userEmail) {
      planSyncedRef.current = undefined;
      return;
    }

    // Only sync once per email
    if (planSyncedRef.current === state.userEmail) return;

    const loadPlanFromDatabase = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) return;

        const profile = await getUserProfile(userId);
        if (!profile || !profile.plan) return;

        // If database plan is different from local state, update it
        if (profile.plan !== state.plan) {
          console.log(`Syncing plan from database: ${profile.plan}`);
          setPlan(profile.plan);
        }

        planSyncedRef.current = state.userEmail;
      } catch (error) {
        console.error('Error loading plan from database:', error);
      }
    };

    loadPlanFromDatabase();
  }, [state.userEmail, state.plan, setPlan]);

  // ── Auto-sync full state to Supabase (debounced) ──
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncRef = useRef<string>('');

  useEffect(() => {
    if (!state.userEmail || !isSupabaseAvailable()) return;

    // Build a fingerprint of syncable state to detect real changes
    const fingerprint = JSON.stringify({
      xp: state.xp,
      completedLevels: state.completedLevels,
      achievements: state.achievements,
      unlockedLevels: state.unlockedLevels,
    });

    if (fingerprint === lastSyncRef.current) return;

    // Debounce: wait 2s after last change before syncing
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

    syncTimerRef.current = setTimeout(async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) return;

        const completedMap: Record<string, boolean> = {};
        state.completedLevels.forEach((l) => {
          completedMap[`level-${l}`] = true;
        });

        const achievementsMap: Record<string, boolean> = {};
        state.achievements.forEach((a) => {
          achievementsMap[a] = true;
        });

        await updateUserProfile(userId, {
          xp: state.xp,
          level: Math.floor(state.xp / 100) + 1,
          completed_levels: completedMap,
          achievements: achievementsMap,
        });

        lastSyncRef.current = fingerprint;
      } catch (err) {
        console.error('Auto-sync failed:', err);
      }
    }, 2000);

    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [state.userEmail, state.xp, state.completedLevels, state.achievements, state.unlockedLevels]);

  // ── Load full progress from Supabase on login ──
  const progressLoadedRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!state.userEmail || !isSupabaseAvailable()) return;
    if (progressLoadedRef.current === state.userEmail) return;

    const loadFullProgress = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) return;

        const result = await loadUserProgressFromDatabase(userId);
        if (!result) return;

        const { profile, progress } = result;

        // Merge database progress into local state (database wins for XP/achievements)
        setState((s) => {
          const dbCompletedLevels = Object.keys(profile.completed_levels || {})
            .filter((k) => profile.completed_levels[k])
            .map((k) => parseInt(k.replace('level-', ''), 10))
            .filter((n) => !isNaN(n));

          const dbAchievements = Object.keys(profile.achievements || {}).filter(
            (k) => profile.achievements[k]
          );

          // Merge: union of local + database
          const mergedCompleted = [...new Set([...s.completedLevels, ...dbCompletedLevels])];
          const mergedAchievements = [...new Set([...s.achievements, ...dbAchievements])];
          const mergedXp = Math.max(s.xp, profile.xp || 0);

          // Rebuild unlocked levels from completed levels
          const mergedUnlocked = [...s.unlockedLevels];
          mergedCompleted.forEach((level) => {
            const next = level + 1;
            if (!mergedUnlocked.includes(next)) {
              mergedUnlocked.push(next);
            }
          });

          return {
            ...s,
            completedLevels: mergedCompleted,
            achievements: mergedAchievements,
            unlockedLevels: mergedUnlocked,
            xp: mergedXp,
            plan: profile.plan || s.plan,
          };
        });

        progressLoadedRef.current = state.userEmail;
      } catch (err) {
        console.error('Failed to load progress from database:', err);
      }
    };

    loadFullProgress();
  }, [state.userEmail, setState]);

  const isLevelUnlocked = useCallback((level: number) => {
    return state.unlockedLevels.includes(level);
  }, [state.unlockedLevels]);

  const isLevelCompleted = useCallback((level: number) => {
    return state.completedLevels.includes(level);
  }, [state.completedLevels]);

  const getNextLevel = useCallback(() => {

    // Return the lowest unlocked level that hasn't been completed
    for (const level of state.unlockedLevels.sort((a, b) => a - b)) {
      if (!state.completedLevels.includes(level)) {
        return level;
      }
    }

    return null;
  }, [state.unlockedLevels, state.completedLevels]);

  const getTotalProgress = useCallback(() => {
    const totalLevels = 10; // Assuming 10 levels total
    return Math.round((state.completedLevels.length / totalLevels) * 100);
  }, [state.completedLevels]);

  // Project management functions
  const setProject = useCallback((project: UserProject) => {
    setState(s => ({ ...s, project }));
  }, [setState]);

  const updateProject = useCallback((updates: Partial<UserProject>) => {
    setState(s => ({
      ...s,
      project: s.project ? { ...s.project, ...updates } : undefined
    }));
  }, [setState]);

  const clearProject = useCallback(() => {
    setState(s => ({ ...s, project: undefined }));
  }, [setState]);

  const api: ProgressContextType = useMemo(
    () => ({
      ...state,
      setCharacter,
      completeLevel,
      unlockLevel,
      setCurrentLevel,
      addXP,
      awardAchievement,
      setPlan,
      setLicense,
      setUserEmail,
      updatePreferences,
      setSelectedAiCli,
      setProject,
      updateProject,
      clearProject,
      reset,
      logout,
      isLevelUnlocked,
      isLevelCompleted,
      getNextLevel,
      getTotalProgress,
      addEventListener,
      removeEventListener,
    }),
    [
      state,
      setCharacter,
      completeLevel,
      unlockLevel,
      setCurrentLevel,
      addXP,
      awardAchievement,
      setPlan,
      setLicense,
      setUserEmail,
      updatePreferences,
      setSelectedAiCli,
      setProject,
      updateProject,
      clearProject,
      reset,
      logout,
      isLevelUnlocked,
      isLevelCompleted,
      getNextLevel,
      getTotalProgress,
      addEventListener,
      removeEventListener,
    ]
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
