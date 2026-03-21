"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Globe, Shield } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Globe className="w-4 h-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-7xl px-6 py-4 transition-all duration-500 ${
        scrolled ? "top-4" : "top-0"
      }`}
    >
      <div 
        className={`flex items-center justify-between px-8 py-4 rounded-[2rem] border transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-2xl border-white/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-stone-900 rounded-xl group-hover:bg-[#D9FB3F] transition-colors duration-500">
            <Zap className={`w-5 h-5 transition-colors ${scrolled ? "text-white" : "text-[#D9FB3F]"} group-hover:text-stone-900`} />
          </div>
          <span className={`text-[11px] font-black uppercase tracking-[0.3em] font-display ${scrolled ? "text-stone-900" : "text-stone-700"}`}>Itzfizz OS</span>
        </Link>

        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              href={link.path}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                pathname === link.path
                  ? "bg-stone-900 text-white shadow-lg"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-stone-200 mx-2" />
          <button className="p-2.5 bg-stone-100 rounded-full hover:bg-[#D9FB3F] transition-all group">
            <Shield className="w-4 h-4 text-stone-900" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
