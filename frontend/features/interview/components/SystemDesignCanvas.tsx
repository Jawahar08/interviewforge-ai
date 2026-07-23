"use client";

import { useState } from "react";
import { Network, Plus, Trash2, Sparkles, Server, Database, Cpu, Layers, HardDrive, ShieldCheck, RefreshCw } from "lucide-react";

export interface CanvasComponent {
  id: string;
  name: string;
  type: "CLIENT" | "LOAD_BALANCER" | "SERVICE" | "DATABASE" | "CACHE" | "QUEUE" | "CDN";
  notes: string;
}

const PALETTE: { type: CanvasComponent["type"]; name: string; icon: any; color: string }[] = [
  { type: "CLIENT", name: "Client / Mobile App", icon: Layers, color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
  { type: "LOAD_BALANCER", name: "Load Balancer (NGINX/ALB)", icon: Cpu, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { type: "SERVICE", name: "Backend Service (Spring Boot)", icon: Server, color: "text-violet-400 border-violet-500/30 bg-violet-500/10" },
  { type: "DATABASE", name: "Primary Database (PostgreSQL)", icon: Database, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { type: "CACHE", name: "In-Memory Cache (Redis)", icon: HardDrive, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
  { type: "QUEUE", name: "Message Queue (Kafka)", icon: Layers, color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" },
];

export function SystemDesignCanvas() {
  const [components, setComponents] = useState<CanvasComponent[]>([
    { id: "c1", name: "Client / Mobile App", type: "CLIENT", notes: "User HTTP/REST Client" },
    { id: "c2", name: "Load Balancer (NGINX/ALB)", type: "LOAD_BALANCER", notes: "Round Robin distribution" },
    { id: "c3", name: "Backend Service (Spring Boot)", type: "SERVICE", notes: "Stateless microservice" },
    { id: "c4", name: "Primary Database (PostgreSQL)", type: "DATABASE", notes: "Read-Write Master" },
  ]);

  const [aiReview, setAiReview] = useState<{
    architectureScore: number;
    singlePointsOfFailure: string[];
    scalabilityPros: string[];
    recommendations: string[];
  } | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const addComponent = (item: (typeof PALETTE)[0]) => {
    const newComp: CanvasComponent = {
      id: "c_" + Date.now(),
      name: item.name,
      type: item.type,
      notes: "Configured component",
    };
    setComponents((prev) => [...prev, newComp]);
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const runArchitectureReview = () => {
    setIsReviewing(true);
    setTimeout(() => {
      setAiReview({
        architectureScore: 88,
        singlePointsOfFailure: [
          "Primary Database has no Read Replica configured for failover.",
        ],
        scalabilityPros: [
          "Stateless backend services allow easy horizontal scaling.",
          "Load Balancer successfully decouples client requests.",
        ],
        recommendations: [
          "Add a Redis cache layer to handle high read throughput and reduce DB load.",
          "Introduce a Message Queue (Kafka/RabbitMQ) for asynchronous task processing.",
        ],
      });
      setIsReviewing(false);
    }, 600);
  };

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Network className="w-4 h-4" />
          <span>System Design Architecture Canvas</span>
        </div>

        <button
          type="button"
          onClick={runArchitectureReview}
          disabled={isReviewing}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-500/10 transition-all self-start sm:self-auto"
        >
          {isReviewing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>AI System Architecture Audit</span>
        </button>
      </div>

      {/* Palette Tools */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-mono text-zinc-400">Add Architecture Node</span>
        <div className="flex flex-wrap gap-2">
          {PALETTE.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addComponent(p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-transform active:scale-95 ${p.color}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive System Canvas Graph Grid */}
      <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 min-h-[220px]">
        <div className="text-[10px] uppercase font-mono text-zinc-500 mb-3 flex items-center justify-between">
          <span>Active Topology ({components.length} nodes connected)</span>
          <span className="text-zinc-600">Client → Load Balancer → Service → Data Layers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {components.map((comp, idx) => (
            <div
              key={comp.id}
              className="group p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between hover:border-violet-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-bold font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate max-w-[120px]">
                    {comp.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => removeComponent(comp.id)}
                  className="text-zinc-600 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={comp.notes}
                onChange={(e) => {
                  const val = e.target.value;
                  setComponents((prev) =>
                    prev.map((c) => (c.id === comp.id ? { ...c, notes: val } : c))
                  );
                }}
                className="w-full bg-zinc-900/80 px-2.5 py-1 rounded text-[11px] font-mono text-zinc-300 border border-zinc-800 focus:outline-none focus:border-violet-500"
                placeholder="Component notes..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI Architecture Audit Results */}
      {aiReview && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/30 via-zinc-900/60 to-indigo-950/30 border border-violet-500/30 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI System Architecture Review</span>
            </div>
            <div className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-xs font-mono">
              Rating: {aiReview.architectureScore}/100
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400">Single Points of Failure (SPOF):</span>
              <ul className="list-disc pl-4 text-zinc-300 mt-0.5">
                {aiReview.singlePointsOfFailure.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400">Scalability Pros:</span>
              <ul className="list-disc pl-4 text-zinc-300 mt-0.5">
                {aiReview.scalabilityPros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">Recommended Enhancements:</span>
              <ul className="list-disc pl-4 text-zinc-300 mt-0.5">
                {aiReview.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
