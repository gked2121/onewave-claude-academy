import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LayoutErrorBoundary } from "@/components/ErrorBoundary";
import StructuredData from "@/components/StructuredData";
import ConditionalBackground from "@/components/ConditionalBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://claude-academy.onewave.ai'),
  title: {
    default: "OneWave Claude Academy - Master the Anthropic Ecosystem",
    template: "%s | Claude Academy",
  },
  description: "Learn Claude Chat, Claude Code, MCP, Anthropic API, and Enterprise deployment. Gamified training platform for teams and individuals. Certifications included.",
  keywords: [
    "Claude AI training",
    "Anthropic courses",
    "Claude Code tutorial",
    "MCP development",
    "Claude Enterprise",
    "AI assistant training",
    "Claude API course",
    "prompt engineering",
    "AI skills development",
    "team AI training",
    "business AI education",
    "Claude certification"
  ],
  authors: [{ name: "OneWave AI", url: "https://onewave.ai" }],
  creator: "OneWave AI",
  publisher: "OneWave Claude Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://claude-academy.onewave.ai',
    siteName: 'OneWave Claude Academy',
    title: 'OneWave Claude Academy - Master the Anthropic Ecosystem',
    description: 'Learn Claude Chat, Claude Code, MCP, and Enterprise deployment. Gamified training with certifications for teams and individuals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OneWave Claude Academy - AI Training Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneWave Claude Academy',
    description: 'Master the complete Anthropic Claude ecosystem. From Chat to Code to Enterprise.',
    images: ['/og-image.png'],
    creator: '@onewave_ai',
  },
  alternates: {
    canonical: 'https://claude-academy.onewave.ai',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <LayoutErrorBoundary>
          <ProgressProvider>
            <ConditionalBackground />
            <div className="relative z-10">
              <Header />
              <main className="py-6 px-4 max-w-[1600px] mx-auto">
                {children}
              </main>
              <Footer />
            </div>
          </ProgressProvider>
        </LayoutErrorBoundary>
      </body>
    </html>
  );
}
