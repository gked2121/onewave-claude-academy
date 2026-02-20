"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, AlertTriangle, DollarSign, Lock, Zap, Shield, Target, Rocket, CheckCircle, Star, Quote } from 'lucide-react';

export default function WhyPage() {
  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Background mesh */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(255,59,48,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(47,201,244,0.1),transparent)]" />
          </div>

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm backdrop-blur mb-6">
              <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-white font-semibold">The Truth About AI IDE Platforms</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Why We're Building
              <br />
              <span className="text-gradient-primary">Claude Academy</span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-8 text-white/80 sm:text-2xl">
              Because <span className="text-red-400 font-bold">non-technical users</span> are getting frustrated by AI IDEs like Replit and Lovable with <span className="text-red-400 font-bold">unexpected costs</span> and apps that never actually finish.
            </p>
          </div>
        </div>
      </section>

      {/* The Real Problems - Horror Stories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Why <span className="text-red-400">Non-Technical Users</span> Are Getting Burned
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70">
              Real experiences from users who thought Replit and Lovable would help them build apps, but got frustrated and discouraged instead
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-16">
            {/* Cost Horror Stories */}
            <div className="rounded-2xl bg-red-500/5 p-8 ring-1 ring-red-500/20 backdrop-blur">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-red-300 mb-2">Massive Resource Drain</h3>
                  <p className="text-white/70 text-sm">Non-technical users burning through time and money before realizing it's not the solution...</p>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="border-l-4 border-red-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-red-300 text-sm">r/replit • u/Slow-Marionberry-842</div>
                      <a href="#" className="text-xs text-red-400 hover:text-red-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;I got charged <span className="text-red-400 font-bold">$400 in one day</span> on Replit trying to build a simple app — the AI agent kept failing and I kept paying for broken attempts.&rdquo;
                  </p>
                </blockquote>

                <blockquote className="border-l-4 border-red-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-red-300 text-sm">r/lovable • u/Lumpy-Flan9484</div>
                      <a href="#" className="text-xs text-red-400 hover:text-red-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Lovable promised I could build my app idea, but after <span className="text-red-400 font-bold">$200+ and weeks of frustration</span>, I realized their AI can't handle complex builds. It's just burning money on incomplete projects.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Reliability Issues */}
            <div className="rounded-2xl bg-orange-500/5 p-8 ring-1 ring-orange-500/20 backdrop-blur">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-orange-300 mb-2">Incomplete Projects & False Hope</h3>
                  <p className="text-white/70 text-sm">AI agents promising to build complex apps but delivering broken, unfinished projects...</p>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="border-l-4 border-orange-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-orange-300 text-sm">r/replit • u/Miserable_Service610</div>
                      <a href="#" className="text-xs text-orange-400 hover:text-orange-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Replit's AI agent is <span className="text-orange-400 font-bold">incapable of complex builds</span> — it starts strong but breaks down when you need real functionality. You're paying for demos, not actual apps.&rdquo;
                  </p>
                </blockquote>

                <blockquote className="border-l-4 border-orange-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-orange-300 text-sm">r/lovable • u/NonTechFounder</div>
                      <a href="#" className="text-xs text-orange-400 hover:text-orange-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Spent months on Lovable thinking I was building my startup MVP, but the AI <span className="text-orange-400 font-bold">can't finish anything complex</span>. I realized I was just paying for an expensive toy, not a real development solution.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Vendor Lock-in */}
            <div className="rounded-2xl bg-purple-500/5 p-8 ring-1 ring-purple-500/20 backdrop-blur">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Vendor Lock-in Trap</h3>
                  <p className="text-white/70 text-sm">Your skills become platform-dependent...</p>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="border-l-4 border-purple-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-purple-300 text-sm">r/webdev • u/EscapedFromV0</div>
                      <a href="#" className="text-xs text-purple-400 hover:text-purple-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Spent 6 months on V0. Now I can't code without it. <span className="text-purple-400 font-bold">I've forgotten how to actually program</span>.&rdquo;
                  </p>
                </blockquote>

                <blockquote className="border-l-4 border-purple-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-purple-300 text-sm">r/nocode • u/NonTechEntrepreneur</div>
                      <a href="#" className="text-xs text-purple-400 hover:text-purple-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Spent 6 months thinking I was learning to build apps with Replit, but I was just learning <span className="text-purple-400 font-bold">their platform, not real development skills</span>. Now I'm trapped and can't build anything outside their system.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Learning Issues */}
            <div className="rounded-2xl bg-yellow-500/5 p-8 ring-1 ring-yellow-500/20 backdrop-blur">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-2">Discouraging Non-Technical Users</h3>
                  <p className="text-white/70 text-sm">Promising anyone can build apps, but leaving users feeling more confused and discouraged...</p>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="border-l-4 border-yellow-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-yellow-300 text-sm">r/learnprogramming • u/TutorialHell</div>
                      <a href="#" className="text-xs text-yellow-400 hover:text-yellow-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;As a non-technical founder, I thought Replit would help me build my startup. After months and hundreds of dollars, <span className="text-yellow-400 font-bold">I realized I was just paying to watch demos, not learning to build real apps</span>.&rdquo;
                  </p>
                </blockquote>

                <blockquote className="border-l-4 border-yellow-500/50 pl-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-yellow-300 text-sm">r/entrepreneur • u/StartupStruggle</div>
                      <a href="#" className="text-xs text-yellow-400 hover:text-yellow-300">View on Reddit →</a>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    &ldquo;Lovable made me feel like I could finally build my app idea as a non-technical person. Months later, I'm <span className="text-yellow-400 font-bold">more discouraged than when I started</span> and still have no working app.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              The <span className="text-gradient-primary">OneWave</span> Difference
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70">
              We're building the opposite of everything that's wrong with AI IDEs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-primary/5 p-8 ring-1 ring-primary/20 backdrop-blur">
              <div className="w-12 h-12 mb-6 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Own Your Skills</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-primary">Learn transferable skills</strong> that work anywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-primary">Master Claude Code & terminal</strong> - tools you can use forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-primary">Build real understanding</strong>, not just copy-paste habits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-primary">Work locally</strong> - your code, your machine, your control</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-secondary/5 p-8 ring-1 ring-secondary/20 backdrop-blur">
              <div className="w-12 h-12 mb-6 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-4">Transparent & Fair</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-secondary">Free to start</strong> - learn the basics without paying</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-secondary">Clear pricing</strong> - no surprise $400 charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-secondary">Open source approach</strong> - no vendor lock-in</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong className="text-secondary">Exit-friendly</strong> - skills work everywhere</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Who We're Building This For
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70">
              Every developer who's been burned by the AI IDE industrial complex
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="w-16 h-16 mb-6 rounded-lg bg-red-500/20 flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI IDE Refugees</h3>
              <p className="text-white/70 mb-4">
                You've been burned by Replit, V0, Cursor, or Bolt. You're tired of:
              </p>
              <ul className="text-sm text-white/60 space-y-2 text-left">
                <li>• Surprise $400 charges</li>
                <li>• Platform crashes losing your work</li>
                <li>• Learning their way, not programming</li>
                <li>• Being locked into their ecosystem</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="w-16 h-16 mb-6 rounded-lg bg-yellow-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Terminal-Scared Developers</h3>
              <p className="text-white/70 mb-4">
                You know you need to learn the terminal and CLI tools, but:
              </p>
              <ul className="text-sm text-white/60 space-y-2 text-left">
                <li>• Black screen intimidates you</li>
                <li>• Commands seem like magic spells</li>
                <li>• One wrong move breaks everything</li>
                <li>• No one teaches it properly</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur text-center">
              <div className="w-16 h-16 mb-6 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Future-Proof Learners</h3>
              <p className="text-white/70 mb-4">
                You want to learn AI-assisted development the right way:
              </p>
              <ul className="text-sm text-white/60 space-y-2 text-left">
                <li>• Skills that transfer anywhere</li>
                <li>• Understanding, not just prompting</li>
                <li>• Control over your tools and code</li>
                <li>• Real programming fundamentals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="rounded-2xl bg-primary/5 p-12 ring-1 ring-primary/20 backdrop-blur max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Break Free from AI IDE Prison?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join the developers who chose <strong className="text-primary">real skills</strong> over platform dependency.
                Start your journey to <strong className="text-primary">true coding freedom</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/character-selection"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Start Your Freedom Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
                >
                  Learn More About OneWave
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}