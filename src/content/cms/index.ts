/**
 * Published content pulled from the CMS at build time by scripts/fetch-cms.mjs. The file is
 * gitignored and import.meta.glob tolerates its absence, so a checkout without a CMS builds
 * from the seed content. Not wired to a real CMS yet.
 */
const files = import.meta.glob<{ default: unknown }>('./generated.json', { eager: true })

export const cmsGenerated: unknown | null = Object.values(files)[0]?.default ?? null
