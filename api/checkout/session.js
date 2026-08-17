import { createCheckoutSession } from '../lib/vcoCheckout.js'

function originFromReq(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'https'
  return `${proto}://${host}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const result = await createCheckoutSession({
    body: req.body || {},
    origin: originFromReq(req),
  })
  res.status(result.status).json(result.json)
}
