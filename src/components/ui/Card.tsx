"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'interactive' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    hover = false,
    onClick,
    children,
    ...props
  }, ref) => {
    const isInteractive = onClick || variant === 'interactive';

    const variantClasses = {
      default: 'card',
      interactive: 'card card-interactive cursor-pointer',
      elevated: 'glass-strong shadow-2xl',
      flat: 'bg-slate-50/50 border border-slate-200/50',
    };

    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          hover && 'hover:scale-[1.02] hover:shadow-2xl',
          className
        )}
        onClick={onClick}
        whileHover={isInteractive ? { y: -2, scale: 1.01 } : undefined}
        whileTap={isInteractive ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
const CardHeader = React.forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pb-4 border-b border-slate-200', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

// Card Title Component
const CardTitle = React.forwardRef<HTMLHeadingElement, BaseComponentProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-lg font-semibold text-slate-800', className)}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = "CardTitle";

// Card Description Component
const CardDescription = React.forwardRef<HTMLParagraphElement, BaseComponentProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-slate-600', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

// Card Content Component
const CardContent = React.forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

// Card Footer Component
const CardFooter = React.forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-6 pt-4 border-t border-slate-200', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};