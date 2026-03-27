import { notFound } from 'next/navigation';
import Link from 'next/link';
import { extractInitials } from '@/lib/utils';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { BLOG_POSTS, IBlogPost } from '@/data/blogs';
import ReadingProgress from '@/components/shared/reading-progress'; // I'll create this or add it here

async function getBlogPost(slug: string) {
    // Try mock data first for speed and reliability in this dev context
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (post) return post;
    return null;
}

async function getRelatedPosts(category: string, currentSlug: string) {
    return BLOG_POSTS
        .filter(p => p.category === category && p.slug !== currentSlug)
        .slice(0, 2);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.category, post.slug);
    const initials = extractInitials(post.authorName || 'Rapsora Editor');

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
            <ReadingProgress />
            
            {/* Header Content Section */}
            <article className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                
                {/* Aside for Meta & Sharing */}
                <aside className="hidden lg:block lg:col-span-3 space-y-12 h-fit sticky top-32 pt-12">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-foreground/30 hover:text-primary transition-colors group mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        BACK TO LAB
                    </Link>

                    {/* Author Meta */}
                    <div className="space-y-6 pt-12 border-t border-foreground/10">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center border-4 border-background overflow-hidden shadow-2xl">
                             {post.authorImage ? (
                                 <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                             ) : (
                                 <span className="text-primary font-bold text-2xl">{initials}</span>
                             )}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">ENGINEERED BY</p>
                            <p className="text-[18px] font-black text-foreground">{post.authorName}</p>
                            <p className="text-[14px] text-foreground/40 leading-relaxed mt-3 font-medium">Focused on behavioral engineering and high-performance UI systems.</p>
                        </div>
                    </div>

                    {/* Social Sharing */}
                    <div className="space-y-6 pt-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20">DISTRIBUTE INSIGHT</p>
                        <div className="flex items-center gap-2">
                            {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <button key={i} className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="lg:col-span-9">
                    
                    {/* Hero Text */}
                    <header className="space-y-10 mb-16 lg:mb-24">
                        <div className="flex items-center gap-4 text-[12px] lg:text-[13px] font-black uppercase tracking-[0.3em] text-primary">
                            <span>{post.category}</span>
                            <div className="w-2 h-[2px] bg-foreground/10" />
                            <span className="text-foreground/30">{post.readTime}</span>
                        </div>

                        <h1 className="text-[40px] md:text-[60px] lg:text-[88px] leading-[0.95] font-heading font-bold tracking-tighter text-foreground max-w-[1100px]">
                            {post.title}
                        </h1>

                        <div className="max-w-[850px] border-l-[6px] border-primary pl-10 py-4 mt-12 bg-primary/[0.03] rounded-r-3xl">
                            <p className="text-2xl lg:text-3xl text-foreground font-medium italic leading-[1.4]">
                                {post.excerpt}
                            </p>
                        </div>
                    </header>

                    {/* Cover Image */}
                    <div className="relative w-full aspect-[21/9] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden bg-foreground/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] mb-24">
                        <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover scale-105"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="max-w-[850px] mx-auto lg:mx-0 w-full">
                        <div 
                            className="prose prose-invert prose-stone max-w-none text-foreground/80 leading-[1.9] text-[18px] lg:text-[21px] font-medium space-y-10 whitespace-pre-line"
                        >
                            {post.content}
                        </div>

                        {/* Article Footer */}
                        <div className="mt-32 p-12 lg:p-16 rounded-[3rem] bg-foreground text-background flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32" />
                           <div className="relative z-10 space-y-4">
                               <h4 className="text-3xl lg:text-4xl font-black tracking-tight leading-none">Engineering<br />desire at scale.</h4>
                               <p className="text-background/60 font-medium">Join 22k+ readers obsessed with high-conversion design.</p>
                           </div>
                           <Link 
                                href="/diagnostic"
                                className="relative z-10 shrink-0 px-10 py-5 rounded-full bg-primary text-white font-black text-lg tracking-tight hover:scale-105 transition-all shadow-2xl flex items-center gap-4"
                            >
                                Get Growth Blueprint
                                <ArrowUpRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                </div>
            </article>

            {/* Next Articles / Related */}
            {relatedPosts.length > 0 && (
                <section className="mt-40 py-32 bg-foreground/[0.02] border-t border-foreground/5">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                            <div>
                                <p className="text-[12px] font-black uppercase tracking-[0.3em] text-primary mb-4">RECOMMENDED INSIGHTS</p>
                                <h2 className="text-4xl lg:text-6xl font-heading font-black tracking-tighter">More from the lab.</h2>
                            </div>
                            <Link href="/blog" className="group flex items-center gap-4 text-sm font-black tracking-[0.2em] uppercase text-foreground/40 hover:text-primary transition-colors">
                                ALL ANALYTICS <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                           {relatedPosts.map((relatedPost: any) => (
                               <Link key={relatedPost._id.toString()} href={`/blog/${relatedPost.slug}`} className="group block space-y-8">
                                   <div className="relative w-full aspect-[16/10] rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-foreground/5">
                                       <img 
                                           src={relatedPost.coverImage} 
                                           alt={relatedPost.title} 
                                           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                       />
                                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                   </div>
                                   <div className="space-y-4">
                                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{relatedPost.category}</p>
                                        <h3 className="text-3xl lg:text-4xl font-heading font-bold text-foreground transition-colors group-hover:text-primary leading-tight">
                                            {relatedPost.title}
                                        </h3>
                                   </div>
                               </Link>
                           ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
