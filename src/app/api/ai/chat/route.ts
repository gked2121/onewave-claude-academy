import { NextRequest } from 'next/server';
import { AI } from '@/config/ai';
import { getAuthUser } from '@/lib/auth-helpers';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Support both GROQ and xAI APIs
const getApiConfig = () => {
  const groqKey = process.env.GROQ_API_KEY;

  if (groqKey?.startsWith('xai-')) {
    return {
      url: 'https://api.x.ai/v1/chat/completions',
      apiKey: groqKey,
      provider: 'xai'
    };
  } else if (groqKey) {
    return {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: groqKey,
      provider: 'groq'
    };
  }

  return null;
};

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  // Rate limit: 20 requests per 60 seconds per IP
  const rateLimited = checkRateLimit(req, { limit: 20, windowSeconds: 60 });
  if (rateLimited) return rateLimited;

  try {
    const user = await getAuthUser(req);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const config = getApiConfig();
    if (!config) {
      console.error('AI API config missing');
      return new Response('Server not configured: API key missing', { status: 500 });
    }

    const body = await req.json().catch((e) => {
      console.error('Failed to parse request body:', e);
      return {};
    });
    const rawMessages: ChatMessage[] = body.messages || [];
    const messages: ChatMessage[] = rawMessages.slice(-AI.maxMessages);

    console.log('Processing chat request with', messages.length, 'messages');

  // Use appropriate model for the provider
  const defaultModel = config.provider === 'xai' ? 'grok-beta' : AI.groqModel;
  const model: string = body.model || defaultModel;
  const temperature: number = typeof body.temperature === 'number' ? body.temperature : 0.4;

  // Stream from AI provider and re-stream just the text tokens to the client
  const payload = {
    model,
    messages,
    temperature,
    max_tokens: AI.maxTokens,
    stream: true,
  };

  const upstream = await fetchWithRetry(config.url, config.apiKey, payload, AI.timeoutMs);

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => upstream.statusText);
    return new Response(`AI API error: ${errText}`, { status: upstream.status || 500 });
  }

  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      // Incoming is SSE. Split into lines, forward only content deltas.
      const text = new TextDecoder().decode(value);
      const lines = text.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') continue;
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content ?? '';
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          // ignore JSON parse errors
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}

async function fetchWithRetry(url: string, apiKey: string, body: unknown, timeoutMs: number, retries = 2) {
  let attempt = 0;
  let lastError: unknown = new Error('Max retries reached');
  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.status === 429 || res.status === 503) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        attempt++;
        continue;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => res.statusText);
        throw new Error(txt || `HTTP ${res.status}`);
      }
      return res;
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
      if (attempt >= retries) break;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      attempt++;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Upstream error');
}
