"use client";

import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Headphones, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceNarrationProps {
  text?: string;
  autoPlay?: boolean;
  rate?: number;
  pitch?: number;
  voice?: string;
}

export default function VoiceNarration({
  text = '',
  autoPlay = false,
  rate = 1.0,
  pitch = 1.0,
  voice = 'default'
}: VoiceNarrationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [speechRate, setSpeechRate] = useState(rate);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Select a friendly voice
        const friendlyVoice = availableVoices.find(v =>
          v.name.includes('Samantha') ||
          v.name.includes('Alex') ||
          v.name.includes('Google US English')
        ) || availableVoices[0];

        setSelectedVoice(friendlyVoice);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setHasVoiceSupport(false);
    }
  }, []);

  const speak = useCallback((textToSpeak: string) => {
    if (!hasVoiceSupport || isMuted) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.pitch = pitch;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [hasVoiceSupport, isMuted, speechRate, pitch, selectedVoice]);

  const stopSpeaking = () => {
    if (hasVoiceSupport) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  useEffect(() => {
    if (autoPlay && text && hasVoiceSupport && !isMuted) {
      speak(text);
    }
  }, [text, autoPlay]);

  if (!hasVoiceSupport) return null;

  return (
    <>
      {/* Floating Voice Control */}
      <motion.div
        className="fixed bottom-24 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-3 shadow-2xl">
          <div className="flex items-center gap-2">
            {/* Play/Stop Button */}
            <button
              onClick={togglePlayback}
              className={`p-2 rounded-lg transition-all ${
                isPlaying
                  ? 'bg-primary/20 text-primary'
                  : 'bg-zinc-800 text-white/60 hover:text-white'
              }`}
              title={isPlaying ? 'Stop narration' : 'Start narration'}
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg transition-all ${
                isMuted
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-zinc-800 text-white/60 hover:text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-zinc-800 rounded-lg text-white/60 hover:text-white transition-all"
              title="Voice settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Speed Indicator */}
          {isPlaying && (
            <motion.div
              className="mt-2 h-1 bg-primary/30 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
            >
              <motion.div
                className="h-full bg-primary"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className="absolute bottom-full left-0 mb-2 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-2xl w-64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h4 className="text-white font-medium mb-3 text-sm">Voice Settings</h4>

              {/* Speed Control */}
              <div className="mb-3">
                <label className="text-white/60 text-xs">Speed: {speechRate.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
              </div>

              {/* Voice Selection */}
              <div>
                <label className="text-white/60 text-xs">Voice:</label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    setSelectedVoice(voice || null);
                  }}
                  className="w-full mt-1 bg-zinc-800 text-white text-sm rounded px-2 py-1"
                >
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Accessibility Notice */}
      {isPlaying && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="bg-primary/90 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Narrating...</span>
          </div>
        </motion.div>
      )}
    </>
  );
}

// Voice-enabled instructions component
export function VoiceInstructions({
  title,
  content,
  autoNarrate = true
}: {
  title: string;
  content: string;
  autoNarrate?: boolean;
}) {
  const [hasPlayed, setHasPlayed] = useState(false);

  const fullText = `${title}. ${content}`;

  useEffect(() => {
    if (autoNarrate && !hasPlayed) {
      setHasPlayed(true);
    }
  }, []);

  return (
    <div className="relative">
      <VoiceNarration
        text={fullText}
        autoPlay={autoNarrate && !hasPlayed}
        rate={0.9}
      />
      <div className="bg-zinc-900/90 rounded-xl p-6 border border-white/10">
        <div className="flex items-start gap-3">
          <Mic className="w-5 h-5 text-primary mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-white/80">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}