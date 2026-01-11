import { Hero, MetricsTicker, SectionPreview, TechStackPreview } from "@/components/sections";
import { Navbar, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Metrics Ticker */}
        <MetricsTicker />

        {/* Research & Engineering Preview */}
        <SectionPreview />

        {/* Tech Stack */}
        <TechStackPreview />
      </main>
      <Footer />
    </>
  );
}

