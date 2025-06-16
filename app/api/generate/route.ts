import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { githubUrl } = await request.json();

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error('No API key found in environment variables');
      return NextResponse.json(
        { error: 'API key is not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Initialize the Google GenAI client
    const genAI = new GoogleGenAI({
      apiKey: process.env.GOOGLE_AI_API_KEY
    });

    const prompt = `Generate a professional README.md for the GitHub repository at ${githubUrl}. Include the following sections:
    1. Project Title and Description
    2. Features
    3. Installation
    4. Usage
    5. Technologies Used
    6. Contributing
    7. License
    8. Contact

    Make it professional, well-formatted, and include emojis where appropriate.`;

    console.log('Making request to Google AI API...');
    
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    const generatedReadme = response.text;

    if (!generatedReadme) {
      console.error('No content generated');
      throw new Error('No content was generated');
    }

    return NextResponse.json({ readme: generatedReadme });
  } catch (error) {
    console.error('Error generating README:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate README' },
      { status: 500 }
    );
  }
} 