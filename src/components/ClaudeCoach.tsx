"use client";

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Bot, Code2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { getContextualHelp } from '@/utils/claudeCoachKnowledge';
import { parseMarkdown } from '@/utils/markdown';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

export default function ClaudeCoach() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [codeToCheck, setCodeToCheck] = useState("");
  const [showCodeChecker, setShowCodeChecker] = useState(false);
  const [mounted, setMounted] = useState(false);
  const progress = useProgress();
  const currentLevel = progress.currentLevel || progress.getNextLevel() || 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get contextual knowledge for current level
  const contextualHelp = getContextualHelp(currentLevel, "", progress);

  const getPersonalizedGreeting = () => {
    const levelInfo = contextualHelp.levelContext;

    if (progress.completedLevels.length === 0) {
      return `Hey there! I'm your Claude Coach. You're starting with ${levelInfo.title}. I'm here to help you ${levelInfo.objective.toLowerCase()}. Ask me anything about Claude!`;
    } else {
      return `Welcome back! You've completed ${progress.completedLevels.length} lessons - awesome progress! Currently on ${levelInfo.title}. How can I help you today?`;
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'm1',
        role: 'assistant',
        content: getPersonalizedGreeting(),
        timestamp: new Date(),
      }]);
    }
  }, [currentLevel, progress.completedLevels.length]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, open]);

  // Code checking functionality
  const handleCodeCheck = async () => {
    if (!codeToCheck.trim()) return;

    const levelInfo = contextualHelp.levelContext;

    // Call AI verification endpoint
    try {
      const response = await fetch('/api/verify-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'code',
          submission: codeToCheck,
          criteria: levelInfo.successCriteria,
          instructions: levelInfo.objective
        })
      });

      const result = await response.json();

      let responseText = `## Code Check Results\n\n`;
      responseText += `**Score: ${result.score}/100** - ${result.passed ? 'Passed!' : 'Keep working!'}\n\n`;
      responseText += `${result.feedback}\n\n`;

      if (result.strengths?.length > 0) {
        responseText += `**Strengths:**\n`;
        result.strengths.forEach((s: string) => {
          responseText += `- ${s}\n`;
        });
        responseText += '\n';
      }

      if (result.improvements?.length > 0) {
        responseText += `**Areas to improve:**\n`;
        result.improvements.forEach((i: string) => {
          responseText += `- ${i}\n`;
        });
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(m => [...m, assistantMsg]);
    } catch {
      setMessages(m => [...m, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I couldn't check your code right now. Please try again later.",
        timestamp: new Date()
      }]);
    }

    setCodeToCheck("");
    setShowCodeChecker(false);
  };

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages((m) => [...m, userMsg]);
    setIsTyping(true);

    const assistantId = crypto.randomUUID();
    const systemPrompt = buildContextualSystemPrompt(currentLevel, contextualHelp, progress);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          temperature: 0.7,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: 'user', content: text },
          ],
        }),
      });

      if (!res.ok || !res.body) throw new Error('AI unavailable');

      setMessages((m) => [...m, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const chunk = await reader.read();
        done = chunk.done;
        if (chunk.value) {
          const token = decoder.decode(chunk.value);
          setMessages((m) => m.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + token }
              : msg
          ));
        }
      }
    } catch {
      const fallback = getFallbackReply(text, currentLevel, contextualHelp);
      setMessages((m) => [...m, {
        id: assistantId,
        role: 'assistant',
        content: fallback,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  function buildContextualSystemPrompt(level: number, contextualHelp: any, progress: any) {
    const levelInfo = contextualHelp.levelContext;

    return `You are Claude Coach, a friendly and intelligent AI mentor for OneWave Claude Academy. You're like a knowledgeable senior developer who's approachable and genuinely excited to help people learn about the Anthropic Claude ecosystem.

YOUR PERSONALITY:
- Conversational and friendly, like chatting with a helpful colleague
- Ask follow-up questions to understand the user better
- Share quick insights and "aha moments" that connect concepts
- Use natural language, not robotic responses
- Be genuinely curious about their progress and challenges

CURRENT USER CONTEXT:
- Current Lesson: Level ${level} - "${levelInfo.title}"
- Learning Goal: ${levelInfo.objective}
- Progress: ${progress.completedLevels.length} lessons completed
- Track Focus: Claude ecosystem learning

CLAUDE ECOSYSTEM KNOWLEDGE:
You are an expert on all things Anthropic and Claude:
- Claude Chat (claude.ai) - Conversational AI assistant
- Claude Code (CLI) - AI-powered terminal development
- MCP (Model Context Protocol) - Plugin/connector system
- Anthropic API - Building AI applications
- Claude Enterprise - Team and business features
- Claude Skills - SKILL.md custom commands

CONVERSATION STYLE:
- Start responses naturally - "Oh interesting!" "Great question!" "I see what you're going for..."
- Ask thoughtful follow-ups when appropriate
- Share context about how things connect across Claude tools
- Be encouraging but honest about challenges
- Connect current lesson to broader Claude ecosystem

CURRENT LESSON CONTEXT:
At Level ${level}, students are learning: ${levelInfo.objective}
Key topics: ${levelInfo.successCriteria.slice(0, 3).join(', ')}

Remember: Help them master Claude tools and become confident AI-powered professionals.`;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!open && (
          <div className="relative">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
              aria-label="Open Claude Coach"
              onClick={() => setOpen(true)}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-claude via-claude to-primary shadow-xl flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-claude/50 to-primary/50 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
                <MessageCircle className="w-7 h-7 relative z-10" />

                {/* Level indicator */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-bg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">{currentLevel}</span>
                </div>
              </div>
            </motion.button>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute bottom-20 right-0 w-64 p-3 bg-bg-card/95 backdrop-blur-xl rounded-xl border border-claude/30 pointer-events-none shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-text">Claude Coach Ready</span>
              </div>
              <p className="text-xs text-text-soft leading-relaxed">
                I can help you with {contextualHelp.levelContext.title.toLowerCase()}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[400px] h-[600px] bg-bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-claude/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-claude/20 to-primary/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-claude to-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">Claude Coach</h3>
                  <p className="text-xs text-text-muted">Level {currentLevel}: {contextualHelp.levelContext.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-success/20 border border-success/30 text-success hover:bg-success/30 transition-colors"
                  onClick={() => setShowCodeChecker(!showCodeChecker)}
                  title="Check your code"
                >
                  <Code2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-bg-lighter transition-colors text-text-muted hover:text-text"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Code Checker Panel */}
            <AnimatePresence>
              {showCodeChecker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-border bg-bg-lighter/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <h4 className="font-medium text-text">Code Checker</h4>
                    </div>

                    <div className="space-y-3">
                      <textarea
                        className="w-full bg-bg border border-border rounded-lg p-3 text-sm text-text placeholder:text-text-muted resize-none font-mono focus:outline-none focus:border-claude"
                        placeholder="Paste your code here to check..."
                        value={codeToCheck}
                        onChange={(e) => setCodeToCheck(e.target.value)}
                        rows={4}
                      />

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 rounded-lg bg-claude text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                        onClick={handleCodeCheck}
                        disabled={!codeToCheck.trim()}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Check Code
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-claude to-primary text-white ml-4 shadow-lg'
                          : 'bg-bg border border-border text-text mr-4 shadow-lg backdrop-blur-sm'
                      }`}
                    >
                      <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                        {parseMarkdown(message.content)}
                      </div>
                    </div>

                    {message.timestamp && (
                      <p className={`text-xs text-text-muted mt-1 px-2 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 order-2'
                      : 'bg-gradient-to-br from-claude to-primary order-1'
                  }`}>
                    {message.role === 'user' ? (
                      <span className="text-white text-xs font-bold">You</span>
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-claude to-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-bg border border-border px-4 py-3 rounded-2xl mr-4 ml-2 backdrop-blur-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-claude rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-claude rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-claude rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-border bg-bg-lighter/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-claude transition-colors"
                  placeholder="Ask Claude Coach anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl bg-claude text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getFallbackReply(input: string, level: number, contextualHelp: any): string {
  const levelInfo = contextualHelp.levelContext;

  if (/help|stuck|don't know/i.test(input)) {
    return `You're working on ${levelInfo.title} - here's what usually helps: ${levelInfo.helpfulPrompts[0]} ${levelInfo.encouragement[0]}`;
  }

  if (/code|check|review/i.test(input)) {
    return `I can check your code! Click the Code Checker button above to paste your code and get instant feedback.`;
  }

  if (/error|bug|fail|issue/i.test(input)) {
    return `Let me help you debug! ${levelInfo.commonPitfalls[0]} Try the code checker to verify your work.`;
  }

  return `I'm here to help with ${levelInfo.title}! ${levelInfo.objective} ${levelInfo.encouragement[Math.floor(Math.random() * levelInfo.encouragement.length)]}`;
}
