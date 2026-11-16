/**
 * The content model. Everything Danii can edit lives in this shape, whichever source fills it.
 *
 * The fake source (src/content/seed) and the future CMS both produce a SiteContent. When the
 * CMS is wired, scripts/fetch-cms.mjs must write src/content/cms/generated.json in exactly
 * this shape (or map to it in src/content/cms/map.ts), and nothing else in the app changes.
 */

export interface Image {
  /** Public path (/images/...) or an absolute CDN URL. */
  src: string
  alt: string
  width: number
  height: number
}

export interface SocialLink {
  label: string
  url: string
}

export interface SiteSettings {
  name: string
  /** Shown under the name in the footer and in page titles. */
  tagline: string
  location: string
  email: string
  phone: string
  social: SocialLink[]
  logo: Image
}

export interface Service {
  title: string
  body: string
  icon: 'concept' | 'plan'
}

export interface HomeContent {
  hero: {
    eyebrow: string
    heading: string
    /** Second half of the heading, set in italic. */
    headingEmphasis: string
    intro: string
    image: Image
  }
  about: {
    heading: string
    paragraphs: string[]
    image: Image
  }
  services: {
    heading: string
    intro: string
    items: Service[]
  }
  contact: {
    heading: string
    body: string
  }
}

export type ProjectCategory = 'Residential' | 'Commercial' | 'Hospitality'

export interface ProjectHighlight {
  title: string
  body: string
}

export interface ProjectList {
  heading: string
  items: string[]
}

export interface Tour {
  /** coming-soon shows the preview with a label; live embeds the tour viewer (next stage). */
  status: 'coming-soon' | 'live'
  heading: string
  body: string
  preview: Image
  /** The tour viewer URL once tours are built. */
  url?: string
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  /** e.g. "Residential kitchen". */
  type: string
  year: number
  location: string
  /** Who made the renders or photos. */
  credit: string
  /** One line for cards and meta descriptions. */
  summary: string
  /** The lead paragraph on the project page. */
  intro: string
  body?: string[]
  highlights?: ProjectHighlight[]
  lists?: ProjectList[]
  /** Shown above the intro, e.g. for concept pieces using a real brand. */
  disclaimer?: string
  cover: Image
  gallery: Image[]
  tour?: Tour
}

export interface SiteContent {
  site: SiteSettings
  home: HomeContent
  /** In display order. */
  projects: Project[]
}
