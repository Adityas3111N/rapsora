import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ExpertiseSection } from '@/components/sections/expertise-section';
import { WorkSection } from '@/components/sections/work-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { BlogSection } from '@/components/sections/blog-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <WorkSection />
            <ExpertiseSection />
            <TestimonialsSection />
            <CtaSection />
            <BlogSection />
        </main>
    );
}
