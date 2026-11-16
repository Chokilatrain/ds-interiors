import { Link } from 'react-router-dom'
import type { Project } from '@/content/types'
import { projectPath } from '@/routes.meta'
import { Img } from './Img'

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <Link to={projectPath(project.slug)} className="project-card">
      <span className="project-card__media">
        <Img image={project.cover} priority={priority} className="project-card__img" />
      </span>
      <span className="project-card__meta">
        <span>{project.type}</span>
        <span>{project.year}</span>
      </span>
      <span className="project-card__title">{project.title}</span>
      <span className="project-card__summary">{project.summary}</span>
    </Link>
  )
}
