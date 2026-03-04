import type { OrgDetails, OrgMember, OrgStats } from './admin';

export const DEMO_ADMIN_EMAIL = 'admin@acme-corp.demo';
export const DEMO_ORG_ID = 'demo-acme-corp-00000000';

export function isDemoAdmin(email: string | undefined): boolean {
  return email === DEMO_ADMIN_EMAIL;
}

// Generates completed_levels like { "level-1": true, "level-2": true, ... }
function makeLevels(count: number): Record<string, boolean> {
  const levels: Record<string, boolean> = {};
  for (let i = 1; i <= count; i++) {
    levels[`level-${i}`] = true;
  }
  return levels;
}

function makeAchievements(count: number): Record<string, boolean> {
  const ids = [
    'first_steps', 'terminal_master', 'setup_wizard', 'speed_demon',
    'perfectionist', 'web_developer', 'deployment_master', 'full_stack_hero',
    'ai_integration_expert', 'early_adopter',
  ];
  const achievements: Record<string, boolean> = {};
  for (let i = 0; i < Math.min(count, ids.length); i++) {
    achievements[ids[i]] = true;
  }
  return achievements;
}

export const DEMO_ORG: OrgDetails = {
  id: DEMO_ORG_ID,
  name: 'Acme Corp',
  slug: 'acme-corp',
  admin_user_id: 'demo-user-sarah',
  plan: 'team',
  max_seats: 25,
  settings: {},
  created_at: '2025-11-01T00:00:00Z',
};

export const DEMO_MEMBERS: OrgMember[] = [
  {
    id: 'dm-1',
    user_id: 'demo-user-sarah',
    role: 'admin',
    department: 'Engineering',
    joined_at: '2025-11-15T10:00:00Z',
    profile: {
      email: 'sarah.chen@acmecorp.com',
      full_name: 'Sarah Chen',
      xp: 4200,
      level: 8,
      completed_levels: makeLevels(38),
      achievements: makeAchievements(8),
      last_active: '2026-03-04T09:30:00Z',
    },
  },
  {
    id: 'dm-2',
    user_id: 'demo-user-marcus',
    role: 'member',
    department: 'Engineering',
    joined_at: '2025-12-01T10:00:00Z',
    profile: {
      email: 'marcus.johnson@acmecorp.com',
      full_name: 'Marcus Johnson',
      xp: 3100,
      level: 6,
      completed_levels: makeLevels(25),
      achievements: makeAchievements(6),
      last_active: '2026-03-03T14:20:00Z',
    },
  },
  {
    id: 'dm-3',
    user_id: 'demo-user-priya',
    role: 'manager',
    department: 'Product',
    joined_at: '2025-12-10T10:00:00Z',
    profile: {
      email: 'priya.patel@acmecorp.com',
      full_name: 'Priya Patel',
      xp: 2800,
      level: 5,
      completed_levels: makeLevels(22),
      achievements: makeAchievements(5),
      last_active: '2026-03-02T16:45:00Z',
    },
  },
  {
    id: 'dm-4',
    user_id: 'demo-user-james',
    role: 'member',
    department: 'Sales',
    joined_at: '2026-01-05T10:00:00Z',
    profile: {
      email: 'james.wilson@acmecorp.com',
      full_name: 'James Wilson',
      xp: 1500,
      level: 3,
      completed_levels: makeLevels(12),
      achievements: makeAchievements(3),
      last_active: '2026-03-01T11:10:00Z',
    },
  },
  {
    id: 'dm-5',
    user_id: 'demo-user-elena',
    role: 'member',
    department: 'Design',
    joined_at: '2026-01-20T10:00:00Z',
    profile: {
      email: 'elena.rodriguez@acmecorp.com',
      full_name: 'Elena Rodriguez',
      xp: 950,
      level: 2,
      completed_levels: makeLevels(8),
      achievements: makeAchievements(2),
      last_active: '2026-02-28T09:00:00Z',
    },
  },
];

export const DEMO_STATS: OrgStats = (() => {
  const totalMembers = DEMO_MEMBERS.length;
  const totalXp = DEMO_MEMBERS.reduce((s, m) => s + m.profile.xp, 0);
  const totalLevelsCompleted = DEMO_MEMBERS.reduce(
    (s, m) => s + Object.values(m.profile.completed_levels || {}).filter(Boolean).length,
    0
  );
  const avgCompletionPercent = Math.round(
    (totalLevelsCompleted / (totalMembers * 47)) * 100
  );

  // Top performer by XP
  const sorted = [...DEMO_MEMBERS].sort((a, b) => b.profile.xp - a.profile.xp);
  const top = sorted[0];

  // Most active
  const byActive = [...DEMO_MEMBERS].sort((a, b) =>
    new Date(b.profile.last_active || 0).getTime() - new Date(a.profile.last_active || 0).getTime()
  );

  return {
    totalMembers,
    totalXp,
    avgXp: Math.round(totalXp / totalMembers),
    avgCompletionPercent,
    totalLevelsCompleted,
    topPerformer: { name: top.profile.full_name || top.profile.email, xp: top.profile.xp },
    mostActiveMember: {
      name: byActive[0].profile.full_name || byActive[0].profile.email,
      lastActive: byActive[0].profile.last_active || '',
    },
  };
})();

// Mock timeline data for the analytics dashboard
export function getDemoTimeline(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const data = [];
  const d = new Date(start);

  while (d <= end) {
    const day = d.getDay();
    const isWeekend = day === 0 || day === 6;
    data.push({
      date: d.toISOString().split('T')[0],
      levelsCompleted: isWeekend ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 6) + 2,
      activeUsers: isWeekend ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 3) + 3,
    });
    d.setDate(d.getDate() + 1);
  }
  return data;
}

export function getDemoDepartmentStats() {
  return [
    { department: 'Engineering', memberCount: 2, totalXp: 7300, avgCompletionPercent: 67 },
    { department: 'Product', memberCount: 1, totalXp: 2800, avgCompletionPercent: 47 },
    { department: 'Sales', memberCount: 1, totalXp: 1500, avgCompletionPercent: 26 },
    { department: 'Design', memberCount: 1, totalXp: 950, avgCompletionPercent: 17 },
  ];
}
