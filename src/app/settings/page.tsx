"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Volume2, Eye, Crown, LogOut, ChevronRight, Shield, Save } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
        enabled ? 'bg-primary' : 'bg-bg-lighter'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-5.5' : 'translate-x-0.5'
        } mt-0.5`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { userEmail, plan, preferences, updatePreferences, logout } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isAdmin = userEmail?.toLowerCase().includes('onewave-ai.com') || userEmail?.toLowerCase().includes('gked21@gmail.com');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !userEmail) {
      router.push('/login');
    }
  }, [mounted, userEmail, router]);

  useEffect(() => {
    if (userEmail) {
      setDisplayName(userEmail.split('@')[0]);
    }
  }, [userEmail]);

  const handleSaveProfile = async () => {
    setSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const planLabel = plan === 'pro' ? 'Pro' : plan === 'full' ? 'Full Access' : 'Free';
  const planColor = plan === 'free' ? 'bg-bg-lighter text-text-soft' : 'bg-claude/20 text-claude';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-claude border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6 text-text-muted" />
            <h1 className="text-2xl font-bold text-text">Settings</h1>
          </div>
          <p className="text-text-soft">Manage your profile, preferences, and account.</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <User className="w-5 h-5 text-text-muted" />
              <h2 className="text-lg font-semibold text-text">Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-text-muted mb-1.5">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-text placeholder:text-text-soft focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-border-hover transition-colors"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={userEmail || ''}
                  readOnly
                  className="w-full rounded-lg border border-border bg-bg-lighter px-3 py-2 text-text-soft cursor-not-allowed"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
              </button>
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-5 h-5 text-text-muted" />
              <h2 className="text-lg font-semibold text-text">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-text-soft" />
                  <div>
                    <p className="text-sm font-medium text-text">Notifications</p>
                    <p className="text-xs text-text-soft">Receive progress and achievement alerts</p>
                  </div>
                </div>
                <Toggle
                  enabled={preferences.notifications}
                  onChange={(v) => updatePreferences({ notifications: v })}
                />
              </div>

              <div className="border-t border-border" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-text-soft" />
                  <div>
                    <p className="text-sm font-medium text-text">Sound Effects</p>
                    <p className="text-xs text-text-soft">Play sounds on actions and completions</p>
                  </div>
                </div>
                <Toggle
                  enabled={preferences.soundEnabled}
                  onChange={(v) => updatePreferences({ soundEnabled: v })}
                />
              </div>

              <div className="border-t border-border" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-text-soft" />
                  <div>
                    <p className="text-sm font-medium text-text">Visual Effects</p>
                    <p className="text-xs text-text-soft">Animations and particle effects</p>
                  </div>
                </div>
                <Toggle
                  enabled={preferences.visualsEnabled}
                  onChange={(v) => updatePreferences({ visualsEnabled: v })}
                />
              </div>
            </div>
          </motion.div>

          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Crown className="w-5 h-5 text-text-muted" />
              <h2 className="text-lg font-semibold text-text">Account</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Current Plan</p>
                  <p className="text-xs text-text-soft mt-0.5">Your subscription tier</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${planColor}`}>
                  <Crown className="w-3 h-3" />
                  {planLabel}
                </span>
              </div>

              <div className="border-t border-border" />

              <button
                onClick={() => router.push('/upgrade')}
                className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-text transition-colors hover:border-border-hover hover:bg-bg-lighter/50"
              >
                <span>{plan === 'free' ? 'Upgrade your plan' : 'Manage your plan'}</span>
                <ChevronRight className="w-4 h-4 text-text-soft" />
              </button>

              {isAdmin && (
                <>
                  <div className="border-t border-border" />
                  <button
                    onClick={() => router.push('/admin')}
                    className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-text transition-colors hover:border-border-hover hover:bg-bg-lighter/50"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-claude" />
                      <span>Admin Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-soft" />
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-red-500/30 bg-bg-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <LogOut className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold text-text">Danger Zone</h2>
            </div>

            <p className="text-sm text-text-soft mb-4">
              Sign out of your account. Your progress is saved and will be restored when you sign back in.
            </p>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
