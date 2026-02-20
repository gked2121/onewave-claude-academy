"use client";

import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Users, CreditCard, Shield, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
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
          <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
            <Scale className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: September 24, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">

            {/* Agreement */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Agreement to Terms
              </h2>
              <p className="text-white/80 leading-relaxed">
                By accessing and using OneWave Claude Academy (&quot;the Service&quot;), you accept and agree to be
                bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms,
                please do not use our Service.
              </p>
            </section>

            {/* Service Description */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Service Description</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  OneWave Claude Academy is an AI-powered coding education platform that teaches
                  programming through gamified experiences and personalized AI guidance.
                </p>
                <p>
                  We offer both free and premium tiers, with premium features requiring payment
                  for full access to advanced levels and content.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Accounts & Responsibilities
              </h2>
              <div className="text-white/80 space-y-3">
                <h3 className="font-semibold text-white">Account Creation</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per user; sharing accounts is prohibited</li>
                  <li>You must be at least 13 years old to use our Service</li>
                </ul>

                <h3 className="font-semibold text-white mt-4">Acceptable Use</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use the Service for legitimate educational purposes</li>
                  <li>Respect other users and our community guidelines</li>
                  <li>Do not attempt to reverse engineer or hack the platform</li>
                  <li>Do not share or distribute premium content without authorization</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment & Billing
              </h2>
              <div className="text-white/80 space-y-3">
                <div>
                  <h3 className="font-semibold text-white mb-2">Premium Access</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Premium features require a one-time payment</li>
                    <li>Prices are clearly displayed before purchase</li>
                    <li>All sales are final unless required by law</li>
                    <li>We use Stripe for secure payment processing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Refunds</h3>
                  <p>
                    All sales are final. However, we want you to be satisfied with your purchase.
                    If you experience any issues or are unsatisfied, please contact us at
                    support@onewave-ai.com and we'll work with you to resolve any concerns.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Intellectual Property
              </h2>
              <div className="text-white/80 space-y-3">
                <div>
                  <h3 className="font-semibold text-white mb-2">Our Content</h3>
                  <p>
                    All content, features, and functionality of OneWave Claude Academy are owned by
                    OneWave and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Your Content</h3>
                  <p>
                    You retain ownership of code and projects you create using our platform.
                    By using our Service, you grant us a license to store and display your
                    progress data to provide the Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Data & Privacy */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Data Collection & Analytics</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  We collect usage analytics to improve our platform and understand user behavior.
                  This includes:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Page views and user interactions</li>
                  <li>Learning progress and completion rates</li>
                  <li>Feature usage patterns</li>
                  <li>Performance metrics and error tracking</li>
                </ul>
                <p>
                  All data collection is done in accordance with our{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                  {' '}and applicable privacy laws.
                </p>
              </div>
            </section>

            {/* API and Data Usage */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">API and Data Usage</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  Our platform integrates with various AI services and APIs. By using our Service, you agree that:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your code and project data may be processed by AI services for educational purposes</li>
                  <li>We use AI services in accordance with their respective terms and privacy policies</li>
                  <li>You maintain ownership of your original code and projects</li>
                  <li>We may use aggregated, anonymized data to improve our educational content</li>
                </ul>
              </div>
            </section>

            {/* User Content and Code */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">User Content and Code</h2>
              <div className="text-white/80 space-y-3">
                <div>
                  <h3 className="font-semibold text-white mb-2">Code Ownership</h3>
                  <p>
                    You retain full ownership of any code, projects, or content you create using our platform.
                    We claim no intellectual property rights over your work.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">License to Us</h3>
                  <p>
                    You grant us a limited license to store, display, and process your code and progress
                    data solely to provide the Service and improve the educational experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Public Sharing</h3>
                  <p>
                    If you choose to share projects publicly or participate in community features,
                    you grant other users permission to view and learn from your shared content.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section className="bg-amber-500/5 rounded-xl p-6 border border-amber-500/20">
              <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Disclaimers & Limitations
              </h2>
              <div className="text-white/80 space-y-3">
                <div>
                  <h3 className="font-semibold text-white mb-2">Service Availability</h3>
                  <p>
                    We strive for high uptime but cannot guarantee uninterrupted service.
                    We may perform maintenance or updates that temporarily affect availability.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Educational Content</h3>
                  <p>
                    Our platform provides educational content &quot;as is.&quot; While we work to ensure
                    accuracy, we cannot guarantee that all information is complete or error-free.
                    Students should verify information and best practices independently.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">AI-Generated Content</h3>
                  <p>
                    Our platform uses AI to provide coding assistance and educational content.
                    AI-generated suggestions should be reviewed and tested before implementation.
                    We are not responsible for issues arising from AI-generated code or advice.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Limitation of Liability</h3>
                  <p>
                    OneWave's total liability is limited to the amount you paid for the Service in the
                    12 months preceding the claim. We are not liable for indirect, incidental,
                    consequential, or punitive damages.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Career Outcomes</h3>
                  <p>
                    While our platform aims to enhance your coding skills and career prospects,
                    we do not guarantee employment, income increases, or specific career outcomes.
                    Success depends on individual effort, market conditions, and other factors beyond our control.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">Termination</h2>
              <div className="text-white/80 space-y-3">
                <p>
                  Either party may terminate your account at any time. You may delete your account
                  through your account settings or by contacting us.
                </p>
                <p>
                  We may terminate accounts that violate these Terms or engage in harmful behavior.
                  Upon termination, your access to premium features will cease.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-secondary mb-4">Changes to Terms</h2>
              <p className="text-white/80">
                We may update these Terms from time to time. Material changes will be communicated
                via email or platform notification. Continued use of the Service constitutes
                acceptance of updated Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-xl font-semibold text-primary mb-4">Governing Law</h2>
              <p className="text-white/80">
                These Terms are governed by the laws of the United States and the state of California,
                without regard to conflict of law principles. Any disputes will be resolved through
                binding arbitration or in the courts of California.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              <div className="text-white/80">
                <p className="mb-3">
                  Questions about these Terms? Contact us at:
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> legal@onewave-ai.com</p>
                  <p><strong>Support:</strong> support@onewave-ai.com</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-700 text-center">
          <p className="text-white/60 text-sm">
            By using OneWave Claude Academy, you agree to these Terms and our{' '}
            <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
