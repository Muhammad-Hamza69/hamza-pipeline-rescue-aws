export interface SiteConfig {
  name: string
  shortName: string
  role: string
  tagline: string
  subTagline: string
  availability: string
  email: string
  github: string
  linkedin: string
  location: string
  resumeUrl?: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface HowIWorkStep {
  step: string
  title: string
  description: string
}

export interface ExpertiseColumn {
  title: string
  description: string
  skills: string[]
}

export interface ExpertiseSection {
  dataEngineering: ExpertiseColumn
  cloudAI: ExpertiseColumn
  techStack: TechItem[]
}

export interface TechItem {
  name: string
  category: string
}

export interface Project {
  title: string
  metric: string
  metricDetail: string
  description: string
  tags: string[]
  github: string
  highlight: string
}

export interface Architecture {
  title: string
  subtitle: string
  description: string
  imageUrl?: string
  diagram?: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface Recognition {
  title: string
  description: string
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  tags: string[]
}
