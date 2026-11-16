import type { SiteContent } from '../types'

/**
 * Maps the CMS export to the site's content model. Placeholder until the CMS is chosen
 * (Payload, Sanity, or Pages CMS are the candidates): for now it expects generated.json to
 * already be a SiteContent and does a minimal shape check so a bad file fails the build
 * loudly instead of rendering empty pages.
 */
export function mapCmsContent(raw: unknown): SiteContent {
  const c = raw as Partial<SiteContent>
  if (!c || !c.site || !c.home || !Array.isArray(c.projects)) {
    throw new Error('[content] generated.json is not a SiteContent; update src/content/cms/map.ts')
  }
  return c as SiteContent
}
