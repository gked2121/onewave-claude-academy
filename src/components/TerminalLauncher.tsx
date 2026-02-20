"use client";

import { useState } from 'react';
import { Terminal, ExternalLink, Copy, CheckCircle, AlertCircle, Globe, Link as LinkIcon } from 'lucide-react';

interface TerminalLauncherProps {
  command?: string;
  description?: string;
  websites?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
}

export default function TerminalLauncher({ command, description, websites }: TerminalLauncherProps) {
  const [copied, setCopied] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  const copyCommand = async () => {
    if (command) {
      try {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const openWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const launchTerminal = async () => {
    // Copy the command first
    if (command) {
      try {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }

    // Always show manual instructions since browsers can't directly launch terminal
    setShowManualInstructions(true);
  };

  const getOSInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('mac')) {
      return {
        os: 'macOS',
        steps: [
          'Press Cmd+Space to open Spotlight',
          'Type "Terminal" and press Enter',
          'Paste the command with Cmd+V and press Enter'
        ]
      };
    } else if (userAgent.includes('win')) {
      return {
        os: 'Windows',
        steps: [
          'Press Win+R to open Run dialog',
          'Type "cmd" and press Enter',
          'Paste the command with Ctrl+V and press Enter'
        ]
      };
    } else {
      return {
        os: 'Linux',
        steps: [
          'Press Ctrl+Alt+T to open Terminal',
          'Or open your terminal application from the menu',
          'Paste the command with Ctrl+Shift+V and press Enter'
        ]
      };
    }
  };

  const osInstructions = getOSInstructions();

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 rounded-lg border border-zinc-700 p-4">
        {description && (
          <p className="text-white/80 mb-3">{description}</p>
        )}

        {command && (
          <div className="bg-black rounded border border-zinc-600 p-3 mb-4">
            <code className="text-emerald-400 text-sm font-mono break-all">
              {command}
            </code>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {/* Primary Action: Copy & Show Instructions */}
          <button
            onClick={launchTerminal}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
              copied
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:scale-105 text-white'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Copied! Now Open Terminal
              </>
            ) : (
              <>
                <Terminal className="w-5 h-5" />
                Copy & Show Instructions
              </>
            )}
          </button>

          {/* Secondary: Just Copy */}
          {command && !showManualInstructions && (
            <button
              onClick={copyCommand}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              <Copy className="w-4 h-4" />
              Just Copy Command
            </button>
          )}
        </div>
      </div>

      {/* Website Launch Buttons */}
      {websites && websites.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Need to Visit Websites? Click to Open
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {websites.map((site, index) => (
              <button
                key={index}
                onClick={() => openWebsite(site.url)}
                className="flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-left"
              >
                <LinkIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white text-sm">{site.name}</div>
                  <div className="text-white/70 text-xs">{site.description}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-blue-200/80 text-xs mt-3">
            These will open in new tabs so you can easily switch back and forth!
          </p>
        </div>
      )}

      {showManualInstructions && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300">Manual Instructions for {osInstructions.os}</h4>
              <p className="text-blue-200 text-sm">If the automatic launch didn't work, follow these steps:</p>
            </div>
          </div>

          <ol className="space-y-2 text-sm text-blue-200">
            {osInstructions.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
            <p className="text-blue-200 text-xs">
              <strong>Tip:</strong> After pasting the command, you might need to press Enter to execute it.
              Don't worry if you see a prompt asking for permissions - just follow the on-screen instructions!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}