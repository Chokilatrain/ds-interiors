import type { Image } from '../types.ts'

/**
 * Pixel sizes of the seed images in public/images/projects, so every <img> carries width and
 * height and the page does not jump while images load. These are the Wix copies; swap them for
 * Danii's originals (and update the sizes) when the hard drive comes through. Once the CMS is
 * live it supplies sizes itself and this file only backs fake mode.
 */
const SIZES: Record<string, [number, number][]> = {
  'mid-century-modernism': [
    [1800, 1056], [1800, 1056], [1800, 1056], [1800, 1056], [1800, 1056],
    [1800, 1056], [1800, 1012], [1295, 914], [1140, 608],
  ],
  'mystic-alchemy': [
    [1536, 1024], [1536, 1024], [1536, 1024], [1536, 1024], [1469, 883],
    [1469, 883], [1469, 883], [1469, 883], [876, 907], [1140, 640],
    [1800, 1272], [1002, 707], [1001, 702], [1003, 702], [1002, 706],
  ],
  'edens-oasis': [
    [1536, 1024], [1536, 1024], [1536, 1024], [1469, 883], [1469, 883],
    [1469, 883], [1226, 861], [1295, 907],
  ],
  'sophisticated-neutrals': [
    [1536, 1024], [1536, 1024], [1536, 1024], [1536, 1024], [1140, 640],
    [1296, 912], [829, 571], [612, 475], [550, 559], [561, 496],
    [850, 562], [797, 474],
  ],
  'lust-minerals': [
    [1536, 1024], [1024, 1536], [1536, 1024], [1536, 1024], [1024, 1536],
    [1536, 1024], [1253, 668], [1392, 742], [1536, 1024], [1296, 908],
    [1140, 608], [1140, 608], [1140, 608], [1140, 608], [1049, 651],
    [518, 433], [1073, 656], [1059, 596], [970, 710],
  ],
  'serene-retreat': [
    [1800, 1056], [1800, 1056], [1800, 1056], [660, 498], [1320, 997],
    [1350, 1800], [1350, 1800], [1140, 608], [426, 380],
  ],
}

/** One seed image by folder and 1-based number. */
export function img(folder: string, n: number, alt: string): Image {
  const size = SIZES[folder]?.[n - 1]
  if (!size) throw new Error(`No seed image ${folder}/${n}`)
  return {
    src: `/images/projects/${folder}/${String(n).padStart(2, '0')}.jpg`,
    alt,
    width: size[0],
    height: size[1],
  }
}

/**
 * Every image in a folder as a gallery, skipping the numbers listed. Alt text is generic for
 * now; the CMS will require a proper description per image.
 */
export function gallery(folder: string, title: string, skip: number[] = []): Image[] {
  const count = SIZES[folder]?.length ?? 0
  return Array.from({ length: count }, (_, i) => i + 1)
    .filter((n) => !skip.includes(n))
    .map((n) => img(folder, n, `${title}, image ${n}`))
}
