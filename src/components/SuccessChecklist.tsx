"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Sparkles, Trophy } from 'lucide-react';

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  helpText?: string;
}

interface SuccessChecklistProps {
  title?: string;
  items: ChecklistItem[];
  onComplete?: () => void;
  showCelebration?: boolean;
}

export default function SuccessChecklist({
  title = "Success Criteria",
  items,
  onComplete,
  showCelebration = true
}: SuccessChecklistProps) {
  const totalItems = items.length;
  const checkedItems = items.filter(item => item.checked).length;
  const progress = Math.round((checkedItems / totalItems) * 100);
  const isComplete = checkedItems === totalItems;

  // Trigger onComplete callback when checklist becomes complete
  if (isComplete && onComplete && showCelebration) {
    setTimeout(() => onComplete(), 500);
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/70 rounded-2xl p-6 ring-1 ring-white/10 backdrop-blur">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">
              {checkedItems}/{totalItems}
            </span>
            <span className={`text-sm font-semibold ${isComplete ? 'text-emerald-400' : 'text-primary'}`}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                : 'bg-gradient-to-r from-primary to-secondary'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
              item.checked
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-zinc-800/50 border border-white/5'
            }`}
          >
            {/* Checkbox Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {item.checked ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </motion.div>
              ) : (
                <Circle className="w-6 h-6 text-white/40" />
              )}
            </div>

            {/* Label */}
            <div className="flex-1">
              <p className={`font-medium transition-colors ${
                item.checked ? 'text-emerald-300' : 'text-white/80'
              }`}>
                {item.label}
              </p>
              {item.helpText && !item.checked && (
                <p className="text-xs text-white/50 mt-1">
                  {item.helpText}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {isComplete && showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-xl p-4 border border-emerald-500/30"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="font-bold text-emerald-300">All Complete!</p>
                <p className="text-sm text-white/70">
                  You've met all the success criteria. Great work!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!isComplete && checkedItems > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-sm text-white/60">
              Keep going! You're {totalItems - checkedItems} step{totalItems - checkedItems !== 1 ? 's' : ''} away from completion.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Example usage component
export function SuccessChecklistExample() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'html',
      label: 'HTML structure is valid',
      checked: false,
      helpText: 'Make sure you have <html>, <head>, and <body> tags'
    },
    {
      id: 'heading',
      label: 'At least one heading exists',
      checked: false,
      helpText: 'Add an <h1> or <h2> tag with your page title'
    },
    {
      id: 'css',
      label: 'Custom CSS is applied',
      checked: false,
      helpText: 'Add a <style> tag or link to a CSS file'
    },
    {
      id: 'responsive',
      label: 'Works on mobile screens',
      checked: false,
      helpText: 'Test by resizing your browser window'
    }
  ]);

  const handleItemCheck = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="p-8">
      <SuccessChecklist
        title="Level 1: First Webpage"
        items={items}
        onComplete={() => {
          console.log('Level complete!');
          // Navigate to next level or show completion modal
        }}
      />

      {/* Demo controls (remove in production) */}
      <div className="mt-8 space-y-2">
        <p className="text-white text-sm">Click to toggle (demo only):</p>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => handleItemCheck(item.id)}
            className="block w-full text-left px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700"
          >
            Toggle: {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper to create checklist from objectives
export function createChecklistFromObjectives(
  objectives: string[],
  completedObjectives: string[] = []
): ChecklistItem[] {
  return objectives.map((objective, index) => ({
    id: `objective-${index}`,
    label: objective,
    checked: completedObjectives.includes(objective),
  }));
}