"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Rocket,
  Briefcase,
  Crosshair,
  Layers,
  MousePointerClick,
} from "lucide-react";
import Logo from "@/components/Logo";
import WelcomeModal from "@/components/WelcomeModal";

const characters = [
  {
    id: 1,
    name: "Write Prompts That Actually Work",
    icon: "crosshair",
    description: "Stop getting generic answers. Learn the techniques that make Claude feel like it read your mind.",
    traits: ["Get 10x better responses", "Never write a vague prompt again", "Unlock Claude\u2019s hidden depth"],
    color: "from-orange-500 to-amber-500",
    path: "prompt-master"
  },
  {
    id: 2,
    name: "Automate the Work You Hate",
    icon: "briefcase",
    description: "Turn Claude into your personal ops team \u2014 from drafting emails to building entire workflows.",
    traits: ["Save 5+ hours per week", "Master Artifacts & Projects", "Build real tools, not toy demos"],
    color: "from-orange-400 to-amber-400",
    path: "productivity-pro"
  },
  {
    id: 3,
    name: "Ship Faster with Claude",
    icon: "zap",
    description: "Code generation, debugging, API integration \u2014 use Claude the way senior engineers actually use it.",
    traits: ["From prototype to production", "MCP & API mastery", "Build apps that use Claude"],
    color: "from-amber-500 to-yellow-500",
    path: "ai-developer"
  }
];

function CharIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "crosshair":
      return <Crosshair className={className} />;
    case "briefcase":
      return <Briefcase className={className} />;
    case "zap":
      return <Zap className={className} />;
    default:
      return <Target className={className} />;
  }
}

// 3D Card Component with Mouse Tracking
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CharacterCard({ char, index, isSelected, onSelect }: { char: any; index: number; isSelected: boolean; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-3xl p-8 border-2 transition-all duration-300 ${
        isSelected
          ? `border-orange-400 shadow-2xl shadow-orange-500/50 bg-gradient-to-br from-orange-900/50 to-amber-900/50`
          : `border-orange-500/30 hover:border-orange-400/80 bg-black/40 hover:shadow-xl hover:shadow-orange-500/30`
      } backdrop-blur-xl`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1), transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        {/* Floating Icon */}
        <motion.div
          animate={{
            y: isHovered ? [-5, 5, -5] : 0,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6 flex justify-center"
        >
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${char.color} flex items-center justify-center shadow-xl`}>
            <CharIcon name={char.icon} className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Title with gradient */}
        <h3 className={`text-2xl font-bold mb-3 text-center bg-gradient-to-r ${char.color} bg-clip-text text-transparent`}>
          {char.name}
        </h3>

        <p className="text-orange-100 text-center mb-6 leading-relaxed">
          {char.description}
        </p>

        {/* Traits with icons */}
        <div className="space-y-3 mb-6">
          {char.traits.map((trait: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + i * 0.1 }}
              className="flex items-center gap-3 text-sm text-orange-200 bg-orange-500/10 rounded-lg p-2"
            >
              {i === 0 && <Target className="w-4 h-4 text-orange-400 flex-shrink-0" />}
              {i === 1 && <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />}
              {i === 2 && <Rocket className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
              <span className="flex-1">{trait}</span>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${char.color} text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all`}
        >
          {isSelected ? (
            <>
              <Sparkles className="w-5 h-5" />
              Continue Your Quest
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Start Your Quest
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full p-3 shadow-xl"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const { character, setCharacter } = useProgress();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenWelcome = localStorage.getItem('claude-quest:welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem('claude-quest:welcome-seen', 'true');
    setShowWelcome(false);
  };

  const handleSelectCharacter = (id: number) => {
    setCharacter(id);
    setTimeout(() => {
      router.push("/level/0");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 max-w-4xl"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 flex justify-center"
        >
          <Logo size="lg" showAnimation={true} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent leading-tight"
        >
          You&apos;re Using 10% of Claude
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-orange-200 mb-4 font-light"
        >
          15 hands-on levels. Real skills. Go from &quot;I&apos;ve tried Claude&quot; to &quot;Claude is my unfair advantage.&quot;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-orange-300"
        >
          No fluff. No lectures. Just the skills that actually change how you work.
        </motion.p>
      </motion.div>

      {/* Character Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full mb-12">
        {characters.map((char, index) => (
          <CharacterCard
            key={char.id}
            char={char}
            index={index}
            isSelected={character === char.id}
            onSelect={() => handleSelectCharacter(char.id)}
          />
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-6xl mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-500/30 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MousePointerClick className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-orange-200">Pick Your Focus</h3>
            <p className="text-orange-300 text-sm">
              Choose what matters to you. Every path leads to real skills.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-amber-500/30 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-200">Learn by Doing</h3>
            <p className="text-amber-300 text-sm">
              No passive videos. You write prompts, build tools, and see results in real time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-orange-400/10 to-amber-400/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400/30 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-orange-200">Stack Your Skills</h3>
            <p className="text-orange-300 text-sm">
              Each level unlocks the next. By Level 14, you&apos;re building things most people don&apos;t know are possible.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Free Level Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400/30 max-w-2xl"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex justify-center mb-3"
        >
          <Sparkles className="w-10 h-10 text-amber-400" />
        </motion.div>
        <p className="text-xl text-orange-200 mb-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Level 0 is free.</span> No account needed.
        </p>
        <p className="text-orange-300 text-sm">
          Try it right now. You&apos;ll know if Claude Quest is for you before you spend a dime.
        </p>
      </motion.div>

      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
    </div>
  );
}
