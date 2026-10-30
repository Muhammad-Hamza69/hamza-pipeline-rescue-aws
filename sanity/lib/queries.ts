import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, shortName, role, tagline, subTagline,
  availability, email, github, linkedin, location,
  "resumeUrl": resume.asset->url,
  stats[]{ value, suffix, label }
}`

export const howIWorkQuery = groq`*[_type == "howIWorkSection"][0]{
  steps[]{ step, title, description }
}`

export const expertiseQuery = groq`*[_type == "expertiseSection"][0]{
  dataEngineering{ title, description, skills },
  cloudAI{ title, description, skills },
  techStack[]{ name, category }
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  title, metric, metricDetail, description, tags, github, highlight
}`

export const architecturesQuery = groq`*[_type == "architecture"] | order(order asc){
  title, subtitle, description, imageUrl, diagram
}`

export const certificationsQuery = groq`*[_type == "certification"] | order(order asc){
  name, issuer
}`

export const recognitionQuery = groq`*[_type == "recognition"]{
  title, description
}`

export const experienceQuery = groq`*[_type == "experience"] | order(order asc){
  company, role, period, description, tags
}`
