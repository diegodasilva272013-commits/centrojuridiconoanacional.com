import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Includes from "@/components/Includes";
import ForWho from "@/components/ForWho";
import Price from "@/components/Price";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import Divider from "@/components/Divider";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Video */}
      <Divider />
      <VideoSection />

      {/* 3. Incluye */}
      <Divider />
      <Includes />

      {/* 4. Para quién */}
      <Divider />
      <ForWho />

      {/* 5. Precio */}
      <Divider />
      <Price />

      {/* 6. FAQ */}
      <Divider />
      <FAQ />

      {/* 7. CTA Final */}
      <FinalCTA />

      {/* 8. Footer */}
      <Footer />

      {/* Sticky mobile CTA */}
      <StickyWhatsApp />
    </main>
  );
}
