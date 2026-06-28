// ============================================
// PAX LONGEVITY — Headless WooCommerce Client
// Handles cart state, WC Store API integration,
// and slide-out cart drawer UI.
// ============================================

class WooCommerceClient {
  constructor(config = {}) {
    // Configurable WordPress / WooCommerce backend URL
    this.baseUrl = config.baseUrl || ''; // Leave empty for local mock fallback
    this.cart = this.loadLocalCart();
    this.products = [
      { id: 'consultation', name: 'Book a Consultation', price: 150, image: 'images/preventive-medicine.png' },
      { id: 'membership', name: 'Start Your Journey (Annual Membership)', price: 2400, image: 'images/longevity-plans.png' }
    ];

    this.init();
  }

  init() {
    this.buildCartDrawerMarkup();
    this.updateCartUI();
    this.bindEvents();
  }

  // Load cart from localStorage (acts as fallback and local cache)
  loadLocalCart() {
    try {
      const saved = localStorage.getItem('pax-cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveLocalCart() {
    localStorage.setItem('pax-cart', JSON.stringify(this.cart));
  }

  // Build the Cart Drawer elements dynamically
  buildCartDrawerMarkup() {
    // Create cart toggle in header next to switcher if not already present
    const headerRight = document.querySelector('.header-right');
    if (headerRight && !document.getElementById('cart-toggle')) {
      const cartToggle = document.createElement('button');
      cartToggle.id = 'cart-toggle';
      cartToggle.className = 'cart-toggle-btn';
      cartToggle.setAttribute('aria-label', 'Open Cart');
      cartToggle.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="cart-badge">0</span>
      `;
      // Insert before the mobile nav toggle
      const navToggle = document.getElementById('nav-toggle');
      headerRight.insertBefore(cartToggle, navToggle);
    }

    // Create Cart Drawer overlay
    if (!document.getElementById('cart-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'cart-drawer';
      drawer.className = 'cart-drawer';
      drawer.innerHTML = `
        <div class="cart-drawer-overlay"></div>
        <div class="cart-drawer-content">
          <div class="cart-drawer-header">
            <h3 class="cart-drawer-title">Shopping Cart</h3>
            <button class="cart-drawer-close" aria-label="Close Cart">&times;</button>
          </div>
          <div class="cart-drawer-items">
            <!-- Dynamically populated -->
          </div>
          <div class="cart-drawer-footer">
            <div class="cart-summary">
              <span class="cart-summary-label">Subtotal</span>
              <span class="cart-summary-value">$0.00</span>
            </div>
            <button class="btn btn-primary btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }
  }

  // Add an item to the cart
  async addToCart(productId, quantity = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    // Headless WooCommerce Store API endpoint integration
    if (this.baseUrl) {
      try {
        const response = await fetch(`${this.baseUrl}/wp-json/wc/store/v1/cart/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // WooCommerce Store API uses standard nonce/session cookies
          },
          body: JSON.stringify({
            id: productId,
            quantity: quantity
          })
        });
        if (response.ok) {
          const remoteCart = await response.json();
          // Sync with remote cart data if successful
          this.syncRemoteCart(remoteCart);
          return;
        }
      } catch (error) {
        console.warn('WooCommerce API error, falling back to local cart state:', error);
      }
    }

    // Fallback/Local Cart implementation
    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.saveLocalCart();
    this.updateCartUI();
    this.openCart();
  }

  // Remove item from cart
  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveLocalCart();
    this.updateCartUI();
  }

  // Update quantities
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveLocalCart();
      this.updateCartUI();
    }
  }

  // Update HTML elements for cart count, badge, item list, and total
  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update badges
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = totalItems;
      badge.classList.toggle('visible', totalItems > 0);
    });

    // Populate drawer items
    const itemsContainer = document.querySelector('.cart-drawer-items');
    if (itemsContainer) {
      if (this.cart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-light); margin-bottom: var(--space-md);"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <p>Your cart is empty</p>
          </div>
        `;
      } else {
        itemsContainer.innerHTML = this.cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              <div class="cart-item-actions">
                <div class="quantity-selector">
                  <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
                  <span class="qty-value">${item.quantity}</span>
                  <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Update totals
    const subtotalLabel = document.querySelector('.cart-summary-value');
    if (subtotalLabel) {
      subtotalLabel.textContent = `$${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  // WooCommerce remote checkout redirect or Store API checkout handling
  checkout() {
    if (this.cart.length === 0) return;

    if (this.baseUrl) {
      // Redirect directly to the WooCommerce checkout page on WordPress
      // Pass cart items to the WooCommerce cart session via query parameters or let the session cookie handle it
      window.location.href = `${this.baseUrl}/checkout/`;
    } else {
      // Direct checkout fallback for demonstration
      alert(`Proceeding to demo checkout for ${this.cart.length} item(s). Total: $${this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}`);
    }
  }

  openCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
  }

  closeCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  bindEvents() {
    // Open Cart
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('#cart-toggle');
      if (toggle) {
        this.openCart();
      }
    });

    // Close Cart
    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-drawer-close') || e.target.classList.contains('cart-drawer-overlay')) {
        this.closeCart();
      }
    });

    // Handle Quantity adjustments and removal inside Cart Drawer
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('qty-btn')) {
        const id = target.dataset.id;
        const currentItem = this.cart.find(item => item.id === id);
        if (currentItem) {
          if (target.classList.contains('btn-plus')) {
            this.updateQuantity(id, currentItem.quantity + 1);
          } else if (target.classList.contains('btn-minus')) {
            if (currentItem.quantity > 1) {
              this.updateQuantity(id, currentItem.quantity - 1);
            } else {
              this.removeItem(id);
            }
          }
        }
      }

      if (target.classList.contains('cart-item-remove')) {
        this.removeItem(target.dataset.id);
      }

      if (target.classList.contains('btn-checkout')) {
        this.checkout();
      }
    });

    // Intercept "Start Your Journey" and "Book a Consultation" clicks
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      // Map CTA buttons to checkout actions
      if (target.id === 'nav-cta' || target.id === 'hero-cta-secondary' || target.id === 'explore-programs') {
        e.preventDefault();
        this.addToCart('consultation');
      }

      if (target.id === 'hero-cta-primary' || target.id === 'our-story-cta') {
        e.preventDefault();
        this.addToCart('membership');
      }
    });
  }
}

// Initialize WooCommerce headless client
document.addEventListener('DOMContentLoaded', () => {
  window.paxWC = new WooCommerceClient({
    // Replace with your WordPress WooCommerce domain if hosting WooCommerce separately, e.g. 'https://pax-wp.com'
    baseUrl: '' 
  });
});
