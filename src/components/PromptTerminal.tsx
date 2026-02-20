"use client";

import { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

const prompts = [
  'Write a function that sorts an array of numbers in ascending order.',
  'Create a responsive navbar with Tailwind that collapses on mobile.',
  'Explain the difference between let, const, and var in JS.',
  'Fetch JSON from an API and render a list in React.',
];

export default function PromptTerminal() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<"good" | "bad" | null>(null);
  const prompt = prompts[index];

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-8">Gamified Prompt System</h1>
      <div className="w-full max-w-2xl glass rounded-lg shadow-lg">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400">bash</span>
        </div>
        <div className="p-4">
          <div className="flex">
            <span className="text-green-400 mr-2">$</span>
            <p className="font-mono">{prompt}</p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2 rounded-b-lg">
          <div className="flex items-center gap-3">
            <button
              className={`flex items-center px-2 py-1 rounded ${rating === 'good' ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setRating('good')}
            >
              <ThumbsUp className="w-4 h-4 mr-1" /> Good
            </button>
            <button
              className={`flex items-center px-2 py-1 rounded ${rating === 'bad' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setRating('bad')}
            >
              <ThumbsDown className="w-4 h-4 mr-1" /> Bad
            </button>
            <button
              className="ml-2 text-sm text-gray-300 hover:text-white underline"
              onClick={() => {
                setRating(null);
                setIndex((index + 1) % prompts.length);
              }}
            >
              Next prompt
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
