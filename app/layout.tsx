import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import AchievementNotifications from "@/components/AchievementNotifications";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Claude Quest - Master Claude AI in 10 Fun Levels",
    template: "%s | Claude Quest",
  },
  description: "Master Claude AI, Artifacts, Projects, and MCP through gamified learning. Unlock skills, earn achievements, and get real results — one level at a time. Start free today!",
  keywords: [
    "Claude AI tutorial",
    "Claude course",
    "learn Claude",
    "Claude Artifacts",
    "Claude Projects",
    "MCP Model Context Protocol",
    "Claude Desktop",
    "Claude training",
    "gamified learning",
    "AI education",
    "prompt engineering",
    "Claude mastery",
    "AI learning platform",
  ],
  authors: [{ name: "OneWave AI", url: "https://onewave-ai.com" }],
  creator: "OneWave AI",
  publisher: "Claude Quest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950 text-white min-h-screen overflow-x-hidden`}
      >
        <AnimatedBackground />
        <ProgressProvider>
          <div className="relative z-10">
            <Header />
            <main className="pt-24 px-4 max-w-7xl mx-auto">
              {children}
            </main>
            <footer className="mt-20 py-8 border-t border-orange-500/20">
              <div className="max-w-7xl mx-auto px-4 text-center text-orange-300 text-sm">
                <p>&copy; 2026 OneWave AI. Master Claude AI through gamified learning.</p>
              </div>
            </footer>
          </div>
          <AchievementNotifications />
        </ProgressProvider>
      </body>
    </html>
  );
}
