import React from "react";
import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080a0f] text-slate-200">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 shadow-xl shadow-rose-950/60 mb-4 animate-pulse">
        <Activity className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white">
        Initializing LifeBridge Universal Dispatch
      </h2>
      <p className="text-xs text-slate-400 mt-1">
        Loading Gemini 2.5 Flash Triage Engine...
      </p>
    </div>
  );
}
