import type { Image } from '@/content/types'

interface ImgProps {
  image: Image
  className?: string
  /** Above-the-fold images load straight away; everything else is lazy. */
  priority?: boolean
  sizes?: string
}

/** An <img> from a content Image, always with width and height so layout never shifts. */
export function Img({ image, className, priority, sizes }: ImgProps) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      // React 18 only passes the lowercase attribute through.
      {...(priority ? { fetchpriority: 'high' } : {})}
    />
  )
}
