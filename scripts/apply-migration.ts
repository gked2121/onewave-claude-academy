import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    console.log('🔄 Applying plan column migration...');

    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20250110_add_plan_column.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📝 Migration SQL:');
    console.log(sql);

    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('❌ Migration failed:', error);
      console.log('\n⚠️  Attempting direct column addition...');

      // Try to add the column directly
      const { error: alterError } = await supabase.from('profiles').select('plan').limit(1);

      if (alterError && alterError.message.includes('column "plan" does not exist')) {
        console.log('✅ Confirmed: plan column does not exist');
        console.log('\n📋 Please run this SQL in the Supabase SQL Editor:');
        console.log('https://supabase.com/dashboard/project/ialcfzuiaxstgmpzeest/sql/new');
        console.log('\n--- Copy the SQL below ---');
        console.log(sql);
        console.log('--- End SQL ---\n');
      } else {
        console.log('✅ Plan column may already exist');
      }
    } else {
      console.log('✅ Migration applied successfully!');
      console.log('Data:', data);
    }

    // Verify the column exists
    console.log('\n🔍 Verifying plan column exists...');
    const { data: profiles, error: selectError } = await supabase
      .from('profiles')
      .select('id, email, plan')
      .limit(1);

    if (selectError) {
      console.error('❌ Error querying profiles:', selectError);
    } else {
      console.log('✅ Plan column verified! Sample data:', profiles);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

applyMigration();
