import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleVcoApiRequest } from './lib/vcoCheckout.js'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString()
        resolve(raw ? JSON.parse(raw) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function vcoApiPlugin() {
  return {
    name: 'vco-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        const path = url.split('?')[0]
        const allowed =
          (path === '/api/checkout/session' && req.method === 'POST') ||
          (path === '/api/checkout/coupon' && req.method === 'POST') ||
          (path === '/api/orders' && req.method === 'GET')
        if (!allowed) return next()

        try {
          const body = req.method === 'POST' ? await readJsonBody(req) : {}
          const host = req.headers['x-forwarded-host'] || req.headers.host
          const proto = req.headers['x-forwarded-proto'] || 'http'
          const result = await handleVcoApiRequest({
            url,
            method: req.method,
            body,
            origin: `${proto}://${host}`,
            env: { ...process.env, ...env },
          })
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.json))
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid request.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vcoApiPlugin()],
  server: {
    port: 3002,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    // Scraped Yucca CSS embeds CSS functions in class selectors; lightningcss minify rejects them.
    cssMinify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
