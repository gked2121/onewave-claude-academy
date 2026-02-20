"use client";

import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Cookie, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: September 24, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">

            {/* Introduction */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Introduction
              </h2>
              <p className="text-white/80 leading-relaxed">
                OneWave (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the OneWave Claude Academy platform.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our coding education platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Email address (for account creation and communication)</li>
                    <li>Progress data (completed levels, XP, achievements)</li>
                    <li>Usage analytics (how you interact with our platform)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Device information and browser type</li>
                    <li>IP address and general location</li>
                    <li>Session data and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Provide and maintain our coding education platform</li>
                <li>Track your learning progress and achievements</li>
                <li>Send important updates about your account</li>
                <li>Improve our platform based on usage patterns</li>
                <li>Process payments for premium features</li>
                <li>Provide customer support when needed</li>
              </ul>
            </section>

            {/* Data Storage */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">Data Storage & Security</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  Your progress data is stored locally in your browser and synced to our secure servers
                  when you create an account. We use industry-standard security measures to protect your data.
                </p>
                <p>
                  We retain your data for as long as your account is active. You may request deletion
                  of your account and data at any time by contacting us.
                </p>
              </div>
            </section>

            {/* Third Party Services */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Third-Party Services</h2>
              <div className="text-white/80 space-y-3">
                <p>We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Vercel:</strong> For hosting and analytics</li>
                  <li><strong>GitHub:</strong> For code repository management</li>
                </ul>
                <p>These services have their own privacy policies and data handling practices.</p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Cookies & Local Storage
              </h2>
              <div className="text-white/80 space-y-3">
                <p>
                  We use local storage to save your progress and preferences. This data stays on your
                  device and helps provide a seamless learning experience.
                </p>
                <p>
                  We may use cookies for essential site functionality and analytics. You can control
                  cookie settings through your browser.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">International Data Transfers</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  Your data may be transferred to and stored in countries outside of your residence
                  where our service providers are located, including the United States.
                </p>
                <p>
                  We ensure appropriate safeguards are in place to protect your data in accordance
                  with applicable data protection laws, including using standard contractual clauses
                  approved by relevant authorities.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Data Retention</h2>
              <div className="text-white/80 space-y-3">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide our services and maintain your account</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services through analytics (in aggregated form)</li>
                </ul>
                <p>
                  When you delete your account, we will remove your personal information within 30 days,
                  except where retention is required by law.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">Your Rights</h2>
              <div className="text-white/80 space-y-3">
                <p className="mb-3">Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectify:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erase:</strong> Request deletion of your personal data</li>
                  <li><strong>Restrict:</strong> Limit how we process your data</li>
                  <li><strong>Port:</strong> Receive your data in a portable format</li>
                  <li><strong>Object:</strong> Opt out of certain processing activities</li>
                  <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at privacy@onewave-ai.com. We will respond
                  within 30 days of receiving your request.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Children's Privacy</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  Our service is not intended for children under 13 years of age. We do not
                  knowingly collect personal information from children under 13.
                </p>
                <p>
                  If we become aware that we have collected personal information from a child
                  under 13 without parental consent, we will take steps to remove that information
                  from our servers promptly.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Us
              </h2>
              <div className="text-white/80">
                <p className="mb-3">
                  If you have questions about this Privacy Policy or want to exercise your rights,
                  contact us at:
                </p>
                <p className="font-medium text-white">
                  Email: privacy@onewave-ai.com
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">Policy Updates</h2>
              <p className="text-white/80">
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by email or through our platform. Your continued use of our
                service constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-700 text-center">
          <p className="text-white/60 text-sm">
            By using OneWave Claude Academy, you agree to this Privacy Policy and our{' '}
            <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
