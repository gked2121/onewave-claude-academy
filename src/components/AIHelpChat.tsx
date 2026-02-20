"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, User, Lightbulb, ArrowRight } from 'lucide-react';

interface Message {
  type: 'ai' | 'user';
  content: string;
  timestamp?: number;
}

interface AIHelpChatProps {
  scenario: 'installation' | 'verification' | 'general';
  selectedCli?: string;
}

const helpScenarios = {
  installation: {
    gemini: [
      { type: 'ai' as const, content: "Hey there! I'm your personal coding mentor. You're about to unlock something incredible - the ability to build real applications without years of study. Let me guide you through this quick 5-minute setup that will change how you think about coding forever." },
      { type: 'user' as const, content: "I clicked 'Open Terminal' but I'm not sure what to do next" },
      { type: 'ai' as const, content: "You're doing great! See that black window that opened? That's your direct line to your computer's power. Most people are intimidated by it, but you're about to master it. If the install command didn't run automatically, just paste it and press Enter. In 30 seconds, you'll have the same AI tools that developers at Google use every day." },
      { type: 'user' as const, content: "It's asking me to confirm something?" },
      { type: 'ai' as const, content: "Perfect - you're almost there! Type 'y' and press Enter. This is your computer asking permission to install your new AI coding partner. Once this finishes, you'll never code alone again. Think about it - while others struggle with syntax errors for hours, you'll be building real projects in minutes." }
    ],
    claude: [
      { type: 'ai' as const, content: "Welcome! You've chosen Claude Code - the same premium AI tool that's helping thousands of developers build production-quality applications. I'm here to make sure you get this set up perfectly so you can start building immediately. This small investment in setup time will save you hundreds of hours of learning traditional coding." },
      { type: 'user' as const, content: "The terminal opened but nothing happened" },
      { type: 'ai' as const, content: "No problem at all - this happens sometimes! Just copy that 'npm install' command and paste it into the terminal, then press Enter. I know this might feel unfamiliar, but you're literally one command away from having enterprise-grade AI development tools. The same setup that takes bootcamp students weeks to learn, you're doing in minutes." },
      { type: 'user' as const, content: "It says I need Node.js?" },
      { type: 'ai' as const, content: "Great catch! Node.js is like the engine that powers modern web development. Click those 'Open Website' buttons - I've set up direct links to get you exactly what you need. Once you install Node.js, come back and we'll finish this. You're building the foundation that will let you create anything you can imagine." }
    ],
    codex: [
      { type: 'ai' as const, content: "Perfect choice! OpenAI Codex gives you access to the most advanced AI models available. You're getting the flexibility to start free and scale as you build bigger projects. I'm here to help you unlock the full potential of GPT-4 and beyond for your coding journey." },
      { type: 'user' as const, content: "Which option should I choose - ChatGPT Plus or API?" },
      { type: 'ai' as const, content: "Smart question! Here's the insider knowledge: if you already have ChatGPT Plus, you get unlimited usage for just $20/month - incredible value. If not, start with the API where you literally only pay for what you use. Most beginners spend $1-3 per month while learning. Either way, you're getting the same cutting-edge technology that's revolutionizing how software is built." },
      { type: 'user' as const, content: "How do I know if it's working?" },
      { type: 'ai' as const, content: "Great question! After installation, try typing 'codex --version' in the terminal. When you see that version number appear, you'll know you have direct access to OpenAI's most powerful models. You'll be coding alongside the same AI that helps engineers at top tech companies build billion-dollar applications." }
    ]
  },
  verification: [
    { type: 'ai' as const, content: "This is it - the moment your coding journey truly begins! We're about to verify that your AI assistant is ready to help you build amazing things. Most people spend months learning to code the traditional way. You're about to skip all that and go straight to building." },
    { type: 'user' as const, content: "I ran the command but got an error" },
    { type: 'ai' as const, content: "Don't worry - errors during setup are completely normal, even for experienced developers! What matters is that you're not giving up. Can you tell me what the error message says? Usually it's just asking for an API key or permission. Once we get past this small hurdle, you'll have professional-grade development tools at your fingertips." },
    { type: 'user' as const, content: "It worked! I see the version number" },
    { type: 'ai' as const, content: "YES! This is a huge moment! You now have the same AI development tools used at Apple, Google, and every major tech company. While others are still memorizing syntax, you're ready to build real applications by simply describing what you want. Click 'It worked!' and let's start creating something incredible together!" }
  ]
};

export default function AIHelpChat({ scenario, selectedCli }: AIHelpChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let messageSet: Message[] = [];

    if (scenario === 'installation' && selectedCli && helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation]) {
      messageSet = helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation];
    } else if (scenario === 'verification') {
      messageSet = helpScenarios.verification;
    }

    if (messageSet.length > 0) {
      setMessages([messageSet[0]]);
      setCurrentMessageIndex(0);
    }
  }, [scenario, selectedCli]);

  const showNextMessage = () => {
    let messageSet: Message[] = [];

    if (scenario === 'installation' && selectedCli && helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation]) {
      messageSet = helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation];
    } else if (scenario === 'verification') {
      messageSet = helpScenarios.verification;
    }

    if (currentMessageIndex < messageSet.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        const nextIndex = currentMessageIndex + 1;
        setMessages(prev => [...prev, messageSet[nextIndex]]);
        setCurrentMessageIndex(nextIndex);
        setIsTyping(false);
      }, 1000);
    }
  };

  if (messages.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-purple-400" />
        <h4 className="font-semibold text-purple-300">AI Helper Chat Preview</h4>
        <div className="flex-1"></div>
        <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
          Live Help Available
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-4 max-h-64 overflow-y-auto">
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'ai'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {message.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-2xl text-sm ${
                  message.type === 'ai'
                    ? 'bg-purple-500/10 text-purple-100 border border-purple-500/20'
                    : 'bg-blue-500/10 text-blue-100 border border-blue-500/20'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-300 text-sm">This is just a preview - real help is available anytime!</span>
        </div>

        {currentMessageIndex < (
          scenario === 'installation' && selectedCli && helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation]
            ? helpScenarios.installation[selectedCli as keyof typeof helpScenarios.installation].length - 1
            : helpScenarios.verification.length - 1
        ) && (
          <button
            onClick={showNextMessage}
            disabled={isTyping}
            className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm transition-colors disabled:opacity-50"
          >
            Continue chat
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}