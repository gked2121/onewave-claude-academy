"use client";

import { useState, useEffect } from 'react';
import { supabase, isSupabaseAvailable } from '@/lib/supabase';
import { useProgress } from '@/context/ProgressContext';
import { isDemoAdmin, DEMO_ORG_ID } from '@/lib/demo-data';

interface OrgRole {
  role: 'admin' | 'manager' | 'member' | null;
  department: string | null;
  orgId: string | null;
  loading: boolean;
}

function useOrgRole(): OrgRole {
  const [role, setRole] = useState<OrgRole['role']>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useProgress();

  useEffect(() => {
    // Demo mode — return admin immediately
    if (isDemoAdmin(userEmail)) {
      setRole('admin');
      setOrgId(DEMO_ORG_ID);
      setLoading(false);
      return;
    }

    if (!isSupabaseAvailable()) {
      setLoading(false);
      return;
    }

    const fetchOrgRole = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('organization_members')
          .select('role, department, org_id')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          setLoading(false);
          return;
        }

        setRole(data.role);
        setDepartment(data.department);
        setOrgId(data.org_id);
      } catch (err) {
        console.error('Error fetching org role:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgRole();
  }, []);

  return { role, department, orgId, loading };
}

export default useOrgRole;
