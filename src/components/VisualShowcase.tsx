import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Globe, 
  CreditCard, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShoppingCart,
  TrendingUp,
  Layout,
  Briefcase,
  Layers,
  Award,
  Palette,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  performanceScore: string;
  loadTime: string;
  estimatedReturn: string;
  uiMockup: {
    navbarTitle: string;
    themeColors: string[];
    layoutName: string;
    previewType: "ecommerce" | "saas" | "portfolio" | "dashboard";
  };
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "ecommerce",
    category: "High-Conversion Commerce",
    title: "Apex Storefront Platform",
    description: "A lightning-fast, ultra-responsive modern storefront optimized directly for the highest conversion numbers. Features modular Stripe API, automatic local currency checkout, premium product layout cards, and fluid transition animations.",
    techStack: ["React 19", "Vite", "Tailwind 4", "Stripe API", "Framer Motion"],
    features: [
      "Sub-second checkout pipeline",
      "Dynamic catalog search & filters",
      "Stripe Express & credit card support",
      "Robust state manager cart tracker"
    ],
    performanceScore: "99/100 LCP",
    loadTime: "0.28s",
    estimatedReturn: "+42% Conversion Rate",
    uiMockup: {
      navbarTitle: "APEX // APPAREL",
      themeColors: ["#00FFD1", "#FF80E3", "#8A5CF6"],
      layoutName: "Boutique Apparel Template",
      previewType: "ecommerce"
    }
  },
  {
    id: "saas",
    category: "Next-Gen SaaS Landing Page",
    title: "SaaS Launchpad Site",
    description: "An elite visual marketing landing page crafted with modern editorial typography, responsive pricing tiers, waitlist integrations, interactive metric charts, and mesmerizing spotlight gradients to maximize lead conversions.",
    techStack: ["Vite Spec", "Tailwind CSS", "Recharts", "Loops Email SDK", "Motion"],
    features: [
      "Modern editorial dark/light canvas",
      "Interactive tier cost calculator",
      "Automated waitlist CSV system",
      "Spotlight gradients track on mouse"
    ],
    performanceScore: "100/100 SEO",
    loadTime: "0.32s",
    estimatedReturn: "2.8x Waitlist Signups",
    uiMockup: {
      navbarTitle: "NEURAL.AI",
      themeColors: ["#FF80E3", "#00FFD1", "#F59E0B"],
      layoutName: "Corporate SaaS Showcase",
      previewType: "saas"
    }
  },
  {
    id: "portfolio",
    category: "Elite Creative Agency Portfolio",
    title: "Luxurious Studio Canvas",
    description: "A prestigious, visually arresting editorial layout tailored for premium agencies, high-value visual creatives, and corporate studios. Designed with smooth momentum scroll, spacious negative spacing, and cinematic hover states.",
    techStack: ["React 18", "WGL Canvas Context", "Tailwind v4", "Inter & Space fonts"],
    features: [
      "Spacious grid system layouts",
      "Fluid page momentum state",
      "Cinematic item expansion",
      "Bespoke inquiry system integration"
    ],
    performanceScore: "98/100 UX",
    loadTime: "0.45s",
    estimatedReturn: "+150% Brand Authority",
    uiMockup: {
      navbarTitle: "AESTHETE // LAB",
      themeColors: ["#FFFFFF", "#00FFD1", "#FF8181"],
      layoutName: "Minimalist Media Gallery",
      previewType: "portfolio"
    }
  },
  {
    id: "dashboard",
    category: "Enterprise Control Panel",
    title: "Command Center Web App",
    description: "A highly detailed, secure administrative control panel designed for operators, analytics trackers, and workflow managers. Powered by secure backend routes, flexible data tables, and dynamic visual graphs.",
    techStack: ["React 19", "D3 Engine", "Tailwind Core", "PostgreSQL Spec", "Lucide Icons"],
    features: [
      "Real-time chart system updates",
      "Searchable & pageable client tables",
      "Bespoke modular system sidebar",
      "Role-based privilege simulation"
    ],
    performanceScore: "97/100 FCP",
    loadTime: "0.49s",
    estimatedReturn: "-60% Management Man-Hours",
    uiMockup: {
      navbarTitle: "GRID // SYSTEMS",
      themeColors: ["#F59E0B", "#00FFD1", "#FF80E3"],
      layoutName: "Metrics & Operations Matrix",
      previewType: "dashboard"
    }
  }
];

export default function VisualShowcase() {
  const [selectedId, setSelectedId] = useState<string>("ecommerce");
  const [activeAccentColor, setActiveAccentColor] = useState<string>("#00FFD1");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Find the currently active template details
  const activeItem = SHOWCASE_ITEMS.find(item => item.id === selectedId) || SHOWCASE_ITEMS[0];

  // Set the default accent color for a template when switching tabs
  const handleTabChange = (id: string) => {
    setSelectedId(id);
    const item = SHOWCASE_ITEMS.find(i => i.id === id);
    if (item && item.uiMockup.themeColors.length > 0) {
      setActiveAccentColor(item.uiMockup.themeColors[0]);
    }
  };

  // Pre-fill target project spec form (by triggers scroll)
  const handleOrderSetup = (title: string) => {
    setOrderNotification(`Pre-selected: "${title}" package. Let's fill out the inquiry form below!`);
    
    // Auto populate sample placeholder if textarea exists
    const textarea = document.getElementById("project-brief-input") as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = `I want to order a custom version of the "${title}". Here are our custom requirements: `;
      // Trigger native state update event
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    setTimeout(() => {
      document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
    }, 200);

    setTimeout(() => {
      setOrderNotification(null);
    }, 5000);
  };

  return (
    <div className="space-y-12">
      {/* Category selector tabs */}
      <div className="flex border-b border-white/5 overflow-x-auto scroller-hidden">
        <div className="flex min-w-full justify-start md:justify-center p-1 gap-1">
          {SHOWCASE_ITEMS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`px-4 md:px-5 py-3 font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer relative ${
                  isSelected
                    ? "text-accent bg-accent/5 font-black"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {item.id === "ecommerce" && <ShoppingCart className="w-3 h-3 inline mr-2 -mt-0.5" />}
                {item.id === "saas" && <TrendingUp className="w-3 h-3 inline mr-2 -mt-0.5" />}
                {item.id === "portfolio" && <Layout className="w-3 h-3 inline mr-2 -mt-0.5" />}
                {item.id === "dashboard" && <Layers className="w-3 h-3 inline mr-2 -mt-0.5" />}
                {item.title}
                {isSelected && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {orderNotification && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] p-3 text-center uppercase tracking-wider"
        >
          {orderNotification}
        </motion.div>
      )}

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Highly Polished Interactive Device Mockup Frame */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">
          
          {/* Header controls for Device preview and accent color customizer */}
          <div className="flex justify-between items-center bg-[#111] border border-white/5 p-3.5 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-white/30 uppercase tracking-widest font-black">// PREVIEW CONFIG</span>
              
              {/* Color accent selection */}
              <div className="flex items-center gap-1.5 ml-2">
                <span className="text-[8.5px] text-white/50 mr-1 font-bold">Accent:</span>
                {activeItem.uiMockup.themeColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveAccentColor(color)}
                    className="w-3.5 h-3.5 rounded-full ring-offset-[#0A0A0A] transition-all cursor-pointer relative"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: activeAccentColor === color ? `0 0 8px ${color}` : "none",
                      border: activeAccentColor === color ? "1.5px solid #fff" : "1px solid rgba(255,255,255,0.15)"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Device Toggles */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 text-[8.5px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === "desktop" ? "text-accent bg-accent/5" : "text-white/30 hover:text-white"
                }`}
              >
                <Laptop className="w-3 h-3" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 text-[8.5px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === "mobile" ? "text-accent bg-accent/5" : "text-white/30 hover:text-white"
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Actual Mockup container */}
          <div className="relative flex justify-center items-center w-full bg-[#050505] border border-white/5 p-4 md:p-8 overflow-hidden min-h-[420px]">
            {/* Ambient background decoration behind browser frame */}
            <div 
              className="absolute w-52 h-52 rounded-full blur-[80px] opacity-15 pointer-events-none transition-colors duration-700" 
              style={{ backgroundColor: activeAccentColor }}
            />
            
            {/* High fidelity Browser Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedId}-${previewDevice}`}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`bg-[#0F0F0F] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col select-none ${
                  previewDevice === "desktop" 
                    ? "w-full max-w-full aspect-[16/10.2] rounded-none" 
                    : "w-64 aspect-[9/18] rounded-[24px] border-[6px] border-white/15"
                }`}
              >
                {/* Browser top-bar indicator for desktop, speaker slit for mobile */}
                {previewDevice === "desktop" ? (
                  <div className="flex items-center justify-between bg-[#151515] px-4 py-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/50" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <span className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    {/* Fake search URL */}
                    <div className="bg-[#050505] rounded-none border border-white/5 px-4 py-0.5 text-[8px] text-white/35 font-mono w-48 text-center truncate">
                      https://client-preview.{selectedId}.test
                    </div>
                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-wider font-bold">Secure SSL</span>
                  </div>
                ) : (
                  <div className="h-6 w-full bg-[#151515] flex justify-center items-center relative border-b border-white/5">
                    <div className="w-12 h-3.5 bg-black rounded-b-xl absolute top-0 flex justify-center items-center z-10">
                      <span className="w-3 h-[2px] bg-white/25 rounded-full absolute top-[2px]" />
                      <span className="w-1.5 h-1.5 bg-indigo-500/30 rounded-full" />
                    </div>
                    <span className="text-[7.5px] font-mono text-white/40 absolute left-4">12:00</span>
                    <span className="text-[7px] font-mono text-white/40 absolute right-4">5G</span>
                  </div>
                )}

                {/* Simulated Custom Client Site Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-[#0A0A0A] text-left text-white font-sans flex flex-col justify-between">
                  
                  {/* Top Navbar */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-3.5">
                    <span className="font-mono text-[9px] font-black tracking-widest text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeAccentColor }} />
                      {activeItem.uiMockup.navbarTitle}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[8.5px]">
                      <span className="text-white/40 hidden sm:inline">Collection</span>
                      <span className="px-2 py-0.5 rounded-none text-black font-extrabold text-[8px]" style={{ backgroundColor: activeAccentColor }}>
                        SHOP
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Template Mockup Views */}
                  <div className="flex-1 flex flex-col gap-3 justify-center">
                    
                    {activeItem.uiMockup.previewType === "ecommerce" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#111] border border-white/5 space-y-1 relative">
                          <span className="text-[7.5px] font-mono uppercase tracking-widest block font-bold" style={{ color: activeAccentColor }}>
                            ★ BESTSELLER // AUTUMN CAPTION
                          </span>
                          <h4 className="font-serif font-bold text-sm tracking-tight text-white/95">Cyber-Weave Hybrid Trench</h4>
                          <span className="text-[10px] font-mono text-white/50">$312.00</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#11s] p-2 bg-white/2 border border-white/5 text-[9px] font-mono">
                            <span className="text-white/40 block">Size</span>
                            <span className="font-bold text-white">Large (L)</span>
                          </div>
                          <button 
                            className="text-[#050505] font-mono text-[9.5px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-transform border"
                            style={{ 
                              backgroundColor: activeAccentColor,
                              borderColor: activeAccentColor,
                              boxShadow: `0 4px 12px ${activeAccentColor}20` 
                            }}
                          >
                            <ShoppingCart className="w-3 h-3" /> Add To Bag
                          </button>
                        </div>
                        {/* Instant visual checkout stats simulated inline */}
                        <div className="bg-white/1 px-3 py-2 border border-white/5 flex justify-between items-center font-mono text-[8px] text-white/40">
                          <span>Express Billing Sync</span>
                          <span className="text-white/80 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-accent" /> SSL ACTIVE
                          </span>
                        </div>
                      </div>
                    )}

                    {activeItem.uiMockup.previewType === "saas" && (
                      <div className="space-y-3.5 text-center">
                        <div className="space-y-1.5 max-w-[280px] mx-auto">
                          <h4 className="font-sans font-black text-xs md:text-sm uppercase tracking-tight text-white leading-tight">
                            Build <span style={{ color: activeAccentColor }}>Intelligent Systems</span> At Scale
                          </h4>
                          <p className="text-[9px] text-white/50 leading-relaxed font-sans">
                            Sub-second vector querying, semantic token sorting, and integrated automated workflow actions in one layout.
                          </p>
                        </div>
                        
                        {/* Dynamic Interactive Pricing Slider Mock */}
                        <div className="bg-white/2 border border-white/5 p-2.5 rounded-none text-left space-y-1 max-w-[240px] mx-auto">
                          <div className="flex justify-between items-center text-[8.5px] font-mono">
                            <span className="text-white/40 font-bold">API CONTEXT RATIO:</span>
                            <span style={{ color: activeAccentColor }} className="font-black">10M TOKENS</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 relative">
                            <div className="h-full w-2/3" style={{ backgroundColor: activeAccentColor }} />
                            <div className="w-2 h-2 rounded-full absolute -top-0.5 left-2/3 -translate-x-1/2 cursor-pointer shadow-md" style={{ backgroundColor: activeAccentColor }} />
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-[8.5px] font-mono text-white/70 font-semibold">
                            <span>Cost: $19/mo</span>
                            <span className="text-white/40">Includes OAuth</span>
                          </div>
                        </div>

                        {/* CTA waitlist input box */}
                        <div className="flex bg-[#111] border border-white/5 max-w-[240px] mx-auto p-1 overflow-hidden">
                          <input 
                            readOnly 
                            placeholder="Enter your email address..." 
                            className="bg-transparent text-[8.5px] font-mono px-2 py-1 outline-none text-white/50 flex-1 border-none cursor-not-allowed" 
                          />
                          <button 
                            className="text-[#050505] font-mono text-[9px] font-black uppercase tracking-wider px-2.5 cursor-pointer hover:opacity-90"
                            style={{ backgroundColor: activeAccentColor }}
                          >
                            Join &rarr;
                          </button>
                        </div>
                      </div>
                    )}

                    {activeItem.uiMockup.previewType === "portfolio" && (
                      <div className="space-y-4 font-serif text-white/95">
                        <div className="space-y-1">
                          <span style={{ color: activeAccentColor }} className="text-[7px] font-mono tracking-widest uppercase block font-black">// DESIGNED IN DHAKA</span>
                          <h3 className="text-lg font-bold tracking-tight font-display leading-[1.1] uppercase italic">
                            Redefining visual latency benchmarks.
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1 border-t border-white/10 pt-1.5">
                            <span className="text-[8px] text-white/35 font-mono block tracking-widest uppercase font-bold">PROJECT ALPHA</span>
                            <h5 className="text-[10px] font-bold font-sans">Velvet Oracle Portal</h5>
                          </div>
                          <div className="space-y-1 border-t border-white/10 pt-1.5">
                            <span className="text-[8px] text-white/35 font-mono block tracking-widest uppercase font-bold">PROJECT BETA</span>
                            <h5 className="text-[10px] font-bold font-sans">Cosmosis Synth</h5>
                          </div>
                        </div>

                        {/* Minimalist contact note link */}
                        <span className="text-[9px] font-sans text-white/40 tracking-wide block hover:text-white transition-colors duration-300">
                          Let's craft your custom portfolio piece &rarr;
                        </span>
                      </div>
                    )}

                    {activeItem.uiMockup.previewType === "dashboard" && (
                      <div className="space-y-3 font-mono text-[9px]">
                        {/* Static metrics cards mock */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="bg-[#111] border border-white/5 p-1.5">
                            <span className="text-white/30 text-[7px] block tracking-widest uppercase">// INGRESS</span>
                            <span className="font-extrabold text-[11px] block mt-0.5" style={{ color: activeAccentColor }}>48.2 GB</span>
                          </div>
                          <div className="bg-[#111] border border-white/5 p-1.5">
                            <span className="text-white/30 text-[7px] block tracking-widest uppercase">// QUOTA</span>
                            <span className="text-white/80 font-extrabold text-[11px] block mt-0.5">99.84%</span>
                          </div>
                          <div className="bg-[#111] border border-white/5 p-1.5">
                            <span className="text-white/30 text-[7px] block tracking-widest uppercase">// LATENCY</span>
                            <span className="text-red-400 font-extrabold text-[11px] block mt-0.5">4.2 MS</span>
                          </div>
                        </div>

                        {/* Beautiful simulated chart inside mockup */}
                        <div className="bg-black/50 border border-white/5 p-2 h-20 flex items-end justify-between relative overflow-hidden">
                          <span className="absolute top-2 left-2 text-[7px] text-white/20 uppercase tracking-widest font-black">Live Data Stream Trace</span>
                          
                          {/* Bars */}
                          {[42, 68, 55, 90, 80, 48, 62, 75, 98, 85].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-[7%] transition-all duration-700 hover:opacity-80" 
                              style={{ 
                                height: `${h}%`, 
                                backgroundColor: i === 8 ? activeAccentColor : "#1f2937" 
                              }} 
                            />
                          ))}
                        </div>

                        {/* Action status */}
                        <div className="bg-[#121212] p-1.5 border border-white/5 text-[7.5px] text-white/40 flex justify-between items-center">
                          <span>Status: Sync Complete [OK]</span>
                          <span style={{ color: activeAccentColor }} className="font-bold flex items-center gap-1 text-[7px]">
                            <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: activeAccentColor }} /> REALTIME SECURE
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Mockup footer */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/25 border-t border-white/5 pt-2 mt-3 tracking-widest uppercase font-bold">
                    <span>Layout: {activeItem.uiMockup.layoutName}</span>
                    <span>Spec v1.02</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Right column: Package breakdown, Tech deliverables, metrics & order button */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between h-full space-y-6">
          
          {/* Main Template Details Card */}
          <div className="bg-gradient-to-b from-[#111] to-[#070707] border border-white/5 p-6 md:p-8 relative overflow-hidden text-left flex-1">
            
            {/* Visual aesthetic corners */}
            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent/25 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-accent/25 pointer-events-none" />
            
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono font-black tracking-widest text-[#FF80E3] uppercase block">
                  DEPLOYABLE SOLUTION SPEC // {activeItem.category}
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white mt-2 uppercase tracking-tight">
                  {activeItem.title}
                </h3>
              </div>

              <div className="w-12 h-[1.5px] bg-[#FF80E3] mt-2 mb-3" />

              <p className="text-white/60 text-xs md:text-sm font-sans leading-relaxed">
                {activeItem.description}
              </p>

              {/* Package performance matrices */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/5">
                <div className="bg-black/40 border border-white/5 p-3 font-mono">
                  <span className="text-[7.5px] text-white/30 block tracking-widest uppercase font-black">// LIGHTHOUSE</span>
                  <span className="text-xs md:text-sm font-black text-accent mt-0.5 block">{activeItem.performanceScore}</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 font-mono">
                  <span className="text-[7.5px] text-white/30 block tracking-widest uppercase font-black">// SPEED INDEX</span>
                  <span className="text-xs md:text-sm font-black text-accent mt-0.5 block">{activeItem.loadTime}</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 font-mono">
                  <span className="text-[7.5px] text-white/30 block tracking-widest uppercase font-black">// ANTICIPATED YIELD</span>
                  <span className="text-xs md:text-sm font-black text-[#FF80E3] mt-0.5 block">{activeItem.estimatedReturn}</span>
                </div>
              </div>

              {/* Technologies we use in the layout */}
              <div className="space-y-2 pt-2">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block font-black">
                  // DEPLOYED COMPLIANT TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-white/2 border border-white/10 text-[9px] font-mono text-white/75 px-2 py-0.5 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Out-of-the-box features details */}
              <div className="space-y-3.5 pt-3">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block font-black">
                  // INTEGRATED PRODUCT SPECIFICATIONS
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeItem.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-start font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="text-[10.5px] text-white/70 font-medium leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Action CTA Box */}
          <div className="bg-[#111] border border-white/5 p-5 md:p-6 text-left relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-black block">// ORDER CUSTOM BUILD</span>
              <h4 className="text-[11px] font-mono font-black text-white/90 uppercase tracking-wider">
                WE BUILD BESPOKE VERSIONS OF {activeItem.title.toUpperCase()}
              </h4>
              <p className="text-[10px] text-white/45 font-sans leading-tight">
                Fully dynamic, responsive matching, and deployment within 7 days.
              </p>
            </div>

            <motion.button
              onClick={() => handleOrderSetup(activeItem.title)}
              whileHover={{ scale: 1.05, translateY: -1 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-accent hover:bg-[#80FFEB] text-[#0A0A0A] font-extrabold px-6 py-3.5 font-mono text-[10px] uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_5px_20px_rgba(0,255,209,0.25)] border border-accent/25 shimmer-btn-glow shrink-0"
            >
              <span>Order Custom Build</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

      </div>

      {/* Direct Bottom Trust Badging Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left font-mono">
        <div className="bg-white/2 p-3.5 border border-white/5 flex items-center gap-3">
          <Globe className="w-5 h-5 text-accent/60 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[8px] text-white/30 block tracking-widest font-black uppercase">// DEPLOY SPEC</span>
            <span className="text-[10px] text-white font-bold uppercase">Immediate Cloud Deployment</span>
          </div>
        </div>
        <div className="bg-white/2 p-3.5 border border-white/5 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-accent/60 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[8px] text-white/30 block tracking-widest font-black uppercase">// TRANSACTION PROTOCOL</span>
            <span className="text-[10px] text-white font-bold uppercase">Stripe & Local Billing Gateway</span>
          </div>
        </div>
        <div className="bg-white/2 p-3.5 border border-white/5 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent/60 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[8px] text-white/30 block tracking-widest font-black uppercase">// BESPOKE FEATURES</span>
            <span className="text-[10px] text-white font-bold uppercase">Modular Gemini AI Pipelines</span>
          </div>
        </div>
      </div>

    </div>
  );
}
