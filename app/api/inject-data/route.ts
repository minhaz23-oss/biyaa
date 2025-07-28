
import { NextRequest, NextResponse } from 'next/server';
import { injectRandomBiodata } from '@/scripts/inject-random-biodata';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countParam = searchParams.get('count');
  const count = countParam ? parseInt(countParam, 10) : 50; // Default to 50 if not specified

  if (isNaN(count) || count <= 0) {
    return NextResponse.json({ error: 'Invalid count parameter. Please provide a positive number.' }, { status: 400 });
  }

  try {
    await injectRandomBiodata(count);
    return NextResponse.json({ message: `Successfully injected ${count} random biodata entries.` });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to inject biodata.' }, { status: 500 });
  }
}
