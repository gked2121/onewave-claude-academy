"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Download, Twitter, Linkedin, Send, Copy, Check } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

interface ShareAchievementProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function ShareAchievement({ achievement, onClose }: ShareAchievementProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return { bg: 'from-gray-400 to-gray-600', text: '#9CA3AF' };
      case 'rare': return { bg: 'from-blue-400 to-blue-600', text: '#60A5FA' };
      case 'epic': return { bg: 'from-purple-400 to-purple-600', text: '#A78BFA' };
      case 'legendary': return { bg: 'from-yellow-400 to-orange-500', text: '#FBBF24' };
      default: return { bg: 'from-gray-400 to-gray-600', text: '#9CA3AF' };
    }
  };

  const rarityColors = getRarityColor(achievement.rarity);

  // Generate shareable text
  const shareText = `Just unlocked "${achievement.title}" on Claude Academy! ${achievement.icon}

${achievement.description}

Rarity: ${achievement.rarity.toUpperCase()}
Reward: +${achievement.xpReward} XP

Mastering the Anthropic ecosystem at claude-academy.onewave.ai

#ClaudeAcademy #Anthropic #ClaudeCode #AI #MCP`;

  const linkedInText = `Achievement Unlocked: ${achievement.title}!

I just earned the "${achievement.title}" badge on Claude Academy - mastering the complete Anthropic Claude ecosystem.

${achievement.description}

This ${achievement.rarity} achievement earned me +${achievement.xpReward} XP as I continue building AI development skills.

Learn Claude Chat, Claude Code, MCP, and more: claude-academy.onewave.ai

#Anthropic #ClaudeAI #AITraining #ProfessionalDevelopment #ClaudeCode`;

  const twitterText = `Just unlocked "${achievement.title}" ${achievement.icon}

${achievement.description}

${achievement.rarity.toUpperCase()} • +${achievement.xpReward} XP

Mastering the Claude ecosystem
claude-academy.onewave.ai

#ClaudeAcademy #Anthropic #AI`;

  const handleShare = (platform: 'linkedin' | 'twitter' | 'tiktok') => {
    let url = '';

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://claude-academy.onewave.ai')}&summary=${encodeURIComponent(linkedInText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent('https://claude-academy.onewave.ai')}`;
        break;
      case 'tiktok':
        // TikTok doesn't have direct sharing API, copy text for user to paste
        navigator.clipboard.writeText(shareText);
        alert('Share text copied! Open TikTok and paste it in your post caption.');
        return;
    }

    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBadge = async (format: 'square' | 'linkedin' | 'twitter' | 'tiktok' = 'square') => {
    setDownloading(true);

    // Platform-specific dimensions
    let width = 1200, height = 1200;
    switch (format) {
      case 'linkedin':
        width = 1200;
        height = 627; // LinkedIn optimal
        break;
      case 'twitter':
        width = 1200;
        height = 675; // Twitter/X optimal
        break;
      case 'tiktok':
        width = 1080;
        height = 1920; // TikTok vertical
        break;
    }

    // Create canvas for badge image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setDownloading(false);
      return;
    }

    // Background gradient - Claude-inspired dark theme
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a0f');
    gradient.addColorStop(0.5, '#1a0f1e');
    gradient.addColorStop(1, '#0f0a1e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add Claude terra cotta accent glow
    const accentGlow = ctx.createRadialGradient(width/2, height/3, 50, width/2, height/3, height/2);
    accentGlow.addColorStop(0, '#DA775660');
    accentGlow.addColorStop(0.5, '#DA775630');
    accentGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = accentGlow;
    ctx.fillRect(0, 0, width, height);

    // Rarity-specific glow
    ctx.shadowBlur = 60;
    ctx.shadowColor = rarityColors.text;
    const rarityGradient = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, Math.min(width, height)/2);
    rarityGradient.addColorStop(0, rarityColors.text + '50');
    rarityGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = rarityGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.shadowBlur = 0;

    // Scale factors for different formats
    const scale = format === 'tiktok' ? 1.2 : 1;
    const centerY = height / 2;

    // Achievement icon
    ctx.font = `bold ${Math.floor(220 * scale)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(achievement.icon, width/2, centerY - (format === 'tiktok' ? 350 : 150));

    // Title
    ctx.font = `bold ${Math.floor(72 * scale)}px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    ctx.fillText(achievement.title, width/2, centerY + (format === 'tiktok' ? -50 : 50));
    ctx.shadowBlur = 0;

    // Description with word wrapping
    ctx.font = `${Math.floor(36 * scale)}px Arial`;
    ctx.fillStyle = '#c0c0d0';
    const words = achievement.description.split(' ');
    let line = '';
    let y = centerY + (format === 'tiktok' ? 50 : 130);
    const maxWidth = width * 0.85;
    for (let word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, width/2, y);
        line = word + ' ';
        y += 48 * scale;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width/2, y);

    // Rarity badge with background
    const badgeY = y + (format === 'tiktok' ? 120 : 90);
    ctx.font = `bold ${Math.floor(32 * scale)}px Arial`;
    const badgeText = `${achievement.rarity.toUpperCase()} • +${achievement.xpReward} XP`;
    const badgeMetrics = ctx.measureText(badgeText);

    // Badge background
    ctx.fillStyle = rarityColors.text + '20';
    ctx.fillRect(width/2 - badgeMetrics.width/2 - 20, badgeY - 20, badgeMetrics.width + 40, 50);

    // Badge text
    ctx.fillStyle = rarityColors.text;
    ctx.fillText(badgeText, width/2, badgeY + 5);

    // Date
    if (achievement.unlockedAt) {
      ctx.font = `${Math.floor(28 * scale)}px Arial`;
      ctx.fillStyle = '#808090';
      ctx.fillText(`Unlocked ${achievement.unlockedAt.toLocaleDateString()}`, width/2, badgeY + 70);
    }

    // Claude Academy branding
    const brandY = height - (format === 'tiktok' ? 150 : 120);

    // Brand background bar
    const brandBarHeight = format === 'tiktok' ? 160 : 100;
    ctx.fillStyle = '#0a0a0f80';
    ctx.fillRect(0, height - brandBarHeight, width, brandBarHeight);

    // Logo text
    ctx.font = `bold ${Math.floor(48 * scale)}px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CLAUDE ACADEMY', width/2, brandY);

    // Tagline
    ctx.font = `${Math.floor(28 * scale)}px Arial`;
    ctx.fillStyle = '#a0a0b0';
    ctx.fillText('Master the Anthropic Ecosystem', width/2, brandY + 40);

    // URL
    ctx.font = `bold ${Math.floor(32 * scale)}px Arial`;
    ctx.fillStyle = '#DA7756';
    ctx.fillText('claude-academy.onewave.ai', width/2, brandY + (format === 'tiktok' ? 85 : 75));

    // Add decorative corner elements
    ctx.strokeStyle = '#DA775660';
    ctx.lineWidth = 3;

    // Top left corner
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(30, 30);
    ctx.lineTo(80, 30);
    ctx.stroke();

    // Top right corner
    ctx.beginPath();
    ctx.moveTo(width - 80, 30);
    ctx.lineTo(width - 30, 30);
    ctx.lineTo(width - 30, 80);
    ctx.stroke();

    // Download
    const formatName = format === 'square' ? '' : `-${format}`;
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `claude-academy-${achievement.id}${formatName}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setDownloading(false);
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 max-w-2xl w-full overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`relative p-6 bg-gradient-to-br ${rarityColors.bg} bg-opacity-20`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="text-8xl mb-4">{achievement.icon}</div>
              <h2 className="text-3xl font-bold text-white mb-2">{achievement.title}</h2>
              <p className="text-white/80 text-lg mb-3">{achievement.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span style={{ color: rarityColors.text }} className="font-bold">
                  {achievement.rarity.toUpperCase()}
                </span>
                <span className="text-yellow-400 font-semibold">
                  +{achievement.xpReward} XP
                </span>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Achievement
            </h3>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                <Twitter className="w-5 h-5" />
                X (Twitter)
              </button>

              <button
                onClick={() => handleShare('tiktok')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF0050] to-[#00F2EA] hover:opacity-90 text-white px-4 py-3 rounded-lg font-semibold transition-opacity"
              >
                <Send className="w-5 h-5" />
                TikTok
              </button>
            </div>

            {/* Download Image Options */}
            <div className="mb-4">
              <h4 className="text-white/70 text-sm font-semibold mb-2 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Image For:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleDownloadBadge('linkedin')}
                  disabled={downloading}
                  className="bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/30 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Linkedin className="w-4 h-4 mx-auto mb-1" />
                  LinkedIn
                </button>

                <button
                  onClick={() => handleDownloadBadge('twitter')}
                  disabled={downloading}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Twitter className="w-4 h-4 mx-auto mb-1" />
                  X/Twitter
                </button>

                <button
                  onClick={() => handleDownloadBadge('tiktok')}
                  disabled={downloading}
                  className="bg-gradient-to-r from-[#FF0050]/20 to-[#00F2EA]/20 hover:from-[#FF0050]/30 hover:to-[#00F2EA]/30 border border-[#FF0050]/30 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mx-auto mb-1" />
                  TikTok
                </button>

                <button
                  onClick={() => handleDownloadBadge('square')}
                  disabled={downloading}
                  className="bg-claude/20 hover:bg-claude/30 border border-claude/30 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mx-auto mb-1" />
                  General
                </button>
              </div>
              {downloading && (
                <p className="text-xs text-claude mt-2 text-center animate-pulse">
                  Generating your shareable image...
                </p>
              )}
            </div>

            {/* Copy Text Option */}
            <div>
              <button
                onClick={handleCopyText}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Share Text
                  </>
                )}
              </button>
            </div>

            {/* Preview Text */}
            <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-white/60 mb-2 font-semibold">Share Preview:</p>
              <p className="text-sm text-white/80 whitespace-pre-line font-mono">
                {shareText.split('\n').slice(0, 4).join('\n')}...
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
