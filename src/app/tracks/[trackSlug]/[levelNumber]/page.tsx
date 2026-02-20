'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LevelPlayer } from '@/components/learning/LevelPlayer';
import { getTrack, getTrackLevel, getNextLevel as getNextLevelNumber, trackHasContent } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import type { LearningTrack, TrackLevel } from '@/lib/types';
import { Lock, AlertCircle } from 'lucide-react';

export default function LevelPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const trackSlug = params.trackSlug as string;
  const levelNumber = parseInt(params.levelNumber as string, 10);

  const {
    completeLevel,
    isLevelCompleted,
    isLevelUnlocked,
    plan,
    userEmail,
    addXP
  } = useProgress();

  const [track, setTrack] = useState<LearningTrack | null>(null);
  const [level, setLevel] = useState<TrackLevel | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isCurrentLevelCompleted, setIsCurrentLevelCompleted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const trackData = getTrack(trackSlug);
    if (trackData) {
      setTrack(trackData);
      const levelData = getTrackLevel(trackSlug, levelNumber);
      if (levelData) {
        // Add id and trackId to create full TrackLevel
        setLevel({
          ...levelData,
          id: `${trackSlug}-${levelNumber}`,
          trackId: trackData.id
        } as TrackLevel);
      }
    }
  }, [trackSlug, levelNumber]);

  useEffect(() => {
    if (mounted) {
      // Use levelNumber directly since our progress tracking uses level numbers
      setIsCurrentLevelCompleted(isLevelCompleted(levelNumber));
    }
  }, [mounted, levelNumber, isLevelCompleted]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  // Check if level is locked
  const isLevelLocked = useCallback(() => {
    if (levelNumber === 1) return false;

    const isAdminUser = userEmail === 'gabe@onewave-ai.com' || userEmail === 'gked21@gmail.com';
    if (plan === 'free' && levelNumber > 2 && !isAdminUser) return true;

    // Check if previous level is completed
    return !isLevelCompleted(levelNumber - 1);
  }, [levelNumber, plan, userEmail, isLevelCompleted]);

  const handleComplete = useCallback((score: number) => {
    if (!level) return;

    // Complete the level and add XP
    completeLevel(levelNumber);

    // Mark as completed in local state
    setIsCurrentLevelCompleted(true);
  }, [level, levelNumber, completeLevel]);

  const handleBack = useCallback(() => {
    router.push(`/tracks/${trackSlug}`);
  }, [router, trackSlug]);

  const handleNext = useCallback(() => {
    const nextLevelNum = getNextLevelNumber(trackSlug, levelNumber);
    if (nextLevelNum) {
      router.push(`/tracks/${trackSlug}/${nextLevelNum}`);
    } else {
      // No next level, go back to track overview
      router.push(`/tracks/${trackSlug}`);
    }
  }, [router, trackSlug, levelNumber]);

  // Check for next level availability
  const hasNext = !!getNextLevelNumber(trackSlug, levelNumber);
  const hasPrevious = levelNumber > 1;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Track not found
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

  // Level not found or track has no content
  if (!level || !trackHasContent(trackSlug)) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text mb-4">Coming Soon</h1>
          <p className="text-text-soft mb-6">
            This lesson is currently being developed. Check back soon!
          </p>
          <button
            onClick={() => router.push(`/tracks/${trackSlug}`)}
            className="px-6 py-3 bg-claude text-white rounded-lg hover:bg-claude-dark transition-colors"
          >
            Back to Track
          </button>
        </motion.div>
      </div>
    );
  }

  // Level is locked
  if (isLevelLocked()) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-4">Level Locked</h1>
          <p className="text-text-soft mb-6">
            {plan === 'free' && levelNumber > 2
              ? 'Upgrade to Pro to unlock all lessons'
              : 'Complete the previous level to unlock this one'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(`/tracks/${trackSlug}`)}
              className="px-6 py-3 bg-bg-card border border-border text-text rounded-lg
                       hover:bg-bg-lighter transition-colors"
            >
              Back to Track
            </button>
            {plan === 'free' && levelNumber > 2 && (
              <button
                onClick={() => router.push('/upgrade')}
                className="px-6 py-3 bg-claude text-white rounded-lg hover:bg-claude-dark transition-colors"
              >
                Upgrade to Pro
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <LevelPlayer
          level={level}
          trackColor={track.color}
          isCompleted={isCurrentLevelCompleted}
          onComplete={handleComplete}
          onBack={handleBack}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </div>
    </main>
  );
}
