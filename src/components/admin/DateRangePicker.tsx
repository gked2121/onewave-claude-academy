"use client";

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DateRange = {
  startDate: string;
  endDate: string;
  label: string;
};

const PRESETS: { label: string; days: number }[] = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: 'All', days: 365 },
];

function getDateRange(days: number): DateRange {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
    label: days <= 365 ? `${days}d` : 'All',
  };
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Calendar className="w-4 h-4 text-text-muted" />
      {PRESETS.map((preset) => (
        <button
          key={preset.label}
          onClick={() => onChange(getDateRange(preset.days))}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
            value.label === preset.label
              ? 'bg-primary/20 text-primary'
              : 'text-text-muted hover:text-text hover:bg-bg-lighter'
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

export { getDateRange };
