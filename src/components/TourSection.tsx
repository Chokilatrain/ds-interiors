import type { Tour } from '@/content/types'
import { Img } from './Img'
import { TourIcon } from './Icons'

/**
 * The 360 walkthrough slot on a project page. Coming-soon shows the preview image with an
 * honest label (no fake button). Live will embed our own tour viewer in the next stage;
 * until that exists, a live tour with a URL opens it in a new tab.
 */
export function TourSection({ tour }: { tour: Tour }) {
  const live = tour.status === 'live' && tour.url
  return (
    <section className="band band--dark" aria-labelledby="tour-heading">
      <div className="container tour">
        <div className="tour__copy">
          <p className="eyebrow eyebrow--light">Virtual walkthrough</p>
          <h2 id="tour-heading" className="h2 h2--light">
            {tour.heading}
          </h2>
          <p className="tour__body">{tour.body}</p>
        </div>
        <div className="tour__media">
          <Img image={tour.preview} className="tour__img" />
          {live ? (
            <a className="tour__badge tour__badge--action" href={tour.url} target="_blank" rel="noopener">
              <TourIcon />
              Start 360° tour
            </a>
          ) : (
            <span className="tour__badge">
              <TourIcon />
              360° tour coming soon
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
