
import { NextResponse } from 'next/server';
import { cleanupTestData } from '@/scripts/inject-random-biodata';

export async function GET() {
  try {
    await cleanupTestData();
    return NextResponse.json({ message: 'Successfully cleaned up test data.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clean up test data.' }, { status: 500 });
  }
}
