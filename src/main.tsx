import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

/**
 * Entry for both the build-time renderer and the browser. vite-react-ssg pre-renders every
 * path listed in vite.config.ts to static HTML and hydrates it on the client.
 */
export const createRoot = ViteReactSSG({ routes })
