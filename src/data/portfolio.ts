import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  metadata: {
    title: "Ayush | Software Developer",
    description:
      "Software developer focused on building reliable systems, practical web applications, and developer automation.",
    siteUrl: "https://ayush-portfolio.vercel.app",
    author: "Ayush",
    keywords: [
      "Software Developer",
      "Full Stack Engineer",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "DevOps",
      "Web Development",
    ],
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Terminal", href: "#terminal" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    greeting: "Hi, I'm",
    name: "Ayush",
    role: "Software Developer",
    tagline:
      "I build reliable software, automate repetitive work, and enjoy turning ideas into things people can actually use.",
    statusBadge: {
      available: true,
      text: "Available for projects & roles",
    },
    primaryCta: {
      label: "View Projects",
      href: "#projects",
    },
    secondaryCta: {
      label: "Contact Me",
      href: "#contact",
    },
    techStackVisual: {
      badge: "SYSTEM ARCHITECTURE & CAPABILITIES",
      title: "Core Engineering Stack",
      subtitle: "Pragmatic technologies chosen for reliability, developer ergonomics, and speed.",
      environment: "production / linux-x86_64",
      architectureLayers: [
        {
          layer: "01. Presentation & UI",
          techs: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
          status: "healthy",
          latency: "sub-50ms",
        },
        {
          layer: "02. Services & APIs",
          techs: ["Node.js", "REST APIs", "Express / Fastify", "Type-safe Contracts"],
          status: "healthy",
          latency: "< 25ms",
        },
        {
          layer: "03. Persistence & State",
          techs: ["PostgreSQL", "Relational Schemas", "Query Optimization"],
          status: "operational",
          latency: "pooled",
        },
        {
          layer: "04. DevOps & Runtime",
          techs: ["Docker", "Kubernetes", "Linux", "Git", "CI/CD Pipelines"],
          status: "automated",
          latency: "gitops",
        },
      ],
      metrics: [
        {
          label: "Structured",
          value: "Simplicity",
          subtext: "over premature complexity",
        },
        {
          label: "Delivery",
          value: "CI/CD",
          subtext: "automated tests & build",
        },
        {
          label: "Focus",
          value: "Real Products",
          subtext: "tested & maintained",
        },
      ],
    },
  },

  about: {
    title: "Pragmatic engineering with curiosity at the core",
    subtitle:
      "I treat software development not just as writing code, but as building dependable tools that solve real problems.",
    paragraphs: [
      "Focused on building robust systems, clean code, and reliable software from development to production. I work across frontend, backend, and automation, with a constant focus on better developer experience, software that just works, and services that don't wake people up in the middle of the night.",
      "When I am not developing user-facing products, I explore Linux internals, container orchestration with Docker and Kubernetes, and automated deployment pipelines. Continuous learning is non-negotiable — every project is an opportunity to improve architecture, performance, and code maintainability.",
    ],
    principles: [
      {
        title: "Build for Reliability",
        description:
          "Software should be predictable, thoroughly handled at boundaries, and resilient to failure.",
      },
      {
        title: "Automate Toil",
        description:
          "If a task is executed manually more than twice, it deserves a script, a pipeline, or a tool.",
      },
      {
        title: "End-to-End Ownership",
        description:
          "Understanding how code behaves under Linux, in containers, and across databases produces better systems.",
      },
      {
        title: "Clear Communication",
        description:
          "Good code reads like thoughtful documentation. Explicit naming and clean architecture win every time.",
      },
    ],
    highlights: [
      { label: "Core Focus", value: "Backend & DevOps" },
      { label: "Development", value: "Language Agnostic" },
      { label: "Infrastructure", value: "Docker, Linux & CI/CD" },
      { label: "Approach", value: "Pragmatic & Tested" },
    ],
  },

  whatIDo: {
    badge: "CAPABILITIES",
    title: "What I focus on building",
    subtitle:
      "A practical engineering approach focused on backend systems, automation, and reliable software from development to production.",
    items: [
      {
        id: "backend-dev",
        title: "Backend Development",
        description:
          "Building reliable server-side applications and APIs with a focus on clean architecture, validation, error handling, and maintainability.",
        iconName: "Server",
        tags: ["Python", "FastAPI", "Node.js", "REST APIs", "PostgreSQL"],
      },
      {
        id: "automation",
        title: "Automation & Workflows",
        description:
          "Reducing repetitive work through scripts, automated tests, deployment workflows, and background processes.",
        iconName: "Workflow",
        tags: ["Bash / Shell", "Playwright", "CI/CD", "Automation"],
      },
      {
        id: "api-integration",
        title: "API Development & Integration",
        description:
          "Designing and integrating APIs with predictable behavior, structured validation, and reliable communication between services.",
        iconName: "Cpu",
        tags: ["REST APIs", "JSON", "Validation", "Integrations"],
      },
      {
        id: "databases",
        title: "Databases & Data",
        description:
          "Working with relational databases and database migrations, with a focus on consistent schemas, transactional workflows, and maintainable data models.",
        iconName: "Database",
        tags: ["PostgreSQL", "SQL", "Alembic", "Data Modeling"],
      },
      {
        id: "testing-dx",
        title: "Testing & Developer Experience",
        description:
          "Building automated tests and developer tooling that catch problems early and make development and deployment less manual.",
        iconName: "Wrench",
        tags: ["Playwright", "TypeScript", "CLI Tools", "Developer Automation"],
      },
      {
        id: "deployment",
        title: "Deployment & Infrastructure",
        description:
          "Working with Linux, Docker, and CI/CD workflows, while actively building experience with Kubernetes and broader DevOps practices.",
        iconName: "Cloud",
        tags: ["Linux", "Docker", "CI/CD", "Kubernetes"],
      },
    ],
  },

  skills: {
    badge: "TECHNOLOGY STACK",
    title: "Tools & technologies I work with",
    subtitle:
      "A curated collection of languages, frameworks, and infrastructure tools I use to build software.",
    categories: [
      {
        id: "languages",
        name: "Languages",
        description: "Core languages for building type-safe applications and automation.",
        skills: [
          { name: "JavaScript", category: "languages", focus: "ESNext / Modern Web" },
          { name: "TypeScript", category: "languages", focus: "Strict Typing & Interfaces" },
        ],
      },
      {
        id: "frontend",
        name: "Frontend",
        description: "User interfaces, responsive layouts, and modern web application frameworks.",
        skills: [
          { name: "React", category: "frontend", focus: "Component Architecture & Hooks" },
          { name: "Next.js", category: "frontend", focus: "App Router & SSR / SSG" },
        ],
      },
      {
        id: "backend",
        name: "Backend",
        description: "Server runtimes, HTTP services, and API contract design.",
        skills: [
          { name: "Node.js", category: "backend", focus: "Event Loop & Server Logic" },
          { name: "REST APIs", category: "backend", focus: "Stateless Resource Design" },
        ],
      },
      {
        id: "database",
        name: "Database",
        description: "Relational persistence, query modeling, and transactional integrity.",
        skills: [
          { name: "PostgreSQL", category: "database", focus: "Relational Design & Indexing" },
        ],
      },
      {
        id: "devops",
        name: "DevOps / Infrastructure",
        description: "Containerization, system environments, version control, and automation.",
        skills: [
          { name: "Docker", category: "devops", focus: "Multi-stage Builds & Isolation" },
          { name: "Linux", category: "devops", focus: "Shell, System Administration & Processes" },
          { name: "Git", category: "devops", focus: "Branching, Rebasing & Versioning" },
          { name: "CI/CD", category: "devops", focus: "Automated Build & Test Workflows" },
          { name: "Kubernetes", category: "devops", focus: "Pods, Deployments & Services" },
        ],
      },
    ],
  },

  projects: {
    badge: "FEATURED WORK",
    title: "Projects & engineering experiments",
    subtitle:
      "A selection of software projects solving real technical problems. Structured for easily replacing with live links.",
    items: [
      {
        id: "tracepulse-engine",
        title: "TracePulse Engine",
        slug: "tracepulse-engine",
        tagline: "Distributed event ingestion pipeline & real-time webhook delivery orchestrator",
        description:
          "A resilient webhook and background task management engine built to guarantee message delivery across distributed microservices. Features automated exponential backoff retries, signature verification, and a live dead-letter inspection console.",
        problemSolved:
          "Services frequently lost critical events during downstream network blips and API rate-limiting spikes without any observability or idempotency guarantees.",
        architectureHighlights: [
          "Worker concurrency pools designed in Node.js with graceful SIGTERM drain",
          "Relational event ledger in PostgreSQL with transactional lease locking",
          "Containerized deploy via Docker with zero-downtime rolling updates",
        ],
        technologies: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
        githubUrl: "https://github.com/placeholder-ayush/tracepulse-engine",
        liveDemoUrl: "https://tracepulse-demo.placeholder.dev",
        status: "Production",
        isFeatured: true,
        keyContributions: [
          "Implemented idempotency key hashing to prevent double-billing and duplicate webhook deliveries",
          "Reduced background dispatch latency from 450ms to 48ms under high concurrent load",
          "Authored complete Docker Compose sandbox for 1-command local development",
        ],
        mockup: {
          type: "system",
          tag: "FLAGSHIP ARCHITECTURE",
          title: "TracePulse Distributed Pipeline",
          snippet: `POST /api/v1/events/dispatch
HTTP/1.1 202 Accepted
X-Trace-Id: tp_9f82a170e
Idempotency-Key: ik_8824df9

[Queue: active] -> [WorkerPool: 8 workers]
-> [DeliveryTarget: 200 OK in 38ms]`,
        },
      },
      {
        id: "kubewatchman-cli",
        title: "KubeWatchman CLI",
        slug: "kubewatchman-cli",
        tagline: "Interactive terminal utility for rapid container health diagnostics and logs",
        description:
          "A lightweight developer CLI tool designed to inspect unhealthy Docker containers and Kubernetes pod crash loops with contextual root-cause extraction.",
        problemSolved:
          "Developers spent too much time grepping through multi-megabyte log dumps and running verbose kubectl commands just to diagnose simple configuration issues.",
        technologies: ["TypeScript", "Docker", "Kubernetes", "Linux", "Node.js"],
        githubUrl: "https://github.com/placeholder-ayush/kubewatchman-cli",
        liveDemoUrl: "https://github.com/placeholder-ayush/kubewatchman-cli#quickstart",
        status: "Active Development",
        isFeatured: false,
        mockup: {
          type: "terminal",
          tag: "DEV TOOLING",
          title: "kubewatchman inspect",
          snippet: `$ kubewatchman inspect --namespace staging
✓ 12/14 pods operational
! pod/auth-svc-849f: OOMKilled detected
↳ Recommendation: Increase memory limit to 512Mi`,
        },
      },
      {
        id: "flowforge-studio",
        title: "FlowForge Studio",
        slug: "flowforge-studio",
        tagline: "Modular web automation workbench for scheduling APIs and data transformations",
        description:
          "A clean, full-stack workflow workbench allowing developers to chain REST requests, schedule cron-based data extractions, and inspect live payload transformations.",
        problemSolved:
          "Replaced fragile, unversioned one-off cron scripts with a centralized, observable dashboard and scheduled task executor.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        githubUrl: "https://github.com/placeholder-ayush/flowforge-studio",
        liveDemoUrl: "https://flowforge.placeholder.dev",
        status: "Completed",
        isFeatured: false,
        mockup: {
          type: "dashboard",
          tag: "WEB APP",
          title: "FlowForge Pipeline Canvas",
          snippet: `[Webhook Trigger]
  └─> [Transform JSON Schema]
        └─> [POST /sync/crm] (200 OK)
        └─> [PostgreSQL Upsert] (14 rows)`,
        },
      },
      {
        id: "docusync-api",
        title: "DocuSync API",
        slug: "docusync-api",
        tagline: "Developer documentation indexing microservice with sub-15ms search response",
        description:
          "A high-performance REST API designed to index markdown documentation and code repositories for fast, localized search and versioned documentation delivery.",
        problemSolved:
          "Static site generators suffered from slow full-text client searches as documentation grew over thousands of pages.",
        technologies: ["Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/placeholder-ayush/docusync-api",
        liveDemoUrl: "https://docusync.placeholder.dev",
        status: "Prototype",
        isFeatured: false,
        mockup: {
          type: "api",
          tag: "REST API",
          title: "DocuSync Search Endpoint",
          snippet: `GET /v1/search?q=docker+compose+healthcheck
{
  "matches": 4,
  "execution_time_ms": 9.4,
  "results": [{ "doc": "containers/spec.md", "score": 0.98 }]
}`,
        },
      },
    ],
  },

  experience: {
    badge: "CAREER TIMELINE",
    title: "Experience & contributions",
    subtitle:
      "A chronological summary of engineering roles, responsibilities, and technical impact. Configured with placeholders for your actual history.",
    items: [
      {
        id: "exp-1",
        role: "Software Developer [Placeholder]",
        company: "Tech Systems & Systems Lab [Placeholder]",
        companyUrl: "https://example.com/company-placeholder",
        location: "Bengaluru, India / Remote [Placeholder]",
        period: "2024 — Present",
        isCurrent: true,
        description:
          "Lead engineer for core full-stack features and internal automation tools. Focused on improving platform reliability, streamlining API communication, and modernizing frontend user experiences.",
        keyContributions: [
          "Architected type-safe REST APIs and microservice endpoints with Node.js and PostgreSQL",
          "Engineered CI/CD build automation pipelines reducing manual deployment steps by 70%",
          "Collaborated with cross-functional teams to build high-performance Next.js application interfaces",
          "Mentored junior developers on Git workflows, Docker containerization, and clean code principles",
        ],
        technologies: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Docker",
          "Git",
          "CI/CD",
        ],
      },
      {
        id: "exp-2",
        role: "Junior Software Engineer [Placeholder]",
        company: "Digital Product Studio [Placeholder]",
        companyUrl: "https://example.com/studio-placeholder",
        location: "Hybrid [Placeholder]",
        period: "2023 — 2024",
        isCurrent: false,
        description:
          "Developed client-facing web applications, responsive user interfaces, and automated data synchronization jobs.",
        keyContributions: [
          "Built responsive UI components using React, Next.js, and modern CSS standards",
          "Integrated third-party APIs and implemented robust client-side validation logic",
          "Maintained relational database migrations and structured query optimization in PostgreSQL",
          "Participated in agile sprints, technical code reviews, and test coverage improvements",
        ],
        technologies: ["JavaScript", "React", "TypeScript", "REST APIs", "Git", "Linux"],
      },
      {
        id: "exp-3",
        role: "Open Source Contributor & Projects [Placeholder]",
        company: "Self-Directed & Community [Placeholder]",
        companyUrl: "https://github.com",
        location: "Remote",
        period: "2022 — 2023",
        isCurrent: false,
        description:
          "Built standalone developer utilities, published CLI tools, and contributed to open-source developer documentation and developer tooling.",
        keyContributions: [
          "Authored modular shell scripts and Node.js automation utilities for local development environments",
          "Explored containerization patterns with Docker and local Kubernetes test clusters",
          "Published open-source starter templates focused on TypeScript and modern web best practices",
        ],
        technologies: ["TypeScript", "Node.js", "Docker", "Linux", "Git"],
      },
    ],
  },

  terminal: {
    badge: "INTERACTIVE CONSOLE",
    title: "Developer sandbox",
    subtitle:
      "A lightweight secondary terminal interface. Run commands to explore my focus, stack, and availability.",
    initialCommands: ["whoami", "current_focus", "status"],
    commands: {
      whoami: {
        command: "whoami",
        description: "Display identity and core summary",
        output: [
          "Ayush — Software Developer",
          "Focused on building reliable web applications, automation, and backend systems.",
          "Based in India • Working globally.",
        ],
      },
      current_focus: {
        command: "current_focus",
        description: "Show current technical learning and building initiatives",
        output: [
          "1. Distributed systems and webhook delivery reliability (Node.js & PostgreSQL)",
          "2. Modern App Router architecture with Next.js & React Server Components",
          "3. Container orchestration with Docker and Kubernetes workflows",
        ],
      },
      status: {
        command: "status",
        description: "Check availability status",
        output: [
          "● Status: Available for full-time opportunities and engineering collaborations",
          "● Response time: Within 24 hours",
          "● Preferred communication: Email or LinkedIn",
        ],
      },
      skills: {
        command: "skills",
        description: "List primary technical stack",
        output: [
          "Languages: JavaScript, TypeScript",
          "Frontend: React, Next.js, Tailwind CSS",
          "Backend: Node.js, REST APIs",
          "Database: PostgreSQL",
          "DevOps: Docker, Linux, Git, CI/CD, Kubernetes",
        ],
      },
      contact: {
        command: "contact",
        description: "Output reach-out options",
        output: [
          "Email: ayush.developer.contact@example.com [Placeholder]",
          "GitHub: github.com/placeholder-ayush",
          "LinkedIn: linkedin.com/in/placeholder-ayush",
        ],
      },
      help: {
        command: "help",
        description: "List all supported terminal commands",
        output: [
          "Available commands:",
          "  whoami         - Print developer profile",
          "  current_focus  - What I am currently building & learning",
          "  status         - Current work & collaboration availability",
          "  skills         - Quick overview of technologies",
          "  contact        - Direct contact information",
          "  clear          - Clear the terminal screen",
        ],
      },
    },
  },

  contact: {
    title: "Have an idea, project, or opportunity?",
    subtitle:
      "Let's build something interesting. I am always open to discussing reliable software, full-stack projects, and engineering challenges.",
    directEmail: "ayush.developer.contact@example.com",
    statusText: "Usually replies within 24 hours",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/placeholder-ayush",
        username: "@placeholder-ayush",
        iconName: "Github",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/placeholder-ayush",
        username: "in/placeholder-ayush",
        iconName: "Linkedin",
      },
      {
        name: "Email",
        url: "mailto:ayush.developer.contact@example.com",
        username: "ayush.developer.contact@example.com",
        iconName: "Mail",
      },
    ],
  },

  footer: {
    copyrightName: "Ayush",
    techStackNote: "Designed with purpose. Built with Next.js, TypeScript & Tailwind CSS.",
    statusText: "All systems nominal • Static build deployable to Vercel",
  },
};
