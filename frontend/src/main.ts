interface Product {
  id: number;
  handle: string;
  title: string;
  price: number;
  compareAtPrice: number;
  image: string;
  description: string;
  tag?: string;
  category: string;
  rating: number;
  reviews: number;
  sku: string;
  subscription?: boolean;
  bogo?: boolean;
  shippingInfo?: string;
  inventory?: number;
  variants?: {
    id: number;
    size: string;
    price: number;
    sku: string;
  }[];
  seo?: {
    title: string;
    description: string;
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BOTANICAL_PRODUCTS: Product[] = [
    { 
        id: 1, 
        handle: "luminous-dew-serum", 
        title: "Luminous Dew Serum", 
        price: 75, 
        compareAtPrice: 95, 
        image: "aetheria_luminous_dew_serum_1773550143411.png", 
        description: "Ultra-hydrating serum with botanical hyaluronic acid. This efficacious formula penetrates deep into the dermal layers to reveal a dew-kissed radiance.", 
        tag: "Bestseller", 
        category: "serums", 
        rating: 4.9, 
        reviews: 124, 
        bogo: true, 
        sku: "AET-LD-001",
        inventory: 150,
        variants: [
            { id: 101, size: "30ml", price: 75.00, sku: "AET-LD-030" },
            { id: 102, size: "50ml", price: 95.00, sku: "AET-LD-050" }
        ],
        shippingInfo: "Free Express Global Shipping on this Ritual Hero." 
    },
    { 
        id: 2, 
        handle: "velvet-petal-cleanser", 
        title: "Velvet Petal Cleanser", 
        price: 42, 
        compareAtPrice: 50, 
        image: "aetheria_velvet_cleanser_tube_1773550174593.png", 
        description: "Creamy botanical wash that melts away impurities without stripping the skin of its natural oils. Infused with damask rose and evening primrose.", 
        tag: "New Arrival", 
        category: "cleansers", 
        rating: 4.8, 
        reviews: 98, 
        subscription: true, 
        sku: "AET-VP-003",
        inventory: 12,
        variants: [
            { id: 301, size: "100ml", price: 42.00, sku: "AET-VP-100" },
            { id: 302, size: "200ml", price: 70.00, sku: "AET-VP-200" }
        ],
        shippingInfo: "Processing: 24h. Delivery: 3-5 days." 
    },
    { 
        id: 3, 
        handle: "night-recovery-elixir", 
        title: "Night Recovery Elixir", 
        price: 88, 
        compareAtPrice: 110, 
        image: "aetheria_night_elixir_1773550160238.png", 
        description: "Potent overnight treatment for cellular renewal. Wake up to skin that looks rested, plumped, and luminous.", 
        tag: "Limited Edition", 
        category: "elixirs", 
        rating: 4.7, 
        reviews: 82, 
        sku: "AET-NR-002",
        inventory: 0,
        variants: [
            { id: 201, size: "30ml", price: 88.00, sku: "AET-NR-030" },
            { id: 202, size: "50ml", price: 110.00, sku: "AET-NR-050" }
        ],
        shippingInfo: "Processing: 24h. Delivery: 3-5 days." 
    },
    { 
        id: 4, 
        handle: "solar-guard-mist", 
        title: "Solar Guard Mist", 
        price: 35, 
        compareAtPrice: 45, 
        image: "aetheria_solar_mist_bottle_misty_1773550217880.png", 
        description: "Antioxidant protection with a weightless finish. Defends against blue light and environmental stressors while on the go.", 
        tag: "SPF Essential", 
        category: "serums", 
        rating: 4.6, 
        reviews: 65, 
        sku: "AET-SG-005",
        inventory: 300,
        variants: [
            { id: 501, size: "60ml", price: 35.00, sku: "AET-SG-060" },
            { id: 502, size: "100ml", price: 50.00, sku: "AET-SG-100" }
        ],
        shippingInfo: "Processing: 24h. Delivery: 3-5 days." 
    },
    { 
        id: 5, 
        handle: "earth-sea-mask", 
        title: "Earth & Sea Detox Mask", 
        price: 55, 
        compareAtPrice: 65, 
        image: "aetheria_earth_sea_mask_jar_1773550196673.png", 
        description: "Deeply detoxifying clay infused with marine minerals and Atlantic kelp.", 
        tag: "Limited Edition", 
        category: "cleansers", 
        rating: 4.5, 
        reviews: 42, 
        sku: "AET-ES-004",
        inventory: 120,
        variants: [
            { id: 401, size: "50g", price: 55.00, sku: "AET-ES-050" }
        ],
        shippingInfo: "Processing: 24h. Delivery: 3-5 days." 
    },
    {
        id: 6,
        handle: "complete-ritual-kit",
        title: "Complete Ritual Kit",
        price: 253.30, 
        compareAtPrice: 298.00,
        image: "aetheria_luxury_spa_ritual.png",
        description: "The ultimate Aetheria experience with all 5 botanical heroes in a premium gift set.",
        tag: "Bundle Deal",
        category: "bundles",
        rating: 5.0,
        reviews: 15,
        sku: "AET-KIT-001",
        inventory: 50,
        variants: [
            { id: 601, size: "Standard Set", price: 253.30, sku: "AET-KIT-STD" }
        ],
        shippingInfo: "Processing: 24h. Delivery: 2-3 days (Express)."
    }
];

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    subscription?: boolean;
    bogo?: boolean;
    sku?: string;
}

let allProducts: Product[] = [];
let cartItems: CartItem[] = JSON.parse(localStorage.getItem('aetheria_cart_items') || '[]');
let cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
let activeDiscountCode: string | null = localStorage.getItem('aetheria_discount_code');


// --- Judge.me Review Widget Interface ---
const mockTestimonials = [
    { text: "The Luminous Dew Serum has completely transformed my skin's texture. It feels like silk and the radiance is unmatched." },
    { text: "I've tried every cleanser on the market, but the Velvet Petal Cleanser is the only one that leaves my skin feeling hydrated yet deep-cleaned." },
    { text: "Night Recovery Elixir is a miracle in a bottle. I wake up looking like I've had 10 hours of sleep every night." }
];

function renderJudgeMeReviews(reviews: any[]) {
    const feed = document.getElementById('reviews-feed');
    if (feed) {
        feed.innerHTML = reviews.map(rev => `
            <div class="review-item testimonial-card-v2">
                <span class="review-date">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <div class="stars-gold" style="color: #C5A059; margin-bottom: 1rem;">★★★★★</div>
                <p class="review-text" style="font-style: italic; margin-bottom: 1.5rem;">"${rev.text}"</p>
                <div class="verified-badge" style="color: #1B3022; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"></path></svg>
                    <span>Verified Ritualist • Judge.me</span>
                </div>
            </div>
        `).join('');
    }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aetheria Botanical initialized');
    
    renderMainNav();
    initNav();
    updateCartIcon();
    
    initAnnouncements();
    initEmailModal();
    renderJudgeMeReviews(mockTestimonials);
    initLabeler();
    
    const productList = document.getElementById('product-list');
    if (productList) {
        fetchProducts();
        initSearch();
        initSmartRecommendations();
    }
    initSidekickAI();

    const filterContainer = document.querySelector('.filter-categories');
    if (filterContainer) {
        initFilters();
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        initNewsletter(newsletterForm);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) initAuth(loginForm, 'login');

    const signupForm = document.getElementById('signup-form');
    if (signupForm) initAuth(signupForm, 'signup');

    if (document.body.classList.contains('product-page')) {
        initProductPage();
    }

    if (document.body.classList.contains('checkout-page')) {
        initCheckout();
    }

    if (document.body.classList.contains('confirmation-page')) {
        initConfirmation();
    }
});

function updateCartIcon() {
    updateCartUI();
}

function initAnnouncements() {
    const bar = document.querySelector('.announcement-content');
    if (!bar) return;

    const messages = [
        "Free Botanical Ritual Kit on orders over $150",
        "Free Global Shipping on all Rituals",
        "15% Off Your First Luxury Order | Use: AETHERIA15",
        "Limited Time: Buy One Get One Free on Velvet Cleansers"
    ];

    bar.innerHTML = messages.map((m, i) => `
        <div class="announcement-item ${i === 0 ? 'active' : ''}">${m}</div>
    `).join('');

    let current = 0;
    setInterval(() => {
        const items = document.querySelectorAll('.announcement-item');
        if (items.length === 0) return;
        items[current].classList.remove('active');
        current = (current + 1) % items.length;
        items[current].classList.add('active');
    }, 4000);
}

// Email Modal Logic
function initEmailModal() {
  const modal = document.getElementById('email-modal');
  const closeBtn = document.querySelector('.close-modal');
  const form = document.getElementById('modal-newsletter-form');

  if (!modal) return;

  const hasSeenModal = localStorage.getItem('aetheria_modal_seen');
  
  const showModal = () => {
    if (!localStorage.getItem('aetheria_modal_seen')) {
      modal.classList.add('active');
    }
  };

  // 1. Time-based trigger (5 seconds)
  if (!hasSeenModal) {
    setTimeout(showModal, 5000);
  }

  // 2. Exit intent trigger
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0) {
      showModal();
    }
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
    localStorage.setItem('aetheria_modal_seen', 'true');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      localStorage.setItem('aetheria_modal_seen', 'true');
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form?.querySelector('input');
    if (emailInput) {
      alert('Welcome to the Inner Circle! Your 15% discount code: BOTANICA15');
      modal.classList.remove('active');
      localStorage.setItem('aetheria_modal_seen', 'true');
      activeDiscountCode = 'BOTANICA15';
      updateCartUI();
    }
  });
}

function renderMainNav() {
    const mainNav = document.getElementById('main-nav');
    if (!mainNav) return;

    mainNav.innerHTML = `
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop All</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="ritual.html">The Ritual</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    `;
    
    // Refresh active state if needed (initNav already does this but order matters)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    mainNav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function initNav() {
    const user = JSON.parse(localStorage.getItem('aetheria_user') || 'null');
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    if (user) {
        headerActions.innerHTML = `
            <span class="user-welcome">Welcome, ${user.name.split(' ')[0]}</span>
            <a href="#" class="logout-link" id="logout-btn">Logout</a>
            <a href="#" class="cart-icon" id="cart-icon-btn">Cart (<span id="cart-count">${cartCount}</span>)</a>
        `;
        document.getElementById('logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('aetheria_user');
            window.location.href = 'index.html';
        });
    } else {
        headerActions.innerHTML = `
            <a href="login.html">Sign In</a>
            <a href="#" class="cart-icon" id="cart-icon-btn">Cart (<span id="cart-count">${cartCount}</span>)</a>
        `;
    }

    document.getElementById('cart-icon-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart(true);
    });

    // Handle active nav state
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initAuth(form: HTMLElement, type: 'login' | 'signup') {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData: any = {};
        form.querySelectorAll('input').forEach(input => {
            formData[input.type === 'password' ? 'password' : (input.type === 'email' ? 'email' : 'name')] = input.value;
        });

        try {
            const response = await fetch(`${API_URL}/auth/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            
            if (response.ok) {
                localStorage.setItem('aetheria_user', JSON.stringify(result.user));
                alert(type === 'login' ? `Welcome back, ${result.user.name}!` : `Welcome to the Inner Circle, ${result.user.name}!`);
                window.location.href = 'index.html';
            } else {
                alert(result.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Auth error:', error);
            // Fallback for demo if backend is offline
            // Only set fallback if user intended to login/signup
            localStorage.setItem('aetheria_user', JSON.stringify({ name: "Botanical Guest", email: "guest@aetheria.com" }));
            window.location.href = 'index.html';
        }
    });
}

async function fetchProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  try {
    const response = await fetch(`${API_URL}/products?t=${Date.now()}`);
    if (!response.ok) throw new Error('API unreachable');
    allProducts = await response.json();
    renderProducts(allProducts);
    
    const stickyAtc = document.getElementById('sticky-atc');
    if (stickyAtc) {
      setupStickyATC(allProducts[0]);
    }
  } catch (error) {
    console.warn('Backend not detected. Loading botanical fallback products.');
    renderFallbackProducts();
  }
}

function renderFallbackProducts() {
    allProducts = BOTANICAL_PRODUCTS;
    renderProducts(allProducts);
    
    const stickyAtc = document.getElementById('sticky-atc');
    if (stickyAtc) {
      setupStickyATC(allProducts[0]);
    }
}

function renderProducts(products: Product[]) {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
  const displayProducts = isHomePage ? products.slice(0, 6) : products;

  if (displayProducts.length === 0) {
    productList.innerHTML = `<p class="text-center" style="grid-column: 1/-1; padding: 2rem;">No products found in this category.</p>`;
    return;
  }

  productList.innerHTML = displayProducts.map((product: Product) => `
    <div class="product-card" data-product-id="${product.id}">
      <a href="product.html?product=${product.handle}" class="product-link-wrapper">
        <div class="product-image" style="background-image: url('/assets/${product.image}')">
          ${product.tag ? `<div class="product-badge">${product.tag}</div>` : ''}
          ${product.compareAtPrice > product.price ? '<div class="product-badge sale">Offer</div>' : ''}
        </div>
      </a>
      <div class="product-info">
        <div class="product-vendor">Aetheria Botanical</div>
        <a href="product.html?product=${product.handle}"><h3>${product.title}</h3></a>
        
        <div class="product-reviews">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="review-count">(${product.reviews} reviews)</span>
        </div>

        <div class="product-desc">${product.description}</div>
        
        <div class="variant-selection">
          ${product.variants && product.variants.length > 1 ? `
            <select class="variant-select" onchange="switchVariant(${product.id}, this)">
              ${product.variants.map(v => `<option value="${v.id}" data-price="${v.price}" data-sku="${v.sku}">${v.size}</option>`).join('')}
            </select>
          ` : `<span class="single-variant">${product.variants?.[0]?.size || 'Standard Size'}</span>`}
        </div>

        <p class="product-price">
          <span class="price-display">$${product.price.toFixed(2)}</span>
          ${product.compareAtPrice > product.price ? `<span class="compare-price">$${product.compareAtPrice.toFixed(2)}</span>` : ''}
        </p>

        <div class="product-meta-extra">
          <span class="sku-display">SKU: ${product.variants?.[0]?.sku || product.sku}</span>
          <span class="inventory-display ${product.inventory !== undefined && product.inventory < 20 ? 'low-stock' : ''}">
            ${(product.inventory !== undefined && product.inventory > 0) ? `${product.inventory} in stock` : 'Out of Stock'}
          </span>
        </div>
        
        ${product.bogo ? `
          <div class="badge bogo-badge">Limited: Buy 1 Get 1 Free</div>
        ` : ''}

        <div class="marketplace-availability">
          <span class="m-badge">Amazon</span>
          <span class="m-badge">eBay</span>
          <span class="m-badge">Walmart</span>
        </div>

        ${product.subscription ? `
          <div class="subscription-widget">
            <label class="sub-save">
              <input type="checkbox" id="sub-check-${product.id}" onchange="updateCartUI()"> 
              <span>Subscribe & Save (10%)</span>
            </label>
            <p class="sub-detail">Delivery every 30 days. Cancel anytime.</p>
          </div>
        ` : ''}

        ${product.category === 'bundles' ? `
          <div class="bundle-contents">
            <strong>Ritual Includes:</strong>
            <ul>
              ${['Luminous Dew Serum', 'Velvet Cleanser', 'Radiance Elixir'].slice(0, 2).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="shipping-info-snippet">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M1 3h15v13H1z"></path><path d="M16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          ${product.shippingInfo || 'Processing: 24h. Delivery: 3-5 days.'}
        </div>

        <button class="btn add-to-cart-btn" onclick="addToCart(${product.id})" ${product.inventory === 0 ? 'disabled' : ''}>
          ${product.inventory === 0 ? 'Sold Out' : 'Add to Bag'}
        </button>

        <div class="product-reviews-section" id="reviews-${product.id}">
          <!-- Reviews will be injected here -->
        </div>
      </div>
    </div>
  `).join('');
  
  // Initialize reviews for each product
  displayProducts.forEach(p => renderReviews(p.id));
  
  // Update SEO for the page based on first product or category
  if (displayProducts.length > 0 && displayProducts[0].seo) {
    updateSEO(displayProducts[0].seo);
  }
}

function updateSEO(seo: { title: string, description: string }) {
  document.title = seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', seo.description);
  } else {
    const newMeta = document.createElement('meta');
    newMeta.name = "description";
    newMeta.content = seo.description;
    document.head.appendChild(newMeta);
  }
}

function renderStars(rating: number): string {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

(window as any).switchVariant = (_productId: number, select: HTMLSelectElement) => {
    const productCard = select.closest('.product-card');
    if (!productCard) return;

    const option = select.options[select.selectedIndex];
    const price = option.getAttribute('data-price');
    const sku = option.getAttribute('data-sku');

    const priceDisplay = productCard.querySelector('.price-display');
    const skuDisplay = productCard.querySelector('.sku-display');

    if (priceDisplay && price) priceDisplay.textContent = `$${parseFloat(price).toFixed(2)}`;
    if (skuDisplay && sku) skuDisplay.textContent = `SKU: ${sku}`;

    // Update sticky ATC if it's showing the same product
    const stickyAtc = document.getElementById('sticky-atc');
    const stickyInfo = document.getElementById('sticky-product-info');
    if (stickyAtc && stickyInfo && price) {
        const productTitle = productCard.querySelector('h3')?.textContent || 'Product';
        const productImage = productCard.querySelector('.product-image') as HTMLElement;
        const bgImg = productImage.style.backgroundImage;
        const imgPath = bgImg.slice(5, -2).replace('/assets/', '');

        stickyInfo.innerHTML = `
            <img src="/assets/${imgPath}" alt="${productTitle}">
            <div>
                <h4>${productTitle} ${option.text !== 'Standard Size' ? ` - ${option.text}` : ''}</h4>
                <p>$${parseFloat(price).toFixed(2)}</p>
            </div>
        `;
    }
};
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const category = target.getAttribute('data-category');

      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      // Filter products
      if (category === 'all') {
        renderProducts(allProducts);
      } else if (category === 'essentials') {
        renderProducts(allProducts.filter(p => ["cleansers", "serums", "elixirs", "bundles"].includes(p.category)));
      } else if (category === 'treatments') {
        renderProducts(allProducts.filter(p => (p.category === "cleansers" && p.tag === "Treatment") || p.category === "bundles"));
      } else {
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
  });
}

function initSearch() {
    const searchContainer = document.querySelector('.header-actions');
    if (!searchContainer) return;

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    searchWrapper.innerHTML = `
        <input type="text" id="global-search" placeholder="Search rituals..." class="search-input">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
    `;
    searchContainer.prepend(searchWrapper);

    const searchInput = document.getElementById('global-search') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

function renderReviews(productId: number) {
    const reviewContainer = document.getElementById(`reviews-${productId}`);
    if (!reviewContainer) return;

    // LocalStorage based review management (Simulation of Judge.me)
    const storedReviews = JSON.parse(localStorage.getItem(`aetheria_reviews_${productId}`) || '[]');
    const baseReviews = [
        { name: "Elena R.", rating: 5, comment: "Transformative. My skin feels like silk.", date: "2 days ago", verified: true },
        { name: "Marcus L.", rating: 4, comment: "Beautiful texture, slightly strong scent but effective.", date: "1 week ago", verified: true }
    ];

    const allReviews = [...storedReviews, ...baseReviews];
    
    reviewContainer.innerHTML = `
        <div class="reviews-mini-list">
            ${allReviews.slice(0, 2).map(r => `
                <div class="review-item-mini">
                    <span class="review-meta">${r.name} ${r.verified ? '<i class="verified-badge">✓ Verified</i>' : ''}</span>
                    <p>"${r.comment}"</p>
                </div>
            `).join('')}
            <button class="btn-text" onclick="showReviewModal(${productId})">Write a Review</button>
        </div>
    `;
}

(window as any).showReviewModal = (productId: number) => {
    const product = BOTANICAL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content glass-card">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Product Review</h2>
                <p>Sharing your ritual experience for ${product.title}</p>
            </div>
            <form id="review-form-${productId}" class="newsletter-form">
                <div class="rating-input">
                    <span class="star-rating">★★★★★</span>
                </div>
                <textarea placeholder="Tell us about your results..." required style="width: 100%; padding: 1rem; border: 1px solid #ddd; margin-bottom: 1rem; border-radius: 4px; min-height: 100px;"></textarea>
                <button type="submit" class="btn">Post Review</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal')?.addEventListener('click', () => modal.remove());
    
    modal.querySelector('form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = (modal.querySelector('textarea') as HTMLTextAreaElement).value;
        const newReview = { name: "Aetheria Guest", rating: 5, comment, date: "Just now", verified: false };
        
        const stored = JSON.parse(localStorage.getItem(`aetheria_reviews_${productId}`) || '[]');
        stored.unshift(newReview);
        localStorage.setItem(`aetheria_reviews_${productId}`, JSON.stringify(stored));
        
        modal.remove();
        alert("Thank you for sharing your ritual!");
        renderReviews(productId);
    });
};

function setupStickyATC(product: Product) {
  const bar = document.getElementById('sticky-atc');
  const stickyInfo = document.getElementById('sticky-product-info');
  if (!bar || !stickyInfo) return;

  stickyInfo.innerHTML = `
    <img src="/assets/${product.image}" alt="${product.title}">
    <div>
      <h4>${product.title}</h4>
      <p>$${product.price.toFixed(2)}</p>
    </div>
  `;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
      bar.classList.add('show');
    } else {
      bar.classList.remove('show');
    }
  });

  const stickyBtn = bar.querySelector('.btn-atc');
  if (stickyBtn) {
      stickyBtn.addEventListener('click', () => {
          (window as any).addToCart(product.id);
      });
  }
}

// --- NEW PRODUCT PAGE LOGIC ---
async function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const handle = urlParams.get('product');

    if (!handle) {
        window.location.href = 'shop.html';
        return;
    }

    // Ensure products are loaded
    if (allProducts.length === 0) {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (response.ok) {
                allProducts = await response.json();
            } else {
                throw new Error('Failed to fetch products from API');
            }
        } catch (e) {
            // Fallback for demo
            allProducts = BOTANICAL_PRODUCTS;
        }
    }

    const product = allProducts.find(p => p.handle === handle);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    renderProductContent(product);
    initGallery(product);
    initTabs(product);
    initProductPageReviews(product);
    initStickyATC(product);
    renderRelatedProducts(product);
    trackRecentlyViewed(product.id);
    initRecentlyViewed();
    initSubscriptionToggle(product);
}

function renderProductContent(product: Product) {
    document.title = `${product.title} | Aetheria Botanical`;
    
    // Breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-title');
    const breadcrumbCategory = document.querySelector('.product-breadcrumb a[href="shop.html"]');
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
      breadcrumbCategory.setAttribute('href', `shop.html?cat=${product.category}`);
    }
    
    if (breadcrumb) breadcrumb.textContent = product.title;

    // Title & Stars
    const titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = product.title;

    const starsEl = document.getElementById('star-rating-display');
    if (starsEl) starsEl.innerHTML = renderStars(product.rating);

    const reviewsLink = document.getElementById('review-count-display');
    if (reviewsLink) {
        reviewsLink.textContent = `(${product.reviews} reviews)`;
        reviewsLink.addEventListener('click', () => {
            const section = document.getElementById('reviews-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Price
    const priceEl = document.getElementById('product-price');
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;

    const comparePriceEl = document.getElementById('product-compare-price');
    if (comparePriceEl && product.compareAtPrice > product.price) {
        comparePriceEl.textContent = `$${product.compareAtPrice.toFixed(2)}`;
    }

    // Description
    const descEl = document.getElementById('product-description');
    if (descEl) descEl.textContent = product.description;

    // Meta
    const skuEl = document.getElementById('product-sku-display');
    if (skuEl) skuEl.textContent = product.variants?.[0]?.sku || product.sku;

    const catEl = document.getElementById('product-category-display');
    if (catEl) catEl.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);

    const shipEl = document.getElementById('product-shipping-display');
    const vendorEl = document.getElementById('product-vendor-display');
    const typeEl = document.getElementById('product-type-display');
    const stockEl = document.getElementById('product-inventory-display');

    if (shipEl) shipEl.textContent = product.shippingInfo || 'Processing: 24h. Delivery: 3-5 days.';
    if (vendorEl) vendorEl.textContent = 'Aetheria Botanical';
    if (typeEl) typeEl.textContent = product.category === 'serums' ? 'Ritual Elixir' : 'Botanical Essential';
    if (stockEl) {
        const inventory = product.inventory ?? 0;
        stockEl.textContent = inventory > 10 ? 'In Stock (Ships within 24h)' : (inventory > 0 ? `Limited Ritual: Only ${inventory} Left` : 'Out of Stock');
        stockEl.style.color = inventory > 10 ? '#2e7d32' : '#C55959';
    }

    // Shopify Bundles Simulation
    const bundleContainer = document.getElementById('bundle-container');
    const bundleItemsGrid = document.getElementById('bundle-items');
    const addBundleBtn = document.getElementById('add-bundle-btn') as HTMLButtonElement;

    if (bundleContainer && bundleItemsGrid && addBundleBtn) {
        const complementary = allProducts.find(p => p.id !== product.id && p.category !== product.category);
        if (complementary) {
            bundleContainer.style.display = 'block';
            bundleItemsGrid.innerHTML = `
                <div class="bundle-item-preview" style="background-image: url('/assets/${product.image}')"></div>
                <div class="bundle-plus">+</div>
                <div class="bundle-item-preview" style="background-image: url('/assets/${complementary.image}')" title="${complementary.title}"></div>
            `;
            const bundledPrice = (product.price + complementary.price) * 0.85;
            addBundleBtn.textContent = `Add Ritual Bundle • $${bundledPrice.toFixed(2)} (Save 15%)`;
            addBundleBtn.onclick = () => {
                (window as any).addToCart(product.id, 1);
                (window as any).addToCart(complementary.id, 1);
                (window as any).toggleCart(true);
            };
        }
    }

    // Variants
    const variantContainer = document.getElementById('variant-swatches');
    if (variantContainer && product.variants) {
        variantContainer.innerHTML = product.variants.map((v, i) => `
            <button class="pill-btn ${i === 0 ? 'active' : ''}" 
                    data-id="${v.id}" 
                    data-price="${v.price}" 
                    data-sku="${v.sku}">
                ${v.size}
            </button>
        `).join('');

        variantContainer.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLButtonElement;
                variantContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                
                const newPrice = target.getAttribute('data-price');
                const newSku = target.getAttribute('data-sku');
                
                if (priceEl && newPrice) priceEl.textContent = `$${parseFloat(newPrice).toFixed(2)}`;
                if (skuEl && newSku) skuEl.textContent = newSku;
                
                updateStickyInfo(product);
            });
        });
    }

    // Main ATC
    const atcBtn = document.getElementById('main-atc-btn') as HTMLButtonElement;
    if (atcBtn) {
        atcBtn.addEventListener('click', () => {
            const selectedVariantBtn = variantContainer?.querySelector('.pill-btn.active');
            const qtyInput = document.getElementById('qty-input') as HTMLInputElement;
            const quantity = parseInt(qtyInput.value) || 1;
            
            addToCartWithQuantity(product, quantity, selectedVariantBtn as HTMLButtonElement);
        });
    }

    // Qty buttons
    const minus = document.getElementById('qty-minus');
    const plus = document.getElementById('qty-plus');
    const input = document.getElementById('qty-input') as HTMLInputElement;
    
    minus?.addEventListener('click', () => {
        if (parseInt(input.value) > 1) input.value = (parseInt(input.value) - 1).toString();
    });
    plus?.addEventListener('click', () => {
        input.value = (parseInt(input.value) + 1).toString();
    });
}

function initGallery(product: Product) {
    const mainImg = document.getElementById('main-product-image') as HTMLImageElement;
    const thumbContainer = document.getElementById('product-thumbnails');
    
    if (!mainImg || !thumbContainer) return;

    mainImg.src = `/assets/${product.image}`;
    
    // Synthetic multi-angle gallery for demo
    const images = [product.image, product.image, product.image]; 
    
    thumbContainer.innerHTML = images.map((img, i) => `
        <div class="thumb-item ${i === 0 ? 'active' : ''}">
            <img src="/assets/${img}" alt="Angle ${i + 1}">
        </div>
    `).join('');

    thumbContainer.querySelectorAll('.thumb-item').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            thumbContainer.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
            target.classList.add('active');
            const newSrc = (target.querySelector('img') as HTMLImageElement).src;
            mainImg.src = newSrc;
            
            // Re-apply zoom if needed
            initZoom(mainImg);
        });
    });

    initZoom(mainImg);
}

function initZoom(img: HTMLImageElement) {
    const wrapper = img.parentElement;
    if (!wrapper) return;

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
        const { left, top, width, height } = wrapper.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
    });

    wrapper.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(2)';
    });

    wrapper.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
}

function initTabs(product: Product) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentArea = document.getElementById('tab-content-area');
    if (!contentArea) return;

    const sections = {
        ingredients: `<h3>Botanical Profile</h3><p>Hydrating complexes of ${product.category === 'serums' ? 'Hyaluronic Acid and Rosehip' : 'Rose-water and Chamomile'}. All ingredients are sustainably harvested and CO2 extracted for maximum purity.</p><ul><li>98% Naturally Derived</li><li>100% Vegan</li><li>Leaping Bunny Certified</li></ul>`,
        howtouse: `<h3>The Ritual</h3><p>Warm 2-3 drops between your palms. Gently press into cleansed skin nightly, alternating with your Aetheria serum for layered efficacy.</p>`,
        shipping: `<h3>Worldwide Delivery</h3><p>We ship globally from our botanical lab. Orders are processed within 24 hours. Free express shipping on orders over $150.</p>`
    };

    contentArea.innerHTML = sections.ingredients;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const tab = target.getAttribute('data-tab') as keyof typeof sections;
            tabBtns.forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            contentArea.innerHTML = sections[tab];
        });
    });
}

function initProductPageReviews(product: Product) {
    const feed = document.getElementById('reviews-feed');
    const totalCount = document.getElementById('review-total-count');
    if (!feed) return;

    const reviews = [
        { name: "Julianna M.", initial: "JM", rating: 5, comment: "This is my third bottle. I've tried everything on the market and nothing hydrates like Aetheria.", date: "March 12, 2026" },
        { name: "Robert K.", initial: "RK", rating: 4, comment: "Great efficacy, but would love a larger size option for travel.", date: "February 28, 2026" },
        { name: "Sophie L.", initial: "SL", rating: 5, comment: "The smell is heavenly and my skin glow is undeniable.", date: "February 15, 2026" }
    ];

    if (totalCount) totalCount.textContent = reviews.length.toString();

    feed.innerHTML = reviews.map(r => `
        <div class="review-item-full">
            <div class="review-header-full">
                <div class="review-user">
                    <div class="user-initials">${r.initial}</div>
                    <div class="user-info">
                        <strong>${r.name}</strong>
                        <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                    </div>
                </div>
                <div class="review-date">${r.date}</div>
            </div>
            <div class="review-content-full">
                <p>"${r.comment}"</p>
                <span class="verified-badge">✓ Verified Ritualist</span>
            </div>
        </div>
    `).join('');

    document.getElementById('write-review-btn')?.addEventListener('click', () => {
        (window as any).showReviewModal(product.id);
    });
}

function initStickyATC(product: Product) {
    const stickyBar = document.getElementById('product-sticky-atc');
    if (!stickyBar) return;

    updateStickyInfo(product);

    window.addEventListener('scroll', () => {
        const mainAtc = document.getElementById('main-atc-btn');
        if (!mainAtc) return;
        
        const rect = mainAtc.getBoundingClientRect();
        if (rect.top < 0) {
            stickyBar.classList.add('active');
        } else {
            stickyBar.classList.remove('active');
        }
    });

    document.getElementById('sticky-atc-btn')?.addEventListener('click', () => {
        const atcBtn = document.getElementById('main-atc-btn');
        atcBtn?.click();
    });
}

function updateStickyInfo(product: Product) {
    const stickyImg = document.getElementById('sticky-img') as HTMLImageElement;
    const stickyTitle = document.getElementById('sticky-title');
    const stickyPrice = document.getElementById('sticky-price');
    const stickyVariant = document.getElementById('sticky-variant-info');
    
    const activePill = document.querySelector('.pill-btn.active') as HTMLButtonElement;
    
    if (stickyImg) stickyImg.src = `/assets/${product.image}`;
    if (stickyTitle) stickyTitle.textContent = product.title;
    if (stickyPrice && activePill) stickyPrice.textContent = `$${parseFloat(activePill.getAttribute('data-price') || '0').toFixed(2)}`;
    if (stickyVariant && activePill) stickyVariant.textContent = activePill.textContent;
}

function renderRelatedProducts(currentProduct: Product) {
    const container = document.getElementById('related-product-list');
    if (!container) return;

    const related = allProducts.filter(p => p.id !== currentProduct.id).slice(0, 4);
    renderProducts(related); // Re-use existing grid logic
}

function addToCartWithQuantity(product: Product, quantity: number, variantBtn?: HTMLButtonElement) {
    const user = localStorage.getItem('aetheria_user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    let selectedPrice = product.price;
    let selectedTitle = product.title;
    let selectedSku = product.sku;

    if (variantBtn) {
        const variantId = parseInt(variantBtn.getAttribute('data-id') || '0');
        const variant = product.variants?.find(v => v.id === variantId);
        if (variant) {
            selectedPrice = variant.price;
            selectedTitle = `${product.title} - ${variant.size}`;
            selectedSku = variant.sku;
        }
    }

    const existingItem = cartItems.find(i => i.id === product.id && i.title === selectedTitle);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            id: product.id,
            title: selectedTitle,
            price: selectedPrice,
            image: product.image,
            quantity: quantity,
            sku: selectedSku
        });
    }

    updateCartUI();
    toggleCart(true);
}

// --- CHECKOUT & CONFIRMATION LOGIC ---
async function initCheckout() {
    if (cartItems.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    renderCheckoutItems();
    updateCheckoutTotals();

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
    });

    const applyBtn = document.getElementById('apply-discount-checkout');
    applyBtn?.addEventListener('click', () => {
        const input = document.getElementById('checkout-discount-input') as HTMLInputElement;
        const code = input.value.toUpperCase().trim();
        const validCodes = ['AETHERIA15', 'BOTANICA15', 'HERO10', 'FREESHIP'];
        
        if (validCodes.includes(code)) {
            activeDiscountCode = code;
            localStorage.setItem('aetheria_discount_code', code);
            updateCheckoutTotals();
            input.value = '';
        } else {
            alert('Invalid code');
        }
    });

    // Auto-fill user email if logged in
    const user = JSON.parse(localStorage.getItem('aetheria_user') || 'null');
    if (user && user.email) {
        const emailInput = document.getElementById('checkout-email') as HTMLInputElement;
        if (emailInput) emailInput.value = user.email;
    }
}

function renderCheckoutItems() {
    const list = document.getElementById('checkout-items-list');
    if (!list) return;

    list.innerHTML = cartItems.map((item: CartItem) => `
        <div class="checkout-item">
            <div class="checkout-item-img-wrapper">
                <img src="/assets/${item.image}" alt="${item.title}" loading="lazy">
                <span class="qty-badge">${item.quantity}</span>
            </div>
            <div class="checkout-item-info">
                <h4>${item.title}</h4>
                <p>${item.sku || 'AET-BOT-000'}</p>
            </div>
            <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function updateCheckoutTotals() {
    const { subtotal, discount, shipping, total, discountMsg } = calculateTotals();

    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountEl = document.getElementById('checkout-discount-val');
    const shipEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');
    const discountRow = document.querySelector('.discount-line') as HTMLElement;
    const activeDiscountContainer = document.getElementById('checkout-active-discount');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    if (discount > 0) {
        if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
        if (discountRow) discountRow.style.display = 'flex';
        if (activeDiscountContainer) {
            activeDiscountContainer.innerHTML = `
                <span class="discount-tag">
                    ${discountMsg}
                    <span class="remove-discount" onclick="removeCheckoutDiscount()">&times;</span>
                </span>
            `;
        }
    } else {
        if (discountRow) discountRow.style.display = 'none';
        if (activeDiscountContainer) activeDiscountContainer.innerHTML = '';
    }
}

(window as any).removeCheckoutDiscount = () => {
    activeDiscountCode = null;
    localStorage.removeItem('aetheria_discount_code');
    updateCheckoutTotals();
};

function placeOrder() {
    const orderId = `AET-${Math.floor(Math.random() * 90000) + 10000}`;
    const orderData = {
        id: orderId,
        items: cartItems,
        total: calculateTotals().total,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    // Store order for confirmation page
    localStorage.setItem('aetheria_last_order', JSON.stringify(orderData));
    
    // Clear cart
    cartItems = [];
    localStorage.removeItem('aetheria_cart_items');
    activeDiscountCode = null;
    localStorage.removeItem('aetheria_discount_code');

    window.location.href = 'confirmation.html';
}

function initConfirmation() {
    const lastOrder = JSON.parse(localStorage.getItem('aetheria_last_order') || 'null');
    if (!lastOrder) return;

    const orderIdEl = document.getElementById('conf-order-id');
    const dateEl = document.getElementById('conf-date');

    if (orderIdEl) orderIdEl.textContent = `#${lastOrder.id}`;
    if (dateEl) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        dateEl.textContent = deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
}

function initNewsletter(form: HTMLElement) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input');
    if (!emailInput) return;

    try {
      const response = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.value })
      });
      await response.json();
      form.innerHTML = `
        <div class="newsletter-success">
          <h3>Welcome to the Circle</h3>
          <p>Your journey begins now. Use code <strong style="color: var(--accent-color)">AETHERIA15</strong> for 15% off your first ritual.</p>
        </div>
      `;
    } catch (error) {
      console.error('Newsletter error:', error);
    }
  });
}


function updateCartUI() {
    const counter = document.getElementById('cart-count');
    if (counter) {
        cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        counter.textContent = cartCount.toString();
        localStorage.setItem('aetheria_cart_items', JSON.stringify(cartItems));
        if (activeDiscountCode) localStorage.setItem('aetheria_discount_code', activeDiscountCode);
        else localStorage.removeItem('aetheria_discount_code');
    }
    renderCartDrawer();
}

function calculateTotals() {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;
    let shipping = subtotal > 150 ? 0 : 15;
    let discountMsg = '';

    // 1. Fixed Code Discount (15% off)
    if (activeDiscountCode === 'AETHERIA15' || activeDiscountCode === 'BOTANICA15') {
        discount = subtotal * 0.15;
        discountMsg = '15% Off Applied';
    } else if (activeDiscountCode === 'HERO10') {
        discount = 10;
        discountMsg = '$10.00 Off Applied';
    } else if (activeDiscountCode === 'FREESHIP') {
        shipping = 0;
        discountMsg = 'Free Shipping Applied';
    }

    // 2. Subscription Discount (10% off)
    const hasSubscription = cartItems.some(item => item.subscription);

    if (hasSubscription) {
        discount += subtotal * 0.1;
        discountMsg += (discountMsg ? ' + ' : '') + '10% Sub Discount';
    }

    // 2. BOGO Logic (Buy One Get One Free for applicable items)
    cartItems.forEach(item => {
        if (item.bogo && item.quantity >= 2) {
            const freeItems = Math.floor(item.quantity / 2);
            const bogoSavings = freeItems * item.price;
            discount += bogoSavings;
            discountMsg += (discountMsg ? ' + ' : '') + `BOGO Free (${freeItems}x ${item.title})`;
        }
    });

    return {
        subtotal,
        discount,
        shipping,
        total: Math.max(0, subtotal - discount + shipping),
        discountMsg
    };
}

function getUpsellProduct(): Product | null {
    if (allProducts.length === 0) return null;
    
    // Pick a product not in cart, preferably low price or "Kit"
    const cartIds = cartItems.map(i => i.id);
    const potential = allProducts.filter(p => !cartIds.includes(p.id));
    
    if (potential.length === 0) return null;
    return potential[0]; // For demo, just return the first one available
}

(window as any).applyDiscountCode = () => {
    const input = document.getElementById('discount-code') as HTMLInputElement;
    const code = input?.value.toUpperCase().trim();
    const validCodes = ['AETHERIA15', 'BOTANICA15', 'HERO10', 'FREESHIP'];
    
    if (validCodes.includes(code)) {
        activeDiscountCode = code;
        updateCartUI();
        input.value = '';
    } else {
        alert('Invalid discount code. Try AETHERIA15, HERO10, or FREESHIP.');
    }
};

(window as any).removeDiscount = () => {
    activeDiscountCode = null;
    updateCartUI();
};

function renderCartDrawer() {
    let container = document.getElementById('cart-drawer-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'cart-drawer-container';
        document.body.appendChild(container);
        
        container.innerHTML = `
            <div class="cart-drawer-overlay" id="cart-overlay"></div>
            <div class="cart-drawer" id="cart-drawer">
                <div class="cart-drawer-header">
                    <h2>Your Ritual Bag</h2>
                    <span class="close-drawer" id="close-cart">&times;</span>
                </div>
                <div class="cart-drawer-scroll-area">
                    <div class="cart-items-list" id="cart-items-list"></div>
                    <div id="cart-drawer-footer-container"></div>
                </div>
            </div>
        `;
        
        document.getElementById('close-cart')?.addEventListener('click', () => toggleCart(false));
        document.getElementById('cart-overlay')?.addEventListener('click', () => toggleCart(false));
    }
    
    const { subtotal, discount, shipping, total, discountMsg } = calculateTotals();
    
    const itemsList = document.getElementById('cart-items-list');
    const footerContainer = document.getElementById('cart-drawer-footer-container');
    if (!itemsList || !footerContainer) return;

    itemsList.innerHTML = cartItems.length === 0 ? `
        <div class="cart-empty-msg">
            <p>Your bag is empty.</p>
            <a href="shop.html" class="btn btn-outline" style="margin-top: 1rem">Start Your Ritual</a>
        </div>
    ` : cartItems.map((item: CartItem) => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('/assets/${item.image}')"></div>
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <span class="qty-btn" onclick="updateQty(${item.id}, -1)">-</span>
                        <span class="qty-val">${item.quantity}</span>
                        <span class="qty-btn" onclick="updateQty(${item.id}, 1)">+</span>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        </div>
    `).join('');

    const upsell = getUpsellProduct();

    footerContainer.innerHTML = cartItems.length > 0 ? `
        ${upsell ? `
            <div class="cart-upsell">
                <p>Enhance Your Ritual</p>
                <div class="upsell-item">
                    <img src="/assets/${upsell.image}" alt="${upsell.title}">
                    <div class="upsell-info">
                        <h5>${upsell.title}</h5>
                        <p>$${upsell.price.toFixed(2)}</p>
                    </div>
                    <button class="btn btn-sm" onclick="addToCart(${upsell.id})">+ Add Pairing</button>
                </div>
            </div>
        ` : ''}
        <div class="cart-discount">
            <div class="discount-input-wrapper">
                <input type="text" id="discount-code" placeholder="Enter promo code" value="${activeDiscountCode || ''}">
                <button onclick="applyDiscountCode()" class="btn-apply">Apply</button>
            </div>
            ${activeDiscountCode || discount > 0 ? `
                <div class="active-discounts">
                    <span class="discount-tag">
                        ${discountMsg || 'Discount Applied'}
                        <span class="remove-discount" onclick="removeDiscount()">&times;</span>
                    </span>
                </div>
            ` : ''}
        </div>
        <div class="cart-drawer-footer">
            <div class="cart-total-details">
                <div class="total-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                ${discount > 0 ? `<div class="total-row discount-row"><span>Discount</span><span>-$${discount.toFixed(2)}</span></div>` : ''}
                <div class="total-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div class="cart-total" style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
            <button class="btn" style="width: 100%" onclick="window.location.href='checkout.html'">Complete Ritual Checkout</button>
            <div class="trust-badges-mini">
                <span>Secure SSL Checkout</span>
                <span>•</span>
                <span>Ritual Guaranteed</span>
            </div>
        </div>
    ` : '';
}

function toggleCart(isOpen: boolean) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer || !overlay) return;

    if (isOpen) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => drawer.classList.add('active'), 10);
    } else {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => overlay.classList.remove('active'), 400);
    }
}

(window as any).updateQty = (id: number, delta: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(i => i.id !== id);
        }
        updateCartUI();
    }
};

(window as any).removeFromCart = (id: number) => {
    cartItems = cartItems.filter(i => i.id !== id);
    updateCartUI();
};

// Global cart mock
(window as any).addToCart = (productId: number) => {
    const user = localStorage.getItem('aetheria_user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    // Handle inventory
    if (product.inventory !== undefined && product.inventory <= 0) {
        alert("This item is currently out of stock.");
        return;
    }

    // Get selected variant
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const variantSelect = productCard?.querySelector('.variant-select') as HTMLSelectElement;
    let selectedPrice = product.price;
    let selectedTitle = product.title;
    let selectedSku = product.sku;

    if (variantSelect && product.variants) {
        const variantId = parseInt(variantSelect.value);
        const variant = product.variants.find(v => v.id === variantId);
        if (variant) {
            selectedPrice = variant.price;
            selectedTitle = `${product.title} - ${variant.size}`;
            selectedSku = variant.sku;
        }
    }

    const existingItem = cartItems.find(i => i.id === productId && i.title === selectedTitle);
    
    // Check for subscription
    const subCheck = productCard?.querySelector(`#sub-check-${productId}`) as HTMLInputElement;
    const isSubscription = subCheck ? subCheck.checked : false;

    if (existingItem) {
        existingItem.quantity++;
        existingItem.subscription = isSubscription;
    } else {
        cartItems.push({
            id: product.id,
            title: selectedTitle,
            price: selectedPrice,
            image: product.image,
            quantity: 1,
            subscription: isSubscription,
            bogo: product.bogo
        });
    }

    // Decrement inventory (local session check)
    if (product.inventory !== undefined) {
        product.inventory--;
        renderProducts(allProducts); // Refresh to show stock change
    }

    updateCartUI();
    toggleCart(true); // Open drawer on add
    console.log(`Added to cart: ${selectedTitle} (${selectedSku})`);
};

// Initial render
renderCartDrawer();

// Phase 3: AI Assistance & Optimization (Sidekick AI Simulation)

function initSidekickAI() {
    const launcher = document.createElement('div');
    launcher.id = 'sidekick-launcher';
    launcher.className = 'sidekick-fab';
    launcher.innerHTML = `
        <div class="sidekick-glow"></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        <span class="sidekick-tooltip">Sidekick AI</span>
    `;
    document.body.appendChild(launcher);

    if (launcher) {
        launcher.addEventListener('click', toggleSidekickPanel);
    }
    
    // Bind close button
    const closeBtn = document.getElementById('close-sidekick');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const panel = document.getElementById('sidekick-panel');
            panel?.classList.remove('active');
        });
    }
}

function toggleSidekickPanel() {
    const panel = document.getElementById('sidekick-panel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

(window as any).toggleSidekick = toggleSidekickPanel;

(window as any).optimizePage = () => {
    const output = document.getElementById('sidekick-output');
    if (!output) return;
    
    output.innerHTML = `<div class="ai-typing" style="color: #888; font-style: italic; margin-top: 1rem;">Sidekick is analyzing your ritual flow...</div>`;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="ai-success" style="background: #f0f9f1; color: #2e7d32; padding: 1rem; border-radius: 6px; border-left: 4px solid #4caf50; margin-top: 1rem;">
                <strong>Optimization Complete! ✨</strong>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Sidekick has optimized your heading hierarchy and navigation paths to increase ritual intent by 12%.</p>
            </div>
        `;
    }, 2000);
};

(window as any).aiOptimizeCopy = () => {
    const output = document.getElementById('sidekick-output');
    if (output) output.innerHTML = '<p class="ai-typing">Analyzing botanical narratives...</p>';
    
    setTimeout(() => {
        const heroH1 = document.querySelector('.about-hero h1, .hero-content h1');
        if (heroH1) heroH1.innerHTML = 'Experience the Future <br>of Botanical Wellness.';
        
        const sectionTitles = document.querySelectorAll('.section-title h2');
        sectionTitles.forEach(title => {
            if (title.textContent?.includes('Rituals')) title.textContent = 'Curated Essentials for Eternal Radiance';
        });

        if (output) output.innerHTML = '<p class="ai-success">✅ Copy optimized across the page for maximum emotional resonance.</p>';
    }, 1500);
};

(window as any).aiSuggestLayout = () => {
    const output = document.getElementById('sidekick-output');
    if (output) output.innerHTML = '<p class="ai-typing">Simulating user engagement patterns...</p>';
    
    setTimeout(() => {
        const suggestion = `
            <div class="ai-suggestion-box">
                <strong>Layout Improvement:</strong>
                <p>Move "Voices of Radiance" above the "Featured Collection" to build immediate social proof.</p>
                <button class="btn btn-sm" onclick="applySectionSwap()">Apply Structural Change</button>
            </div>
        `;
        if (output) output.innerHTML = suggestion;
    }, 1800);
};

(window as any).applySectionSwap = () => {
    const testimonials = document.querySelector('.testimonials, section:has(h2:contains("Voices"))');
    const featured = document.querySelector('.featured-collections, section:has(h2:contains("Featured"))');
    
    if (testimonials && featured && featured.parentNode) {
        featured.parentNode.insertBefore(testimonials, featured);
        const output = document.getElementById('sidekick-output');
        if (output) output.innerHTML = '<p class="ai-success">✅ Layout restructured. Verification: Testimonials now prioritize social proof.</p>';
        
        // Custom selector utility since :contains isn't standard in querySelector
        return;
    }
    
    // Fallback if semantic classes are missing, try by ID or Heading text
    const sections = Array.from(document.querySelectorAll('section'));
    const testSec = sections.find(s => s.textContent?.includes('Voices of Radiance'));
    const featSec = sections.find(s => s.textContent?.includes('Featured Collections'));

    if (testSec && featSec && featSec.parentNode) {
        featSec.parentNode.insertBefore(testSec, featSec);
        const output = document.getElementById('sidekick-output');
        if (output) output.innerHTML = '<p class="ai-success">✅ Layout restructured. Higher trust density achieved.</p>';
    }
};

(window as any).aiOptimizeNav = () => {
    const output = document.getElementById('sidekick-output');
    if (output) output.innerHTML = '<p class="ai-typing">Mapping user journey paths...</p>';
    
    setTimeout(() => {
        const mainNav = document.querySelector('#main-nav ul');
        if (mainNav) {
            const li = document.createElement('li');
            li.innerHTML = '<a href="shop.html?tag=Bestseller" style="color: var(--accent-color); font-weight: bold;">Best Sellers</a>';
            mainNav.appendChild(li);
        }
        
        if (output) output.innerHTML = '<p class="ai-success">✅ Navigation optimized. Added "Best Sellers" to primary menu for higher click-through.</p>';
        updateCartUI();
    }, 1400);
};

(window as any).aiOptimizeSEO = () => {
    const output = document.getElementById('sidekick-output');
    if (output) output.innerHTML = '<p class="ai-typing">Injecting high-authority keywords...</p>';
    
    setTimeout(() => {
        document.title = "Luxury Botanical Skincare | Organic Anti-Aging | Aetheria";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', "Discover Aetheria's award-winning botanical rituals. Scientifically proven organic skincare for deep hydration, radiance, and cellular renewal.");
        
        if (output) output.innerHTML = '<p class="ai-success">✅ SEO Metadata enhanced with premium keywords.</p>';
        updateCartUI();
    }, 1200);
};

function initSmartRecommendations() {
    const shopSection = document.getElementById('shop');
    if (!shopSection) return;

    const smartSection = document.createElement('section');
    smartSection.id = 'ai-recommendations';
    smartSection.className = 'smart-recs-hidden';
    smartSection.innerHTML = `
        <div class="container">
            <div class="section-title">
                <h2>AI: Personal Ritual Pairings</h2>
                <p>Based on your interest, our Sidekick AI suggests these companion botanicals.</p>
            </div>
            <div class="product-grid" id="smart-rec-list"></div>
        </div>
    `;
    shopSection.after(smartSection);
}

// Global wrap to show smart recs when something is added to cart
const originalAddToCart = (window as any).addToCart;
(window as any).addToCart = (productId: number) => {
    originalAddToCart(productId);
    
    const smartSection = document.getElementById('ai-recommendations');
    const recList = document.getElementById('smart-rec-list');
    if (smartSection && recList && allProducts.length > 0) {
        smartSection.classList.remove('smart-recs-hidden');
        smartSection.classList.add('smart-recs-visible');
        
        const recs = allProducts.filter((p: Product) => p.id !== productId).slice(0, 3);
        recList.innerHTML = recs.map((p: Product) => `
            <div class="product-card mini-card">
                <div class="product-image mini" style="background-image: url('/assets/${p.image}')" loading="lazy"></div>
                <div class="product-info">
                    <h4>${p.title}</h4>
                    <p class="price">$${p.price.toFixed(2)}</p>
                    <button class="btn btn-sm" onclick="addToCart(${p.id})">+ Add Pairing</button>
                </div>
            </div>
        `).join('');
    }
};

// --- Search & Discovery: Recently Viewed ---
function trackRecentlyViewed(productId: number) {
    let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    viewed = viewed.filter((id: number) => id !== productId);
    viewed.unshift(productId);
    localStorage.setItem('recentlyViewed', JSON.stringify(viewed.slice(0, 4)));
}

function initRecentlyViewed() {
    const section = document.getElementById('recently-viewed-section');
    const list = document.getElementById('recently-viewed-list');
    const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    if (section && list && viewedIds.length > 1) {
        (section as HTMLElement).style.display = 'block';
        const products = viewedIds
            .map((id: number) => allProducts.find(p => p.id === id))
            .filter((p: any) => p && p.id !== (window as any).currentProductId)
            .slice(0, 4);

        list.innerHTML = products.map((p: Product) => `
            <div class="product-card mini-card-v2" onclick="window.location.href='product.html?product=${p.handle}'">
                <img src="/assets/${p.image}" alt="${p.title}">
                <div class="mini-info">
                    <h5>${p.title}</h5>
                    <p>$${p.price}</p>
                </div>
            </div>
        `).join('');
    }
}

// --- Shopify Subscriptions Toggle ---
function initSubscriptionToggle(product: Product) {
    const options = document.querySelectorAll('.sub-option');
    const priceOneTime = document.getElementById('sub-price-onetime');
    const priceRecurring = document.getElementById('sub-price-recurring');
    const mainPrice = document.getElementById('product-price');
    
    if (priceOneTime) priceOneTime.textContent = `$${product.price.toFixed(2)}`;
    if (priceRecurring) priceRecurring.textContent = `$${(product.price * 0.9).toFixed(2)}`;

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const radio = opt.querySelector('input[type="radio"]') as HTMLInputElement;
            if (radio) radio.checked = true;

            const type = opt.getAttribute('data-type');
            if (mainPrice) {
                mainPrice.textContent = type === 'subscription' 
                    ? `$${(product.price * 0.9).toFixed(2)}` 
                    : `$${product.price.toFixed(2)}`;
            }
        });
    });
}

// --- Labeler: AI Product Labels ---
function initLabeler() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const title = card.querySelector('h3, h4')?.textContent || '';
        if (title.includes('Serum') || title.includes('Elixir')) {
            const badge = document.createElement('div');
            badge.className = 'product-badge-ai badge-trending';
            badge.textContent = 'Sidekick Choice';
            (card as HTMLElement).style.position = 'relative';
            card.appendChild(badge);
        } else if (title.includes('Kit')) {
            const badge = document.createElement('div');
            badge.className = 'product-badge-ai badge-ritual';
            badge.textContent = 'Ultimate Ritual';
            (card as HTMLElement).style.position = 'relative';
            card.appendChild(badge);
        }
    });
}

// --- Skin Quiz Functionality ---
function openSkinQuiz() {
    let currentStep = 1;
    let userProfile = { type: '', concern: '', sensitivity: '' };

    const modalHTML = document.createElement('div');
    modalHTML.className = 'modal-overlay active';
    modalHTML.id = 'quiz-modal';
    
    modalHTML.innerHTML = `
        <div class="modal-content quiz-content">
            <span class="close-modal close-quiz">&times;</span>
            <div class="quiz-header">
                <h2>Botanical Skin Analysis</h2>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress" style="width: 33%;"></div>
                </div>
            </div>
            
            <div class="quiz-body">
                <!-- Step 1 -->
                <div class="quiz-step active" id="quiz-step-1">
                    <h3>How does your skin feel by midday?</h3>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-key="type" data-val="Dry">Tight or flaky, needing hydration</button>
                        <button class="quiz-opt-btn" data-key="type" data-val="Oily">Shiny or greasy, especially in the T-zone</button>
                        <button class="quiz-opt-btn" data-key="type" data-val="Combination">Oily T-zone, but dry or normal cheeks</button>
                        <button class="quiz-opt-btn" data-key="type" data-val="Balanced">Comfortable, neither too oily nor dry</button>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="quiz-step" id="quiz-step-2">
                    <h3>What is your primary skin concern?</h3>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-key="concern" data-val="Aging">Fine lines, loss of firmness</button>
                        <button class="quiz-opt-btn" data-key="concern" data-val="Acne">Breakouts, congestion, enlarged pores</button>
                        <button class="quiz-opt-btn" data-key="concern" data-val="Dullness">Uneven tone, hyperpigmentation</button>
                        <button class="quiz-opt-btn" data-key="concern" data-val="Redness">Sensitivity, irritation, rosacea</button>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="quiz-step" id="quiz-step-3">
                    <h3>How does your skin react to new products?</h3>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-key="sensitivity" data-val="High">Frequently stings, turns red, or breaks out</button>
                        <button class="quiz-opt-btn" data-key="sensitivity" data-val="Moderate">Occasionally reacts, but generally okay</button>
                        <button class="quiz-opt-btn" data-key="sensitivity" data-val="Low">Hardly ever reacts, tolerant to most things</button>
                    </div>
                </div>
                
                <!-- Result Step -->
                <div class="quiz-step" id="quiz-step-result">
                    <div class="quiz-analyzing">
                        <div class="botanical-loader"></div>
                        <p>Curating your botanical ritual...</p>
                    </div>
                    <div class="quiz-recommendation" style="display: none;">
                        <h3>Your Personalized Ritual</h3>
                        <p class="quiz-profile-summary"></p>
                        <div class="quiz-product-recs" id="quiz-product-recs"></div>
                        <button class="btn btn-full close-quiz-btn">Explore Shop</button>
                    </div>
                </div>
            </div>
            
            <div class="quiz-footer">
                <button class="btn-text quiz-back" style="display: none;">&larr; Back</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalHTML);

    const steps = modalHTML.querySelectorAll('.quiz-step');
    const progressBar = modalHTML.querySelector('.quiz-progress') as HTMLElement;
    const backBtn = modalHTML.querySelector('.quiz-back') as HTMLButtonElement;
    const options = modalHTML.querySelectorAll('.quiz-opt-btn');

    // Close logic
    const closeBtn = modalHTML.querySelector('.close-quiz');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalHTML.classList.remove('active');
            setTimeout(() => modalHTML.remove(), 500);
        });
    }

    const exploreShopBtn = modalHTML.querySelector('.close-quiz-btn');
    if (exploreShopBtn) {
        exploreShopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalHTML.classList.remove('active');
            setTimeout(() => {
                modalHTML.remove();
                window.location.href = '/index.html';
            }, 500);
        });
    }

    // Back button
    backBtn.addEventListener('click', () => {
        if (currentStep > 1 && currentStep <= 3) {
            currentStep--;
            updateStep();
        }
    });

    // Option clicks
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            const btn = e.target as HTMLElement;
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            
            if (key && val) {
                (userProfile as any)[key] = val;
            }

            // Visual feedback
            const siblings = btn.parentElement?.querySelectorAll('.quiz-opt-btn');
            siblings?.forEach(s => s.classList.remove('selected'));
            btn.classList.add('selected');

            setTimeout(() => {
                currentStep++;
                updateStep();
            }, 300); // Small delay for UX
        });
    });

    function updateStep() {
        steps.forEach((s, idx) => {
            if (idx === currentStep - 1) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        if (currentStep <= 3) {
            progressBar.style.width = `${(currentStep / 3) * 100}%`;
            backBtn.style.display = currentStep > 1 ? 'block' : 'none';
        } else {
            // Logic for Result Step
            progressBar.style.width = '100%';
            backBtn.style.display = 'none';
            generateRecommendations();
        }
    }

    function generateRecommendations() {
        const analyzing = modalHTML.querySelector('.quiz-analyzing') as HTMLElement;
        const resultSection = modalHTML.querySelector('.quiz-recommendation') as HTMLElement;
        const summary = modalHTML.querySelector('.quiz-profile-summary') as HTMLElement;
        const recsContainer = modalHTML.querySelector('#quiz-product-recs') as HTMLElement;

        // Simulate analysis delay
        setTimeout(() => {
            analyzing.style.display = 'none';
            resultSection.style.display = 'block';
            
            let recommendedProducts: Product[] = [];
            
            // Basic recommendation logic based on concern and type
            if (userProfile.concern === 'Aging') {
                recommendedProducts.push(BOTANICAL_PRODUCTS[2]); // Night Recovery Elixir
                recommendedProducts.push(BOTANICAL_PRODUCTS[0]); // Dew Serum
            } else if (userProfile.concern === 'Acne' || userProfile.type === 'Oily') {
                recommendedProducts.push(BOTANICAL_PRODUCTS[1]); // Cleanser
                recommendedProducts.push(BOTANICAL_PRODUCTS[3]); // Mist
            } else {
                recommendedProducts.push(BOTANICAL_PRODUCTS[0]); // Dew Serum
                recommendedProducts.push(BOTANICAL_PRODUCTS[1]); // Cleanser
            }

            summary.textContent = `Based on your ${userProfile.type.toLowerCase()} skin and focus on ${userProfile.concern.toLowerCase()}:`;

            recsContainer.innerHTML = '';
            recommendedProducts.forEach(prod => {
                recsContainer.innerHTML += `
                    <div class="quiz-rec-card">
                        <img src="/assets/${prod.image}" alt="${prod.title}">
                        <div class="quiz-rec-info">
                            <h4>${prod.title}</h4>
                            <p>${prod.category}</p>
                            <a href="/product.html?id=${prod.id}" class="btn-text">View Product</a>
                        </div>
                    </div>
                `;
            });
            
        }, 1500);
    }
}

// Add event listener to the quiz button on shop page
document.addEventListener('DOMContentLoaded', () => {
    const quizBtn = document.getElementById('open-skin-quiz');
    if (quizBtn) {
        quizBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSkinQuiz();
        });
    }
});
