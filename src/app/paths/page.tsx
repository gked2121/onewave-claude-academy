'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Layers,
  Terminal,
  ArrowRight,
  Clock,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { getAllPaths } from '@/lib/paths';

const PATH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  layers: Layers,
  terminal: Terminal,
};

export default function PathsPage() {
  const paths = getAllPaths();

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-claude mb-4">
            Role-based curriculum
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl mb-5">
            Learning Paths
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-soft">
            Choose the path designed for your role. Each one curates the right
            tracks and levels so you learn exactly what matters to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {paths.map((path, index) => {
            const IconComponent = PATH_ICONS[path.icon] || Briefcase;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/paths/${path.slug}`}
                  className="group relative block rounded-2xl bg-bg-light/60 border border-border hover:border-border-hover p-8 transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    // @ts-expect-error CSS custom prop
                    '--hover-border': `${path.color}50`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${path.color}40, 0 0 30px ${path.color}10`,
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${path.color}25, ${path.color}08)`,
                        boxShadow: `0 0 0 1px ${path.color}20`,
                      }}
                    >
                      <span style={{ color: path.color }}>
                        <IconComponent className="w-7 h-7" />
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-text mb-2">{path.name}</h2>
                    <p className="text-sm font-medium mb-4" style={{ color: path.accentColor }}>
                      {path.tagline}
                    </p>
                    <p className="text-text-soft text-sm leading-relaxed mb-6">
                      {path.description}
                    </p>

                    {/* Role badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {path.exampleRoles.slice(0, 4).map((role) => (
                        <span
                          key={role}
                          className="px-2.5 py-1 text-xs rounded-full border"
                          style={{
                            borderColor: `${path.color}25`,
                            color: `${path.accentColor}`,
                            backgroundColor: `${path.color}08`,
                          }}
                        >
                          {role}
                        </span>
                      ))}
                      {path.exampleRoles.length > 4 && (
                        <span className="px-2.5 py-1 text-xs text-text-muted">
                          +{path.exampleRoles.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-5 mb-5 text-sm text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        {path.trackSequence.length} tracks
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        {path.totalLevels} levels
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {path.estimatedHours}h
                      </span>
                    </div>

                    <div
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: path.accentColor }}
                    >
                      <span>View Curriculum</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
