'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  CheckCircle,
  Lock,
  Play,
  ArrowLeft,
  Clock,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { PathProgressBar } from '@/components/PathProgressBar';
import type { TrackLevel, LearningTrack } from '@/lib/types';

interface LessonSidebarProps {
  track: LearningTrack;
  levels: Omit<TrackLevel, 'id' | 'trackId'>[];
  currentLevelNumber: number;
}

const SIDEBAR_STORAGE_KEY = 'onewave:sidebar-collapsed';

export function LessonSidebar({ track, levels, currentLevelNumber }: LessonSidebarProps) {
  const { completedLevels, plan, userEmail, learningPath } = useProgress();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === 'true') setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
  };

  const isLevelUnlocked = (levelNumber: number): boolean => {
    if (levelNumber === 1) return true;
    const isAdminUser = userEmail === 'gabe@onewave-ai.com' || userEmail === 'gked21@gmail.com';
    if (plan === 'free' && levelNumber > 2 && !isAdminUser) return false;
    return completedLevels.includes(levelNumber - 1);
  };

  const isLevelCompleted = (levelNumber: number): boolean => {
    return completedLevels.includes(levelNumber);
  };

  // Desktop sidebar
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <Link
            href={`/tracks/${track.slug}`}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Track
          </Link>
          <button
            onClick={toggleCollapsed}
            className="p-1 rounded hover:bg-bg-lighter transition-colors text-text-muted hover:text-text hidden lg:block"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded hover:bg-bg-lighter transition-colors text-text-muted hover:text-text lg:hidden"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: track.color }}
          />
          <h3 className="font-semibold text-text text-sm truncate">{track.name}</h3>
        </div>
      </div>

      {/* Level List */}
      <div className="flex-1 overflow-y-auto py-2">
        {levels.map((level) => {
          const completed = isLevelCompleted(level.levelNumber);
          const unlocked = isLevelUnlocked(level.levelNumber);
          const isCurrent = level.levelNumber === currentLevelNumber;

          return (
            <Link
              key={level.levelNumber}
              href={unlocked ? `/tracks/${track.slug}/${level.levelNumber}` : '#'}
              onClick={e => {
                if (!unlocked) e.preventDefault();
                setMobileOpen(false);
              }}
              className={`
                flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                ${isCurrent
                  ? 'bg-bg-lighter border-l-2'
                  : unlocked
                    ? 'hover:bg-bg-lighter'
                    : 'opacity-40 cursor-not-allowed'
                }
              `}
              style={isCurrent ? { borderLeftColor: track.color } : undefined}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {completed ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : isCurrent ? (
                  <Play className="w-4 h-4" style={{ color: track.color }} />
                ) : unlocked ? (
                  <span className="w-4 h-4 flex items-center justify-center text-xs text-text-muted">
                    {level.levelNumber}
                  </span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-text-muted/50" />
                )}
              </div>

              {/* Level Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${
                  isCurrent ? 'font-semibold text-text' :
                  completed ? 'text-text-muted' :
                  'text-text-soft'
                }`}>
                  {level.title}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-1.5 text-xs text-text-muted/60 flex-shrink-0">
                <span>{level.xpReward}</span>
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Path Progress (bottom) */}
      {learningPath && (
        <div className="p-3 border-t border-border">
          <PathProgressBar compact />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed left-4 top-20 z-40 p-2 rounded-lg bg-bg-card border border-border text-text-muted hover:text-text transition-colors shadow-lg"
      >
        <PanelLeft className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-bg-card border-r border-border lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        {collapsed ? (
          <button
            onClick={toggleCollapsed}
            className="fixed left-4 top-20 z-30 p-2 rounded-lg bg-bg-card border border-border text-text-muted hover:text-text transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        ) : (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            className="w-[280px] border-r border-border bg-bg-card h-[calc(100vh-64px)] sticky top-16 overflow-hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </div>
    </>
  );
}
