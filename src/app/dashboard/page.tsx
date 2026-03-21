"use client";

import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Activity, 
  Globe, 
  MapPin, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  BarChart3, 
  Terminal,
  Cpu,
  Clock
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DashboardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [latency, setLatency] = useState(12);
  const [throughput, setThroughput] = useState(94.2);

  useGSAP(() => {
    gsap.from(".dash-card", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });

    const timer = setInterval(() => {
      setLatency(prev => +(prev + (Math.random() - 0.5)).toFixed(1));
      setThroughput(prev => +(prev + (Math.random() - 0.5)).toFixed(1));
    }, 2000);

    return () => clearInterval(timer);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-stone-50 font-sans pt-32">
      <Navbar />
      
      <div className="max-w-[1600px] mx-auto px-12 pb-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#D9FB3F] animate-pulse"></div>
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-stone-400">Operations: Online</span>
            </div>
            <h1 className="text-6xl font-display font-black italic uppercase tracking-tighter">System Analytics</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white border border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-stone-900 transition-all">Export Telemetry</button>
            <button className="px-8 py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-stone-900/20">Secure Link</button>
          </div>
        </div>

        {/* Top Grid: Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Nodes", value: "1,248", icon: <Globe className="w-5 h-5 text-[#D9FB3F]" />, delta: "+12%" },
            { label: "System Throughput", value: `${throughput} GB/S`, icon: <Zap className="w-5 h-5 text-[#00D4FF]" />, delta: "+2.4%" },
            { label: "Average Latency", value: `${latency} MS`, icon: <Activity className="w-5 h-5 text-[#FF4D00]" />, delta: "-0.5ms" },
            { label: "Vault Security", value: "99.9%", icon: <Shield className="w-5 h-5 text-stone-900" />, delta: "LOCKED" },
          ].map((stat, i) => (
            <div key={i} className="dash-card bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-stone-50 rounded-2xl group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-[#D9FB3F] px-3 py-1 bg-[#D9FB3F]/10 rounded-full">{stat.delta}</span>
              </div>
              <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">{stat.label}</div>
              <div className="text-3xl font-display font-black tracking-tighter italic">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Middle Grid: Map & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="dash-card col-span-2 bg-stone-900 rounded-[3rem] p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-white text-3xl font-display font-black italic uppercase tracking-tight">Global Operations Map</h3>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-stone-800 rounded-xl text-[9px] font-black text-stone-400 uppercase tracking-widest">Live Feed</div>
                </div>
              </div>
              
              {/* Simulated Map Grid */}
              <div className="grid grid-cols-12 gap-2 opacity-20">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className={`h-8 rounded-sm ${i % 7 === 0 ? "bg-[#D9FB3F]" : "bg-stone-700"} transition-all duration-1000`} style={{ opacity: Math.random() }}></div>
                ))}
              </div>

              <div className="mt-12 flex justify-between items-end">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-[#D9FB3F]" /> Active Hubs
                  </div>
                  <div className="text-4xl text-white font-display font-black italic">42 REGIONS</div>
                </div>
                <button className="p-6 bg-[#D9FB3F] rounded-3xl text-stone-950 hover:scale-110 transition-transform shadow-xl shadow-[#D9FB3F]/20">
                  <Globe className="w-6 h-6" />
                </button>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D9FB3F]/5 blur-[120px] pointer-events-none"></div>
          </div>

          <div className="dash-card bg-white rounded-[3rem] p-12 border border-stone-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-display font-black italic uppercase tracking-tight mb-8">System Health</h3>
              <div className="space-y-8">
                {[
                  { label: "Core Logic", percentage: 94, color: "bg-[#D9FB3F]" },
                  { label: "Neural Flow", percentage: 82, color: "bg-[#00D4FF]" },
                  { label: "Data Integrity", percentage: 100, color: "bg- stone-900" },
                ].map((bar, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-stone-500">
                      <span>{bar.label}</span>
                      <span>{bar.percentage}%</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className={`h-full ${bar.color} transition-all duration-1000`} style={{ width: `${bar.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 p-6 bg-stone-50 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-stone-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">Recent Tasks</span>
              </div>
              <div className="space-y-2">
                {['Registry update complete', 'Node 04 optimization', 'Encryption protocol cycled'].map((log, i) => (
                  <div key={i} className="text-[10px] font-bold text-stone-600 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid: Advanced Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="dash-card col-span-3 bg-white rounded-[3rem] p-12 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-stone-900 rounded-2xl">
                  <BarChart3 className="w-6 h-6 text-[#D9FB3F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black italic uppercase tracking-tight">Performance Stream</h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Real-time Telemetry Data</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['1H', '1D', '1W'].map(t => (
                  <button key={t} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${t === '1H' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400 hover:text-stone-900'}`}>{t}</button>
                ))}
              </div>
            </div>
            
            {/* Highly Complex SVG Chart Design */}
            <div className="h-64 relative overflow-hidden flex items-end gap-[4px]">
              {Array.from({ length: 60 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-stone-100 rounded-full transition-all duration-700 hover:bg-[#D9FB3F]" 
                  style={{ height: `${20 + Math.random() * 80}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="dash-card bg-[#D9FB3F] rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <Cpu className="w-12 h-12 text-stone-950" />
                <h3 className="text-3xl font-display font-black tracking-tighter leading-none italic uppercase">Compute Status</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-stone-900 opacity-60">
                   <Clock className="w-3 h-3" /> Uptime: 99.99d
                </div>
                <button className="w-full py-6 bg-stone-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] group-hover:bg-black transition-all flex items-center justify-center gap-2">
                  Deploy Master <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DashboardPage;
