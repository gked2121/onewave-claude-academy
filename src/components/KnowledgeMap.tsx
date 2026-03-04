'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { getAllTracks, getTrackLevels } from '@/lib/tracks';
import { useProgress } from '@/context/ProgressContext';
import { TrackNode, type TrackNodeState } from '@/components/TrackNode';

// Define prerequisite connections for SVG arrows
const CONNECTIONS: { from: string; to: string }[] = [
  { from: 'claude-chat', to: 'claude-code' },
  { from: 'claude-chat', to: 'claude-workspace' },
  { from: 'claude-chat', to: 'anthropic-api' },
  { from: 'claude-chat', to: 'claude-enterprise' },
  { from: 'claude-chat', to: 'ai-strategy' },
  { from: 'claude-code', to: 'mcp-development' },
  { from: 'claude-code', to: 'claude-skills' },
];

// Layout positions for desktop (grid-based)
const TRACK_LAYOUT: Record<string, { row: number; col: number }> = {
  'claude-chat': { row: 0, col: 0 },
  'claude-workspace': { row: 1, col: 0 },
  'claude-code': { row: 1, col: 1 },
  'anthropic-api': { row: 1, col: 2 },
  'claude-enterprise': { row: 1, col: 3 },
  'mcp-development': { row: 2, col: 1 },
  'claude-skills': { row: 2, col: 2 },
  'ai-strategy': { row: 2, col: 3 },
};

export function KnowledgeMap() {
  const { completedLevels } = useProgress();
  const allTracks = getAllTracks();

  const trackInfoMap = useMemo(() => {
    const map = new Map<string, {
      state: TrackNodeState;
      completedCount: number;
      totalCount: number;
      percent: number;
      nextLevelNumber?: number;
      nextLevelTitle?: string;
    }>();

    for (const track of allTracks) {
      const levels = getTrackLevels(track.slug);
      const completed = levels.filter(l => completedLevels.includes(l.levelNumber));
      const total = levels.length;
      const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
      const nextLevel = levels.find(l => !completedLevels.includes(l.levelNumber));

      // Determine state
      let state: TrackNodeState = 'locked';
      if (completed.length === total && total > 0) {
        state = 'completed';
      } else if (completed.length > 0) {
        state = 'in-progress';
      } else {
        // Check prerequisites
        const prereqsMet = track.prerequisites.every(prereqSlug => {
          const prereqLevels = getTrackLevels(prereqSlug);
          return prereqLevels.length > 0 && prereqLevels.every(l => completedLevels.includes(l.levelNumber));
        });

        // Available if no prereqs or all prereqs completed
        if (track.prerequisites.length === 0 || prereqsMet) {
          state = 'available';
        }
      }

      map.set(track.slug, {
        state,
        completedCount: completed.length,
        totalCount: total,
        percent,
        nextLevelNumber: nextLevel?.levelNumber,
        nextLevelTitle: nextLevel?.title,
      });
    }

    return map;
  }, [allTracks, completedLevels]);

  // Overall stats
  const totalLevels = allTracks.reduce((sum, t) => sum + (getTrackLevels(t.slug).length), 0);
  const totalCompleted = completedLevels.length;
  const totalXP = allTracks.reduce((sum, t) => {
    const levels = getTrackLevels(t.slug);
    return sum + levels.filter(l => completedLevels.includes(l.levelNumber)).reduce((s, l) => s + l.xpReward, 0);
  }, 0);

  // Sort tracks by layout position for vertical rendering
  const sortedTracks = useMemo(() => {
    return [...allTracks].sort((a, b) => {
      const posA = TRACK_LAYOUT[a.slug] || { row: 99, col: 0 };
      const posB = TRACK_LAYOUT[b.slug] || { row: 99, col: 0 };
      if (posA.row !== posB.row) return posA.row - posB.row;
      return posA.col - posB.col;
    });
  }, [allTracks]);

  // Group tracks by row for the grid layout
  const tracksByRow = useMemo(() => {
    const rows: { slug: string; track: typeof allTracks[0] }[][] = [];
    for (const track of sortedTracks) {
      const pos = TRACK_LAYOUT[track.slug] || { row: 0, col: 0 };
      while (rows.length <= pos.row) rows.push([]);
      rows[pos.row].push({ slug: track.slug, track });
    }
    return rows;
  }, [sortedTracks]);

  return (
    <div>
      {/* Overall Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-6 mb-8 p-4 rounded-xl bg-bg-card border border-border"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="text-sm text-text">
            <span className="font-bold">{totalCompleted}</span>
            <span className="text-text-muted">/{totalLevels} levels</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-claude" />
          <span className="text-sm text-text">
            <span className="font-bold">{totalXP.toLocaleString()}</span>
            <span className="text-text-muted"> XP earned</span>
          </span>
        </div>
        <div className="flex-1 hidden sm:block">
          <div className="h-2 bg-border rounded-full overflow-hidden max-w-md">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalLevels > 0 ? (totalCompleted / totalLevels) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-claude to-primary rounded-full"
            />
          </div>
        </div>
        <span className="text-sm font-bold text-text">
          {totalLevels > 0 ? Math.round((totalCompleted / totalLevels) * 100) : 0}%
        </span>
      </motion.div>

      {/* Track Grid with Connection Lines */}
      <div className="space-y-6">
        {tracksByRow.map((row, rowIndex) => (
          <div key={rowIndex}>
            {/* Row connector: vertical line from previous row */}
            {rowIndex > 0 && (
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 text-text-muted/30">
                  <svg width="2" height="24" className="text-border">
                    <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>
            )}

            {/* Row label */}
            {rowIndex === 0 && (
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3 pl-1">Foundation</p>
            )}
            {rowIndex === 1 && (
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3 pl-1">Core Tracks</p>
            )}
            {rowIndex === 2 && (
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3 pl-1">Advanced</p>
            )}

            {/* Track nodes */}
            <div className={`grid gap-4 ${
              row.length === 1 ? 'grid-cols-1 max-w-md' :
              row.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
              row.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {row.map(({ slug, track }) => {
                const info = trackInfoMap.get(slug);
                if (!info) return null;
                return (
                  <TrackNode
                    key={slug}
                    track={track}
                    state={info.state}
                    completedCount={info.completedCount}
                    totalCount={info.totalCount}
                    percent={info.percent}
                    nextLevelNumber={info.nextLevelNumber}
                    nextLevelTitle={info.nextLevelTitle}
                    index={rowIndex * 4 + row.indexOf({ slug, track })}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-border text-xs text-text-muted"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-border" />
          <span>Locked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-claude" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <svg width="20" height="2" className="text-border">
            <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
          <span>Prerequisite</span>
        </div>
      </motion.div>
    </div>
  );
}
