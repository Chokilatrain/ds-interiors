/** Line icons for the services panel, drawn from the Wix site's originals. Decorative only. */
export function ServiceIcon({ name }: { name: 'concept' | 'plan' }) {
  if (name === 'concept') {
    return (
      <svg aria-hidden="true" width="48" height="48" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="4" y="4" width="28" height="28" />
        <circle cx="22" cy="20" r="9" />
        <path d="M24 26l12 6-3 7-12-6z" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" width="48" height="48" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4h36v36H24M4 4v36h12" />
      <path d="M22 4v16M14 20h16" />
    </svg>
  )
}

export function TourIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <path d="M12 2v20" />
      <path d="M18 9l3 3-3 3" />
    </svg>
  )
}
