import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "LifeBridge | Gemini Universal Emergency & Intent Dispatch",
  description:
    "A Gemini-powered platform that transforms messy, unstructured real-world inputs (voice, notes, disaster alerts, medical history) into structured, verified, and life-saving actions.",
  keywords: [
    "Gemini",
    "PromptWars",
    "Emergency Response",
    "Multimodal AI",
    "Societal Benefit",
    "Triage Assistant",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable} dark`}>
      <body className="min-h-screen bg-[#090b10] text-[#f1f5f9] antialiased selection:bg-rose-600/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
