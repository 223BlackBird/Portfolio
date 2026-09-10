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
    { label: "Exploring", href: "#skills" },
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
      subtitle: "Practical technologies focused on backend development, automation, reliability, and efficient delivery.",
      environment: "production / linux-x86_64",
      architectureLayers: [
        {
          layer: "01. Application & APIs",
          techs: ["Python", "FastAPI", "Node.js", "REST APIs", "TypeScript"],
          status: "healthy",
          latency: "sub-50ms",
        },
        {
          layer: "02. Data & Persistence",
          techs: ["PostgreSQL", "MongoDB", "Redis", "Alembic", "SQL"],
          status: "healthy",
          latency: "< 25ms",
        },
        {
          layer: "03. Automation & Workflows",
          techs: ["Airflow", "Playwright", "Bash / Shell", "CI/CD", "Test Automation"],
          status: "operational",
          latency: "pipelines",
        },
        {
          layer: "04. DevOps & Runtime",
          techs: ["Docker", "Linux", "Git", "Bitbucket", "CI/CD"],
          status: "automated",
          latency: "gitops",
        },
      ],
      metrics: [
        {
          label: "Structured",
          value: "Simplicity",
          subtext: "over unnecessary complexity",
        },
        {
          label: "Delivery",
          value: "Automation",
          subtext: "through testing, builds & deployment",
        },
        {
          label: "Focus",
          value: "Reliable Software",
          subtext: "that is practical & maintainable",
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
    badge: "CURRENT FOCUS & LEARNING",
    title: "Technologies I'm actively exploring",
    subtitle:
      "A snapshot of the languages, frameworks, and infrastructure tools I am currently learning and incorporating into my projects.",
    categories: [
      {
        id: "languages",
        name: "Languages",
        description: "Core languages for building type-safe applications and automation.",
        skills: [
          { name: "JavaScript", category: "languages", focus: "ESNext / Modern Web" },
        ],
      },
      {
        id: "frontend",
        name: "Frontend",
        description: "User interfaces, responsive layouts, and modern web application frameworks.",
        skills: [
          { name: "React", category: "frontend", focus: "Component Architecture & Hooks" },
          { name: "Next.js", category: "frontend", focus: "App Router & SSR / SSG" },
          { name: "Tailwind CSS", category: "frontend", focus: "Utility-first Styling" },
        ],
      },
      {
        id: "backend",
        name: "Backend",
        description: "Server runtimes, HTTP services, and API contract design.",
        skills: [
          { name: "Node.js", category: "backend", focus: "Event Loop & Server Logic" },
        ],
      },
      {
        id: "database",
        name: "Database",
        description: "Relational persistence, query modeling, and transactional integrity.",
        skills: [],
      },
      {
        id: "devops",
        name: "DevOps / Infrastructure",
        description: "Containerization, system environments, version control, and automation.",
        skills: [
          { name: "Docker", category: "devops", focus: "Multi-stage Builds & Isolation" },
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
        id: "truewill",
        title: "Truewill",
        slug: "truewill",
        tagline: "Quality Management Platform",
        description:
          "A production quality-management platform developed for an Australian client, spanning staff, client, scheduling, shift, pricing, and incident-management workflows.",
        problemSolved:
          "Automated a large portion of the Staff and Incident Management modules before a major application change required the automation suite to be reworked.",
        architectureHighlights: [
          "BACKEND: Python · FastAPI · REST APIs",
          "DATA: PostgreSQL · Alembic",
          "AUTOMATION: Playwright · Test Framework",
          "INFRASTRUCTURE: Docker · Linux · Bitbucket CI/CD",
        ],
        technologies: ["Python", "FastAPI", "PostgreSQL", "Playwright", "Docker"],
        githubUrl: "",
        liveDemoUrl: "",
        status: "Production",
        isFeatured: true,
        keyContributions: [
          "Backend: Built and maintained REST APIs with Python/FastAPI, handling authentication, authorization, business logic, integrations, file handling, notifications, error handling, and logging.",
          "Database: Worked extensively with PostgreSQL, including schema design, relationships, indexing, query optimization, concurrent operations, data cleanup, and Alembic migrations.",
          "Testing: Built the Playwright automation framework from scratch, with reusable page objects, step definitions, feature files, utilities, factories, types, caching, and configurable test-data generation.",
          "DevOps: Maintained Docker and Linux environments and worked with PM2, Bitbucket Pipelines, and shell-based deployment workflows across development and staging environments.",
        ],
        mockup: {
          type: "terminal",
          tag: "FEATURED PROJECT",
          title: "truewill / development",
          snippet: `TRUEWILL / DEVELOPMENT

$ pytest
✓ staff workflows
✓ incident workflows
✓ authentication
✓ business rules

$ deploy.sh
→ backup current build
→ install dependencies
→ build application
→ reload PM2
✓ deployment complete`,
        },
      },
    ],
  },

  experience: {
    badge: "CAREER TIMELINE",
    title: "Experience & contributions",
    subtitle:
      "A chronological look at my engineering work, responsibilities, and the systems I've contributed to.",
    items: [
      {
        id: "exp-1",
        role: "Backend Developer → Automation & DevOps",
        company: "Jittec IT Solutions",
        companyUrl: "",
        location: "Thiruvananthapuram, India",
        period: "June 2025 — Present",
        isCurrent: true,
        description:
          "Worked on Truewill, a quality-management platform for an Australian client, initially focusing on backend development and database engineering before moving into test automation and supporting DevOps tasks across development and staging environments.",
        keyContributions: [
          "Developed and maintained REST APIs using Python and FastAPI, covering authentication, authorization, business logic, third-party integrations, file handling, notifications, error handling, and logging.",
          "Worked extensively with PostgreSQL, including schema design, relationships, indexing, query optimization, concurrent operations, data cleanup, and Alembic migrations.",
          "Built a Playwright automation framework from scratch, including reusable page objects, step definitions, feature files, utilities, factories, types, caching, and configurable test-data generation.",
          "Automated a large portion of the Staff and Incident Management workflows before a major application change required the automation suite to be reworked.",
          "Supported development and staging environments using Linux, Docker, PM2, Bitbucket Pipelines, and shell-based deployment workflows.",
        ],
        technologies: [
          "Python",
          "FastAPI",
          "PostgreSQL",
          "Alembic",
          "Playwright",
          "Docker",
          "Linux",
          "Git",
          "Bitbucket",
          "CI/CD",
        ],
      },
    ],
  },

  terminal: {
    badge: "INTERACTIVE CONSOLE",
    title: "Developer sandbox",
    subtitle:
      "A lightweight secondary terminal interface. Run commands to explore my focus, stack, and availability.",
    initialCommands: ["whoami", "focus", "status"],
    commands: {
      whoami: {
        command: "whoami",
        description: "Display profile",
        output: [
          "Ayush — Backend Developer",
          "Focused on backend systems, test automation, and practical DevOps.",
          "Based in India • Working globally.",
        ],
      },
      focus: {
        command: "focus",
        description: "Show current engineering focus",
        output: [
          "1. Backend development with Python, FastAPI, REST APIs & PostgreSQL",
          "2. Test automation with Playwright and reusable automation tooling",
          "3. Deployment workflows, Linux environments, Docker & CI/CD",
          "4. Currently expanding into broader DevOps practices and learning Kubernetes",
        ],
      },
      stack: {
        command: "stack",
        description: "Show technology stack",
        output: [
          "Backend:",
          "  Python • FastAPI • Node.js • REST APIs",
          "",
          "Data:",
          "  PostgreSQL • MongoDB • Redis • Alembic",
          "",
          "Automation:",
          "  Playwright • Bash / Shell • Airflow • CI/CD",
          "",
          "Infrastructure:",
          "  Docker • Linux • Git • Bitbucket",
        ],
      },
      status: {
        command: "status",
        description: "Show current availability",
        output: [
          "● Status: Open to new engineering opportunities",
          "● Focus: Backend • Automation • DevOps",
          "● Environment: Development & Staging",
        ],
      },
      contact: {
        command: "contact",
        description: "Show contact information",
        output: [
          "● Email: ayush.developer.contact@example.com",
          "● LinkedIn: linkedin.com/in/placeholder-ayush",
          "● GitHub: github.com/placeholder-ayush",
        ],
      },
      help: {
        command: "help",
        description: "List all supported terminal commands",
        output: [
          "Available commands:",
          "",
          "  whoami       Display profile",
          "  focus        Show current engineering focus",
          "  stack        Show technology stack",
          "  status       Show current availability",
          "  contact      Show contact information",
          "  clear        Clear terminal",
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
