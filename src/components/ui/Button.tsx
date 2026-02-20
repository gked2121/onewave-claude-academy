"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "btn relative inline-flex items-center justify-center gap-2 font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/25",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg shadow-yellow-600/25",
      },
      size: {
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
        xl: "btn-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface CustomButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    type,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        onClick={onClick}
        type={type}
        whileHover={!isDisabled ? { y: -1 } : undefined}
        whileTap={!isDisabled ? { y: 0 } : undefined}
        transition={{ duration: 0.1 }}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };