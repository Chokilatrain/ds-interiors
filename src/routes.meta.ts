/**
 * The single source of truth for routes. Pure data, no React: vite.config.ts imports this to
 * decide what to pre-render and to write the sitemap, and src/routes.tsx turns it into
 * react-router records. Add a page here first.
 */

export const SITE_NAME = 'DS Interiors'

/** The live address. Set VITE_SITE_URL once the domain is chosen. */
export const SITE_URL = (
  (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : undefined) ??
  import.meta.env?.VITE_SITE_URL ??
  'https://dsinteriors.example'
).replace(/\/$/, '')

export type PageKey = 'home' | 'portfolio' | 'project'

export interface RouteMeta {
  key: PageKey
  path: string
  label: string
  title: string
  description: string
  /** Has a :param; concrete paths come from content (see projectPaths). */
  dynamic?: boolean
}

export const routeMeta: RouteMeta[] = [
  {
    key: 'home',
    path: '/',
    label: 'Home',
    title: 'DS Interiors | Interior design, Gold Coast',
    description:
      'DS Interiors creates timeless, functional, and beautiful interiors inspired by nature and narrative. Based on the Gold Coast, Queensland.',
  },
  {
    key: 'portfolio',
    path: '/portfolio',
    label: 'Portfolio',
    title: 'Portfolio | DS Interiors',
    description:
      'Residential, commercial, and hospitality interiors by DS Interiors, with renders, plans, and material boards.',
  },
  {
    key: 'project',
    path: '/projects/:slug',
    label: 'Project',
    title: '%s | DS Interiors',
    description: '',
    dynamic: true,
  },
]

export const NOT_FOUND_PATH = '/404'

export const routeByKey = (key: PageKey): RouteMeta => {
  const r = routeMeta.find((m) => m.key === key)
  if (!r) throw new Error(`Unknown route ${key}`)
  return r
}

export const projectPath = (slug: string) => `/projects/${slug}`

export const TOURS_BASE = '/tours'
export const tourPath = (slug: string) => `${TOURS_BASE}/${slug}`
