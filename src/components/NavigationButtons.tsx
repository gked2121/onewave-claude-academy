"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface NavigationButtonsProps {
  currentLevel?: number;
  showBack?: boolean;
  showContinue?: boolean;
  customContinue?: {
    href: string;
    text: string;
  };
  customBack?: {
    href: string;
    text: string;
  };
}

export default function NavigationButtons({
  currentLevel,
  showBack = true,
  showContinue = true,
  customContinue,
  customBack
}: NavigationButtonsProps) {
  const { isLevelUnlocked, isLevelCompleted, getNextLevel } = useProgress();

  const getBackButton = () => {
    if (customBack) {
      return {
        href: customBack.href,
        text: customBack.text
      };
    }

    if (typeof currentLevel === 'number') {
      if (currentLevel === 0) {
        return { href: '/journey', text: 'Back to Journey' };
      } else if (currentLevel > 0) {
        return { href: `/level/${currentLevel - 1}`, text: `Back to Level ${currentLevel - 1}` };
      }
    }

    return { href: '/journey', text: 'Back to Journey' };
  };

  const getContinueButton = () => {
    if (customContinue) {
      return {
        href: customContinue.href,
        text: customContinue.text,
        available: true
      };
    }

    if (typeof currentLevel === 'number') {
      const nextLevel = currentLevel + 1;
      const isCurrentCompleted = isLevelCompleted(currentLevel);
      const isNextUnlocked = isLevelUnlocked(nextLevel);

      if (isCurrentCompleted && isNextUnlocked) {
        return {
          href: `/level/${nextLevel}`,
          text: `Continue to Level ${nextLevel}`,
          available: true
        };
      } else if (!isCurrentCompleted) {
        return {
          href: `/level/${currentLevel}`,
          text: `Complete Level ${currentLevel}`,
          available: true
        };
      } else {
        // Current level is completed but next isn't unlocked (probably paywalled)
        return {
          href: '/journey',
          text: 'View Journey',
          available: true
        };
      }
    }

    // Default fallback
    const nextLevel = getNextLevel();
    if (nextLevel !== null) {
      return {
        href: `/level/${nextLevel}`,
        text: `Continue to Level ${nextLevel}`,
        available: true
      };
    }

    return {
      href: '/journey',
      text: 'View Your Progress',
      available: true
    };
  };

  const backButton = getBackButton();
  const continueButton = getContinueButton();

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-8">
      {/* Back button */}
      {showBack && (
        <Link
          href={backButton.href}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backButton.text}</span>
        </Link>
      )}

      {/* Spacer for single button layouts */}
      {!showBack && <div />}

      {/* Continue button */}
      {showContinue && continueButton.available && (
        <Link
          href={continueButton.href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          {typeof currentLevel === 'number' && isLevelCompleted(currentLevel) ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{continueButton.text}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}