import { NextRequest, NextResponse } from 'next/server';

interface VerifyRequest {
  exerciseType: 'prompt' | 'code' | 'upload' | 'build';
  submission: string;
  criteria: string[];
  instructions: string;
  fileContent?: string;
}

interface AIFeedback {
  passed: boolean;
  score: number;
  feedback: string;
  suggestions?: string[];
  strengths?: string[];
  improvements?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequest = await request.json();
    const { exerciseType, submission, criteria, instructions, fileContent } = body;

    // Validate input
    if (!submission && !fileContent) {
      return NextResponse.json(
        { error: 'No submission provided' },
        { status: 400 }
      );
    }

    // Build the evaluation prompt
    const evaluationPrompt = buildEvaluationPrompt(
      exerciseType,
      submission,
      criteria,
      instructions,
      fileContent
    );

    // Call Claude API for evaluation
    const feedback = await evaluateWithClaude(evaluationPrompt);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Exercise verification error:', error);

    // Fallback to basic evaluation if API fails
    const fallbackFeedback = basicEvaluation(
      (await request.clone().json()) as VerifyRequest
    );

    return NextResponse.json(fallbackFeedback);
  }
}

function buildEvaluationPrompt(
  exerciseType: string,
  submission: string,
  criteria: string[],
  instructions: string,
  fileContent?: string
): string {
  const criteriaList = criteria.length > 0
    ? `\nValidation Criteria:\n${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
    : '';

  return `You are an AI tutor evaluating a student's exercise submission for a Claude Academy learning platform.

Exercise Type: ${exerciseType}
Instructions: ${instructions}
${criteriaList}

Student Submission:
${submission}
${fileContent ? `\nAttached File Content:\n${fileContent}` : ''}

Please evaluate this submission and provide feedback in the following JSON format:
{
  "passed": boolean (true if meets requirements),
  "score": number (0-100),
  "feedback": "string (2-3 sentences summarizing the evaluation)",
  "strengths": ["string array of what was done well"],
  "improvements": ["string array of areas to improve"],
  "suggestions": ["string array of helpful tips for next time"]
}

Be encouraging but honest. Focus on learning outcomes. If the submission shows genuine effort but has gaps, provide constructive feedback.`;
}

async function evaluateWithClaude(prompt: string): Promise<AIFeedback> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text || '';

  // Parse JSON from Claude's response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse feedback JSON');
  }

  const feedback = JSON.parse(jsonMatch[0]);

  return {
    passed: feedback.passed ?? false,
    score: Math.min(100, Math.max(0, feedback.score ?? 0)),
    feedback: feedback.feedback || 'Evaluation complete.',
    strengths: feedback.strengths || [],
    improvements: feedback.improvements || [],
    suggestions: feedback.suggestions || []
  };
}

function basicEvaluation(request: VerifyRequest): AIFeedback {
  const { submission, criteria } = request;
  const submissionLength = submission?.length || 0;

  // Basic heuristic scoring
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Length check
  if (submissionLength > 50) {
    score += 30;
    strengths.push('Provided a detailed response');
  } else if (submissionLength > 20) {
    score += 15;
    improvements.push('Consider adding more detail');
  } else {
    improvements.push('Response is too brief');
  }

  // Criteria coverage (basic keyword matching)
  if (criteria && criteria.length > 0) {
    const submissionLower = submission.toLowerCase();
    let criteriaMatched = 0;

    criteria.forEach(criterion => {
      const keywords = criterion.toLowerCase().split(' ').filter(w => w.length > 3);
      const hasKeywords = keywords.some(kw => submissionLower.includes(kw));
      if (hasKeywords) criteriaMatched++;
    });

    const criteriaScore = Math.round((criteriaMatched / criteria.length) * 50);
    score += criteriaScore;

    if (criteriaMatched === criteria.length) {
      strengths.push('Addressed all requirements');
    } else if (criteriaMatched > 0) {
      improvements.push('Some requirements were not fully addressed');
    }
  } else {
    score += 20; // Default if no criteria
  }

  // Code detection bonus
  if (submission.includes('```') || submission.includes('function') || submission.includes('const ')) {
    score += 10;
    strengths.push('Included code examples');
  }

  const passed = score >= 50;

  return {
    passed,
    score: Math.min(100, score),
    feedback: passed
      ? 'Good work! Your submission demonstrates understanding of the concepts.'
      : 'Your submission needs some improvement. Review the requirements and try again.',
    strengths,
    improvements,
    suggestions: passed
      ? ['Keep up the great work!']
      : ['Review the lesson content', 'Check the validation criteria carefully']
  };
}
