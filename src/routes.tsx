import type { RouteRecord } from 'vite-react-ssg'
import Layout from '@/components/Layout'
import NotFound from '@/pages/NotFound'
import { NOT_FOUND_PATH } from './routes.meta'

/**
 * Maps the route table to react-router records. Each page is lazy so it ships as its own
 * chunk; vite-react-ssg resolves them at build time for pre-rendering.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, lazy: async () => ({ Component: (await import('@/pages/Home')).default }) },
      {
        path: 'portfolio',
        lazy: async () => ({ Component: (await import('@/pages/Portfolio')).default }),
      },
      {
        path: 'projects/:slug',
        lazy: async () => ({ Component: (await import('@/pages/ProjectPage')).default }),
      },
      { path: NOT_FOUND_PATH.slice(1), element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
