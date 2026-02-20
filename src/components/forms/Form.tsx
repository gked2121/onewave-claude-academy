"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/hooks';
import { FormFieldConfig } from '@/types';
import { cn } from '@/lib/utils';

interface FormProps {
  fields: FormFieldConfig[];
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  initialValues?: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
  submitLabel?: string;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  initialValues,
  className,
  children,
  submitLabel = 'Submit',
  validateOnChange = false,
  validateOnBlur = true,
}) => {
  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
  } = useForm({
    fields,
    initialValues,
    onSubmit,
    validateOnChange,
    validateOnBlur,
  });

  return (
    <motion.form
      className={cn('space-y-6', className)}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <FormField
            field={field}
            value={values[field.name]}
            error={touched[field.name] ? errors[field.name]?.[0] : undefined}
            onChange={(value) => setValue(field.name, value)}
            onBlur={() => setFieldTouched(field.name)}
          />
        </motion.div>
      ))}

      {children}

      <motion.div
        className="flex items-center justify-between pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: fields.length * 0.1 + 0.2, duration: 0.3 }}
      >
        <button
          type="button"
          onClick={reset}
          className="btn-ghost text-gray-400 hover:text-white"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            submitLabel
          )}
        </button>
      </motion.div>
    </motion.form>
  );
};

interface FormFieldProps {
  field: FormFieldConfig;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onBlur: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
}) => {
  const commonProps = {
    name: field.name,
    placeholder: field.placeholder,
    required: field.required,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    onBlur,
    error,
  };

  switch (field.type) {
    case 'textarea':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </label>
          <textarea
            {...commonProps}
            value={value || ''}
            className={cn(
              'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none',
              'bg-black/30 border-white/10 text-white placeholder:text-gray-500',
              'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              'resize-none'
            )}
            rows={4}
          />
          {error && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <span className="text-red-400 font-bold text-xs">Warning:</span>
              {error}
            </p>
          )}
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </label>
          <select
            {...commonProps}
            value={value || ''}
            className={cn(
              'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none',
              'bg-black/30 border-white/10 text-white',
              'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <span className="text-red-400 font-bold text-xs">Warning:</span>
              {error}
            </p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name={field.name}
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            className="mt-1 w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
          />
          <div>
            <label className="text-sm font-medium text-gray-300">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span className="text-red-400 font-bold text-xs">Warning:</span>
                {error}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </label>
          <input
            {...commonProps}
            type={field.type}
            value={value || ''}
            className={cn(
              'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none',
              'bg-black/30 border-white/10 text-white placeholder:text-gray-500',
              'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
          />
          {error && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <span className="text-red-400 font-bold text-xs">Warning:</span>
              {error}
            </p>
          )}
        </div>
      );
  }
};