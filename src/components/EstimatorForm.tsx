import React, { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Info } from "lucide-react";
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
  { value: "Local Bangladesh", label: "Local / South-Asian", desc: "Specifically targetting South Asia region." },
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
    <form onSubmit={handleFormSubmit} className="bg-[#0e0e0e]/95 border border-white/10 rounded-none p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
      {/* Visual geometric indicators */}
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-accent/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-accent/20 pointer-events-none" />

      <h3 className="font-display font-semibold text-lg md:text-xl text-white flex items-center gap-2 mb-1.5 uppercase tracking-tight">
        <Sparkles className="w-5 h-5 text-accent" /> Configure Project Blueprint
      </h3>
      <p className="text-white/60 text-xs mb-6 leading-relaxed">
        Input your target parameters and business details, and our generator will assemble an official architectural blueprint draft.
      </p>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-mono text-white/50 font-semibold uppercase tracking-wider">
            PROJECT VALUE/SPEC BRIEF
          </label>
          <button
            type="button"
            onClick={setSamplePrompt}
            className="text-[10px] font-mono font-medium text-accent hover:underline transition-all"
          >
            [ LOAD OPTIMIZED CORE SAMPLE ]
          </button>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your business bottleneck, current manual tasks, or the web platform you want to build..."
          rows={4}
          required
          className="w-full bg-[#050505] border border-white/10 rounded-none p-4 text-xs md:text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,255,209,0.05)] transition-all resize-none leading-relaxed font-sans"
        />
      </div>

      {/* Services Checklist */}
      <div className="space-y-3 mb-6">
        <label className="text-[10px] font-mono text-white/50 font-semibold uppercase tracking-wider block">
          REQUIRED SERVICE MODULES
        </label>
        <div className="space-y-2">
          {SERVICES_AVAILABLE.map((svc) => (
            <label
              key={svc.value}
              className={`flex items-start gap-3 p-3 rounded-none border transition-all cursor-pointer ${
                servicesDesired.includes(svc.value)
                  ? "bg-accent/5 border-accent text-accent"
                  : "bg-black/40 border-white/10 text-white/55 hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                checked={servicesDesired.includes(svc.value)}
                onChange={() => handleServiceToggle(svc.value)}
                className="mt-1 accent-accent focus:ring-0 rounded-none cursor-pointer"
              />
              <span className="text-xs font-mono leading-relaxed">{svc.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Tier Radio Grid */}
      <div className="space-y-3 mb-6">
        <label className="text-[10px] font-mono text-white/50 font-semibold uppercase tracking-wider block">
          PROJECT BUDGET ALLOCATION
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BUDGET_TIERS.map((tier) => (
            <div
              key={tier.value}
              onClick={() => setBudgetRange(tier.value)}
              className={`p-4 rounded-none border transition-all cursor-pointer flex flex-col justify-between ${
                budgetRange === tier.value
                  ? "bg-accent/5 border-accent text-white"
                  : "bg-black/40 border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              <div>
                <span className={`text-[9px] font-mono leading-none border px-1.5 py-0.5 rounded-none ${
                  budgetRange === tier.value ? "text-accent border-accent/40 bg-accent/10" : "text-white/40 border-white/10"
                }`}>
                  {tier.label}
                </span>
                <span className="font-semibold text-sm block mt-2 text-white">{tier.value}</span>
              </div>
              <p className="text-[10px] text-white/60 mt-2 leading-relaxed font-sans">{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Target Market Tier Radio Grid */}
      <div className="space-y-3 mb-8">
        <label className="text-[10px] font-mono text-white/50 font-semibold uppercase tracking-wider block">
          TARGET MARKET / OPERATIONS AUDIENCE
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TARGET_MARKETS.map((mkt) => (
            <div
              key={mkt.value}
              onClick={() => setTargetMarket(mkt.value)}
              className={`p-4 rounded-none border transition-all cursor-pointer flex flex-col justify-between ${
                targetMarket === mkt.value
                  ? "bg-accent/5 border-accent text-white"
                  : "bg-black/40 border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              <span className="font-semibold text-xs text-white uppercase tracking-tight">{mkt.label}</span>
              <p className="text-[10px] text-white/60 mt-1 leading-relaxed font-sans">{mkt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !description.trim()}
        className="w-full bg-accent hover:bg-accent/90 disabled:bg-white/10 text-[#0A0A0A] disabled:text-white/30 font-bold py-4 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-widest disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing Parameters...</span>
          </>
        ) : (
          <>
            <span>Synthesize Optigrid Blueprint</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Mini note */}
      <div className="flex gap-2 items-start mt-4 text-[10px] font-mono text-white/40 leading-relaxed bg-black/40 p-3 rounded-none border border-white/5">
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <span>
          COMPILER INSTANCE ACTIVE. Powered by Gemini 3.5 Flash server proxy. Real-time blueprint generation, zero mock parameters.
        </span>
      </div>
    </form>
  );
}

