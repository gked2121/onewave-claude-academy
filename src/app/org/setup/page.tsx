'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Mail,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/supabase';
import { createOrganization, inviteMember } from '@/lib/admin';

type SetupStep = 'name' | 'invite' | 'done';

interface InviteRow {
  id: string;
  email: string;
  role: 'member' | 'manager';
  department: string;
}

function createInviteRow(): InviteRow {
  return {
    id: crypto.randomUUID(),
    email: '',
    role: 'member',
    department: '',
  };
}

export default function OrgSetupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Step state
  const [currentStep, setCurrentStep] = useState<SetupStep>('name');

  // Step 1: Org name
  const [orgName, setOrgName] = useState('');
  const [creatingOrg, setCreatingOrg] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);

  // Step 2: Invites
  const [inviteRows, setInviteRows] = useState<InviteRow[]>([createInviteRow()]);
  const [sendingInvites, setSendingInvites] = useState(false);

  // Results for step 3
  const [inviteResults, setInviteResults] = useState<{ sent: number; failed: number }>({ sent: 0, failed: 0 });

  // Error
  const [error, setError] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUserId(user.id);
      setAuthChecked(true);
    }
    checkAuth();
  }, [router]);

  // Step 1: Create org
  const handleCreateOrg = useCallback(async () => {
    if (!orgName.trim() || !userId) return;
    setError(null);
    setCreatingOrg(true);

    try {
      const org = await createOrganization(orgName.trim(), userId);
      if (!org) {
        setError('Failed to create organization. Please try again.');
        return;
      }
      setOrgId(org.id);
      setCurrentStep('invite');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setCreatingOrg(false);
    }
  }, [orgName, userId]);

  // Step 2: Send invites
  const handleSendInvites = useCallback(async () => {
    if (!orgId || !userId) return;

    const validRows = inviteRows.filter((r) => r.email.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email.trim()));
    if (validRows.length === 0) {
      setCurrentStep('done');
      return;
    }

    setError(null);
    setSendingInvites(true);
    let sent = 0;
    let failed = 0;

    for (const row of validRows) {
      const result = await inviteMember(orgId, row.email.trim().toLowerCase(), row.role, userId);
      if (result.success) {
        sent++;
      } else {
        failed++;
      }
    }

    setInviteResults({ sent, failed });
    setSendingInvites(false);
    setCurrentStep('done');
  }, [orgId, userId, inviteRows]);

  // Invite row helpers
  const updateInviteRow = (id: string, field: keyof InviteRow, value: string) => {
    setInviteRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addInviteRow = () => {
    setInviteRows((prev) => [...prev, createInviteRow()]);
  };

  const removeInviteRow = (id: string) => {
    if (inviteRows.length <= 1) return;
    setInviteRows((prev) => prev.filter((r) => r.id !== id));
  };

  const stepNumber = () => {
    const steps: SetupStep[] = ['name', 'invite', 'done'];
    return steps.indexOf(currentStep) + 1;
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </main>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'name':
        return (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-md mx-auto w-full"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">Name your organization</h2>
              <p className="text-text-soft">
                This is how your team will appear in Claude Academy.
              </p>
            </div>

            <div>
              <input
                type="text"
                value={orgName}
                onChange={(e) => { setOrgName(e.target.value); setError(null); }}
                placeholder="e.g., Acme Corp, Engineering Team..."
                className="w-full px-4 py-4 bg-bg-card border border-border rounded-xl
                         text-text placeholder:text-text-muted text-lg
                         focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <p className="mt-2 text-sm text-text-muted">
                Teams plan: $14.99/user/month. OneWave AI clients get Academy included free.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <button
              onClick={handleCreateOrg}
              disabled={!orgName.trim() || orgName.trim().length < 2 || creatingOrg}
              className={`
                w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                ${orgName.trim().length >= 2
                  ? 'bg-primary hover:bg-primary-hover text-white shadow-glow-blue'
                  : 'bg-bg-card text-text-muted cursor-not-allowed'
                }
              `}
            >
              {creatingOrg ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        );

      case 'invite':
        return (
          <motion.div
            key="invite"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-xl mx-auto w-full"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">Invite your team</h2>
              <p className="text-text-soft">
                Add team members by email. You can always invite more later.
              </p>
            </div>

            <div className="space-y-3">
              {inviteRows.map((row, idx) => (
                <div key={row.id} className="flex items-start gap-2">
                  {/* Email */}
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="email"
                        value={row.email}
                        onChange={(e) => updateInviteRow(row.id, 'email', e.target.value)}
                        placeholder="teammate@company.com"
                        className="w-full bg-bg-card border border-border rounded-lg pl-9 pr-3 py-2.5 text-text text-sm
                                 placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Role dropdown */}
                  <select
                    value={row.role}
                    onChange={(e) => updateInviteRow(row.id, 'role', e.target.value)}
                    className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text text-sm
                             focus:outline-none focus:border-primary transition-colors appearance-none
                             cursor-pointer min-w-[110px]"
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                  </select>

                  {/* Department (optional) */}
                  <input
                    type="text"
                    value={row.department}
                    onChange={(e) => updateInviteRow(row.id, 'department', e.target.value)}
                    placeholder="Dept (optional)"
                    className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text text-sm
                             placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors
                             w-[140px] hidden sm:block"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => removeInviteRow(row.id)}
                    disabled={inviteRows.length <= 1}
                    className={`p-2.5 rounded-lg transition-colors ${
                      inviteRows.length <= 1
                        ? 'text-text-muted/30 cursor-not-allowed'
                        : 'text-text-muted hover:text-red-400 hover:bg-red-500/10'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add another row */}
            <button
              onClick={addInviteRow}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add another</span>
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => {
                  setInviteResults({ sent: 0, failed: 0 });
                  setCurrentStep('done');
                }}
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                Skip for now
              </button>

              <button
                onClick={handleSendInvites}
                disabled={sendingInvites}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                         bg-primary hover:bg-primary-hover text-white shadow-glow-blue"
              >
                {sendingInvites ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Invites & Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      case 'done':
        return (
          <motion.div
            key="done"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 max-w-md mx-auto w-full text-center"
          >
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">You're all set!</h2>
              <p className="text-text-soft">
                Your organization is ready to go.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-bg-card border border-border rounded-xl p-6 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide">Organization</div>
                  <div className="font-medium text-text">{orgName}</div>
                </div>
              </div>

              {inviteResults.sent > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wide">Invitations sent</div>
                    <div className="font-medium text-text">
                      {inviteResults.sent} {inviteResults.sent === 1 ? 'invite' : 'invites'} sent
                      {inviteResults.failed > 0 && (
                        <span className="text-text-muted">
                          {' '}({inviteResults.failed} failed)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {inviteResults.sent === 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-lighter flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-text-muted" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wide">Team</div>
                    <div className="text-sm text-text-muted">
                      No invites sent yet. You can invite members from the admin dashboard.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push('/admin')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                       bg-primary hover:bg-primary-hover text-white shadow-glow-blue"
            >
              <span>Go to Team Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-claude/20 to-claude/10">
              <span className="text-2xl font-bold text-claude">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-claude">Claude Academy</span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`
                  h-2 rounded-full transition-all
                  ${step <= stepNumber() ? 'bg-primary' : 'bg-border'}
                  ${step === stepNumber() ? 'w-4' : 'w-2'}
                `}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Back button for invite step */}
      {currentStep === 'invite' && (
        <footer className="fixed bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-xl border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <button
              onClick={() => setCurrentStep('name')}
              className="flex items-center gap-2 text-text-muted hover:text-text transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </footer>
      )}
    </main>
  );
}
