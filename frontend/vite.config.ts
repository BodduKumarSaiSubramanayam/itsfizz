import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        product: resolve(__dirname, 'product.html'),
        about: resolve(__dirname, 'about.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        confirmation: resolve(__dirname, 'confirmation.html'),
        contact: resolve(__dirname, 'contact.html'),
        domainBasics: resolve(__dirname, 'domain-basics.html'),
        faq: resolve(__dirname, 'faq.html'),
        login: resolve(__dirname, 'login.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        returns: resolve(__dirname, 'returns.html'),
        ritual: resolve(__dirname, 'ritual.html'),
        shipping: resolve(__dirname, 'shipping.html'),
        signup: resolve(__dirname, 'signup.html'),
        terms: resolve(__dirname, 'terms.html'),
        trackOrder: resolve(__dirname, 'track-order.html')
      }
    }
  },
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true
        },
        '/auth': {
            target: 'http://localhost:5000',
            changeOrigin: true
        }
    }
  }
});
