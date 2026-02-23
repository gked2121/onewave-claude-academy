import { createClient } from '@supabase/supabase-js';

// Admin Supabase client with service role key - bypasses RLS policies
// ONLY use this for server-side admin operations!

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isConfigured = supabaseUrl && supabaseServiceKey;

export const supabaseAdmin = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      }
    })
  : null as any;

export const isSupabaseAdminAvailable = () => isConfigured;
