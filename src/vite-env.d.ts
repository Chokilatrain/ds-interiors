/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_SOURCE?: 'fake' | 'cms'
  readonly VITE_PREVIEW?: string
  readonly VITE_NOINDEX?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_FORMS_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
