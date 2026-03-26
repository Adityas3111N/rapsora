import { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about/about-hero';
import { AboutIntro } from '@/components/sections/about/about-intro';
import { AboutBranding } from '@/components/sections/about/about-branding';
import { AboutCapabilities } from '@/components/sections/about/about-capabilities';
import { AboutTeam } from '@/components/sections/about/about-team';
import { AboutCulture } from '@/components/sections/about/about-culture';

export const metadata: Metadata = {
    title: 'About Us | Rapsora',
    description: 'Hooking hearts, winning minds. Learn the story behind the agency that prioritizes growth over ego.',
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-background overflow-hidden px-0">
            <div className="pt-20">
                <AboutHero />
                <AboutIntro />
                <AboutBranding />
                <AboutCapabilities />
                <AboutTeam />
                <AboutCulture />
            </div>
            {/* Additional sections will be added here one by one */}
        </main>
    );
}
