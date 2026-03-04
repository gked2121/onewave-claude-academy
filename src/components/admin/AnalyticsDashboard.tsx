"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users as UsersIcon,
  Building2,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DateRangePicker, { getDateRange, type DateRange } from './DateRangePicker';
import MemberDrillDown from './MemberDrillDown';
import type { OrgMember } from '@/lib/admin';
import { DEMO_ORG_ID, getDemoTimeline, getDemoDepartmentStats } from '@/lib/demo-data';

// Chart color constants (no purple)
const COLORS = {
  primary: '#2563EB',
  claude: '#DA7756',
  teal: '#0891B2',
  green: '#10B981',
  yellow: '#F59E0B',
  gridLine: '#334155',
  tickText: '#94A3B8',
};

interface TimelineData {
  date: string;
  levelsCompleted: number;
  activeUsers: number;
}

interface DepartmentStat {
  department: string;
  memberCount: number;
  totalXp: number;
  avgCompletionPercent: number;
}

interface AnalyticsDashboardProps {
  orgId: string;
  members: OrgMember[];
  role: 'admin' | 'manager';
  department?: string | null;
}

export default function AnalyticsDashboard({
  orgId,
  members,
  role,
  department,
}: AnalyticsDashboardProps) {
  const [dateRange, setDateRange] = useState<DateRange>(getDateRange(30));
  const [timeline, setTimeline] = useState<TimelineData[]>([]);
  const [deptStats, setDeptStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [drillDownMember, setDrillDownMember] = useState<OrgMember | null>(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      // Demo mode — use mock data
      if (orgId === DEMO_ORG_ID) {
        setTimeline(getDemoTimeline(dateRange.startDate, dateRange.endDate));
        setDeptStats(role === 'admin' ? getDemoDepartmentStats() : []);
        setLoading(false);
        return;
      }

      const { getOrgActivityTimeline, getOrgDepartmentStats } = await import('@/lib/admin');

      const [timelineData, departmentData] = await Promise.all([
        getOrgActivityTimeline(orgId, dateRange.startDate, dateRange.endDate),
        role === 'admin' ? getOrgDepartmentStats(orgId) : Promise.resolve([]),
      ]);

      setTimeline(timelineData);
      setDeptStats(departmentData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [orgId, dateRange, role]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Calculate summary stats from members
  const totalXp = members.reduce((sum, m) => sum + (m.profile.xp || 0), 0);
  const avgXp = members.length > 0 ? Math.round(totalXp / members.length) : 0;
  const totalCompleted = members.reduce((sum, m) => {
    return sum + Object.values(m.profile.completed_levels || {}).filter(Boolean).length;
  }, 0);

  const customTooltipStyle = {
    backgroundColor: '#1E293B',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#E2E8F0',
    fontSize: '12px',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text flex items-center gap-2">
          <Activity className="w-5 h-5 text-text-muted" />
          Analytics
          {department && (
            <span className="text-sm font-normal text-text-soft ml-2">
              -- {department}
            </span>
          )}
        </h2>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          label="Total XP Earned"
          value={totalXp.toLocaleString()}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-claude" />}
          label="Avg XP / Member"
          value={avgXp.toLocaleString()}
        />
        <SummaryCard
          icon={<UsersIcon className="w-5 h-5 text-green-400" />}
          label="Active Members"
          value={String(members.filter(m => m.profile.last_active).length)}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-teal-400" />}
          label="Levels Completed"
          value={String(totalCompleted)}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-medium text-text-muted mb-4">Completion Over Time</h3>
          {timeline.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: COLORS.tickText, fontSize: 11 }}
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis tick={{ fill: COLORS.tickText, fontSize: 11 }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="levelsCompleted"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  dot={false}
                  name="Levels Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No completion data yet" />
          )}
        </motion.div>

        {/* Engagement Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-card border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-medium text-text-muted mb-4">Daily Active Users</h3>
          {timeline.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: COLORS.tickText, fontSize: 11 }}
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis tick={{ fill: COLORS.tickText, fontSize: 11 }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stroke={COLORS.teal}
                  fill={COLORS.teal}
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No engagement data yet" />
          )}
        </motion.div>
      </div>

      {/* Department Breakdown (admin only) */}
      {role === 'admin' && deptStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-card border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-medium text-text-muted mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Department Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={Math.max(200, deptStats.length * 50)}>
            <BarChart data={deptStats} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: COLORS.tickText, fontSize: 11 }}
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
              />
              <YAxis
                dataKey="department"
                type="category"
                tick={{ fill: COLORS.tickText, fontSize: 11 }}
                width={100}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(value) => [`${Math.round(value as number)}%`, 'Completion']}
              />
              <Bar
                dataKey="avgCompletionPercent"
                fill={COLORS.primary}
                radius={[0, 4, 4, 0]}
                name="Avg Completion"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Member Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-sm font-medium text-text-muted">
            Member Leaderboard (click to view details)
          </h3>
        </div>
        <div className="divide-y divide-border">
          {members.slice(0, 10).map((member, index) => {
            const name = member.profile.full_name || member.profile.username || member.profile.email;
            const initials = name.charAt(0).toUpperCase();
            const levelsCompleted = Object.values(member.profile.completed_levels || {}).filter(Boolean).length;
            const completionPct = Math.round((levelsCompleted / 47) * 100);

            return (
              <button
                key={member.id}
                onClick={() => setDrillDownMember(member)}
                className="w-full flex items-center gap-4 px-6 py-3 hover:bg-bg-lighter/30 transition-colors text-left"
              >
                <span className="text-sm font-bold text-text-muted w-6">
                  {index + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{name}</p>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-sm font-medium text-text">{(member.profile.xp || 0).toLocaleString()}</div>
                    <div className="text-xs text-text-muted">XP</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">{completionPct}%</div>
                    <div className="text-xs text-text-muted">Done</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Member Drill-Down Modal */}
      <MemberDrillDown
        isOpen={!!drillDownMember}
        onClose={() => setDrillDownMember(null)}
        member={drillDownMember}
        orgId={orgId}
      />
    </div>
  );
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-text-muted">{label}</span>
      </div>
      <div className="text-xl font-bold text-text">{value}</div>
    </div>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[240px]">
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}
