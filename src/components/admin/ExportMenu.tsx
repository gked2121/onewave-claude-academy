"use client";

import { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrgMember, OrgStats } from '@/lib/admin';

interface ExportMenuProps {
  members: OrgMember[];
  stats: OrgStats;
  orgName: string;
}

export default function ExportMenu({ members, stats, orgName }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleCSV() {
    const { generateCSVExport, downloadCSV } = await import('@/lib/export');
    const csv = generateCSVExport(members, orgName);
    downloadCSV(csv, `${orgName.replace(/\s+/g, '-').toLowerCase()}-members.csv`);
    setIsOpen(false);
  }

  async function handlePDF() {
    setGenerating(true);
    try {
      const { generatePDFReport } = await import('@/lib/export');
      await generatePDFReport(members, stats, orgName);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGenerating(false);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          'bg-bg-card border border-border text-text hover:bg-bg-lighter'
        )}
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden">
          <button
            onClick={handleCSV}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-bg-lighter transition-colors text-left"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-400" />
            Export as CSV
          </button>
          <button
            onClick={handlePDF}
            disabled={generating}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-bg-lighter transition-colors text-left border-t border-border disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-red-400" />
            )}
            {generating ? 'Generating...' : 'Export as PDF'}
          </button>
        </div>
      )}
    </div>
  );
}
