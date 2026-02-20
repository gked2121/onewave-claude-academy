'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  Terminal,
  Plug,
  Code,
  Building,
  Zap,
  Lock,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import type { LearningTrack, UserTrackProgress } from '@/lib/types';

interface TrackCardProps {
  track: LearningTrack;
  progress?: UserTrackProgress;
  isLocked?: boolean;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'message-circle': MessageCircle,
  'terminal': Terminal,
  'plug': Plug,
  'code': Code,
  'building': Building,
  'zap': Zap,
};

export function TrackCard({ track, progress, isLocked = false, onClick }: TrackCardProps) {
  const Icon = iconMap[track.icon] || Code;
  const completedCount = progress?.completedLevels?.length || 0;
  const totalLevels = track.totalLevels || 10;
  const completionPercent = Math.round((completedCount / totalLevels) * 100);
  const isCompleted = completionPercent === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-300
        ${isLocked
          ? 'bg-bg-card/50 opacity-60 cursor-not-allowed'
          : 'bg-bg-card hover:shadow-glow-blue'
        }
        border border-border hover:border-border-hover
      `}
    >
      {/* Background gradient accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: track.color }}
      />

      {/* Lock overlay for locked tracks */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg/50 z-10">
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <Lock className="w-8 h-8" />
            <span className="text-sm">Complete prerequisites first</span>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${track.color}20` }}
        >
          <Icon
            className="w-7 h-7"
            style={{ color: track.color }}
          />
        </div>

        {/* Status badge */}
        {isCompleted ? (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        ) : progress ? (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
            <span>{completionPercent}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-text-muted/20 text-text-muted text-sm">
            <span>Not started</span>
          </div>
        )}
      </div>

      {/* Track info */}
      <h3 className="text-xl font-semibold text-text mb-2">{track.name}</h3>
      <p className="text-text-soft text-sm mb-4 line-clamp-2">{track.description}</p>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-text-muted text-sm mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{track.estimatedHours}h</span>
        </div>
        <div className={`capitalize ${
          track.difficulty === 'beginner' ? 'text-green-400' :
          track.difficulty === 'intermediate' ? 'text-yellow-400' :
          'text-red-400'
        }`}>
          {track.difficulty}
        </div>
        <div>
          {totalLevels} lessons
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute h-full rounded-full"
          style={{ backgroundColor: track.color }}
        />
      </div>

      {/* Start/Continue button hint */}
      {!isLocked && (
        <div className="flex items-center justify-end mt-4 text-primary">
          <span className="text-sm font-medium">
            {progress ? 'Continue' : 'Start Learning'}
          </span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </motion.div>
  );
}
