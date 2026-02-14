"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";

interface ClaudeSimulatorProps {
  title: string;
  suggestedPrompts: string[];
  onComplete?: () => void;
  responses?: Record<string, string>;
}

export default function ClaudeSimulator({
  title,
  suggestedPrompts,
  onComplete,
  responses
}: ClaudeSimulatorProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const generateResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();

    // Check custom responses first (level-specific)
    if (responses) {
      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerPrompt.includes(keyword.toLowerCase())) {
          return response;
        }
      }
    }

    // Event planning responses
    if (lowerPrompt.includes("birthday") && lowerPrompt.includes("dinosaur")) {
      return `**Dinosaur Birthday Party Plan**

| Category | Details |
|----------|---------|
| **Theme Name** | "Jurassic Adventure" |
| **Activity 1** | Dinosaur Dig (15 min) - Hide toy dinosaurs in sandbox |
| **Activity 2** | T-Rex Relay Race (20 min) - Obstacle course with dino moves |
| **Activity 3** | Fossil Making (20 min) - Clay impressions with dinosaur toys |
| **Decorations** | Green/brown balloons ($15), dinosaur cutouts ($10), jungle vines ($12) |
| **Menu** | Dino nuggets, "Herbivore" veggie tray, "Volcano" cake, Jungle juice, Fossil cookies, Fresh fruit |

Total decoration budget: ~$37`;
    }

    // Claude capabilities
    if (lowerPrompt.includes("what can you") || lowerPrompt.includes("capabilities")) {
      return `I can help you with many tasks:

🎯 **Writing & Content**
• Draft emails, articles, and creative content
• Edit and improve existing writing
• Summarize long documents

💻 **Coding & Development**
• Write code in multiple languages
• Debug and explain code
• Suggest optimizations

🎓 **Learning & Research**
• Explain complex concepts
• Answer questions on various topics
• Help with brainstorming ideas

📊 **Analysis & Planning**
• Analyze data and patterns
• Create plans and strategies
• Organize information

What specific task can I help you with today?`;
    }

    // Better prompts
    if (lowerPrompt.includes("better prompt") || lowerPrompt.includes("improve prompt")) {
      return `**Tips for Better Prompts:**

1. **Be Specific** - Instead of "write about dogs," say "write a 300-word blog post about golden retriever training"

2. **Provide Context** - Tell me who the audience is, what the purpose is, and any constraints

3. **Request Format** - Specify if you want a list, table, paragraph, etc.

4. **Include Examples** - Show me what good output looks like

5. **Break Down Complex Tasks** - Split big requests into smaller steps

**Example:**
❌ Bad: "Write about marketing"
✅ Good: "Write a 5-point checklist for small business social media marketing, targeting local bakeries, with specific examples for each point"

What would you like help improving?`;
    }

    // Default helpful response
    return `That's a great question! I'd be happy to help you with that.

To give you the most useful response, could you provide a bit more detail about:
• What specific aspect you're most interested in
• Who the audience or users would be
• What format would be most helpful (list, explanation, step-by-step, etc.)

The more context you provide, the better I can tailor my response to your needs! 🎯`;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: "user" as const, content: userInput };
    setMessages([...messages, newUserMessage]);
    setUserInput("");
    setIsTyping(true);
    setHasInteracted(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userInput);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);

      // Mark as complete after first successful interaction
      if (!hasInteracted && onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setUserInput(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-orange-500/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-orange-100 text-xs">Practice your prompting skills</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-orange-300 mb-4">Try one of the suggested prompts below or write your own!</p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === "user"
                    ? "bg-orange-500/20 border border-orange-400/50 text-orange-100"
                    : "bg-amber-500/20 border border-amber-400/50 text-amber-100"
                }`}
              >
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {message.role === "user" ? "You" : "Claude"}
                </div>
                <div className="text-sm whitespace-pre-line leading-relaxed">
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-amber-500/20 border border-amber-400/50 rounded-xl p-4">
              <div className="flex gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 bg-amber-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-amber-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-amber-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggested Prompts */}
      {messages.length === 0 && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-xs text-orange-300 font-semibold mb-2">Try these prompts:</p>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="w-full text-left text-sm bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 text-orange-200 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-orange-500/30">
        <div className="flex gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your prompt here..."
            rows={3}
            className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 h-full flex items-center justify-center text-white transition-all"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Completion Badge */}
      {hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-4"
        >
          <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-300 font-semibold">
              Great job! You&apos;ve practiced with the simulator.
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
