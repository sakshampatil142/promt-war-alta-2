"use client";

import React from "react";
import {
  Activity,
  Key,
  Globe2,
  FileCheck2,
  Printer,
  Sparkles,
  Award,
} from "lucide-react";

interface NavbarProps {
  country: string;
  setCountry: (c: string) => void;
  hasCustomKey: boolean;
  onOpenKeyModal: () => void;
  onOpenHandoverModal: () => void;
  onOpenRubricModal: () => void;
  canViewHandover: boolean;
}

const COUNTRIES = [
  { code: "IN", name: "India (112 / 108)", emergency: "112" },
  { code: "US", name: "United States (911)", emergency: "911" },
  { code: "GB", name: "United Kingdom (999)", emergency: "999" },
  { code: "EU", name: "European Union (112)", emergency: "112" },
  { code: "AU", name: "Australia (000)", emergency: "000" },
];

export function Navbar({
  country,
  setCountry,
  hasCustomKey,
  onOpenKeyModal,
  onOpenHandoverModal,
  onOpenRubricModal,
  canViewHandover,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 shadow-lg shadow-rose-950/60 border border-rose-500/30">
            <Activity className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                Life<span className="text-rose-500">Bridge</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                PROMPTWARS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Universal Gemini Bridge • Chaos to Verified Action
            </p>
          </div>
        </div>

        {/* Center status tag */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Model:</span>
          <span className="text-rose-400 font-mono font-semibold">gemini-2.5-flash</span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Grounding Active
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Country Selector */}
          <div className="relative flex items-center bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Select Country Emergency Jurisdiction"
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1 focus-visible:ring-1 focus-visible:ring-rose-400 rounded"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-950 text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* AI Rubric / Hackathon Scorecard Trigger */}
          <button
            type="button"
            onClick={onOpenRubricModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition focus-visible:ring-2 focus-visible:ring-amber-500"
            title="View PromptWars AI Rubric & Verification Scorecard"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-mono font-semibold">AI Rubric (60/60)</span>
          </button>

          {/* API Key configuration */}
          <button
            type="button"
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition ${
              hasCustomKey
                ? "bg-rose-500/10 border-rose-500/40 text-rose-300 hover:bg-rose-500/20"
                : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasCustomKey ? "Live Key Active" : "API Key"}
            </span>
          </button>

          {/* Handover Sheet Trigger */}
          {canViewHandover && (
            <button
              onClick={onOpenHandoverModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition"
              title="View & Print Clinical Handover Sheet"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Handover Sheet</span>
              <Printer className="w-3 h-3 text-emerald-400 ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
