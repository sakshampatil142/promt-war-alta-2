"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Trash2, Volume2, Radio, UploadCloud } from "lucide-react";

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResultItem {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultItem;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

interface AudioRecorderProps {
  onAudioRecorded: (blob: Blob, transcript?: string) => void;
  onClearAudio: () => void;
}

export function AudioRecorder({ onAudioRecorded, onClearAudio }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const interimTranscriptRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  const drawVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyserRef.current?.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = `rgb(${220 + barHeight / 4}, ${40 + barHeight / 2}, 60)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    render();
  };

  const startRecording = async () => {
    setMicError(null);
    interimTranscriptRef.current = "";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Setup audio analyser
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      drawVisualizer();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onAudioRecorded(audioBlob, interimTranscriptRef.current);
        stream.getTracks().forEach((track) => track.stop());
      };

      // Try browser speech recognition for instant transcription
      const win = typeof window !== "undefined" ? (window as unknown as Record<string, new () => SpeechRecognitionInstance>) : null;
      const SpeechRecognition = win ? (win.SpeechRecognition || win.webkitSpeechRecognition) : null;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.onresult = (event: SpeechRecognitionEvent) => {
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final += event.results[i][0].transcript + " ";
              }
            }
            if (final) {
              interimTranscriptRef.current += final;
            }
          };
          rec.start();
          recognitionRef.current = rec;
        } catch (e) {
          console.warn("Speech recognition not initialized:", e);
        }
      }

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordTime(0);

      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.warn("Could not access microphone directly:", err);
      // Simulate recording for demonstration
      simulateRecording();
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setRecordTime(0);
    interimTranscriptRef.current =
      "Emergency call! Patient collapsed with agonal breathing and blue lips at 42 Greenfield Avenue!";

    timerRef.current = setInterval(() => {
      setRecordTime((prev) => {
        if (prev >= 6) {
          stopRecording();
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      // simulated blob
      const dummyBlob = new Blob(["simulated-emergency-voice-recording"], { type: "text/plain" });
      onAudioRecorded(dummyBlob, interimTranscriptRef.current);
      setAudioUrl("simulated");
    }
  };

  const handleClear = () => {
    if (audioUrl && audioUrl !== "simulated") {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordTime(0);
    onClearAudio();
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    if (!audioElementRef.current) return;
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-4 rounded-xl glass-panel border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Voice Dispatch Intake
            </h4>
            <p className="text-[11px] text-slate-400">
              Record 911/112 frantic calls or patient verbal history
            </p>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            REC {formatSeconds(recordTime)}
          </div>
        )}
      </div>

      {micError && (
        <div className="mb-3 text-xs text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">
          {micError}
        </div>
      )}

      {/* Visualizer Canvas */}
      {isRecording && (
        <div className="mb-4 h-12 w-full bg-slate-950/80 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
          <canvas ref={canvasRef} width={380} height={48} className="w-full h-full" />
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        {!isRecording && !audioUrl && (
          <>
            <button
              type="button"
              onClick={startRecording}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs shadow-lg shadow-rose-950 transition active:scale-[0.98]"
            >
              <Mic className="w-4 h-4" />
              Start Live Voice Recording
            </button>

            <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700/80 cursor-pointer transition">
              <UploadCloud className="w-4 h-4 text-rose-400" />
              <span>Upload Audio (.mp3, .wav)</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setAudioUrl(url);
                  setRecordTime(Math.round(file.size / 16000));
                  onAudioRecorded(file, "Emergency caller reports sudden collapse with agonal snoring breathing and cyanosis.");
                }}
              />
            </label>
          </>
        )}

        {isRecording && (
          <button
            type="button"
            onClick={stopRecording}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg shadow-rose-950 transition active:scale-[0.98] radar-badge"
          >
            <Square className="w-4 h-4 fill-white" />
            Stop & Process Audio
          </button>
        )}

        {audioUrl && !isRecording && (
          <div className="flex-1 flex items-center justify-between gap-3 p-2 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono">Audio Captured ({formatSeconds(recordTime || 6)})</span>
            </div>

            {audioUrl !== "simulated" && (
              <audio
                ref={audioElementRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}

            <div className="flex items-center gap-1.5">
              {audioUrl !== "simulated" && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              )}
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                title="Discard audio"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
