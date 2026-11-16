import { useEffect, useRef, useState } from 'react'
import type { TourData } from '@/content/types'

/**
 * Our own 360° tour player, built on Photo Sphere Viewer (MIT, three.js). It replaces
 * Panoraven: Danii exports equirectangular renders, the CMS holds the scenes, links, and
 * hotspots (see TourData), and this draws them.
 *
 * The viewer only runs in the browser. PSV and three.js are imported inside the effect, so
 * they load as a separate chunk when a tour opens and never touch the pre-render or the
 * rest of the site.
 *
 * `embedded` is for the inline viewer on a project page: the scroll wheel needs Ctrl and
 * touch drags need two fingers, so the page still scrolls past it.
 */

type Viewer = import('@photo-sphere-viewer/core').Viewer
type TourPlugin = import('@photo-sphere-viewer/virtual-tour-plugin').VirtualTourPlugin

const deg = (n: number) => `${n}deg`

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function TourViewer({ tour, embedded = false }: { tour: TourData; embedded?: boolean }) {
  const container = useRef<HTMLDivElement>(null)
  const pluginRef = useRef<TourPlugin | null>(null)
  const [current, setCurrent] = useState(tour.startScene)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let viewer: Viewer | undefined
    let cancelled = false

    async function start() {
      const [{ Viewer }, { MarkersPlugin }, { VirtualTourPlugin }] = await Promise.all([
        import('@photo-sphere-viewer/core'),
        import('@photo-sphere-viewer/markers-plugin'),
        import('@photo-sphere-viewer/virtual-tour-plugin'),
        import('@photo-sphere-viewer/core/index.css'),
        import('@photo-sphere-viewer/markers-plugin/index.css'),
        import('@photo-sphere-viewer/virtual-tour-plugin/index.css'),
      ])
      if (cancelled || !container.current) return

      const byId = new Map(tour.scenes.map((s) => [s.id, s]))
      const nodes = tour.scenes.map((scene) => ({
        id: scene.id,
        panorama: scene.panorama,
        thumbnail: scene.thumbnail,
        name: scene.title,
        caption: `${scene.title}${tour.credit ? ` · ${tour.credit}` : ''}`,
        links: scene.links
          .filter((l) => byId.has(l.to))
          .map((l) => ({ nodeId: l.to, position: { yaw: deg(l.yaw), pitch: deg(l.pitch) } })),
        markers: (scene.hotspots ?? []).map((h) => ({
          id: h.id,
          position: { yaw: deg(h.yaw), pitch: deg(h.pitch) },
          html: '<span class="tour-pin" aria-hidden="true"></span>',
          size: { width: 28, height: 28 },
          anchor: 'center center',
          tooltip: { content: escapeHtml(h.title), position: 'top center' },
          content: `<div class="tour-note"><h3>${escapeHtml(h.title)}</h3><p>${escapeHtml(h.body)}</p></div>`,
        })),
      }))

      const first = byId.get(tour.startScene) ?? tour.scenes[0]
      viewer = new Viewer({
        container: container.current,
        defaultYaw: deg(first.startYaw ?? 0),
        defaultZoomLvl: 30,
        mousewheelCtrlKey: embedded,
        touchmoveTwoFingers: embedded,
        loadingTxt: 'Loading…',
        navbar: ['zoom', 'move', 'caption', 'fullscreen'],
        plugins: [
          MarkersPlugin,
          VirtualTourPlugin.withConfig({
            positionMode: 'manual',
            renderMode: '2d',
            nodes,
            startNodeId: first.id,
            showLinkTooltip: true,
            transitionOptions: { showLoader: true, effect: 'fade', speed: '20rpm', rotation: true },
          }),
        ],
      })

      const plugin = viewer.getPlugin<TourPlugin>(VirtualTourPlugin)
      pluginRef.current = plugin
      plugin.addEventListener('node-changed', ({ node, data }) => {
        setCurrent(node.id)
        // Face the scene's chosen direction when arriving from a doorway or the room list.
        const startYaw = byId.get(node.id)?.startYaw
        if (data.fromNode && startYaw !== undefined) viewer?.rotate({ yaw: deg(startYaw), pitch: 0 })
      })
      viewer.addEventListener('ready', () => setStatus('ready'), { once: true })
      viewer.addEventListener('panorama-error', () => setStatus('error'))
    }

    start().catch((err) => {
      console.error('[tour] failed to start', err)
      if (!cancelled) setStatus('error')
    })

    return () => {
      cancelled = true
      pluginRef.current = null
      viewer?.destroy()
    }
  }, [tour, embedded])

  const goTo = (id: string) => {
    if (id !== current) pluginRef.current?.setCurrentNode(id)
  }

  return (
    <div className={`tour-viewer${embedded ? ' tour-viewer--embedded' : ''}`}>
      <div ref={container} className="tour-viewer__stage" role="application" aria-label={`${tour.title}: 360° view of ${tour.scenes.find((s) => s.id === current)?.title ?? 'the room'}. Drag to look around.`}>
        {status === 'error' && <p className="tour-viewer__error">The tour couldn't load. Check your connection and try again.</p>}
      </div>
      <nav className="tour-rooms" aria-label="Rooms in this tour">
        <ul>
          {tour.scenes.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className="tour-rooms__btn"
                aria-current={s.id === current ? 'true' : undefined}
                onClick={() => goTo(s.id)}
                disabled={status !== 'ready'}
              >
                <img src={s.thumbnail} alt="" width={96} height={48} loading="lazy" decoding="async" />
                <span>{s.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
