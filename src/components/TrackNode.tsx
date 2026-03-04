'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, Play, ChevronRight, Clock, Sparkles } from 'lucide-react';
import type { LearningTrack } from '@/lib/types';

export type TrackNodeState = 'locked' | 'available' | 'in-progress' | 'completed';

interface TrackNodeProps {
  track: LearningTrack;
  state: TrackNodeState;
  completedCount: number;
  totalCount: number;
  percent: number;
  nextLevelNumber?: number;
  nextLevelTitle?: string;
  index: number;
}

export function TrackNode({
  track,
  state,
  completedCount,
  totalCount,
  percent,
  nextLevelNumber,
  nextLevelTitle,
  index,
}: TrackNodeProps) {
  const [expanded, setExpanded] = useState(false);

  const isClickable = state !== 'locked';
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - percent / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
      className="relative"
    >
      <button
        onClick={() => isClickable && setExpanded(!expanded)}
        disabled={!isClickable}
        className={`
          relative w-full rounded-2xl border p-5 text-left transition-all duration-300
          ${state === 'locked'
            ? 'bg-bg-card/40 border-border/50 opacity-50 cursor-not-allowed'
            : state === 'completed'
              ? 'bg-bg-card border-success/30 hover:border-success/50'
              : state === 'in-progress'
                ? 'bg-bg-card border-border hover:border-border-hover'
                : 'bg-bg-card border-border hover:border-border-hover'
          }
        `}
        style={
          state === 'in-progress'
            ? { borderColor: `${track.color}40` }
            : state === 'available'
              ? { borderColor: `${track.color}25` }
              : undefined
        }
      >
        <div className="flex items-center gap-4">
          {/* Progress Ring */}
          <div className="relative flex-shrink-0">
            <svg width="88" height="88" viewBox="0 0 88 88" className="transform -rotate-90">
              <circle
                cx="44" cy="44" r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-border"
              />
              {state !== 'locked' && (
                <circle
                  cx="44" cy="44" r={radius}
                  fill="none"
                  stroke={state === 'completed' ? '#10B981' : track.color}
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {state === 'locked' ? (
                <Lock className="w-6 h-6 text-text-muted/50" />
              ) : state === 'completed' ? (
                <CheckCircle className="w-7 h-7 text-success" />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${track.color}20` }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: track.color }} />
                </div>
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text text-sm mb-0.5">{track.name}</h3>
            <p className="text-xs text-text-muted line-clamp-1">{track.description}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
              <span>{completedCount}/{totalCount} levels</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {track.estimatedHours}h
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {track.totalXp?.toLocaleString()} XP
              </span>
            </div>
          </div>

          {/* State Badge */}
          <div className="flex-shrink-0">
            {state === 'locked' && (
              <span className="px-2 py-1 text-xs rounded-full bg-border text-text-muted">Locked</span>
            )}
            {state === 'completed' && (
              <span className="px-2 py-1 text-xs rounded-full bg-success/20 text-success">Complete</span>
            )}
            {state === 'in-progress' && (
              <span
                className="px-2 py-1 text-xs rounded-full font-medium"
                style={{ backgroundColor: `${track.color}20`, color: track.color }}
              >
                {percent}%
              </span>
            )}
            {state === 'available' && (
              <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">Start</span>
            )}
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && isClickable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 px-1">
              <div className="rounded-xl border border-border bg-bg p-4 space-y-2">
                {/* Continue / Start CTA */}
                {nextLevelNumber && (
                  <Link
                    href={`/tracks/${track.slug}/${nextLevelNumber}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-bg-card group"
                    style={{ backgroundColor: `${track.color}08` }}
                  >
                    <Play className="w-4 h-4" style={{ color: track.color }} />
                    <div className="flex-1">
                      <p className="text-xs text-text-muted">
                        {state === 'available' ? 'Start with' : 'Continue'}
                      </p>
                      <p className="text-sm font-medium text-text">
                        Level {nextLevelNumber}: {nextLevelTitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}

                {/* View Track Link */}
                <Link
                  href={`/tracks/${track.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-card transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-soft flex-1">View all levels</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
