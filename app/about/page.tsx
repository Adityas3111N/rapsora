import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutHero } from '@/components/sections/about/about-hero';

export const metadata: Metadata = {
    title: 'About Us | Rapsora',
    description: 'Hooking hearts, winning minds. Learn the story behind the agency that prioritizes growth over ego.',
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-background overflow-hidden px-0">
            <Header />
            <div className="pt-20">
                <AboutHero />
            </div>
            {/* Additional sections will be added here one by one */}
            <Footer />
        </main>
    );
}
