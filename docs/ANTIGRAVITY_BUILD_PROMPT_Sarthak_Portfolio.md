# Antigravity Build Prompt — Sarthak Makkar Gaming Portfolio

Build a premium, production-quality single-page portfolio website for **Sarthak Makkar**. Use the attached architecture document `Sarthak_Portfolio_Website_Architecture.docx` as the source of truth for structure, content, motion, project hierarchy, and acceptance criteria. Use the supplied resume files as the content source; do not invent facts.

## 1) Design goal
Create a **cinematic cyber-racing / gaming portfolio** inspired by the supplied Wix reference template (Gaming Company / Playful, template 3830). Do not copy proprietary copy, imagery, or exact layout. Recreate the *feeling*: dark game-intro scene, high-energy motion, angular UI, neon accents, futuristic car, scroll-driven storytelling.

The site should feel like:
- a game launch screen in the hero,
- a premium engineering portfolio in the content sections,
- a recruiter-friendly technical case-study index by the time the user reaches projects.

The visual must never overwhelm the actual portfolio information.

## 2) Canonical personal content
Use these exact facts from the provided resumes:
- Name: Sarthak Makkar
- Location: Delhi, India
- Email: sarthakmakkar60@gmail.com
- Phone: +91 9468307819
- LinkedIn: https://linkedin.com/in/sarthakmakkar10
- GitHub: https://github.com/sarthak102005
- Education: B.Tech Information Technology, Bhagwan Parshuram Institute of Technology (BPIT), 2023–2027, graduating July 2027
- CGPA: prefer 8.495 for the SDE/default presentation; AI resume formats it as 8.49
- ShortHills AI: Technology Intern, Jun 2026 – Aug 2026, Gurugram
- Hackhazards 2024: Top 15 teams

Positioning: backend / full-stack engineer with strong production reliability patterns, plus applied AI / GenAI experience. The AI resume specifically emphasizes Generative AI, Agentic Systems and production-grade RAG pipelines.

## 3) Five projects — all must be shown
### A. ReachInbox — PRIMARY
Live: https://reach-inbox-topaz.vercel.app
Type: Email Job Scheduler
Tech: Node.js, TypeScript, Express, BullMQ, Redis, PostgreSQL, Next.js, Tailwind, Google OAuth, Slack OAuth 2.0
Source claims to preserve:
- persistent delayed-job scheduling instead of cron
- boot-time reconciliation after process restarts
- zero duplicate or lost sends
- per-sender atomic Redis rate limiting with automatic rescheduling
- Slack OAuth 2.0 alerts deduplicated with distributed locking
- idempotent processing / exactly-once delivery under concurrent workers
- CSV bulk recipient upload and real-time scheduled/sent tracking
- deployed across Render, Vercel, Neon PostgreSQL and Redis

### B. Earnease — PRIMARY
Live: https://earnease-seven.vercel.app
Type: Earned Wage Access Platform
Tech: FastAPI, PostgreSQL, React, Framer Motion
Source claims to preserve:
- two-tier eligibility rules engine: hard-fail vs negotiable rules routed to HR
- six-state request lifecycle: Pending, Auto-Approved, Auto-Rejected, Escalated to HR, HR-Approved, HR-Rejected
- append-only audit logging separate from mutable request state
- Employee/HR RBAC with per-request database-backed verification
- wage-accrual engine preventing duplicate advances in a pay cycle
- calendar-day rate limiting
- bcrypt password hashing hardened against long passphrase inputs

### C. Quantum Scraper — FEATURED AI PROJECT
Live: https://quantum-scraper-beryl.vercel.app
Type: Multi-Agent LLM-Assisted Extraction Platform
Tech: Python, AsyncIO, FastAPI, Google ADK, MCP, semantic DOM analysis, JSON-LD parsing, LLM-assisted extraction, Docker
Source claims to preserve:
- hybrid extraction combining semantic DOM analysis, JSON-LD parsing and LLM reasoning
- confidence-driven validation / guardrail
- crawl diagnostics and coverage reporting
- 91.08% average product extraction accuracy across 5 enterprise manufacturer sites
- sites named in AI resume: JCB, Kawasaki, Bobcat, Husqvarna, JLG
- dual CSV/JSON export and Docker deployment on Oracle Cloud

### D. Ask-Wiki — FEATURED AI PROJECT
Live: https://huggingface.co/spaces/sarthak1001/ai-wikipedia-rag
Type: RAG-Based Wikipedia Chatbot
Tech: RAG, Sentence-Transformer embeddings, vector databases, RAGAS, DeepEval
Source claims to preserve:
- fetch, chunk and embed Wikipedia content for queried topics
- grounded answers using retrieved context
- chunking/overlap strategy and embedding generation
- model fallbacks for API-rate-limit resilience
- evaluated across 7,500 total test queries
- 89% weighted composite score; 92% precision at the 500-query threshold

### E. Brief.ly — SECONDARY SDE PROJECT
Live: https://brief-ly-eight.vercel.app
Type: URL Shortener & Analytics
Tech: FastAPI, PostgreSQL, Redis, React, Docker Compose
Source claims to preserve:
- Redis cache-aside redirect resolution
- per-user and per-IP rate limiting with HTTP 429 responses
- scoped demo JWT for unauthenticated trials
- denormalized click counter plus append-only click log
- live deployment on Render/Vercel

## 4) Exact page structure
1. Persistent header
2. Full-screen animated hero
3. About / identity
4. Skills
5. Projects
6. Experience
7. Contact
8. Footer

## 5) Hero — the signature interaction
This is the most important visual requirement. The first viewport must look and feel like the car is **actually moving through the scene**.

Implement it with **Framer Motion** and browser-friendly transforms. Do not add a heavyweight 3D engine unless absolutely necessary.

Hero layers:
- night city / road background
- road streaks / light trails
- futuristic sports car
- subtle fog / grain / scanline texture
- foreground text
- navigation

Hero motion sequence:
- scene fades in from near-black
- car enters or crosses the hero horizontally/diagonally with depth/parallax
- while the car crosses a trigger point, reveal the identity lines in sequence
- reveal role line: `BACKEND • FULL STACK • GENAI`
- reveal one-sentence value proposition
- reveal CTA buttons
- then hand control to page scroll

Preferred text treatment:
`SARTHAK` large
`MAKKAR` large, accent emphasis
`BACKEND • FULL STACK • GENAI`
`I build reliable production-grade systems and AI applications.`

Primary CTAs:
- VIEW PROJECTS → #projects
- RESUME → canonical SDE resume route
- GITHUB → Sarthak's GitHub

Add a small `SCROLL TO EXPLORE` indicator.

## 6) Resume routing — non-negotiable
The default Resume / Download Resume action must open the **SDE resume variant whose primary projects are ReachInbox and Earnease**.

Implement a stable route such as:
`/resume/sde`
or a static asset:
`/resume/sarthak-makkar-sde.pdf`

Put the supplied canonical SDE PDF in the public resume asset path during build setup. Do not make the AI resume the default download.

## 7) Projects section
Visually prioritize ReachInbox and Earnease first. Then present Quantum Scraper, Ask-Wiki and Brief.ly.

Every project card must contain:
- name
- category
- one-line purpose
- 2–3 technical proof bullets
- tech chips
- metric when source-supported
- `LIVE ↗` button
- `DETAILS →` button

`LIVE` must open the actual project URL in a new tab.

`DETAILS` can open an accessible modal/drawer or expand-in-place section. Do not route to fake project pages unless the implementation genuinely improves UX.

Primary cards should have stronger borders/glow and larger footprint.

## 8) About + Experience
About should make the user understandable in <10 seconds: B.Tech IT student, production backend experience, full-stack systems, reliability patterns, applied AI.

Use compact stats such as:
- B.Tech IT / BPIT
- 2023–2027
- 8.495 CGPA
- Top 15 — Hackhazards 2024

Experience section should reflect ShortHills AI accurately:
- FAISS → Qdrant migration + chunking tuning → 92% retrieval completeness
- multi-provider LLM fallback for rate-limit resilience
- Quantum Scraper → 91.08% extraction accuracy across 5 enterprise sites

## 9) Skills
Group into four visual clusters:
- Backend
- Frontend
- Core CS
- Applied AI / GenAI

Use badges/chips, but keep the section scannable. Do not create a wall of logos.

## 10) Visual system
Base: near-black / charcoal
Primary accent: neon lime
Secondary accent: optional restrained cyan-blue
Borders: low-opacity cool gray/green
Typography: futuristic condensed display + readable modern sans + optional mono metadata
Buttons: angular / chamfered, thin bright borders, subtle glow
Background: dark city / road / grid / texture

Do NOT use excessive rounded cards.
Do NOT make it look like a generic SaaS dashboard.
Do NOT sacrifice readability for visual effects.

## 11) Motion rules
Use motion for:
- hero car
- section reveals
- card hover
- active nav indicator
- subtle scanline / diagonal accent movement

Avoid:
- constant bouncing
- aggressive text distortions
- infinite loops inside content areas
- heavy particle systems

Honor `prefers-reduced-motion`. Reduced-motion mode must preserve layout and all content.

## 12) Implementation stack
Preferred:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Next/Image / optimized image assets

Keep project/profile content in typed data files rather than hardcoding repeated markup. Example:
- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/resumes.ts`

Suggested components:
- SiteHeader
- HeroScene
- CarMotionLayer
- HeroCopy
- AboutSection
- StatGrid
- SkillsSection
- ProjectsSection
- ProjectCard
- ProjectDetails
- ExperienceSection
- ContactSection
- SiteFooter

## 13) Accessibility
- semantic landmarks
- one H1
- logical H2 hierarchy
- keyboard navigation
- visible focus states
- accessible modal/drawer focus management
- alt text for meaningful images
- decorative layers aria-hidden
- sufficient text contrast
- reduced-motion support

## 14) Performance
- Optimize hero image aggressively; use WebP/AVIF when useful
- avoid giant uncompressed PNGs for live assets
- do not preload every project image
- use CSS transforms / opacity for animation
- avoid a full WebGL pipeline for the initial implementation
- keep below-the-fold imagery lazy-loaded

## 15) SEO / metadata
Set:
- title: `Sarthak Makkar — Backend / Full Stack / GenAI Engineer`
- concise description focused on production systems + applied AI
- Open Graph image
- favicon / SM monogram
- canonical URL placeholder

## 16) Responsive behavior
Desktop: full cinematic hero, 2–3 column projects.
Tablet: reduce scene scale and car travel.
Mobile: vertical hero, shorter car motion, stacked cards, persistent resume CTA.

Never hide live links or project descriptions behind hover-only behavior.

## 17) Content integrity rules
The resumes are the source of truth. Preserve terminology, metrics and project names. If a detail is not in the source, omit it or label it as a placeholder rather than inventing it.

Do not invent:
- testimonials
- client logos
- company names beyond ShortHills AI
- star ratings
- fake user counts
- fake project screenshots
- unsupported performance claims

## 18) Final acceptance checklist
Before declaring completion, verify:
- the hero visibly contains a moving car sequence
- Sarthak's name and role are readable during the opening sequence
- all five projects are present
- ReachInbox and Earnease are visually primary
- every live URL works
- Resume opens the canonical SDE resume containing ReachInbox + Earnease as primary projects
- GitHub, LinkedIn, email work
- ShortHills experience is present
- site works on desktop/tablet/mobile
- reduced-motion mode works
- no horizontal overflow
- no console errors
- no invented portfolio facts
- visual QA is completed at 1440×900, 1280×800, 768×1024 and 390×844

## 19) Build strategy
Build the page in this order:
1. data model and routing
2. visual tokens and global styles
3. hero scene + car motion
4. about / skills
5. projects
6. experience / contact
7. responsive pass
8. accessibility + reduced motion
9. performance + SEO
10. visual QA and cleanup

Do not stop at a wireframe or placeholder implementation. The goal is a visually finished, deployable portfolio.
