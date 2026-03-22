import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';

// PERFORMANCE OPTIMIZATION: Code Splitting & Lazy Loading routes
const Home = lazy(() => import('./pages/Home.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));

// Simple loading indicator for Suspense
const Loading = () => (
    <div className="flex h-screen items-center justify-center bg-[#faf9f6]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2c3e2e] border-t-transparent"></div>
    </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#faf9f6] text-[#2c3e2e] font-sans">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between p-6 px-12 border-b border-gray-200 sticky top-0 bg-[#faf9f6]/90 backdrop-blur-md z-50">
          <Link to="/" className="text-2xl font-serif tracking-widest uppercase">Aetheria</Link>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <Link to="/" className="hover:text-gray-500 transition">HOME</Link>
            <Link to="/shop" className="hover:text-gray-500 transition">SHOP ALL</Link>
          </div>
          <div className="flex space-x-6 items-center">
            <button className="hover:text-gray-500 transition"><User size={20} /></button>
            <button className="hover:text-gray-500 transition flex items-center">
              <ShoppingBag size={20} />
              <span className="ml-2 text-xs">(0)</span>
            </button>
          </div>
        </nav>

        {/* Dynamic Route Content */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <footer className="bg-[#2c3e2e] text-[#faf9f6] py-16 px-12 text-center mt-20">
          <h2 className="text-2xl font-serif mb-6">AETHERIA</h2>
          <p className="text-sm text-gray-400">Science-Led Botanical Rituals. © 2026</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
