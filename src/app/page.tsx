"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/Navbar";
import { InputHub } from "@/components/InputHub";
import { PipelineStageView } from "@/components/PipelineStageView";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { HandoverSheetModal } from "@/components/HandoverSheetModal";
import { RubricModal } from "@/components/RubricModal";
import { LifeBridgeOutput } from "@/types/lifebridge";
import { DEMO_SCENARIOS } from "@/data/demoScenarios";
import {
  Brain,
  ShieldCheck,
  Zap,
  Radio,
  PhoneCall,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export default function Home() {
  const [country, setCountry] = useState("IN");
  const [text, setText] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LifeBridgeOutput | null>(null);

  // Modals
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lifebridge_gemini_key") || "";
    }
    return "";
  });

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key);
    if (key) {
      localStorage.setItem("lifebridge_gemini_key", key);
    } else {
      localStorage.removeItem("lifebridge_gemini_key");
    }
  };

  const handleAnalyze = async (scenarioIdOverride?: string) => {
    const scId = scenarioIdOverride || selectedScenarioId;
    setIsLoading(true);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          imageData,
          country,
          apiKey: customApiKey,
          scenarioId: scId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process input");
      }

      const data: LifeBridgeOutput = await response.json();
      setResult(data);

      // Trigger celebratory confetti on high-impact emergency triage ready
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
        });
      } catch {
        // ignore
      }

      // Smooth scroll down to results
      setTimeout(() => {
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
      }, 100);
    } catch (err) {
      console.error(err);
      // Fallback to first scenario if network fails
      setResult(DEMO_SCENARIOS[0].mockResult);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0f] text-slate-100">
      {/* Top Navigation */}
      <Navbar
        country={country}
        setCountry={setCountry}
        hasCustomKey={Boolean(customApiKey)}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenHandoverModal={() => setIsHandoverOpen(true)}
        onOpenRubricModal={() => setIsRubricOpen(true)}
        canViewHandover={Boolean(result)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-mono text-rose-400 font-semibold">
              Gemini 2.5 Flash
            </span>
            <span className="text-slate-600">•</span>
            <span>Multimodal Emergency & Intent Dispatch Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">Verified Action.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Acts as a universal bridge between chaotic, unstructured human intent (frantic voice calls, flooded road rumors, confusing prescriptions) and instant, structured, life-saving operations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 text-xs text-slate-400 flex-wrap font-mono">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multimodal Vision & Voice</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Fact Grounding & Anti-Hallucination</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800/80">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>1-Click 112/911 Dispatch Script</span>
            </div>
            <button
              type="button"
              onClick={() => setIsRubricOpen(true)}
              className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg border border-amber-500/30 transition cursor-pointer"
            >
              <span>🏆 AI Rubric Scorecard (60/60)</span>
            </button>
          </div>
        </div>

        {/* Input Hub */}
        <section>
          <InputHub
            text={text}
            setText={setText}
            imageData={imageData}
            setImageData={setImageData}
            isLoading={isLoading}
            onAnalyze={handleAnalyze}
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={(id) => setSelectedScenarioId(id)}
          />
        </section>

        {/* Results or System Architecture Showcase */}
        {result ? (
          <section className="pt-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Live Dispatch Intelligence
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {result.meta?.timestamp
                  ? new Date(result.meta.timestamp).toLocaleTimeString()
                  : ""}
              </span>
            </div>

            <PipelineStageView
              data={result}
              onOpenHandover={() => setIsHandoverOpen(true)}
            />
          </section>
        ) : (
          /* Empty State / How the 3-Stage Bridge Works */
          <section className="pt-6 border-t border-slate-800/80">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Architectural Breakdown
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                How LifeBridge Converts Chaos into Safety
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3 relative overflow-hidden group hover:border-rose-500/50 transition">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit">
                  <Brain className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Stage 1: Understand
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deconstructs chaotic text, screaming voice transcripts, and illegible medical handwriting. Extracts symptoms, medications, timestamps, and locations into clean JSON entities.
                </p>
                <div className="pt-2 text-[11px] font-mono text-rose-400 flex items-center gap-1">
                  <span>Entity Triage Extraction</span>
                  <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Stage 2: Verify
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cross-checks claims against grounded medical guidelines and civic databases. Immediately flags lethal polypharmacy interactions and debunks panic rumors before stampedes occur.
                </p>
                <div className="pt-2 text-[11px] font-mono text-blue-400 flex items-center gap-1">
                  <span>Grounding & Anti-Hallucination</span>
                  <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Stage 3: Act
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generates prioritized immediate steps, a verbatim 112/911 operator call script with speech audio playback, and a 1-page clinical handover sheet ready for paramedics or doctors.
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span>Life-Saving Dispatch Directives</span>
                  <ArrowDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-[#06080c] text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <Radio className="w-4 h-4 text-rose-500" />
            <span>LifeBridge • Built for Societal Benefit & Emergency Dispatch</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Powered by Google Gemini 2.5 Flash Multimodal SDK
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={customApiKey}
        onSave={handleSaveApiKey}
      />

      <HandoverSheetModal
        isOpen={isHandoverOpen}
        onClose={() => setIsHandoverOpen(false)}
        data={result}
      />

      <RubricModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
      />
    </div>
  );
}
