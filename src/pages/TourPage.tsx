import { Link, useParams } from 'react-router-dom'
import { getTour } from '@/content/source'
import { SITE_NAME, tourPath } from '@/routes.meta'
import { Seo } from '@/components/Seo'
import { TourViewer } from '@/components/TourViewer'
import NotFound from './NotFound'
import '@/styles/fonts'
import '@/styles/site.css'

/**
 * Full-screen tour at /tours/<slug>, outside the site layout so the panorama gets the whole
 * window. Always noindex: the project page is the page people should land on from search.
 * This is also the URL to share with a client or embed in an iframe elsewhere.
 */
export default function TourPage() {
  const { slug } = useParams()
  const tour = getTour(slug)
  if (!tour) return <NotFound />

  return (
    <div className="tour-page">
      <Seo
        title={`${tour.title} | ${SITE_NAME}`}
        description={`A 360° walkthrough by ${SITE_NAME}.`}
        path={tourPath(tour.slug)}
        noindex
      />
      <header className="tour-page__bar">
        <Link to="/" className="tour-page__brand">
          {SITE_NAME}
        </Link>
        <h1 className="tour-page__title">{tour.title}</h1>
        <Link to="/portfolio" className="tour-page__back">
          Back to portfolio
        </Link>
      </header>
      <main className="tour-page__main">
        <TourViewer tour={tour} />
      </main>
    </div>
  )
}
