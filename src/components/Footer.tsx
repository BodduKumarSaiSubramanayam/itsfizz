"use client";

import React from "react";
import Link from "next/link";
import { Zap, Github, Twitter, Instagram, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white pt-32 pb-12 px-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 w-full mb-32">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="p-3 bg-[#D9FB3F] rounded-2xl">
                <Zap className="w-6 h-6 text-stone-950" />
              </div>
              <span className="text-xl font-black uppercase tracking-[0.4em]">Itzfizz</span>
            </Link>
            <p className="text-stone-500 font-medium leading-relaxed max-w-sm">
              Engineering the next generation of kinetic web experiences. Performance-first, motion-driven, future-ready.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="p-4 bg-stone-900 rounded-2xl hover:bg-[#D9FB3F] hover:text-stone-950 transition-all duration-500">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600">Operations</h4>
            <ul className="space-y-4">
              {['Network Map', 'Telemetry', 'Vault Status', 'Velocity Dashboard'].map((item) => (
                <li key={item}>
                  <Link href="/dashboard" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 group text-sm font-bold">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600">Status</h4>
            <div className="p-6 bg-stone-900/50 rounded-3xl border border-stone-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-stone-500">Core Engine</span>
                <span className="text-[9px] font-black uppercase text-[#D9FB3F]">60 FPS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-stone-500">Network</span>
                <span className="text-[9px] font-black uppercase text-[#00D4FF]">Operational</span>
              </div>
              <div className="mt-2 w-full h-[2px] bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#D9FB3F] to-[#00D4FF]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full pt-12 border-t border-stone-900 gap-8">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-stone-700">
            &copy; 2026 ITZFIZZ OS | ALL SYSTEMS GO
          </p>
          <div className="flex gap-12">
            {['Privacy', 'Legal', 'Terms'].map(item => (
              <span key={item} className="text-[10px] uppercase font-black tracking-[0.2em] text-stone-700 hover:text-stone-500 cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
