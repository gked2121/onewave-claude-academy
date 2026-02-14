"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { ProgressState, Plan, LevelCompletedEvent, AchievementUnlockedEvent, CustomGPT } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { achievements } from '@/lib/achievements';

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
  incrementPerfectValidations: () => void;
  incrementPerfectPrompts: () => void;
  incrementApiIntegrations: () => void;
  incrementSharesCount: () => void;
  incrementHelpedUsers: () => void;
  addSecretCode: (code: string) => void;

  // User management
  setPlan: (plan: Plan) => void;
  setLicense: (token: string | undefined) => void;
  setUserEmail: (email: string | undefined) => void;
  updatePreferences: (preferences: Partial<ProgressState['preferences']>) => void;

  // Custom GPT management
  addCustomGPT: (gpt: CustomGPT) => void;
  updateCustomGPT: (id: string, updates: Partial<CustomGPT>) => void;
  deleteCustomGPT: (id: string) => void;

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
  unlockedLevels: [0], // Only Level 0 is unlocked by default
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
  customGpts: [],

  // Achievement tracking
  streak: 0,
  lastActivityDate: undefined,
  perfectValidations: 0,
  perfectPrompts: 0,
  apiIntegrations: 0,
  levelsCompletedToday: 0,
  levelsInSession: 0,
  nightOwlLevels: 0,
  earlyBirdLevels: 0,
  sharesCount: 0,
  helpedUsers: 0,
  secretCodes: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'onewave:claude-quest:progress';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<ProgressState>(STORAGE_KEY, defaultState);
  const eventListenersRef = useRef<Map<string, Set<(event: LevelCompletedEvent | AchievementUnlockedEvent) => void>>>(
    new Map()
  );

  // Check achievements against current progress
  const checkAchievements = useCallback((progress: ProgressState) => {
    const newAchievements: string[] = [];

    achievements.forEach(achievement => {
      // Skip if already unlocked
      if (progress.achievements.includes(achievement.id)) return;

      // Check if condition is met
      if (achievement.condition(progress)) {
        newAchievements.push(achievement.id);
      }
    });

    return newAchievements;
  }, []);

  // Event system
  const addEventListener = useCallback((type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => {
    const listeners = eventListenersRef.current;
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type)!.add(handler);
  }, []);

  const removeEventListener = useCallback((type: string, handler: (event: LevelCompletedEvent | AchievementUnlockedEvent) => void) => {
    const listeners = eventListenersRef.current;
    if (listeners.has(type)) {
      listeners.get(type)!.delete(handler);
      if (listeners.get(type)!.size === 0) {
        listeners.delete(type);
      }
    }
  }, []);

  const dispatchEvent = useCallback((event: LevelCompletedEvent | AchievementUnlockedEvent) => {
    const handlers = eventListenersRef.current.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }, []);

  // Character actions
  const setCharacter = useCallback((id: number) => {
    setState(s => ({ ...s, character: id }));
  }, [setState]);

  // Level actions
  const completeLevel = useCallback(async (level: number, timeSpent = 0) => {
    setState(s => {
      if (s.completedLevels.includes(level)) return s;

      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const hour = now.getHours();

      // Update streak
      let streak = s.streak;
      const lastActivity = s.lastActivityDate;
      if (lastActivity) {
        const lastDate = new Date(lastActivity);
        const daysSince = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSince === 1) {
          streak += 1; // Continue streak
        } else if (daysSince > 1) {
          streak = 1; // Reset streak
        }
        // If same day, don't change streak
      } else {
        streak = 1; // First activity
      }

      // Track time-based achievements
      let nightOwlLevels = s.nightOwlLevels;
      let earlyBirdLevels = s.earlyBirdLevels;
      if (hour >= 0 && hour < 4) {
        nightOwlLevels += 1;
      } else if (hour >= 5 && hour < 7) {
        earlyBirdLevels += 1;
      }

      // Track levels completed today
      let levelsCompletedToday = s.levelsCompletedToday;
      if (s.lastActivityDate === today) {
        levelsCompletedToday += 1;
      } else {
        levelsCompletedToday = 1;
      }

      const completedLevels = [...s.completedLevels, level];
      const levelsInSession = s.levelsInSession + 1;
      const xpEarned = 100; // Base XP reward
      let xp = s.xp + xpEarned;

      // Unlock next level if allowed by plan
      // Level 0 is free, Levels 1-9 require Pro plan
      const next = level + 1;
      let unlockedLevels = s.unlockedLevels;
      const isAdminUser = s.userEmail === 'gabe@onewave-ai.com' || s.userEmail === 'gked21@gmail.com';
      const isPaidGate = next >= 1 && s.plan === 'free' && !isAdminUser;
      if (!isPaidGate && !unlockedLevels.includes(next) && next <= 9) {
        unlockedLevels = [...unlockedLevels, next];
      }

      // Create new state with updated tracking
      const newState = {
        ...s,
        completedLevels,
        unlockedLevels,
        xp,
        streak,
        lastActivityDate: today,
        nightOwlLevels,
        earlyBirdLevels,
        levelsCompletedToday,
        levelsInSession,
      };

      // Check for new achievements
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        // Add achievement IDs
        newState.achievements = [...newState.achievements, ...newAchievements];

        // Add achievement XP
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;

            // Dispatch achievement event
            const achievementEvent: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(achievementEvent), 0);
          }
        });
      }

      // Dispatch level completed event
      const event: LevelCompletedEvent = {
        type: 'level_completed',
        payload: { levelId: level, xpEarned, timeSpent },
        timestamp: new Date(),
      };
      setTimeout(() => dispatchEvent(event), 0);

      return newState;
    });
  }, [setState, dispatchEvent, checkAchievements]);

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

  const incrementPerfectValidations = useCallback(() => {
    setState(s => {
      const newState = { ...s, perfectValidations: s.perfectValidations + 1 };

      // Check for new achievements
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }

      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  const incrementPerfectPrompts = useCallback(() => {
    setState(s => {
      const newState = { ...s, perfectPrompts: s.perfectPrompts + 1 };
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }
      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  const incrementApiIntegrations = useCallback(() => {
    setState(s => {
      const newState = { ...s, apiIntegrations: s.apiIntegrations + 1 };
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }
      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  const incrementSharesCount = useCallback(() => {
    setState(s => {
      const newState = { ...s, sharesCount: s.sharesCount + 1 };
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }
      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  const incrementHelpedUsers = useCallback(() => {
    setState(s => {
      const newState = { ...s, helpedUsers: s.helpedUsers + 1 };
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }
      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  const addSecretCode = useCallback((code: string) => {
    setState(s => {
      if (s.secretCodes.includes(code)) return s;
      const newState = { ...s, secretCodes: [...s.secretCodes, code] };
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        newState.achievements = [...newState.achievements, ...newAchievements];
        newAchievements.forEach(achievementId => {
          const achievement = achievements.find(a => a.id === achievementId);
          if (achievement) {
            newState.xp += achievement.xp;
            const event: AchievementUnlockedEvent = {
              type: 'achievement_unlocked',
              payload: { achievementId, xpEarned: achievement.xp },
              timestamp: new Date(),
            };
            setTimeout(() => dispatchEvent(event), 0);
          }
        });
      }
      return newState;
    });
  }, [setState, checkAchievements, dispatchEvent]);

  // User management
  const setPlan = useCallback((plan: Plan) => {
    setState(s => {
      const newState = { ...s, plan };
      // If upgrading to pro, unlock all levels
      if (plan === 'pro') {
        newState.unlockedLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
      return newState;
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

  // Custom GPT management
  const addCustomGPT = useCallback((gpt: CustomGPT) => {
    setState(s => ({
      ...s,
      customGpts: [...s.customGpts, gpt]
    }));
  }, [setState]);

  const updateCustomGPT = useCallback((id: string, updates: Partial<CustomGPT>) => {
    setState(s => ({
      ...s,
      customGpts: s.customGpts.map(gpt =>
        gpt.id === id ? { ...gpt, ...updates, updatedAt: new Date() } : gpt
      )
    }));
  }, [setState]);

  const deleteCustomGPT = useCallback((id: string) => {
    setState(s => ({
      ...s,
      customGpts: s.customGpts.filter(gpt => gpt.id !== id)
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
    const totalLevels = 10; // 0-9
    return Math.round((state.completedLevels.length / totalLevels) * 100);
  }, [state.completedLevels]);

  const api: ProgressContextType = useMemo(
    () => ({
      ...state,
      setCharacter,
      completeLevel,
      unlockLevel,
      setCurrentLevel,
      addXP,
      awardAchievement,
      incrementPerfectValidations,
      incrementPerfectPrompts,
      incrementApiIntegrations,
      incrementSharesCount,
      incrementHelpedUsers,
      addSecretCode,
      setPlan,
      setLicense,
      setUserEmail,
      updatePreferences,
      addCustomGPT,
      updateCustomGPT,
      deleteCustomGPT,
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
      incrementPerfectValidations,
      incrementPerfectPrompts,
      incrementApiIntegrations,
      incrementSharesCount,
      incrementHelpedUsers,
      addSecretCode,
      setPlan,
      setLicense,
      setUserEmail,
      updatePreferences,
      addCustomGPT,
      updateCustomGPT,
      deleteCustomGPT,
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
