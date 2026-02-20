-- Add organization reference and user role to profiles
-- This allows quick lookups of a user's org and admin status

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS user_role TEXT DEFAULT 'user' CHECK (user_role IN ('user', 'admin'));

CREATE INDEX IF NOT EXISTS idx_profiles_org_id ON public.profiles(org_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_role ON public.profiles(user_role);

-- Allow org admins to read profiles of their org members
CREATE POLICY "Org admins can view member profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.organization_members om
      JOIN public.organizations o ON o.id = om.org_id
      WHERE om.user_id = id
        AND (o.admin_user_id = auth.uid()
             OR EXISTS (
               SELECT 1 FROM public.organization_members am
               WHERE am.org_id = om.org_id
                 AND am.user_id = auth.uid()
                 AND am.role IN ('admin', 'manager')
             ))
    )
  );

-- Allow org admins to read progress of their org members
CREATE POLICY "Org admins can view member progress" ON public.progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.organization_members om
      JOIN public.organizations o ON o.id = om.org_id
      WHERE om.user_id = user_id
        AND (o.admin_user_id = auth.uid()
             OR EXISTS (
               SELECT 1 FROM public.organization_members am
               WHERE am.org_id = om.org_id
                 AND am.user_id = auth.uid()
                 AND am.role IN ('admin', 'manager')
             ))
    )
  );
