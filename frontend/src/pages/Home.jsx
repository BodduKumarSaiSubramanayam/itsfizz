import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Placeholder image for DevTown video, simulating the user's original image */}
                    <img 
                        src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop" 
                        alt="Aetheria Hero Background" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
                        Science-Led <br/> Botanical Rituals
                    </h1>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl font-light drop-shadow-md">
                        Experience the synergy of rare botanicals and clinical efficacy for ageless, radiant skin.
                    </p>
                    <Link to="/shop" className="bg-[#c2a679] hover:bg-[#b09467] text-white px-10 py-4 uppercase tracking-widest text-sm transition font-medium backdrop-blur-sm shadow-xl">
                        Explore the Collection
                    </Link>
                </div>
            </section>
        </main>
    );
}
