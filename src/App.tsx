import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Network,
  Loader2
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { TEAM_MEMBERS, SERVICES, CASE_STUDIES } from "./data";
import { QueryRequest, BlueprintResponse } from "./types";
import ServiceCard from "./components/ServiceCard";
import EstimatorForm from "./components/EstimatorForm";
import BlueprintView from "./components/BlueprintView";
import CoreHologram3D from "./components/CoreHologram3D";
import VisualShowcase from "./components/VisualShowcase";
import ParallaxElement from "./components/ParallaxElement";
import CosmicBackground from "./components/CosmicBackground";
import { generateDynamicBlueprint } from "./utils/blueprintGenerator";

export default function App() {
  const [blueprint, setBlueprint] = useState<BlueprintResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Spotlight coordinate ref & hover states
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState<string | null>(null);

  // Set active team member focus
  const [activeMemberId, setActiveMemberId] = useState<string>("director");

  // Floating button scroll activation
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the main hero section (approx 500px)
      const pastThreshold = window.scrollY > 500;
      setShowFloatingBtn((prev) => {
        if (prev !== pastThreshold) return pastThreshold;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => Date.now() - r.id < 1000));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFloatingBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    scrollToContact();
  };

  const handleGenerateBlueprint = async (request: QueryRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Generate blueprint instantly client-side
      const generatedData = generateDynamicBlueprint(request);
      setBlueprint(generatedData);

      // Pre-fill user selected services and estimated budget into the contact form
      const servicesString = request.servicesDesired.map((svc) => `- ${svc}`).join("\n");
      const generatedMessage = `We require the following services:
${servicesString}

Our target budget for these deliverables is: ${request.budgetRange}
Estimated deployment cost calculated: ${generatedData.estimatedCost}
Target Geographic Focus: ${request.targetMarket}

Our operational goals and challenge brief:
"${request.description}"`;

      setContactMsg(generatedMessage);

      // Scroll smoothly to blueprint view
      setTimeout(() => {
        document.getElementById("blueprint-panel")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred compiling parameters.");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactSubmitError(null);
    try {
      await emailjs.send(
        "service_yupk50k",
        "template_bcow43t",
        {
          from_name: contactName,
          reply_to: contactEmail,
          message: contactMsg
        },
        "_Ow4R3fYuzQ9byPoc"
      );
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setContactSubmitError("Failed to send your inquiry. Please check your network connection or try again. You can also contact us directly via typical enterprise channels.");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div 
      ref={rootRef}
      className="min-h-screen bg-transparent text-white flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-accent font-sans"
      onMouseMove={(e) => {
        const x = e.pageX;
        const y = e.pageY;
        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Deep-Space Cosmic Background with Twinkling Stars */}
      <CosmicBackground />
      
      {/* Absolute Grid Background from Artistic Flair with ambient scrolling */}
      <div className="absolute inset-0 grid-bg ambient-grid-anim pointer-events-none" />

      {/* Cyber Scanline sweeping beam effect */}
      <div className="cyber-scanline pointer-events-none" />

      {/* Interactive Global Spotlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300 z-10 opacity-60 pointer-events-none"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 35%), rgba(0, 255, 209, 0.08), transparent 50%)`
            : `radial-gradient(1000px circle at 50% 35%, rgba(0, 255, 209, 0.05), transparent 60%)`
        }}
      />
      
      {/* Subtle vertical aesthetic line */}
      <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none latent hidden xl:block z-0" />

      {/* Top Header & Brand Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_2px_40px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with interactive glow badge */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative p-2.5 bg-[#111] border border-white/10 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,255,209,0.2)] transition-all duration-500 rounded-none">
              <Network className="net-icon w-4 h-4 text-accent transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-wider text-white transition-all duration-300 group-hover:text-accent">
                OPTIGRID<span className="text-accent text-glow">_</span>LABS
              </span>
              <span className="block text-[7.5px] font-mono tracking-[4.5px] text-white/40 font-bold uppercase leading-none mt-1">
                ESTABLISHED MMXXIV
              </span>
            </div>
          </a>

          {/* Premium Nav Links with high-contrast bottom underline indices */}
          <nav className="hidden md:flex items-center gap-8 font-mono">
            {[
              { label: "Services", href: "#services" },
              { label: "Blueprint AI", href: "#planner", isBadge: true },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Team Synergy", href: "#team" },
              { label: "Contact", href: "#contact" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[10px] tracking-widest text-white/60 hover:text-white transition-all uppercase py-1 group/item"
              >
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.isBadge && (
                    <span className="bg-accent/10 text-accent text-[7.5px] px-1.5 py-0.5 border border-accent/25 font-bold uppercase tracking-normal">
                      AI_v3.5
                    </span>
                  )}
                </span>
                {/* Horizontal premium accent slide effect under text */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/item:w-full" />
              </a>
            ))}
          </nav>

          {/* Quick Status Badge / CTA */}
          <div className="flex items-center gap-5 font-mono">
            <div className="hidden lg:flex items-center gap-2 border-r border-white/5 pr-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Studio Status: Active</span>
            </div>
            
            <motion.a
              href="#planner"
              onClick={(e) => handleNavClick(e as any, "#planner")}
              whileHover={{ scale: 1.05, translateY: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-none bg-accent/5 hover:bg-accent text-accent hover:text-[#0A0A0A] border border-accent/30 hover:border-accent hover:shadow-[0_0_25px_rgba(0,255,209,0.45)] transition-all duration-300 text-[10px] font-mono uppercase tracking-widest font-bold shimmer-btn-glow"
            >
              Get Started
            </motion.a>
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
                  animate={{ width: 120 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-[1.5px] bg-gradient-to-r from-accent to-transparent mb-4" 
                />

                {/* Micro Tagline styled like premium Apple/Stripe launch product tags */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-3 px-3.5 py-2 rounded-none bg-white/2 border border-white/5 text-white/50 text-[9px] font-mono uppercase tracking-widest"
                >
                  <span className="relative w-2 h-2 shrink-0 flex items-center justify-center">
                    <span className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  </span>
                  <span className="font-bold text-white/70">
                    Offshore Architecture // Deep Engineering Sprints
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.88] uppercase"
                >
                  HUMBLE ENGINEERS.<br />
                  <span className="text-accent text-glow bg-gradient-to-r from-[#00FFD1] via-[#80FFEB] to-[#FFF] bg-clip-text text-transparent">
                    LIGHTWEIGHT CODES.
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                  className="text-white/60 text-xs md:text-sm leading-relaxed max-w-xl font-sans"
                >
                  Optigrid Labs is an elite software studio. We design high-capacity React software layouts, bespoke AI configurations, and zero-overhead automation loops that strip out production friction, bypass bloated structures, and accelerate global enterprise operations.
                </motion.p>

                {/* Primary Badges / Fast Facts styled like dashboard instruments */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
                  className="grid grid-cols-3 gap-4 pt-4 max-w-lg"
                >
                  <div className="bg-gradient-to-b from-white/3 to-[#050505] p-4 rounded-none border border-white/5 hover:border-accent/30 transition-all duration-300">
                    <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">// CORE_LATENCY</span>
                    <span className="block font-mono text-lg text-accent font-black uppercase mt-1">&lt; 1.0s</span>
                    <span className="text-[8px] font-mono text-white/40 block mt-0.5">Initial Load-To-Paint</span>
                  </div>
                  <div className="bg-gradient-to-b from-white/3 to-[#050505] p-4 rounded-none border border-white/5 hover:border-accent/30 transition-all duration-300">
                    <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">// PERF_MATRIX</span>
                    <span className="block font-mono text-lg text-accent font-black uppercase mt-1">98% +</span>
                    <span className="text-[8px] font-mono text-white/40 block mt-0.5">Google Lighthouse</span>
                  </div>
                  <div className="bg-gradient-to-b from-white/3 to-[#050505] p-4 rounded-none border border-white/5 hover:border-accent/30 transition-all duration-300">
                    <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">// BLOAT_METRIC</span>
                    <span className="block font-mono text-lg text-accent font-black uppercase mt-1">PURE</span>
                    <span className="text-[8px] font-mono text-white/40 block mt-0.5">Optimized Dependencies</span>
                  </div>
                </motion.div>

                {/* Main Action CTAs decorated with premium hover behaviors */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.a
                    href="#planner"
                    onClick={(e) => handleNavClick(e as any, "#planner")}
                    whileHover={{ scale: 1.03, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-6 py-4 rounded-none bg-accent hover:bg-[#80FFEB] text-brand-black font-mono text-xs uppercase tracking-wider font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_30px_rgba(0,255,209,0.3)] hover:shadow-[0_8px_35px_rgba(0,255,209,0.5)] border border-accent/20 shimmer-btn-glow"
                  >
                    <span>Assemble Blueprint</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.a>
                  <motion.a
                    href="#services"
                    onClick={(e) => handleNavClick(e as any, "#services")}
                    whileHover={{ scale: 1.03, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 rounded-none bg-white/2 hover:bg-white/5 text-white/80 hover:text-white border border-white/5 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,255,209,0.15)] transition-all duration-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer shimmer-btn-glow"
                  >
                    Our Capabilities &rarr;
                  </motion.a>
                </motion.div>
              </div>

              {/* High Tech Wireframe / 3D Hologram Core View (Right Column) - Animated entry */}
              <motion.div 
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.45 }}
                className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col gap-3"
              >
                <CoreHologram3D />
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMOS SHOWCASE SECTION */}
        <motion.section
          id="interactive-demos"
          className="py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle floating background parallax elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <ParallaxElement offset={80} direction="down" className="absolute top-1/4 right-[5%] opacity-15">
              <span className="font-mono text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-accent to-transparent leading-none">
                SHOW
              </span>
            </ParallaxElement>
            <ParallaxElement offset={50} direction="up" className="absolute bottom-1/4 left-[3%] opacity-20">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#FF80E3]/20 to-indigo-500/30 blur-[60px]" />
            </ParallaxElement>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#80FFEB]/25 to-transparent z-10" />
          
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <span className="text-[10px] font-mono font-black tracking-widest text-[#FF80E3] uppercase block">
              // SIGNATURE_PRODUCT_PREVIEWS
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-3 uppercase tracking-tight">
              Bespoke Web Showcase
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-pink-500 to-transparent mx-auto mt-4 mb-3" />
            <p className="text-white/50 text-xs md:text-sm mt-3 leading-relaxed font-sans max-w-lg mx-auto">
              We design and ship high-performance bespoke layouts configured to maximize brand authority and visual speed. Select a product model below to test responsive previews and order your customized system instantly.
            </p>
          </div>
          <div className="relative z-10">
            <VisualShowcase />
          </div>
        </motion.section>

        {/* BRIGHT SERVICES BENTO SECTION */}
        <motion.section
          id="services"
          className="py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle floating background parallax elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <ParallaxElement offset={110} direction="up" className="absolute -top-10 left-[8%] opacity-15">
              <span className="font-mono text-[110px] font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-500/50 to-transparent leading-none uppercase">
                SPEC
              </span>
            </ParallaxElement>
            <ParallaxElement offset={60} direction="down" className="absolute bottom-10 right-[5%] opacity-25">
              <div className="w-60 h-60 rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-500/10 blur-[80px]" />
            </ParallaxElement>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <span className="text-[10px] font-mono font-black tracking-widest text-accent uppercase block">
              // STUDIO_CAPABILITIES_DIRECTORY
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-3 uppercase tracking-tight">
              Enterprise-Grade Standards
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-accent to-transparent mx-auto mt-4 mb-3" />
            <p className="text-white/50 text-xs md:text-sm mt-3 leading-relaxed font-sans max-w-lg mx-auto">
              Our layout structures bypass standard bloated code bases. We build customizable top-tier corporate platforms designed with premium page-load optimization, secure integrations, and sub-second visual performance.
            </p>
          </div>

          {/* Bento Grid with staggered entrance animations */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Bento Grid Card 1: Col-span-7 (Web Platforms Opti-UI with Interactive Page-Speed Speedometer) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-7 bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden group flex flex-col justify-between hover:border-accent/30 hover:scale-[1.005] hover:shadow-[0_15px_45px_rgba(0,255,209,0.05)] transition-all duration-500"
            >
              {/* Back ambient orbit indicator */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/4 rounded-full blur-[40px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-accent/20 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/3 border border-white/10 group-hover:bg-accent group-hover:text-brand-black text-accent transition-all duration-300">
                    <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block font-black">
                    SPEC_CORE // LAYERS_OPT_v1.09
                  </span>
                </div>

                <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight uppercase mb-3 text-left">
                  High-Performance Web Platforms (Opti-UI)
                </h3>
                <p className="text-white/60 text-xs leading-relaxed max-w-md font-sans mb-8 text-left">
                  Blazing-fast, custom enterprise-grade web layouts. We achieve sub-second content painting and optimize client-side bundle structures to secure total retention, zero cold starts, and flawless search index ranking.
                </p>
              </div>

              {/* Interactive Performance Speedometer Simulator */}
              <div className="bg-black/40 border border-white/5 p-4 rounded-none text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-black">// REAL-TIME RUNTIME PERFORMANCE DETECT</span>
                  <span className="text-[9px] font-mono text-accent font-bold">STABLE 0.42S LCP</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-r border-white/5 pr-4">
                    <div className="text-[8px] font-mono text-white/30 uppercase mt-1">STANDARD AGENCY FRAMEWORK</div>
                    <div className="text-md font-mono font-bold text-white/50 block mt-0.5">3.48 seconds</div>
                    <div className="w-full bg-white/5 h-1.5 mt-2 rounded-none overflow-hidden">
                      <div className="bg-white/20 h-full w-[80%]" />
                    </div>
                    <span className="text-[7.5px] font-mono text-red-400 mt-1 block uppercase">System Latency Bottleneck</span>
                  </div>

                  <div className="pl-2">
                    <div className="text-[8px] font-mono text-white/30 uppercase mt-1 text-accent font-black">OPTIGRID COMPILER SPEC</div>
                    <div className="text-lg font-mono font-black text-accent text-glow block mt-0.5">0.42 seconds</div>
                    <div className="w-full bg-white/5 h-1.5 mt-2 rounded-none overflow-hidden">
                      <div className="bg-accent h-full w-[12%] animate-pulse" />
                    </div>
                    <span className="text-[7.5px] font-mono text-accent mt-1 block uppercase font-bold text-glow">9x Faster Load Speed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Grid Card 2: Col-span-5 (Practical AI with Interactive Sinusoidal Synapse Vector) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden group flex flex-col justify-between hover:border-accent/30 hover:scale-[1.005] hover:shadow-[0_15px_45px_rgba(0,255,209,0.05)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-accent/20 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/3 border border-white/10 group-hover:bg-accent group-hover:text-brand-black text-accent transition-all duration-300">
                    <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block font-black">
                    SPEC_CORE // COGNITIVE_v3.24
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-white tracking-tight uppercase mb-3 text-left">
                  Specialized AI Integration
                </h3>
                <p className="text-white/65 text-xs leading-relaxed font-sans mb-8 text-left">
                  Smart server-side intelligence that automates high-capacity data parsing. We integrate deep Gemini vision processing pipelines, structured API classifiers, and zero-leak vector databases without massive bills.
                </p>
              </div>

              {/* Mini Interactive Neural Pulser */}
              <div className="bg-black/50 border border-white/5 p-4 py-5 rounded-none flex items-center justify-between group-hover:border-accent/10 transition-colors text-left">
                <div className="space-y-1">
                  <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-black">// INTERACTIVE NEURAL SYNAPSE</div>
                  <div className="text-[10px] font-mono text-white/80 font-bold uppercase">Click Node To Query Gemini</div>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center cursor-pointer">
                  <span className="absolute inset-0 bg-accent/10 rounded-full animate-ping opacity-60" />
                  <div className="w-7 h-7 bg-accent/20 border border-accent text-accent flex items-center justify-center rounded-full font-mono text-[9px] font-black group-hover:scale-110 transition-transform">
                     AI
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Grid Card 3: Col-span-5 (Workflow Automation with Live scheduling log queue stream) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden group flex flex-col justify-between hover:border-accent/30 hover:scale-[1.005] hover:shadow-[0_15px_45px_rgba(0,255,209,0.05)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#80FFEB]/20 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/3 border border-white/10 group-hover:bg-accent group-hover:text-brand-black text-accent transition-all duration-300">
                    <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block font-black">
                    SPEC_CORE // AUTO_FLOW_v5.02
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-white tracking-tight uppercase mb-3 text-left">
                  Workflow Automation Engines
                </h3>
                <p className="text-white/65 text-xs leading-relaxed font-sans mb-8 text-left">
                  Zero-maintenance automations that wire your corporate systems. We build robust Cron schedulers, dynamic system integration bridges, and internal database syncs that eliminate human errors instantly.
                </p>
              </div>

              {/* Live Ticking Stream Task Logs Grid */}
              <div className="bg-[#050505] p-3 border border-white/5 rounded-none font-mono text-[8.5px] text-white/55 space-y-2 text-left">
                <div className="flex justify-between border-b border-white/5 pb-1 text-[7.5px] text-white/35">
                  <span>SCHEDULER ENGINE STREAM</span>
                  <span className="text-accent animate-pulse font-bold">POLLING RUN...</span>
                </div>
                <div className="flex items-center gap-1.5 text-accent text-glow">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                  <span>[WISE API] Outbound Balance Synced</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/65">
                  <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                  <span>[SLACK] Broadcast Status: Delivered</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/35">
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                  <span>[POSTGRESQL] Garbage Collector Cycle COMPLETE</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Grid Card 4: Col-span-7 (Offshore Command Core / Coordination Specs) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-7 bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden group flex flex-col justify-between hover:border-accent/30 hover:scale-[1.005] hover:shadow-[0_15px_45px_rgba(0,255,209,0.05)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-accent/20 pointer-events-none" />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-accent/2 rounded-full blur-[40px] pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/3 border border-white/10 group-hover:bg-accent group-hover:text-brand-black text-accent transition-all duration-300">
                    <Globe className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                  </div>
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block font-black">
                    SPEC_CORE // ZONE_COORD_v3.5
                  </span>
                </div>

                <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight uppercase mb-3 text-left">
                  Elite Offshore Synced Frameworks
                </h3>
                <p className="text-white/65 text-xs leading-relaxed max-w-md font-sans mb-6 text-left">
                  Bypass the expensive domestic agency pricing layers. Over 80% cost reduction delivered without compromising on code latency or architectural design complexity. Synced directly with global founders.
                </p>
              </div>

              {/* Visual trust grid stats tags */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/5 text-left">
                <div className="bg-[#050505] p-3 border border-white/5">
                  <span className="font-mono text-[8px] text-white/30 block tracking-widest uppercase font-black">// OVERHEAD SHIFT</span>
                  <span className="font-mono text-base font-black text-accent mt-1 block">-80% FEES</span>
                </div>
                <div className="bg-[#050505] p-3 border border-white/5">
                  <span className="font-mono text-[8px] text-white/30 block tracking-widest uppercase font-black">// PUNCH TIMELINES</span>
                  <span className="font-mono text-base font-black text-accent mt-1 block">DAILY DEPLOY</span>
                </div>
                <div className="bg-[#050505] p-3 border border-white/5">
                  <span className="font-mono text-[8px] text-white/30 block tracking-widest uppercase font-black">// QUALITY MATRIX</span>
                  <span className="font-mono text-base font-black text-accent mt-1 block">99.9% SECURE</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.section>

        {/* DYNAMIC SYSTEM ARCHITECT/PLANNER MODAL SECTION */}
        <motion.section
          id="planner"
          className="py-24 border-t border-white/10 bg-black/10 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.section>

        {/* WORK/PORTFOLIO SECTION */}
        <motion.section
          id="portfolio"
          className="py-24 border-t border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle floating background parallax elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <ParallaxElement offset={120} direction="down" className="absolute top-[10%] right-[10%] opacity-15">
              <span className="font-mono text-[130px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF80E3] to-transparent leading-none">
                WORK
              </span>
            </ParallaxElement>
            <ParallaxElement offset={70} direction="up" className="absolute bottom-[15%] left-[5%] opacity-15">
              <div className="w-52 h-52 bg-gradient-to-tr from-accent/20 to-cyan-500/20 blur-[70px] rounded-full" />
            </ParallaxElement>
          </div>
          
          {/* Back side blurred spotlight glow */}
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[10px] font-mono font-black tracking-widest text-accent uppercase block">
                  // PRODUCTION_SHIPPED_HISTORY
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-2 uppercase tracking-tight leading-none">
                  REAL-WORLD CASE STUDIES
                </h2>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-accent to-transparent mt-3" />
              </div>
              <p className="text-white/50 text-xs md:text-sm max-w-md leading-relaxed font-sans">
                Authentic technical proof over generic sales talk. Here are active production deployments engineered with strict latency budgets, decentralized worldwide sync, and zero maintenance overheads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES.map((study, sIdx) => (
                <div
                  key={study.id}
                  className="bg-gradient-to-b from-[#111] to-[#070707] rounded-none border border-white/5 p-6 md:p-8 flex flex-col justify-between hover:border-accent/30 hover:scale-[1.01] hover:shadow-[0_15px_40px_rgba(0,255,209,0.04)] transition-all duration-500 relative group"
                >
                  {/* Glowing vertical corner indicator */}
                  <div className="absolute top-0 right-0 w-[12px] h-[12px] border-t border-r border-white/10 group-hover:border-accent transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-[12px] h-[12px] border-b border-l border-white/10 group-hover:border-accent transition-colors duration-300" />

                  <div>
                    <div className="flex items-center justify-between text-[8px] font-mono text-accent mb-4 bg-white/2 p-3 rounded-none border border-white/5 uppercase font-medium">
                      <span className="tracking-widest">CLIENT: {study.client}</span>
                      <span className="text-white/25">•</span>
                      <span className="text-white/70 font-bold">{study.category}</span>
                    </div>

                    <h3 className="font-display font-black text-lg md:text-2xl text-white mb-5 uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                      {study.title}
                    </h3>

                    {/* Problem / Solution layout */}
                    <div className="space-y-4 mb-6 text-xs font-sans">
                      <div className="p-4 bg-black/40 border-l-2 border-white/10 space-y-1">
                        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-black">
                          [01] The System Bottleneck
                        </span>
                        <p className="text-white/70 leading-relaxed text-[11px] font-mono">{study.problem}</p>
                      </div>
                      <div className="p-4 bg-accent/2 border-l-2 border-accent/40 space-y-1">
                        <span className="font-mono text-[9px] text-accent/60 uppercase tracking-widest block font-black">
                          [02] Our Architectural Output
                        </span>
                        <p className="text-white/80 leading-relaxed text-[11px]">{study.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics and build tech */}
                  <div className="pt-5 border-t border-white/5 mt-auto">
                    <div className="bg-accent/5 border border-accent/15 p-4 rounded-none mb-4 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] font-mono text-accent/70 uppercase tracking-widest block font-black">
                          VERIFIED EFFICIENCY SCORE:
                        </span>
                        <span className="text-xs font-bold text-white mt-1 block font-mono">{study.metrics}</span>
                      </div>
                      <span className="w-2.5 h-2.5 bg-accent rounded-full animate-ping shrink-0" />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {study.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-white/2 border border-white/5 text-white/40 text-[9px] px-2.5 py-1 rounded-none font-mono group-hover:border-accent/15 group-hover:text-accent transition-colors"
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
        </motion.section>

        {/* TEAM SYNERGY SECTION */}
        <motion.section
          id="team"
          className="py-24 border-t border-white/10 bg-gradient-to-b from-black/20 to-[#030303] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle floating background parallax elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <ParallaxElement offset={90} direction="up" className="absolute top-[5%] left-[2%] opacity-15">
              <span className="font-mono text-[115px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF80E3]/40 to-transparent leading-none">
                TEAM
              </span>
            </ParallaxElement>
            <ParallaxElement offset={50} direction="down" className="absolute bottom-[5%] right-[2%] opacity-15">
              <div className="w-64 h-64 bg-gradient-to-br from-pink-500/20 to-indigo-500/10 blur-[90px] rounded-full" />
            </ParallaxElement>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#FF80E3] uppercase block">
                // AGENCY_LEADERSHIP
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-3 uppercase tracking-tight">
                AGENCY LEADERSHIP
              </h2>
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-pink-500 via-accent/50 to-transparent mx-auto mt-4 mb-3" />
              <p className="text-white/60 text-xs mt-3 leading-relaxed font-sans">
                Our agency operates under singular, highly focused directorship. Get a unified point-of-contact experience backed by an elite, anonymous offshore deployment network.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              
              {/* Centered Professional Bio Card */}
              <div className="bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 rounded-none p-6 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Decorative glowing back orbit */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-500/5 rounded-full blur-[60px] pointer-events-none" />

                {/* Visual corners from the template */}
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent/30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-accent/30 pointer-events-none" />
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/10 pointer-events-none" />

                {TEAM_MEMBERS.map((member) => {
                  if (member.id !== activeMemberId) return null;
                  return (
                    <div key={member.id} className="space-y-6 md:space-y-8">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-5 gap-3">
                        <div>
                          <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">{member.name}</h3>
                          <span className="text-[9px] font-mono text-accent uppercase tracking-widest font-black mt-1.5 block">
                            LEAD REPRESENTATIVE // {member.role}
                          </span>
                        </div>
                        <Award className="w-8 h-8 text-accent/30 shrink-0 self-start sm:self-auto" />
                      </div>

                      {/* Bio text */}
                      <div>
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block font-black">// LEAD ARCHITECT STATEMENT</span>
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed mt-2.5 font-sans font-medium">{member.bio}</p>
                      </div>

                      {/* Regional Focus / Role Specialization  */}
                      {member.regionalOverview && (
                        <div className="bg-white/2 p-4 rounded-none border border-white/5">
                          <span className="text-[8px] font-mono text-accent/70 uppercase tracking-widest block font-black">
                            // DIRECT CONTRACT RELATION & DEPLOYMENT CAPACITY
                          </span>
                          <p className="text-white/60 text-xs leading-relaxed mt-2 font-mono">
                            {member.regionalOverview}
                          </p>
                        </div>
                      )}

                      {/* Expertise skills capsules */}
                      <div>
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block font-black">// CORE SYSTEM & STRATEGY EXPERTISE</span>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.expertise.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-accent/5 border border-accent/15 text-[9px] px-3 py-1 rounded-none font-mono text-accent hover:border-accent/30 transition-colors"
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
        </motion.section>

        {/* CONTACT / INQUIRY FORM */}
        <motion.section
          id="contact"
          className="py-24 border-t border-white/10 bg-black/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl mx-auto px-4">
            
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase block">
                [ WORK WITH US ]
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-2 uppercase tracking-tight">
                REQUEST A CONSULTATION
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
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">[ REQUEST RECEIVED SUCCESSFULLY ]</h4>
                  <p className="text-white/70 text-xs max-w-sm mx-auto leading-normal font-sans">
                    Your inquiry details have been saved securely. Our Lead Architectural Advisor will coordinate a detailed response and reach out within 4-12 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-white/40 uppercase font-bold tracking-wider">// Your Full Name</label>
                      <input
                        type="text"
                        name="from_name"
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
                        name="reply_to"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@organization.com"
                        required
                        className="w-full bg-[#050505] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 uppercase font-bold tracking-wider">// Project Requirements & Description</label>
                    <textarea
                      name="message"
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Detail your operational goals, timelines, or core web features..."
                      required
                      rows={4}
                      className="w-full bg-[#050505] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-accent font-mono resize-none"
                    />
                  </div>

                  {contactSubmitError && (
                    <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] leading-relaxed rounded-none shadow-[0_0_15px_rgba(244,63,94,0.1)] flex items-start gap-2 animate-[pulse_2s_infinite]">
                      <span className="text-rose-500 font-bold shrink-0">[ ERROR ]</span>
                      <span>{contactSubmitError}</span>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={contactLoading}
                    whileHover={{ scale: contactLoading ? 1 : 1.02, translateY: contactLoading ? 0 : -1 }}
                    whileTap={{ scale: contactLoading ? 1 : 0.98 }}
                    className="w-full bg-accent hover:bg-[#80FFEB] disabled:bg-accent/40 text-[#0A0A0A] disabled:text-[#0A0A0A]/50 font-semibold py-4 text-xs font-mono uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(0,255,209,0.25)] hover:shadow-[0_8px_35px_rgba(0,255,209,0.45)] border border-accent/20 shimmer-btn-glow"
                  >
                    {contactLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0A]" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND PROJECT INQUIRY</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
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
                <span className="block text-accent font-bold text-[10px]">GLOBAL EXCELLENCE</span>
                <span>NDA Compliant</span>
              </div>
            </div>

          </div>
        </motion.section>

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
              <span className="block text-[8px] text-accent/50 font-mono tracking-wider">PREMIUM WEB SOLUTIONS</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>© 2026 Optigrid Software Labs. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="font-mono">Engineered with high performance and worldwide quality standard.</span>
          </div>

          <div className="flex gap-4">
            <span className="text-[10px] font-mono text-accent bg-accent/5 px-3 py-1.5 border border-accent/20">
              ENTERPRISE APPS 🌐
            </span>
          </div>

        </div>
      </footer>


      {/* Floating Animated Consultation Trigger */}
      {/* Floating Animated Consultation Trigger Container */}
      <div id="floating-consultation-btn-container" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 pointer-events-none">
        <AnimatePresence>
          {showFloatingBtn && (
            <motion.button
              id="floating-consultation-btn"
              onClick={handleFloatingBtnClick}
              initial={{ opacity: 0, x: 0, y: 40, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                scale: 1 
              }}
              exit={{ opacity: 0, x: 0, y: 30, scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              className="relative pointer-events-auto flex items-center gap-1.5 md:gap-2.5 bg-accent text-[#0A0A0A] font-mono text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest px-3 py-2.5 md:px-4.5 md:py-3 shadow-[0_10px_30px_rgba(0,255,209,0.25)] hover:shadow-[0_15px_40px_rgba(0,255,209,0.45)] border border-accent/20 transition-[background-color,border-color,box-shadow] duration-300 group cursor-pointer overflow-hidden shimmer-btn-glow"
            >
              {/* Subtle animated premium perimeter glow */}
              <motion.div
                className="absolute inset-0 -z-10 bg-accent/60 blur-md pointer-events-none"
                animate={{
                  scale: [0.98, 1.15, 0.98],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Click ripple effect cells */}
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute bg-white/40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 240,
                    height: 240,
                  }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))}

              <span className="relative flex h-2 w-2 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0A0A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A0A0A]"></span>
              </span>
              <MessagesSquare className="w-3 h-3 md:w-3.5 md:h-3.5 z-10" />
              <span className="z-10">Request Consultation</span>
              <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform z-10" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
