'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { getPath } from '@/lib/paths';
import { getTrack } from '@/lib/tracks';

interface LessonBreadcrumbsProps {
  trackSlug: string;
  levelNumber?: number;
  levelTitle?: string;
}

export function LessonBreadcrumbs({ trackSlug, levelNumber, levelTitle }: LessonBreadcrumbsProps) {
  const { learningPath } = useProgress();
  const track = getTrack(trackSlug);
  const path = learningPath ? getPath(learningPath) : null;

  if (!track) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
      {path && (
        <>
          <Link
            href={`/paths/${path.slug}`}
            className="hover:text-text transition-colors"
            style={{ color: path.color }}
          >
            {path.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted/50 flex-shrink-0" />
        </>
      )}
      <Link
        href={`/tracks/${trackSlug}`}
        className="hover:text-text transition-colors"
      >
        {track.name}
      </Link>
      {levelNumber !== undefined && levelTitle && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted/50 flex-shrink-0" />
          <span className="text-text font-medium">
            Level {levelNumber}: {levelTitle}
          </span>
        </>
      )}
    </nav>
  );
}
