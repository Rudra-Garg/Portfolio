import { Hero, TechStackPreview } from "@/components/sections";
import { Experience, FeaturedEngineering, ResearchHighlights } from "@/components/sections/CareerHighlights";
import { Navbar, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Global Background Layer - REMOVED, now inside Hero */}

      {/* Content Layer - relative z-10 ensures it sits above the fixed canvas */}
      <main className="relative z-10">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          <div className="relative">
            <Experience />
            <FeaturedEngineering />
            <ResearchHighlights />
            <TechStackPreview />
          </div>
        </div>
      </main>

      {/* Footer Layer */}
      <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
        <Footer />
      </div>
    </>
  );
}
