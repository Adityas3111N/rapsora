import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { StatsSection } from '@/components/sections/stats-section';
import { WorkSection } from '@/components/sections/work-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ProcessSection } from '@/components/sections/process-section';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <WorkSection />
            <TestimonialsSection />
            <ProcessSection />
        </main>
    );
}
