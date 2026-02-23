"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { Briefcase, Zap, Rocket, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

const characters = [
  {
    id: 1,
    name: 'Business Builder',
    icon: Briefcase,
    description: 'Master AI tools to build and validate business ideas fast',
    traits: ['MVP Development', 'User Analytics', 'Growth Hacking'],
    stats: { levels: 8, projects: 12, difficulty: 'Beginner-Friendly' },
    bonus: '+25% XP for business challenges',
    outcome: 'Build and deploy 3 business MVPs using AI, validate ideas with real users, and learn growth strategies',
    recommendedCli: 'claude',
    cliReason: 'Professional quality code perfect for building reliable business tools'
  },
  {
    id: 2,
    name: 'Tech Engineer',
    icon: Zap,
    description: 'Become an AI-enhanced senior developer and system architect',
    traits: ['System Design', 'Performance Optimization', 'DevOps'],
    stats: { levels: 12, projects: 15, difficulty: 'Advanced' },
    bonus: '+25% XP for technical challenges',
    outcome: 'Master professional AI development workflows, deploy production systems, and lead technical teams',
    recommendedCli: 'claude',
    cliReason: 'Premium code quality and advanced reasoning for complex technical challenges'
  },
  {
    id: 3,
    name: 'Full-Stack Hybrid',
    icon: Rocket,
    description: 'Bridge business and tech to become a complete product leader',
    traits: ['End-to-End Development', 'Product Management', 'Tech Leadership'],
    stats: { levels: 10, projects: 18, difficulty: 'Balanced' },
    bonus: '+15% XP for all challenges',
    outcome: 'Launch complete products from idea to deployment, manage technical teams, and drive business growth',
    recommendedCli: 'codex',
    cliReason: 'Flexible AI models perfect for adapting to both business and technical needs'
  },
];

export default function CharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const { setCharacter, setSelectedAiCli } = useProgress();

  const handleCharacterSelect = (character: typeof characters[0]) => {
    setSelectedCharacter(character.id);
    setCharacter(character.id);
    // Automatically pre-select the recommended CLI for this character
    setSelectedAiCli(character.recommendedCli as any);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-32 py-8">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.1),transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header */}
        <motion.div
          key="character-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur mb-4"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-white font-semibold">Choose Your AI Development Path</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-white sm:text-4xl mb-3"
          >
            Choose Your <span className="text-gradient-primary">AI Development</span> Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto text-base text-white/70 mb-6"
          >
            Master professional AI coding tools and build real projects that advance your career
          </motion.p>

          {/* Compact Benefits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-3xl mx-auto bg-primary/5 rounded-xl p-4 border border-primary/20 mb-6"
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="text-emerald-400">Master AI CLI Tools</span>
              <span className="text-blue-400">Build 5+ Real Projects</span>
              <span className="text-primary">Advance Your Career</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          {characters.map((character) => {
            const Icon = character.icon;
            return (
              <motion.div
                key={`character-${character.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: character.id * 0.1, duration: 0.5 }}
                className={`rounded-xl p-6 ring-1 backdrop-blur cursor-pointer transition-all duration-300 ${
                  selectedCharacter === character.id
                    ? 'bg-primary/10 ring-primary/50'
                    : 'bg-zinc-900/70 ring-white/10 hover:bg-zinc-900/90'
                }`}
                onClick={() => handleCharacterSelect(character)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-xl font-semibold text-white mb-2">{character.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{character.description}</p>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {character.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-zinc-800/50 border border-zinc-700 rounded-md text-xs text-white/80"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 mb-4 border border-primary/20 text-left">
                    <h4 className="text-xs font-semibold text-primary mb-1">What You'll Build:</h4>
                    <p className="text-xs text-white/80 leading-relaxed">{character.outcome}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="bg-zinc-800/30 rounded-lg p-2 text-center">
                      <div className="font-bold text-primary">{character.stats.levels}</div>
                      <div className="text-white/60">Levels</div>
                    </div>
                    <div className="bg-zinc-800/30 rounded-lg p-2 text-center">
                      <div className="font-bold text-secondary">{character.stats.projects}</div>
                      <div className="text-white/60">Projects</div>
                    </div>
                    <div className="bg-zinc-800/30 rounded-lg p-2 text-center">
                      <div className="font-bold text-white text-xs">{character.stats.difficulty}</div>
                      <div className="text-white/60">Level</div>
                    </div>
                  </div>

                  {/* Recommended CLI */}
                  <div className="bg-zinc-800/50 rounded-lg p-3 mb-4 text-left">
                    <div className="text-xs text-white/70 mb-1">Recommended AI CLI:</div>
                    <div className="text-primary font-semibold text-sm capitalize mb-1">{character.recommendedCli} CLI</div>
                    <div className="text-xs text-white/70">{character.cliReason}</div>
                  </div>

                  {/* Bonus */}
                  <div className="text-center mb-4">
                    <div className="text-xs text-secondary font-medium">{character.bonus}</div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedCharacter === character.id ? (
                    <motion.div
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-primary/20 rounded-lg border border-primary/30"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Selected</span>
                    </motion.div>
                  ) : (
                    <div className="text-xs text-white/50 py-2">Click to select your path</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <Link
            href={selectedCharacter ? `/agent-introduction/${selectedCharacter}` : "#"}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
              selectedCharacter
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
            style={{ pointerEvents: selectedCharacter ? 'auto' : 'none' }}
          >
            <span>Meet Your AI Agent</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}