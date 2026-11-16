import { useState } from 'react'
import { content } from '@/content/source'
import type { ProjectCategory } from '@/content/types'
import { routeByKey } from '@/routes.meta'
import { Seo } from '@/components/Seo'
import { ProjectCard } from '@/components/ProjectCard'

type Filter = 'All' | ProjectCategory

export default function Portfolio() {
  const meta = routeByKey('portfolio')
  const { projects } = content
  const [filter, setFilter] = useState<Filter>('All')

  // Only offer categories that actually have projects.
  const filters: Filter[] = [
    'All',
    ...(['Residential', 'Commercial', 'Hospitality'] as ProjectCategory[]).filter((c) =>
      projects.some((p) => p.category === c),
    ),
  ]
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} image={projects[0]?.cover} />

      <section className="band band--sage">
        <div className="container page-head">
          <div className="stack-md page-head__main">
            <p className="eyebrow">Portfolio</p>
            <h1 className="display display--md">Kitchens, cafes, retail, and the spaces in between.</h1>
          </div>
          <p className="lead page-head__aside">
            Concepts, renovations, and creative explorations, each with renders, plans, and material boards.
          </p>
        </div>
      </section>

      <section className="band band--tight-top">
        <div className="container stack-lg">
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`pill${filter === f ? ' is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="card-grid card-grid--wide" aria-live="polite">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
