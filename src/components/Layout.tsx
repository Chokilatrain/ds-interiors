import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { PreviewTag } from './PreviewTag'
import '@/styles/fonts'
import '@/styles/site.css'

/** Root route element: header, page, footer. */
export default function Layout() {
  useHashScroll()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <PreviewTag />
      <ScrollRestoration />
    </>
  )
}

/**
 * Client-side navigation to /#about or /#contact lands at the top of the new page by default;
 * this scrolls to the anchor once the page has rendered.
 */
function useHashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
  }, [pathname, hash])
}
