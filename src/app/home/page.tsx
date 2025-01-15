
import { FeaturesSection } from '@/components/modules/home/featuresSection';
import { LatestArticlesSection } from '@/components/modules/home/latestArticlesSection';
import { LatestTutorialsSection } from '@/components/modules/home/latestTutorialsSection';
import StackSection from '@/components/modules/home/stackSection';
import SubscribeSection from '@/components/modules/subscribe/subscribeSection';
// import HeroSection from '../../components/modules/home/hero';
import { LatestServicesSection } from '@/components/modules/home/latestServicesSection';
import { Hero2Section } from '@/components/modules/home/hero2';
// import { LatestCoursesSection } from '@/components/modules/home/latestCoursesSection';

export default function HomePages() {
  return (
    <>
      {/* <HeroSection /> */}
      <Hero2Section />
      <FeaturesSection />
      <LatestTutorialsSection />
      <LatestServicesSection />
      <LatestArticlesSection />
      <SubscribeSection />
    </>
  );
}
