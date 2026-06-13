import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Globe,
  ArrowRight,
  Users,
  CheckCircle2,
  Code2,
  Mail,
  Compass,
  Laptop,
  Check,
  Award,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MessagesSquare,
  Network
} from "lucide-react";
import { TEAM_MEMBERS, SERVICES, CASE_STUDIES } from "./data";
import { QueryRequest, BlueprintResponse } from "./types";
import ServiceCard from "./components/ServiceCard";
import EstimatorForm from "./components/EstimatorForm";
import BlueprintView from "./components/BlueprintView";

export default function App() {
  const [blueprint, setBlueprint] = useState<BlueprintResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Spotlight coordinate states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Client telemetry graph simulation values
  const [telemetry, setTelemetry] = useState<number[]>([45, 52, 49, 62, 58, 48, 55, 61, 70, 64]);
  const [optRating, setOptRating] = useState(98.4);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Time ticking state
  const [dhakaTime, setDhakaTime] = useState("");
  const [utcTime, setUtcTime] = useState("");

  // Set active team member focus
  const [activeMemberId, setActiveMemberId] = useState<string>("lead");

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => {
        const last = prev[prev.length - 1];
        const shift = Math.round(Math.random() * 20 - 10);
        const nextVal = Math.max(25, Math.min(95, last + shift));
        return [...prev.slice(1), nextVal];
      });
      setOptRating((prev) => {
        const shift = (Math.random() * 0.4 - 0.2);
        return parseFloat(Math.max(97.8, Math.min(99.9, prev + shift)).toFixed(2));
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // UTC Time
      setUtcTime(now.toUTCString().slice(17, 25) + " UTC");

      // Dhaka Time (GMT+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat("en-US", options).format(now) + " (Dhaka GMT+6)");
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateBlueprint = async (request: QueryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Estimation Request failed.");
      }

      const data = await response.json();
      setBlueprint(data);

      // Scroll smoothly to blueprint view
      setTimeout(() => {
        document.getElementById("blueprint-panel")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please make sure the server is fully started and environment keys are loaded.");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setContactSuccess(false);
    }, 4500);
  };

  return (
    <div 
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-accent font-sans"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Absolute Grid Background from Artistic Flair with ambient scrolling */}
      <div className="absolute inset-0 grid-bg ambient-grid-anim pointer-events-none" />

      {/* Cyber Scanline sweeping beam effect */}
      <div className="cyber-scanline pointer-events-none" />

      {/* Interactive Global Spotlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300 z-10 opacity-60 pointer-events-none"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 209, 0.08), transparent 50%)`
            : `radial-gradient(1000px circle at 50% 35%, rgba(0, 255, 209, 0.05), transparent 60%)`
        }}
      />
      
      {/* Subtle vertical aesthetic line */}
      <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none latent hidden xl:block z-0" />

      {/* Top Header & Brand Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative p-2 bg-white/5 border border-white/10 group-hover:border-accent transition-colors rounded-none">
              <Network className="net-icon w-4 h-4 text-accent transition-transform duration-500" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-wider text-white">
                OPTIGRID<span className="text-accent">_</span>LABS
              </span>
              <span className="block text-[8px] font-mono tracking-[4px] text-white/40 font-bold uppercase leading-none">
                ESTABLISHED MMXXIV
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-[10px] font-mono tracking-widest text-white/60 hover:text-accent transition-colors uppercase">
              Services
            </a>
            <a href="#planner" className="text-[10px] font-mono tracking-widest text-white/60 hover:text-accent transition-colors flex items-center gap-1 uppercase">
              Blueprint <span className="bg-accent/10 text-accent text-[8px] px-1.5 py-0.5 border border-accent/20 font-bold ml-1">AI</span>
            </a>
            <a href="#portfolio" className="text-[10px] font-mono tracking-widest text-white/60 hover:text-accent transition-colors uppercase">
              Portfolio
            </a>
            <a href="#team" className="text-[10px] font-mono tracking-widest text-white/60 hover:text-accent transition-colors uppercase">
              Team Synergy
            </a>
            <a href="#contact" className="text-[10px] font-mono tracking-widest text-white/60 hover:text-accent transition-colors uppercase">
              Contact
            </a>
          </nav>

          {/* Quick Stats Clock / CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right font-mono">
              <div className="text-[8px] text-white/40 tracking-wider font-bold">SYSTEM TIME (DHAKA)</div>
              <div className="text-[10px] text-accent font-medium">{dhakaTime || "--:--:--"}</div>
            </div>
            
            <a
              href="#planner"
              className="px-4 py-2 rounded-none bg-accent/5 hover:bg-accent text-accent hover:text-[#0A0A0A] border border-accent/30 hover:border-accent transition-all text-[10px] font-mono uppercase tracking-widest"
            >
              Configure Stack
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 md:py-32 border-b border-white/10 overflow-hidden">
          {/* Subtle back ambient glow orbit behind hero */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Product Slogan Texts (Left Column) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Accent line from Artistic Flair template - Animated */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-[2px] bg-accent mb-4" 
                />

                {/* Micro Tagline */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-widest"
                >
                  <span className="p-1 rounded-none bg-accent animate-pulse shrink-0" />
                  <span>
                    Offshore Architecture. Expert Sprints.
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[0.9] uppercase"
                >
                  HUMBLE ENGINEERS.<br />
                  <span className="text-accent text-glow">
                    LIGHTWEIGHT CODES.
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                  className="text-white/70 text-xs md:text-sm leading-relaxed max-w-xl font-sans"
                >
                  Optigrid is an elite coding agency. We build blazing-fast web applications, custom AI systems, and automated workflows that eliminate manual bottlenecks, reduce costs, and scale your business globally.
                </motion.p>

                {/* Primary Badges / Fast Facts */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
                  className="grid grid-cols-3 gap-4 pt-4 max-w-lg"
                >
                  <div className="bg-black/95 p-4 rounded-none border border-white/10 hover:border-accent/40 transition-colors">
                    <span className="block font-mono text-xs text-accent font-bold uppercase">&lt; 1.0s</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mt-1">Core Page Load</span>
                  </div>
                  <div className="bg-black/95 p-4 rounded-none border border-white/10 hover:border-accent/40 transition-colors">
                    <span className="block font-mono text-xs text-accent font-bold uppercase">98% +</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mt-1">Lighthouse Rating</span>
                  </div>
                  <div className="bg-black/95 p-4 rounded-none border border-white/10 hover:border-accent/40 transition-colors">
                    <span className="block font-mono text-xs text-accent font-bold uppercase">PURE</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mt-1">Zero Bloatware</span>
                  </div>
                </motion.div>

                {/* Main Action CTAs */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <a
                    href="#planner"
                    className="px-6 py-3.5 rounded-none bg-accent hover:bg-accent/90 text-brand-black font-bold uppercase tracking-wider text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Assemble Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#services"
                    className="px-6 py-3.5 rounded-none bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all font-mono text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer"
                  >
                    Our Capabilities &rarr;
                  </a>
                </motion.div>
              </div>

              {/* High Tech Wireframe Terminal Visual (Right Column) - Animated entry */}
              <motion.div 
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.45 }}
                className="lg:col-span-5 relative mt-8 lg:mt-0"
              >
                <div className="relative mx-auto max-w-[400px] rounded-none bg-[#050505] border border-white/10 p-6 shadow-2xl relative overflow-hidden group">
                  {/* Decorative corner indicators */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-accent" />
                  
                  {/* Fake Console Head */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-accent font-bold uppercase animate-pulse">
                      <span className="w-2 h-2 bg-accent block" />
                      OPTIGRID_TERMINAL
                    </div>
                    <span className="text-[9px] font-mono text-white/30">system_status: nominal</span>
                  </div>

                  {/* Terminal Lines */}
                  <div className="space-y-4 font-mono text-xs text-white/80">
                    <div className="flex gap-2 text-glow text-accent">
                      <span>$</span>
                      <span>./optigrid init --team-synergy</span>
                    </div>
                    <div className="text-white/50 pl-4 border-l border-white/10 space-y-1 text-[11px]">
                      <div>&gt;&gt; Sync partners: Hasib, Asif</div>
                      <div>&gt;&gt; Tech: React 18, Vite Spec, Gemini v3.5</div>
                      <div>&gt;&gt; Priority: Low footprint & zero latency</div>
                      <div>&gt;&gt; Deployment: Worldwide Cloud Gateways</div>
                    </div>
                    
                    <div className="flex gap-2 text-glow text-accent">
                      <span>$</span>
                      <span>./optigrid verify --production</span>
                    </div>
                    <div className="text-accent text-[11px] font-bold">
                      [+] STATUS NOMINAL // REACH GLOBAL
                    </div>

                    {/* Highly Premium System Signal Visualizer */}
                    <div className="pt-4 border-t border-white/10 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono font-bold">// REAL-TIME PIPELINE BANDWIDTH</span>
                        <span className="text-[9px] text-accent font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                          STABLE {optRating}%
                        </span>
                      </div>
                      
                      {/* Interactive Streaming Signal Path */}
                      <div className="relative h-16 w-full bg-black/60 border border-white/5 p-1 flex items-end">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                          <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                          
                          {/* Signal Waves */}
                          <polyline
                            fill="none"
                            stroke="#00FFD1"
                            strokeWidth="1.8"
                            points={telemetry.map((val, idx) => `${idx * 11.1},${100 - val}`).join(" ")}
                            className="transition-all duration-700 ease-in-out"
                          />
                          <polygon
                            fill="url(#spark)"
                            opacity="0.1"
                            points={`0,100 ${telemetry.map((val, idx) => `${idx * 11.1},${100 - val}`).join(" ")} 100,100`}
                          />
                          <defs>
                            <linearGradient id="spark" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#00FFD1" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      
                      <div className="flex justify-between items-center text-[7.5px] text-white/30 font-mono uppercase mt-1">
                        <span>Latency: 4.8ms</span>
                        <span>Compression: Brotli</span>
                        <span>CPU Latency: Nominal</span>
                      </div>
                    </div>
                    
                    {/* Visual Interface Metric */}
                    <div className="pt-4 border-t border-white/10 mt-6 flex justify-between items-center bg-black/60 p-3 rounded-none border border-white/5">
                      <div>
                        <div className="text-[8px] text-white/40 uppercase tracking-wider font-bold">UTC SERVER TIME</div>
                        <div className="text-[10px] font-semibold text-accent">{utcTime || "20:57:48 UTC"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-white/40 uppercase tracking-wider font-bold">OPERATIONS HUB</div>
                        <div className="text-[10px] font-semibold text-white/80 uppercase font-mono">DHAKA [GMT+6]</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* BRIGHT SERVICES BENTO SECTION */}
        <section id="services" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
              [ SERVICES DIRECTORY ]
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-3 uppercase tracking-tight">
              ENGINEERED TO PREVENT COLD STARTS
            </h2>
            <div className="w-12 h-[2px] bg-accent mx-auto mt-4 mb-3" />
            <p className="text-white/60 text-xs mt-3 leading-relaxed font-sans">
              We specialize in modular, high-trust digital layers. Every workflow is audited to ensure clear timelines, lean execution, and explicit documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
          </div>
        </section>

        {/* DYNAMIC SYSTEM ARCHITECT/PLANNER MODAL SECTION */}
        <section id="planner" className="py-24 border-t border-white/10 bg-black/10 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
                  [ INTERACTIVE AI BLUEPRINT GENERATOR ]
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                  IMMEDIATELY ARCHITECT YOUR STACK
                </h2>
                <div className="w-12 h-[2px] bg-accent mt-3 mb-4" />
                <p className="text-white/60 text-xs leading-relaxed font-sans">
                  Forget generic sales proposals. Input your detailed parameters directly into our compiler, and our server-side system will assemble an immediate production-ready technical outline.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-3 items-start">
                    <div className="p-1 rounded-none bg-accent/10 text-accent mt-0.5 border border-accent/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-white/80 font-sans">
                      <strong className="text-white font-mono uppercase text-[11px] block">01 / Modular Framework Proposals</strong>
                      Rigorous layer evaluation tailored specifically to project throughput thresholds.
                    </span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="p-1 rounded-none bg-accent/10 text-accent mt-0.5 border border-accent/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-white/80 font-sans">
                      <strong className="text-white font-mono uppercase text-[11px] block">02 / Custom Feature Breakdown</strong>
                      Milestone breakdowns structured to prevent feature creeps.
                    </span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="p-1 rounded-none bg-accent/10 text-accent mt-0.5 border border-accent/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-white/80 font-sans">
                      <strong className="text-white font-mono uppercase text-[11px] block">03 / Bespoke Pipelines</strong>
                      Automated testing scripts and cron instructions to ensure zero operations maintenance.
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Input Frame */}
              <div className="lg:col-span-7">
                <EstimatorForm onSubmit={handleGenerateBlueprint} loading={loading} />
              </div>
            </div>

            {/* Generated Blueprint View Area */}
            {error && (
              <div className="bg-accent/5 border border-accent/20 rounded-none p-4 mt-6 text-xs text-accent font-mono text-center max-w-3xl mx-auto">
                [!] EXCEPTION COMPILING PARAMETERS: {error}
              </div>
            )}

            <div id="blueprint-panel" className="mt-12 transition-all">
              {blueprint && (
                <BlueprintView
                  blueprint={blueprint}
                  onReset={() => setBlueprint(null)}
                />
              )}
            </div>

          </div>
        </section>

        {/* WORK/PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
                  [ VERIFIED PERFORMANCE ]
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-1 uppercase tracking-tight">
                  REAL-WORLD CASE STUDIES
                </h2>
              </div>
              <p className="text-white/60 text-xs md:text-sm max-w-md leading-relaxed font-sans">
                True engineering requires architectural honesty. Here are active production instances shipped with active code boundaries, Bangladesh coordination, and zero-maintenance guarantees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  className="bg-[#0e0e0e] rounded-none border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-accent transition-colors duration-350"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-accent mb-4 bg-white/5 p-2.5 rounded-none border border-white/5">
                      <span>CLIENT: {study.client}</span>
                      <span className="text-white/20"> • </span>
                      <span>{study.category}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 uppercase tracking-tight">
                      {study.title}
                    </h3>

                    {/* Problem / Solution layout */}
                    <div className="space-y-4 mb-6 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">
                          // The System Bottleneck
                        </span>
                        <p className="text-white/70 mt-1 leading-relaxed">{study.problem}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">
                          // Our Architectural Output
                        </span>
                        <p className="text-white/80 mt-1 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics and build tech */}
                  <div className="pt-5 border-t border-white/5 mt-auto">
                    <div className="bg-accent/5 border border-accent/20 p-3.5 rounded-none mb-4">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest block font-bold">
                        VERIFIED EFFICIENCY SCORE:
                      </span>
                      <span className="text-sm font-semibold text-white mt-0.5 block font-mono">{study.metrics}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SYNERGY SECTION */}
        <section id="team" className="py-24 border-t border-white/10 bg-black/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
                [ DHAKA-BASED OPERATIONS HUB ]
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-3 uppercase tracking-tight">
                OUR SYNCHRONIZED FOUNDERS
              </h2>
              <div className="w-12 h-[2px] bg-accent mx-auto mt-4 mb-3" />
              <p className="text-white/60 text-xs mt-3 leading-relaxed font-sans">
                Having engineered dynamic cloud apps, core vision AI pipelines, and responsive React interfaces together, we offer synchronized engineering with zero-friction handshakes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Member Selector buttons list (Left) */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-3">
                {TEAM_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setActiveMemberId(member.id)}
                    className={`w-full text-left p-5 rounded-none border transition-all flex items-center justify-between group ${
                      activeMemberId === member.id
                        ? "bg-[#0e0e0e] border-accent text-accent animate-pulse"
                        : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-[9px] font-mono text-white/40 mt-1 uppercase tracking-widest">{member.role}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeMemberId === member.id ? "rotate-90 text-accent" : "text-white/20"}`} />
                  </button>
                ))}
              </div>

              {/* Dynamic focused Bio viewer (Right Card) */}
              <div className="lg:col-span-12 xl:col-span-7 bg-[#050505] border border-white/10 rounded-none p-6 md:p-8 shadow-xl relative">
                {/* Visual corners from the template */}
                <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-accent" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-accent" />

                {TEAM_MEMBERS.map((member) => {
                  if (member.id !== activeMemberId) return null;
                  return (
                    <div key={member.id} className="space-y-6">
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                          <h3 className="font-display font-black text-xl md:text-3xl text-white uppercase tracking-tight">{member.name}</h3>
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold mt-1 block">
                            {member.role}
                          </span>
                        </div>
                        <Award className="w-6 h-6 text-accent/35 shrink-0" />
                      </div>

                      {/* Bio text */}
                      <div>
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block font-bold">// BIOGRAPHICAL SKETCH</span>
                        <p className="text-white/80 text-xs leading-relaxed mt-1.5 font-sans">{member.bio}</p>
                      </div>

                      {/* Regional Focus / Role Specialization  */}
                      {member.regionalOverview && (
                        <div className="bg-white/5 p-4 rounded-none border border-white/5">
                          <span className="text-[9px] font-mono text-accent uppercase tracking-widest block font-bold">
                            // EXECUTIVE TARGETED OPERATIONS SPECIFICATION
                          </span>
                          <p className="text-white/70 text-xs leading-relaxed mt-1.5 font-sans font-medium">
                            {member.regionalOverview}
                          </p>
                        </div>
                      )}

                      {/* Expertise skills capsules */}
                      <div>
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block font-bold">// SPECIALIZED GRID EXPERTISE</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {member.expertise.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-white/5 border border-white/5 text-[9px] px-2.5 py-1 rounded-none font-mono text-accent"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT / INQUIRY FORM */}
        <section id="contact" className="py-24 border-t border-white/10 bg-black/20">
          <div className="max-w-3xl mx-auto px-4">
            
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
                [ LET'S LAUNCH RELEASES ]
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-2 uppercase tracking-tight">
                DEPLOY OUR PIPELINES
              </h2>
              <div className="w-12 h-[2px] bg-accent mx-auto mt-3 mb-3" />
              <p className="text-white/60 text-xs mt-2 max-w-md mx-auto leading-relaxed font-sans">
                We accept bank wire, card payments, and sync effortlessly on Slack/Discord across international zones.
              </p>
            </div>

            <div className="bg-[#0e0e0e] border border-white/10 rounded-none p-6 md:p-8 relative overflow-hidden">
              {contactSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="p-3 bg-accent/10 text-accent rounded-none w-14 h-14 mx-auto flex items-center justify-center border border-accent/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">[ inquiry_delivered: true ]</h4>
                  <p className="text-white/70 text-xs max-w-sm mx-auto leading-normal font-sans">
                    Core technical parameters parsed. Lead Hasib will distribute credentials and coordinate response within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-white/40 uppercase font-bold tracking-wider">// Your Full Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-[#050505] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-white/40 uppercase font-bold tracking-wider">// Corporate Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@organization.com"
                        required
                        className="w-full bg-[#050505] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 uppercase font-bold tracking-wider">// Pipeline Specification & Context Details</label>
                    <textarea
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Input parameters, constraints, or desired code milestones... (e.g. 'Seeking automated pipelines')"
                      required
                      rows={4}
                      className="w-full bg-[#050505] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-[#0A0A0A] font-bold py-3.5 text-xs font-mono uppercase tracking-widest rounded-none transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Transmit Secure Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center text-white/30 text-[9px] font-mono uppercase py-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="block text-accent font-bold text-[10px]">GLOBAL WIRE</span>
                <span>Wise & Payoneer</span>
              </div>
              <div className="space-y-1">
                <span className="block text-accent font-bold text-[10px]">REACTIVE ENGINE</span>
                <span>Vite / React 18</span>
              </div>
              <div className="space-y-1">
                <span className="block text-accent font-bold text-[10px]">RESPONSIVE COMM</span>
                <span>Sub-4h Response</span>
              </div>
              <div className="space-y-1">
                <span className="block text-accent font-bold text-[10px]">BD EXCELLENCE</span>
                <span>Trade Lic / LLC</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-black border-t border-white/10 py-12 text-[11px] text-white/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="p-1 px-1.5 border border-white/10 text-accent font-bold font-mono">OB</div>
            <div>
              <span className="font-display font-black text-white tracking-widest text-xs uppercase block">
                OPTIGRID<span className="text-accent">_</span>LABS
              </span>
              <span className="block text-[8px] text-accent/50 font-mono tracking-wider">OFFSHORE DIGITAL ARCHITECTS</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>© 2026 Optigrid Software Labs. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="font-mono">Engineered with high pride and absolute performance.</span>
          </div>

          <div className="flex gap-4">
            <span className="text-[10px] font-mono text-accent bg-accent/5 px-3 py-1.5 border border-accent/20">
              Bangladesh Pride 🇧🇩
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
