"use client";

import React, { useState } from "react";
import {
  LifeBridgeOutput,
  FactClaim,
  ActionStep,
  ExtractedEntity,
} from "@/types/lifebridge";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  FileCheck2,
  MapPin,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Brain,
  Zap,
} from "lucide-react";

interface PipelineStageViewProps {
  data: LifeBridgeOutput;
  onOpenHandover: () => void;
}

export function PipelineStageView({ data, onOpenHandover }: PipelineStageViewProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "understand" | "verify" | "act">("all");

  const {
    severity,
    severityReason,
    detectedLanguage,
    locationIdentified,
    understandPhase,
    verifyPhase,
    actionPlan,
    emergencyContacts,
    missingInfoQuestions,
    safetyDisclaimer,
    meta,
  } = data;

  const handleSpeak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(actionPlan.operatorScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 1500);
  };

  const getSeverityStyle = (s: string) => {
    switch (s) {
      case "CRITICAL":
        return {
          bg: "bg-red-500/15 border-red-500/40 text-red-400",
          badge: "bg-red-500 text-white radar-badge",
          glow: "border-red-500/40 shadow-red-950/50",
        };
      case "URGENT":
        return {
          bg: "bg-amber-500/15 border-amber-500/40 text-amber-400",
          badge: "bg-amber-500 text-black font-bold",
          glow: "border-amber-500/40 shadow-amber-950/50",
        };
      case "IMPORTANT":
        return {
          bg: "bg-blue-500/15 border-blue-500/40 text-blue-400",
          badge: "bg-blue-500 text-white",
          glow: "border-blue-500/40 shadow-blue-950/50",
        };
      default:
        return {
          bg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
          badge: "bg-emerald-500 text-white",
          glow: "border-emerald-500/40 shadow-emerald-950/50",
        };
    }
  };

  const sevStyle = getSeverityStyle(severity);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Triage Verdict Banner */}
      <div
        className={`rounded-2xl p-5 border glass-panel shadow-2xl relative overflow-hidden ${sevStyle.glow}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest ${sevStyle.badge}`}
            >
              {severity} TRIAGE
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {locationIdentified || "Location Unknown"}
              </span>
              <span className="text-slate-600">•</span>
              <span className="uppercase text-slate-400">Lang: {detectedLanguage}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {meta && (
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{meta.modelUsed}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">{meta.latencyMs}ms</span>
              </div>
            )}
            <button
              onClick={onOpenHandover}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Handover Sheet</span>
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-100 font-medium leading-relaxed">
          {severityReason}
        </p>
      </div>

      {/* 3-Stage Pipeline Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === "all"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Complete 3-Stage Pipeline
        </button>
        <button
          onClick={() => setActiveTab("understand")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            activeTab === "understand"
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Brain className="w-3.5 h-3.5 text-rose-400" />
          <span>Stage 1: Understand</span>
        </button>
        <button
          onClick={() => setActiveTab("verify")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            activeTab === "verify"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Stage 2: Verify ({verifyPhase.overallConfidence}%)</span>
        </button>
        <button
          onClick={() => setActiveTab("act")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            activeTab === "act"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Stage 3: Act ({actionPlan.immediateSteps.length} Steps)</span>
        </button>
      </div>

      {/* STAGE 1: UNDERSTAND */}
      {(activeTab === "all" || activeTab === "understand") && (
        <div className="rounded-2xl glass-panel border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Stage 1: Deconstruct Chaotic Human Intent
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {understandPhase.extractedEntities.length} Entities Parsed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] uppercase font-mono font-semibold text-rose-400">
                Core Intent Extracted
              </span>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                {understandPhase.coreIntent}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-400">
                Raw Input Synthesis
              </span>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {understandPhase.rawInputSummary}
              </p>
            </div>
          </div>

          {/* Extracted Entities Grid */}
          <div>
            <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block mb-2">
              Structured Entity Intelligence
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {understandPhase.extractedEntities.map((ent: ExtractedEntity, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {ent.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        {ent.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {ent.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Facts list */}
          {understandPhase.keyFacts?.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block mb-1.5">
                Key Established Facts
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {understandPhase.keyFacts.map((fact: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: VERIFY */}
      {(activeTab === "all" || activeTab === "verify") && (
        <div className="rounded-2xl glass-panel border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Stage 2: Cross-Verification & Grounding
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Reliability Score:</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 font-mono font-bold text-xs">
                <span>{verifyPhase.overallConfidence}%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              </div>
            </div>
          </div>

          {/* Grounding Assessment Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20 text-xs text-slate-300 leading-relaxed">
            <span className="text-[10px] uppercase font-mono font-semibold text-blue-400 block mb-1">
              Grounding & Safety Analysis
            </span>
            {verifyPhase.groundingAssessment}
          </div>

          {/* Claims Check Breakdown */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block">
              Claim Consistency & Misinformation Check
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {verifyPhase.claims.map((claim: FactClaim, idx: number) => {
                const isVerified = claim.status === "VERIFIED";
                const isContradicted = claim.status === "CONTRADICTED";

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition ${
                      isContradicted
                        ? "bg-red-500/10 border-red-500/40 text-red-200"
                        : isVerified
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                        : "bg-slate-900/60 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {isContradicted ? (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : isVerified ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs font-semibold">{claim.claim}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 bg-slate-950/60">
                        {claim.status} ({claim.confidence}%)
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90 pl-5.5 mt-0.5 leading-snug">
                      {claim.sourceOrReason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contradictions Alert */}
          {verifyPhase.contradictions && verifyPhase.contradictions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] uppercase text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                Critical Contradiction / Dangerous Error Flagged
              </div>
              <ul className="pl-5 list-disc space-y-0.5 text-[11px]">
                {verifyPhase.contradictions.map((c: string, idx: number) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* STAGE 3: ACT */}
      {(activeTab === "all" || activeTab === "act") && (
        <div className="rounded-2xl glass-panel border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Stage 3: Verified Life-Saving Action Plan
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-semibold">
              Execution Protocol Ready
            </span>
          </div>

          {/* Prioritized "Do This Now" Steps */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block">
              Prioritized Immediate Directives
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {actionPlan.immediateSteps.map((step: ActionStep) => {
                const isDoNow = step.urgencyLevel === "DO_NOW";

                return (
                  <div
                    key={step.order}
                    className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition ${
                      isDoNow
                        ? "bg-rose-500/10 border-rose-500/40 shadow-sm"
                        : "bg-slate-950/60 border-slate-800"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg font-mono font-bold text-xs shrink-0 ${
                        isDoNow
                          ? "bg-rose-500 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {step.order}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="text-xs font-bold text-white">
                          {step.action}
                        </h4>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            isDoNow
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {step.urgencyLevel.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operator Read-Aloud Script (Interactive Speech & Copy) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                  1-Click Dispatch Read-Aloud Script
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeak(actionPlan.operatorScript)}
                  aria-label={isSpeaking ? "Stop Voice Read Aloud" : "Read Aloud Dispatch Script"}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isSpeaking
                      ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyScript}
                  aria-label="Copy Operator Dispatch Script"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <blockquote className="p-3 rounded-lg bg-slate-900/90 border-l-4 border-rose-500 text-xs text-slate-100 italic leading-relaxed font-sans">
              &quot;{actionPlan.operatorScript}&quot;
            </blockquote>
            <p className="text-[11px] text-slate-500">
              Tip: Read this verbatim when calling 112/911. It delivers location, symptoms, and urgency without panic hesitation.
            </p>
          </div>

          {/* Emergency Contacts Direct Dial Cards */}
          {emergencyContacts?.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 block mb-2">
                Localized Direct Emergency Contact Routing
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {emergencyContacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.number.split(" ")[0].replace(/[^0-9]/g, "")}`}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-rose-500/60 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-rose-400 transition">
                          {contact.serviceName}
                        </span>
                        <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {contact.recommendedAction}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-rose-400">
                        {contact.number}
                      </span>
                      <span className="text-[10px] text-slate-500 group-hover:text-slate-300 inline-flex items-center gap-0.5">
                        Dial <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Missing Info Questions (Dynamic Refinement) */}
          {missingInfoQuestions?.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-mono font-semibold text-amber-400 block">
                Critical Missing Information to Clarify
              </span>
              <div className="space-y-1.5">
                {missingInfoQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs text-slate-300">
                    <p className="font-semibold text-white">
                      Q{idx + 1}: {q.question}
                    </p>
                    <p className="text-[11px] text-slate-400 pl-4 border-l-2 border-slate-700 mt-0.5">
                      Impact: {q.impactOnAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Safety Disclaimer Footer */}
      <div className="p-3 text-center text-[11px] text-slate-500 border-t border-slate-800/60">
        <p>{safetyDisclaimer}</p>
      </div>
    </div>
  );
}
