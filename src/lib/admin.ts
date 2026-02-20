import { supabase, isSupabaseAvailable, getUserProfile } from './supabase';

// =====================================================
// Organization & Admin Data Layer
// =====================================================

export interface OrgMember {
  id: string;
  user_id: string;
  role: 'admin' | 'manager' | 'member';
  department?: string;
  joined_at: string;
  profile: {
    email: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    xp: number;
    level: number;
    completed_levels: Record<string, boolean>;
    achievements: Record<string, boolean>;
    last_active?: string;
  };
}

export interface OrgDetails {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  admin_user_id: string;
  plan: 'team' | 'enterprise';
  max_seats: number;
  settings: Record<string, unknown>;
  created_at: string;
  member_count?: number;
}

export interface OrgStats {
  totalMembers: number;
  totalXp: number;
  avgXp: number;
  avgCompletionPercent: number;
  totalLevelsCompleted: number;
  topPerformer: { name: string; xp: number } | null;
  mostActiveMember: { name: string; lastActive: string } | null;
}

export interface OrgInvitation {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  invited_by: string;
  expires_at: string;
  accepted_at?: string;
  created_at: string;
}

// ── Fetch org by ID ──
export async function getOrganization(orgId: string): Promise<OrgDetails | null> {
  if (!isSupabaseAvailable()) return null;

  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', orgId)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('getOrganization error:', err);
    return null;
  }
}

// ── Get user's organization (via org_id on profile or org_members) ──
export async function getUserOrganization(userId: string): Promise<OrgDetails | null> {
  if (!isSupabaseAvailable()) return null;

  try {
    // First check profile.org_id
    const profile = await getUserProfile(userId);
    if (profile && (profile as any).org_id) {
      return getOrganization((profile as any).org_id);
    }

    // Fallback: check organization_members
    const { data: membership, error: memErr } = await supabase
      .from('organization_members')
      .select('org_id')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (memErr || !membership) return null;

    return getOrganization(membership.org_id);
  } catch (err) {
    console.error('getUserOrganization error:', err);
    return null;
  }
}

// ── Get user's role in their org ──
export async function getUserOrgRole(userId: string): Promise<'admin' | 'manager' | 'member' | null> {
  if (!isSupabaseAvailable()) return null;

  try {
    const { data, error } = await supabase
      .from('organization_members')
      .select('role')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (error || !data) return null;
    return data.role as 'admin' | 'manager' | 'member';
  } catch (err) {
    console.error('getUserOrgRole error:', err);
    return null;
  }
}

// ── Check if user is an org admin ──
export async function isOrgAdmin(userId: string): Promise<boolean> {
  const role = await getUserOrgRole(userId);
  return role === 'admin';
}

// ── Get all members of an org with their profiles ──
export async function getOrgMembers(orgId: string): Promise<OrgMember[]> {
  if (!isSupabaseAvailable()) return [];

  try {
    const { data, error } = await supabase
      .from('organization_members')
      .select(`
        id,
        user_id,
        role,
        department,
        joined_at,
        profiles:user_id (
          email,
          username,
          full_name,
          avatar_url,
          xp,
          level,
          completed_levels,
          achievements,
          last_active
        )
      `)
      .eq('org_id', orgId)
      .order('joined_at', { ascending: true });

    if (error) throw error;
    if (!data) return [];

    return data.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      role: row.role,
      department: row.department,
      joined_at: row.joined_at,
      profile: row.profiles || {
        email: '',
        xp: 0,
        level: 1,
        completed_levels: {},
        achievements: {},
      },
    }));
  } catch (err) {
    console.error('getOrgMembers error:', err);
    return [];
  }
}

// ── Get aggregate org stats ──
export async function getOrgStats(orgId: string): Promise<OrgStats> {
  const members = await getOrgMembers(orgId);

  const totalMembers = members.length;
  const totalXp = members.reduce((sum, m) => sum + (m.profile.xp || 0), 0);
  const avgXp = totalMembers > 0 ? Math.round(totalXp / totalMembers) : 0;

  const totalLevelsCompleted = members.reduce((sum, m) => {
    const completed = m.profile.completed_levels || {};
    return sum + Object.values(completed).filter(Boolean).length;
  }, 0);

  // Rough average completion %: completed / 47 total levels * 100
  const TOTAL_AVAILABLE_LEVELS = 47;
  const avgCompletionPercent = totalMembers > 0
    ? Math.round((totalLevelsCompleted / (totalMembers * TOTAL_AVAILABLE_LEVELS)) * 100)
    : 0;

  // Top performer by XP
  const sorted = [...members].sort((a, b) => (b.profile.xp || 0) - (a.profile.xp || 0));
  const topPerformer = sorted[0]
    ? { name: sorted[0].profile.full_name || sorted[0].profile.email, xp: sorted[0].profile.xp || 0 }
    : null;

  // Most recently active
  const byActivity = [...members]
    .filter(m => m.profile.last_active)
    .sort((a, b) => new Date(b.profile.last_active!).getTime() - new Date(a.profile.last_active!).getTime());
  const mostActiveMember = byActivity[0]
    ? { name: byActivity[0].profile.full_name || byActivity[0].profile.email, lastActive: byActivity[0].profile.last_active! }
    : null;

  return {
    totalMembers,
    totalXp,
    avgXp,
    avgCompletionPercent,
    totalLevelsCompleted,
    topPerformer,
    mostActiveMember,
  };
}

// ── Create a new organization ──
export async function createOrganization(
  name: string,
  adminUserId: string,
  plan: 'team' | 'enterprise' = 'team'
): Promise<OrgDetails | null> {
  if (!isSupabaseAvailable()) return null;

  try {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { data: org, error: orgErr } = await supabase
      .from('organizations')
      .insert({
        name,
        slug,
        admin_user_id: adminUserId,
        plan,
        max_seats: plan === 'enterprise' ? 100 : 25,
      })
      .select()
      .single();

    if (orgErr) throw orgErr;

    // Add admin as first member
    const { error: memErr } = await supabase
      .from('organization_members')
      .insert({
        org_id: org.id,
        user_id: adminUserId,
        role: 'admin',
      });

    if (memErr) throw memErr;

    // Update profile with org_id and admin role
    const { error: profErr } = await supabase
      .from('profiles')
      .update({
        org_id: org.id,
        user_role: 'admin',
        plan: plan,
      })
      .eq('id', adminUserId);

    if (profErr) console.error('Failed to update profile org_id:', profErr);

    return org;
  } catch (err) {
    console.error('createOrganization error:', err);
    return null;
  }
}

// ── Invite a member to the org ──
export async function inviteMember(
  orgId: string,
  email: string,
  role: 'admin' | 'manager' | 'member' = 'member',
  invitedBy: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseAvailable()) return { success: false, error: 'Supabase not configured' };

  try {
    // Check seat limit
    const org = await getOrganization(orgId);
    if (!org) return { success: false, error: 'Organization not found' };

    const members = await getOrgMembers(orgId);
    if (members.length >= org.max_seats) {
      return { success: false, error: `Team is at capacity (${org.max_seats} seats)` };
    }

    // Generate invitation token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7-day expiry

    const { error } = await supabase
      .from('organization_invitations')
      .insert({
        org_id: orgId,
        email: email.toLowerCase().trim(),
        role,
        invited_by: invitedBy,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'This email has already been invited' };
      }
      throw error;
    }

    return { success: true };
  } catch (err) {
    console.error('inviteMember error:', err);
    return { success: false, error: 'Failed to send invitation' };
  }
}

// ── Accept an invitation ──
export async function acceptInvitation(
  token: string,
  userId: string
): Promise<{ success: boolean; orgId?: string; error?: string }> {
  if (!isSupabaseAvailable()) return { success: false, error: 'Supabase not configured' };

  try {
    // Find invitation
    const { data: invite, error: invErr } = await supabase
      .from('organization_invitations')
      .select('*')
      .eq('token', token)
      .is('accepted_at', null)
      .single();

    if (invErr || !invite) return { success: false, error: 'Invalid or expired invitation' };

    // Check expiry
    if (new Date(invite.expires_at) < new Date()) {
      return { success: false, error: 'Invitation has expired' };
    }

    // Add member
    const { error: memErr } = await supabase
      .from('organization_members')
      .insert({
        org_id: invite.org_id,
        user_id: userId,
        role: invite.role,
        invited_by: invite.invited_by,
      });

    if (memErr) throw memErr;

    // Mark invitation as accepted
    await supabase
      .from('organization_invitations')
      .update({ accepted_at: new Date().toISOString() })
      .eq('id', invite.id);

    // Update profile
    await supabase
      .from('profiles')
      .update({
        org_id: invite.org_id,
        user_role: invite.role === 'admin' ? 'admin' : 'user',
        plan: 'team',
      })
      .eq('id', userId);

    return { success: true, orgId: invite.org_id };
  } catch (err) {
    console.error('acceptInvitation error:', err);
    return { success: false, error: 'Failed to accept invitation' };
  }
}

// ── Remove a member from the org ──
export async function removeMember(
  orgId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseAvailable()) return { success: false, error: 'Supabase not configured' };

  try {
    // Prevent removing the org admin
    const org = await getOrganization(orgId);
    if (org?.admin_user_id === userId) {
      return { success: false, error: 'Cannot remove the organization owner' };
    }

    const { error } = await supabase
      .from('organization_members')
      .delete()
      .eq('org_id', orgId)
      .eq('user_id', userId);

    if (error) throw error;

    // Clear org_id from profile
    await supabase
      .from('profiles')
      .update({ org_id: null, user_role: 'user', plan: 'free' })
      .eq('id', userId);

    return { success: true };
  } catch (err) {
    console.error('removeMember error:', err);
    return { success: false, error: 'Failed to remove member' };
  }
}

// ── Update a member's role ──
export async function updateMemberRole(
  orgId: string,
  userId: string,
  newRole: 'admin' | 'manager' | 'member'
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseAvailable()) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase
      .from('organization_members')
      .update({ role: newRole })
      .eq('org_id', orgId)
      .eq('user_id', userId);

    if (error) throw error;

    // Sync user_role on profile
    await supabase
      .from('profiles')
      .update({ user_role: newRole === 'admin' ? 'admin' : 'user' })
      .eq('id', userId);

    return { success: true };
  } catch (err) {
    console.error('updateMemberRole error:', err);
    return { success: false, error: 'Failed to update role' };
  }
}

// ── Get pending invitations for an org ──
export async function getOrgInvitations(orgId: string): Promise<OrgInvitation[]> {
  if (!isSupabaseAvailable()) return [];

  try {
    const { data, error } = await supabase
      .from('organization_invitations')
      .select('*')
      .eq('org_id', orgId)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('getOrgInvitations error:', err);
    return [];
  }
}
