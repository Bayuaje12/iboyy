import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import TechMarquee from "@/components/TechMarquee";
import StatsSection from "@/components/StatsSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Site */}
      {!loading && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <PartnersSection /> {/* Section Partners ditambahkan di sini */}
            <TechMarquee />
            <StatsSection />
            <ContactFooter />
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
