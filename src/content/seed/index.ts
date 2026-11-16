import type { SiteContent } from '../types.ts'
import { img } from './images.ts'
import { projects } from './projects.ts'

/**
 * Fake-mode content: everything the site shows before the CMS exists. Copy comes from the
 * Wix site. Pure data, no import.meta, so vite.config.ts can import it at build time to
 * list the project pages to pre-render.
 */
export const seedContent: SiteContent = {
  site: {
    name: 'DS Interiors',
    tagline: 'Interior Design',
    location: 'Gold Coast, Queensland',
    email: 'dmunro525@hotmail.com',
    phone: '0404 123 742',
    // Empty until Danii sends her real links; the footer hides the row when there are none.
    social: [],
    logo: {
      src: '/images/site/logo.jpg',
      alt: 'DS Interiors monogram',
      width: 400,
      height: 389,
    },
  },
  home: {
    hero: {
      eyebrow: 'Emerging interior designer · Gold Coast',
      heading: 'Interiors shaped by nature',
      headingEmphasis: 'and narrative.',
      intro:
        'Timeless, functional, and beautiful spaces with thoughtful materiality and a story behind every choice, from family kitchens to cafes and retail.',
      image: img(
        'mid-century-modernism',
        2,
        'Mid century kitchen opening to the dining area and garden through bi-fold doors',
      ),
    },
    values: ['Timeless', 'Unique', 'Evoke'],
    about: {
      heading: 'Spaces that feel meaningful, immersive, and connected to their purpose.',
      paragraphs: [
        'I’m an aspiring interior designer dedicated to crafting spaces that feel meaningful, immersive, and connected to their purpose. Creating timeless, functional, and beautiful environments inspired by nature and narrative, I balance creativity with practicality to shape unique stories through design and visualisation.',
        'My work aims to reflect identity, evoke emotion, and leave an enduring impact. With a passion for thoughtful materiality, spatial storytelling, and user-focused design, I strive to create interiors that are both memorable and deeply considered.',
      ],
      image: img(
        'mid-century-modernism',
        4,
        'Kitchen bench corner with tulips and a timber tray against hexagon tiles',
      ),
    },
    services: {
      heading: 'How I work',
      intro: 'Balancing creativity with practicality to shape unique stories through design and visualisation.',
      items: [
        {
          title: 'Concept Creation',
          body: 'Transforming inspiration and lifestyle into a gentle, considered narrative for your space.',
          icon: 'concept',
        },
        {
          title: 'Spatial Planning',
          body: 'Through thoughtful layouts and gentle flow, spatial design shapes the foundation of your story.',
          icon: 'plan',
        },
      ],
    },
    contact: {
      heading: 'Let’s talk about your space.',
      body: 'Based on the Gold Coast, Queensland. Send a message and I’ll be in touch.',
    },
  },
  projects,
}
