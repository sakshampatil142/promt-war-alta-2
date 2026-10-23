"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FileText,
  UploadCloud,
  X,
  Sparkles,
  RefreshCw,
  Send,
  Stethoscope,
  ShieldAlert,
  HeartPulse,
  Scale,
  Mic,
  Camera,
} from "lucide-react";
import { DEMO_SCENARIOS } from "@/data/demoScenarios";
import { AudioRecorder } from "./AudioRecorder";

interface InputHubProps {
  text: string;
  setText: (t: string) => void;
  imageData: string | null;
  setImageData: (img: string | null) => void;
  isLoading: boolean;
  onAnalyze: (scenarioId?: string) => void;
  selectedScenarioId: string | null;
  onSelectScenario: (id: string) => void;
}

export function InputHub({
  text,
  setText,
  imageData,
  setImageData,
  isLoading,
  onAnalyze,
  selectedScenarioId,
  onSelectScenario,
}: InputHubProps) {
  const [activeTab, setActiveTab] = useState<"text" | "audio" | "image">("text");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleScenarioClick = (scId: string) => {
    onSelectScenario(scId);
    const sc = DEMO_SCENARIOS.find((s) => s.id === scId);
    if (sc) {
      setText(sc.sampleText);
      setImageData(sc.imagePreviewUrl || null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full space-y-4">
      {/* Preloaded High-Impact Demo Scenarios Header */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            ⚡ Quick-Test Real Scenarios
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any case to test multimodal parsing
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = selectedScenarioId === sc.id;
            const Icon =
              sc.iconName === "Stethoscope"
                ? Stethoscope
                : sc.iconName === "ShieldAlert"
                ? ShieldAlert
                : sc.iconName === "HeartPulse"
                ? HeartPulse
                : Scale;

            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioClick(sc.id)}
                className={`relative p-3 text-left rounded-xl transition border group ${
                  isSelected
                    ? "bg-slate-800/90 border-rose-500/80 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/50"
                    : "glass-panel hover:bg-slate-800/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected
                        ? "bg-rose-500 text-white"
                        : "bg-slate-800 text-slate-300 group-hover:text-white"
                    } transition`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : "bg-slate-800/60 text-slate-400 border-slate-700/60"
                    }`}
                  >
                    {sc.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                  {sc.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                  {sc.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Container */}
      <div className="rounded-2xl glass-panel border border-slate-800/80 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        {/* Input Mode Selector Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 flex-wrap gap-2">
          <div role="tablist" aria-label="Input Modality Selection" className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "text"}
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-rose-500 ${
                activeTab === "text"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Frantic Text</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "audio"}
              onClick={() => setActiveTab("audio")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-rose-500 ${
                activeTab === "audio"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Mic className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Voice Call / Audio</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "image"}
              onClick={() => setActiveTab("image")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-rose-500 ${
                activeTab === "image"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Photo / Document</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {(text || imageData) && (
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setImageData(null);
                }}
                className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Clear Input
              </button>
            )}
            <span className="text-[11px] font-mono text-slate-500" aria-live="polite">
              {text.length} chars
            </span>
          </div>
        </div>

        {/* Tab Content: Audio Recorder */}
        {activeTab === "audio" && (
          <div className="mb-4">
            <AudioRecorder
              onAudioRecorded={(_blob, transcript) => {
                if (transcript) {
                  setText(transcript);
                }
              }}
              onClearAudio={() => {
                // keep text or let user decide
              }}
            />
          </div>
        )}

        {/* Tab Content: Image Dropzone */}
        {activeTab === "image" && (
          <div className="mb-4">
            {!imageData ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/80 hover:border-rose-500/60 rounded-xl p-6 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-900/40 transition group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 mx-auto text-slate-500 group-hover:text-rose-400 transition mb-2" />
                <p className="text-xs font-semibold text-slate-300 group-hover:text-white">
                  Drop messy handwritten notes, medical charts, or disaster photos here
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supports PNG, JPG, WebP (up to 10MB)
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 flex items-center p-3 gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                  <Image
                    src={imageData}
                    alt="Upload preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    Multimodal Document Attached
                  </p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Ready for Gemini Vision parsing
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setImageData(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Textarea for Unstructured Human Intent */}
        <div className="relative">
          <label htmlFor="emergency-input-textarea" className="sr-only">
            Raw Unstructured Emergency Information
          </label>
          <textarea
            id="emergency-input-textarea"
            aria-label="Raw Unstructured Emergency Information"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type raw, messy, frantic information here... (e.g. frantic 112 emergency calls, fragmented doctor prescriptions, conflicting flood notices, or legal insurance forms)"
            rows={4}
            className="w-full px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 bg-slate-950/60 rounded-xl border border-slate-800/80 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 transition font-sans resize-y"
          />

          {/* Quick Image Pill if attached while on text tab */}
          {imageData && activeTab !== "image" && (
            <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>1 Image Attached ({imageData.startsWith("/samples") ? "Preset Demo Document" : "Custom Upload"})</span>
              <button
                type="button"
                onClick={() => setImageData(null)}
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Action Button Row */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Converts to verified 3-stage triage pipeline</span>
          </div>

          <button
            type="button"
            disabled={isLoading || (!text.trim() && !imageData)}
            onClick={() => onAnalyze()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs shadow-lg shadow-rose-950/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Gemini Analyzing Intent & Grounding...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                <span>Run Gemini Dispatch Bridge</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
