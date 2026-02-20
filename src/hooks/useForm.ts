"use client";

import { useState, useCallback } from 'react';
import { FormValidationResult, FormFieldConfig, FormValidation } from '@/types';

interface UseFormOptions {
  initialValues?: Record<string, any>;
  fields: FormFieldConfig[];
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface UseFormReturn {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched?: boolean) => void;
  setFieldError: (name: string, error: string) => void;
  validateField: (name: string) => string[];
  validateForm: () => FormValidationResult;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

function useForm({
  initialValues = {},
  fields,
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormOptions): UseFormReturn {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const defaultValues: Record<string, any> = {};
    fields.forEach(field => {
      defaultValues[field.name] = initialValues[field.name] ?? '';
    });
    return defaultValues;
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string): string[] => {
    const field = fields.find(f => f.name === name);
    if (!field || !field.validation) return [];

    const value = values[name];
    const fieldErrors: string[] = [];

    for (const validation of field.validation) {
      if (!isValidValue(value, validation)) {
        fieldErrors.push(validation.message);
      }
    }

    return fieldErrors;
  }, [fields, values]);

  const validateForm = useCallback((): FormValidationResult => {
    const allErrors: Record<string, string[]> = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldErrors = validateField(field.name);
      if (fieldErrors.length > 0) {
        allErrors[field.name] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(allErrors);
    return { isValid, errors: allErrors };
  }, [fields, validateField]);

  const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));

    if (validateOnChange) {
      const fieldErrors = validateField(name);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [validateField, validateOnChange]);

  const setFieldTouched = useCallback((name: string, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));

    if (validateOnBlur && isTouched) {
      const fieldErrors = validateField(name);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [validateField, validateOnBlur]);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: [error]
    }));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) return;

    if (!onSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    const defaultValues: Record<string, any> = {};
    fields.forEach(field => {
      defaultValues[field.name] = initialValues[field.name] ?? '';
    });
    setValues(defaultValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [fields, initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setFieldTouched,
    setFieldError,
    validateField,
    validateForm,
    handleSubmit,
    reset,
  };
}

function isValidValue(value: any, validation: FormValidation): boolean {
  switch (validation.type) {
    case 'required':
      return value !== null && value !== undefined && value !== '';

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);

    case 'minLength':
      return !value || value.length >= validation.value;

    case 'maxLength':
      return !value || value.length <= validation.value;

    case 'pattern':
      const regex = new RegExp(validation.value);
      return !value || regex.test(value);

    case 'custom':
      return !validation.validator || validation.validator(value);

    default:
      return true;
  }
}

export default useForm;