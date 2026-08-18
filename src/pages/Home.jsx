import Hero from '../components/Hero';
import ServicesOverview from '../components/ServicesOverview';
import GrandOpening from '../components/GrandOpening';
import TestimonialsPreview from '../components/TestimonialsPreview';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <GrandOpening />
      <TestimonialsPreview />
      <CTASection />
      <BlogSection />
    </>
  );
}
