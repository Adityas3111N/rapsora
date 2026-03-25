import { BlogHero } from '@/components/sections/blog/blog-hero';
import { BlogCard } from '@/components/sections/blog/blog-card';
import { NewsletterCTA } from '@/components/sections/blog/newsletter-cta';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// Temporary mock DB fetcher to populate UI before admin sets up data
async function getPosts() {
    try {
        // await dbConnect();
        // const posts = await BlogPost.find({ status: 'published' }).sort({ createdAt: -1 });
        // if (posts.length > 0) return posts;
        
        // Fallback mock payload (World-class seed data)
        return [
            {
                _id: '1',
                title: 'Shape\'s Christmas Party: A Night in Dublin',
                coverImage: 'https://images.unsplash.com/photo-1543269664-56d56637e6f8?w=800&fit=crop',
                authorName: 'Aditya Singh',
                authorImage: '', // Will fallback to AS
                readTime: '6 min read',
                category: 'news & culture',
            },
            {
                _id: '2',
                title: 'Why Every Agency Should Give Their Team Two Weeks Off',
                coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop',
                authorName: 'Rohan Sharma',
                authorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
                readTime: '9 min read',
                category: 'branding',
            },
            {
                _id: '3',
                title: 'Best Video Editing Automation Tools Every Modern Marketer Needs',
                coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop',
                authorName: 'Sarah Davis',
                authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                readTime: '3 min read',
                category: 'web development',
            },
            {
                _id: '4',
                title: 'Best SMS Marketing Platform for Ecommerce',
                coverImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&fit=crop',
                authorName: 'Aditya Singh',
                authorImage: '',
                readTime: '7 min read',
                category: 'archive',
            },
            {
                _id: '5',
                title: 'The Importance of Data Storage in Digital Marketing Strategies',
                coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop',
                authorName: 'Alex Morgan',
                readTime: '6 min read',
                category: 'web design',
            },
            {
                _id: '6',
                title: 'Migrating from Webflow to Custom Next.js: The Agency Guide',
                coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop',
                authorName: 'Rohan Sharma',
                readTime: '16 min read',
                category: 'web development',
            }
        ];
    } catch (e) {
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();
    
    // Split for visual rhythm: Top 3 row, then Grid
    const featuredPosts = posts.slice(0, 3);
    const standardPosts = posts.slice(3);

    return (
        <main className="min-h-screen pt-24 pb-16 bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
            <BlogHero />
            
            {/* Featured Posts Row (3 items across) */}
            <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {featuredPosts.map((post: any, idx) => (
                        <BlogCard key={post._id} post={post} idx={idx} />
                    ))}
                </div>
            </section>

            {/* Subscriptions Block */}
            <NewsletterCTA />

            {/* Standard Grid */}
            <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] mb-16 lg:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 gap-y-16 lg:gap-y-24">
                    {standardPosts.map((post: any, idx) => (
                        <BlogCard key={post._id} post={post} idx={idx + 3} />
                    ))}
                </div>
            </section>
            
            {/* Pagination / Future dynamic loader block */}
            <div className="w-full flex justify-center items-center gap-4 pb-24">
                <div className="flex bg-foreground/5 rounded-full px-2 py-1 items-center font-medium">
                    <button className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center m-1">1</button>
                    <button className="w-10 h-10 rounded-full hover:bg-foreground/10 text-foreground flex items-center justify-center m-1 transition-colors">2</button>
                    <button className="w-10 h-10 rounded-full hover:bg-foreground/10 text-foreground flex items-center justify-center m-1 transition-colors">3</button>
                    <span className="mx-2 opacity-50">...</span>
                    <button className="w-10 h-10 rounded-full hover:bg-foreground/10 text-foreground flex items-center justify-center m-1 transition-colors">25</button>
                    <button className="w-10 h-10 rounded-full hover:bg-foreground/10 text-foreground flex items-center justify-center m-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

        </main>
    );
}
