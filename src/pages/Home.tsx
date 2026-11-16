import { Link } from 'react-router-dom'
import { content } from '@/content/source'
import { routeByKey } from '@/routes.meta'
import { Seo } from '@/components/Seo'
import { Img } from '@/components/Img'
import { ProjectCard } from '@/components/ProjectCard'
import { ContactForm } from '@/components/ContactForm'
import { ServiceIcon } from '@/components/Icons'

export default function Home() {
  const { home, site, projects } = content
  const meta = routeByKey('home')
  const telHref = `tel:+61${site.phone.replace(/\s/g, '').replace(/^0/, '')}`

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" image={home.hero.image} />

      <section className="band band--sage">
        <div className="container hero">
          <div className="hero__copy">
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1 className="display">
              {home.hero.heading} <em>{home.hero.headingEmphasis}</em>
            </h1>
            <p className="lead">{home.hero.intro}</p>
            <div className="actions">
              <Link to="/portfolio" className="btn btn--dark">
                Explore my work
              </Link>
              <Link to="/#contact" className="btn btn--outline">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="hero__media">
            <Img image={home.hero.image} priority className="cover-img ratio-4x3" sizes="(min-width: 900px) 55vw, 100vw" />
          </div>
        </div>
      </section>

      <section id="about" className="band">
        <div className="container split">
          <div className="split__media">
            <Img image={home.about.image} className="cover-img ratio-4x5" />
          </div>
          <div className="split__copy">
            <p className="eyebrow">About</p>
            <h2 className="h2">{home.about.heading}</h2>
            {home.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="body">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="band band--dark">
        <div className="container stack-lg">
          <div className="sec-head">
            <h2 className="h2 h2--light">{home.services.heading}</h2>
            <p className="sec-head__intro">{home.services.intro}</p>
          </div>
          <div className="services">
            {home.services.items.map((s) => (
              <div key={s.title} className="service">
                <ServiceIcon name={s.icon} />
                <h3 className="h3 h3--light">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="band">
        <div className="container stack-lg">
          <div className="sec-head">
            <div className="stack-sm">
              <p className="eyebrow">Selected work</p>
              <h2 className="h2">Recent projects</h2>
            </div>
            <Link to="/portfolio" className="text-link">
              View all projects →
            </Link>
          </div>
          <div className="card-grid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="band band--sage">
        <div className="container contact">
          <div className="contact__copy">
            <p className="eyebrow">Contact</p>
            <h2 className="h2 h2--xl">{home.contact.heading}</h2>
            <p className="body">{home.contact.body}</p>
            <div className="contact__details">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={telHref}>{site.phone}</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
