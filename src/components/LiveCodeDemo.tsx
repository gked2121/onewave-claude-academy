"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface LiveCodeDemoProps {
  projectType?: string;
}

// Project-specific demo data
const projectDemos: Record<string, {prompt: string; component: string; description: string}> = {
  'portfolio': {
    prompt: 'Create a hero section for my portfolio website',
    component: 'hero-section',
    description: 'Professional portfolio hero with gradient background'
  },
  'landing-page': {
    prompt: 'Create a feature card for a landing page',
    component: 'feature-card',
    description: 'Modern feature card with icon and CTA'
  },
  'recipe': {
    prompt: 'Create a recipe card component',
    component: 'recipe-card',
    description: 'Beautiful recipe card with image and details'
  },
  'dashboard': {
    prompt: 'Create a stats widget for a dashboard',
    component: 'stats-widget',
    description: 'Analytics dashboard stat card'
  },
  'custom': {
    prompt: 'Create a beautiful card component',
    component: 'custom-card',
    description: 'Customizable card component'
  },
  'default': {
    prompt: 'Create a beautiful card component for a coffee shop',
    component: 'coffee-card',
    description: 'Coffee shop menu card'
  }
};

const getCodeSteps = (projectType: string = 'default') => {
  const demo = projectDemos[projectType] || projectDemos['default'];

  if (projectType === 'portfolio') {
    return [
      {
        prompt: demo.prompt,
        code: `<div class="hero-section">`,
        delay: 500
      },
      {
        prompt: "",
        code: `<div class="hero-section">
  <h1>Hi, I'm Your Name</h1>`,
        delay: 800
      },
      {
        prompt: "",
        code: `<div class="hero-section">
  <h1>Hi, I'm Your Name</h1>
  <p class="tagline">Web Developer & Designer</p>`,
        delay: 600
      },
      {
        prompt: "",
        code: `<div class="hero-section">
  <h1>Hi, I'm Your Name</h1>
  <p class="tagline">Web Developer & Designer</p>
  <button class="cta-button">View My Work</button>
</div>`,
        delay: 700
      }
    ];
  }

  if (projectType === 'dashboard') {
    return [
      {
        prompt: demo.prompt,
        code: `<div class="stats-card">`,
        delay: 500
      },
      {
        prompt: "",
        code: `<div class="stats-card">
  <div class="stat-header">
    <h3>Total Users</h3>`,
        delay: 800
      },
      {
        prompt: "",
        code: `<div class="stats-card">
  <div class="stat-header">
    <h3>Total Users</h3>
  </div>
  <div class="stat-value">12,543</div>`,
        delay: 600
      },
      {
        prompt: "",
        code: `<div class="stats-card">
  <div class="stat-header">
    <h3>Total Users</h3>
  </div>
  <div class="stat-value">12,543</div>
  <div class="stat-change positive">+15% this month</div>
</div>`,
        delay: 700
      }
    ];
  }

  // Default coffee card with inline styles to override Tailwind
  return [
  {
    prompt: "Create a beautiful card component for a coffee shop",
    code: `<div style="background: linear-gradient(135deg, #6B4423 0%, #A0522D 100%); border-radius: 16px; padding: 24px; color: white; box-shadow: 0 10px 30px rgba(107, 68, 35, 0.4); max-width: 320px; margin: 20px auto; border: 1px solid rgba(255, 215, 0, 0.2); font-family: system-ui, -apple-system, sans-serif;">`,
    delay: 500
  },
  {
    prompt: "",
    code: `<div style="background: linear-gradient(135deg, #6B4423 0%, #A0522D 100%); border-radius: 16px; padding: 24px; color: white; box-shadow: 0 10px 30px rgba(107, 68, 35, 0.4); max-width: 320px; margin: 20px auto; border: 1px solid rgba(255, 215, 0, 0.2); font-family: system-ui, -apple-system, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid rgba(255, 215, 0, 0.3); padding-bottom: 12px;">
    <h2 style="font-size: 1.5em; font-weight: 700; color: #FFF8DC; margin: 0;">Morning Blend</h2>`,
    delay: 800
  },
  {
    prompt: "",
    code: `<div style="background: linear-gradient(135deg, #6B4423 0%, #A0522D 100%); border-radius: 16px; padding: 24px; color: white; box-shadow: 0 10px 30px rgba(107, 68, 35, 0.4); max-width: 320px; margin: 20px auto; border: 1px solid rgba(255, 215, 0, 0.2); font-family: system-ui, -apple-system, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid rgba(255, 215, 0, 0.3); padding-bottom: 12px;">
    <h2 style="font-size: 1.5em; font-weight: 700; color: #FFF8DC; margin: 0;">Morning Blend</h2>
    <span style="font-size: 1.8em; font-weight: 800; color: #FFD700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">$4.99</span>
  </div>`,
    delay: 600
  },
  {
    prompt: "",
    code: `<div style="background: linear-gradient(135deg, #6B4423 0%, #A0522D 100%); border-radius: 16px; padding: 24px; color: white; box-shadow: 0 10px 30px rgba(107, 68, 35, 0.4); max-width: 320px; margin: 20px auto; border: 1px solid rgba(255, 215, 0, 0.2); font-family: system-ui, -apple-system, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid rgba(255, 215, 0, 0.3); padding-bottom: 12px;">
    <h2 style="font-size: 1.5em; font-weight: 700; color: #FFF8DC; margin: 0;">Morning Blend</h2>
    <span style="font-size: 1.8em; font-weight: 800; color: #FFD700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">$4.99</span>
  </div>
  <p style="margin: 16px 0; opacity: 0.95; line-height: 1.6; font-size: 1em; color: #FAEBD7;">
    Rich, smooth coffee with notes of chocolate
  </p>`,
    delay: 900
  },
  {
    prompt: "",
    code: `<div style="background: linear-gradient(135deg, #6B4423 0%, #A0522D 100%); border-radius: 16px; padding: 24px; color: white; box-shadow: 0 10px 30px rgba(107, 68, 35, 0.4); max-width: 320px; margin: 20px auto; border: 1px solid rgba(255, 215, 0, 0.2); font-family: system-ui, -apple-system, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid rgba(255, 215, 0, 0.3); padding-bottom: 12px;">
    <h2 style="font-size: 1.5em; font-weight: 700; color: #FFF8DC; margin: 0;">Morning Blend</h2>
    <span style="font-size: 1.8em; font-weight: 800; color: #FFD700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">$4.99</span>
  </div>
  <p style="margin: 16px 0; opacity: 0.95; line-height: 1.6; font-size: 1em; color: #FAEBD7;">
    Rich, smooth coffee with notes of chocolate
  </p>
  <button style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #3E2723; border: none; padding: 14px 28px; border-radius: 10px; font-weight: 800; font-size: 1.05em; cursor: pointer; box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4); width: 100%;">Order Now</button>
</div>`,
    delay: 700
  }
  ];
};

const getCssCode = (projectType: string = 'default') => {
  if (projectType === 'portfolio') {
    return `.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 48px 32px;
  color: white;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.hero-section h1 {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 16px;
}

.tagline {
  font-size: 1.2em;
  opacity: 0.95;
  margin-bottom: 24px;
}

.cta-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}`;
  }

  if (projectType === 'landing-page') {
    return `.feature-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
  box-shadow: 0 12px 40px rgba(245, 87, 108, 0.3);
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
}

.feature-card h3 {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 1em;
  opacity: 0.95;
  margin-bottom: 20px;
  line-height: 1.6;
}

.cta-btn {
  background: white;
  color: #f5576c;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-btn:hover {
  transform: scale(1.05);
}`;
  }

  if (projectType === 'recipe-app' || projectType === 'recipe') {
    return `.recipe-card {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  border-radius: 16px;
  padding: 28px;
  color: #333;
  box-shadow: 0 12px 40px rgba(250, 112, 154, 0.3);
  max-width: 400px;
  margin: 20px auto;
}

.recipe-card h3 {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fff;
}

.cook-time {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
}

.description {
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 16px;
  color: #fff;
}

.view-recipe {
  background: #fff;
  color: #fa709a;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.view-recipe:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}`;
  }

  if (projectType === 'dashboard') {
    return `.stats-card {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  max-width: 300px;
  margin: 20px auto;
}

.stat-header h3 {
  font-size: 0.9em;
  opacity: 0.9;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 2.5em;
  font-weight: bold;
  margin: 12px 0;
}

.stat-change {
  font-size: 0.95em;
  opacity: 0.9;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
}

.positive {
  color: #86EFAC;
}`;
  }

  // Default uses inline styles, no external CSS needed
  return '';
};

export default function LiveCodeDemo({ projectType = 'default' }: LiveCodeDemoProps = {}) {
  const codeSteps = getCodeSteps(projectType);
  const demo = projectDemos[projectType] || projectDemos['default'];
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep < codeSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === codeSteps.length - 1) {
          setTimeout(() => setShowResult(true), 500);
          setIsPlaying(false);
        }
      }, codeSteps[currentStep]?.delay || 800);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowResult(false);
  };

  const currentCode = currentStep > 0 ? codeSteps[currentStep - 1]?.code || '' : '';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full px-4 py-2 text-sm border border-green-500/30 mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 font-medium">Live AI Coding Demo</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Watch AI Build: {demo.description}
        </h3>
        <p className="text-white/70">
          No syntax to memorize, no tutorials to follow - just tell AI what you want!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden">
          <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-white/60 text-sm">coffee-card.html</span>
          </div>
          <div className="p-4 h-80 overflow-auto">
            {currentStep === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-white/60 mb-4">Ready to see AI code in real-time?</p>
                  <button
                    onClick={handlePlay}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Demo
                  </button>
                </div>
              </div>
            ) : (
              <motion.pre
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-mono text-white leading-relaxed"
              >
                <code dangerouslySetInnerHTML={{
                  __html: currentCode
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/class=/g, '<span class="text-blue-400">class</span>=')
                    .replace(/="([^"]*)"/g, '="<span class="text-green-400">$1</span>"')
                    .replace(/&lt;(\/?[^&\s]+)/g, '&lt;<span class="text-red-400">$1</span>')
                }} />
              </motion.pre>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-lg border border-zinc-300 overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 text-sm ml-2">Live Preview</span>
            </div>
          </div>
          <div className="p-4 h-80 bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto">
            {showResult ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {getCssCode(projectType) && <style>{getCssCode(projectType)}</style>}
                <div dangerouslySetInnerHTML={{ __html: codeSteps[codeSteps.length - 1].code }} />
              </motion.div>
            ) : currentStep > 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-4 mx-auto"></div>
                  <p className="text-gray-600">AI is writing the code...</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {currentStep > 0 && (
          <>
            {isPlaying ? (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            ) : !showResult && (
              <button
                onClick={handlePlay}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Continue
              </button>
            )}

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Replay Demo
            </button>
          </>
        )}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-500/20">
            <h4 className="text-xl font-bold text-white mb-3">
              That's AI Coding in Action!
            </h4>
            <p className="text-white/80 mb-4">
              In under 30 seconds, AI created a beautiful, functional component.
              No syntax memorization, no Stack Overflow hunting, just pure creativity!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-green-400">Time Saved</div>
                <div className="text-white/70">2+ hours to 30 seconds</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-blue-400">Errors Made</div>
                <div className="text-white/70">0 syntax errors</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold text-purple-400">Stress Level</div>
                <div className="text-white/70">Zero frustration</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
