export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  regionalOverview?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: "Terminal" | "Cpu" | "Layers" | "Share2" | "Zap";
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  problem: string;
  solution: string;
  metrics: string;
  tech: string[];
}

export interface QueryRequest {
  description: string;
  budgetRange: string;
  targetMarket: string;
  servicesDesired: string[];
}

export interface BlueprintResponse {
  projectName: string;
  headline: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    keyLibraries: string[];
    rationale: string;
  };
  mvpFeatures: Array<{
    name: string;
    description: string;
    difficulty: "Low" | "Medium" | "High";
  }>;
  workflowAutomation: string;
  timelineStages: Array<{
    stageName: string;
    duration: string;
    deliverables: string[];
  }>;
  budgetOptimizationNote: string;
}
