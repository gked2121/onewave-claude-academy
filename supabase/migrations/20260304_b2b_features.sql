-- B2B features: org activity logging, daily stats view, invitation departments
-- Adds activity tracking for organizations and aggregated daily statistics

-- =====================================================
-- ORG ACTIVITY LOG TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.org_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_org_activity_log_org_id ON public.org_activity_log(org_id);
CREATE INDEX IF NOT EXISTS idx_org_activity_log_user_id ON public.org_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_org_activity_log_created_at ON public.org_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_org_activity_log_activity_type ON public.org_activity_log(activity_type);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.org_activity_log ENABLE ROW LEVEL SECURITY;

-- Org admins and managers can view activity logs for their organization
CREATE POLICY "Org admins/managers can view activity logs" ON public.org_activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.organization_members om
      WHERE om.org_id = org_activity_log.org_id
        AND om.user_id = auth.uid()
        AND om.role IN ('admin', 'manager')
    )
  );

-- Users can insert their own activity
CREATE POLICY "Users can insert own activity" ON public.org_activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- ORGANIZATION INVITATIONS: ADD DEPARTMENT COLUMN
-- =====================================================

ALTER TABLE public.organization_invitations ADD COLUMN IF NOT EXISTS department TEXT;

-- =====================================================
-- ORG DAILY STATS VIEW
-- =====================================================

CREATE OR REPLACE VIEW public.org_daily_stats AS
SELECT
  org_id,
  DATE(created_at) AS activity_date,
  COUNT(DISTINCT user_id) AS active_users,
  COUNT(*) FILTER (WHERE activity_type = 'level_completed') AS levels_completed
FROM public.org_activity_log
GROUP BY org_id, DATE(created_at);
