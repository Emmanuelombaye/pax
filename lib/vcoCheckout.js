const PROGRAM_SLUGS = ['semaglutide', 'tirzepatide']

function readString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim())
}

function isValidPhone(val) {
  return String(val || '').replace(/\D/g, '').length >= 10
}

function isValidAdultDob(val) {
  if (!val) return false
  const birthDate = new Date(val)
  if (Number.isNaN(birthDate.getTime())) return false
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1
  return age >= 18 && age <= 120
}

function publicCheckoutError(status, vcoError) {
  const raw = String(vcoError || '')
  if (status === 401) return 'Secure checkout is unavailable right now. Please try again shortly.'
  if (status === 400) return 'Some intake details could not be verified. Please review your information and try again.'
  if (status === 404) return 'This care program is not available for checkout right now.'
  if (/stripe connect/i.test(raw)) return 'Payment setup is still being completed. Please try again shortly.'
  if (/doctorFee/i.test(raw)) {
    return 'Checkout is temporarily unavailable while clinical billing is being finalized. Please try again shortly.'
  }
  if (status >= 500) return 'We could not start checkout. Please try again in a few minutes.'
  return 'We could not start checkout. Please try again.'
}

export function sanitizeCouponCode(value) {
  return String(value || '')
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, '')
    .slice(0, 40)
}

export function priceToCents(price) {
  const n = typeof price === 'number' ? price : Number(String(price ?? '').replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(n) || n <= 0) return 0
  return n >= 1000 ? Math.round(n) : Math.round(n * 100)
}

function publicCouponError(status) {
  if (status === 401) return 'Promo codes are unavailable right now. Please try again shortly.'
  if (status === 404 || status === 400) return 'This code is not valid for this order.'
  if (status >= 500) return 'We could not check this code right now. Please try again shortly.'
  return 'This code is not valid for this order.'
}

function publicOrdersError(status) {
  if (status === 401) return 'Order lookup is unavailable right now. Please try again shortly.'
  if (status >= 500) return 'We could not load your orders right now. Please try again shortly.'
  return 'We could not load your orders. Please try again.'
}

function getVcoConfig(env = process.env) {
  const baseUrl = (env.VCO_API_URL || env.NEXT_PUBLIC_VCO_API_URL || 'https://portal.virtualclinicos.com').replace(
    /\/$/,
    '',
  )
  const brandId = env.VCO_BRAND_ID || env.NEXT_PUBLIC_VCO_BRAND_ID || 'pax'
  const apiKey = env.VCO_API_KEY || ''
  return { baseUrl, brandId, apiKey }
}

function vcoHeaders(apiKey) {
  const headers = { 'Content-Type': 'application/json' }
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`
  return headers
}

async function fetchVcoProducts(env) {
  const { baseUrl, brandId, apiKey } = getVcoConfig(env)
  const res = await fetch(`${baseUrl}/api/commerce/v1/products?brandId=${encodeURIComponent(brandId)}`, {
    headers: vcoHeaders(apiKey),
  })
  if (!res.ok) throw new Error(`catalog_${res.status}`)
  const data = await res.json()
  return Array.isArray(data.products) ? data.products : []
}

function resolveProgramProduct(products, programSlug) {
  const needle = String(programSlug || '').toLowerCase()
  return (
    products.find((product) => {
      const name = String(product.name || '').toLowerCase()
      const slug = String(product.slug || '').toLowerCase()
      const sku = String(product.sku || '').toLowerCase()
      return name.includes(needle) || slug.includes(needle) || sku.includes(needle)
    }) || null
  )
}

function mapPublicOrder(raw) {
  return {
    id: String(raw.id || ''),
    status: String(raw.status || 'pending'),
    clinicalStatus: String(raw.clinical_status || raw.clinicalStatus || 'pending'),
    productName: String(raw.product_name || raw.productName || 'Care program'),
    trackingNumber: String(raw.tracking_number || raw.trackingNumber || ''),
    carrier: String(raw.carrier || ''),
    createdAt: String(raw.created_at || raw.createdAt || ''),
  }
}

export async function validateCoupon({ code, programSlug, env = process.env }) {
  const { baseUrl, brandId, apiKey } = getVcoConfig(env)
  if (!apiKey) {
    return { status: 503, json: { error: 'Promo codes are unavailable right now. Please try again shortly.' } }
  }

  const sanitized = sanitizeCouponCode(code)
  if (!sanitized) {
    return { status: 400, json: { error: 'Enter a promo code.' } }
  }
  if (!PROGRAM_SLUGS.includes(programSlug)) {
    return { status: 400, json: { error: 'Select a valid care program to continue.' } }
  }

  let cartTotalCents = 0
  try {
    const products = await fetchVcoProducts(env)
    const product = resolveProgramProduct(products, programSlug)
    if (!product?.id) {
      return { status: 404, json: { error: 'This care program is not available for checkout right now.' } }
    }
    cartTotalCents = priceToCents(product.price)
  } catch {
    return { status: 502, json: { error: publicCouponError(502) } }
  }

  try {
    const res = await fetch(`${baseUrl}/api/commerce/v1/coupons/validate`, {
      method: 'POST',
      headers: vcoHeaders(apiKey),
      body: JSON.stringify({ brandId, code: sanitized, cartTotalCents }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('[coupon] vco failed', res.status)
      return { status: res.status >= 400 ? res.status : 502, json: { error: publicCouponError(res.status) } }
    }
    if (data.valid !== true) {
      return {
        status: 200,
        json: { valid: false, code: sanitized, error: 'This code is not valid for this order.' },
      }
    }
    return {
      status: 200,
      json: {
        valid: true,
        code: String(data.code || sanitized),
        discountType: typeof data.discountType === 'string' ? data.discountType : undefined,
        discountValue: typeof data.discountValue === 'number' ? data.discountValue : undefined,
        discountAmountCents: typeof data.discountAmountCents === 'number' ? data.discountAmountCents : undefined,
        finalAmountCents: typeof data.finalAmountCents === 'number' ? data.finalAmountCents : undefined,
      },
    }
  } catch {
    console.error('[coupon] vco unreachable')
    return { status: 502, json: { error: publicCouponError(502) } }
  }
}

export async function getPatientOrders({ email, env = process.env }) {
  const { baseUrl, apiKey } = getVcoConfig(env)
  if (!apiKey) {
    return { status: 503, json: { error: 'Order lookup is unavailable right now. Please try again shortly.' } }
  }
  if (!isValidEmail(email)) {
    return { status: 400, json: { error: 'Enter a valid email address.' } }
  }

  try {
    const res = await fetch(`${baseUrl}/api/v1/orders/patient?email=${encodeURIComponent(String(email).trim())}`, {
      headers: vcoHeaders(apiKey),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('[orders] vco failed', res.status)
      return { status: res.status >= 400 ? res.status : 502, json: { error: publicOrdersError(res.status) } }
    }
    const orders = Array.isArray(data.orders)
      ? data.orders.filter((item) => item && typeof item === 'object').map(mapPublicOrder)
      : []
    return { status: 200, json: { orders } }
  } catch {
    console.error('[orders] vco unreachable')
    return { status: 502, json: { error: publicOrdersError(502) } }
  }
}

export async function createCheckoutSession({ body, origin, env = process.env }) {
  const { baseUrl, brandId, apiKey } = getVcoConfig(env)
  if (!apiKey) {
    return { status: 503, json: { error: 'Checkout is not configured yet. Please try again later.' } }
  }

  const programSlug = body?.programSlug
  if (!PROGRAM_SLUGS.includes(programSlug)) {
    return { status: 400, json: { error: 'Select a valid care program to continue.' } }
  }

  const patientInfo = body?.patientInfo || {}
  const firstName = readString(patientInfo.firstName)
  const lastName = readString(patientInfo.lastName)
  const email = readString(patientInfo.email)
  const phone = readString(patientInfo.phone).replace(/\D/g, '')
  const dob = readString(patientInfo.dob)
  const state = readString(patientInfo.state).toUpperCase()
  const intakeAnswers =
    body?.intakeAnswers && typeof body.intakeAnswers === 'object' && !Array.isArray(body.intakeAnswers)
      ? body.intakeAnswers
      : null
  const couponCode = sanitizeCouponCode(body?.couponCode)

  if (!firstName || !lastName || !email || !phone || !dob || !state || !intakeAnswers) {
    return { status: 400, json: { error: 'Please complete all required intake fields before checkout.' } }
  }
  if (!isValidEmail(email) || !isValidPhone(phone) || !isValidAdultDob(dob) || !/^[A-Z]{2}$/.test(state)) {
    return {
      status: 400,
      json: { error: 'Some intake details could not be verified. Please review your information and try again.' },
    }
  }

  let productId = ''
  try {
    const products = await fetchVcoProducts(env)
    productId = resolveProgramProduct(products, programSlug)?.id || ''
  } catch {
    return { status: 502, json: { error: publicCheckoutError(502) } }
  }

  if (!productId) {
    return { status: 404, json: { error: 'This care program is not available for checkout right now.' } }
  }

  try {
    const res = await fetch(`${baseUrl}/api/commerce/v1/checkout/session`, {
      method: 'POST',
      headers: vcoHeaders(apiKey),
      body: JSON.stringify({
        brandId,
        productId,
        patientInfo: { firstName, lastName, email, phone, dob, state },
        intakeAnswers: { ...intakeAnswers, programSlug },
        ...(couponCode ? { couponCode } : {}),
        successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/start?canceled=1`,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.checkoutUrl) {
      console.error('[checkout] vco failed', res.status)
      return { status: res.status >= 400 ? res.status : 502, json: { error: publicCheckoutError(res.status, data.error) } }
    }
    return { status: 200, json: { checkoutUrl: data.checkoutUrl, orderId: data.orderId } }
  } catch {
    console.error('[checkout] vco unreachable')
    return { status: 502, json: { error: 'We could not start checkout. Please try again in a few minutes.' } }
  }
}

export async function handleVcoApiRequest({ url, method, body, origin, env = process.env }) {
  const path = String(url || '').split('?')[0]
  if (path === '/api/checkout/session' && method === 'POST') {
    return createCheckoutSession({ body, origin, env })
  }
  if (path === '/api/checkout/coupon' && method === 'POST') {
    return validateCoupon({ code: body?.code, programSlug: body?.programSlug, env })
  }
  if (path === '/api/orders' && method === 'GET') {
    const email = new URL(String(url), 'http://local').searchParams.get('email')
    return getPatientOrders({ email, env })
  }
  return { status: 404, json: { error: 'Not found' } }
}
