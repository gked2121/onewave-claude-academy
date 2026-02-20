import AchievementSystem from '@/components/AchievementSystem';
import { Trophy, Sparkles } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <section className="min-h-screen pb-32 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(47,201,244,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(0,199,189,0.15),transparent)]" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-white/90">Celebrate your learning milestones</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">Achievement</span> Gallery
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/70">
              Track your progress, unlock rewards, and celebrate every milestone on your coding journey
            </p>
          </div>

          <AchievementSystem />
        </div>
      </div>
    </section>
  );
}