import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'PROTOCOL: RED ONLINE', timestamp: Date.now() });
}
