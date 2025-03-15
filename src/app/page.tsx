"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StructureSection } from "@/components/structure-section";
import { PrizesSection } from "@/components/prizes-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StructureSection />
      <PrizesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
