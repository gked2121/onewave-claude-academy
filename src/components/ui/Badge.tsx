"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  animated = false,
}) => {
  const variants = {
    default: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    primary: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const Component = animated ? motion.span : 'span';
  const animationProps = animated ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    whileHover: { scale: 1.05 },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  } : {};

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full border backdrop-blur-sm',
        variants[variant],
        sizes[size],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Badge;