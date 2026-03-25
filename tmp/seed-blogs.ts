import mongoose from 'mongoose';
import BlogPost from '../src/models/BlogPost';
import User from '../src/models/User';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find an admin user to assign as author
    const admin = await User.findOne({ role: { $in: ['admin', 'superadmin'] } });
    if (!admin) {
        console.log('No admin user found. Please create one first.');
        process.exit(1);
    }

    const blogs = [
        {
            title: "The Art of Invisible Design: Why User Experience Matters More Than UI",
            slug: "the-art-of-invisible-design",
            excerpt: "Explore the psychological principles behind micro-interactions and why the best interfaces are the ones you don't even notice.",
            content: `
## Why Invisible Design?
When we talk about great design, we often think about stunning visuals, vibrant colors, and sleek typography. But the most effective design is often the one that goes unnoticed.

### The Psychology of Speed
In the world of high-conversion agencies, every millisecond counts. If a user has to think about how to navigate your site, you've already lost them. Invisible design is about reducing cognitive load.

### Principles to Follow
1. **Consistency over Novelty**: Don't reinvent the wheel if it confuses the user.
2. **Predictable Motion**: Animations should feel natural and assist the user's focus.
3. **Feedback Loops**: Every action should have a clear, immediate reaction.

### Conclusion
Focus on the flow, not just the frame.
            `,
            category: "UI/UX",
            coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=1200",
            author: admin._id,
            authorName: admin.name,
            authorImage: admin.image || '',
            status: 'published',
            readTime: '6 min read',
            publishedAt: new Date(),
        },
        {
            title: "Scaling Your E-Commerce Brand with Next.js and Headless Shopify",
            slug: "scaling-ecommerce-nextjs-shopify",
            excerpt: "Learn how headless commerce can transform your site performance and boost conversion rates by 40% using the latest web technologies.",
            content: `
## The Power of Headless
Traditional Shopify themes are great, but for brands looking for ultimate performance and customization, headless is the clear winner.

### Why Next.js?
Next.js provides the perfect framework for SEO-friendly, blazing-fast product pages. With Incremental Static Regeneration (ISR), your catalog is always up to date without sacrificing speed.

### Key Benefits
- **Sub-second Load Times**: Happy customers buy more.
- **Extreme Customization**: Build unique shopping experiences that reflect your brand persona.
- **Future-Proofing**: Decoupling your frontend gives you flexibility as your tech stack evolves.

### Summary
If you're still on a monolithic architecture, you're leaving money on the table.
            `,
            category: "Development",
            coverImage: "https://images.unsplash.com/photo-1556742049-2e389339e0da?w=1200",
            author: admin._id,
            authorName: admin.name,
            authorImage: admin.image || '',
            status: 'published',
            readTime: '8 min read',
            publishedAt: new Date(),
        },
        {
            title: "Mastering Brand Authority in 2024: The Digital Persona Guide",
            slug: "mastering-brand-authority-2024",
            excerpt: "How to build a world-class brand identity that resonates with premium clients and commands higher value in the digital marketplace.",
            content: `
## Building Trust Through Design
Your brand is not just a logo; it's the emotional connection your customers have with your business. In 2024, that connection is built through consistent, premium digital experiences.

### The Persona Framework
Define your brand persona. Are you the 'Innovator'? The 'Trusted Advisor'? The 'Visionary'? Every design element from typography to the custom cursor should reinforce this identity.

### Actionable Steps
1. **Audit Your Visuals**: Do they look like high-ticket services?
2. **Craft Your Story**: Why do you do what you do?
3. **Refine Your Interactions**: Use magnetic buttons and smooth transitions to create a premium feel.

### Final Thoughts
Premium design attracts premium clients.
            `,
            category: "Branding",
            coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
            author: admin._id,
            authorName: admin.name,
            authorImage: admin.image || '',
            status: 'published',
            readTime: '7 min read',
            publishedAt: new Date(),
        }
    ];

    await BlogPost.deleteMany({}); // Optional: clear existing
    await BlogPost.insertMany(blogs);
    console.log('Seeded 3 blogs successfully');

    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
