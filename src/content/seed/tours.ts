import type { TourData } from '../types.ts'

/**
 * Demo tour for the 360° viewer. The panoramas are free CC0 interiors from Poly Haven
 * (polyhaven.com), resized to 4096x2048 in public/tours/demo. They are separate real rooms, not
 * one house, so the doorway links are made up for the demo. Danii's own tours will be
 * equirectangular renders exported from SketchUp/V-Ray (or shot on a 360 camera), and the CMS
 * will hold this same shape.
 *
 * Angles are degrees: yaw 0 is the centre of the image and positive turns right; pitch 0 is
 * the horizon and negative looks down.
 */
const pano = (id: string) => `/tours/demo/${id}.jpg`
const thumb = (id: string) => `/tours/demo/${id}-preview.jpg`

export const tours: TourData[] = [
  {
    slug: 'demo',
    title: 'Demo tour',
    credit: 'Sample rooms: Poly Haven (CC0)',
    startScene: 'veranda',
    scenes: [
      {
        id: 'veranda',
        title: 'Veranda',
        panorama: pano('veranda'),
        thumbnail: thumb('veranda'),
        startYaw: 0,
        links: [
          { to: 'living', yaw: 72, pitch: -6 },
          { to: 'bedroom', yaw: 160, pitch: -6 },
        ],
        hotspots: [
          {
            id: 'veranda-garden',
            yaw: 0,
            pitch: -2,
            title: 'Garden outlook',
            body: 'The covered veranda frames the garden, linking indoor and outdoor living.',
          },
          {
            id: 'veranda-brick',
            yaw: -55,
            pitch: 8,
            title: 'Face brick and timber',
            body: 'Warm face brick and stained timber joinery set an earthy, natural palette.',
          },
        ],
      },
      {
        id: 'living',
        title: 'Guest room',
        panorama: pano('lythwood_room'),
        thumbnail: thumb('lythwood_room'),
        startYaw: 30,
        links: [
          { to: 'kitchen', yaw: -114, pitch: -6 },
          { to: 'bathroom', yaw: -83, pitch: -6 },
        ],
        hotspots: [
          {
            id: 'living-window',
            yaw: 34,
            pitch: 6,
            title: 'Garden window',
            body: 'Full-height curtains soften the light from the garden.',
          },
        ],
      },
      {
        id: 'kitchen',
        title: 'Kitchen',
        panorama: pano('studio_country_hall'),
        thumbnail: thumb('studio_country_hall'),
        startYaw: 5,
        links: [{ to: 'living', yaw: 124, pitch: -6 }],
        hotspots: [
          {
            id: 'kitchen-bench',
            yaw: 8,
            pitch: -4,
            title: 'Country kitchen',
            body: 'Open shelving and a long timber table keep the space relaxed and practical.',
          },
          {
            id: 'kitchen-ceiling',
            yaw: 0,
            pitch: 45,
            title: 'Timber ceiling',
            body: 'Painted boards and exposed posts add rustic texture overhead.',
          },
        ],
      },
      {
        id: 'bathroom',
        title: 'Bathroom',
        panorama: pano('bathroom'),
        thumbnail: thumb('bathroom'),
        startYaw: 0,
        links: [{ to: 'living', yaw: 86, pitch: -6 }],
        hotspots: [
          {
            id: 'bathroom-spa',
            yaw: 0,
            pitch: -12,
            title: 'Built-in bath',
            body: 'A tiled, built-in bath, the kind of feature a renovation might swap for a freestanding tub.',
          },
        ],
      },
      {
        id: 'bedroom',
        title: 'Bedroom',
        panorama: pano('hotel_room'),
        thumbnail: thumb('hotel_room'),
        startYaw: 60,
        links: [
          { to: 'veranda', yaw: -133, pitch: -6 },
          { to: 'bathroom', yaw: 166, pitch: -6 },
        ],
        hotspots: [
          {
            id: 'bedroom-bed',
            yaw: 112,
            pitch: -8,
            title: 'Layered neutrals',
            body: 'Crisp white linen, dark timber joinery, and warm cove lighting keep the room calm.',
          },
        ],
      },
    ],
  },
]
