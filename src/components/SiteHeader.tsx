import { Link, NavLink } from 'react-router-dom'
import { content } from '@/content/source'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const { site } = content
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand">
          <img
            className="brand__mark"
            src={site.logo.src}
            alt=""
            width={64}
            height={64}
          />
          <span className="brand__name">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="site-nav">
          {NAV.map((item) =>
            item.to.includes('#') ? (
              <Link key={item.to} to={item.to} className="site-nav__link">
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
