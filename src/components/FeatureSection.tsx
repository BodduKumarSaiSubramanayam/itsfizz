"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, Shield, Cpu, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      duration: 1.2,
      ease: "expo.out",
    });
  }, { scope: containerRef });

  const features = [
    {
      title: "Velocity Engine",
      desc: "Optimized 60FPS animation layer for buttery smooth interactions.",
      icon: <Zap className="w-8 h-8 text-[#D9FB3F]" />,
      color: "hover:border-[#D9FB3F]/50"
    },
    {
      title: "Encrypted Vault",
      desc: "Secure multi-layer persistence to keep your registration data safe.",
      icon: <Shield className="w-8 h-8 text-[#00D4FF]" />,
      color: "hover:border-[#00D4FF]/50"
    },
    {
      title: "Kinetic UI",
      desc: "Motion-first design language that bridges humanity and machine.",
      icon: <Cpu className="w-8 h-8 text-[#FF4D00]" />,
      color: "hover:border-[#FF4D00]/50"
    }
  ];

  return (
    <section ref={containerRef} className="bg-white py-40 px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-7xl font-display font-black leading-none italic uppercase tracking-tighter">
              Edge Performance <br />
              <span className="text-stone-300">By Design.</span>
            </h2>
            <p className="text-lg text-stone-500 font-medium leading-relaxed">
              We don't just build websites. We engineer kinetic experiences that push the boundaries of modern web standards.
            </p>
          </div>
          <button className="flex items-center gap-4 px-10 py-6 bg-stone-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all group active:scale-95">
            Explore OS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`feature-card p-12 rounded-[3rem] bg-stone-50 border border-stone-100 transition-all duration-700 ${feature.color} hover:bg-white hover:shadow-2xl hover:-translate-y-4 group`}
            >
              <div className="p-5 bg-white rounded-3xl shadow-sm mb-10 w-fit group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-display font-black mb-6 italic uppercase">{feature.title}</h3>
              <p className="text-stone-500 font-medium leading-relaxed mb-10">{feature.desc}</p>
              <div className="h-[2px] w-12 bg-stone-200 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
