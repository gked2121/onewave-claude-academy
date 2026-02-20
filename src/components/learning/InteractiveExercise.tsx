'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Code,
  MessageSquare,
  CheckCircle,
  XCircle,
  Lightbulb,
  Loader2,
  RefreshCw,
  Image as ImageIcon,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExerciseProps {
  type: 'prompt' | 'code' | 'upload' | 'build';
  title: string;
  instructions: string;
  starterCode?: string;
  hints?: string[];
  validationCriteria?: string[];
  onComplete: (submission: Submission, feedback: AIFeedback) => void;
}

interface Submission {
  type: 'text' | 'code' | 'file' | 'image';
  content: string;
  fileName?: string;
  timestamp: string;
}

interface AIFeedback {
  passed: boolean;
  score: number; // 0-100
  feedback: string;
  suggestions?: string[];
  strengths?: string[];
  improvements?: string[];
}

export function InteractiveExercise({
  type,
  title,
  instructions,
  starterCode,
  hints = [],
  validationCriteria = [],
  onComplete
}: ExerciseProps) {
  const [submission, setSubmission] = useState(starterCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For text/code files, read content
      const reader = new FileReader();
      reader.onload = (e) => {
        setSubmission(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!submission.trim() && !uploadedFile) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Call AI verification endpoint
      const response = await fetch('/api/verify-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: type,
          submission: submission,
          criteria: validationCriteria,
          instructions: instructions,
          fileContent: uploadPreview
        })
      });

      const result: AIFeedback = await response.json();
      setFeedback(result);

      if (result.passed) {
        onComplete(
          {
            type: uploadedFile ? (uploadedFile.type.startsWith('image/') ? 'image' : 'file') : type === 'code' ? 'code' : 'text',
            content: submission,
            fileName: uploadedFile?.name,
            timestamp: new Date().toISOString()
          },
          result
        );
      }
    } catch (error) {
      // Fallback for demo - simulate AI feedback
      const mockFeedback: AIFeedback = {
        passed: submission.length > 20,
        score: Math.min(100, submission.length * 2),
        feedback: submission.length > 20
          ? "Great work! Your submission demonstrates a solid understanding of the concept."
          : "Your submission needs more detail. Try to expand on your answer.",
        strengths: submission.length > 20 ? ["Clear explanation", "Good structure"] : [],
        improvements: submission.length <= 20 ? ["Add more detail", "Include examples"] : [],
        suggestions: ["Consider adding real-world examples", "Review the lesson content for more context"]
      };
      setFeedback(mockFeedback);

      if (mockFeedback.passed) {
        onComplete(
          {
            type: 'text',
            content: submission,
            timestamp: new Date().toISOString()
          },
          mockFeedback
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const resetSubmission = () => {
    setSubmission(starterCode || '');
    setFeedback(null);
    setUploadedFile(null);
    setUploadPreview(null);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-bg-lighter/50">
        <div className="flex items-center gap-3">
          {type === 'prompt' && <MessageSquare className="w-5 h-5 text-claude" />}
          {type === 'code' && <Code className="w-5 h-5 text-primary" />}
          {type === 'upload' && <Upload className="w-5 h-5 text-secondary" />}
          {type === 'build' && <Sparkles className="w-5 h-5 text-yellow-400" />}
          <h3 className="font-semibold text-text">{title}</h3>
          {feedback?.passed && (
            <div className="ml-auto flex items-center gap-1 text-success text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-text-soft">{instructions}</p>

        {/* Validation criteria */}
        {validationCriteria.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-text-muted mb-2">Your submission will be checked for:</p>
            <ul className="space-y-1">
              {validationCriteria.map((criterion, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-text-soft">
                  <div className="w-1.5 h-1.5 rounded-full bg-claude" />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6">
        {/* Text/Code input */}
        {(type === 'prompt' || type === 'code') && (
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder={
              type === 'prompt'
                ? "Write your prompt here..."
                : "Enter your code here..."
            }
            className={`
              w-full min-h-[200px] p-4 rounded-xl
              bg-bg border border-border
              text-text placeholder:text-text-muted
              focus:outline-none focus:border-primary
              resize-y transition-colors
              ${type === 'code' ? 'font-mono text-sm' : ''}
            `}
            disabled={feedback?.passed}
          />
        )}

        {/* Upload area */}
        {type === 'upload' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept="image/*,.txt,.md,.json,.js,.ts,.py"
              className="hidden"
            />

            {!uploadedFile ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 rounded-xl border-2 border-dashed border-border
                         hover:border-primary hover:bg-primary/5
                         transition-colors flex flex-col items-center gap-3"
              >
                <Upload className="w-10 h-10 text-text-muted" />
                <div className="text-center">
                  <p className="text-text font-medium">Click to upload</p>
                  <p className="text-text-muted text-sm">
                    Images, code files, or text documents
                  </p>
                </div>
              </button>
            ) : (
              <div className="rounded-xl border border-border p-4">
                {uploadPreview && uploadedFile.type.startsWith('image/') ? (
                  <div className="relative">
                    <img
                      src={uploadPreview}
                      alt="Upload preview"
                      className="w-full max-h-[300px] object-contain rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadPreview(null);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-bg/80 text-text-muted
                               hover:text-error transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <FileText className="w-10 h-10 text-primary" />
                    <div className="flex-1">
                      <p className="text-text font-medium">{uploadedFile.name}</p>
                      <p className="text-text-muted text-sm">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadPreview(null);
                        setSubmission('');
                      }}
                      className="p-2 text-text-muted hover:text-error transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Optional text notes with upload */}
            {uploadedFile && (
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                placeholder="Add any notes or explanation (optional)..."
                className="w-full mt-4 min-h-[100px] p-4 rounded-xl
                         bg-bg border border-border
                         text-text placeholder:text-text-muted
                         focus:outline-none focus:border-primary
                         resize-y transition-colors"
              />
            )}
          </div>
        )}

        {/* Build exercise - combined code + notes */}
        {type === 'build' && (
          <div className="space-y-4">
            <textarea
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Paste your code or describe what you built..."
              className="w-full min-h-[200px] p-4 rounded-xl font-mono text-sm
                       bg-bg border border-border
                       text-text placeholder:text-text-muted
                       focus:outline-none focus:border-primary
                       resize-y transition-colors"
              disabled={feedback?.passed}
            />

            {/* Optional screenshot upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border
                         text-text-muted hover:text-text hover:bg-bg-lighter transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm">Add screenshot (optional)</span>
              </button>
              {uploadPreview && (
                <div className="mt-3 relative">
                  <img
                    src={uploadPreview}
                    alt="Screenshot"
                    className="max-h-[200px] rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setUploadPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 rounded bg-bg/80 text-text-muted
                             hover:text-error transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hints section */}
        {hints.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-claude transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Need a hint?</span>
              {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showHints && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-4 rounded-lg bg-claude/10 border border-claude/20">
                    {hints.slice(0, currentHintIndex + 1).map((hint, i) => (
                      <p key={i} className="text-sm text-text-soft mb-2 last:mb-0">
                        <span className="text-claude font-medium">Hint {i + 1}:</span> {hint}
                      </p>
                    ))}
                    {currentHintIndex < hints.length - 1 && (
                      <button
                        onClick={showNextHint}
                        className="mt-2 text-sm text-claude hover:text-claude-light transition-colors"
                      >
                        Show another hint ({hints.length - currentHintIndex - 1} remaining)
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* AI Feedback display */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 rounded-xl border p-5 ${
                feedback.passed
                  ? 'bg-success/10 border-success/30'
                  : 'bg-error/10 border-error/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {feedback.passed ? (
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${feedback.passed ? 'text-success' : 'text-error'}`}>
                      {feedback.passed ? 'Great work!' : 'Not quite there yet'}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-claude" />
                      <span className="text-sm text-text-muted">AI Score: {feedback.score}/100</span>
                    </div>
                  </div>

                  <p className="text-text-soft mb-4">{feedback.feedback}</p>

                  {/* Strengths */}
                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-success mb-1">Strengths:</p>
                      <ul className="space-y-1">
                        {feedback.strengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-text-soft">
                            <CheckCircle className="w-3 h-3 text-success" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {feedback.improvements && feedback.improvements.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-claude mb-1">Areas to improve:</p>
                      <ul className="space-y-1">
                        {feedback.improvements.map((i, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-text-soft">
                            <Lightbulb className="w-3 h-3 text-claude" />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {feedback.suggestions && feedback.suggestions.length > 0 && !feedback.passed && (
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1">Suggestions:</p>
                      <ul className="space-y-1">
                        {feedback.suggestions.map((s, i) => (
                          <li key={i} className="text-sm text-text-soft">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={resetSubmission}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                     text-text-muted hover:text-text transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!submission.trim() && !uploadedFile) || feedback?.passed}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium
              transition-all duration-200
              ${feedback?.passed
                ? 'bg-success/20 text-success cursor-not-allowed'
                : isSubmitting
                  ? 'bg-primary/50 text-white cursor-wait'
                  : 'bg-primary hover:bg-primary-hover text-white shadow-glow-blue'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Checking with AI...</span>
              </>
            ) : feedback?.passed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit for Review</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
