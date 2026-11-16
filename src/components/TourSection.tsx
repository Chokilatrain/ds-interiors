import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Tour } from '@/content/types'
import { getTour } from '@/content/source'
import { tourPath } from '@/routes.meta'
import { Img } from './Img'
import { TourIcon } from './Icons'
import { TourViewer } from './TourViewer'

/**
 * The 360 walkthrough slot on a project page. Coming-soon shows the preview image with an
 * honest label. Live shows the preview with a start button, which swaps in the tour viewer
 * (the viewer's code only downloads at that point), plus a link to the full-screen page.
 */
export function TourSection({ tour }: { tour: Tour }) {
  const data = tour.status === 'live' ? getTour(tour.tourSlug) : undefined
  const [open, setOpen] = useState(false)

  return (
    <section className="band band--dark" aria-labelledby="tour-heading">
      <div className={`container tour${open ? ' tour--open' : ''}`}>
        <div className="tour__copy">
          <p className="eyebrow eyebrow--light">Virtual walkthrough</p>
          <h2 id="tour-heading" className="h2 h2--light">
            {tour.heading}
          </h2>
          <p className="tour__body">{tour.body}</p>
          {data && (
            <p className="tour__links">
              <Link to={tourPath(data.slug)} className="tour__link">
                Open full screen
              </Link>
            </p>
          )}
        </div>
        <div className="tour__media">
          {data && open ? (
            <TourViewer tour={data} embedded />
          ) : (
            <>
              <Img image={tour.preview} className="tour__img" />
              {data ? (
                <button type="button" className="tour__badge tour__badge--action" onClick={() => setOpen(true)}>
                  <TourIcon />
                  Start 360° tour
                </button>
              ) : (
                <span className="tour__badge">
                  <TourIcon />
                  360° tour coming soon
                </span>
              )}
            </>
          )}
          {data && tour.note && <p className="tour__note">{tour.note}</p>}
        </div>
      </div>
    </section>
  )
}
