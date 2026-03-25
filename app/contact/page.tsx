import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactForm } from '@/components/sections/contact/contact-form';
import { StudioInfo } from '@/components/sections/contact/studio-info';
import { FaqAccordion } from '@/components/sections/contact/faq-accordion';

export const metadata = {
    title: 'Contact Us | RapSora Agency',
    description: 'Get in touch to work on your next award-winning digital project.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-[120px] bg-background text-foreground overflow-hidden">
            {/* 1. Nice to meet ya Hero */}
            <ContactHero />

            {/* 2. Interactive Lead Form Sequence */}
            <ContactForm />

            {/* 3. Physical Studio Presence / Trust Builder */}
            <StudioInfo />

            {/* 4. Anticipatory FAQs */}
            <FaqAccordion />
        </main>
    );
}
