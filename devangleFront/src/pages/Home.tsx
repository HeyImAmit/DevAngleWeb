// src/pages/Home.tsx (or Landing.tsx, as your main "/")
"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { BlogTemplatesSection } from "@/components/landing/BlogTemplatesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BlogTemplatesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </> 
  );
}
