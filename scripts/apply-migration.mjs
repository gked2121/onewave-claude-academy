import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    console.log('🔄 Checking if plan column exists...\n');

    // First, try to select the plan column to see if it exists
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('plan')
      .limit(1);

    if (!testError) {
      console.log('✅ Plan column already exists!');
      console.log('Sample data:', testData);
      return;
    }

    if (!testError || !testError.message.includes('column "plan" does not exist')) {
      console.error('❌ Unexpected error:', testError);
      return;
    }

    console.log('⚠️  Plan column does not exist. Migration needed.\n');

    // Read the migration SQL
    const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '20250110_add_plan_column.sql');
    const sql = readFileSync(migrationPath, 'utf-8');

    console.log('📋 Migration SQL to be applied:');
    console.log('----------------------------------------');
    console.log(sql);
    console.log('----------------------------------------\n');

    console.log('⚠️  The Supabase JavaScript client cannot execute raw SQL for security reasons.');
    console.log('📝 Please apply this migration manually:\n');
    console.log('1. Go to: https://supabase.com/dashboard/project/ialcfzuiaxstgmpzeest/sql/new');
    console.log('2. Copy and paste the SQL above');
    console.log('3. Click "Run" to execute\n');

    console.log('Or use the Supabase CLI:');
    console.log('  supabase db push\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

applyMigration();
