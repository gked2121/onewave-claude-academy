import type { OrgDetails, OrgMember, OrgStats, MemberDetailedProgress } from './admin';

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

// ── Detailed progress records per member ──

// Real track level names for realistic demo data
const LEVEL_NAMES: Record<string, string> = {
  'claude-chat-1': 'Chat Fundamentals',
  'claude-chat-2': 'Projects & Organization',
  'claude-chat-3': 'Artifacts Deep Dive',
  'claude-chat-4': 'Advanced Prompting',
  'claude-chat-5': 'Custom Instructions',
  'claude-chat-6': 'Multi-turn Strategies',
  'claude-chat-7': 'Vision & File Analysis',
  'claude-chat-8': 'Chat Mastery Challenge',
  'claude-code-1': 'Installation & Setup',
  'claude-code-2': 'First Commands',
  'claude-code-3': 'File Operations',
  'claude-code-4': 'Project Context',
  'claude-code-5': 'Hooks & Automation',
  'claude-code-6': 'Custom Skills',
  'claude-code-7': 'IDE Integrations',
  'claude-code-8': 'Multi-file Editing',
  'claude-code-9': 'Git Workflows',
  'claude-code-10': 'Debugging with Claude',
  'claude-code-11': 'Code Review Agent',
  'claude-code-12': 'Test Generation',
  'claude-code-13': 'Codebase Analysis',
  'claude-code-14': 'Code Mastery Challenge',
  'mcp-1': 'MCP Fundamentals',
  'mcp-2': 'Server Architecture',
  'mcp-3': 'Tools & Resources',
  'mcp-4': 'Transport Protocols',
  'mcp-5': 'Building Your First Server',
  'mcp-6': 'Database Integration',
  'mcp-7': 'API Wrappers',
  'mcp-8': 'Authentication & Security',
  'mcp-9': 'Production Deployment',
  'mcp-10': 'MCP Mastery Challenge',
  'api-1': 'API Basics & Authentication',
  'api-2': 'Messages API',
  'api-3': 'Streaming Responses',
  'api-4': 'Tool Use (Function Calling)',
  'api-5': 'Vision & Multimodal',
  'api-6': 'Batch Processing',
  'api-7': 'Error Handling & Retries',
  'enterprise-1': 'SSO & SCIM Setup',
  'enterprise-2': 'Team Management',
  'enterprise-3': 'Slack Integration',
  'enterprise-4': 'Usage & Billing',
  'enterprise-5': 'Security & Compliance',
};

function makeProgressRecords(
  levelIds: string[],
  startDate: string,
  avgDaysBetween: number
): MemberDetailedProgress['progressRecords'] {
  const start = new Date(startDate);
  return levelIds.map((id, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i * avgDaysBetween + Math.floor(Math.random() * 3));
    const completed = true;
    const score = 70 + Math.floor(Math.random() * 31); // 70-100
    const timeSpent = 15 + Math.floor(Math.random() * 45); // 15-60 min
    return {
      level_id: LEVEL_NAMES[id] || id,
      completed,
      score,
      time_spent: timeSpent,
      completion_date: date.toISOString(),
    };
  });
}

const SARAH_LEVELS = [
  ...Array.from({ length: 8 }, (_, i) => `claude-chat-${i + 1}`),
  ...Array.from({ length: 14 }, (_, i) => `claude-code-${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `mcp-${i + 1}`),
  ...Array.from({ length: 6 }, (_, i) => `api-${i + 1}`),
];

const MARCUS_LEVELS = [
  ...Array.from({ length: 8 }, (_, i) => `claude-chat-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `claude-code-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `mcp-${i + 1}`),
];

const PRIYA_LEVELS = [
  ...Array.from({ length: 8 }, (_, i) => `claude-chat-${i + 1}`),
  ...Array.from({ length: 9 }, (_, i) => `claude-code-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `enterprise-${i + 1}`),
];

const JAMES_LEVELS = [
  ...Array.from({ length: 8 }, (_, i) => `claude-chat-${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `claude-code-${i + 1}`),
];

const ELENA_LEVELS = [
  ...Array.from({ length: 6 }, (_, i) => `claude-chat-${i + 1}`),
  ...Array.from({ length: 2 }, (_, i) => `claude-code-${i + 1}`),
];

const DEMO_PROGRESS_MAP: Record<string, MemberDetailedProgress> = {
  'demo-user-sarah': {
    userId: 'demo-user-sarah',
    profile: DEMO_MEMBERS[0].profile,
    role: 'admin',
    department: 'Engineering',
    progressRecords: makeProgressRecords(SARAH_LEVELS, '2025-11-18', 2),
    achievements: DEMO_MEMBERS[0].profile.achievements,
    totalLevelsCompleted: 38,
    totalTimeSpent: 38 * 35, // ~35 min avg
  },
  'demo-user-marcus': {
    userId: 'demo-user-marcus',
    profile: DEMO_MEMBERS[1].profile,
    role: 'member',
    department: 'Engineering',
    progressRecords: makeProgressRecords(MARCUS_LEVELS, '2025-12-05', 3),
    achievements: DEMO_MEMBERS[1].profile.achievements,
    totalLevelsCompleted: 25,
    totalTimeSpent: 25 * 38,
  },
  'demo-user-priya': {
    userId: 'demo-user-priya',
    profile: DEMO_MEMBERS[2].profile,
    role: 'manager',
    department: 'Product',
    progressRecords: makeProgressRecords(PRIYA_LEVELS, '2025-12-15', 3),
    achievements: DEMO_MEMBERS[2].profile.achievements,
    totalLevelsCompleted: 22,
    totalTimeSpent: 22 * 32,
  },
  'demo-user-james': {
    userId: 'demo-user-james',
    profile: DEMO_MEMBERS[3].profile,
    role: 'member',
    department: 'Sales',
    progressRecords: makeProgressRecords(JAMES_LEVELS, '2026-01-10', 4),
    achievements: DEMO_MEMBERS[3].profile.achievements,
    totalLevelsCompleted: 12,
    totalTimeSpent: 12 * 28,
  },
  'demo-user-elena': {
    userId: 'demo-user-elena',
    profile: DEMO_MEMBERS[4].profile,
    role: 'member',
    department: 'Design',
    progressRecords: makeProgressRecords(ELENA_LEVELS, '2026-01-25', 5),
    achievements: DEMO_MEMBERS[4].profile.achievements,
    totalLevelsCompleted: 8,
    totalTimeSpent: 8 * 25,
  },
};

export function getDemoMemberProgress(userId: string): MemberDetailedProgress | null {
  return DEMO_PROGRESS_MAP[userId] || null;
}
