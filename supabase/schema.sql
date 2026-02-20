-- =====================================================
-- OneWave Claude Academy Database Schema
-- Extended from vibe-quest for Claude ecosystem learning
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- =====================================================
-- CORE USER TABLES
-- =====================================================

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  completed_levels JSONB DEFAULT '{}',
  achievements JSONB DEFAULT '{}',
  character_type TEXT,
  learning_path TEXT,
  preferences JSONB DEFAULT '{}',
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'individual', 'team', 'enterprise')),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- LEARNING TRACKS (Claude Ecosystem)
-- =====================================================

-- Learning tracks for different Claude tools
CREATE TABLE IF NOT EXISTS public.learning_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT, -- hex color for track theme
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours INTEGER,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  prerequisites TEXT[] DEFAULT '{}', -- track slugs required before this
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Levels within each track
CREATE TABLE IF NOT EXISTS public.track_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id UUID NOT NULL REFERENCES public.learning_tracks(id) ON DELETE CASCADE,
  level_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}', -- Lesson content, exercises, quizzes
  xp_reward INTEGER DEFAULT 100,
  estimated_minutes INTEGER DEFAULT 15,
  is_free BOOLEAN DEFAULT false, -- Available on free tier
  requires_verification BOOLEAN DEFAULT false, -- Hands-on verification needed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(track_id, level_number)
);

-- User progress on tracks
CREATE TABLE IF NOT EXISTS public.user_track_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.learning_tracks(id) ON DELETE CASCADE,
  current_level INTEGER DEFAULT 1,
  completed_levels INTEGER[] DEFAULT '{}',
  quiz_scores JSONB DEFAULT '{}', -- level_number: score
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- =====================================================
-- ORGANIZATION / TEAM MANAGEMENT
-- =====================================================

-- Organizations (for team/enterprise plans)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  admin_user_id UUID REFERENCES public.profiles(id),
  plan TEXT DEFAULT 'team' CHECK (plan IN ('team', 'enterprise')),
  max_seats INTEGER DEFAULT 10,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member')),
  department TEXT,
  invited_by UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Organization invitations
CREATE TABLE IF NOT EXISTS public.organization_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member')),
  invited_by UUID REFERENCES public.profiles(id),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, email)
);

-- =====================================================
-- CERTIFICATIONS
-- =====================================================

-- Certifications earned by users
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.learning_tracks(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('associate', 'professional', 'expert')),
  score INTEGER, -- Final exam score
  certificate_number TEXT UNIQUE,
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Some certs may expire
  UNIQUE(user_id, track_id, level)
);

-- =====================================================
-- PROGRESS & GAMIFICATION (Extended)
-- =====================================================

-- General progress tracking
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  level_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMPTZ,
  time_spent INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 1,
  code_snippets TEXT[],
  feedback JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  requirement_type TEXT,
  requirement_value INTEGER,
  category TEXT,
  track_id UUID REFERENCES public.learning_tracks(id), -- Track-specific achievements
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User achievements junction
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Daily challenges
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER DEFAULT 0,
  track_id UUID REFERENCES public.learning_tracks(id), -- Optional track association
  challenge_type TEXT, -- 'prompt', 'code', 'quiz', 'build'
  challenge_data JSONB DEFAULT '{}',
  hints TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User daily challenge attempts
CREATE TABLE IF NOT EXISTS public.user_daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  attempts INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  submission JSONB, -- User's submission data
  score INTEGER,
  UNIQUE(user_id, challenge_id)
);

-- Learning sessions
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID REFERENCES public.learning_tracks(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration INTEGER,
  levels_completed TEXT[],
  xp_earned INTEGER DEFAULT 0,
  badges_earned TEXT[],
  device_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- VIEWS
-- =====================================================

-- Global leaderboard
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  p.id,
  p.username,
  p.avatar_url,
  p.xp,
  p.level,
  p.streak,
  array_length(p.badges, 1) as badge_count,
  ROW_NUMBER() OVER (ORDER BY p.xp DESC) as rank
FROM public.profiles p
WHERE p.username IS NOT NULL
ORDER BY p.xp DESC;

-- Organization leaderboard
CREATE OR REPLACE VIEW public.org_leaderboard AS
SELECT
  om.org_id,
  p.id as user_id,
  p.username,
  p.avatar_url,
  p.xp,
  p.level,
  p.streak,
  om.department,
  ROW_NUMBER() OVER (PARTITION BY om.org_id ORDER BY p.xp DESC) as rank
FROM public.organization_members om
JOIN public.profiles p ON p.id = om.user_id
ORDER BY om.org_id, p.xp DESC;

-- Track progress summary
CREATE OR REPLACE VIEW public.track_progress_summary AS
SELECT
  utp.user_id,
  lt.slug as track_slug,
  lt.name as track_name,
  utp.current_level,
  array_length(utp.completed_levels, 1) as completed_count,
  (SELECT COUNT(*) FROM public.track_levels tl WHERE tl.track_id = lt.id) as total_levels,
  ROUND(
    (array_length(utp.completed_levels, 1)::DECIMAL /
     NULLIF((SELECT COUNT(*) FROM public.track_levels tl WHERE tl.track_id = lt.id), 0)) * 100,
    1
  ) as completion_percentage
FROM public.user_track_progress utp
JOIN public.learning_tracks lt ON lt.id = utp.track_id;

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_level ON public.profiles(level);
CREATE INDEX IF NOT EXISTS idx_profiles_streak ON public.profiles(streak);
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON public.profiles(plan);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_level_id ON public.progress(level_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON public.daily_challenges(date);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON public.sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_learning_tracks_slug ON public.learning_tracks(slug);
CREATE INDEX IF NOT EXISTS idx_track_levels_track_id ON public.track_levels(track_id);
CREATE INDEX IF NOT EXISTS idx_user_track_progress_user_id ON public.user_track_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_track_progress_track_id ON public.user_track_progress(track_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON public.organization_members(org_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON public.certifications(user_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.track_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_track_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Progress
CREATE POLICY "Users can view own progress" ON public.progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.progress
  FOR UPDATE USING (auth.uid() = user_id);

-- User Achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sessions
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON public.sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON public.sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Learning tracks (public read)
CREATE POLICY "Tracks are viewable by everyone" ON public.learning_tracks
  FOR SELECT USING (true);

-- Track levels (public read, respecting free tier)
CREATE POLICY "Track levels are viewable by everyone" ON public.track_levels
  FOR SELECT USING (true);

-- User track progress
CREATE POLICY "Users can view own track progress" ON public.user_track_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own track progress" ON public.user_track_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own track progress" ON public.user_track_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Organizations (members can view)
CREATE POLICY "Org members can view organization" ON public.organizations
  FOR SELECT USING (
    auth.uid() = admin_user_id OR
    EXISTS (SELECT 1 FROM public.organization_members om WHERE om.org_id = id AND om.user_id = auth.uid())
  );
CREATE POLICY "Org admins can update organization" ON public.organizations
  FOR UPDATE USING (auth.uid() = admin_user_id);

-- Organization members
CREATE POLICY "Org members can view members" ON public.organization_members
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.organization_members om WHERE om.org_id = org_id AND om.user_id = auth.uid())
  );
CREATE POLICY "Org admins can manage members" ON public.organization_members
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.organizations o WHERE o.id = org_id AND o.admin_user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.organization_members om WHERE om.org_id = org_id AND om.user_id = auth.uid() AND om.role IN ('admin', 'manager'))
  );

-- Certifications
CREATE POLICY "Users can view own certifications" ON public.certifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Certifications are publicly verifiable" ON public.certifications
  FOR SELECT USING (certificate_number IS NOT NULL);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON public.progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON public.learning_tracks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_track_levels_updated_at BEFORE UPDATE ON public.track_levels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Calculate user level from XP
CREATE OR REPLACE FUNCTION public.calculate_level(xp_points INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(xp_points / 100) + 1;
END;
$$ language 'plpgsql';

-- Generate certificate number
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'OCA-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
         UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
END;
$$ language 'plpgsql';

-- =====================================================
-- SEED DATA: Learning Tracks
-- =====================================================

INSERT INTO public.learning_tracks (slug, name, description, icon, color, difficulty, estimated_hours, order_index) VALUES
('claude-chat', 'Claude Chat Fundamentals', 'Master the art of conversing with Claude. Learn prompting techniques, context management, projects, and artifacts.', 'message-circle', '#DA7756', 'beginner', 4, 1),
('claude-code', 'Claude Code Mastery', 'Become proficient with Claude Code CLI. Installation, configuration, hooks, skills, IDE integrations, and enterprise patterns.', 'terminal', '#2563EB', 'intermediate', 8, 2),
('mcp-development', 'MCP Development', 'Build custom integrations with Model Context Protocol. Server architecture, security, OAuth 2.1, and deployment.', 'plug', '#0891B2', 'advanced', 10, 3),
('anthropic-api', 'Anthropic API', 'Master the Claude API. Authentication, models, streaming, batch processing, tool use, computer use, and vision.', 'code', '#10B981', 'intermediate', 8, 4),
('claude-enterprise', 'Claude Enterprise', 'Deploy Claude at scale. Admin console, SSO/SAML, SCIM, Slack integration, team management, and compliance.', 'building', '#6366F1', 'advanced', 6, 5),
('claude-skills', 'Claude Skills & Automation', 'Create powerful automation. SKILL.md files, marketplace integration, custom workflows, and CI/CD pipelines.', 'zap', '#F59E0B', 'intermediate', 4, 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  difficulty = EXCLUDED.difficulty,
  estimated_hours = EXCLUDED.estimated_hours,
  order_index = EXCLUDED.order_index;

-- =====================================================
-- SEED DATA: Claude Ecosystem Achievements
-- =====================================================

INSERT INTO public.achievements (name, description, icon, xp_reward, rarity, requirement_type, requirement_value, category) VALUES
-- General Progress
('First Steps', 'Complete your first lesson', 'sparkles', 50, 'common', 'levels_completed', 1, 'progress'),
('Getting Started', 'Complete 5 lessons', 'book-open', 100, 'common', 'levels_completed', 5, 'progress'),
('Dedicated Learner', 'Complete 25 lessons', 'graduation-cap', 300, 'rare', 'levels_completed', 25, 'progress'),
('Master Scholar', 'Complete 50 lessons', 'crown', 1000, 'legendary', 'levels_completed', 50, 'progress'),

-- Claude Chat
('Hello Claude', 'Send your first prompt to Claude', 'message-circle', 50, 'common', 'specific_level', 1, 'claude-chat'),
('Prompt Crafter', 'Learn advanced prompting techniques', 'pen-tool', 150, 'rare', 'specific_level', 3, 'claude-chat'),
('Artifact Master', 'Create 10 artifacts with Claude', 'file-code', 200, 'rare', 'artifacts_created', 10, 'claude-chat'),
('Project Pro', 'Organize conversations with Projects', 'folder', 150, 'rare', 'specific_level', 5, 'claude-chat'),

-- Claude Code
('Terminal Ready', 'Install Claude Code CLI', 'terminal', 100, 'common', 'specific_level', 1, 'claude-code'),
('Hook Line & Sinker', 'Create your first hook', 'anchor', 200, 'rare', 'specific_level', 4, 'claude-code'),
('Skill Builder', 'Create a custom skill', 'wrench', 300, 'epic', 'specific_level', 6, 'claude-code'),
('IDE Master', 'Set up IDE integration', 'monitor', 150, 'rare', 'specific_level', 8, 'claude-code'),
('Enterprise Architect', 'Deploy Claude Code at scale', 'building', 500, 'legendary', 'specific_level', 12, 'claude-code'),

-- MCP
('MCP Pioneer', 'Build your first MCP server', 'plug', 300, 'epic', 'specific_level', 3, 'mcp'),
('Protocol Expert', 'Understand MCP architecture', 'git-branch', 200, 'rare', 'specific_level', 2, 'mcp'),
('Connector King', 'Deploy 5 MCP servers', 'globe', 1000, 'legendary', 'mcp_servers', 5, 'mcp'),
('Security Guardian', 'Implement OAuth 2.1 auth', 'shield', 400, 'epic', 'specific_level', 7, 'mcp'),

-- API
('API Explorer', 'Make your first API call', 'code', 100, 'common', 'specific_level', 1, 'api'),
('Stream Master', 'Implement streaming responses', 'activity', 200, 'rare', 'specific_level', 4, 'api'),
('Batch Master', 'Process 1000+ items in batch', 'layers', 400, 'epic', 'batch_items', 1000, 'api'),
('Tool Smith', 'Create custom tools for Claude', 'hammer', 300, 'epic', 'specific_level', 6, 'api'),
('Vision Pioneer', 'Use Claude vision capabilities', 'eye', 250, 'rare', 'specific_level', 8, 'api'),

-- Enterprise
('Admin Access', 'Access the admin console', 'settings', 100, 'common', 'specific_level', 1, 'enterprise'),
('SSO Champion', 'Configure SSO/SAML', 'key', 300, 'epic', 'specific_level', 3, 'enterprise'),
('Slack Integrator', 'Set up Slack integration', 'slack', 200, 'rare', 'specific_level', 5, 'enterprise'),
('Compliance Expert', 'Master audit logs and compliance', 'clipboard-check', 400, 'epic', 'specific_level', 7, 'enterprise'),

-- Streaks & Engagement
('Week Warrior', '7-day learning streak', 'flame', 500, 'epic', 'streak_days', 7, 'dedication'),
('Month Master', '30-day learning streak', 'fire', 2000, 'legendary', 'streak_days', 30, 'dedication'),
('Daily Champion', 'Complete daily challenge', 'calendar', 75, 'common', 'daily_challenges', 1, 'engagement'),
('Challenge Addict', 'Complete 10 daily challenges', 'target', 300, 'rare', 'daily_challenges', 10, 'engagement'),

-- Certifications
('Certified Associate', 'Earn your first certification', 'award', 1000, 'epic', 'certifications', 1, 'certification'),
('Certified Professional', 'Earn Professional certification', 'medal', 2000, 'legendary', 'cert_level', 2, 'certification'),
('Claude Expert', 'Earn Expert certification', 'trophy', 5000, 'legendary', 'cert_level', 3, 'certification'),

-- XP Milestones
('XP Collector', 'Earn 1000 XP total', 'star', 150, 'rare', 'total_xp', 1000, 'progress'),
('XP Hoarder', 'Earn 5000 XP total', 'stars', 500, 'epic', 'total_xp', 5000, 'progress'),
('XP Legend', 'Earn 10000 XP total', 'sparkle', 1000, 'legendary', 'total_xp', 10000, 'progress')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  xp_reward = EXCLUDED.xp_reward,
  rarity = EXCLUDED.rarity,
  requirement_type = EXCLUDED.requirement_type,
  requirement_value = EXCLUDED.requirement_value,
  category = EXCLUDED.category;
