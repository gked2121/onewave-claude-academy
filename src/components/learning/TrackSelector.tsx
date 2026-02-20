'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  BookOpen,
  Trophy,
  Flame,
  Star
} from 'lucide-react';
import { TrackCard } from './TrackCard';
import type { LearningTrack, UserTrackProgress } from '@/lib/types';

interface TrackSelectorProps {
  tracks: LearningTrack[];
  userProgress: Record<string, UserTrackProgress>;
  userPlan: 'free' | 'individual' | 'team' | 'enterprise';
  onSelectTrack: (trackSlug: string) => void;
}

type FilterType = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'in-progress' | 'completed';

export function TrackSelector({
  tracks,
  userProgress,
  userPlan,
  onSelectTrack
}: TrackSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Calculate stats
  const stats = useMemo(() => {
    const totalTracks = tracks.length;
    const startedTracks = Object.keys(userProgress).length;
    const completedTracks = Object.values(userProgress).filter(p => p.completedAt).length;
    const totalLessonsCompleted = Object.values(userProgress).reduce(
      (sum, p) => sum + (p.completedLevels?.length || 0),
      0
    );
    return { totalTracks, startedTracks, completedTracks, totalLessonsCompleted };
  }, [tracks, userProgress]);

  // Filter and sort tracks
  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(track =>
        track.name.toLowerCase().includes(query) ||
        track.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    switch (activeFilter) {
      case 'beginner':
      case 'intermediate':
      case 'advanced':
        result = result.filter(t => t.difficulty === activeFilter);
        break;
      case 'in-progress':
        result = result.filter(t =>
          userProgress[t.slug] && !userProgress[t.slug].completedAt
        );
        break;
      case 'completed':
        result = result.filter(t => userProgress[t.slug]?.completedAt);
        break;
    }

    // Sort by order index
    return result.sort((a, b) => a.orderIndex - b.orderIndex);
  }, [tracks, searchQuery, activeFilter, userProgress]);

  // Check if track is locked (prerequisites not met)
  const isTrackLocked = (track: LearningTrack): boolean => {
    if (track.prerequisites.length === 0) return false;
    return track.prerequisites.some(prereqSlug => {
      const prereqProgress = userProgress[prereqSlug];
      return !prereqProgress?.completedAt;
    });
  };

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Tracks' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Learning <span className="text-gradient-claude">Tracks</span>
          </h1>
          <p className="text-text-soft">
            Master the complete Anthropic Claude ecosystem
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <div>
              <div className="text-lg font-semibold text-text">{stats.startedTracks}/{stats.totalTracks}</div>
              <div className="text-xs text-text-muted">Tracks Started</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-claude" />
            <div>
              <div className="text-lg font-semibold text-text">{stats.completedTracks}</div>
              <div className="text-xs text-text-muted">Completed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-lg font-semibold text-text">{stats.totalLessonsCompleted}</div>
              <div className="text-xs text-text-muted">Lessons Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bg-card border border-border rounded-xl
                     text-text placeholder:text-text-muted
                     focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${activeFilter === filter.value
                  ? 'bg-primary text-white'
                  : 'bg-bg-card text-text-muted hover:text-text hover:bg-bg-lighter'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended track banner (for new users) */}
      {!userProgress['claude-chat'] && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-claude/20 to-primary/20 border border-claude/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-claude/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-claude" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text">Recommended for you</h3>
              <p className="text-text-soft text-sm">
                Start with Claude Chat Fundamentals to build a strong foundation
              </p>
            </div>
            <button
              onClick={() => onSelectTrack('claude-chat')}
              className="px-6 py-2 bg-claude hover:bg-claude-dark text-white rounded-lg
                       font-medium transition-colors shadow-glow-claude"
            >
              Start Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Track grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <TrackCard
                track={track}
                progress={userProgress[track.slug]}
                isLocked={isTrackLocked(track)}
                onClick={() => onSelectTrack(track.slug)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredTracks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-medium text-text mb-2">No tracks found</h3>
          <p className="text-text-muted">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Upgrade banner for free users */}
      {userPlan === 'free' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text mb-1">
                Unlock All Tracks
              </h3>
              <p className="text-text-soft text-sm">
                Upgrade to access all 6 learning tracks, certifications, and premium features
              </p>
            </div>
            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl
                           font-medium transition-colors whitespace-nowrap">
              Upgrade to Full Access
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
