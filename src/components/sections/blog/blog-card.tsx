'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { extractInitials } from '@/lib/utils';
import { IBlogPost } from '@/models/BlogPost';

interface BlogCardProps {
    post: Partial<IBlogPost>; // Accepting partial so frontend can work with raw generic objects
    idx: number;
}

export function BlogCard({ post, idx }: BlogCardProps) {
    const authorImage = post.authorImage || '';
    const nameInitials = extractInitials(post.authorName || 'Rapsora Editor');

    return (
        <Link href={`/blog/${post.slug}`} className="group block w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                className="flex flex-col group cursor-pointer w-full"
            >
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[1.6] mb-6 sm:mb-8 overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-foreground/5 isolate">
                    
                    {/* Main Thumbnail Image */}
                    <img 
                        src={post.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop'} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />

                    {/* Avatar Cutout shape -> bottom left */}
                    {/* We achieve the 'cutout' effect by nesting the avatar in an absolute container with bg-background mimicking a cutout shape */}
                    <div className="absolute bottom-0 left-0 w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-background rounded-tr-[1.5rem] lg:rounded-tr-[2rem] flex items-end justify-start pr-3 pt-3">
                        <div className="w-[56px] h-[56px] lg:w-[72px] lg:h-[72px] -mb-2 overflow-hidden rounded-[1rem] lg:rounded-[1.2rem] bg-primary/10 flex items-center justify-center border-4 border-background shrink-0 text-primary font-bold text-lg">
                            {authorImage ? (
                                <img src={authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                            ) : (
                                <span>{nameInitials}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Read Time & Metadata */}
                <div className="flex items-center gap-2 text-foreground/60 text-[13px] sm:text-[14px] mb-3 ml-2 lg:ml-0 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
                    <span>{post.readTime || '5 min read'}</span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary pr-4 ml-2 lg:ml-0">
                    {post.title}
                </h3>
            </motion.div>
        </Link>
    );
}
