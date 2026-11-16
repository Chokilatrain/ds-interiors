#!/usr/bin/env node
/**
 * Pull published content from the CMS into src/content/cms/generated.json before the build.
 *
 * NOT WIRED YET. This is the hook the build already calls, so connecting the CMS later means
 * filling in fetchContent() below and nothing else in the build changes:
 *
 *   VITE_CONTENT_SOURCE != cms  -> skip, the site builds from the seed (fake mode)
 *   CMS_URL unset               -> warn, build from the seed
 *   CMS_REQUIRED=1              -> any failure stops the build (use once the CMS is live)
 *
 * Output contract: a JSON file in the SiteContent shape from src/content/types.ts, or a shape
 * that src/content/cms/map.ts knows how to map.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const out = join(process.cwd(), 'src/content/cms/generated.json')
const mode = process.env.VITE_CONTENT_SOURCE ?? 'fake'
const cmsUrl = (process.env.CMS_URL ?? '').replace(/\/$/, '')
const required = process.env.CMS_REQUIRED === '1'

function bail(msg) {
  if (required) {
    console.error(`[fetch-cms] ${msg}`)
    process.exit(1)
  }
  console.warn(`[fetch-cms] ${msg} (building from seed content)`)
  process.exit(0)
}

if (mode !== 'cms') {
  console.log('[fetch-cms] content source is fake, skipping')
  process.exit(0)
}
if (!cmsUrl) bail('CMS_URL is not set')

/** Replace with the real fetch once the CMS is chosen. Must resolve to a SiteContent. */
async function fetchContent() {
  throw new Error('CMS fetch not implemented yet')
}

try {
  const content = await fetchContent()
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(content, null, 2))
  console.log(`[fetch-cms] wrote ${out}`)
} catch (err) {
  bail(err instanceof Error ? err.message : String(err))
}
