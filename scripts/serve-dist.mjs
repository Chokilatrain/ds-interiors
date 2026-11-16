#!/usr/bin/env node
/**
 * Serve dist/ the way a static host does: /portfolio -> /portfolio/index.html, unknown paths
 * -> 404.html with a 404 status. Usage: npm run preview (PORT defaults to 4173).
 */
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'dist')
const port = Number(process.env.PORT ?? 4173)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
}

function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidates = [join(root, clean), join(root, clean, 'index.html')]
  return candidates.find((p) => p.startsWith(root) && existsSync(p) && statSync(p).isFile())
}

createServer((req, res) => {
  const file = resolve(req.url ?? '/')
  const target = file ?? join(root, '404.html')
  res.writeHead(file ? 200 : 404, { 'content-type': types[extname(target)] ?? 'application/octet-stream' })
  createReadStream(target).pipe(res)
}).listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`))
