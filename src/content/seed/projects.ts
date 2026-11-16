import type { Project } from '../types.ts'
import { gallery, img } from './images.ts'

/**
 * The six projects from the Wix site, copy tidied (typos fixed, nothing added). Order here is
 * display order. In cms mode the CMS replaces this list entirely.
 */
export const projects: Project[] = [
  {
    slug: 'mid-century-modernism',
    title: 'Mid Century Modernism',
    category: 'Residential',
    type: 'Residential kitchen',
    year: 2025,
    location: 'Whitsundays, Queensland',
    credit: 'Danielle Seres',
    summary: 'A contemporary take on Australian mid-century modernism for an open plan kitchen.',
    intro:
      'To create a contemporary direction for Australian mid-century modernism, I blended the core principles of mid-century design (clean lines, natural materials, and connection between indoors and out) with modern-day functionality and aesthetics.',
    highlights: [
      {
        title: 'Open plan living',
        body: 'A corner kitchen with an island and breakfast bar that opens to the dining area on one side, and to the outdoors through large bi-fold doors.',
      },
      {
        title: 'Native timber',
        body: 'Australian oak brings a warm tone to the cabinetry and panelling, with fluted timber veneer for texture.',
      },
      {
        title: 'Earthy palette',
        body: 'Warm whites, soft greys, and beige with earthy tones and occasional bold accents, keeping to the theme of Australian flora.',
      },
      {
        title: 'Space without walls',
        body: 'Low cabinetry and furniture define each zone rather than walls, and the layout keeps a functional work triangle between sink, stove, and fridge.',
      },
      {
        title: 'Raw textures',
        body: 'Natural stone and concrete benchtops over polished concrete floors, matte brass hardware with soft curves, and retro pendants in natural materials over the island.',
      },
      {
        title: 'Light and landscape',
        body: 'Floor to ceiling bi-fold doors make the most of natural light, and potted plants bring the Australian landscape inside.',
      },
    ],
    cover: img('mid-century-modernism', 1, 'Marble island bench with yellow stools, sunflowers, and timber cabinetry'),
    gallery: gallery('mid-century-modernism', 'Mid Century Modernism', [1]),
    tour: {
      status: 'coming-soon',
      heading: 'Step inside the space',
      body: 'Look around the kitchen in 360°, then move through to the dining area and deck.',
      preview: img('mid-century-modernism', 3, 'Preview of the 360 degree tour of the kitchen'),
    },
  },
  {
    slug: 'lust-minerals',
    title: 'LUST Minerals',
    category: 'Commercial',
    type: 'Retail, hospitality, and office',
    year: 2025,
    location: 'The Rocks, Sydney, Australia',
    credit: 'Danielle Seres',
    summary: 'A flagship store concept inspired by scent, memory, and clean beauty.',
    disclaimer:
      'This concept design for LUST Minerals is a creative exploration, imagined to convey the vision, mood, and narrative of the space. The materials, imagery, and branding are illustrative and used purely to tell the story of the design. I have no affiliation with LUST Minerals or its parent company.',
    intro:
      'The LUST Minerals flagship store concept is inspired by olfactory imagery: the idea that scent can evoke emotion and memory. This subtle sensory approach aligns with the brand’s focus on purity, wellness, and clean ingredients, creating an immediate sense of calm and clarity.',
    body: [
      'The design comes to life through fresh, earthy materials, living plants, natural light, soft textiles, and gentle colours, resulting in a space that is clean, immersive, and truly reflective of the LUST Minerals aesthetic.',
    ],
    cover: img('lust-minerals', 1, 'Retail counter with timber shelving and a living plant wall'),
    gallery: gallery('lust-minerals', 'LUST Minerals', [1]),
  },
  {
    slug: 'serene-retreat',
    title: 'Serene Retreat',
    category: 'Residential',
    type: 'Residential bathroom renovation',
    year: 2025,
    location: 'Mackay, Queensland, Australia',
    credit: 'Danielle Seres',
    summary: 'An old bathroom with a step-up spa reworked into a calm, modern space.',
    intro:
      'This bathroom renovation was designed for a family who wanted to update their old bathroom to a newer, modern one.',
    lists: [
      {
        heading: 'Removed',
        items: [
          'Old spa with overhead shower',
          'Step up to the bath',
          'Old vanity',
          'Slate stone tile flooring',
          'Large standard mirror',
        ],
      },
      {
        heading: 'Added',
        items: [
          'Open shower with frameless glass screen',
          'Freestanding bath',
          'VJ board with green and cream tiles',
          'Recessed niches in the shower and below the window',
          'New timber vanity',
          'Frameless round backlit mirror',
        ],
      },
    ],
    cover: img('serene-retreat', 1, 'Freestanding bath with soft stone tiles and a timber tray'),
    gallery: gallery('serene-retreat', 'Serene Retreat', [1]),
  },
  {
    slug: 'sophisticated-neutrals',
    title: 'Sophisticated Neutrals',
    category: 'Residential',
    type: 'Residential kitchen and dining',
    year: 2024,
    location: 'Melbourne, Australia',
    credit: 'Danielle Seres',
    summary: 'Navy, gold, and bronze with orange accents for an elegant kitchen and dining space.',
    intro:
      '“Sophisticated Neutrals” is the main theme for this design, alongside “Modest with Narrative”.',
    body: [
      'The palette is navy blue, light brown, gold, and bronze with orange and tan. These colours sit well in the corporate world of banks and high-profile offices, and in elegant locations such as Greece, helping to create a high-end, elegant space. Light walls and floors make the room feel larger, set against navy cabinets with gold and bronze handles.',
      'Accent pieces in orange, through furniture, lighting, and marble benchtops and splashbacks, tell the story of the occupants’ lives and passions. They bring character to the space and lift it to a level of sophistication and glamour.',
    ],
    cover: img('sophisticated-neutrals', 1, 'Navy kitchen cabinetry with a marble island and orange accents'),
    gallery: gallery('sophisticated-neutrals', 'Sophisticated Neutrals', [1]),
  },
  {
    slug: 'mystic-alchemy',
    title: 'Mystic Alchemy',
    category: 'Commercial',
    type: 'Commercial cafe renovation',
    year: 2024,
    location: 'Sydney Street, Mackay, Queensland',
    credit: 'Danielle Seres',
    summary: 'A rustic, boho refresh for a boutique cafe in a heritage building.',
    intro:
      'Mystic Alchemy is a boutique cafe on the main street of Mackay. The owner asked for changes to make the space more rustic and boho, so I created a design that uses the heritage structure of the building to bring out that rustic look.',
    body: [
      'The project includes realistic renders, 3D modelling, floor plans, demolition plans, sketches, and material boards.',
    ],
    cover: img('mystic-alchemy', 1, 'Cafe interior with a timber counter, pendant lights, and green chairs'),
    gallery: gallery('mystic-alchemy', 'Mystic Alchemy', [1]),
  },
  {
    slug: 'edens-oasis',
    title: 'Edens Oasis',
    category: 'Hospitality',
    type: 'Expo hospitality venue',
    year: 2024,
    location: 'Connections Bar, NoVacancy Expo, Sydney',
    credit: 'DS Interiors and Studio One Interiors',
    summary: 'A calming, nature-filled retreat in the middle of a busy Sydney expo.',
    intro:
      'Edens Oasis is a hospitality concept designed for the NoVacancy Hotel & Accommodation Expo in Sydney, created for Terrapin Australia. Developed by DS Interiors with three fellow designers under the collective Studio One Interiors, the project aimed to craft an immersive retreat within the heart of the exhibition.',
    body: [
      'Conceived as a calming escape, the design invites guests into an oasis that contrasts the energy of the expo. A modular central bar, layered greenery, varied seating heights, a curated music corner, and a dedicated photo moment work together to shape a dynamic yet tranquil spatial experience.',
      'Every element (furniture, materials, lighting, and planting) was selected with sustainability and adaptability in mind. Components were specified to be repurposed or reused beyond the event, supported by local suppliers specialising in modular, event-ready solutions for efficient installation and removal.',
    ],
    cover: img('edens-oasis', 1, 'Green marble bar under a canopy of hanging plants'),
    gallery: gallery('edens-oasis', 'Edens Oasis', [1]),
  },
]
