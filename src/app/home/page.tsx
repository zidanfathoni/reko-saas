
import FaqsSection from "@/components/modules/home/faqsSection";
import { FeaturesSection } from "@/components/modules/home/featuresSection";
import { LatestArticlesSection } from "@/components/modules/home/latestArticlesSection";
import { PricingSection } from "@/components/modules/home/pricingSection";
import HeroSection from "../../components/modules/home/hero";

export default function HomePages() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <LatestArticlesSection />
      <FaqsSection />
    </>
  );
}
