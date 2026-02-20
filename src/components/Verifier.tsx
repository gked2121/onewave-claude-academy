"use client";

import { useState } from 'react';

type Check = { id: string; label: string; status: 'idle' | 'ok' | 'fail'; detail?: string };

export default function Verifier({ onComplete }: { onComplete?: (result: { [k: string]: boolean }) => void }) {
  const [checks, setChecks] = useState<Check[]>([
    { id: 'ping-root', label: 'App is running (GET /)', status: 'idle' },
    { id: 'cta-journey', label: 'Homepage has CTA to /journey', status: 'idle' },
    { id: 'headline-edited', label: 'Headline is customized (not default)', status: 'idle' },
  ]);
  const [review, setReview] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  async function run() {
    setRunning(true);
    const results: { [k: string]: boolean } = {};
    try {
      // Fetch homepage HTML
      const res = await fetch('/', { headers: { 'Accept': 'text/html' } });
      const ok = res.ok;
      const html = ok ? await res.text() : '';
      const doc = html ? new DOMParser().parseFromString(html, 'text/html') : null;

      results['ping-root'] = ok;
      update('ping-root', ok, ok ? '200 OK' : 'Failed to fetch /');

      // CTA to /journey exists
      let cta = false;
      if (doc) {
        const links = Array.from(doc.querySelectorAll('a')) as HTMLAnchorElement[];
        cta = links.some((a) => (a.getAttribute('href') || '').startsWith('/journey'));
      }
      results['cta-journey'] = cta;
      update('cta-journey', cta, cta ? 'Found link to /journey' : 'No link to /journey found');

      // Headline edited: default was "Welcome to the OneWave Claude Academy"
      let edited = false;
      if (doc) {
        const h1 = doc.querySelector('h1');
        const text = (h1?.textContent || '').trim();
        if (text && text !== 'Welcome to the OneWave Claude Academy') edited = true;
      }
      results['headline-edited'] = edited;
      update('headline-edited', edited, edited ? 'Headline appears custom' : 'Still using starter headline or none');

      onComplete?.(results);
    } catch (e) {
      // mark all failed
      ['ping-root', 'cta-journey', 'headline-edited'].forEach((id) => update(id, false, 'Check failed'));
    } finally {
      setRunning(false);
    }
  }

  function update(id: string, ok: boolean, detail?: string) {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, status: ok ? 'ok' : 'fail', detail } : c)));
  }

  async function askAI() {
    setReview(null);
    setReviewing(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature: 0.2,
          messages: [
            {
              role: 'system',
              content:
                'You are a concise reviewer. Given checks from a micro-app job, briefly confirm what passed and suggest exact steps to fix what failed. Keep it friendly and specific.',
            },
            {
              role: 'user',
              content: `Here are my auto-check results: ${checks
                .map((c) => `${c.label}: ${c.status}`)
                .join(' | ')}. Please advise next steps to pass all tasks.`,
            },
          ],
        }),
      });
      if (!res.ok || !res.body) throw new Error('AI unavailable');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      let done = false;
      while (!done) {
        const chunk = await reader.read();
        done = chunk.done;
        if (chunk.value) {
          text += decoder.decode(chunk.value);
          setReview(text);
        }
      }
    } catch (e) {
      setReview('AI review is currently unavailable. Try again later.');
    } finally {
      setReviewing(false);
    }
  }

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Auto-Verify (easy mode)</h3>
        <button className="btn-secondary" onClick={run} disabled={running}>
          {running ? 'Checking…' : 'Run checks'}
        </button>
      </div>
      <ul className="space-y-2">
        {checks.map((c) => (
          <li key={c.id} className="flex items-center justify-between">
            <span className="text-gray-200">{c.label}</span>
            <span className={c.status === 'ok' ? 'text-green-400' : c.status === 'fail' ? 'text-red-400' : 'text-gray-400'}>
              {c.status === 'idle' ? '—' : c.status === 'ok' ? 'OK' : 'Fix'}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-3">
        <button className="btn-secondary" onClick={askAI} disabled={reviewing}>
          {reviewing ? 'Asking AI…' : 'Ask AI to review'}
        </button>
        <a className="btn-secondary" href="/share">Upload a screenshot</a>
      </div>

      {review && (
        <div className="mt-4 p-3 rounded-md bg-black/40 border border-white/10 text-gray-100 whitespace-pre-wrap text-sm">
          {review}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3">Tip: If checks fail but you completed the task, you can still mark items complete.
      </p>
    </div>
  );
}

