import { BLOG_POSTS } from '@/data/blogs';
import { BlogHero } from '@/components/sections/blog/blog-hero';
import { BlogCard } from '@/components/sections/blog/blog-card';
import { NewsletterCTA } from '@/components/sections/blog/newsletter-cta';

// Data fetcher with filtering support
async function getPosts(category?: string) {
    try {
        // Fallback mock payload (World-class seed data)
        let posts = [...BLOG_POSTS].reverse(); // Most recent first
        
        if (category && category !== 'explore all') {
            posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        
        return posts;
    } catch (e) {
        return [];
    }
}

export default async function BlogPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ category?: string }> 
}) {
    const { category } = await searchParams;
    const posts = await getPosts(category);
    
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
