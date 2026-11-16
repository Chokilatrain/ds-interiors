import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { NOT_FOUND_PATH } from '@/routes.meta'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | DS Interiors" description="That page could not be found." path={NOT_FOUND_PATH} />
      <section className="band band--sage">
        <div className="container stack-md not-found">
          <p className="eyebrow">404</p>
          <h1 className="display display--md">That page isn’t here.</h1>
          <p className="lead">It may have moved when the site was rebuilt.</p>
          <div className="actions">
            <Link to="/portfolio" className="btn btn--dark">
              See the portfolio
            </Link>
            <Link to="/" className="btn btn--outline">
              Go home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
