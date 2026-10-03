/**
 * Every fact in this file comes from Nancy's public GitHub profile, her
 * repositories, or her pull requests (checked October 2026).
 * Fields set to `null` are things that could not be verified. Fill them in
 * from your resume/LinkedIn and the site will show them automatically.
 */

export const profile = {
  name: "Nancy Verma",
  /** Shown when the first name is toggled. */
  nameHindi: "नैंसी",
  photo: "/nancy.webp",
  handle: "nancy-verma780",
  identity: "CSE (AI & ML) student who builds full-stack products and learns in open source.",
  location: "Delhi, India",
  email: "nancy45815@gmail.com",
  links: {
    github: "https://github.com/nancy-verma780",
    // Two LinkedIn URLs exist: the one you gave me and the one on your GitHub
    // profile (in/nancy-verma-a9b81835b). Using yours; update GitHub to match.
    linkedin: "https://www.linkedin.com/in/nancy-verma780/",
    x: "https://x.com/nancyverma780",
    leetcode: "https://leetcode.com/nancyverma780",
    gssoc: "https://gssoc.girlscript.org/profile/2d403385-48ea-4dd0-8079-943fbb3f5876",
  },
};

export const hero = {
  intro:
    "I started with small Python scripts in 2025. By summer 2026 I was shipping pull requests to other people's codebases every week, and now I build AI-backed apps end to end, from the FastAPI service to the screen someone actually clicks.",
};

export type Chapter = {
  when: string;
  title: string;
  body: string[];
  tags?: string[];
  refs?: { label: string; href: string }[];
};

export const story: Chapter[] = [
  {
    when: "Mid 2025",
    title: "Python, one small program at a time",
    body: [
      "My first public repos are small on purpose: a guessing game, a state-capitals quiz, a command-line to-do list. Each one taught me one thing, like loops, input handling, or keeping state between turns.",
      "The most ambitious was AI-Nurse, a Streamlit symptom checker. It only knew a handful of diseases, and anything it didn't recognise got one answer: please consult a doctor. Small program, but the first time I had to decide what software should do when it doesn't know.",
    ],
    tags: ["Python", "Streamlit"],
    refs: [{ label: "AI-Nurse", href: "https://github.com/nancy-verma780/AI-Nurse" }],
  },
  {
    when: "2025 – 26",
    title: "B.Tech in CSE, with a focus on AI & ML",
    body: [
      "College gave the tinkering a spine. I started writing data structures and algorithms problems in C and keeping every solution in a public LeetCode repo, organised by topic: strings, arrays, and the rest.",
    ],
    tags: ["C", "DSA"],
    refs: [{ label: "LeetCode solutions", href: "https://github.com/nancy-verma780/Leetcode_Solutions" }],
  },
  {
    when: "May 2026",
    title: "Open source, all at once",
    body: [
      "I joined GSSoC'26 and a few other student open-source programs. My first pull request was a Content Security Policy fix on a DSA practice site. My GitHub went from a couple of contributions a month to more than a hundred.",
      "The real lesson wasn't writing code. It was reading code I didn't write, finding where a change belongs, and explaining it well enough that a maintainer says yes.",
    ],
    tags: ["Git", "GitHub Actions", "TypeScript"],
  },
  {
    when: "June 2026",
    title: "Going deep on a few projects",
    body: [
      "Instead of one-line fixes everywhere, I stuck with projects long enough to understand them. On a hybrid recommender system I fixed a memory leak in the SVD model and a rate-limiter weakness, and helped move the API to async. On Learnova, an academic platform, I added offline-sync retries, integration tests, and a Hindi chatbot.",
      "I also profiled ChromaDB query latency in a RAG document assistant and built a Twilio SOS alert for a mental-wellness app.",
    ],
    tags: ["FastAPI", "Redis", "ChromaDB", "Twilio", "i18n"],
  },
  {
    when: "July 2026",
    title: "Building my own",
    body: [
      "With other people's codebases behind me, I started my own. A Netflix-style dashboard where I recreated the 'ta-dum' sound using nothing but browser oscillators. Then CareerAI: a Next.js and FastAPI app that reads a resume, finds the gaps, and suggests a path.",
    ],
    tags: ["React", "Next.js", "FastAPI", "Supabase", "Gemini"],
  },
  {
    when: "August 2026",
    title: "Real-world problems",
    body: [
      "For the Razorpay Buildathon I built PunarPay, an agent that decides how to recover a failed payment, and when not to touch it. I also started planning AnaajSaathi, to make ration distribution less of a queue and more of a schedule.",
    ],
    tags: ["Payments", "Agents"],
  },
  {
    when: "Now",
    title: "Where I'm heading",
    body: [
      "I'm in my second year. The next step is making the 'AI' in my projects earn its name: moving CareerAI from keyword matching to models that actually understand a resume, finishing AnaajSaathi, and keeping my DSA practice steady.",
    ],
  },
];

export const focus = [
  {
    title: "Applied AI inside real products",
    body: "Not models in notebooks, but AI that sits behind a button: a Gemini career mentor in CareerAI, a RAG document assistant, a recommender system. Knowing where AI helps and where a rule is better.",
  },
  {
    title: "Full-stack web",
    body: "Next.js, TypeScript and Tailwind on the front; FastAPI and Supabase behind. I like owning the whole path a request takes.",
  },
  {
    title: "Open source",
    body: "Contributing to projects I don't own keeps me honest about code quality, tests, and writing clear pull requests.",
  },
  {
    title: "Problem solving",
    body: "Data structures and algorithms in C, solved and logged publicly so I can see my own progress.",
  },
];

export type SkillGroup = { group: string; items: { name: string; where?: string }[] };

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", where: "CareerAI backend, early projects, recommender contributions" },
      { name: "TypeScript", where: "CareerAI frontend, Learnova and DevPath contributions" },
      { name: "JavaScript", where: "Netflix dashboard, PunarPay" },
      { name: "C", where: "LeetCode solutions" },
      { name: "C++" },
      { name: "Java" },
      { name: "SQL" },
      { name: "HTML & CSS" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", where: "Netflix dashboard, CareerAI" },
      { name: "Next.js", where: "CareerAI" },
      { name: "Tailwind CSS", where: "almost everything" },
      { name: "Vite", where: "Netflix dashboard" },
      { name: "Web Audio API", where: "synthesised sound in the Netflix dashboard" },
      { name: "Chart.js", where: "PunarPay, Climate-Shield" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "FastAPI", where: "CareerAI, hybrid-recommender" },
      { name: "Supabase", where: "auth and storage in CareerAI" },
      { name: "Redis", where: "hybrid-recommender" },
      { name: "Twilio", where: "SOS alerts in MindMitra" },
    ],
  },
  {
    group: "AI / ML",
    items: [
      { name: "Google Gemini API", where: "CareerAI mentor chat" },
      { name: "spaCy", where: "CareerAI" },
      { name: "ChromaDB", where: "query latency work on PDF-Assistant-RAG" },
      { name: "Recommender systems", where: "SVD and hybrid filtering" },
    ],
  },
  {
    group: "Databases",
    items: [{ name: "PostgreSQL (Supabase)" }, { name: "MySQL" }, { name: "Redis" }],
  },
  {
    group: "Tools",
    items: [
      { name: "Git & GitHub" },
      { name: "GitHub Actions", where: "CI and duplicate-check workflows" },
      { name: "Vercel", where: "Netflix dashboard deploy" },
      { name: "Streamlit", where: "AI-Nurse" },
      { name: "VS Code" },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  status: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  detail: {
    approach: string[];
    architecture: string[];
    challenges: string[];
    outcome: string[];
  };
  links: { github: string; live?: string };
  visual: "career" | "punar" | "stream";
  /** Interactive demo ported from the project's real source code. */
  demo: "career" | "punar" | "tudum";
  /** Real screenshots in public/projects/<slug>/. Add your own here. */
  screens?: { src: string; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "careerai",
    name: "CareerAI",
    oneLiner: "Upload a resume and get your skills, a suggested role, the gaps, and a roadmap.",
    status: "Working locally, in active development",
    problem:
      "Students often don't know which role their current skills point toward, what's missing for it, or what to build next.",
    role: "Built end to end: the Next.js frontend and the FastAPI backend.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Supabase", "Gemini API", "spaCy", "pypdf"],
    highlights: [
      "Resume parsing for PDF and DOCX",
      "Separate analysis modules for skills, role fit, gaps, score, and roadmap",
      "Gemini-powered career chat that takes the student's profile as context",
      "GitHub analyzer that reads a user's public repos and languages",
    ],
    detail: {
      approach: [
        "A resume goes in as a PDF or Word file. The backend extracts the text, matches it against a skill vocabulary, and recommends the role whose skill set overlaps most.",
        "From that role it derives the missing skills, a resume score, a learning roadmap and project ideas, then stores the analysis in Supabase so a student can come back to their history.",
        "Open-ended questions go to a separate career-chat endpoint, where Gemini answers with the student's profile as context.",
      ],
      architecture: [
        "POST /upload-resume runs the full analysis pipeline",
        "GET /history/{email} returns saved analyses from Supabase",
        "POST /career-chat sends profile and question to Gemini",
        "GET /github-analysis/{username} scores public repo activity",
        "Next.js app with login, signup and a dashboard, using Supabase auth",
      ],
      challenges: [
        "I kept each analysis step in its own module (skill extraction, recommender, gap analysis, roadmap) so any one of them can be replaced by a smarter model without touching the API.",
        "The first version uses keyword matching for skills on purpose. It's predictable and easy to test, which made it a good baseline before adding NLP.",
      ],
      outcome: [
        "The full flow works end to end on my machine.",
        "Next: embedding-based skill extraction (spaCy is already wired in), tying every saved analysis to the signed-in user, and deploying it.",
      ],
    },
    links: { github: "https://github.com/nancy-verma780/CareerAI" },
    visual: "career",
    demo: "career",
  },
  {
    slug: "punarpay",
    name: "PunarPay",
    oneLiner: "A payment-recovery agent that decides how to retry a failed payment, or whether to retry at all.",
    status: "Razorpay Buildathon 2026 entry, Track 03",
    problem:
      "When a payment fails, most systems retry blindly. During a bank timeout that can charge a customer twice, and repeated retries cost gateway fees and trust.",
    role: "Designed and built the working prototype.",
    stack: ["JavaScript", "Tailwind CSS", "Chart.js", "HTML"],
    highlights: [
      "Detect → diagnose → decide → gate → act → verify → measure",
      "Deterministic policy guardrails before any action",
      "Benchmark against a blind-retry baseline on 1,000 transactions",
      "Single HTML file, no build step",
    ],
    detail: {
      approach: [
        "Each failed transaction is diagnosed by its failure reason (insufficient funds, issuer decline, network timeout, expired card, bank downtime) and mapped to a recovery action with a confidence and risk score.",
        "Before anything happens, a policy gate checks max retry attempts, a max amount for automated recovery, a minimum confidence, and a cooldown window. Anything that fails a rule goes to human escalation with an audit trail.",
        "Timeouts are treated differently: the agent verifies the upstream payment state first, so a payment that actually went through is never charged again.",
      ],
      architecture: [
        "Seeded synthetic dataset of 1,000 transactions (mulberry32 PRNG) with ground-truth outcomes",
        "Diagnosis layer behind an async interface, rule-based today",
        "Policy engine with configurable merchant thresholds",
        "Evaluation: confusion matrix, recovered revenue vs. baseline, CSV export",
      ],
      challenges: [
        "Making results reproducible. Seeding the data generator means every run of the benchmark produces the same numbers, so the comparison with the baseline is fair.",
        "Keeping the decision layer swappable: the diagnosis function is async, so a real model can replace the rules without changing the rest of the pipeline.",
      ],
      outcome: [
        "The landing page, dashboard, policy guardrails and the evaluation engine work. Comparing the agent with naive retries on recovered revenue, duplicate charges prevented and escalations is built into the engine.",
        "Still being wired up: the Recovery Hub, Transactions, Insights and Failure Lab views.",
      ],
    },
    links: { github: "https://github.com/nancy-verma780/PunarPay" },
    visual: "punar",
    demo: "punar",
    screens: [
      { src: "/projects/punarpay/dashboard.webp", alt: "PunarPay dashboard showing revenue at risk and priority recovery candidates with AI confidence", caption: "Dashboard: revenue at risk and the transactions worth recovering first" },
      { src: "/projects/punarpay/guardrails.webp", alt: "PunarPay merchant policy guardrails form with amount, confidence, retry and cooldown limits", caption: "Merchant guardrails the agent can never override" },
      { src: "/projects/punarpay/landing.webp", alt: "PunarPay landing page: detect payment failures, recover lost revenue within merchant guardrails", caption: "Landing page for the Razorpay Buildathon demo" },
    ],
  },
  {
    slug: "netflix-dashboard",
    name: "Netflix Streaming Dashboard",
    oneLiner: "A streaming-dashboard clone where the 'ta-dum' intro is synthesised in code.",
    status: "Live on Vercel",
    problem:
      "A practice project to push my frontend past static layouts: timing, shared state across components, and audio.",
    role: "Built end to end.",
    stack: ["React", "Vite", "Tailwind CSS", "Lucide", "Web Audio API"],
    highlights: [
      "Intro sound built from sawtooth and triangle oscillators",
      "Idle detection that fades the banner into a trailer preview",
      "Continue Watching row built from where you closed a title",
      "Search and watchlist filtered together without layout shift",
    ],
    detail: {
      approach: [
        "The intro sound isn't an audio file. It's generated with Web Audio oscillators and frequency filters, timed to a CSS zoom animation.",
        "If the dashboard sits idle for four seconds, the hero banner fades into a muted trailer preview with mute and unmute controls.",
        "Closing a title's modal records that session and adds the title to a Continue Watching row with a progress bar.",
      ],
      architecture: [
        "React with hooks for idle timers, modal state and watch history",
        "Profile selection gate before the main dashboard",
        "One filter pipeline shared by search input and watchlist",
        "Tailwind keyframes for the intro and hover motion",
      ],
      challenges: [
        "Synchronising generated audio with a CSS animation, so the sound lands exactly when the logo zooms.",
        "Running timers and media without them fighting each other when the user interacts mid-preview.",
      ],
      outcome: ["Deployed and usable in the browser."],
    },
    links: {
      github: "https://github.com/nancy-verma780/Netflix-streaming-dashboard",
      live: "https://netflix-streaming-dashboard.vercel.app/",
    },
    visual: "stream",
    demo: "tudum",
  },
];

export const upcoming = {
  name: "AnaajSaathi",
  oneLiner:
    "Ration distribution with QR verification, live queue updates, and Hindi and English support, for beneficiaries, fair price shops, and administrators.",
  status: "Planning: the feature set and roadmap are written; code comes next.",
  stack: ["Next.js", "FastAPI", "PostgreSQL"],
  github: "https://github.com/nancy-verma780/AnaajSaathi",
};

export const earlyBuilds = [
  { name: "AI-Nurse", note: "Streamlit symptom checker", href: "https://github.com/nancy-verma780/AI-Nurse" },
  { name: "Hydro Viper Blitz", note: "snake–water–gun game", href: "https://github.com/nancy-verma780/Hydro_Viper_Blitz_Fun-" },
  { name: "India state capitals", note: "quiz", href: "https://github.com/nancy-verma780/India-state-capital" },
  { name: "To-Do List", note: "command-line app", href: "https://github.com/nancy-verma780/To-Do-List" },
  { name: "Calculator", note: "multi-number CLI", href: "https://github.com/nancy-verma780/Calculator" },
];

/** Selected merged pull requests that show range. All verified as merged. */
export const notablePRs = [
  { repo: "leonagoel/hybrid-recommender", title: "Fix a memory leak in the SVD model" },
  { repo: "leonagoel/hybrid-recommender", title: "Fix a rate-limiter DoS weakness" },
  { repo: "param20h/PDF-Assistant-RAG", title: "Profile and optimise ChromaDB query latency" },
  { repo: "Premshaw23/Learnova", title: "Retry logic for offline sync" },
  { repo: "1809gaurav/mind-mitra", title: "SOS alerts with Twilio" },
  { repo: "Aditya948351/DevPath-Web", title: "CSRF protection middleware for API routes" },
];

export const milestones = [
  {
    title: "GirlScript Summer of Code",
    org: "GSSoC",
    year: "2026",
    what: "Contributor. Most of my summer pull requests went through this program.",
    why: "It's where I learned to work inside codebases and review cycles that weren't mine.",
    href: profile.links.gssoc,
  },
  {
    title: "NSOC, SSOC and ECSOC",
    org: "Student open-source programs",
    year: "2026",
    what: "Contributor in three more student open-source programs.",
    why: "More projects, more maintainers, more styles of code to adapt to.",
  },
  {
    title: "Razorpay Buildathon",
    org: "Razorpay",
    year: "2026",
    what: "Built PunarPay for Track 03.",
    why: "My first time designing for money moving, where a wrong action is expensive.",
    href: "https://github.com/nancy-verma780/PunarPay",
  },
  {
    title: "Pull Shark ×2",
    org: "GitHub achievement",
    year: "2026",
    what: "Awarded for merged pull requests.",
    why: "A small marker, but it tracks the work.",
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  specialization: "Artificial Intelligence & Machine Learning",
  stage: "Second year",
  institution: null as string | null, // e.g. "XYZ Institute of Technology, Delhi"
  dates: null as string | null, // e.g. "2025 – 2029"
  notes: null as string | null, // e.g. CGPA or relevant coursework, from your resume
};

export const beyond = [
  {
    title: "I paint",
    body: "Acrylics and watercolours. The colour wash running through this site comes from that.",
  },
  {
    title: "I keep ending up on languages",
    body: "Without planning it, a lot of my work is i18n: a Hindi chatbot and Hindi parent-portal messages for Learnova, translation support for MindMitra, and Hindi and English screens in the AnaajSaathi plan.",
  },
  {
    title: "I write for other contributors",
    body: "An ML architecture doc for PatchPilot, a table of contents and badges for hybrid-recommender's README, issue templates for Climate-Shield. Good docs are how a project lets new people in.",
  },
  {
    title: "Tea, and a puzzle a day",
    body: "Usually together. I practise on LeetCode, GeeksforGeeks, HackerRank and CodeChef.",
  },
];
