'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { useProgress, type PathProgress } from '@/context/ProgressContext';
import { getPath } from '@/lib/paths';

interface PathProgressBarProps {
  compact?: boolean;
  showNextStep?: boolean;
  className?: string;
}

export function PathProgressBar({ compact = false, showNextStep = true, className = '' }: PathProgressBarProps) {
  const { getPathProgress } = useProgress();
  const pathProgress = getPathProgress();

  if (!pathProgress) return null;

  const path = getPath(pathProgress.pathSlug);
  if (!path) return null;

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: path.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pathProgress.percentComplete}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: path.color }}
            />
          </div>
        </div>
        <span className="text-xs text-text-muted flex-shrink-0">
          {pathProgress.percentComplete}%
        </span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-bg-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: path.color }} />
          <span className="text-sm font-semibold text-text">{path.name} Path</span>
        </div>
        <span className="text-xs text-text-muted">
          {pathProgress.completedLevelsInPath} of {pathProgress.totalLevelsInPath} levels
        </span>
      </div>

      <div className="h-2 bg-border rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pathProgress.percentComplete}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: path.color }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">
          {pathProgress.percentComplete}% complete
        </span>

        {showNextStep && pathProgress.nextRecommendedLevel && (
          <Link
            href={`/tracks/${pathProgress.nextRecommendedLevel.trackSlug}/${pathProgress.nextRecommendedLevel.levelNumber}`}
            className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity"
            style={{ color: path.color }}
          >
            <span>Next: {pathProgress.nextRecommendedLevel.title}</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
