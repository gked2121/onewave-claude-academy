"use client";

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-zinc-900/50 rounded-xl p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-zinc-800 rounded-xl" />
        <div className="flex-1">
          <div className="h-6 bg-zinc-800 rounded w-3/4 mb-3" />
          <div className="h-4 bg-zinc-800 rounded w-1/2 mb-3" />
          <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
          <div className="h-3 bg-zinc-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLevel() {
  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 animate-pulse border border-white/5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-full" />
        <div className="flex-1">
          <div className="h-5 bg-zinc-800 rounded w-1/3 mb-2" />
          <div className="h-4 bg-zinc-800 rounded w-1/4 mb-3" />
          <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
          <div className="flex gap-4 mt-4">
            <div className="h-3 bg-zinc-800 rounded w-20" />
            <div className="h-3 bg-zinc-800 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md', message }: { size?: 'sm' | 'md' | 'lg'; message?: string }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizes[size]} border-2 border-primary/30 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <p className="text-white/60 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <LoadingSpinner size="lg" message="Loading your adventure..." />
      </motion.div>
    </div>
  );
}

export function ContentLoader({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  if (isLoading) {
    return <PageLoader />;
  }
  return <>{children}</>;
}