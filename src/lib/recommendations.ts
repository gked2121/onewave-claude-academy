// Smart recommendations engine for next steps and track suggestions
import { getAllTracks, getTrackLevels, getTrack } from '@/lib/tracks';
import { getPath, ROLE_PATHS } from '@/lib/paths';
import type { LearningTrack, RolePath } from '@/lib/types';

export interface NextStepResult {
  type: 'next-level' | 'next-track' | 'new-track' | 'all-complete';
  trackSlug: string;
  trackName: string;
  trackColor: string;
  levelNumber: number;
  title: string;
  reason: string;
  xpReward: number;
  estimatedMinutes: number;
}

export interface TrackRecommendation {
  track: LearningTrack;
  reason: string;
  priority: number; // lower = higher priority
}

/**
 * Get the user's recommended next step based on their progress and learning path
 */
export function getNextStep(
  completedLevels: number[],
  learningPathSlug?: string
): NextStepResult | null {
  const allTracks = getAllTracks();

  // If user has a selected learning path, follow that sequence
  if (learningPathSlug) {
    const path = getPath(learningPathSlug);
    if (path) {
      return getNextStepInPath(path, completedLevels, allTracks);
    }
  }

  // No path: find the best next step across all tracks
  return getNextStepAcrossTracks(completedLevels, allTracks);
}

function getNextStepInPath(
  path: RolePath,
  completedLevels: number[],
  allTracks: LearningTrack[]
): NextStepResult | null {
  // Walk through path's track sequence in order
  for (const entry of path.trackSequence) {
    const track = allTracks.find(t => t.slug === entry.trackSlug);
    if (!track) continue;

    const levels = getTrackLevels(entry.trackSlug);
    const relevantLevels = entry.selectedLevels?.length
      ? levels.filter(l => entry.selectedLevels!.includes(l.levelNumber))
      : levels;

    // Find first incomplete level in this track
    for (const level of relevantLevels) {
      if (!completedLevels.includes(level.levelNumber)) {
        return {
          type: 'next-level',
          trackSlug: entry.trackSlug,
          trackName: track.name,
          trackColor: track.color,
          levelNumber: level.levelNumber,
          title: level.title,
          reason: `Next in your ${path.name} path`,
          xpReward: level.xpReward,
          estimatedMinutes: level.estimatedMinutes,
        };
      }
    }
  }

  return { type: 'all-complete', trackSlug: '', trackName: '', trackColor: '', levelNumber: 0, title: 'Path Complete!', reason: 'You completed all levels in this path', xpReward: 0, estimatedMinutes: 0 };
}

function getNextStepAcrossTracks(
  completedLevels: number[],
  allTracks: LearningTrack[]
): NextStepResult | null {
  // Priority: continue in-progress tracks first, then suggest new ones
  const trackProgress = getTrackProgressMap(completedLevels, allTracks);

  // Find in-progress tracks (started but not complete)
  const inProgress = trackProgress
    .filter(tp => tp.completedCount > 0 && tp.completedCount < tp.totalCount)
    .sort((a, b) => b.completedCount - a.completedCount); // Most progress first

  if (inProgress.length > 0) {
    const tp = inProgress[0];
    const levels = getTrackLevels(tp.track.slug);
    const nextLevel = levels.find(l => !completedLevels.includes(l.levelNumber));
    if (nextLevel) {
      return {
        type: 'next-level',
        trackSlug: tp.track.slug,
        trackName: tp.track.name,
        trackColor: tp.track.color,
        levelNumber: nextLevel.levelNumber,
        title: nextLevel.title,
        reason: 'Continue where you left off',
        xpReward: nextLevel.xpReward,
        estimatedMinutes: nextLevel.estimatedMinutes,
      };
    }
  }

  // Suggest a new track based on prerequisites
  const available = trackProgress.filter(tp => {
    if (tp.completedCount > 0) return false; // Already started
    // Check prerequisites are met
    const prereqs = tp.track.prerequisites;
    if (prereqs.length === 0) return true;
    return prereqs.every(prereqSlug => {
      const prereqTrack = trackProgress.find(t => t.track.slug === prereqSlug);
      return prereqTrack && prereqTrack.completedCount >= prereqTrack.totalCount;
    });
  });

  if (available.length > 0) {
    const recommended = available[0];
    const levels = getTrackLevels(recommended.track.slug);
    if (levels.length > 0) {
      return {
        type: 'new-track',
        trackSlug: recommended.track.slug,
        trackName: recommended.track.name,
        trackColor: recommended.track.color,
        levelNumber: levels[0].levelNumber,
        title: levels[0].title,
        reason: `Start ${recommended.track.name}`,
        xpReward: levels[0].xpReward,
        estimatedMinutes: levels[0].estimatedMinutes,
      };
    }
  }

  return null;
}

interface TrackProgress {
  track: LearningTrack;
  completedCount: number;
  totalCount: number;
}

function getTrackProgressMap(
  completedLevels: number[],
  allTracks: LearningTrack[]
): TrackProgress[] {
  return allTracks.map(track => {
    const levels = getTrackLevels(track.slug);
    const completedCount = levels.filter(l => completedLevels.includes(l.levelNumber)).length;
    return {
      track,
      completedCount,
      totalCount: levels.length,
    };
  });
}

/**
 * Get top track recommendations based on completed tracks
 */
export function getTrackRecommendations(
  completedLevels: number[],
  limit = 3
): TrackRecommendation[] {
  const allTracks = getAllTracks();
  const trackProgress = getTrackProgressMap(completedLevels, allTracks);
  const recommendations: TrackRecommendation[] = [];

  for (const tp of trackProgress) {
    if (tp.completedCount >= tp.totalCount && tp.totalCount > 0) continue; // Skip fully completed

    // Check prerequisites
    const prereqsMet = tp.track.prerequisites.every(prereqSlug => {
      const prereqTrack = trackProgress.find(t => t.track.slug === prereqSlug);
      return prereqTrack && prereqTrack.completedCount >= prereqTrack.totalCount;
    });

    if (!prereqsMet && tp.track.prerequisites.length > 0) continue;

    let reason = '';
    let priority = 10;

    if (tp.completedCount > 0) {
      const pct = Math.round((tp.completedCount / tp.totalCount) * 100);
      reason = `${pct}% complete - keep going!`;
      priority = 1; // Highest priority: continue what you started
    } else if (tp.track.prerequisites.length === 0) {
      reason = 'No prerequisites needed';
      priority = 3;
    } else {
      reason = 'Prerequisites completed';
      priority = 5;
    }

    if (tp.track.isFree) {
      reason += ' (Free)';
      priority -= 1;
    }

    recommendations.push({ track: tp.track, reason, priority });
  }

  return recommendations
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

/**
 * Calculate learning streak from completion dates
 * Returns number of consecutive days with at least one completion
 */
export function calculateStreak(completionDates: Date[]): number {
  if (completionDates.length === 0) return 0;

  // Normalize to date strings (YYYY-MM-DD) and deduplicate
  const uniqueDays = [...new Set(
    completionDates.map(d => {
      const date = new Date(d);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    })
  )].sort().reverse(); // Most recent first

  if (uniqueDays.length === 0) return 0;

  // Check if today or yesterday has activity (streak must be current)
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  if (uniqueDays[0] !== todayStr && uniqueDays[0] !== yesterdayStr) {
    return 0; // Streak broken
  }

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const current = new Date(uniqueDays[i - 1]);
    const prev = new Date(uniqueDays[i]);
    const diffDays = Math.round((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get track completion info for a specific track
 */
export function getTrackCompletionInfo(trackSlug: string, completedLevels: number[]) {
  const track = getTrack(trackSlug);
  if (!track) return null;

  const levels = getTrackLevels(trackSlug);
  const completed = levels.filter(l => completedLevels.includes(l.levelNumber));
  const totalXpEarned = completed.reduce((sum, l) => sum + l.xpReward, 0);
  const totalXpAvailable = levels.reduce((sum, l) => sum + l.xpReward, 0);
  const isComplete = completed.length === levels.length && levels.length > 0;
  const nextLevel = levels.find(l => !completedLevels.includes(l.levelNumber));

  return {
    track,
    completedCount: completed.length,
    totalCount: levels.length,
    percent: levels.length > 0 ? Math.round((completed.length / levels.length) * 100) : 0,
    totalXpEarned,
    totalXpAvailable,
    isComplete,
    nextLevel: nextLevel || null,
  };
}
