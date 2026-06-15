import { TeamMember, ServiceItem, CaseStudy } from "./types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "director",
    name: "MD Hasibuzzaman — Founder & Principal Director",
    role: "Lead Architect & Chief Executive Officer",
    bio: "As the solo driving force, lead architect, and primary point of contact, MD Hasibuzzaman personally designs and architects all client projects from start to finish. Backed by an elite, anonymous offshore network of specialized engineers and front-end developers, he bridges bespoke high-capacity visual designs with robust, high-yielding business outcomes.",
    expertise: ["System Architecture", "Creative Direction", "Product Strategy", "Client Relations", "Workflow Optimization"],
    regionalOverview: "Personally directs every architectural milestone and acts as your single point of contact, coordinating execution with an elite background network of deployment specialists."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "opti-web",
    title: "High-Performance Web Platforms (Opti-UI)",
    shortDesc: "Blazing-fast, custom websites and web portals tailored for your business. We ensure your users never bounce due to slow loading speeds. Built with React and modern architectures.",
    longDesc: "Blazing-fast, custom websites and web portals tailored for your business. We ensure your users never bounce due to slow loading speeds. Built with React and modern architectures.",
    iconName: "Layers",
    tags: ["React/Vite", "Tailwind CSS v4", "Fluid Animations", "Sub-Second Response"]
  },
  {
    id: "edge-ai",
    title: "Specialized AI Integration",
    shortDesc: "Smart software integration that automates complex data handling. We build practical AI systems and computer vision models that solve real business problems without exorbitant cloud bills.",
    longDesc: "Smart software integration that automates complex data handling. We build practical AI systems and computer vision models that solve real business problems without exorbitant cloud bills.",
    iconName: "Cpu",
    tags: ["Practical AI", "Computer Vision", "Cost Optimization", "Smart Automation"]
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation Engines",
    shortDesc: "Zero-maintenance automations that link your internal tools. We forge high-efficiency scripts and custom bot integrations, saving your business hours of manual, repetitive tasks every week.",
    longDesc: "Zero-maintenance automations that link your internal tools. We forge high-efficiency scripts and custom bot integrations, saving your business hours of manual, repetitive tasks every week.",
    iconName: "Terminal",
    tags: ["Node.js Scripting", "API Interop", "Zero-Maintenance", "Eliminate Repetitive Tasks"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Custom Computer Vision GUI for Medical Research",
    client: "European Medical Research Institute (NDA Protected)",
    category: "AI & Computer Vision",
    problem: "Researchers were struggling with manual cell image classification, taking 3-4 days per experiment set with zero unified database export.",
    solution: "Designed and built a local fast GUI combining Electron and browser-based lightweight object detection models with unified CSV/SQL tracking.",
    metrics: "VERIFIED ROI: Reduced manual classification latency from 4 days to 14 minutes with a 99.1% precision rate.",
    tech: ["React", "Tailwind CSS", "ONNX Web Runtime", "Local SQL Storage"]
  },
  {
    id: "case-2",
    title: "Automated Tech Stack Cost Optimizer",
    client: "US-Based SaaS Enterprise (NDA Protected)",
    category: "Intelligent Automation",
    problem: "SaaS startup was overspending close to $23,000 monthly due to over-allocated database shards and redundant API webhooks.",
    solution: "Forged a clean analytical engine with real-time alerting, automated API call merging, and elastic server scaling configurations.",
    metrics: "VERIFIED ROI: Saved 42% on monthly cloud hosting bills within 30 days of deployment.",
    tech: ["Node.js", "Express", "D3.js Visualization", "Google Cloud APIs"]
  }
];
