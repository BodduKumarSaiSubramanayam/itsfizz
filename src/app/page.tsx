import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <HeroSection />
      
      {/* Visual Break / Separator */}
      <section className="bg-stone-950 py-32 px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D9FB3F]"></div>
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-stone-500">System Core</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white italic leading-none uppercase tracking-tighter">
              The Architecture <br />
              <span className="text-[#D9FB3F]">of Velocity.</span>
            </h2>
          </div>
          <p className="text-xl text-stone-400 font-medium leading-relaxed max-w-sm">
            Experience the future of digital motion where every scroll, click, and transition is engineered for absolute fluidity.
          </p>
        </div>
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D9FB3F]/5 blur-[120px] pointer-events-none"></div>
      </section>

      <FeatureSection />

      <Footer />
    </main>
  );
}
