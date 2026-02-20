"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Map, Trophy } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import ProgressBar from './ProgressBar';

interface LevelNavigationProps {
  currentLevel: number;
  maxLevel?: number;
  showHomeButton?: boolean;
}

export default function LevelNavigation({
  currentLevel,
  maxLevel = 8,
  showHomeButton = true
}: LevelNavigationProps) {
  const { completedLevels, xp, unlockedLevels } = useProgress();

  const prevLevel = currentLevel - 1;
  const nextLevel = currentLevel + 1;

  const isPrevAvailable = prevLevel >= 0 && (completedLevels.includes(prevLevel) || unlockedLevels.includes(prevLevel));
  const isNextAvailable = nextLevel <= maxLevel && (completedLevels.includes(currentLevel) || unlockedLevels.includes(nextLevel));

  const totalXP = completedLevels.reduce((sum, level) => {
    // Calculate XP based on level difficulty
    if (level <= 2) return sum + 500 + (level * 250); // Beginner levels
    if (level <= 5) return sum + 1000 + ((level - 2) * 250); // Intermediate levels
    return sum + 2000 + ((level - 5) * 500); // Advanced levels
  }, 0);

  const completionPercentage = (completedLevels.length / (maxLevel + 1)) * 100;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-white/10 p-4 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Summary */}
        <div className="mb-4">
          <ProgressBar
            current={completedLevels.length}
            total={maxLevel + 1}
            label="Quest Progress"
            showPercentage={true}
          />
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Left Section - Previous Level */}
          <div className="flex items-center gap-3">
            {showHomeButton && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}

            {isPrevAvailable ? (
              <Link
                href={`/level/${prevLevel}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Level {prevLevel}</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white/50 rounded-xl cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </div>
            )}
          </div>

          {/* Center Section - Current Level Info */}
          <div className="text-center">
            <div className="text-lg font-bold text-white mb-1">
              Level {currentLevel}
            </div>
            <div className="text-sm text-white/60">
              {totalXP.toLocaleString()} XP Earned
            </div>
          </div>

          {/* Right Section - Next Level & Journey */}
          <div className="flex items-center gap-3">
            {isNextAvailable ? (
              <Link
                href={`/level/${nextLevel}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
              >
                <span className="hidden sm:inline">Level {nextLevel}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : completedLevels.includes(currentLevel) ? (
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <span className="hidden sm:inline">Complete!</span>
                <Trophy className="w-4 h-4" />
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white/50 rounded-xl cursor-not-allowed">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}

            <Link
              href="/journey"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Journey</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs text-white/60">
          <span>{completedLevels.length} Completed</span>
          <span>•</span>
          <span>{Math.round(completionPercentage)}% Progress</span>
          <span>•</span>
          <span>{totalXP.toLocaleString()} Total XP</span>
        </div>
      </div>
    </motion.div>
  );
}