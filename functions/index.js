const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenAI } = require("@google/genai");
const admin = require("firebase-admin");

function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  return admin.firestore();
}

const PORTFOLIO_SYSTEM_INSTRUCTION = `
You are the official AI Portfolio Concierge for Saman (Sam) Ebrahimi.
Your goal is to warmly, concisely, and accurately answer visitors' questions about Sam's background, his agentic transformation leadership, and his shipped systems.

VOICE & TONE:
- Professional, confident, articulate, and direct. Zero buzzword fluff.
- Keep spoken and written responses concise (1-3 sentences per turn unless a deep explanation is requested).
- If the visitor asks about a specific project, you can trigger a non-blocking UI co-browsing action on their screen (e.g., focusing a card, opening vitals, opening the demo request modal, or showing the phone QR pass).

CORE KNOWLEDGE BASE & GROUND TRUTH:

1. POSITIONING & LEADERSHIP:
- Sam Ebrahimi is a Technical Project Manager & Change Leader specializing in Agentic Transformation.
- He turns complex enterprise and consumer visions into governed, production-ready software using disciplined multi-agent workflows (formal specifications, deterministic rules engines, adversarial QA gates, and live telemetry).

2. FLAGSHIP ENTERPRISE PRODUCT — LEXSECURE:
- What it is: In-tenant legal contract intelligence, playbook redlining, and backoffice governance platform.
- Business Problem: Enterprise legal departments cannot use multi-tenant third-party SaaS AI due to strict regulatory, compliance, and confidentiality requirements.
- Solution: Runs 100% inside the client's Microsoft 365 and Azure tenant boundary.
- Architecture:
  * Zero Data Retention (ZDR) via Microsoft Foundry GPT-6 Luna under commercial enterprise terms.
  * 32KB duplex ephemeral RAM streaming directly to Azure Document Intelligence (0 MB server disk footprint).
  * Automated native Microsoft Word (.docx) redlining with tracked changes against institutional playbook standards.
  * Graph API access cryptographically locked strictly to designated legal site collections via Sites.Selected permissions.
  * 5-tier sensitivity watermarking, statutory retention countdowns, and Emergency Legal Hold overrides.
- Unit Economics: ~$0.02 per agreement analyzed and redlined. Pilot infrastructure cost <$21 with a hard $50 Bicep subscription cap.
- Confidentiality: Never expose internal test URLs or internal Azure resource group names. Always invite the user to request a personal 1-on-1 confidential demo walkthrough (trigger openLexSecureDemoModal).

3. CONSUMER APPS & GAMES (ORDERED BY POPULARITY):
- TerraCatch (293 Players, Live): Real-world wildlife capture and stats game using computer vision to identify local animal species and generate customized lore-driven battle profiles (Flutter, FastAPI, OpenAI API).
- Morn & Eve (257 Readers, Live): Daily spiritual companion app with Badi' calendar tracking, daily reading progressions, unbroken streak monitoring, and offline-first encrypted Isar storage (Flutter, Dart, Isar DB, Firebase).
- Dawn-Breakers Companion (85 Scholars, Live): Offline-first historical study companion featuring HTML5 canvas force-directed connection graphs, typo-tolerant fuzzy search, and offline Word export (React 19, Vite, PWA).
- Pingquest (52 Adventurers, Live): Multiplayer tabletop LitRPG Progressive Web App featuring an autonomous AI Dungeon Master, fractional micro-progression (+0.001 to +0.100), and live War Room voice deliberation (React 19, TypeScript, Gemini API, Firebase).
- Mailbox Janitor (35 Inboxes, Live): Client-side AI Gmail cleaner running on a Bring-Your-Own-Key model, classifying marketing clutter and running automated archiving passes with zero server token liability.
- Last Breath (24 Players, Live): Mobile-first social deduction (Werewolf / Clocktower) companion PWA with a 100% deterministic TypeScript night-resolution engine, Storyteller Digital Grimoire, and zero-asset procedural Web Audio synthesizer, verified with 155 automated Vitest/E2E tests (https://last-breath-game-2026.web.app).
- Wayfare Guide (14 Beta Testers, Launching Soon): GPS road-trip narration companion that dynamically narrates geographic folklore as coordinates change.
- Dalil Notecard (9 Users, Live): Hands-free tour guide assistant that transcribes speech in real time and checks off talking points automatically via local keyword matching.
- Wayfare Logic & Wayfare Network: In design (conversational multi-modal travel routing engine & community hospitality network).

4. CAREER & TRANSFORMATION JOURNEY:
- Phase 01 (Social Impact & ESF Delivery): Managed "Motivation United" funded by the European Social Fund, assisting 80 jobseekers with migration backgrounds into sustainable careers; completed all milestones 6 months ahead of schedule and within budget.
- Phase 02 (Founder & Matchmaker): Founded non-profit Talent2connect, connecting corporate employers with grassroots employment groups via major matchmaking events.
- Phase 03 (Legal Tech PM & Enterprise Cloud Migration): IT PM & Change Management in legal tech, then spearheaded the enterprise cloud migration to SharePoint at the Baha'i World Centre, moving 40 departments (750+ people) ahead of schedule and within budget.
- Phase 04 (Agentic Transformation Leader): Orchestrates multi-agent engineering teams with strict technical specifications, deterministic test gates, and in-tenant governance to deliver enterprise software in days rather than quarters.

5. PHONE QR PASS:
- In-person Digital Portfolio Pass for viewing the site directly on a mobile phone or sharing it at events.
`;

const PORTFOLIO_UI_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "focusProjectCard",
        description: "Smoothly scrolls to and highlights a specific project card on the page.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {
            cardId: {
              type: "STRING",
              description: "The HTML id of the card: cardLexSecure, cardTerraCatch, cardMornEve, cardLastBreath, cardPingquest, cardDalil, cardJanitor, cardDawnBreakers, cardGuide, cardLogic, cardNetwork."
            }
          },
          required: ["cardId"]
        }
      },
      {
        name: "openProjectVitals",
        description: "Opens the real-time Creator Vitals & Conversion Funnel modal for an app.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {
            projectId: {
              type: "STRING",
              description: "The project identifier: lexsecure, terracatch, morn-eve, last-breath, pingquest, dalil, janitor, dawn-breakers, guide."
            }
          },
          required: ["projectId"]
        }
      },
      {
        name: "openProjectConsole",
        description: "Opens the architecture and agentic engineering build console for an app.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {
            projectId: {
              type: "STRING",
              description: "The project identifier: lexsecure, terracatch, morn-eve, last-breath, pingquest, dalil, janitor, dawn-breakers, guide, logic, network."
            }
          },
          required: ["projectId"]
        }
      },
      {
        name: "openLexSecureDemoModal",
        description: "Opens the confidential Request Personal Demo modal for LexSecure.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {}
        }
      },
      {
        name: "openQrModal",
        description: "Opens the full-contrast In-Person Phone QR Pass modal.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {}
        }
      },
      {
        name: "filterPortfolio",
        description: "Filters the project cards by category.",
        behavior: "NON_BLOCKING",
        parameters: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              enum: ["all", "mobile", "webapp", "ai"]
            }
          },
          required: ["category"]
        }
      }
    ]
  }
];

// 1. Multi-Turn Text Chat API (gemini-3.8-flash)
exports.portfolioChat = onRequest(
  { cors: true, timeoutSeconds: 60, minInstances: 0, secrets: ["GEMINI_API_KEY"] },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { message, history } = req.body || {};
      if (!message || typeof message !== "string" || !message.trim()) {
        res.status(400).json({ error: "Missing message parameter" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "GEMINI_API_KEY secret is not configured" });
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // Construct conversation turns
      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.text && item.role) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text }]
            });
          }
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: `${PORTFOLIO_SYSTEM_INSTRUCTION}
          
OUTPUT FORMAT:
Respond with a valid JSON object matching this schema:
{
  "reply": "Your concise, direct response here (1-3 sentences)",
  "uiAction": null OR { "type": "focusProjectCard" | "openProjectVitals" | "openProjectConsole" | "openLexSecureDemoModal" | "openQrModal" | "filterPortfolio", "cardId"?: string, "projectId"?: string, "category"?: string }
}`,
          responseMimeType: "application/json",
          temperature: 0.4
        }
      });

      let parsed = { reply: response.text, uiAction: null };
      try {
        parsed = JSON.parse(response.text);
      } catch (parseErr) {
        console.warn("JSON parse error on Gemini response, raw text used:", response.text);
      }

      res.status(200).json(parsed);
    } catch (err) {
      console.error("portfolioChat error:", err);
      res.status(500).json({ error: "AI service encountered an error", details: err.message });
    }
  }
);

// 2. Ephemeral Token Dispenser for Gemini 3.8 Live WebSocket Audio
exports.portfolioLiveToken = onRequest(
  { cors: true, timeoutSeconds: 60, minInstances: 0, secrets: ["GEMINI_API_KEY"] },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "GEMINI_API_KEY secret is not configured" });
        return;
      }

      const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: "v1beta" } });
      const now = Date.now();

      const token = await ai.authTokens.create({
        config: {
          uses: 5,
          expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
          newSessionExpireTime: new Date(now + 5 * 60 * 1000).toISOString()
        }
      });

      res.status(200).json({
        token: token.name,
        model: "gemini-3.8-live",
        systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
        tools: PORTFOLIO_UI_TOOLS
      });
    } catch (err) {
      console.error("portfolioLiveToken error:", err);
      res.status(500).json({ error: "Failed to create ephemeral live token", details: err.message });
    }
  }
);

// 3. Confidential LexSecure Personal Demo Request Handler
exports.portfolioDemoRequest = onRequest(
  { cors: true, timeoutSeconds: 60, minInstances: 0 },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { name, email, organization, role, notes, _gotcha } = req.body || {};

      // Honeypot anti-spam check
      if (_gotcha) {
        res.status(200).json({ ok: true, dropped: true });
        return;
      }

      if (!name || !email || !organization) {
        res.status(400).json({ error: "Missing required fields: name, email, and organization" });
        return;
      }

      const leadDoc = {
        name: String(name).slice(0, 100),
        email: String(email).slice(0, 150),
        organization: String(organization).slice(0, 150),
        role: role ? String(role).slice(0, 100) : "Not specified",
        notes: notes ? String(notes).slice(0, 2000) : "",
        createdAt: Date.now(),
        ipAddress: req.ip || "unknown"
      };

      await getDb().collection("portfolio_demo_requests").add(leadDoc);
      console.log(`[DEMO REQUEST] Registered lead from ${leadDoc.email} (${leadDoc.organization})`);

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("portfolioDemoRequest error:", err);
      res.status(500).json({ error: "Failed to record demo request", details: err.message });
    }
  }
);
