export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    metric: string;
    metricLabel: string;
    description: string;
    image: string;
    link: string;
    color: string;
}

export const PROJECTS: Project[] = [
    {
        id: 'aether-studio',
        title: 'Aether Studio',
        subtitle: 'Crafting a bold identity for a luxury fashion house',
        category: 'Branding & Editorial Design',
        metric: '↑ 340%',
        metricLabel: 'Organic Traffic Increase',
        description: 'We created a sophisticated digital ecosystem for Aether Studio, focusing on minimalist aesthetics and high-conversion storytelling for their luxury fashion collections.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop',
        link: '/work/aether-studio',
        color: '#FFFFFF' // White/Neutral
    },
    {
        id: 'horizon-estates',
        title: 'Horizon Estates',
        subtitle: 'Designing an immersive property experience',
        category: 'Real Estate & UI/UX',
        metric: '↑ 2.8x',
        metricLabel: 'Conversion Rate',
        description: 'A complete overhaul of the property search experience, utilizing immersive visuals and intuitive navigation to drive high-intent lead generation in the luxury real estate market.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
        link: '/work/horizon-estates',
        color: '#10B981' // Green
    },
    {
        id: 'volt-studios',
        title: 'Volt Studios',
        subtitle: 'A workspace consultancy creating inspiring environments',
        category: 'Workspace Design & Branding',
        metric: '↑ 185%',
        metricLabel: 'Lead Generation',
        description: 'Engineering a vibrant digital presence for Volt Studios, connecting their world-class workspace design services with corporate partners through behavioral-led design.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
        link: '/work/volt-studios',
        color: '#FABB05' // Yellow
    },
    {
        id: 'nexus-global',
        title: 'Nexus Global',
        subtitle: 'Redefining a leading global talent group',
        category: 'Corporate Branding & Web',
        metric: '↑ 420%',
        metricLabel: 'User Engagement',
        description: 'A global scale redesign for Nexus Global, creating a unified digital identity that resonates across multiple continents and talent sectors.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop',
        link: '/work/nexus-global',
        color: '#6366F1' // Indigo
    },
    {
        id: 'lumina-fintech',
        title: 'Lumina FinTech',
        subtitle: 'Scaling Digital Banking for Gen-Z',
        category: 'FinTech & Product Design',
        metric: '+142%',
        metricLabel: 'User Retention Boost',
        description: 'We rebuilt their mobile experience from the ground up, reducing friction and turning a $2M seed into a $12M Series A.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        link: '/work/lumina-fintech',
        color: '#3B82F6' // Blue
    },
    {
        id: 'aura-skincare',
        title: 'Aura Skincare',
        subtitle: 'DTC Transformation & Storytelling',
        category: 'E-commerce & Conversion',
        metric: '3.8x',
        metricLabel: 'ROAS Increase',
        description: 'Through cinematic visual hierarchy and psychology-driven UX, we turned a struggling brand into a social media powerhouse.',
        image: 'https://images.unsplash.com/photo-1556228578-8c7c0f443a02?q=80&w=1974&auto=format&fit=crop',
        link: '/work/aura-skincare',
        color: '#F472B6' // Pink
    }
];
