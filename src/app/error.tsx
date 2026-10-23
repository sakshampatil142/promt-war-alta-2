"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("LifeBridge runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080a0f] text-slate-200 p-6 text-center">
      <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-white font-mono">
        Triage Interface Exception Encountered
      </h2>
      <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
        An unexpected error occurred while processing client triage signals. The offline recovery fallback is active.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-lg shadow-rose-950"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reload Interface</span>
      </button>
    </div>
  );
}
