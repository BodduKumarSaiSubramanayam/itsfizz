const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Aetheria Botanical Backend is running successfully.');
});

const products = [
  {
    id: 1,
    handle: "luminous-dew-serum",
    title: "Luminous Dew Serum | Botanical Hyaluronic Acid",
    price: 75.00,
    compareAtPrice: 95.00,
    image: "aetheria_luminous_dew_serum_1773550143411.png",
    description: "<p>Elevate your morning ritual with the Luminous Dew Serum. Infused with botanical hyaluronic acid and stabilized Vitamin C, this feather-light formula penetrates deeply to provide 24-hour hydration and a visible, glass-skin glow.</p><ul><li>Deeply hydrates and plumps</li><li>Brightens uneven skin tone</li><li>100% Vegan & Cruelty-Free</li></ul>",
    tag: "Best Seller",
    category: "serums",
    rating: 4.9,
    reviews: 124,
    subscription: true,
    sku: "AET-LD-001",
    inventory: 150,
    variants: [
      { id: 101, size: "30ml", price: 75.00, sku: "AET-LD-030" },
      { id: 102, size: "50ml", price: 95.00, sku: "AET-LD-050" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 3-5 days.",
    seo: {
      title: "Luminous Dew Serum | Radiant Botanical Skincare",
      description: "Experience the ultimate glass-skin glow with our botanical Vitamin C serum. Deep hydration for a radiant, ageless complexion."
    }
  },
  {
    id: 2,
    handle: "night-recovery-elixir",
    title: "Night Recovery Elixir | Advanced Bakuchiol Treatment",
    price: 88.00,
    compareAtPrice: 110.00,
    image: "aetheria_night_elixir_1773550160238.png",
    description: "<p>Restore your skin’s barrier while you sleep. Our Night Recovery Elixir is a concentrated blend of cold-pressed pomegranate seed oil and bakuchiol, providing the anti-aging benefits of retinol without the irritation.</p><ul><li>Accelerates cell turnover</li><li>Calms redness and inflammation</li><li>Rich in antioxidants</li></ul>",
    tag: "Night Ritual",
    category: "elixirs",
    rating: 4.8,
    reviews: 98,
    subscription: true,
    sku: "AET-NR-002",
    inventory: 85,
    variants: [
      { id: 201, size: "30ml", price: 88.00, sku: "AET-NR-030" },
      { id: 202, size: "50ml", price: 110.00, sku: "AET-NR-050" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 3-5 days.",
    seo: {
      title: "Night Recovery Elixir | Advanced Bakuchiol Treatment",
      description: "Wake up to renewed skin. Our botanical elixir uses bakuchiol to target fine lines and redness without irritation."
    }
  },
  {
    id: 3,
    handle: "velvet-petal-cleanser",
    title: "Velvet Petal Cleanser | Gentle Rose Cream Wash",
    price: 42.00,
    compareAtPrice: 55.00,
    image: "aetheria_velvet_cleanser_tube_1773550174593.png",
    description: "<p>A gentle, non-foaming cream cleanser that lifts away impurities while maintaining your skin's natural moisture balance. Formulated with organic rose hydrosol and marshmallow root extract.</p><ul><li>Non-stripping formula</li><li>Soothes sensitive skin</li><li>Lifts makeup and SPF</li></ul>",
    tag: "Essentials",
    category: "cleansers",
    rating: 4.7,
    reviews: 82,
    bogo: true,
    subscription: true,
    sku: "AET-VP-003",
    inventory: 200,
    variants: [
      { id: 301, size: "100ml", price: 42.00, sku: "AET-VP-100" },
      { id: 302, size: "200ml", price: 70.00, sku: "AET-VP-200" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 3-5 days.",
    seo: {
      title: "Velvet Petal Cleanser | Gentle Rose Cream Wash",
      description: "Cleanse with serenity. A non-stripping botanical cream cleanser for soft, balanced, and rejuvenated skin."
    }
  },
  {
    id: 4,
    handle: "earth-sea-mask",
    title: "Earth & Sea Detox Mask | Mineral-Rich Clay Treatment",
    price: 58.00,
    compareAtPrice: 70.00,
    image: "aetheria_earth_sea_mask_jar_1773550196673.png",
    description: "<p>Purify your pores without the dryness. This innovative mask combines French green clay with mineral-rich Atlantic seaweed to detoxify while delivering essential nutrients back into the skin.</p><ul><li>Tightens pores and refines texture</li><li>Removes environmental pollutants</li><li>Infused with sea minerals</li></ul>",
    tag: "Treatment",
    category: "cleansers",
    rating: 4.6,
    reviews: 65,
    sku: "AET-ES-004",
    inventory: 120,
    variants: [
      { id: 401, size: "50g", price: 58.00, sku: "AET-ES-050" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 3-5 days.",
    seo: {
      title: "Earth & Sea Detox Mask | Mineral-Rich Clay Treatment",
      description: "Detoxify without dehydration. French green clay and Atlantic seaweed for refined pores and radiant skin."
    }
  },
  {
    id: 5,
    handle: "solar-guard-mist",
    title: "Solar Guard Mist | Blue Light Protection Spray",
    price: 35.00,
    compareAtPrice: 45.00,
    image: "aetheria_solar_mist_bottle_misty_1773550217880.png",
    description: "<p>An invisible shield for your skin. This refreshing mist provides environmental protection against blue light and pollution, while desert plant extracts offer an instant burst of moisture.</p><ul><li>Shields against blue light</li><li>Perfect for on-the-go hydration</li><li>Sets makeup for a dewy finish</li></ul>",
    tag: "New",
    category: "serums",
    rating: 4.5,
    reviews: 42,
    sku: "AET-SG-005",
    inventory: 12,
    variants: [
      { id: 501, size: "60ml", price: 35.00, sku: "AET-SG-060" },
      { id: 502, size: "100ml", price: 50.00, sku: "AET-SG-100" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 3-5 days.",
    seo: {
      title: "Solar Guard Mist | Blue Light Protection Spray",
      description: "The modern skin shield. Protect against pollution and blue light with a refreshing, hydrating botanical mist."
    }
  },
  {
    id: 6,
    handle: "complete-ritual-kit",
    title: "Complete Ritual Kit | The Full Aetheria Experience",
    price: 253.30, 
    compareAtPrice: 298.00,
    image: "aetheria_luxury_spa_ritual.png",
    description: "<p>The ultimate Aetheria experience. This kit includes all 5 of our botanical heroes to provide a comprehensive morning and evening ritual. Elevate your skin health with the synergy of nature and science.</p><ul><li>Includes: Cleanser, Serum, Elixir, Mask, and Mist</li><li>Curated for all skin types</li><li>15% savings compared to individual purchase</li></ul>",
    tag: "Bundle Deal",
    category: "bundles",
    rating: 5.0,
    reviews: 15,
    sku: "AET-KIT-001",
    inventory: 50,
    variants: [
      { id: 601, size: "Standard Set", price: 253.30, sku: "AET-KIT-STD" }
    ],
    shippingInfo: "Processing: 24h. Delivery: 2-3 days (Express).",
    seo: {
      title: "Complete Ritual Kit | The Full Aetheria Experience",
      description: "Transform your skin with the full Aetheria ritual. 5 botanical heroes in one luxury bundle for complete skin wellness."
    }
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/collections', (req, res) => {
  const collections = [
    { title: "Shop All", handle: "all" },
    { title: "The Essentials", handle: "essentials", categories: ["cleansers", "serums", "elixirs", "bundles"] },
    { title: "Treatment Heroes", handle: "treatments", categories: ["cleansers", "bundles"] }
  ];
  res.json(collections);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt: ${email}`);
  // In a real app, verify password. Here we simulate success.
  res.status(200).json({ 
    user: { name: "Aetheria Muse", email },
    token: "mock-jwt-token" 
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email } = req.body;
  console.log(`New signup: ${name} (${email})`);
  res.status(201).json({ 
    message: "Welcome to Aetheria!",
    user: { name, email },
    token: "mock-jwt-token"
  });
});

app.listen(PORT, () => {
  console.log(`Aetheria Backend running on http://localhost:${PORT}`);
});
