import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Checking if plan column exists in profiles table...');

    // Try to select the plan column to see if it exists
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, plan')
      .limit(1);

    if (error) {
      // If error mentions column doesn't exist, migration not applied
      if (error.message.includes('column') && error.message.includes('plan')) {
        return NextResponse.json({
          success: false,
          migrationApplied: false,
          message: 'Plan column does NOT exist in database',
          error: error.message,
          needsMigration: true
        });
      }

      // Some other error
      return NextResponse.json({
        success: false,
        message: 'Database query failed',
        error: error.message
      }, { status: 500 });
    }

    // Success - column exists
    return NextResponse.json({
      success: true,
      migrationApplied: true,
      message: 'Plan column EXISTS in database',
      sampleData: data,
      needsMigration: false
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Verification failed',
      error: error.message
    }, { status: 500 });
  }
}
