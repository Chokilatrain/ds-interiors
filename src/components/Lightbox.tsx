import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import type { Image } from '@/content/types'

interface LightboxProps {
  images: Image[]
  /** Index of the open image, or null when closed. */
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

/** How far a horizontal swipe has to travel (px) to count as next or previous. */
const SWIPE_MIN = 50

/**
 * Full-screen image viewer on a native modal <dialog>. The browser supplies focus containment,
 * Esc and back-gesture dismissal, and returns focus to the image the visitor opened, so none
 * of that is rebuilt here. Arrow keys and swipes move between images; clicking the dark area
 * around the image closes it.
 */
export function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const open = index !== null
  const count = images.length
  const current = open ? images[index] : undefined

  // Open and close the modal from state.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Esc, back gesture, and light dismiss close the dialog natively; keep state in step.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Warm the neighbours so next and previous feel instant.
  useEffect(() => {
    if (!open || count < 2) return
    for (const i of [(index + 1) % count, (index - 1 + count) % count]) {
      const img = new window.Image()
      img.src = images[i].src
    }
  }, [open, index, count, images])

  const go = (step: number) => {
    if (open) onChange((index + step + count) % count)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) >= SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1)
      return
    }
    // A plain click on the empty stage (not the image or a control) closes the viewer.
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && e.target === e.currentTarget) onClose()
  }

  return (
    <dialog ref={ref} className="lightbox" aria-label="Image viewer" onKeyDown={onKeyDown}>
      {current && index !== null && (
        <>
          <div className="lightbox__bar">
            <span className="lightbox__count" aria-hidden="true">
              {index + 1} / {count}
            </span>
            <button type="button" className="lightbox__btn" onClick={onClose} autoFocus aria-label="Close image viewer">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="lightbox__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <img
              key={current.src}
              className="lightbox__img"
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              draggable={false}
            />
          </div>

          {count > 1 && (
            <div className="lightbox__nav">
              <button type="button" className="lightbox__btn" onClick={() => go(-1)} aria-label="Previous image">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <p className="lightbox__caption" aria-live="polite">
                <span className="visually-hidden">
                  Image {index + 1} of {count}:{' '}
                </span>
                {current.alt}
              </p>
              <button type="button" className="lightbox__btn" onClick={() => go(1)} aria-label="Next image">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </dialog>
  )
}
