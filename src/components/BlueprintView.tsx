import React, { useState } from "react";
import { BlueprintResponse } from "../types";
import { Terminal, Cpu, Database, Blocks, Layers, Sparkles, CheckCircle2, Calendar, FileJson, Copy, Check } from "lucide-react";

interface BlueprintViewProps {
  blueprint: BlueprintResponse;
  onReset: () => void;
}

export default function BlueprintView({ blueprint, onReset }: BlueprintViewProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "json">("visual");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0e0e0e] border border-white/10 rounded-none p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,209,0.05)] relative overflow-hidden backdrop-blur-xl">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent pointer-events-none" />

      {/* Blueprint Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-widest mb-2 font-bold select-none">
            <span className="inline-block w-2.5 h-2.5 bg-accent animate-pulse" />
            [ LIVE OPTIGRID ARCHITECTURAL BLUEPRINT ]
          </div>
          <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
            {blueprint.projectName || "Custom Proposal"}
          </h3>
          <p className="text-white/60 text-xs mt-1 font-mono mb-2.5">
            // {blueprint.headline || "Tailored system blueprint and budget roadmap"}
          </p>
          {blueprint.estimatedCost && (
            <div className="inline-flex items-center gap-1.5 bg-[#FF80E3]/10 border border-[#FF80E3]/40 text-[#FF80E3] font-mono text-[10px] uppercase font-black px-2.5 py-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF80E3] animate-pulse" />
              ESTIMATED DEPLOYMENT COST: {blueprint.estimatedCost}
            </div>
          )}
        </div>

        {/* Tab Controls / Top action */}
        <div className="flex items-center gap-3">
          <div className="flex bg-black p-1 rounded-none border border-white/10">
            <button
              onClick={() => setActiveTab("visual")}
              className={`px-3.5 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-wider transition-all ${
                activeTab === "visual"
                  ? "bg-white/10 text-accent font-bold"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              System Designer
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`px-3.5 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-wider transition-all ${
                activeTab === "json"
                  ? "bg-white/10 text-accent font-bold"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              Schema JSON
            </button>
          </div>

          <button
            onClick={copyToClipboard}
            className="p-2.5 rounded-none bg-black border border-white/10 hover:border-accent transition-colors text-white/50 hover:text-accent"
            title="Copy Raw Data"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {activeTab === "visual" ? (
        <div className="space-y-8">
          {/* Tech Spec Grid */}
          <div>
            <h4 className="flex items-center gap-2 font-mono font-bold text-white/40 text-[10px] uppercase tracking-widest mb-4">
              <Blocks className="w-3.5 h-3.5 text-accent" /> TECHNICAL STACK CONFIGURATION
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Frontend Card */}
              <div className="bg-black/85 border border-white/10 p-5 rounded-none flex items-start gap-3">
                <div className="bg-accent/10 text-accent p-2 rounded-none mt-0.5 border border-accent/20">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-white/40 block uppercase tracking-wider">FRONT-END LAYER</span>
                  <span className="font-semibold text-white text-sm mt-0.5 block font-mono">{blueprint.architecture?.frontend}</span>
                </div>
              </div>

              {/* Backend Card */}
              <div className="bg-black/85 border border-white/10 p-5 rounded-none flex items-start gap-3">
                <div className="bg-accent/10 text-accent p-2 rounded-none mt-0.5 border border-accent/20">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-white/40 block uppercase tracking-wider">BACK-END LOGIC</span>
                  <span className="font-semibold text-white text-sm mt-0.5 block font-mono">{blueprint.architecture?.backend}</span>
                </div>
              </div>

              {/* Database Card */}
              <div className="bg-black/85 border border-white/10 p-5 rounded-none flex items-start gap-3">
                <div className="bg-accent/10 text-accent p-2 rounded-none mt-0.5 border border-accent/20">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-white/40 block uppercase tracking-wider">DATA STORAGE</span>
                  <span className="font-semibold text-white text-sm mt-0.5 block font-mono">{blueprint.architecture?.database}</span>
                </div>
              </div>
            </div>

            {/* Tech Stack Rationale */}
            <div className="mt-4 bg-black/40 p-4 rounded-none border border-white/5">
              <div className="flex gap-2.5 items-start">
                <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider">Architecture Rationale:</span>
                  <p className="text-white/80 text-xs leading-relaxed mt-1 font-sans">{blueprint.architecture?.rationale}</p>
                </div>
              </div>
              
              {blueprint.architecture?.keyLibraries && blueprint.architecture.keyLibraries.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-white/10">
                  <span className="text-[9px] font-mono text-white/40 mt-1 mr-2 uppercase tracking-wide">Key Modules:</span>
                  {blueprint.architecture.keyLibraries.map((lib, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 text-accent text-[9px] px-2 py-0.5 rounded-none font-mono">
                      {lib}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MVP Core Features */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-mono font-bold text-white/40 text-[10px] uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> SCOPE & FUNCTIONAL SPECIFICATION
              </h4>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                {blueprint.mvpFeatures?.map((feat, idx) => (
                  <div key={idx} className="bg-[#050505] border border-white/5 rounded-none p-4 hover:border-accent/40 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-accent bg-accent/5 border border-accent/35 w-5 h-5 rounded-none flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h5 className="font-semibold text-xs text-white uppercase font-mono tracking-tight">{feat.name}</h5>
                      </div>
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded-none border ${
                        feat.difficulty === "Low" 
                          ? "bg-slate-900 text-accent border-accent/20"
                          : feat.difficulty === "Medium"
                          ? "bg-slate-900 text-amber-300 border-amber-300/20"
                          : "bg-slate-900 text-rose-300 border-rose-300/20"
                      }`}>
                        {feat.difficulty} effort
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed pl-7 font-sans">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Automation & Testing */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-mono font-bold text-white/40 text-[10px] uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-accent" /> FLOW AUTOMATION PROTOCOLS
                </h4>
                <div className="bg-[#050505] border border-white/5 rounded-none p-5 text-xs leading-relaxed text-white/70 font-mono">
                  <p>{blueprint.workflowAutomation || "No custom automation specified for this tier."}</p>
                </div>
              </div>

              {/* Optigrid Budget Optimization */}
              <div className="space-y-3">
                <h4 className="font-mono font-bold text-accent text-[10px] tracking-widest uppercase">
                  ⚡ EFFICIENCY OPTIMIZATION GUARANTEE
                </h4>
                <div className="bg-accent/5 border border-accent/15 rounded-none p-5 text-xs text-white/80 leading-relaxed font-sans">
                  {blueprint.budgetOptimizationNote || "We optimize cloud deployments to give you 40% cheaper ops."}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Stages */}
          <div>
            <h4 className="flex items-center gap-2 font-mono font-bold text-white/40 text-[10px] uppercase tracking-widest mb-5">
              <Calendar className="w-3.5 h-3.5 text-accent" /> MILESTONE ROADMAP
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {blueprint.timelineStages?.map((stage, idx) => (
                <div key={idx} className="bg-black/60 border border-white/5 p-5 rounded-none relative">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-accent/40" />
                  
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-[9px] text-accent font-bold">STAGE 0{idx + 1}</span>
                    <span className="font-mono text-white/50 bg-black border border-white/10 px-2 py-0.5 rounded-none text-[8px] uppercase tracking-wider">
                      {stage.duration}
                    </span>
                  </div>

                  <h5 className="font-semibold text-xs text-white font-mono uppercase tracking-tight mb-3 border-b border-white/5 pb-1.5">{stage.stageName}</h5>

                  <ul className="space-y-1.5">
                    {stage.deliverables?.map((deliv, dIdx) => (
                      <li key={dIdx} className="text-[10px] text-white/60 leading-normal flex gap-1.5 items-start">
                        <span className="text-accent font-bold text-xs shrink-0 mt-0.5">&gt;</span>
                        <span className="font-mono">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-black/95 rounded-none border border-white/10 p-5 gap-4">
            <span className="text-xs text-white/65 text-center sm:text-left font-mono">
              // Confirm layout specs. Deploy Optigrid team sprint structures.
            </span>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-none border border-white/10 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Reset Planner
              </button>
              <a
                href="#contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-accent text-brand-black text-xs font-bold font-mono tracking-wider uppercase text-center hover:bg-accent/90 transition-colors cursor-pointer block"
              >
                Assemble Team
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Code View */
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 px-2">
            <span>optigrid-blueprint-schema.json</span>
            <span>UTF-8 • Application/JSON</span>
          </div>
          <pre className="p-5 rounded-none bg-black border border-white/10 text-[11px] font-mono text-white/80 overflow-x-auto max-h-[550px] leading-relaxed">
            <code>{JSON.stringify(blueprint, null, 2)}</code>
          </pre>
          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-none border border-white/10 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Exit Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

