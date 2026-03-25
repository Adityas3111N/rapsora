import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import { extractInitials } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

async function getBlogPost(slug: string) {
    try {
        await dbConnect();
        const post = await BlogPost.findOne({ slug, status: 'published' }).lean();
        return post;
    } catch (error) {
        return null;
    }
}

async function getRelatedPosts(category: string, currentId: string) {
    try {
        const posts = await BlogPost.find({ 
            category, 
            _id: { $ne: currentId },
            status: 'published'
        }).limit(2).lean();
        return posts;
    } catch (error) {
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.category, post._id.toString());
    const initials = extractInitials(post.authorName || 'Rapsora Editor');

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
            {/* Header Content Section */}
            <article className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                
                {/* Fixed/Sticky Aside for Meta & Sharing (Desktop Only) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-12">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors group mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        BACK TO BLOG
                    </Link>

                    {/* Author Meta */}
                    <div className="space-y-4 pt-12 border-t border-foreground/5">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-4 border-background overflow-hidden shadow-lg shadow-primary/5">
                             {post.authorImage ? (
                                 <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                             ) : (
                                 <span className="text-primary font-bold text-xl">{initials}</span>
                             )}
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">AUTHOR</p>
                            <p className="text-[16px] font-bold text-foreground">{(post as any).authorName || 'Aditya Singh'}</p>
                            <p className="text-[13px] text-foreground/40 leading-relaxed mt-2 font-medium">Design Lead & Strategist at Rapsora, specialized in world-class UX.</p>
                        </div>
                    </div>

                    {/* Social Sharing */}
                    <div className="space-y-4 pt-4">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/20">SHARE THIS ARTICLE</p>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-12 lg:space-y-20">
                    
                    {/* Hero Text */}
                    <header className="space-y-8 lg:space-y-10">
                        <div className="flex items-center gap-4 text-[13px] lg:text-[14px] font-bold uppercase tracking-widest text-primary">
                            <span>{post.category}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                            <span className="text-foreground/40 italic">{post.readTime || '7 min read'}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[75px] leading-[1.05] font-heading font-medium tracking-tighter text-foreground max-w-[1000px]">
                            {post.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-foreground/60 leading-[1.5] max-w-[800px] font-medium border-l-4 border-primary pl-8 py-2">
                            {post.excerpt}
                        </p>
                    </header>

                    {/* Cover Image */}
                    <div className="relative w-full aspect-[21/9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-foreground/5 shadow-2xl">
                        <img 
                            src={post.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600'} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blog Content (World-class typography) */}
                    <div className="max-w-[800px] mx-auto lg:mx-0 w-full">
                        <div 
                            className="prose prose-invert prose-lg md:prose-xl max-w-none text-foreground/80 leading-[1.85] font-serif space-y-8 whitespace-pre-line"
                        >
                            {/* In a real scenario, we'd use react-markdown here */}
                            {post.content}
                        </div>

                        {/* Article Footer / Newsletter CTA Lite */}
                        <div className="mt-24 pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center font-bold text-lg">
                                    R
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Want more world-class insights?</p>
                                    <p className="text-sm text-foreground/40 font-medium">Join 22,000+ readers of the Rapsora Bulletin.</p>
                                </div>
                            </div>
                            <Link 
                                href="/blog#newsletter"
                                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-tight hover:scale-105 transition-all shadow-lg"
                            >
                                Get the Bulletin
                            </Link>
                        </div>
                    </div>

                </div>
            </article>

            {/* Next Articles / Related */}
            {relatedPosts.length > 0 && (
                <section className="mt-32 pt-24 border-t border-foreground/5 bg-foreground/[0.02]">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-3xl lg:text-5xl font-heading font-medium tracking-tight">Enjoyed this? Read more.</h2>
                            <Link href="/blog" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">ALL POSTS</Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 pb-32">
                           {relatedPosts.map((relatedPost: any) => (
                               <Link key={relatedPost._id.toString()} href={`/blog/${relatedPost.slug}`} className="group block space-y-6">
                                   <div className="relative w-full aspect-[3/2] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-foreground/5">
                                       <img 
                                           src={relatedPost.coverImage} 
                                           alt={relatedPost.title} 
                                           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                       />
                                   </div>
                                   <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground transition-colors group-hover:text-primary">
                                       {relatedPost.title}
                                   </h3>
                               </Link>
                           ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
