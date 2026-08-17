import { useEffect, useState } from 'react'

function formatOrderLabel(value) {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function CheckoutSuccess() {
  const [hasSession, setHasSession] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setHasSession(Boolean(params.get('session_id')))
    try {
      localStorage.setItem(
        'pax_checkout_status_v1',
        JSON.stringify({ paid: true, at: new Date().toISOString() }),
      )
    } catch {
      /* ignore private-mode storage failures */
    }

    let email = ''
    try {
      email = localStorage.getItem('pax_checkout_email_v1') || ''
    } catch {
      email = ''
    }
    if (!email.trim()) return

    setOrdersLoading(true)
    fetch(`/api/orders?email=${encodeURIComponent(email.trim())}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setOrdersError(data.error || 'We could not load your orders right now.')
          return
        }
        setOrders(Array.isArray(data.orders) ? data.orders : [])
      })
      .catch(() => setOrdersError('We could not load your orders right now.'))
      .finally(() => setOrdersLoading(false))
  }, [])

  return (
    <div className="sf">
      <section className="sf-panel sf-panel--narrow">
        <p className="pp-eyebrow">Checkout complete</p>
        <h1>Your intake is in clinical review.</h1>
        <p className="sf-lede">
          Payment was received. A licensed clinician will review your information before any prescription is issued.
          Watch the email you used at checkout for next steps.
        </p>
        {hasSession && <p className="sf-hold">A payment confirmation has been recorded for this visit.</p>}
        {(ordersLoading || orders.length > 0 || ordersError) && (
          <div className="sf-order-status">
            <h2>Order status</h2>
            {ordersLoading && <p className="sf-consent__note">Loading your orders…</p>}
            {!ordersLoading && ordersError && <p className="sf-consent__note">{ordersError}</p>}
            {!ordersLoading && !ordersError && orders.length === 0 && (
              <p className="sf-consent__note">Your order will appear here once processing begins.</p>
            )}
            {!ordersLoading &&
              orders.map((order) => (
                <div key={order.id || order.productName} className="sf-order-status__item">
                  <strong>{order.productName}</strong>
                  <p>
                    Order {formatOrderLabel(order.status)} · Clinical {formatOrderLabel(order.clinicalStatus)}
                  </p>
                  {order.trackingNumber ? (
                    <p className="sf-consent__note">
                      {order.carrier ? `${order.carrier}: ` : 'Tracking: '}
                      {order.trackingNumber}
                    </p>
                  ) : null}
                </div>
              ))}
          </div>
        )}
        <div className="sf-nav-row">
          <a href="#/portal" className="pp-btn pp-btn--primary">
            Open Patient Center
          </a>
          <a href="#/" className="pp-btn pp-btn--outline">
            Return home
          </a>
        </div>
      </section>
    </div>
  )
}
