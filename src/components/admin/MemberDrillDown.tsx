"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, BookOpen, Award, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrgMember, MemberDetailedProgress } from '@/lib/admin';
import { DEMO_ORG_ID, getDemoMemberProgress } from '@/lib/demo-data';

interface MemberDrillDownProps {
  isOpen: boolean;
  onClose: () => void;
  member: OrgMember | null;
  orgId: string;
}

export default function MemberDrillDown({ isOpen, onClose, member, orgId }: MemberDrillDownProps) {
  const [progress, setProgress] = useState<MemberDetailedProgress | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !member) {
      setProgress(null);
      return;
    }

    async function loadProgress() {
      setLoading(true);
      try {
        if (orgId === DEMO_ORG_ID) {
          const data = getDemoMemberProgress(member!.user_id);
          setProgress(data);
        } else {
          const { getMemberDetailedProgress } = await import('@/lib/admin');
          const data = await getMemberDetailedProgress(orgId, member!.user_id);
          setProgress(data);
        }
      } catch (err) {
        console.error('Failed to load member progress:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [isOpen, member, orgId]);

  if (!member) return null;

  const name = member.profile.full_name || member.profile.username || member.profile.email;
  const initials = name.charAt(0).toUpperCase();
  const levelsCompleted = Object.values(member.profile.completed_levels || {}).filter(Boolean).length;
  const achievementCount = Object.values(member.profile.achievements || {}).filter(Boolean).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl glass-strong rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold text-primary">
                  {initials}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{name}</h2>
                  <p className="text-sm text-text-soft">{member.profile.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-bg/50 border border-border rounded-xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold text-text">{(member.profile.xp || 0).toLocaleString()}</div>
                  <div className="text-xs text-text-muted">Total XP</div>
                </div>
                <div className="bg-bg/50 border border-border rounded-xl p-4 text-center">
                  <BookOpen className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-text">{levelsCompleted}</div>
                  <div className="text-xs text-text-muted">Levels Done</div>
                </div>
                <div className="bg-bg/50 border border-border rounded-xl p-4 text-center">
                  <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-text">{achievementCount}</div>
                  <div className="text-xs text-text-muted">Achievements</div>
                </div>
                <div className="bg-bg/50 border border-border rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-text-muted mx-auto mb-1" />
                  <div className="text-lg font-bold text-text">
                    {member.profile.last_active
                      ? new Date(member.profile.last_active).toLocaleDateString()
                      : '--'}
                  </div>
                  <div className="text-xs text-text-muted">Last Active</div>
                </div>
              </div>

              {/* Completion Progress */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-muted mb-3">Completion Progress</h3>
                <div className="w-full bg-bg-lighter rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: `${Math.min((levelsCompleted / 47) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-text-soft mt-1">
                  {levelsCompleted} / 47 levels completed ({Math.round((levelsCompleted / 47) * 100)}%)
                </p>
              </div>

              {/* Completed Levels by Track */}
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : progress?.progressRecords && progress.progressRecords.length > 0 ? (
                <TrackProgressList records={progress.progressRecords} totalTimeSpent={progress.totalTimeSpent} />
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-text-muted">No progress data available.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Track grouping logic ──

const TRACK_PREFIXES: { prefix: string; label: string; color: string }[] = [
  { prefix: 'Chat', label: 'Claude Chat', color: 'text-claude' },
  { prefix: 'Installation', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'First Commands', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'File Operations', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Project Context', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Hooks', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Custom Skills', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'IDE', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Multi-file', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Git', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Debugging', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Code Review', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Test Generation', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Codebase', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'Code Mastery', label: 'Claude Code', color: 'text-primary' },
  { prefix: 'MCP', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Server Architecture', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Tools & Resources', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Transport', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Building Your', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Database Integration', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'API Wrappers', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Authentication', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'Production Deployment', label: 'MCP', color: 'text-teal-400' },
  { prefix: 'API', label: 'API', color: 'text-green-400' },
  { prefix: 'Messages API', label: 'API', color: 'text-green-400' },
  { prefix: 'Streaming', label: 'API', color: 'text-green-400' },
  { prefix: 'Tool Use', label: 'API', color: 'text-green-400' },
  { prefix: 'Vision', label: 'API', color: 'text-green-400' },
  { prefix: 'Batch Processing', label: 'API', color: 'text-green-400' },
  { prefix: 'Error Handling', label: 'API', color: 'text-green-400' },
  { prefix: 'SSO', label: 'Enterprise', color: 'text-yellow-500' },
  { prefix: 'Team Management', label: 'Enterprise', color: 'text-yellow-500' },
  { prefix: 'Slack', label: 'Enterprise', color: 'text-yellow-500' },
  { prefix: 'Usage', label: 'Enterprise', color: 'text-yellow-500' },
  { prefix: 'Security', label: 'Enterprise', color: 'text-yellow-500' },
];

function getTrackForLevel(levelName: string): { label: string; color: string } {
  for (const t of TRACK_PREFIXES) {
    if (levelName.startsWith(t.prefix)) return { label: t.label, color: t.color };
  }
  return { label: 'Other', color: 'text-text-muted' };
}

interface ProgressRecord {
  level_id: string;
  completed: boolean;
  score?: number;
  time_spent?: number;
  completion_date?: string;
}

function TrackProgressList({ records, totalTimeSpent }: { records: ProgressRecord[]; totalTimeSpent: number }) {
  const [expandedTracks, setExpandedTracks] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, { color: string; records: ProgressRecord[] }>();
    for (const r of records) {
      const { label, color } = getTrackForLevel(r.level_id);
      if (!map.has(label)) map.set(label, { color, records: [] });
      map.get(label)!.records.push(r);
    }
    return Array.from(map.entries());
  }, [records]);

  const toggle = (track: string) => {
    setExpandedTracks(prev => {
      const next = new Set(prev);
      if (next.has(track)) next.delete(track);
      else next.add(track);
      return next;
    });
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-text-muted mb-3">Completed Levels by Track</h3>
      <div className="space-y-2">
        {grouped.map(([trackName, { color, records: trackRecords }]) => {
          const isOpen = expandedTracks.has(trackName);
          const avgScore = Math.round(
            trackRecords.reduce((s, r) => s + (r.score || 0), 0) / trackRecords.length
          );

          return (
            <div key={trackName} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggle(trackName)}
                className="w-full flex items-center justify-between px-4 py-3 bg-bg/50 hover:bg-bg-lighter/30 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  )}
                  <span className={cn('text-sm font-medium', color)}>{trackName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-soft">Avg: {avgScore}%</span>
                  <span className="text-xs text-text-muted">
                    {trackRecords.length} {trackRecords.length === 1 ? 'level' : 'levels'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="divide-y divide-border">
                  {trackRecords.map((record, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2.5 pl-10"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          record.completed ? 'bg-green-400' : 'bg-text-muted'
                        )} />
                        <span className="text-sm text-text">{record.level_id}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {record.score != null && (
                          <span className="text-xs text-text-soft">Score: {record.score}%</span>
                        )}
                        {record.time_spent != null && (
                          <span className="text-xs text-text-soft">{record.time_spent}m</span>
                        )}
                        <span className="text-xs text-text-muted w-20 text-right">
                          {record.completion_date
                            ? new Date(record.completion_date).toLocaleDateString()
                            : 'In progress'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {totalTimeSpent > 0 && (
        <p className="text-xs text-text-soft mt-3">
          Total time spent: {Math.round(totalTimeSpent / 60)} hours
        </p>
      )}
    </div>
  );
}
