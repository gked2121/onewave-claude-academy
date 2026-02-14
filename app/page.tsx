"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Zap, Target, Rocket } from "lucide-react";
import Logo from "@/components/Logo";
import WelcomeModal from "@/components/WelcomeModal";

const characters = [
  {
    id: 1,
    name: "Prompt Master",
    emoji: "🎯",
    description: "Master effective prompting to unlock Claude's full potential",
    traits: ["Perfect for beginners", "Learn prompt engineering", "Get better responses"],
    color: "from-orange-500 to-amber-500",
    path: "prompt-master"
  },
  {
    id: 2,
    name: "AI Productivity Pro",
    emoji: "💼",
    description: "Use Claude to supercharge your productivity and workflows",
    traits: ["Master Claude Artifacts", "Automate daily tasks", "Claude Projects for work"],
    color: "from-orange-400 to-amber-400",
    path: "productivity-pro"
  },
  {
    id: 3,
    name: "AI Developer",
    emoji: "⚡",
    description: "Leverage Claude for coding, debugging, and development",
    traits: ["Code with Artifacts", "MCP integrations", "API & automation mastery"],
    color: "from-amber-500 to-yellow-500",
    path: "ai-developer"
  }
];

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
        {/* Floating Emoji */}
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
          className="text-7xl mb-6 text-center filter drop-shadow-2xl"
        >
          {char.emoji}
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
          Master Claude AI in 10 Fun Levels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-orange-200 mb-4 font-light"
        >
          Transform from beginner to Claude expert through gamified learning
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-orange-300"
        >
          Unlock skills, earn achievements, and get real results — one level at a time
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
            <div className="text-5xl mb-4">1️⃣</div>
            <h3 className="text-xl font-bold mb-2 text-orange-200">Choose Your Path</h3>
            <p className="text-orange-300 text-sm">
              Select a learning path that matches your goals: Master prompts, boost productivity, or become an AI developer.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-amber-500/30 text-center"
          >
            <div className="text-5xl mb-4">2️⃣</div>
            <h3 className="text-xl font-bold mb-2 text-amber-200">Learn & Practice</h3>
            <p className="text-amber-300 text-sm">
              Complete interactive levels with hands-on challenges. Start with free Level 0, then unlock all 10 levels with Pro.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-orange-400/10 to-amber-400/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400/30 text-center"
          >
            <div className="text-5xl mb-4">3️⃣</div>
            <h3 className="text-xl font-bold mb-2 text-orange-200">Earn & Achieve</h3>
            <p className="text-orange-300 text-sm">
              Gain XP, unlock achievements, and track your progress. Become a Claude master!
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
          className="text-4xl mb-3"
        >
          ✨
        </motion.div>
        <p className="text-xl text-orange-200 mb-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Start FREE</span> — Level 0 unlocked for all paths
        </p>
        <p className="text-orange-300 text-sm">
          Unlock the full journey for just <span className="text-orange-400 font-semibold">$9.99/month</span> and master all 10 levels with exclusive achievements
        </p>
      </motion.div>

      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
    </div>
  );
}
