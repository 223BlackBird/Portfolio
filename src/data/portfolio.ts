import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  metadata: {
    title: "Ayush P Vinod | Backend-focused Software Engineer",
    description:
      "Backend-focused software engineer with strong automation and growing DevOps experience.",
    siteUrl: "https://ayushpvinod.vercel.app",
    author: "Ayush P Vinod",
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
      "Alembic",
    ],
  },

  navigation: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Playground", href: "/playground" },
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
      label: "View Work",
      href: "/work",
    },
    secondaryCta: {
      label: "Contact Me",
      href: "/contact",
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
        id: "backend",
        title: "Backend Engineering",
        description:
          "Building server-side applications and APIs with an emphasis on clean architecture, business logic, validation, error handling, and maintainability.",
        iconName: "Server",
        tags: ["Python", "FastAPI", "Node.js"],
      },
      {
        id: "data",
        title: "Data & Persistence",
        description:
          "Working with persistent data systems, schemas, relationships, queries, migrations, and reliable data workflows.",
        iconName: "Database",
        tags: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Alembic", "Data Modeling"],
      },
      {
        id: "api",
        title: "APIs & Integrations",
        description:
          "Designing and integrating APIs with predictable behavior, structured validation, and reliable communication between services.",
        iconName: "Cpu",
        tags: ["REST APIs", "JSON", "Validation", "Integrations"],
      },
      {
        id: "automation",
        title: "Automation & Workflows",
        description:
          "Reducing repetitive work through automated tests, scripts, workflow automation, and background/workflow processes.",
        iconName: "Workflow",
        tags: ["Playwright", "TypeScript", "Bash / Shell", "Airflow", "Test Automation", "CLI Tools", "CI/CD"],
      },
      {
        id: "infrastructure",
        title: "Infrastructure & Delivery",
        description:
          "Working with development and staging environments, containers, Linux systems, source control, process management, and deployment workflows.",
        iconName: "Cloud",
        tags: ["Linux", "Docker", "Git", "Bitbucket", "PM2"],
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
          "Container orchestration, deployments, services, scaling, and Kubernetes fundamentals.",
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
          "Going deeper into processes, memory, networking, filesystems, and how Linux works underneath applications.",
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
          "Learning more about infrastructure, deployment automation, CI/CD, monitoring, and production workflows.",
        skills: [
          {
            name: "DevOps Practices",
            category: "devops-practices",
            focus: "Deployment, infrastructure & operations",
          },
        ],
      },
    ],
  },

  stackDomains: [
    {
      domain: "Backend Development",
      badge: "01 / CORE RUNTIME",
      description: "Building reliable server-side APIs, business workflows, and data pipelines.",
      techs: ["Python", "FastAPI", "Node.js", "REST APIs", "TypeScript"],
    },
    {
      domain: "Data & Persistence",
      badge: "02 / STORAGE & SCHEMAS",
      description: "Relational database modeling, query optimization, caching, and migrations.",
      techs: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Alembic"],
    },
    {
      domain: "Automation & Testing",
      badge: "03 / QUALITY ASSURANCE",
      description: "End-to-end browser automation, test frameworks from scratch, and CI pipelines.",
      techs: ["Playwright", "TypeScript", "Bash / Shell", "Test Automation", "CI/CD", "Airflow"],
    },
    {
      domain: "Infrastructure & DevOps",
      badge: "04 / DELIVERY & RUNTIME",
      description: "Linux environments, containerization, process management, and deployment scripts.",
      techs: ["Docker", "Linux", "Git", "Bitbucket", "PM2"],
    },
    {
      domain: "Currently Exploring",
      badge: "05 / ACTIVE LEARNING",
      description: "Expanding knowledge in container orchestration and deep Linux administration.",
      techs: ["Kubernetes", "Linux Internals", "DevOps Practices"],
    },
  ],

  projects: {
    badge: "FEATURED WORK",
    title: "Projects & Engineering Work",
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
          "Automated the Staff and Incident Management modules almost entirely before a major application change required the automation suite to be reworked.",
        architectureHighlights: [
          "Backend",
          "Data Handling",
          "Automation",
          "Infrastructure Support",
        ],
        technologies: [
          "Python",
          "FastAPI",
          "TypeScript",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Alembic",
          "Playwright",
          "Bash / Shell",
          "Airflow",
          "Docker",
          "Linux",
          "Git",
          "Bitbucket",
          "CI/CD",
          "PM2",
        ],
        githubUrl: "",
        liveDemoUrl: "",
        status: "Production",
        isFeatured: true,
        caseStudyUrl: "/work/truewill",
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
        caseStudy: {
          overview: {
            client: "Australian Quality Management Platform",
            domain: "Staff, Shift, Pricing & Incident Management",
            role: "Backend Developer → Automation & DevOps",
            period: "June 2025 — Present",
            summary:
              "A comprehensive quality-management platform built for an Australian client, spanning staff management, client onboarding, scheduling, shift allocations, pricing models, and incident reporting.",
          },
          problemContext:
            "Managing complex multi-entity workflows across staff scheduling, shift allocations, dynamic pricing rules, and incident reporting demanded strict relational consistency, secure multi-role authorization, and extensive test coverage. Before a major application change occurred, a large portion of the Staff and Incident Management workflows were automated, requiring the automation suite to be restructured and adapted to the evolving architecture.",
          sections: {
            backend: {
              title: "Backend Architecture & REST APIs",
              badge: "PYTHON & FASTAPI",
              description:
                "Developed and maintained REST APIs using Python and FastAPI. Implemented key server-side foundations:",
              bulletPoints: [
                "Engineered RESTful endpoints handling core operations across staff, shifts, and incidents",
                "Implemented secure authentication and authorization controls for different operational roles",
                "Encapsulated complex business logic for scheduling constraints and pricing models",
                "Built file handling routines for certification uploads and incident attachments",
                "Configured event notifications, structured error handling, and runtime logging",
              ],
            },
            database: {
              title: "Database Engineering & Consistency",
              badge: "POSTGRESQL & ALEMBIC",
              description:
                "Extensive work with PostgreSQL ensuring schema integrity, performant queries, and disciplined migrations:",
              bulletPoints: [
                "Designed relational schemas and entity relationships across staff, clients, and shifts",
                "Applied query optimization and strategic indexing to keep key workflow queries fast",
                "Handled concurrent operations and transactional integrity during shift assignments",
                "Created data cleanup routines to maintain operational database hygiene",
                "Managed schema versioning and zero-downtime database migrations with Alembic",
              ],
            },
            automation: {
              title: "Playwright Automation Framework from Scratch",
              badge: "TEST ARCHITECTURE",
              description:
                "Designed and built the entire automated test framework from the ground up to prevent regressions across business-critical workflows:",
              bulletPoints: [
                "Architected the automation framework using Playwright with modular Page Object Model",
                "Authored structured step definitions and feature files for business-level readability",
                "Created test utilities, factories, and strict types to standardize test construction",
                "Implemented state caching and configurable test-data generation for deterministic runs",
                "Automated extensive Staff and Incident Management workflows before restructuring the suite during an application rework",
              ],
            },
            devops: {
              title: "DevOps & Deployment Infrastructure",
              badge: "DOCKER, LINUX & CI/CD",
              description:
                "Maintained containerized runtime environments, process supervisors, and deployment workflows across development and staging environments:",
              bulletPoints: [
                "Maintained Docker and Linux server environments across development and staging",
                "Configured PM2 for node/service process supervision and zero-downtime reloads",
                "Integrated automated build and testing workflows using Bitbucket Pipelines",
                "Authored shell scripts for deployment steps, dependency updates, and backup management",
              ],
            },
          },
          engineeringDecisions: [
            {
              area: "Test Architecture",
              decision: "Modular Page Objects with Configurable Test Data Generation",
              rationale:
                "Decoupling test logic from UI selectors allowed the test suite to remain adaptable and maintainable even when application modules underwent major structural changes.",
            },
            {
              area: "Database Migrations",
              decision: "Strict Alembic Schema Versioning",
              rationale:
                "Ensured database modifications were strictly repeatable and reversible between local development and staging environments, preventing schema drift.",
            },
            {
              area: "Deployment Workflow",
              decision: "Shell-Based Staging Pipelines with PM2 Process Supervision",
              rationale:
                "Automated application builds and safe service reloads with minimal downtime and easy rollback capabilities.",
            },
          ],
          outcomes: [
            "Automated Staff and Incident Management modules, catching regressions before production releases",
            "Established a reusable, scalable Playwright test harness that could be maintained through major application rework",
            "Maintained reliable PostgreSQL database schema migrations with Alembic across staging environments",
            "Ensured predictable, reproducible application deployments with Docker, Linux, and Bitbucket Pipelines",
          ],
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
          "Backend development, database engineering, test automation, and DevOps support for systems.",
        projects: [
          "Truewill — Quality Management Platform"
        ],
        technologies: [
          "Python",
          "FastAPI",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "SQL",
          "Alembic",
          "Playwright",
          "Bash / Shell",
          "Airflow",
          "Docker",
          "Linux",
          "Git",
          "Bitbucket",
          "CI/CD",
          "PM2"
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
      work: {
        command: "work",
        description: "Show flagship project & engineering work",
        output: [
          "● Truewill — Quality Management Platform (Australian Client)",
          "  Backend: Python, FastAPI, REST APIs",
          "  Database: PostgreSQL, Alembic migrations",
          "  Automation: Playwright test framework from scratch",
          "  DevOps: Docker, Linux, PM2, Bitbucket CI/CD",
          "  Explore in-depth: /work and /work/truewill",
        ],
      },
      experience: {
        command: "experience",
        description: "Show professional experience",
        output: [
          "● Jittec IT Solutions — Backend Developer → Automation & DevOps",
          "  Period: June 2025 — Present • Thiruvananthapuram, India",
          "  Focus: REST APIs, PostgreSQL schemas, Playwright framework, CI/CD",
          "  Explore timeline: /experience",
        ],
      },
      about: {
        command: "about",
        description: "Show engineering philosophy",
        output: [
          "● Philosophy: Pragmatic engineering with curiosity at the core",
          "● Values: Build for Reliability • Automate Toil • End-to-End Understanding • Clear Communication",
          "● Read more: /about",
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
          "● LinkedIn: linkedin.com/in/ayushpvinod",
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
          "  work         Show flagship engineering work",
          "  experience   Show professional experience",
          "  about        Show engineering philosophy",
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
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ayushpvinod/",
        username: "ayushpvinod",
        iconName: "Linkedin",
      },
      {
        name: "Email",
        url: "https://mail.google.com/mail/?view=cm&fs=1&to=223whizguru@gmail.com",
        username: "223whizguru@gmail.com",
        iconName: "Mail",
      },
    ],
  },

  footer: {
    copyrightName: "Ayush",
    techStackNote: "Good Night World !!",
    statusText: "Communication is the Key",
  },
};
