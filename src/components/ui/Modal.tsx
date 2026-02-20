"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ModalProps } from '@/types';
import { cn } from '@/lib/utils';
import { useKeyboard } from '@/hooks';

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, size = 'md', className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[95vw] max-h-[95vh]',
    };

    // Close modal on Escape key
    useKeyboard('Escape', onClose, { enabled: isOpen });

    // Prevent scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              ref={ref}
              className={cn(
                'relative z-10 w-full glass-strong rounded-2xl shadow-2xl',
                sizeClasses[size],
                className
              )}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              {...props}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
              )}

              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              )}

              {/* Content */}
              <div className={cn('p-6', title && 'pt-0')}>
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = "Modal";

export { Modal };