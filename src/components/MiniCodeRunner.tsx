"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Copy, Check } from 'lucide-react';

interface MiniCodeRunnerProps {
  initialCode?: string;
  height?: string;
  title?: string;
  hideCode?: boolean;
}

export default function MiniCodeRunner({
  initialCode = `<h1 style="color: purple; text-align: center; font-family: Arial;">
  Hello World!
</h1>
<p style="text-align: center; font-size: 20px;">
  Click Run to see your code work!
</p>`,
  height = '200px',
  title = 'Try It!',
  hideCode = false
}: MiniCodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    setIsRunning(true);
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 20px;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100%;
              }
            </style>
          </head>
          <body>
            ${code}
          </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
    setTimeout(() => setIsRunning(false), 500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="bg-zinc-900/90 rounded-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {title}
          </span>
          <motion.button
            onClick={runCode}
            className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-3 h-3" />
            Run
          </motion.button>
        </div>
      </div>

      {/* Code Input - Super Simple */}
      {!hideCode && (
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 bg-zinc-950 text-green-400 font-mono text-sm resize-none focus:outline-none"
            style={{ height: '120px' }}
            placeholder="Paste your HTML here..."
          />
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 p-1.5 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3 text-white/60" />
            )}
          </button>
        </div>
      )}

      {/* Preview - The Magic Window! */}
      <div className="relative">
        <div
          className="bg-white"
          style={{ height }}
        >
          {isRunning && (
            <motion.div
              className="absolute inset-0 bg-green-400/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
            />
          )}
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            title="Your Code Result"
            sandbox="allow-scripts"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-zinc-800/50 px-4 py-2 border-t border-white/10">
        <p className="text-white/60 text-xs text-center">
          Your code runs in this window!
        </p>
      </div>
    </motion.div>
  );
}