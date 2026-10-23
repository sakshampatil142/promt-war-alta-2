import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080a0f] text-slate-200 p-6 text-center">
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white font-mono">404 - Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
        The emergency route or dispatch document you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dispatch Hub</span>
      </Link>
    </div>
  );
}
