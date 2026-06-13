import { TeamMember, ServiceItem, CaseStudy } from "./types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "lead",
    name: "Md. Hasibuzzaman",
    role: "Lead Architect & Managing Partner",
    bio: "Pioneering high-performance AI-accelerated web interfaces and computer vision. Drives technical directions and code standards at Optigrid.",
    expertise: ["React/Vite", "Computer Vision", "AI integrations", "Technical Leadership", "System Optimization"],
    regionalOverview: "Directs and aligns core agency engineering principles, technical roadmaps, and code quality control thresholds. Highly specialized in modular server-side integrations and sub-second React client optimization."
  },
  {
    id: "asif",
    name: "Asif Hosen",
    role: "Core Systems & Infrastructure Lead",
    bio: "Architecting bulletproof backend systems, custom APIs, database optimizations, and intelligent automated workflows for international clients.",
    expertise: ["Node.js/Express", "PostgreSQL", "Workflow Automation", "API Engineering", "Security Audit"],
    regionalOverview: "Architects scalable full-stack pipelines, custom microservices, and specialized internal APIs. Engineered to secure database operations and eliminate manual workflow bottlenecks."
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
    client: "MedSight Laboratories (Germany)",
    category: "AI & Computer Vision",
    problem: "Researchers were struggling with manual cell image classification, taking 3-4 days per experiment set with zero unified database export.",
    solution: "Designed and built a local fast GUI combining Electron and browser-based lightweight object detection models with unified CSV/SQL tracking.",
    metrics: "VERIFIED ROI: Reduced manual classification latency from 4 days to 14 minutes with a 99.1% precision rate.",
    tech: ["React", "Tailwind CSS", "ONNX Web Runtime", "Local SQL Storage"]
  },
  {
    id: "case-2",
    title: "Automated Tech Stack Cost Optimizer",
    client: "AgileCorp Inc. (USA)",
    category: "Intelligent Automation",
    problem: "SaaS startup was overspending close to $23,000 monthly due to over-allocated database shards and redundant API webhooks.",
    solution: "Forged a clean analytical engine with real-time alerting, automated API call merging, and elastic server scaling configurations.",
    metrics: "VERIFIED ROI: Saved 42% on monthly cloud hosting bills within 30 days of deployment.",
    tech: ["Node.js", "Express", "D3.js Visualization", "Google Cloud APIs"]
  }
];
