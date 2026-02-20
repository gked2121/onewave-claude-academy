"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import {
  Trophy,
  Star,
  Zap,
  Target,
  TrendingUp,
  Award,
  Gift,
  Flame,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react';

interface ProgressStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  badges: number;
  completedChallenges: number;
  totalTime: string;
}

export default function ProgressTracker() {
  const { xp, completedLevels, achievements } = useProgress();
  const [stats, setStats] = useState<ProgressStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streak: 0,
    badges: 0,
    completedChallenges: 0,
    totalTime: '0h'
  });

  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    const calculateStats = () => {
      const currentXp = xp || 0;
      const level = Math.floor(currentXp / 100) + 1;
      const xpInCurrentLevel = currentXp % 100;
      const xpToNext = 100 - xpInCurrentLevel;

      const badges = (achievements || []).length;
      const completed = (completedLevels || []).length;

      setStats({
        level,
        xp: xpInCurrentLevel,
        xpToNextLevel: xpToNext,
        streak: 0, // TODO: Implement streak
        badges,
        completedChallenges: completed,
        totalTime: '0h' // TODO: Implement time tracking
      });

      if (xpInCurrentLevel === 0 && currentXp > 0) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
    };

    calculateStats();
  }, [xp, achievements, completedLevels]);

  const xpProgress = (stats.xp / 100) * 100;

  return (
    <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-40">
      <div className="w-64">
        <motion.div
          className="bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-white/10 p-3 shadow-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
        {/* Level & XP */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Level {stats.level}</p>
                <p className="text-white/60 text-xs">{stats.xp}/{100} XP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary font-bold text-xs">{stats.badges} badges</p>
              <p className="text-white/40 text-xs">{stats.completedChallenges} done</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            {stats.streak}d
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-secondary" />
            {stats.totalTime}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Keep going!
          </span>
        </div>
      </motion.div>
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl px-6 py-3">
            <p className="text-white font-bold text-xl">LEVEL UP!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
