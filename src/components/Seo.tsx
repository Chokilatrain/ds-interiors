import { Head } from 'vite-react-ssg'
import { SITE_NAME, SITE_URL } from '@/routes.meta'
import type { Image } from '@/content/types'

interface SeoProps {
  title: string
  description: string
  /** Concrete path of this page, e.g. /projects/serene-retreat. */
  path: string
  image?: Image
  /** Keep this page out of search even after launch (e.g. full-screen tour pages). */
  noindex?: boolean
}

/** Per-page head tags. VITE_NOINDEX=1 keeps the whole preview out of search engines. */
export function Seo({ title, description, path, image, noindex: pageNoindex }: SeoProps) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const noindex = pageNoindex || import.meta.env.VITE_NOINDEX === '1'
  const img = image ? (image.src.startsWith('http') ? image.src : `${SITE_URL}${image.src}`) : undefined
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {img && <meta property="og:image" content={img} />}
      <meta name="twitter:card" content={img ? 'summary_large_image' : 'summary'} />
    </Head>
  )
}
