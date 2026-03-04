"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Loader2,
} from 'lucide-react';
import Papa from 'papaparse';
import { cn } from '@/lib/utils';

interface ParsedInvite {
  email: string;
  role: 'member' | 'manager' | 'admin';
  department: string;
  valid: boolean;
  error?: string;
}

interface BulkInviteResult {
  succeeded: number;
  failed: Array<{ email: string; error: string }>;
}

interface BulkInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string;
  userId: string;
  existingEmails: string[];
  onComplete: () => void;
}

type Step = 'upload' | 'preview' | 'sending' | 'results';

const VALID_ROLES = ['member', 'manager', 'admin'];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BulkInviteModal({
  isOpen,
  onClose,
  orgId,
  userId,
  existingEmails,
  onComplete,
}: BulkInviteModalProps) {
  const [step, setStep] = useState<Step>('upload');
  const [invites, setInvites] = useState<ParsedInvite[]>([]);
  const [results, setResults] = useState<BulkInviteResult | null>(null);
  const [sendProgress, setSendProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setStep('upload');
    setInvites([]);
    setResults(null);
    setSendProgress(0);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function parseCSV(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed: ParsedInvite[] = (result.data as Record<string, string>[]).map((row) => {
          const email = (row.email || row.Email || '').trim().toLowerCase();
          const roleRaw = (row.role || row.Role || 'member').trim().toLowerCase();
          const department = (row.department || row.Department || '').trim();

          const role = VALID_ROLES.includes(roleRaw) ? roleRaw as ParsedInvite['role'] : 'member';
          const valid = validateEmail(email);
          const isDuplicate = existingEmails.includes(email);

          return {
            email,
            role,
            department,
            valid: valid && !isDuplicate,
            error: !email
              ? 'Missing email'
              : !valid
              ? 'Invalid email format'
              : isDuplicate
              ? 'Already a member'
              : undefined,
          };
        });

        // Check for duplicates within the CSV
        const seen = new Set<string>();
        parsed.forEach((inv) => {
          if (seen.has(inv.email)) {
            inv.valid = false;
            inv.error = 'Duplicate in CSV';
          }
          seen.add(inv.email);
        });

        setInvites(parsed);
        setStep('preview');
      },
      error: (err) => {
        console.error('CSV parse error:', err);
      },
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      parseCSV(file);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) parseCSV(file);
  }

  async function handleSend() {
    const validInvites = invites.filter((inv) => inv.valid);
    if (validInvites.length === 0) return;

    setStep('sending');
    setSendProgress(0);

    try {
      const { bulkInviteMembers } = await import('@/lib/admin');
      const result = await bulkInviteMembers(
        orgId,
        validInvites.map((inv) => ({
          email: inv.email,
          role: inv.role,
          department: inv.department || undefined,
        })),
        userId
      );

      setResults(result);
      setStep('results');
      onComplete();
    } catch (err) {
      console.error('Bulk invite error:', err);
      setResults({ succeeded: 0, failed: validInvites.map((inv) => ({ email: inv.email, error: 'Unknown error' })) });
      setStep('results');
    }
  }

  function updateInvite(index: number, field: keyof ParsedInvite, value: string) {
    setInvites((prev) =>
      prev.map((inv, i) => {
        if (i !== index) return inv;
        const updated = { ...inv, [field]: value };
        if (field === 'email') {
          updated.valid = validateEmail(value) && !existingEmails.includes(value);
          updated.error = !validateEmail(value) ? 'Invalid email' : existingEmails.includes(value) ? 'Already a member' : undefined;
        }
        return updated;
      })
    );
  }

  const validCount = invites.filter((inv) => inv.valid).length;
  const invalidCount = invites.filter((inv) => !inv.valid).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        <motion.div
          className="relative z-10 w-full max-w-3xl glass-strong rounded-2xl shadow-2xl max-h-[85vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-semibold text-white">Bulk Invite Team Members</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Upload Step */}
            {step === 'upload' && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors',
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-border-hover'
                  )}
                >
                  <Upload className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text font-medium mb-1">Drop your CSV file here</p>
                  <p className="text-sm text-text-muted">or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-text-soft">
                  <FileText className="w-4 h-4" />
                  <span>Expected columns: email, role (optional), department (optional)</span>
                </div>

                <a
                  href="/templates/invite-template.csv"
                  download
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download template CSV
                </a>
              </div>
            )}

            {/* Preview Step */}
            {step === 'preview' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    {validCount} valid
                  </span>
                  {invalidCount > 0 && (
                    <span className="flex items-center gap-1 text-red-400">
                      <XCircle className="w-4 h-4" />
                      {invalidCount} invalid
                    </span>
                  )}
                </div>

                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-bg-lighter/30">
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted uppercase">Status</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted uppercase">Email</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted uppercase">Role</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted uppercase">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invites.map((inv, i) => (
                        <tr key={i} className={cn(!inv.valid && 'bg-red-500/5')}>
                          <td className="px-4 py-2">
                            {inv.valid ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : (
                              <div className="flex items-center gap-1">
                                <XCircle className="w-4 h-4 text-red-400" />
                                {inv.error && (
                                  <span className="text-xs text-red-400">{inv.error}</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <input
                              value={inv.email}
                              onChange={(e) => updateInvite(i, 'email', e.target.value)}
                              className="w-full bg-transparent text-text text-sm border-0 outline-none focus:ring-0 p-0"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <select
                              value={inv.role}
                              onChange={(e) => updateInvite(i, 'role', e.target.value)}
                              className="bg-transparent text-text text-sm border-0 outline-none cursor-pointer"
                            >
                              <option value="member">member</option>
                              <option value="manager">manager</option>
                              <option value="admin">admin</option>
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            <input
                              value={inv.department}
                              onChange={(e) => updateInvite(i, 'department', e.target.value)}
                              placeholder="--"
                              className="w-full bg-transparent text-text text-sm border-0 outline-none focus:ring-0 p-0 placeholder:text-text-soft"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sending Step */}
            {step === 'sending' && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-text font-medium">Sending invitations...</p>
                <p className="text-sm text-text-muted mt-1">
                  This may take a moment for large teams.
                </p>
              </div>
            )}

            {/* Results Step */}
            {step === 'results' && results && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  {results.succeeded > 0 ? (
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  )}
                  <h3 className="text-lg font-semibold text-text">
                    {results.succeeded} invitation{results.succeeded !== 1 ? 's' : ''} sent
                  </h3>
                  {results.failed.length > 0 && (
                    <p className="text-sm text-red-400 mt-1">
                      {results.failed.length} failed
                    </p>
                  )}
                </div>

                {results.failed.length > 0 && (
                  <div className="border border-red-500/20 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-red-400 mb-2">Failed invitations:</h4>
                    <div className="space-y-1">
                      {results.failed.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-text">{f.email}</span>
                          <span className="text-red-400 text-xs">{f.error}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 shrink-0 flex items-center justify-between">
            {step === 'preview' && (
              <>
                <button
                  onClick={reset}
                  className="text-sm text-text-muted hover:text-text transition-colors"
                >
                  Upload different file
                </button>
                <button
                  onClick={handleSend}
                  disabled={validCount === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send {validCount} Invitation{validCount !== 1 ? 's' : ''}
                </button>
              </>
            )}
            {step === 'results' && (
              <div className="ml-auto">
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
