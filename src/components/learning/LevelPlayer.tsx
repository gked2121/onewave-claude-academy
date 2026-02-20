'use client';

import { useState, useEffect } from 'react';
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
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    onComplete(100);
  };

  // Calculate progress
  const readProgress = Math.round((completedSections.size / sections.length) * 100);
  const canComplete = (hasExercise ? exerciseCompleted : readProgress === 100) || isCompleted;

  // Render content section
  const renderSection = (section: ContentSection) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            {section.title && (
              <h3 className="text-xl font-semibold text-text mb-4">{section.title}</h3>
            )}
            <div
              className="text-text-soft leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );

      case 'code':
        return (
          <div className="relative">
            {section.title && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">{section.title}</span>
                <span className="text-xs text-text-soft uppercase">{section.language}</span>
              </div>
            )}
            <div className="relative group">
              <pre className="bg-bg p-4 rounded-xl overflow-x-auto border border-border">
                <code className={`language-${section.language || 'text'} text-sm font-mono text-text`}>
                  {section.content}
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
            </div>
          </div>
        );

      case 'tip':
        return (
          <div className="flex gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              {section.title && (
                <h4 className="font-medium text-primary mb-1">{section.title}</h4>
              )}
              <p className="text-text-soft text-sm">{section.content}</p>
            </div>
          </div>
        );

      case 'warning':
        return (
          <div className="flex gap-4 p-4 rounded-xl bg-error/10 border border-error/20">
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <div>
              {section.title && (
                <h4 className="font-medium text-error mb-1">{section.title}</h4>
              )}
              <p className="text-text-soft text-sm">{section.content}</p>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            {section.title && (
              <h3 className="text-lg font-semibold text-text">{section.title}</h3>
            )}
            <div className="rounded-xl overflow-hidden border border-border bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.imageSrc || ''}
                alt={section.imageAlt || section.title || 'Screenshot'}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            {section.content && (
              <p className="text-sm text-text-muted italic">{section.content}</p>
            )}
          </div>
        );

      case 'interactive':
        return (
          <div className="p-4 rounded-xl border border-claude/30 bg-claude/5">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-5 h-5 text-claude" />
              <span className="font-medium text-text">Interactive Example</span>
            </div>
            <div
              className="text-text-soft"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: trackColor }}
          >
            {level.levelNumber}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">{level.title}</h1>
            <p className="text-text-soft">{level.description}</p>
          </div>
          {isCompleted && (
            <CheckCircle className="w-6 h-6 text-success ml-auto" />
          )}
        </div>
      </div>

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
          <button
            key={index}
            onClick={() => setCurrentSectionIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${index === currentSectionIndex
                ? 'scale-125'
                : completedSections.has(index)
                  ? 'bg-success'
                  : 'bg-border hover:bg-border-hover'
              }
            `}
            style={{
              backgroundColor: index === currentSectionIndex ? trackColor : undefined
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSectionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
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

          {isCompleted && (
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-success/20 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
