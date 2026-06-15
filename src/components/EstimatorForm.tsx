import React, { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Info } from "lucide-react";
import { motion } from "motion/react";
import { QueryRequest } from "../types";

interface EstimatorFormProps {
  onSubmit: (request: QueryRequest) => void;
  loading: boolean;
}

const BUDGET_TIERS = [
  { value: "$2k - $5k", label: "Core MVP", desc: "For startups looking to test the waters with ultra-lean logic." },
  { value: "$5k - $15k", label: "Mid Scale Growth", desc: "For companies requiring unified cloud DBs and full automation." },
  { value: "$15k+", label: "Enterprise Scale", desc: "High scalability cloud setups, custom AI models, and maximum speed." }
];

const TARGET_MARKETS = [
  { value: "Global International", label: "Global / Cross-border", desc: "Europe, US, UK audiences." },
  { value: "Regional APAC", label: "APAC / Regional", desc: "Targeting Asia-Pacific and South Asia regions." },
  { value: "Unspecified Mobile First", label: "General Mobile-First", desc: "Multi-platform responsive target." }
];

const SERVICES_AVAILABLE = [
  { value: "Custom Web Application & UI Design", label: "Custom Web Application & UI Design" },
  { value: "AI Integration & Smart Automation", label: "AI Integration & Smart Automation" },
  { value: "Internal Business Workflow Scripts", label: "Internal Business Workflow Scripts" }
];

export default function EstimatorForm({ onSubmit, loading }: EstimatorFormProps) {
  const [description, setDescription] = useState("");
  const [budgetRange, setBudgetRange] = useState("$5k - $15k");
  const [targetMarket, setTargetMarket] = useState("Global International");
  const [servicesDesired, setServicesDesired] = useState<string[]>(["Custom Web Application & UI Design"]);

  const handleServiceToggle = (val: string) => {
    if (servicesDesired.includes(val)) {
      setServicesDesired(servicesDesired.filter((item) => item !== val));
    } else {
      setServicesDesired([...servicesDesired, val]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({
      description,
      budgetRange,
      targetMarket,
      servicesDesired
    });
  };

  const setSamplePrompt = () => {
    setDescription(
      "Our sales team has to manually copy client leads from our website form into three different internal databases, taking up to 10 hours a week. We need a modern, high-performance web dashboard coupled with smart, automated workflows to sync records and generate daily sales reports."
    );
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-gradient-to-b from-[#111111]/90 to-[#070707]/95 border border-white/5 rounded-none p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/2 rounded-full blur-[50px] pointer-events-none" />

      {/* Decorative premium borders */}
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-accent/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-accent/20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/30 pointer-events-none" />

      <div className="mb-6">
        <span className="text-[10px] font-mono text-accent/60 font-semibold uppercase tracking-widest block mb-1">
          // CHOOSE SPECIFICATIONS
        </span>
        <h3 className="font-display font-black text-xl md:text-2xl text-white flex items-center gap-2.5 uppercase tracking-tight">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" /> Configure Project Blueprint
        </h3>
        <p className="text-white/45 text-[11px] mt-1.5 leading-relaxed font-sans">
          Input your target requirements and business goals below. Our interactive architecture estimator calculates accurate milestones and deliverables instantly.
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center bg-white/2 p-2 px-3 border border-white/5 mb-1">
          <label className="text-[9px] font-mono text-white/50 font-bold uppercase tracking-wider">
            PROJECT VALUE/SPEC BRIEF
          </label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={setSamplePrompt}
            className="text-[9px] font-mono font-bold text-accent hover:text-white transition-colors cursor-pointer"
          >
            [ LOAD SAMPLE SPECIFICATION ]
          </motion.button>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your business bottleneck, current manual tasks, or the web platform you want to build..."
          rows={4}
          required
          className="w-full bg-[#050505] border border-white/5 rounded-none p-4 text-xs md:text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent/40 focus:bg-black transition-all resize-none leading-relaxed font-mono"
        />
      </div>

      {/* Services Checklist */}
      <div className="space-y-3 mb-6">
        <label className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-wider block">
          // DESIGN SERVICE TIER MODULES
        </label>
        <div className="space-y-2">
          {SERVICES_AVAILABLE.map((svc) => {
            const isSelected = servicesDesired.includes(svc.value);
            return (
              <div
                key={svc.value}
                onClick={() => handleServiceToggle(svc.value)}
                className={`flex items-start gap-4 p-3.5 rounded-none border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent/5 border-accent/40 text-accent"
                    : "bg-black/60 border-white/5 text-white/50 hover:border-white/10 hover:bg-black/85"
                }`}
              >
                <div className={`mt-0.5 w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${
                  isSelected ? "border-accent bg-accent/20" : "border-white/20"
                }`}>
                  {isSelected && <span className="w-1.5 h-1.5 bg-accent" />}
                </div>
                <span className="text-[11px] font-mono font-medium leading-tight">{svc.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Tier Radio Grid */}
      <div className="space-y-3 mb-6">
        <label className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-wider block">
          // CHOOSE ESTIMATED BUDGET RANGE
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BUDGET_TIERS.map((tier) => {
            const isSelected = budgetRange === tier.value;
            return (
              <div
                key={tier.value}
                onClick={() => setBudgetRange(tier.value)}
                className={`p-4 rounded-none border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? "bg-accent/5 border-accent/40 text-white shadow-[0_4px_20px_rgba(0,255,209,0.04)]"
                    : "bg-[#050505] border-white/5 text-white/40 hover:border-white/10"
                }`}
              >
                <div>
                  <span className={`text-[8px] font-mono leading-none border px-2 py-0.5 font-bold uppercase ${
                    isSelected ? "text-accent border-accent/30 bg-accent/15" : "text-white/30 border-white/5"
                  }`}>
                    {tier.label}
                  </span>
                  <span className={`font-mono font-bold text-sm block mt-2.5 ${isSelected ? "text-accent text-glow" : "text-white/80"}`}>
                    {tier.value}
                  </span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed font-sans mt-2">{tier.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Market Tier Radio Grid */}
      <div className="space-y-3 mb-8">
        <label className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-wider block">
          // TARGET GEOGRAPHIC FOCUS
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TARGET_MARKETS.map((mkt) => {
            const isSelected = targetMarket === mkt.value;
            return (
              <div
                key={mkt.value}
                onClick={() => setTargetMarket(mkt.value)}
                className={`p-4 rounded-none border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  isSelected
                    ? "bg-accent/5 border-accent/40 text-white shadow-[0_4px_20px_rgba(0,255,209,0.04)]"
                    : "bg-[#050505] border-white/5 text-white/40 hover:border-white/10"
                }`}
              >
                <span className={`font-mono text-[10px] font-bold uppercase ${isSelected ? "text-accent" : "text-white/80"}`}>
                  {mkt.label}
                </span>
                <p className="text-[10px] text-white/50 leading-relaxed font-sans mt-2">{mkt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || !description.trim()}
        whileHover={{ scale: 1.015, translateY: -1 }}
        whileTap={{ scale: 0.985 }}
        className="w-full bg-accent hover:bg-[#80FFEB] disabled:bg-white/5 text-[#0A0A0A] disabled:text-white/20 font-extrabold py-4 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer font-mono text-xs uppercase tracking-widest disabled:cursor-not-allowed shadow-[0_6px_25px_rgba(0,255,209,0.25)] hover:shadow-[0_8px_35px_rgba(0,255,209,0.45)] border border-accent/20 shimmer-btn-glow"
      >
        {loading ? (
          <>
            <Loader2 className="w-4.5 h-4.5 animate-spin" />
            <span>CALCULATING SPECIFICATION ARCHITECTURE...</span>
          </>
        ) : (
          <>
            <span>Generate Design & Estimate Blueprint</span>
            <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>

      {/* Mini note */}
      <div className="flex gap-2.5 items-start mt-4 text-[10px] font-mono text-white/40 leading-relaxed bg-[#050505]/80 p-3.5 rounded-none border border-white/5">
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <span>
          ESTIMATOR SERVICE ACTIVE. Calculated using real development metrics and server-side model processing, yielding accurate timelines and estimated deliverables.
        </span>
      </div>
    </form>
  );
}

