# ds-interiors-site

Danii's DS Interiors portfolio, rebuilt off Wix. It's React 18 + TypeScript on Vite, pre-rendered to static HTML with vite-react-ssg, following the same pattern as the PeriscoPe website rebuild (route table, content as data, CMS pulled in at build time). The look comes from the design canvas "DS Interiors site refresh" (https://claude.ai/artifact/NzkLLwjwFfL1eUMNzJp3P2).

Right now it runs in **fake mode**: all content comes from seed files in the repo, so we can show Danii the site before the CMS exists. The CMS wiring is stubbed and ready to fill in.

## Getting started

```sh
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
npm run build        # pre-renders every page into dist/
npm run preview      # serves dist/ like a static host, http://localhost:4173
npm run verify       # typecheck + build
```

## Brand

Styling follows Danii's brand identity guidelines (see the "Brand on the web" board on the design canvas). All tokens are CSS variables at the top of `src/styles/site.css`:

- Brand colours: sage `#7C846C`, pale sage `#D2D7C3`, and oak `#CBB494` (decorative only, never text). Sand `#E5D8BE` comes from her palette page.
- Text colours: deep sage `#575E48` and deep olive `#2E3323`, from her font studies. Her mid sage is too light for small text, so body copy never sits on it.
- Fonts: her brand fonts are CoFo Raffine and Gabriola, both on Adobe Fonts for web use. Until there's an Adobe Fonts web project, the self-hosted stand-ins are Playfair Display (headings) and Cormorant Garamond Italic (the "Interior Design" accent), with Jost for body text. To switch, load the Adobe Fonts stylesheet in `index.html` and put the Adobe family names first in `--serif` and `--accent`.
- Brand pieces: the Timeless · Unique · Evoke strip (`home.values` in the content, so it can be edited), the oak offset frame (`.framed`), and "Interior Design" under the name in the header (`site.tagline`).

## Content modes

Set with `VITE_CONTENT_SOURCE` in `.env` (read at build time).

- `fake` (default): content comes from `src/content/seed/`. That's her Wix copy with the typos fixed, plus her renders in `public/images/projects/`.
- `cms`: `npm run build` runs `scripts/fetch-cms.mjs` first, which writes `src/content/cms/generated.json`, and the site renders from that. If the file is missing it falls back to the seed and logs a warning. The fetch itself is a stub until we pick the CMS.

Pages never import content files directly. They go through `src/content/source.ts`, so swapping the source changes nothing in the components.

## Wiring the CMS later

1. Pick the CMS (options are in the project setup doc: Payload as a tenant on PeriscoPe's, Payload on Cloudflare, Sanity free, or Pages CMS).
2. Model it on `src/content/types.ts`. Those types are the contract: site settings, home page copy, and projects (title, slug, category, type, year, location, credit, summary, intro, body, highlights, lists, disclaimer, cover, gallery, tour).
3. Fill in `fetchContent()` in `scripts/fetch-cms.mjs`, and if the CMS shape differs, map it in `src/content/cms/map.ts`.
4. Set `VITE_CONTENT_SOURCE=cms`, `CMS_URL`, and `CMS_REQUIRED=1` on the production build, and add a publish hook that triggers a rebuild.

## Other switches

- `VITE_PREVIEW=1` shows a small "Preview" tag in the corner (with "sample content" in fake mode). Turn it off for launch.
- `VITE_NOINDEX=1` puts noindex on every page and blocks crawlers in robots.txt. Keep it on until launch.
- `VITE_SITE_URL` is used for canonical links, Open Graph, and the sitemap. Set it once the domain is chosen.
- `VITE_FORMS_ENDPOINT`: the contact form JSON-POSTs here. When it's empty the form runs in fake mode, showing the thank-you state and saying nothing was sent.

## How it's organised

```
src/
  routes.meta.ts        Route table: paths, titles, descriptions. Add pages here first.
  routes.tsx            Maps routes to lazy page components.
  content/
    types.ts            The content model (the CMS contract).
    source.ts           Picks fake or cms, exposes `content`, getProject, nextProject.
    seed/               Fake-mode content and image sizes.
    cms/                generated.json (gitignored) + map.ts.
  components/           Layout, header, footer, Seo, Img, ProjectCard, ContactForm, TourSection, Lightbox, PreviewTag.
  pages/                Home, Portfolio, ProjectPage, NotFound.
  styles/               site.css (tokens from the design canvas), fonts.ts (self-hosted via Fontsource).
scripts/                fetch-cms (stub), serve-dist.
public/images/          Seed images downloaded from her Wix site.
```

## Deploying (Cloudflare Workers static assets)

The repo is connected in Cloudflare (Workers & Pages > Create > Import a repository) with:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (preview builds: `npx wrangler preview`)
- Path: `/`

`wrangler.jsonc` tells wrangler to upload `dist/` as a static site, serve the nested `index.html` files at clean URLs, and return `dist/404.html` with a 404 for unknown paths. The Worker `name` in it matches the Cloudflare project name (`ds-interiors`).

Build settings come from `.env.production` (committed, no secrets): fake content, the Preview tag on, and noindex on. Change it there for launch rather than in the dashboard, and set `VITE_SITE_URL` once there is a domain. Variables set in the Cloudflare deploy form are runtime Worker variables, which a static site doesn't use. Build-time overrides go under Settings > Build > Build variables.

`.node-version` pins Node 22 for the build, and `public/_headers` sets cache headers (Workers static assets read it). Pushes to `main` deploy; other branches get preview URLs.

## Lightbox

On project pages the cover and every gallery image open a full-screen viewer (`src/components/Lightbox.tsx`). It's built on the native modal `<dialog>`, so the browser handles focus, Esc, and the mobile back gesture, and returns focus to the image when it closes. Arrow keys and horizontal swipes move between images, and clicking the dark area closes it. No dependencies.

## Notes

- Fonts are self-hosted from npm (Fontsource: Cormorant Garamond and Jost), so nothing is loaded from Google.
- The images are the Wix copies (max 1800px). Swap in her originals from the hard drive and update the sizes in `src/content/seed/images.ts`. Gallery alt text is generic for now, and the CMS should require a proper description per image.
- The 360 tour slot is only on Mid Century Modernism for now, showing a preview image with a "coming soon" label. The tour viewer is the next stage.
- Social links are empty until Danii sends hers. The footer hides the row when there are none.
- Project URLs are `/projects/<slug>`. LUST Minerals moved from Wix's long slug to `/projects/lust-minerals`.
