import { getPatientOrders } from '../lib/vcoCheckout.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const email = String(req.query?.email || '')
  const result = await getPatientOrders({ email })
  res.status(result.status).json(result.json)
}
