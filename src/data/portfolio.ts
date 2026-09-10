import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  metadata: {
    title: "Ayush | Backend-focused Software Engineer",
    description:
      "Backend-focused software engineer with strong automation and growing DevOps experience.",
    siteUrl: "https://ayush-portfolio.vercel.app",
    author: "Ayush",
    keywords: [
      "Backend Developer",
      "Software Engineer",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Playwright",
      "Test Automation",
      "Docker",
      "DevOps",
      "Linux",
      "CI/CD",
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
    role: "Backend-focused Software Engineer",
    tagline:
      "Backend-focused software engineer with strong automation and growing DevOps experience.",
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
      subtitle:
        "Practical technologies focused on backend development, automation, reliability, and efficient delivery.",
      environment: "runtime / linux-x86_64",
      architectureLayers: [
        {
          layer: "01. Application & APIs",
          techs: ["Python", "FastAPI", "Node.js", "REST APIs", "TypeScript"],
          status: "healthy",
        },
        {
          layer: "02. Data & Persistence",
          techs: ["PostgreSQL", "MongoDB", "Redis", "Alembic", "SQL"],
          status: "healthy",
        },
        {
          layer: "03. Automation & Workflows",
          techs: ["Airflow", "Playwright", "Bash / Shell", "CI/CD", "Test Automation"],
          status: "operational",
        },
        {
          layer: "04. DevOps & Runtime",
          techs: ["Docker", "Linux", "Git", "Bitbucket", "CI/CD"],
          status: "automated",
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
      "Focused on building robust systems, clean code, and reliable software from development to production. I work across backend development, test automation, and infrastructure, with a constant focus on better developer experience, software that just works, and services that don’t wake people up in the middle of the night.",
      "When I'm not working on backend systems and automation, I explore Linux, Docker, deployment workflows, and broader DevOps practices while continuing to learn Kubernetes.",
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
        title: "End-to-End Understanding",
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
      { label: "Core Focus", value: "Backend & Automation" },
      { label: "Development", value: "Python & APIs" },
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
          "Working with Linux, Docker, and CI/CD workflows across development and staging environments.",
        iconName: "Cloud",
        tags: ["Linux", "Docker", "Git", "Bitbucket", "CI/CD"],
      },
    ],
  },

  skills: {
    badge: "EXPLORING",
    title: "Technologies I'm actively exploring",
    subtitle:
      "A snapshot of tools, systems, and practices I am currently learning and experimenting with outside my established stack.",
    categories: [
      {
        id: "kubernetes",
        name: "Kubernetes",
        description:
          "Currently learning container orchestration, deployments, services, and core Kubernetes concepts.",
        skills: [
          {
            name: "Kubernetes",
            category: "kubernetes",
            focus: "Deployments, Services & Pods",
          },
        ],
      },
      {
        id: "linux-internals",
        name: "Linux Internals",
        description:
          "Exploring processes, services, system behavior, and deeper Linux administration.",
        skills: [
          {
            name: "Linux Internals",
            category: "linux-internals",
            focus: "Processes, services & system behavior",
          },
        ],
      },
      {
        id: "devops-practices",
        name: "DevOps Practices",
        description:
          "Expanding practical knowledge around deployment, infrastructure, CI/CD, and operational workflows.",
        skills: [
          {
            name: "DevOps Practices",
            category: "devops-practices",
            focus: "Deployment, infrastructure & operations",
          },
        ],
      },
      {
        id: "airflow",
        name: "Airflow",
        description:
          "Exploring workflow orchestration, scheduling, and automated data workflows.",
        skills: [
          {
            name: "Airflow",
            category: "airflow",
            focus: "Workflow orchestration & scheduling",
          },
        ],
      },
    ],
  },

  projects: {
    badge: "FEATURED WORK",
    title: "Projects & engineering experiments",
    subtitle:
      "Engineering work focused on reliable backend systems, database engineering, and test automation.",
    items: [
      {
        id: "truewill",
        title: "Truewill",
        slug: "truewill",
        tagline: "Quality Management Platform",
        description:
          "A quality-management platform developed for an Australian client, spanning staff, client, scheduling, shift, pricing, and incident-management workflows.",
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
          "Testing: Built the Playwright automation framework from scratch, including reusable page objects, step definitions, feature files, utilities, factories, types, caching, and configurable test-data generation.",
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
          "Python • FastAPI • Node.js • REST APIs",
          "",
          "Data:",
          "PostgreSQL • MongoDB • Redis • Alembic",
          "",
          "Automation:",
          "Playwright • Bash / Shell • Airflow • CI/CD",
          "",
          "Infrastructure:",
          "Docker • Linux • Git • Bitbucket",
        ],
      },
      status: {
        command: "status",
        description: "Show current availability",
        output: [
          "● Status: Open to new engineering opportunities",
          "● Focus: Backend • Automation • DevOps",
        ],
      },
      contact: {
        command: "contact",
        description: "Show contact information",
        output: [
          "● Email: 223whizguru@gmail.com",
          "● GitHub: github.com/223BlackBird",
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
      "Let's build something interesting. I am always open to discussing backend systems, automation, DevOps, and engineering challenges.",
    directEmail: "223whizguru@gmail.com",
    statusText: "Usually replies within 24 hours",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/223BlackBird",
        username: "@223BlackBird",
        iconName: "Github",
      },
      {
        name: "Email",
        url: "mailto:223whizguru@gmail.com",
        username: "223whizguru@gmail.com",
        iconName: "Mail",
      },
    ],
  },

  footer: {
    copyrightName: "Ayush",
    techStackNote: "Designed with purpose. Built with Next.js, TypeScript & Tailwind CSS.",
    statusText: "Deployed with Vercel • Built with Next.js",
  },
};
