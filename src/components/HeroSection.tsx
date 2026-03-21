"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StatsCard from "./StatsCard";
import { CheckCircle2, Loader2, Sparkles, Gauge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const tireLeftRef = useRef<SVGPolylineElement>(null);
  const tireRightRef = useRef<SVGPolylineElement>(null);
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const headlineText = "WELCOME ITZFIZZ";

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      tl.set(containerRef.current, { visibility: "visible" })
        .from(".char", {
          z: 300,
          rotateY: 90,
          rotateX: 45,
          opacity: 0,
          stagger: {
            each: 0.04,
            from: "start"
          },
          duration: 1.8,
          ease: "expo.out",
        })
        .from(".stats-card", {
          y: 80,
          z: -100,
          rotateX: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=1.2")
        .from(carRef.current, {
          x: "-150vw",
          duration: 2.5,
          ease: "power4.out",
        }, "-=1.5")
        .from(".speedometer-ui", {
          opacity: 0,
          scale: 0.5,
          duration: 1,
        }, "-=0.5");

      // Scroll Animation logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          // Direct DOM updates for Speedometer performance
          const velocity = self.getVelocity();
          const velRatio = Math.abs(velocity / 30);
          const cappedVel = Math.min(velRatio, 320);
          
          if (speedRef.current) speedRef.current.innerText = Math.round(cappedVel).toString();
          if (needleRef.current) needleRef.current.style.transform = `rotate(${cappedVel - 120}deg) translateY(-4px)`;

          // Velocity-Steer (Drift) Rotation
          // Calculate drift based on velocity direction and magnitude
          const drift = (velocity / 500); 
          gsap.to(carRef.current, { 
            rotation: 4 + drift, 
            duration: 0.5, 
            overwrite: "auto",
            ease: "power2.out"
          });

          // Dynamic Tire Marks Logic
          const progress = self.progress;
          const xPos = -150 + (progress * 265); // Mapping x progress to match car x: 115vw logic
          
          if (tireLeftRef.current && tireRightRef.current) {
            const currentPointsL = tireLeftRef.current.getAttribute("points") || "";
            const currentPointsR = tireRightRef.current.getAttribute("points") || "";
            
            // Add point only if moving
            if (Math.abs(velocity) > 10) {
              const newPointL = `${progress * 100},45 `;
              const newPointR = `${progress * 100},55 `;
              tireLeftRef.current.setAttribute("points", currentPointsL + newPointL);
              tireRightRef.current.setAttribute("points", currentPointsR + newPointR);
            }
          }
        },
      });

      // Car Movement
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
        x: "115vw",
        scale: 1.08,
      });

      // Parallax & Fade for Headline
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        y: -180,
        opacity: 0.02,
        scale: 0.85,
        rotateX: 15,
      });
    },
    { scope: containerRef }
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[500vh] bg-[#fdfdfd] overflow-visible font-sans perspective-1000"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-visible">
        
        {/* The Kinetic Road Strip - Higher Contrast like Reference */}
        <div className="absolute w-full h-[40vh] bg-[#22C55E] flex items-center justify-center shadow-[0_40px_100px_rgba(34,197,94,0.3)] overflow-hidden">
          
          {/* Moving Motion Particles for Speed Feel */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             {Array.from({ length: 20 }).map((_, i) => (
               <div key={i} className="absolute h-px bg-white animate-pulse" style={{ width: Math.random() * 200 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animationDelay: Math.random() * 2 + 's' }}></div>
             ))}
          </div>

          {/* SVG Tire Marks - Dynamic Polyline */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline ref={tireLeftRef} points="" fill="none" stroke="black" strokeWidth="0.5" strokeDasharray="1,2" />
            <polyline ref={tireRightRef} points="" fill="none" stroke="black" strokeWidth="0.5" strokeDasharray="1,2" />
          </svg>

          {/* 3D Kinetic Headline - Scaled Down for full Visibility */}
          <h1 
            ref={headlineRef}
            className="text-[7.5vw] font-display font-black text-black pointer-events-none select-none z-10 leading-none whitespace-nowrap flex gap-[0.3em] transform-style-3d px-[4vw]"
          >
            {headlineText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="flex">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="char inline-block tracking-[0.15em] origin-bottom">{char}</span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Floating Velocity Speedometer */}
        <div className="speedometer-ui absolute top-24 left-12 z-[101] bg-white/90 text-stone-950 p-6 rounded-[2rem] shadow-2xl flex items-center gap-6 border border-white/50 backdrop-blur-xl transition-all hover:scale-105">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Gauge className="w-full h-full text-stone-200" strokeWidth={1} />
            <div 
              ref={needleRef}
              className="absolute w-1 h-8 bg-[#22C55E] origin-bottom rounded-full transition-transform duration-75 ease-out"
              style={{ transform: `rotate(-120deg) translateY(-4px)` }}
            ></div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1">Velocity</div>
            <div className="flex items-baseline gap-1">
              <span ref={speedRef} className="text-3xl font-black font-display tracking-tighter italic">0</span>
              <span className="text-[10px] font-bold text-stone-400">KM/H</span>
            </div>
          </div>
        </div>

        {/* Impact Metrics Cascade - Inset from corners for full Visibility */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-24 px-[6vw]">
          <div className="flex justify-between items-start w-full">
            <StatsCard 
              percentage="58%" 
              description={"Increase in\npick up point use"} 
              bgColor="bg-[#D9FB3F] text-stone-950 shadow-[0_30px_60px_-10px_rgba(217,251,63,0.5)]"
              className="-rotate-3"
            />
            <StatsCard 
              percentage="27%" 
              description={"Increase in\npick up point use"} 
              bgColor="bg-stone-900 text-white shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)]"
              className="rotate-3 mt-12"
            />
          </div>
          
          <div className="flex justify-between items-end w-full">
            <StatsCard 
              percentage="23%" 
              description={"Decreased in\ncustomer phone calls"} 
              bgColor="bg-[#00D4FF] text-stone-950 shadow-[0_30px_60px_-10px_rgba(0,212,255,0.5)]"
              className="rotate-3 mb-12"
            />
            <StatsCard 
              percentage="40%" 
              description={"Decreased in\ncustomer phone calls"} 
              bgColor="bg-[#FF4D00] text-white shadow-[0_30px_60px_-10px_rgba(255,77,0,0.5)]"
              className="-rotate-6"
            />
          </div>
        </div>

        {/* High-Fidelity Car Visual */}
        <div 
          ref={carRef}
          className="absolute z-30 w-[300px] md:w-[720px] pointer-events-none -ml-[150px] md:-ml-[360px] drop-shadow-[0_60px_100px_rgba(0,0,0,0.3)]"
          style={{ willChange: "transform" }}
        >
          <Image 
            src="/car_new.png" 
            alt="Orange McLaren" 
            width={1400} 
            height={700} 
            className="rotate-90 object-contain"
            priority
          />
        </div>

        {/* Complex Interaction: Early Access Vault - Elevated Z-Index */}
        <div className="absolute bottom-12 right-12 z-[100] pointer-events-auto bg-white/95 backdrop-blur-3xl p-8 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-white/50 w-96 group transition-all duration-700 hover:translate-y-[-10px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-100 rounded-2xl group-hover:bg-[#D9FB3F] transition-colors duration-500 shadow-sm">
                <Sparkles className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.25em] text-stone-900">Velocity Vault</h4>
                <p className="text-[9px] font-bold text-stone-400 mt-0.5">EST. MAR 2026</p>
              </div>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-[#D9FB3F] animate-ping"></div>
          </div>
          
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                name="email"
                id="email-input"
                placeholder="Secure Email Access" 
                className="w-full px-6 py-5 rounded-[1.5rem] bg-stone-50 border border-stone-100 text-sm focus:ring-4 focus:ring-[#D9FB3F]/20 focus:border-[#D9FB3F] transition-all outline-none font-bold placeholder:text-stone-300 text-stone-900 cursor-text relative z-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                autoFocus={false}
              />
            </div>
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-stone-900 text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all flex justify-center items-center gap-4 shadow-2xl active:scale-95 disabled:opacity-50 overflow-hidden relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
              {status === "idle" && (
                <>Authorize <span className="text-stone-500 transition-transform group-hover:translate-x-2">→</span></>
              )}
              {status === "loading" && (
                <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
              )}
              {status === "success" && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#D9FB3F]" />
                  <span>Access Granted</span>
                </div>
              )}
              {status === "error" && <span>Retry Access</span>}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Persistence: Active</span>
            <div className="flex gap-1">
              {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-stone-200 rounded-full"></div>)}
            </div>
          </div>
        </div>

      </div>
      
      {/* Velocity Progress Bar */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-12 flex flex-col gap-4 z-40"
      >
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D9FB3F] animate-pulse"></div>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-stone-400">System Ready</span>
          </div>
          <div className="w-32 h-[4px] bg-stone-100 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-[#D9FB3F] animate-progress-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
