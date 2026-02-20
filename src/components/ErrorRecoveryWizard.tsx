"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, HelpCircle, CheckCircle, ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';

interface ErrorRecoveryWizardProps {
  cliName: string;
  onBack: () => void;
  onResolved: () => void;
}

interface ErrorType {
  id: string;
  label: string;
  icon: string;
}

interface Solution {
  title: string;
  steps: string[];
  links?: { text: string; url: string }[];
}

const errorTypes: ErrorType[] = [
  { id: 'nothing', label: 'Nothing happened at all', icon: '--' },
  { id: 'not-found', label: 'Command not found', icon: 'x' },
  { id: 'permission', label: 'Permission denied', icon: '!!' },
  { id: 'red-error', label: 'Red error text appeared', icon: '!!' },
  { id: 'unsure', label: "I'm not sure what happened", icon: '?' },
];

const getSolution = (errorId: string, cliName: string): Solution => {
  const solutions: Record<string, Solution> = {
    'nothing': {
      title: 'Terminal Might Be Frozen or Command Not Entered',
      steps: [
        'Make sure you pressed Enter/Return after typing the command',
        'Try clicking inside the terminal window first, then type the command again',
        'Close the terminal and open a new one (Command + N on Mac, Ctrl + Shift + N on Windows)',
        'Type the command again in the fresh terminal window',
      ],
      links: [
        { text: 'How to open terminal on Mac', url: 'https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac' },
        { text: 'How to open terminal on Windows', url: 'https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/' },
      ]
    },
    'not-found': {
      title: 'The Program Isn\'t Installed Yet',
      steps: [
        'This error means your computer doesn\'t know about this command yet',
        'Let\'s try installing it again from scratch',
        'Make sure you\'re copying the ENTIRE command (select all the text)',
        `For ${cliName}, you might need to install Node.js first`,
        'After installing, close and reopen your terminal',
      ],
      links: [
        { text: 'Download Node.js (required)', url: 'https://nodejs.org/' },
        { text: 'Installation troubleshooting guide', url: 'https://docs.npmjs.com/downloading-and-installing-node-js-and-npm' },
      ]
    },
    'permission': {
      title: 'Your Computer Blocked the Installation',
      steps: [
        'This means you need administrator/admin rights',
        'On Mac: Try adding "sudo" before the command (like: sudo npm install...)',
        'It will ask for your computer password - that\'s normal!',
        'On Windows: Right-click your terminal and select "Run as Administrator"',
        'Then try the installation command again',
      ],
      links: [
        { text: 'Understanding sudo on Mac', url: 'https://support.apple.com/en-us/102849' },
        { text: 'Run as admin on Windows', url: 'https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/' },
      ]
    },
    'red-error': {
      title: 'Installation Hit a Problem',
      steps: [
        'Red text usually means something specific went wrong',
        'Look for keywords like "EACCES" (permission), "ENOENT" (file not found), or "network" (internet issue)',
        'Try closing and reopening your terminal',
        'Make sure you\'re connected to the internet',
        'Copy the error message and ask our AI assistant for help (click the chat button)',
      ],
      links: [
        { text: 'Common npm errors explained', url: 'https://docs.npmjs.com/common-errors' },
      ]
    },
    'unsure': {
      title: 'Let\'s Figure It Out Together',
      steps: [
        'No worries! Error messages can be confusing',
        'Take a screenshot of what you see in the terminal',
        'Click the chat button below to talk to our AI assistant',
        'Paste the error message or describe what you see',
        'The AI will help you understand and fix the issue',
      ],
    },
  };

  return solutions[errorId] || solutions['unsure'];
};

export default function ErrorRecoveryWizard({ cliName, onBack, onResolved }: ErrorRecoveryWizardProps) {
  const [selectedError, setSelectedError] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  const solution = selectedError ? getSolution(selectedError, cliName) : null;

  const handleResolved = () => {
    setResolved(true);
    setTimeout(() => {
      onResolved();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedError ? (
          <motion.div
            key="error-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3">
                Don't Worry - Let's Fix This!
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Installation errors happen to everyone, even experienced developers.
                Select what happened and we'll guide you through fixing it.
              </p>
            </div>

            {/* Error Type Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">What happened when you ran the command?</h3>
              {errorTypes.map((errorType) => (
                <button
                  key={errorType.id}
                  onClick={() => setSelectedError(errorType.id)}
                  className="w-full flex items-center gap-4 p-4 bg-zinc-900/70 hover:bg-zinc-800/70 rounded-xl ring-1 ring-white/10 hover:ring-primary/50 transition-all text-left"
                >
                  <span className="text-3xl">{errorType.icon}</span>
                  <span className="text-white font-medium">{errorType.label}</span>
                </button>
              ))}
            </div>

            {/* Back Button */}
            <div className="pt-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to installation instructions
              </button>
            </div>
          </motion.div>
        ) : !resolved ? (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Solution Header */}
            <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{solution?.title}</h3>
                  <p className="text-blue-200 text-sm">
                    Here's how to fix this issue step by step:
                  </p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-zinc-900/70 rounded-xl p-6 ring-1 ring-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Follow these steps:</h4>
              <ol className="space-y-4">
                {solution?.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-white/80 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Helpful Links */}
            {solution?.links && solution.links.length > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Helpful Resources
                </h4>
                <ul className="space-y-2">
                  {solution.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-2"
                      >
                        {link.text}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Need More Help */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Still Stuck?
              </h4>
              <p className="text-white/70 text-sm mb-3">
                Our AI assistant can help with your specific error message.
              </p>
              <p className="text-white/60 text-xs">
                Click the chat bubble in the bottom-right corner and paste your error message.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleResolved}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                I Fixed It! Continue
              </button>
              <button
                onClick={() => setSelectedError(null)}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                Try Different Issue
              </button>
            </div>

            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-full justify-center mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to installation
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Awesome!</h2>
            <p className="text-white/70">
              You fixed it! That's the developer mindset - encountering problems and solving them.
            </p>
            <p className="text-primary font-semibold mt-2">+25 XP • Troubleshooter Badge Earned</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}