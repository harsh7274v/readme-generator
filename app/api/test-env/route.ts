import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    hasApiKey: !!process.env.GOOGLE_AI_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env),
  };

  return NextResponse.json(envVars);
} 