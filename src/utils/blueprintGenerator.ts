import { QueryRequest, BlueprintResponse } from "../types";

export interface ExtendedBlueprintResponse extends BlueprintResponse {
  estimatedCost?: string;
}

export function generateDynamicBlueprint(request: QueryRequest): ExtendedBlueprintResponse {
  const { description, budgetRange, targetMarket, servicesDesired } = request;

  // 1. Project Name Ingestion & Synthesis
  const descLower = description.toLowerCase();
  let baseName = "AetherCore";
  
  if (descLower.includes("health") || descLower.includes("medical") || descLower.includes("clinic") || descLower.includes("doctor") || descLower.includes("lab")) {
    baseName = "Medsight Labs";
  } else if (descLower.includes("sales") || descLower.includes("lead") || descLower.includes("crm") || descLower.includes("report") || descLower.includes("copy")) {
    baseName = "OptiSync Sales";
  } else if (descLower.includes("commerce") || descLower.includes("shop") || descLower.includes("store") || descLower.includes("checkout") || descLower.includes("cart")) {
    baseName = "NovaMercato";
  } else if (descLower.includes("ai") || descLower.includes("predict") || descLower.includes("model") || descLower.includes("smart") || descLower.includes("gemini")) {
    baseName = "SynthCognition";
  } else if (descLower.includes("workflow") || descLower.includes("script") || descLower.includes("automation") || descLower.includes("manual")) {
    baseName = "AutoTasker";
  } else {
    const prefix = targetMarket.includes("APAC") 
      ? "Pan-Pacific" 
      : targetMarket.includes("Global") 
        ? "Global-Aegis" 
        : "OmniMobile";
    
    const suffix = servicesDesired.includes("AI Integration & Smart Automation") 
      ? "NeuroSystem" 
      : servicesDesired.includes("Internal Business Workflow Scripts")
        ? "WorkflowGrid"
        : "Platform";
    
    baseName = `${prefix} ${suffix}`;
  }

  const projectName = `${baseName} Dynamic Blueprint`;

  // 2. High-End Headline Creation
  const servicesCount = servicesDesired.length;
  const headline = `An expert, low-latency deployment framework targeting ${
    targetMarket.includes("APAC") ? "APAC markets" : targetMarket.includes("Global") ? "global enterprise scale" : "mobile-first ecosystems"
  }, engineered to optimize operations under a ${budgetRange} blueprint.`;

  // 3. Dynamic Cost Calculator
  let minCost = 3000;
  let maxCost = 4500;
  let costStr = "";

  if (budgetRange === "$2k - $5k") {
    minCost = 2200 + (servicesCount * 650);
    maxCost = 3100 + (servicesCount * 600);
    costStr = `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()} USD`;
  } else if (budgetRange === "$5k - $15k") {
    minCost = 5500 + (servicesCount * 1800);
    maxCost = 7200 + (servicesCount * 2200);
    costStr = `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()} USD`;
  } else { // $15k+
    minCost = 15500 + (servicesCount * 4500);
    maxCost = 21000 + (servicesCount * 5500);
    costStr = `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()}+ USD`;
  }

  // 4. Client-Customized Tech Stack Selection
  let frontend = "React 19 + TypeScript / Vite SPA Scaffold";
  let backend = "Serverless Cloudflare Edge Workers";
  let database = "Local browser IndexedDB Sandbox / CSV Exporter";

  if (budgetRange === "$2k - $5k") {
    if (targetMarket.includes("Mobile")) {
      frontend = "Fast-Load Mobile React 19 + Hardware-Accelerated Motion";
    }
    backend = "Serverless Cloudflare Edge Workers (Zero Cold Start)";
    database = "Client-Side IndexedDB Frame with Cloud Outflow Backup";
  } else if (budgetRange === "$5k - $15k") {
    frontend = "React 19 + Tailwind CSS + Interactive Framer Motion Dashboard Panels";
    backend = "Fully Type-Safe Node.js / Express Server Core (TSX compiler)";
    database = "Fully Managed PostgreSQL on Google Cloud SQL (Auto-Scaling)";
  } else { // $15k+
    frontend = "Next.js 15 (App Router) with Dynamic SSR & Streaming Ingestion Plates";
    backend = "Dual-Node Express Cluster / High-Latency Redundant Python Routers";
    database = "Distributed Cloud SQL PostgreSQL (Primary-replica) + Fast Redis Cache Room";
  }

  // 5. Intelligent Library Extraction
  const keyLibraries = ["lucide-react", "motion/react"];
  if (servicesDesired.includes("AI Integration & Smart Automation")) {
    keyLibraries.push("@google/genai");
    keyLibraries.push("zod");
  }
  if (servicesDesired.includes("Custom Web Application & UI Design")) {
    keyLibraries.push("recharts");
    keyLibraries.push("canvas-confetti");
  }
  if (servicesDesired.includes("Internal Business Workflow Scripts") || description.includes("csv") || description.includes("data") || description.includes("sync")) {
    keyLibraries.push("papaparse");
    keyLibraries.push("xlsx");
  }

  // 6. Professional Rationale Draft
  let rationale = `This structural layout is calibrated specifically for your target market focus. By pairing an ultra-clean ${frontend} layer with an optimized ${backend} backend, we minimize compute charges while maintaining sub-second user response times. `;
  
  if (budgetRange === "$2k - $5k") {
    rationale += `Because your budget scale is a streamlined MVP focus, we avoid costly active servers, leveraging serverless edge routing combined with ${database} to yield zero active hosting overhead.`;
  } else if (budgetRange === "$5k - $15k") {
    rationale += `To satisfy mid-scale enterprise performance needs in ${targetMarket}, we leverage cloud container scaling paired with standard transaction locks in PostgreSQL, providing clean data normalization.`;
  } else {
    rationale += `This high-tier enterprise blueprint incorporates next-generation streaming protocols, edge database replication, and memory-cached analytics, keeping your application fast even under high concurrent volumes.`;
  }

  // 7. Contextual MVP Features Mapping
  const mvpFeatures: Array<{ name: string; description: string; difficulty: "Low" | "Medium" | "High" }> = [];
  
  if (servicesDesired.includes("Custom Web Application & UI Design")) {
    mvpFeatures.push({
      name: "Dynamic Matrix Control Centre",
      description: "Interactive single-screen dashboard panel engineered with responsive data grids, smooth layout transitions, and touch-optimized actions.",
      difficulty: "Medium"
    });
  }

  if (servicesDesired.includes("AI Integration & Smart Automation")) {
    mvpFeatures.push({
      name: "Client Ingestion Cognition Filter",
      description: "Smart automation pipeline backed by server-side Gemini processors to automatically parse, structure, and categorize raw user requests in under 350ms.",
      difficulty: "High"
    });
  }

  if (servicesDesired.includes("Internal Business Workflow Scripts")) {
    mvpFeatures.push({
      name: "Automated Operational Grid Integrator",
      description: "Background sync services and custom event triggers to bridge form inputs directly with secure third-party endpoints or spreadsheets without manual operations.",
      difficulty: "Medium"
    });
  }

  // Fallback / Description-based final MVP feature
  let briefSnippet = description.length > 55 ? `${description.slice(0, 52)}...` : description;
  mvpFeatures.push({
    name: "Custom Tailored Delivery Module",
    description: `A custom-focused system designed specifically to bridge your exact brief requirements: "${briefSnippet}"`,
    difficulty: "Low"
  });

  // 8. Workflow Automation
  let workflowAutomation = "Automated continuous integration (CI/CD via GitHub Actions) deployed directly to edge routers on every branch push. Includes unified lint checks and automatic production bundling.";
  if (budgetRange === "$15k+") {
    workflowAutomation = "Full GitOps regression suites with automatic container load audits. Edge nodes replicate automatically across European and American gateways to bypass network slowdowns.";
  }

  // 9. Milestone Roadmaps calculation
  const timelineStages: Array<{ stageName: string; duration: string; deliverables: string[] }> = [];
  
  if (budgetRange === "$2k - $5k") {
    timelineStages.push({
      stageName: "Core Prototyping & Layout",
      duration: "1.5 Weeks",
      deliverables: ["Visual layout schema scaffolding", "Responsive mobile-first CSS check", "Tailwind styling parameters implementation"]
    });
    timelineStages.push({
      stageName: "Dynamic Workflow Setup",
      duration: "1.0 Week",
      deliverables: ["State controllers assembly", "Local IndexedDB database synchronization logic", "Mock raw data streams verification"]
    });
    timelineStages.push({
      stageName: "Functional Quality Audit & Push",
      duration: "0.5 Weeks",
      deliverables: ["Edge servers payload compression", "Production cloud push", "Technical handover handbook delivery"]
    });
  } else if (budgetRange === "$5k - $15k") {
    timelineStages.push({
      stageName: "Sensing Wireframes & API Contracts",
      duration: "2.0 Weeks",
      deliverables: ["Interactive dashboard layouts and mockups", "API route interface contracts definition", "PostgreSQL database table rules mapping"]
    });
    timelineStages.push({
      stageName: "Database & Backend Base Assembly",
      duration: "2.5 Weeks",
      deliverables: ["Full Express server router structures", "Google Cloud SQL database setup", "Visual component assembly and responsiveness checks"]
    });
    timelineStages.push({
      stageName: "Intelligent Pipeline Logic Influx",
      duration: "2.0 Weeks",
      deliverables: ["Dynamic database integration loops", "Custom event hooks setup", "System state-management rules synchronization"]
    });
    timelineStages.push({
      stageName: "Quality Audits & Stand-up Server Launch",
      duration: "1.5 Weeks",
      deliverables: ["Rigorous functional system test routines", "Cloud Run container configuration", "Secure live endpoint transition keys handover"]
    });
  } else { // $15k+
    timelineStages.push({
      stageName: "Enterprise Scalability Schematics",
      duration: "3.0 Weeks",
      deliverables: ["Technical design document verification", "Multi-region service routing specifications", "High-capacity server load strategy blueprinting"]
    });
    timelineStages.push({
      stageName: "Microservice Framing & Ingestion",
      duration: "4.0 Weeks",
      deliverables: ["Robust cluster API assembly", "Redis cache rules configuration", "Next.js server-rendered component architecture scaffolds"]
    });
    timelineStages.push({
      stageName: "Custom Processor Integration & Security",
      duration: "3.0 Weeks",
      deliverables: ["Server API keys proxy integration", "Automatic cloud clustering failovers activation", "Sub-second analytical data pipeline hooks definition"]
    });
    timelineStages.push({
      stageName: "Full Regression Auditing & Standby Rollout",
      duration: "2.0 Weeks",
      deliverables: ["System security load checks", "Penetration audit signing off", "Global edge network replication live release"]
    });
  }

  // 10. Budget Optimization Notes
  let budgetOptimizationNote = "We optimize static asset serving and use serverless edge pathways, reducing standard virtual machine reservation pricing by up to $150/month.";
  if (budgetRange === "$5k - $15k") {
    budgetOptimizationNote = "By implementing auto-scaled cloud instances and dynamic PostgreSQL connection recycling, you only pay for resources being active. Computing costs are strictly locked.";
  } else if (budgetRange === "$15k+") {
    budgetOptimizationNote = "Implementing regional Redis cache nodes reduces central DB read charges by more than 55%. Your global deployment tracks optimal operational margins automatically.";
  }

  return {
    projectName,
    headline,
    estimatedCost: costStr,
    architecture: {
      frontend,
      backend,
      database,
      keyLibraries,
      rationale
    },
    mvpFeatures,
    workflowAutomation,
    timelineStages,
    budgetOptimizationNote
  };
}
