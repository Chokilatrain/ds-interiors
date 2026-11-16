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
  /** The brand words from her brand statement, shown as a strip under the hero. */
  values: string[]
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

/** A doorway or arrow in a scene that moves to another scene. Angles in degrees. */
export interface TourLink {
  /** Target scene id. */
  to: string
  /** Horizontal angle: 0 is the centre of the panorama, positive turns right. */
  yaw: number
  /** Vertical angle: 0 is the horizon, negative looks down. */
  pitch: number
}

/** A point of interest in a scene: a pin that shows a short note. */
export interface TourHotspot {
  id: string
  yaw: number
  pitch: number
  title: string
  body: string
}

/** One 360° panorama (equirectangular, 2:1) in a tour. */
export interface TourScene {
  id: string
  title: string
  /** URL of the equirectangular image. */
  panorama: string
  /** Small 2:1 preview used in the room picker. */
  thumbnail: string
  /** Where the view faces when the scene opens, in degrees. */
  startYaw?: number
  links: TourLink[]
  hotspots?: TourHotspot[]
}

export interface TourData {
  slug: string
  title: string
  /** Shown in the viewer, e.g. who made the panoramas. */
  credit?: string
  startScene: string
  scenes: TourScene[]
}

export interface Tour {
  /** coming-soon shows the preview with a label; live opens the viewer for tourSlug. */
  status: 'coming-soon' | 'live'
  heading: string
  body: string
  preview: Image
  /** Which entry in SiteContent.tours to show when live. */
  tourSlug?: string
  /** Shown under the viewer, e.g. to say a tour uses sample rooms. */
  note?: string
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
  /** 360° tours, each at /tours/<slug> and embeddable on a project page. */
  tours: TourData[]
}
