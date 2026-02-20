"use client";

import { useEffect, useMemo, useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import Verifier from '@/components/Verifier';

type Task = { id: string; label: string; done: boolean };

const STORAGE_KEY = 'onewave:claude-academy:track:day1';

export default function DayOneTrack() {
  const { completeLevel, plan, awardAchievement } = useProgress();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'edit-hero', label: 'Edit the homepage headline to your theme', done: false },
    { id: 'add-cta', label: 'Add a CTA button that links to the Journey', done: false },
    { id: 'add-image', label: 'Add an image or icon to the hero section', done: false },
    { id: 'run-local', label: 'Run the app locally and view it', done: false },
    { id: 'share', label: 'Post your win using the Share page', done: false },
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const allDone = useMemo(() => tasks.every((t) => t.done), [tasks]);

  useEffect(() => {
    if (allDone) {
      completeLevel(1);
      awardAchievement('day_one_ship', 150);
    }
  }, [allDone, completeLevel, awardAchievement]);

  function toggle(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Day 1 — Landing Page Micro‑App</h2>
      <p className="text-gray-300 mb-6">Goal: ship a simple landing page with your unique vibe, then share it.</p>

      <div className="glass rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-2">Checklist</h3>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t.id} className="flex items-center gap-3">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="w-4 h-4" />
              <span className={t.done ? 'line-through text-gray-400' : ''}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-2">Prompts</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-200">
          <li>“Help me rewrite my headline to sound {`<your theme>`} and motivating.”</li>
          <li>“Give me a Tailwind CTA button that links to /journey.”</li>
          <li>“Suggest a minimal hero layout (title, subtext, CTA, icon).”</li>
        </ol>
        <a href="/prompt" className="btn-secondary inline-block mt-4">Open Prompt Console</a>
      </div>

      <Verifier
        onComplete={(r) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === 'run-local'
                ? { ...t, done: !!r['ping-root'] }
                : t.id === 'add-cta'
                ? { ...t, done: !!r['cta-journey'] || t.done }
                : t.id === 'edit-hero'
                ? { ...t, done: !!r['headline-edited'] || t.done }
                : t
            )
          );
        }}
      />

      <div className="glass rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-2">Ship it</h3>
        <p className="text-gray-300">Take a screenshot and post your win.</p>
        <a href="/share" className="btn-primary inline-block mt-3">Share Your Completion</a>
      </div>

      {plan === 'free' && (
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-2">Full Access Boosters (optional)</h3>
          <ul className="list-disc list-inside text-gray-200">
            <li>Brand pack: generate color tokens + typography presets</li>
            <li>Copy pack: 10 hero headline variations</li>
            <li>Deploy helper: CI hints and config snippets</li>
          </ul>
          <a href="/upgrade" className="btn-secondary inline-block mt-3">Upgrade to unlock boosters</a>
        </div>
      )}
    </div>
  );
}
