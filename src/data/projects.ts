export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  priority: "primary" | "featured" | "secondary";
  category: "backend" | "fullstack" | "ai";
  liveUrl: string;
  stack: string[];
  summary: string;
  proofPoints: string[];
  metric?: { label: string; value: string };
  architectureNotes: string[];
};

export const projects: Project[] = [
  {
    slug: "reachinbox",
    name: "ReachInbox",
    subtitle: "Email Job Scheduler",
    priority: "primary",
    category: "backend",
    liveUrl: "https://reach-inbox-topaz.vercel.app",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Next.js",
      "Tailwind",
      "Google OAuth",
      "Slack OAuth 2.0",
    ],
    summary:
      "Production email scheduling platform with persistent delayed-job processing, boot-time reconciliation, and exactly-once delivery guarantees.",
    proofPoints: [
      "Persistent delayed-job scheduling with boot-time reconciliation after process restarts — zero duplicate or lost sends",
      "Per-sender atomic Redis rate limiting with automatic rescheduling under load",
      "Idempotent exactly-once delivery under concurrent workers with distributed locking",
    ],
    metric: {
      label: "Delivery Guarantee",
      value: "Exactly-Once",
    },
    architectureNotes: [
      "Uses BullMQ for persistent delayed-job scheduling instead of cron — jobs survive process restarts through boot-time reconciliation",
      "Per-sender rate limiting implemented with atomic Redis counters; when a sender hits the limit, the job is automatically rescheduled rather than dropped",
      "Slack OAuth 2.0 alerts are deduplicated with distributed locking to prevent notification storms",
      "CSV bulk recipient upload with real-time scheduled/sent tracking dashboard",
      "Deployed across Render (API), Vercel (frontend), Neon PostgreSQL, and Redis",
    ],
  },
  {
    slug: "earnease",
    name: "Earnease",
    subtitle: "Earned Wage Access Platform",
    priority: "primary",
    category: "fullstack",
    liveUrl: "https://earnease-seven.vercel.app",
    stack: ["FastAPI", "PostgreSQL", "React", "Framer Motion"],
    summary:
      "Full-stack earned wage access system with a two-tier eligibility engine, six-state request lifecycle, and append-only audit logging.",
    proofPoints: [
      "Two-tier eligibility rules engine: hard-fail constraints vs negotiable rules routed to HR for approval",
      "Six-state request lifecycle with append-only audit logging separate from mutable request state",
      "Employee/HR RBAC with per-request database-backed verification and wage-accrual engine preventing duplicate advances",
    ],
    metric: {
      label: "Request States",
      value: "6-State FSM",
    },
    architectureNotes: [
      "Two-tier eligibility rules engine separates hard-fail constraints (e.g., minimum tenure) from negotiable rules routed to HR for manual approval",
      "Six-state lifecycle: Pending → Auto-Approved / Auto-Rejected / Escalated to HR → HR-Approved / HR-Rejected",
      "Append-only audit logging is kept separate from mutable request state for compliance and debugging",
      "Wage-accrual engine prevents duplicate advances within the same pay cycle",
      "Calendar-day rate limiting and bcrypt password hashing hardened against long passphrase inputs",
    ],
  },
  {
    slug: "quantum-scraper",
    name: "Quantum Scraper",
    subtitle: "Multi-Agent LLM-Assisted Extraction",
    priority: "featured",
    category: "ai",
    liveUrl: "https://quantum-scraper-beryl.vercel.app",
    stack: [
      "Python",
      "AsyncIO",
      "FastAPI",
      "Google ADK",
      "MCP",
      "Semantic DOM",
      "JSON-LD",
      "LLM Extraction",
      "Docker",
    ],
    summary:
      "Fault-tolerant multi-agent extraction platform combining semantic DOM analysis, JSON-LD parsing, and LLM reasoning with confidence-driven validation.",
    proofPoints: [
      "Hybrid extraction combining semantic DOM analysis, JSON-LD parsing, and LLM reasoning",
      "Confidence-driven validation guardrails with crawl diagnostics and coverage reporting",
      "91.08% average product extraction accuracy across 5 enterprise manufacturer sites",
    ],
    metric: {
      label: "Extraction Accuracy",
      value: "91.08%",
    },
    architectureNotes: [
      "Combines three extraction strategies: semantic DOM analysis for structured content, JSON-LD parsing for schema.org metadata, and LLM-assisted reasoning for unstructured pages",
      "Confidence-driven validation assigns reliability scores to each extraction and flags low-confidence results for review",
      "Tested across 5 enterprise manufacturer sites: JCB, Kawasaki, Bobcat, Husqvarna, JLG",
      "Dual CSV/JSON export pipeline with crawl diagnostics and coverage reporting",
      "Deployed on Docker with Oracle Cloud hosting",
    ],
  },
  {
    slug: "ask-wiki",
    name: "Ask-Wiki",
    subtitle: "RAG-Based Wikipedia Chatbot",
    priority: "featured",
    category: "ai",
    liveUrl: "https://huggingface.co/spaces/sarthak1001/ai-wikipedia-rag",
    stack: [
      "RAG",
      "Sentence-Transformers",
      "Vector Databases",
      "RAGAS",
      "DeepEval",
    ],
    summary:
      "Retrieval-augmented generation chatbot that fetches, chunks, and embeds Wikipedia content for grounded, evaluation-driven responses.",
    proofPoints: [
      "Fetch, chunk, and embed Wikipedia content with configurable chunking/overlap strategy",
      "Model fallbacks for API-rate-limit resilience across multiple LLM providers",
      "89% weighted composite score; 92% precision at 500-query threshold across 7,500 test queries",
    ],
    metric: {
      label: "Composite Score",
      value: "89%",
    },
    architectureNotes: [
      "Fetches and chunks Wikipedia articles with configurable overlap strategy for optimal retrieval context",
      "Embedding generation via Sentence-Transformers with vector database storage for semantic search",
      "Multi-provider LLM fallback system ensures resilience against API rate limits",
      "Evaluation-driven development: tested across 7,500 total queries using RAGAS and DeepEval frameworks",
      "92% precision achieved at the 500-query evaluation threshold",
    ],
  },
  {
    slug: "briefly",
    name: "Brief.ly",
    subtitle: "URL Shortener & Analytics",
    priority: "secondary",
    category: "backend",
    liveUrl: "https://brief-ly-eight.vercel.app",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Docker Compose"],
    summary:
      "URL shortener with Redis cache-aside resolution, multi-layer rate limiting, and real-time click analytics.",
    proofPoints: [
      "Redis cache-aside redirect resolution for sub-millisecond URL lookups",
      "Per-user and per-IP rate limiting with HTTP 429 responses and scoped demo JWT for unauthenticated trials",
      "Denormalized click counter plus append-only click log for real-time analytics",
    ],
    metric: {
      label: "Cache Strategy",
      value: "Cache-Aside",
    },
    architectureNotes: [
      "Redis cache-aside pattern: checks cache first, falls back to PostgreSQL, then populates cache for subsequent requests",
      "Dual rate limiting: per-user limits for authenticated users, per-IP limits for anonymous traffic, both returning HTTP 429",
      "Scoped demo JWT allows unauthenticated users to trial the shortener without registration",
      "Denormalized click counter for fast dashboard reads, plus an append-only click event log for detailed analytics",
      "Live deployment on Render (API) and Vercel (frontend) with Docker Compose for local development",
    ],
  },
];
