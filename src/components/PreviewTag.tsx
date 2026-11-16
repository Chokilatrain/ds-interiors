import { isFakeContent } from '@/content/source'

/**
 * A small corner tag while the site is in preview (VITE_PREVIEW=1), so nobody mistakes the
 * shared link for the launched site. Says whether content is the bundled seed or the CMS.
 */
export function PreviewTag() {
  if (import.meta.env.VITE_PREVIEW !== '1') return null
  return (
    <div className="preview-tag" role="note">
      Preview{isFakeContent ? ' · sample content' : ''}
    </div>
  )
}
