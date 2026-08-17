import { validateCoupon } from '../lib/vcoCheckout.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const result = await validateCoupon({
    code: req.body?.code,
    programSlug: req.body?.programSlug,
  })
  res.status(result.status).json(result.json)
}
