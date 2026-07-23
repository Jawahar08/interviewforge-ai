"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Mic, MicOff, Volume2, Activity, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export interface SpeechMetrics {
  fillerWordsCount: number;
  detectedFillers: string[];
  wordsPerMinute: number;
  confidenceScore: number;
  totalWords: number;
  durationSeconds: number;
}

interface Props {
  onTranscriptChange: (transcript: string) => void;
  onMetricsChange?: (metrics: SpeechMetrics) => void;
}

export function VoiceRecorder({ onTranscriptChange, onMetricsChange }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Speech Metrics State
  const [metrics, setMetrics] = useState<SpeechMetrics>({
    fillerWordsCount: 0,
    detectedFillers: [],
    wordsPerMinute: 0,
    confidenceScore: 85,
    totalWords: 0,
    durationSeconds: 0,
  });

  // Calculate Speech Metrics
  const analyzeSpeechMetrics = useCallback((fullText: string, elapsedSec: number) => {
    const textLower = fullText.toLowerCase();
    const fillerPatterns = ["um", "uh", "like", "you know", "basically", "actually", "i mean", "sort of"];
    const detected: string[] = [];
    let fillerCount = 0;

    fillerPatterns.forEach((filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, "gi");
      const matches = textLower.match(regex);
      if (matches) {
        fillerCount += matches.length;
        if (!detected.includes(filler)) {
          detected.push(filler);
        }
      }
    });

    const words = fullText.trim().split(/\s+/).filter(Boolean);
    const totalWords = words.length;

    const safeElapsedMinutes = Math.max(0.1, elapsedSec / 60);
    const wpm = Math.round(totalWords / safeElapsedMinutes);

    // Calculate Confidence Score (0 - 100)
    // Penalize filler frequency & extreme WPM (<90 or >180)
    let score = 90;
    const fillerRatio = totalWords > 0 ? fillerCount / totalWords : 0;
    score -= Math.round(fillerRatio * 150); // High penalty for filler words

    if (wpm > 0 && (wpm < 100 || wpm > 170)) {
      score -= 10;
    }

    if (totalWords > 30) {
      score += 5;
    }

    const confidenceScore = Math.min(98, Math.max(45, score));

    const updatedMetrics: SpeechMetrics = {
      fillerWordsCount: fillerCount,
      detectedFillers: detected,
      wordsPerMinute: wpm,
      confidenceScore,
      totalWords,
      durationSeconds: elapsedSec,
    };

    setMetrics(updatedMetrics);
    if (onMetricsChange) {
      onMetricsChange(updatedMetrics);
    }
  }, [onMetricsChange]);

  // Timer Effect while listening
  useEffect(() => {
    if (isListening) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setDurationSeconds(elapsed);
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isListening]);

  // Re-run metrics calculation as transcript updates
  useEffect(() => {
    analyzeSpeechMetrics(transcript + " " + interimTranscript, durationSeconds);
  }, [transcript, interimTranscript, durationSeconds, analyzeSpeechMetrics]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalStr = "";
      let interimStr = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalStr += result[0].transcript + " ";
        } else {
          interimStr += result[0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => {
          const newText = (prev + " " + finalStr).trim();
          onTranscriptChange(newText);
          return newText;
        });
      }

      setInterimTranscript(interimStr);
    };

    recognition.onerror = (err: any) => {
      console.warn("Speech Recognition notice:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscriptChange]);

  const toggleListening = () => {
    if (!supported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInterimTranscript("");
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {
        // Handle restart
        recognitionRef.current?.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
          setIsListening(true);
        }, 100);
      }
    }
  };

  const clearAudio = () => {
    setTranscript("");
    setInterimTranscript("");
    setDurationSeconds(0);
    onTranscriptChange("");
  };

  if (!supported) {
    return (
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge for Voice AI mode.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-xl">
      {/* Recorder Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleListening}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${
              isListening
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 animate-pulse"
                : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Stop Listening</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Start Voice AI Answer</span>
              </>
            )}
          </button>

          {isListening && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>LIVE • {durationSeconds}s</span>
            </div>
          )}
        </div>

        {/* Clear Button */}
        {transcript && (
          <button
            type="button"
            onClick={clearAudio}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 self-end sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Transcript</span>
          </button>
        )}
      </div>

      {/* Audio Waveform Indicator */}
      {isListening && (
        <div className="flex items-center justify-center gap-1 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <Volume2 className="w-4 h-4 text-violet-400 mr-2" />
          {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30, 70, 50].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [12, h / 2.5, 12] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
              className="w-1 rounded-full bg-gradient-to-t from-violet-500 to-indigo-400"
            />
          ))}
          <span className="text-xs font-mono text-violet-300 ml-2">Listening to candidate speech...</span>
        </div>
      )}

      {/* Live Speech Analysis Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold mb-1 flex items-center gap-1">
            <Activity className="w-3 h-3 text-violet-400" />
            Speech Pace
          </div>
          <div className="text-base font-extrabold text-white">
            {metrics.wordsPerMinute} <span className="text-xs text-zinc-500 font-normal">WPM</span>
          </div>
          <div className="text-[9px] text-zinc-500 mt-0.5">Optimal: 120-160 WPM</div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold mb-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Filler Words
          </div>
          <div className="text-base font-extrabold text-white">
            {metrics.fillerWordsCount} <span className="text-xs text-zinc-500 font-normal">fillers</span>
          </div>
          <div className="text-[9px] text-zinc-500 truncate mt-0.5">
            {metrics.detectedFillers.length > 0 ? metrics.detectedFillers.join(", ") : "Clean articulation"}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Confidence Index
          </div>
          <div className="text-base font-extrabold text-white">
            {metrics.confidenceScore}%
          </div>
          <div className="text-[9px] text-zinc-500 mt-0.5">Tone & pace rating</div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold mb-1">
            Total Words
          </div>
          <div className="text-base font-extrabold text-white">
            {metrics.totalWords} <span className="text-xs text-zinc-500 font-normal">words</span>
          </div>
          <div className="text-[9px] text-zinc-500 mt-0.5">{durationSeconds}s duration</div>
        </div>
      </div>

      {/* Transcript Text Container */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 min-h-[100px] max-h-[180px] overflow-y-auto font-mono text-xs leading-relaxed text-zinc-200">
        {transcript || interimTranscript ? (
          <>
            <span>{transcript}</span>
            <span className="text-violet-400 font-semibold italic">{interimTranscript}</span>
          </>
        ) : (
          <span className="text-zinc-600 italic font-sans">
            Click &quot;Start Voice AI Answer&quot; and speak into your microphone. Your spoken response will be transcribed in real time.
          </span>
        )}
      </div>
    </div>
  );
}
