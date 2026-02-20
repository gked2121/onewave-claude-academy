"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'default',
    disabled,
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    name,
    id,
    required,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-5 py-4 text-base',
    };

    const variantClasses = {
      default: 'form-input',
      ghost: 'bg-transparent border-transparent hover:border-slate-300 focus:border-blue-500',
      filled: 'bg-slate-50 border-slate-200 hover:bg-slate-100 focus:bg-white',
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
              {leftIcon}
            </div>
          )}

          <motion.input
            ref={ref}
            type={actualType}
            className={cn(
              'w-full rounded-lg border transition-all duration-200 outline-none',
              'placeholder:text-slate-400',
              sizeClasses[size],
              variantClasses[variant],
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={id}
            required={required}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            initial={false}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{ duration: 0.1 }}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={cn(
              'flex items-center gap-1 text-xs',
              error ? 'text-red-500' : 'text-slate-600'
            )}
          >
            {error && <AlertCircle size={12} />}
            <span>{error || helperText}</span>
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };