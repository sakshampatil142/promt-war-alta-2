"use client";

import React, { useState } from "react";
import { Key, X, Check, ExternalLink, ShieldCheck } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSave: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, apiKey, onSave }: ApiKeyModalProps) {
  const [val, setVal] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(val.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setVal("");
    onSave("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl glass-panel border border-slate-700/60 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Gemini API Key</h3>
              <p className="text-xs text-slate-400">Optional: Use your live key or demo engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            By default, <strong>LifeBridge</strong> runs with an offline intelligent simulation engine loaded with pre-verified emergency triage knowledge. You can provide your Google Gemini API Key for live multimodal inference with <code className="text-rose-300 bg-slate-900 px-1 py-0.5 rounded">gemini-2.5-flash</code>.
          </p>

          <div>
            <label className="block mb-1 text-xs font-medium text-slate-300">
              Google AI Studio Key:
            </label>
            <input
              type="password"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 text-sm text-white bg-slate-950/80 rounded-lg border border-slate-700 focus:outline-none focus:border-rose-500 font-mono transition"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 underline underline-offset-2"
            >
              Get free key on Google AI Studio
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                onClick={handleClear}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Clear key
              </button>
            )}
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Key is stored only in your local browser session storage.</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 rounded-lg transition shadow-lg shadow-rose-950"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              "Apply Key"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
