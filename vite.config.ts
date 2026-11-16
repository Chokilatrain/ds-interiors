import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { NOT_FOUND_PATH, projectPath, routeMeta, tourPath } from './src/routes.meta.ts'
import { seedContent } from './src/content/seed/index.ts'

/**
 * Project slugs to pre-render: from the CMS export in cms mode (when it exists), otherwise
 * from the seed. Mirrors the choice src/content/source.ts makes at runtime.
 */
function projectSlugs(mode: string | undefined): string[] {
  const generated = fileURLToPath(new URL('./src/content/cms/generated.json', import.meta.url))
  if (mode === 'cms' && existsSync(generated)) {
    try {
      const data = JSON.parse(readFileSync(generated, 'utf8')) as { projects?: { slug: string }[] }
      return (data.projects ?? []).map((p) => p.slug)
    } catch {
      // A broken file fails later in src/content/cms/map.ts with a clearer message.
    }
  }
  return seedContent.projects.map((p) => p.slug)
}

/** Tour slugs to pre-render, chosen the same way as projectSlugs. */
function tourSlugs(mode: string | undefined): string[] {
  const generated = fileURLToPath(new URL('./src/content/cms/generated.json', import.meta.url))
  if (mode === 'cms' && existsSync(generated)) {
    try {
      const data = JSON.parse(readFileSync(generated, 'utf8')) as { tours?: { slug: string }[] }
      return (data.tours ?? []).map((t) => t.slug)
    } catch {
      // Reported by src/content/cms/map.ts.
    }
  }
  return seedContent.tours.map((t) => t.slug)
}

export default defineConfig(({ mode }) => {
  // Make .env values visible to routes.meta.ts and the sitemap code below.
  Object.assign(process.env, { ...loadEnv(mode, process.cwd(), ''), ...process.env })
  const contentMode = process.env.VITE_CONTENT_SOURCE
  const siteUrl = (process.env.VITE_SITE_URL ?? 'https://dsinteriors.example').replace(/\/$/, '')
  const pages = [
    ...routeMeta.filter((r) => !r.dynamic).map((r) => r.path),
    ...projectSlugs(contentMode).map(projectPath),
  ]

  return {
    plugins: [react()],
    // Serve /portfolio from /portfolio/index.html in dev and preview, like the static host.
    appType: 'mpa',
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: { target: 'es2022', sourcemap: false },
    ssgOptions: {
      dirStyle: 'nested',
      script: 'defer',
      // Tour pages are rendered but left out of the sitemap (they're noindex).
      includedRoutes: () => [...pages, ...tourSlugs(contentMode).map(tourPath), NOT_FOUND_PATH],
      onFinished(dir: string) {
        // Static hosts serve /404.html for unknown paths.
        const rendered404 = join(dir, NOT_FOUND_PATH.slice(1), 'index.html')
        if (existsSync(rendered404)) copyFileSync(rendered404, join(dir, '404.html'))

        const today = new Date().toISOString().slice(0, 10)
        const sitemap =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          pages
            .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`)
            .join('\n') +
          '\n</urlset>\n'
        writeFileSync(join(dir, 'sitemap.xml'), sitemap)

        const noindex = process.env.VITE_NOINDEX === '1'
        writeFileSync(
          join(dir, 'robots.txt'),
          noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
        )
      },
    },
  }
})
