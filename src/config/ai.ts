export const AI = {
  groqModel: process.env.NEXT_PUBLIC_GROQ_MODEL || 'llama-3.3-70b-versatile',
  timeoutMs: Number(process.env.AI_TIMEOUT_MS || 30000),
  maxTokens: Number(process.env.AI_MAX_TOKENS || 512),
  maxMessages: Number(process.env.AI_MAX_MESSAGES || 12),
};

