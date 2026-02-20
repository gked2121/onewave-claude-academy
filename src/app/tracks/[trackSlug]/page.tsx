'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Trophy,
  Lock,
  CheckCircle,
  Play,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { getTrack, getTrackLevels, trackHasContent } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import type { LearningTrack, TrackLevel } from '@/lib/types';

export default function TrackOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const trackSlug = params.trackSlug as string;
  const { plan, completedLevels, unlockedLevels, userEmail } = useProgress();

  const [track, setTrack] = useState<LearningTrack | null>(null);
  const [levels, setLevels] = useState<Omit<TrackLevel, 'id' | 'trackId'>[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const trackData = getTrack(trackSlug);
    if (trackData) {
      setTrack(trackData);
      const trackLevels = getTrackLevels(trackSlug);
      setLevels(trackLevels);
    }
  }, [trackSlug]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  // Calculate progress
  const progress = useMemo(() => {
    if (!track || levels.length === 0) return { completed: 0, total: 0, percent: 0 };
    // For now, count levels in completedLevels that belong to this track
    // This is simplified - in a full implementation, we'd track per-track progress
    const completed = Math.min(completedLevels.length, levels.length);
    return {
      completed,
      total: levels.length,
      percent: Math.round((completed / levels.length) * 100)
    };
  }, [track, levels, completedLevels]);

  const isLevelUnlocked = (levelNumber: number): boolean => {
    // First level is always unlocked
    if (levelNumber === 1) return true;

    // Check if user has completed the previous level
    // For free plan, only first 2 levels are unlocked
    const isAdminUser = userEmail === 'gabe@onewave-ai.com' || userEmail === 'gked21@gmail.com';
    if (plan === 'free' && levelNumber > 2 && !isAdminUser) return false;

    // Level is unlocked if previous level is completed
    return completedLevels.includes(levelNumber - 1);
  };

  const isLevelCompleted = (levelNumber: number): boolean => {
    return completedLevels.includes(levelNumber);
  };

  const hasContent = trackHasContent(trackSlug);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Track Not Found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-claude text-white rounded-lg hover:bg-claude-dark transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Track Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-bg-card border border-border rounded-2xl p-6 mb-8"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ backgroundColor: track.color }}
          />

          <div className="flex items-start gap-6">
            {/* Track Icon */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${track.color}20` }}
            >
              <Sparkles className="w-8 h-8" style={{ color: track.color }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-text">{track.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  track.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  track.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {track.difficulty}
                </span>
              </div>
              <p className="text-text-soft mb-4">{track.description}</p>

              {/* Meta info */}
              <div className="flex items-center gap-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{track.estimatedHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{track.totalXp?.toLocaleString() || 0} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{progress.completed}/{progress.total} lessons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-muted">Progress</span>
              <span className="text-text font-medium">{progress.percent}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.percent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: track.color }}
              />
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Banner (if no content) */}
        {!hasContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text mb-2">Coming Soon</h3>
            <p className="text-text-soft">
              This track is currently being developed. Check back soon for new lessons!
            </p>
          </motion.div>
        )}

        {/* Levels List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text mb-4">Lessons</h2>

          {levels.length === 0 ? (
            // Show placeholder levels
            <div className="space-y-3">
              {Array.from({ length: track.totalLevels || 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-bg-card border border-border rounded-xl p-4 opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-border flex items-center justify-center">
                      <Lock className="w-5 h-5 text-text-muted" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-48 bg-border rounded animate-pulse" />
                      <div className="h-3 w-32 bg-border rounded mt-2 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            levels.map((level, index) => {
              const unlocked = isLevelUnlocked(level.levelNumber);
              const completed = isLevelCompleted(level.levelNumber);

              return (
                <motion.button
                  key={level.levelNumber}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => unlocked && router.push(`/tracks/${trackSlug}/${level.levelNumber}`)}
                  disabled={!unlocked}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all
                    ${unlocked
                      ? 'bg-bg-card border border-border hover:border-border-hover cursor-pointer'
                      : 'bg-bg-card/50 border border-border/50 opacity-60 cursor-not-allowed'
                    }
                    ${completed ? 'border-l-4' : ''}
                  `}
                  style={completed ? { borderLeftColor: track.color } : {}}
                >
                  {/* Level Number / Status */}
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${completed ? 'bg-success/20' : unlocked ? 'bg-primary/20' : 'bg-border'}
                    `}
                  >
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : unlocked ? (
                      <Play className="w-5 h-5 text-primary" />
                    ) : (
                      <Lock className="w-5 h-5 text-text-muted" />
                    )}
                  </div>

                  {/* Level Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">Level {level.levelNumber}</span>
                      {!level.isFree && plan === 'free' && (
                        <span className="px-2 py-0.5 bg-claude/20 text-claude text-xs rounded-full">
                          Pro
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-text">{level.title}</h3>
                    <p className="text-sm text-text-muted line-clamp-1">{level.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{level.estimatedMinutes}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      <span>{level.xpReward} XP</span>
                    </div>
                    {unlocked && (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Upgrade CTA for free users */}
        {plan === 'free' && levels.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-claude/10 border border-primary/30"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-1">
                  Unlock All Lessons
                </h3>
                <p className="text-text-soft text-sm">
                  Upgrade to Pro to access all lessons, certifications, and premium features
                </p>
              </div>
              <button
                onClick={() => router.push('/upgrade')}
                className="px-6 py-3 bg-claude hover:bg-claude-dark text-white rounded-xl
                         font-medium transition-colors whitespace-nowrap shadow-glow-claude"
              >
                Upgrade to Pro
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
