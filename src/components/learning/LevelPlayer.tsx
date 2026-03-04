'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  CheckCircle,
  BookOpen,
  Code,
  Play,
  AlertCircle,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { InteractiveExercise } from './InteractiveExercise';
import { NextStepCard } from '@/components/NextStepCard';
import { TypewriterText } from '@/components/TypewriterText';
import type { TrackLevel, ContentSection, LevelContent } from '@/lib/types';

interface LevelPlayerProps {
  level: TrackLevel;
  trackColor: string;
  isCompleted?: boolean;
  onComplete: (score: number) => void;
  onBack: () => void;
  onNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LevelPlayer({
  level,
  trackColor,
  isCompleted = false,
  onComplete,
  onBack,
  onNext,
  hasPrevious,
  hasNext
}: LevelPlayerProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [showNextStepOverlay, setShowNextStepOverlay] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [typedSections, setTypedSections] = useState<Set<number>>(new Set());
  const [codeRevealed, setCodeRevealed] = useState<Set<number>>(new Set());

  const content = level.content;
  const sections = content.sections || [];
  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;
  const hasExercise = content.exercise || content.quiz;

  // Mark section as read when viewed
  useEffect(() => {
    if (currentSection) {
      setCompletedSections(prev => new Set([...prev, currentSectionIndex]));
    }
  }, [currentSectionIndex]);

  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExerciseComplete = (submission: unknown, feedback: { score: number }) => {
    setExerciseCompleted(true);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    onComplete(feedback.score);
  };

  const handleLevelComplete = () => {
    onComplete(100);
    setJustCompleted(true);
    // Show the next step overlay after a short delay
    setTimeout(() => setShowNextStepOverlay(true), 500);
  };

  // Calculate progress
  const readProgress = Math.round((completedSections.size / sections.length) * 100);
  const canComplete = (hasExercise ? exerciseCompleted : readProgress === 100) || isCompleted;

  const handleSectionTyped = useCallback(() => {
    setTypedSections(prev => new Set([...prev, currentSectionIndex]));
  }, [currentSectionIndex]);

  // Reset typed state when navigating to a new section that hasn't been seen
  useEffect(() => {
    if (!typedSections.has(currentSectionIndex)) {
      setCodeRevealed(prev => {
        const next = new Set(prev);
        next.delete(currentSectionIndex);
        return next;
      });
    }
  }, [currentSectionIndex, typedSections]);

  const isAlreadyTyped = typedSections.has(currentSectionIndex);

  // Render content section with animations
  const renderSection = (section: ContentSection) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            {section.title && (
              <motion.h3
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold text-text mb-4"
              >
                {section.title}
              </motion.h3>
            )}
            {isAlreadyTyped ? (
              <div
                className="text-text-soft leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            ) : (
              <div className="text-text-soft leading-relaxed">
                <TypewriterText
                  text={section.content}
                  html
                  speed={60}
                  delay={section.title ? 300 : 100}
                  cursor
                  onComplete={handleSectionTyped}
                />
              </div>
            )}
          </div>
        );

      case 'code':
        return (
          <div className="relative">
            {section.title && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between mb-2"
              >
                <span className="text-sm text-text-muted">{section.title}</span>
                <span className="text-xs text-text-soft uppercase">{section.language}</span>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative group origin-top"
            >
              <pre className="bg-bg p-4 rounded-xl overflow-x-auto border border-border">
                <code className={`language-${section.language || 'text'} text-sm font-mono text-text`}>
                  {isAlreadyTyped ? (
                    section.content
                  ) : (
                    <TypewriterText
                      text={section.content}
                      speed={80}
                      delay={400}
                      cursor
                      onComplete={handleSectionTyped}
                    />
                  )}
                </code>
              </pre>
              <button
                onClick={() => handleCopyCode(section.content)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-bg-card/80
                         text-text-muted hover:text-text
                         opacity-0 group-hover:opacity-100 transition-all"
              >
                {copiedCode === section.content ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </motion.div>
          </div>
        );

      case 'tip':
        return (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            </motion.div>
            <div>
              {section.title && (
                <h4 className="font-medium text-primary mb-1">{section.title}</h4>
              )}
              {isAlreadyTyped ? (
                <p className="text-text-soft text-sm">{section.content}</p>
              ) : (
                <p className="text-text-soft text-sm">
                  <TypewriterText
                    text={section.content}
                    speed={50}
                    delay={500}
                    onComplete={handleSectionTyped}
                  />
                </p>
              )}
            </div>
          </motion.div>
        );

      case 'warning':
        return (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex gap-4 p-4 rounded-xl bg-error/10 border border-error/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            </motion.div>
            <div>
              {section.title && (
                <h4 className="font-medium text-error mb-1">{section.title}</h4>
              )}
              {isAlreadyTyped ? (
                <p className="text-text-soft text-sm">{section.content}</p>
              ) : (
                <p className="text-text-soft text-sm">
                  <TypewriterText
                    text={section.content}
                    speed={50}
                    delay={500}
                    onComplete={handleSectionTyped}
                  />
                </p>
              )}
            </div>
          </motion.div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            {section.title && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold text-text"
              >
                {section.title}
              </motion.h3>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden border border-border bg-bg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.imageSrc || ''}
                alt={section.imageAlt || section.title || 'Screenshot'}
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
            {section.content && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-text-muted italic"
              >
                {section.content}
              </motion.p>
            )}
          </div>
        );

      case 'interactive':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-xl border border-claude/30 bg-claude/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <Play className="w-5 h-5 text-claude" />
              </motion.div>
              <span className="font-medium text-text">Interactive Example</span>
            </div>
            <div
              className="text-text-soft"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </motion.div>
        );

      default:
        return <p className="text-text-soft">{section.content}</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-text transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Track</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-muted">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{level.estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-2 text-claude">
            <Star className="w-4 h-4" />
            <span className="text-sm">+{level.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Level title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: trackColor }}
          >
            {level.levelNumber}
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-text">{level.title}</h1>
            <TypewriterText
              text={level.description}
              speed={50}
              delay={400}
              cursor={false}
              className="text-text-soft"
            />
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <CheckCircle className="w-6 h-6 text-success ml-auto" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-muted">
            Section {currentSectionIndex + 1} of {sections.length}
          </span>
          <span className="text-sm text-text-muted">{readProgress}% read</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${readProgress}%` }}
            className="h-full rounded-full"
            style={{ backgroundColor: trackColor }}
          />
        </div>
      </div>

      {/* Section navigation dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {sections.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSectionIndex(index)}
            initial={{ scale: 0 }}
            animate={{
              scale: index === currentSectionIndex ? 1.4 : 1,
              backgroundColor: index === currentSectionIndex
                ? trackColor
                : completedSections.has(index)
                  ? '#10B981'
                  : undefined,
            }}
            transition={{
              scale: { type: 'spring', stiffness: 500, damping: 25 },
              delay: index * 0.05,
            }}
            className={`
              w-3 h-3 rounded-full transition-colors
              ${index !== currentSectionIndex && !completedSections.has(index)
                ? 'bg-border hover:bg-border-hover'
                : ''
              }
            `}
          />
        ))}
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSectionIndex}
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="bg-bg-card rounded-2xl border border-border p-8 mb-8"
        >
          {currentSection && renderSection(currentSection)}
        </motion.div>
      </AnimatePresence>

      {/* Section navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handlePrevSection}
          disabled={currentSectionIndex === 0}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            transition-colors
            ${currentSectionIndex === 0
              ? 'text-text-muted/50 cursor-not-allowed'
              : 'text-text-muted hover:text-text hover:bg-bg-card'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNextSection}
          disabled={isLastSection}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            transition-colors
            ${isLastSection
              ? 'text-text-muted/50 cursor-not-allowed'
              : 'text-text-muted hover:text-text hover:bg-bg-card'
            }
          `}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Exercise section (if any) */}
      {hasExercise && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5" style={{ color: trackColor }} />
            <h2 className="text-xl font-semibold text-text">Practice Exercise</h2>
          </div>

          {content.exercise && (
            <InteractiveExercise
              type={content.exercise.type}
              title="Complete the exercise"
              instructions={content.exercise.instructions}
              starterCode={content.exercise.starterCode}
              hints={content.exercise.hints}
              validationCriteria={content.exercise.validationCriteria}
              onComplete={handleExerciseComplete}
            />
          )}
        </div>
      )}

      {/* Complete lesson button */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          {canComplete ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <BookOpen className="w-5 h-5 text-text-muted" />
          )}
          <span className="text-text-muted text-sm">
            {hasExercise
              ? exerciseCompleted
                ? 'Exercise completed!'
                : 'Complete the exercise to finish'
              : canComplete
                ? 'All sections read'
                : `Read all sections to complete`
            }
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasNext && canComplete && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-bg-card border border-border
                       text-text hover:bg-bg-lighter transition-colors"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {!isCompleted && (
            <button
              onClick={handleLevelComplete}
              disabled={!canComplete}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                transition-all duration-200
                ${canComplete
                  ? 'text-white shadow-lg hover:opacity-90'
                  : 'bg-bg-card text-text-muted cursor-not-allowed'
                }
              `}
              style={{
                backgroundColor: canComplete ? trackColor : undefined
              }}
            >
              <Star className="w-5 h-5" />
              <span>Complete & Earn {level.xpReward} XP</span>
            </button>
          )}

          {(isCompleted || justCompleted) && (
            <motion.div
              initial={justCompleted ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-success/20 text-success"
            >
              <motion.div
                initial={justCompleted ? { rotate: -180, scale: 0 } : false}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
              <span>Completed</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Post-completion next step overlay */}
      {showNextStepOverlay && (
        <NextStepCard
          overlay
          onDismiss={() => setShowNextStepOverlay(false)}
        />
      )}
    </div>
  );
}
