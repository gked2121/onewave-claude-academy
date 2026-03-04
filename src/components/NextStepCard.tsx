'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { getNextStep, getTrackRecommendations, type NextStepResult } from '@/lib/recommendations';
import { useProgress } from '@/context/ProgressContext';

interface NextStepCardProps {
  /** Show as overlay modal after level completion */
  overlay?: boolean;
  /** Callback to dismiss overlay */
  onDismiss?: () => void;
  /** Show compact version */
  compact?: boolean;
  className?: string;
}

export function NextStepCard({ overlay = false, onDismiss, compact = false, className = '' }: NextStepCardProps) {
  const { completedLevels, learningPath } = useProgress();
  const nextStep = getNextStep(completedLevels, learningPath);
  const recommendations = getTrackRecommendations(completedLevels, 2);

  if (!nextStep || nextStep.type === 'all-complete') {
    if (nextStep?.type === 'all-complete') {
      return (
        <div className={`rounded-xl border border-success/30 bg-success/10 p-6 text-center ${className}`}>
          <Trophy className="w-10 h-10 text-success mx-auto mb-3" />
          <h3 className="text-lg font-bold text-text mb-1">Path Complete!</h3>
          <p className="text-sm text-text-soft">You have completed all levels in your learning path.</p>
          <Link
            href="/knowledge-map"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-bg-card border border-border text-sm font-medium text-text hover:bg-bg-lighter transition-colors"
          >
            View Knowledge Map
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }
    return null;
  }

  if (overlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="bg-bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Sparkles className="w-12 h-12 text-claude mx-auto mb-3" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-text mb-1"
            >
              Level Complete!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-text-soft"
            >
              Great work. Here is what is next:
            </motion.p>
          </div>

          <NextStepContent nextStep={nextStep} />

          {recommendations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-text-muted mb-2">Or explore:</p>
              {recommendations.slice(0, 1).map(rec => (
                <Link
                  key={rec.track.slug}
                  href={`/tracks/${rec.track.slug}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-lighter transition-colors"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: rec.track.color }}
                  />
                  <span className="text-sm text-text-soft">{rec.track.name}</span>
                  <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onDismiss}
              className="flex-1 px-4 py-2.5 rounded-xl bg-bg border border-border text-sm font-medium text-text-muted hover:bg-bg-lighter transition-colors"
            >
              Back to Track
            </button>
            <Link
              href={`/tracks/${nextStep.trackSlug}/${nextStep.levelNumber}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: nextStep.trackColor }}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (compact) {
    return (
      <Link
        href={`/tracks/${nextStep.trackSlug}/${nextStep.levelNumber}`}
        className={`flex items-center gap-3 rounded-xl border border-border bg-bg-card p-3 hover:border-border-hover transition-colors ${className}`}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${nextStep.trackColor}20` }}
        >
          <ArrowRight className="w-4 h-4" style={{ color: nextStep.trackColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-muted">{nextStep.reason}</p>
          <p className="text-sm font-medium text-text truncate">{nextStep.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
      </Link>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-bg-card overflow-hidden ${className}`}>
      <div
        className="h-1"
        style={{ backgroundColor: nextStep.trackColor }}
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-claude" />
          <span className="text-sm font-semibold text-text">What is Next</span>
        </div>

        <NextStepContent nextStep={nextStep} />

        {recommendations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-text-muted mb-2">Also recommended:</p>
            <div className="space-y-1">
              {recommendations.map(rec => (
                <Link
                  key={rec.track.slug}
                  href={`/tracks/${rec.track.slug}`}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-bg-lighter transition-colors"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: rec.track.color }}
                  />
                  <span className="text-xs text-text-soft flex-1">{rec.track.name}</span>
                  <span className="text-xs text-text-muted">{rec.reason}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NextStepContent({ nextStep }: { nextStep: NextStepResult }) {
  return (
    <Link
      href={`/tracks/${nextStep.trackSlug}/${nextStep.levelNumber}`}
      className="flex items-center gap-4 p-3 rounded-xl bg-bg hover:bg-bg-lighter transition-colors group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
        style={{ backgroundColor: nextStep.trackColor }}
      >
        {nextStep.levelNumber}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-muted">{nextStep.trackName}</p>
        <p className="text-sm font-semibold text-text truncate">{nextStep.title}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
          <span>{nextStep.estimatedMinutes} min</span>
          <span>+{nextStep.xpReward} XP</span>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-text transition-colors flex-shrink-0" />
    </Link>
  );
}
