"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Trophy,
  Zap,
  BookOpen,
  Target,
  MessageSquare,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import ClaudeSimulator from "@/components/ClaudeSimulator";
import TaskValidator from "@/components/TaskValidator";
import { useProgress } from "@/context/ProgressContext";
import { levels, resolveValidationRule } from "@/lib/levels";

// ---------------------------------------------------------------------------
// Helper: pick the right icon for a task type
// ---------------------------------------------------------------------------
function taskIcon(type: string) {
  switch (type) {
    case "learn":
      return <BookOpen className="w-4 h-4" />;
    case "task":
      return <Target className="w-4 h-4" />;
    case "simulator":
      return <MessageSquare className="w-4 h-4" />;
    default:
      return <Circle className="w-4 h-4" />;
  }
}

function taskLabel(type: string, index: number) {
  switch (type) {
    case "learn":
      return `Learn ${index}`;
    case "task":
      return `Task ${index}`;
    case "simulator":
      return `Practice ${index}`;
    default:
      return `Step ${index}`;
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const {
    completeLevel,
    isLevelUnlocked,
    isLevelCompleted,
  } = useProgress();

  // ---- Parse level id from URL ------------------------------------------
  const levelId = parseInt(params.id as string, 10);
  const level = levels.find((l) => l.id === levelId);

  // ---- Local state -------------------------------------------------------
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [startTime] = useState(() => Date.now());

  // ---- Level not found ----------------------------------------------------
  if (!level) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-12 border-2 border-orange-500/30"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-orange-200 mb-4">
            Level not found
          </h1>
          <p className="text-orange-300 mb-8">
            We could not find a level with that id. Head back to the journey map
            to pick a level.
          </p>
          <button
            onClick={() => router.push("/journey")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Back to Journey Map
          </button>
        </motion.div>
      </div>
    );
  }

  // ---- Level locked -------------------------------------------------------
  if (!isLevelUnlocked(level.id)) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-12 border-2 border-orange-500/30"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >
            <Lock className="w-16 h-16 mx-auto text-orange-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-orange-200 mb-4">
            Level {level.id} is Locked
          </h1>
          <p className="text-orange-300 mb-8">
            Upgrade to <span className="text-orange-400 font-semibold">Pro</span>{" "}
            to unlock all 10 levels and master Claude AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/journey")}
              className="px-8 py-4 rounded-xl bg-orange-500/20 border-2 border-orange-500/40 text-orange-200 font-bold text-lg hover:bg-orange-500/30 transition-all"
            >
              Back to Journey Map
            </button>
            <button
              onClick={() => router.push("/pricing")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Upgrade to Pro
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Derived data -------------------------------------------------------
  const tasks = level.tasks;
  const currentTaskData = tasks[currentTask - 1];
  const isLastTask = currentTask === tasks.length;
  const isTaskCompleted = completedTasks.includes(currentTask);
  const canProceed = isTaskCompleted || currentTaskData.type === "learn";
  const progress = tasks.length > 0 ? completedTasks.length / tasks.length : 0;

  // ---- Handlers -----------------------------------------------------------
  const handleCompleteTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) return;
    const next = [...completedTasks, taskId];
    setCompletedTasks(next);

    // If last task, mark level complete and celebrate
    if (next.length === tasks.length && !isLevelCompleted(level.id)) {
      const timeSpent = Math.round((Date.now() - startTime) / 60000); // minutes
      setTimeout(() => {
        completeLevel(level.id, timeSpent);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      }, 500);
    }
  };

  const handleNextTask = () => {
    if (currentTask < tasks.length) {
      setCurrentTask(currentTask + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevTask = () => {
    if (currentTask > 1) {
      setCurrentTask(currentTask - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ---- Render -------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          {/* Animated emoji */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-5xl"
          >
            {level.emoji}
          </motion.div>

          <div>
            <h1
              className={`text-4xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}
            >
              Level {level.id}: {level.title}
            </h1>
            <p className="text-orange-300 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" />
                {level.xp} XP
              </span>
              <span className="text-orange-500">|</span>
              <span>~{level.estimatedTime}</span>
            </p>
          </div>
        </div>

        {/* ------ Progress bar ---------------------------------------------- */}
        <div className="bg-black/40 rounded-full h-3 overflow-hidden border-2 border-orange-500/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-orange-300">
            {completedTasks.length} of {tasks.length} tasks completed
          </span>
          <span className="text-orange-400 font-semibold">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* ------ Task navigation pills ------------------------------------- */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          {tasks.map((task, idx) => {
            const taskNum = idx + 1;
            const isActive = currentTask === taskNum;
            const isDone = completedTasks.includes(taskNum);

            return (
              <button
                key={task.id}
                onClick={() => setCurrentTask(taskNum)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-orange-500/30 border-2 border-orange-400"
                    : isDone
                    ? "bg-green-500/20 border-2 border-green-400/50"
                    : "bg-black/40 border-2 border-orange-500/20 hover:border-orange-400/40"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <span
                    className={
                      isActive ? "text-orange-300" : "text-orange-400"
                    }
                  >
                    {taskIcon(task.type)}
                  </span>
                )}
                <span className="text-sm font-medium">
                  {taskLabel(task.type, taskNum)}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Task content area                                                    */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        key={currentTask}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {/* ---------- Learn ----------------------------------------------- */}
        {currentTaskData.type === "learn" && (
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-orange-500/30 mb-6">
            <h2 className="text-3xl font-bold text-orange-200 mb-6">
              {currentTaskData.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <div className="text-orange-100 whitespace-pre-line leading-relaxed text-lg">
                {currentTaskData.content}
              </div>
            </div>
          </div>
        )}

        {/* ---------- Task (TaskValidator) -------------------------------- */}
        {currentTaskData.type === "task" && currentTaskData.taskConfig && (
          <TaskValidator
            title={currentTaskData.title}
            description={currentTaskData.description ?? ""}
            placeholder={currentTaskData.taskConfig.placeholder}
            validationRules={
              currentTaskData.taskConfig.validationRules.map(resolveValidationRule)
            }
            successMessage={currentTaskData.taskConfig.successMessage}
            exampleOutput={currentTaskData.taskConfig.exampleOutput}
            onSuccess={() => handleCompleteTask(currentTask)}
          />
        )}

        {/* ---------- Simulator ------------------------------------------ */}
        {currentTaskData.type === "simulator" &&
          currentTaskData.simulatorConfig && (
            <div className="space-y-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-500/30">
                <h2 className="text-2xl font-bold text-orange-200 mb-2">
                  {currentTaskData.title}
                </h2>
                {currentTaskData.description && (
                  <p className="text-orange-300">
                    {currentTaskData.description}
                  </p>
                )}
              </div>
              <ClaudeSimulator
                title={currentTaskData.title}
                suggestedPrompts={
                  currentTaskData.simulatorConfig.suggestedPrompts
                }
                onComplete={() => handleCompleteTask(currentTask)}
                {...(currentTaskData.simulatorConfig.responses
                  ? { responses: currentTaskData.simulatorConfig.responses }
                  : {})}
              />
            </div>
          )}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation buttons                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-orange-500/30">
        {/* Previous */}
        <button
          onClick={handlePrevTask}
          disabled={currentTask === 1}
          className="px-6 py-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-orange-200 font-semibold"
        >
          Previous
        </button>

        <div className="flex items-center gap-4">
          {/* Mark as Read (learn tasks only) */}
          {currentTaskData.type === "learn" &&
            !completedTasks.includes(currentTask) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCompleteTask(currentTask)}
                className="px-6 py-3 rounded-xl bg-green-500/20 border-2 border-green-400/50 hover:bg-green-500/30 transition-all flex items-center gap-2 text-green-300 font-semibold"
              >
                <CheckCircle2 className="w-5 h-5" />
                Mark as Read
              </motion.button>
            )}

          {/* Next / View Journey Map */}
          {!isLastTask ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextTask}
              disabled={!canProceed}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-lg transition-all flex items-center gap-2 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Task
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/journey")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-lg transition-all flex items-center gap-2 text-white font-bold"
            >
              <Zap className="w-5 h-5" />
              View Journey Map
            </motion.button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Level Complete Card                                                  */}
      {/* ------------------------------------------------------------------ */}
      {isLevelCompleted(level.id) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/50 text-center"
        >
          <div className="text-6xl mb-4">{level.emoji}</div>
          <h3 className="text-3xl font-bold text-green-300 mb-3">
            Level {level.id} Complete!
          </h3>
          <p className="text-green-200 mb-2">
            Congratulations! You&apos;ve mastered{" "}
            <span className="font-semibold">{level.title}</span>.
          </p>
          <p className="text-green-300 mb-6 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-300">
              +{level.xp} XP earned
            </span>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/journey")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Back to Journey Map
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
