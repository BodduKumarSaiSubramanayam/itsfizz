import React, { useState, useEffect } from 'react';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the new Node.js Backend REST API
        fetch('/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch from backend');
                return res.json();
            })
            .then(result => {
                // The backend returns { source: 'cache'|'database', data: [...] }
                setProducts(result.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="py-20 text-center">
            <p className="tracking-widest text-[#2c3e2e]">LOADING THE COLLECTION...</p>
        </div>
    );

    if (error) return (
        <div className="py-20 text-center text-red-700">
            <p className="tracking-widest">ERROR: {error}</p>
            <p className="text-sm mt-4 text-gray-500">Make sure the Node.js backend is running on port 5000.</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-[#2c3e2e] mb-4">The Collection</h1>
                <p className="text-gray-500 max-w-xl mx-auto font-light">
                    Pure. Potent. Proven. Discover our award-winning botanical formulas.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id || product._id} className="group cursor-pointer">
                        <div className="bg-gray-100 aspect-square w-full mb-4 overflow-hidden">
                            {/* Placeholder Image */}
                            <img 
                                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <h3 className="font-serif text-lg text-[#2c3e2e]">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                        <p className="font-medium text-[#2c3e2e]">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
