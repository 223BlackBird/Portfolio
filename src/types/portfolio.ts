export type IconName =
  | "Globe"
  | "Cpu"
  | "Workflow"
  | "Server"
  | "Wrench"
  | "Cloud"
  | "Terminal"
  | "Database"
  | "Code2"
  | "Layers"
  | "Github"
  | "Linkedin"
  | "Mail"
  | "ExternalLink"
  | "ArrowUpRight"
  | "Check"
  | "Copy";

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
  keywords: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ArchitectureLayer {
  layer: string;
  techs: string[];
  status: string;
  latency?: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  subtext: string;
}

export interface TechStackVisualData {
  badge: string;
  title: string;
  subtitle: string;
  environment: string;
  architectureLayers: ArchitectureLayer[];
  metrics: SystemMetric[];
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  tagline: string;
  statusBadge: {
    available: boolean;
    text: string;
  };
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  techStackVisual: TechStackVisualData;
}

export interface EngineeringPrinciple {
  title: string;
  description: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  badge?: string;
  paragraphs: string[];
  principles: EngineeringPrinciple[];
  highlights: Array<{
    label: string;
    value: string;
  }>;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
  tags: string[];
}

export interface SkillItem {
  name: string;
  category: string;
  focus?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: SkillItem[];
}

export interface ProjectMockup {
  type: "terminal" | "api" | "dashboard" | "system";
  tag: string;
  title: string;
  snippet?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemSolved: string;
  architectureHighlights?: string[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  status: "Production" | "Active Development" | "Prototype" | "Completed";
  isFeatured: boolean;
  keyContributions?: string[];
  mockup?: ProjectMockup;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}

export interface SocialLink {
  name: string;
  url: string;
  username: string;
  iconName: IconName;
}

export interface ContactData {
  title: string;
  subtitle: string;
  directEmail: string;
  statusText: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  metadata: SiteMetadata;
  navigation: NavigationItem[];
  hero: HeroData;
  about: AboutData;
  whatIDo: {
    badge: string;
    title: string;
    subtitle: string;
    items: CapabilityItem[];
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    items: Project[];
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  terminal: {
    badge: string;
    title: string;
    subtitle: string;
    initialCommands: string[];
    commands: Record<string, TerminalCommand>;
  };
  contact: ContactData;
  footer: {
    copyrightName: string;
    techStackNote: string;
    statusText: string;
  };
}
