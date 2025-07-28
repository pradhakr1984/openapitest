import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Only initialize OpenAI if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(request: NextRequest) {
  try {
    const { article, temperature } = await request.json()

    if (!article || typeof article !== 'string') {
      return NextResponse.json(
        { error: 'Article text is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI client not initialized' },
        { status: 500 }
      )
    }

    const prompt = `Summarize the following article in under 200 words, maintaining the key points and main ideas:

${article}

Summary:`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: temperature || 0.7,
      max_tokens: 500,
    })

    const summary = completion.choices[0]?.message?.content || 'No summary generated'

    return NextResponse.json({
      summary,
      usage: completion.usage,
    })
  } catch (error) {
    console.error('Error in summarize API:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 