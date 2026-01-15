import { Hero, MetricsTicker, SectionPreview, TechStackPreview, NetworkBackground } from "@/components/sections";
import { Navbar, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Global Background Layer */}
      <NetworkBackground />

      {/* Content Layer - relative z-10 ensures it sits above the fixed canvas */}
      <main className="relative z-10">
        <Hero />
        <MetricsTicker />
        <SectionPreview />
        <TechStackPreview />
      </main>

      {/* Footer Layer */}
      <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
        <Footer />
      </div>
    </>
  );
}