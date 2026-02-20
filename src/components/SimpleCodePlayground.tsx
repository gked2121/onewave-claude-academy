"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Copy,
  RotateCcw,
  Maximize2,
  Minimize2,
  Check,
  Code,
  Eye,
  Sparkles,
  Wand2,
  ChevronDown
} from 'lucide-react';

interface CodeTemplate {
  name: string;
  description: string;
  code: string;
  icon: React.ReactNode;
}

export default function SimpleCodePlayground() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
    }
    .container {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #764ba2;
      margin: 0 0 20px 0;
    }
    button {
      background: #667eea;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, Vibe Coder!</h1>
    <p>You're doing amazing! Click the button to celebrate!</p>
    <button onclick="celebrate()">Click Me!</button>
  </div>

  <script>
    function celebrate() {
      alert('You just ran JavaScript! You are becoming a real coder!');
      document.querySelector('h1').innerHTML = 'You Did It!';
      document.querySelector('h1').style.color = '#667eea';
    }
  </script>
</body>
</html>`);

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const templates: CodeTemplate[] = [
    {
      name: "Interactive Button",
      description: "A button that does something fun!",
      icon: <Sparkles className="w-4 h-4" />,
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #1a1a2e;
      margin: 0;
    }
    button {
      background: linear-gradient(45deg, #f093fb, #f5576c);
      color: white;
      border: none;
      padding: 20px 40px;
      font-size: 20px;
      border-radius: 50px;
      cursor: pointer;
      transform: scale(1);
      transition: all 0.3s;
    }
    button:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(245, 87, 108, 0.5);
    }
  </style>
</head>
<body>
  <button onclick="magic()">Click for Magic!</button>
  <script>
    function magic() {
      document.body.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
      alert('The background changed! Magic!');
    }
  </script>
</body>
</html>`
    },
    {
      name: "Animated Text",
      description: "Text that moves and changes colors!",
      icon: <Wand2 className="w-4 h-4" />,
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0f0f23;
      margin: 0;
    }
    h1 {
      font-size: 60px;
      font-family: Arial, sans-serif;
      background: linear-gradient(45deg, #00ff88, #00d4ff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: glow 2s ease-in-out infinite;
    }
    @keyframes glow {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  </style>
</head>
<body>
  <h1>I'm Learning to Code!</h1>
</body>
</html>`
    },
    {
      name: "Simple Game",
      description: "A mini clicking game!",
      icon: <Play className="w-4 h-4" />,
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea, #764ba2);
      margin: 0;
      color: white;
    }
    #game {
      text-align: center;
      background: rgba(255,255,255,0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
    #score {
      font-size: 48px;
      margin: 20px 0;
    }
    #clickButton {
      background: white;
      color: #667eea;
      border: none;
      padding: 20px 40px;
      font-size: 24px;
      border-radius: 50px;
      cursor: pointer;
      transition: transform 0.1s;
    }
    #clickButton:active {
      transform: scale(0.95);
    }
  </style>
</head>
<body>
  <div id="game">
    <h1>Click Game!</h1>
    <div id="score">Score: 0</div>
    <button id="clickButton" onclick="addPoint()">Click Me!</button>
  </div>

  <script>
    let score = 0;
    function addPoint() {
      score++;
      document.getElementById('score').innerHTML = 'Score: ' + score;
      if (score === 10) alert('You reached 10 points! Amazing!');
      if (score === 25) alert('25 points! You are a clicking champion!');
    }
  </script>
</body>
</html>`
    }
  ];

  const runCode = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
      }
    }
  };

  useEffect(() => {
    runCode();
  }, []);

  const handleRunCode = () => {
    runCode();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(templates[0].code);
    setTimeout(runCode, 100);
  };

  const loadTemplate = (template: CodeTemplate) => {
    setCode(template.code);
    setShowTemplates(false);
    setTimeout(runCode, 100);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-zinc-950' : ''}`}>
      <motion.div
        className={`${isFullscreen ? 'h-full' : ''} bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="bg-zinc-800/50 px-6 py-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="text-white font-semibold">Code Playground</h3>
              </div>

              {/* Template Dropdown */}
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-3 py-1.5 bg-zinc-700/50 rounded-lg text-white/80 text-sm hover:bg-zinc-700 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Try Examples
                <ChevronDown className={`w-3 h-3 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Run Button */}
              <motion.button
                onClick={handleRunCode}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                Run Code
              </motion.button>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="p-2 bg-zinc-700/50 rounded-lg text-white/60 hover:text-white hover:bg-zinc-700 transition-all"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="p-2 bg-zinc-700/50 rounded-lg text-white/60 hover:text-white hover:bg-zinc-700 transition-all"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-zinc-700/50 rounded-lg text-white/60 hover:text-white hover:bg-zinc-700 transition-all"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Template Dropdown Menu */}
          {showTemplates && (
            <motion.div
              className="absolute top-16 left-6 z-10 bg-zinc-800 rounded-lg border border-white/10 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template)}
                  className="w-full px-4 py-3 text-left hover:bg-zinc-700/50 transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      {template.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{template.name}</p>
                      <p className="text-white/60 text-xs">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Main Container */}
        <div className={`grid ${isFullscreen ? 'grid-cols-2 h-[calc(100%-72px)]' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Code Editor */}
          <div className="border-r border-white/10">
            <div className="bg-zinc-800/30 px-4 py-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-white/60 text-sm">HTML/CSS/JavaScript Editor</span>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full ${isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-96'} p-4 bg-zinc-950 text-white font-mono text-sm resize-none focus:outline-none`}
                placeholder="Paste your code here or try an example from above..."
                spellCheck={false}
              />

              {/* Helper Text */}
              <div className="absolute bottom-4 right-4 bg-zinc-800/80 backdrop-blur rounded-lg px-3 py-2">
                <p className="text-white/40 text-xs">Tip: Just paste any HTML code and click Run!</p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-zinc-800/30 px-4 py-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-secondary" />
                <span className="text-white/60 text-sm">Live Preview</span>
              </div>
            </div>
            <div className={`bg-white ${isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-96'}`}>
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                title="Code Preview"
                sandbox="allow-scripts"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Footer Help */}
        {!isFullscreen && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Perfect for beginners! Just paste code and click Run to see it work!
              </p>
              <button className="text-primary text-sm font-medium hover:underline">
                Need help? →
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
