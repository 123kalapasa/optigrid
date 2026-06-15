import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for smart blueprint and cost estimation
  app.post("/api/estimate", async (req: express.Request, res: express.Response) => {
    try {
      const { description, budgetRange, targetMarket, servicesDesired } = req.body;
      
      if (!description || description.trim() === "") {
        return res.status(400).json({ error: "Project description is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add it to your secrets using the Settings panel."
        });
      }

      // Lazy initialization of GoogleGenAI
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are the chief technology officer and principal architect at 'Optigrid' (an elite decentralized tech agency offering hyper-optimized interfaces, automated workflow engines, and intelligent custom AI integrations for global clients).
You received a project inquiry:
- Client Idea & Goals: "${description}"
- Budget Bracket: "${budgetRange || "Optimized Core"}"
- Target Client Market: "${targetMarket || "International"}"
- Required Services: ${JSON.stringify(servicesDesired || [])}

Provide an intelligent, highly expert, and detailed technical architecture proposal and estimate. Highlight how our elite engineering team will deploy lightweight, hyper-fast systems to ensure highly competitive budgets while maintaining stellar world-class software quality.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectName: { type: Type.STRING },
              headline: { type: Type.STRING },
              architecture: {
                type: Type.OBJECT,
                properties: {
                  frontend: { type: Type.STRING },
                  backend: { type: Type.STRING },
                  database: { type: Type.STRING },
                  keyLibraries: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  rationale: { type: Type.STRING }
                },
                required: ["frontend", "backend", "database", "keyLibraries", "rationale"]
              },
              mvpFeatures: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    difficulty: { type: Type.STRING }
                  },
                  required: ["name", "description", "difficulty"]
                }
              },
              workflowAutomation: {
                type: Type.STRING,
                description: "Automated test systems, continuous continuous deployment hooks, or specific speed optimizations proposed."
              },
              timelineStages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stageName: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    deliverables: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["stageName", "duration", "deliverables"]
                }
              },
              budgetOptimizationNote: { type: Type.STRING }
            },
            required: [
              "projectName",
              "headline",
              "architecture",
              "mvpFeatures",
              "workflowAutomation",
              "timelineStages",
              "budgetOptimizationNote"
            ]
          }
        }
      });

      const jsonResponse = response.text ? JSON.parse(response.text) : {};
      return res.json(jsonResponse);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || "Failed to generate recommendation blueprint due to server error." });
    }
  });

  // Mount Vite middleware or fall back to static dist serving depending on NODE_ENV
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Optigrid full-stack server running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
