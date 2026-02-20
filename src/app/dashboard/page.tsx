'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Target,
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';
import { TrackSelector } from '@/components/learning/TrackSelector';
import { getAllTracks } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import type { LearningTrack, UserTrackProgress } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { xp, achievements, plan, completedLevels, unlockedLevels, userEmail } = useProgress();
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load tracks
    const allTracks = getAllTracks();
    setTracks(allTracks);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  // Convert local progress to UserTrackProgress format
  // For now, we'll create a simple mapping based on completed levels
  const userProgress: Record<string, UserTrackProgress> = {};

  // Calculate user level from XP
  const userLevel = Math.floor(xp / 500) + 1;

  // Calculate streak (placeholder - would come from actual tracking)
  const streak = 3; // TODO: Implement actual streak tracking

  const handleSelectTrack = (trackSlug: string) => {
    router.push(`/tracks/${trackSlug}`);
  };

  // Map plan to the expected type for TrackSelector
  // Our Plan type is 'free' | 'full', but TrackSelector expects 'free' | 'individual' | 'team' | 'enterprise'
  const userPlan: 'free' | 'individual' | 'team' | 'enterprise' =
    plan === 'full' ? 'individual' : 'free';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back{userEmail ? `, ${userEmail.split('@')[0]}` : ''}!
          </h1>
          <p className="text-text-soft">
            Continue your journey to mastering the Claude ecosystem
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {/* XP Card */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-claude/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-claude" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text">{xp.toLocaleString()}</div>
                <div className="text-xs text-text-muted">Total XP</div>
              </div>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-claude to-primary rounded-full"
                style={{ width: `${(xp % 500) / 5}%` }}
              />
            </div>
            <div className="text-xs text-text-muted mt-1">
              {500 - (xp % 500)} XP to level {userLevel + 1}
            </div>
          </div>

          {/* Level Card */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text">{userLevel}</div>
                <div className="text-xs text-text-muted">Current Level</div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text">{streak}</div>
                <div className="text-xs text-text-muted">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text">{achievements.length}</div>
                <div className="text-xs text-text-muted">Achievements</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          {/* Browse All Tracks Card */}
          {completedLevels.length > 0 && (
            <button
              onClick={() => router.push('/tracks')}
              className="flex items-center justify-between p-5 bg-gradient-to-r from-claude/20 to-primary/20
                       border border-claude/30 rounded-xl hover:border-claude/50 transition-colors text-left"
            >
              <div>
                <h3 className="font-semibold text-text mb-1">Browse All Tracks</h3>
                <p className="text-sm text-text-soft">Continue your learning journey</p>
              </div>
              <ChevronRight className="w-5 h-5 text-claude" />
            </button>
          )}

          {/* View Achievements */}
          <button
            onClick={() => router.push('/achievements')}
            className="flex items-center justify-between p-5 bg-bg-card
                     border border-border rounded-xl hover:border-border-hover transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-1">Achievements</h3>
                <p className="text-sm text-text-soft">{achievements.length} unlocked</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </button>
        </motion.div>

        {/* Track Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TrackSelector
            tracks={tracks}
            userProgress={userProgress}
            userPlan={userPlan}
            onSelectTrack={handleSelectTrack}
          />
        </motion.div>
      </div>
    </main>
  );
}
