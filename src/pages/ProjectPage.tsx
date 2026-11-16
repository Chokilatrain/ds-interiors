import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, nextProject } from '@/content/source'
import { projectPath, routeByKey } from '@/routes.meta'
import { Seo } from '@/components/Seo'
import { Img } from '@/components/Img'
import { Lightbox } from '@/components/Lightbox'
import { TourSection } from '@/components/TourSection'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  // Which image the lightbox shows (0 is the cover, then the gallery), or null when closed.
  const [viewing, setViewing] = useState<number | null>(null)
  const closeViewer = useCallback(() => setViewing(null), [])
  if (!project) return <NotFound />

  const next = nextProject(project.slug)
  const meta = routeByKey('project')
  const viewerImages = [project.cover, ...project.gallery]

  return (
    <>
      <Seo
        title={meta.title.replace('%s', project.title)}
        description={project.summary}
        path={projectPath(project.slug)}
        image={project.cover}
      />

      <section className="container project-head">
        <Link to="/portfolio" className="text-link text-link--back">
          ← All projects
        </Link>
        <div className="project-head__row">
          <div className="stack-sm project-head__title">
            <p className="eyebrow">{project.type}</p>
            <h1 className="display display--lg">{project.title}</h1>
          </div>
          <dl className="facts">
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Renders</dt>
              <dd>{project.credit}</dd>
            </div>
          </dl>
        </div>
        <button
          type="button"
          className="zoomable"
          onClick={() => setViewing(0)}
          aria-label={`View larger: ${project.cover.alt}`}
        >
          <Img image={project.cover} priority className="cover-img ratio-wide" sizes="100vw" />
        </button>
      </section>

      <section className="container project-body">
        <div className="project-body__intro">
          {project.disclaimer && <p className="disclaimer">{project.disclaimer}</p>}
          <p className="lead lead--serif">{project.intro}</p>
          {project.body?.map((p) => (
            <p key={p.slice(0, 24)} className="body">
              {p}
            </p>
          ))}
        </div>
        {(project.highlights || project.lists) && (
          <div className="project-body__detail">
            {project.highlights && (
              <ul className="highlights">
                {project.highlights.map((h) => (
                  <li key={h.title}>
                    <span className="highlights__title">{h.title}</span>
                    <span className="highlights__body">{h.body}</span>
                  </li>
                ))}
              </ul>
            )}
            {project.lists?.map((l) => (
              <div key={l.heading} className="plain-list">
                <h2 className="h3">{l.heading}</h2>
                <ul>
                  {l.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {project.tour && <TourSection tour={project.tour} />}

      {project.gallery.length > 0 && (
        <section className="container gallery-wrap" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="h2">
            Gallery
          </h2>
          <div className="gallery">
            {project.gallery.map((g, i) => (
              <figure key={g.src} className="gallery__item">
                <button
                  type="button"
                  className="zoomable"
                  onClick={() => setViewing(i + 1)}
                  aria-label={`View larger: ${g.alt}`}
                >
                  <Img image={g} className="gallery__img" sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" />
                </button>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="band band--sage">
        <Link to={projectPath(next.slug)} className="container next-project">
          <span className="stack-sm">
            <span className="eyebrow">Next project</span>
            <span className="next-project__title">{next.title} →</span>
          </span>
          <Img image={next.cover} className="next-project__img" />
        </Link>
      </section>

      <Lightbox images={viewerImages} index={viewing} onChange={setViewing} onClose={closeViewer} />
    </>
  )
}
