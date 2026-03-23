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
        id: 'take-smart',
        title: 'Take Smart',
        subtitle: 'Business Simplified.',
        category: 'Franchise Strategy & Digital Branding',
        metric: '100+',
        metricLabel: 'Franchise Locations',
        description: 'We redefined the franchise ecosystem for Mahendram Natural India, creating a scalable digital infrastructure and a world-class brand identity for their global COCO models.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        link: 'https://www.takesmarts.com',
        color: '#f47321' // Orange
    },
    {
        id: 'lumina-fintech',
        title: 'Lumina FinTech',
        subtitle: 'Scaling Digital Banking for Gen-Z',
        category: 'Product Design & Branding',
        metric: '+142%',
        metricLabel: 'User Retention Boost',
        description: 'We rebuilt their mobile experience from the ground up, reducing friction and turning a $2M seed into a $12M Series A.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        link: '/work/lumina',
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
        link: '/work/aura',
        color: '#F472B6' // Pink
    }
];
