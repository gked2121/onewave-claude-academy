import Link from 'next/link';
import { Linkedin, Mail, BookOpen, Award, Users, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-black/40 border-t border-white/5 backdrop-blur-xl mt-24">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-claude/20 to-claude/10">
                <span className="text-lg font-bold text-claude">C</span>
              </div>
              <h3 className="text-xl font-bold text-white">Claude Academy</h3>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Built by <span className="text-claude font-semibold">OneWave AI</span> to help teams and individuals
              master the complete <span className="font-semibold">Anthropic Claude ecosystem</span>. From Chat to Code
              to Enterprise - we provide gamified, interactive training with certifications.
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Our mission: Enable every professional to leverage AI effectively through Claude Chat, Claude Code,
              MCP development, and enterprise deployment.
            </p>
          </div>

          {/* Learning Tracks */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-claude" />
              Learning Tracks
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tracks/claude-chat" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Claude Chat Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/tracks/claude-code" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Claude Code Mastery
                </Link>
              </li>
              <li>
                <Link href="/tracks/mcp-development" className="text-white/60 hover:text-claude text-sm transition-colors">
                  MCP Development
                </Link>
              </li>
              <li>
                <Link href="/tracks/anthropic-api" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Anthropic API
                </Link>
              </li>
              <li>
                <Link href="/tracks/claude-enterprise" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Claude Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/achievements" className="text-white/60 hover:text-claude text-sm transition-colors flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="text-white/60 hover:text-claude text-sm transition-colors flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  For Teams
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-claude text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@onewave.ai"
                  className="text-white/60 hover:text-claude text-sm transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Claude Academy by OneWave AI. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/onewave-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-claude transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://onewave-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-claude transition-colors"
                aria-label="OneWave AI"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
