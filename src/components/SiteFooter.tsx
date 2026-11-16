import { content } from '@/content/source'

export function SiteFooter() {
  const { site } = content
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__name">{site.name}</span>
          <span className="site-footer__meta">
            {site.tagline} · {site.location}
          </span>
        </div>
        {site.social.length > 0 && (
          <nav aria-label="Social" className="site-footer__social">
            {site.social.map((s) => (
              <a key={s.url} href={s.url} rel="noopener noreferrer" target="_blank">
                {s.label}
              </a>
            ))}
          </nav>
        )}
        <span className="site-footer__copy">
          © {year} {site.name}
        </span>
      </div>
    </footer>
  )
}
