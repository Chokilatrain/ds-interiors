import type { Project, SiteContent } from './types'
import { seedContent } from './seed'
import { cmsGenerated } from './cms'
import { mapCmsContent } from './cms/map'

/**
 * The content adapter, following the PeriscoPe site's pattern: pages never import content
 * files directly, they ask this module. The source is picked at build time:
 *
 *   VITE_CONTENT_SOURCE=fake (default)  seed files in src/content/seed
 *   VITE_CONTENT_SOURCE=cms             src/content/cms/generated.json from scripts/fetch-cms.mjs,
 *                                       falling back to the seed if the file is missing
 *
 * Content is resolved synchronously so every pre-rendered page is complete HTML.
 */
export type ContentMode = 'fake' | 'cms'

export interface ContentSource {
  mode: ContentMode
  load(): SiteContent
}

const fakeSource: ContentSource = {
  mode: 'fake',
  load: () => seedContent,
}

const cmsSource: ContentSource = {
  mode: 'cms',
  load() {
    if (!cmsGenerated) {
      console.warn('[content] cms mode but no generated.json yet, using seed content')
      return seedContent
    }
    return mapCmsContent(cmsGenerated)
  },
}

export const requestedMode: ContentMode =
  import.meta.env.VITE_CONTENT_SOURCE === 'cms' ? 'cms' : 'fake'

const source = requestedMode === 'cms' ? cmsSource : fakeSource

export const content: SiteContent = source.load()

/** True when the page is showing the bundled seed (fake mode, or cms mode without data). */
export const isFakeContent = requestedMode === 'fake' || !cmsGenerated

export const getProject = (slug: string | undefined): Project | undefined =>
  content.projects.find((p) => p.slug === slug)

/** The next project in display order, wrapping round to the first. */
export function nextProject(slug: string): Project {
  const i = content.projects.findIndex((p) => p.slug === slug)
  return content.projects[(i + 1) % content.projects.length]
}
