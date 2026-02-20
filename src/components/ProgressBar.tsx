"use client";

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export default function ProgressBar({
  current,
  total,
  label,
  className = '',
  showPercentage = true,
  color = 'primary'
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  const getColorClasses = () => {
    switch(color) {
      case 'success': return 'from-emerald-500 to-green-500';
      case 'warning': return 'from-amber-500 to-orange-500';
      case 'error': return 'from-red-500 to-pink-500';
      default: return 'from-primary to-secondary';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/80">{label}</span>
          {showPercentage && (
            <span className="text-sm text-white/60">{current}/{total} ({Math.round(percentage)}%)</span>
          )}
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColorClasses()} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            style={{ width: '50%' }}
          />
        </motion.div>
      </div>
    </div>
  );
}