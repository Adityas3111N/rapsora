export interface IAuthor {
    name: string;
    avatar: string;
}

export interface IBlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    authorName: string;
    authorImage?: string;
    readTime: string;
    publishedAt: string;
}

export const BLOG_POSTS: IBlogPost[] = [
    {
        _id: '1',
        slug: 'christmas-dublin-rapsora',
        title: "Shape's Christmas Party: A Night in Dublin",
        excerpt: "It always has a feel good factor when another agency instructs us to engineer their new platform. Here is a teardown of the conversion triggers we used.",
        content: `Dubliners know how to party, but when the Rapsora team descended upon the Temple Bar area, we brought a different kind of energy. 
        
        Our annual Christmas retreat wasn't just about the Guinness; it was about reflecting on a year where we pushed the boundaries of what's possible in web engineering. From the moment we landed at Dublin Airport, the city's unique charm—a mix of historic architecture and vibrant modern life—mirrored our own design philosophy. 
        
        ### The Conversion Triggers of Dublin
        
        Why Dublin? Because the city itself is a masterclass in 'The Hook'. Every pub has a visual story. Every street performer understands audience retention. As we walked through the cobblestone streets, we identified three key elements that we've since integrated into our UI/UX frameworks:
        
        1. **Low Friction Entry**: Much like a well-designed landing page, a great Irish pub makes you feel welcome before you even step inside.
        2. **Instant Authority**: The historic walls of Trinity College command respect—a level of authority we strive for in our enterprise architectures.
        3. **Social Proof**: The roar of laughter coming from a crowded room is the ultimate testimonial.
        
        We're back in the lab now, refreshed and ready to engineer more desire for our global clients. Dublin was just the beginning.`,
        readTime: "4 min read",
        category: "news & culture",
        coverImage: "https://images.unsplash.com/photo-1543269664-56d56637e6f8?w=1600&q=80&auto=format&fit=crop",
        authorName: "Aditya Singh",
        authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        publishedAt: "2024-12-20T10:00:00Z"
    },
    {
        _id: '2',
        slug: 'psychology-conversion-systems',
        title: "The psychology behind high-converting systems",
        excerpt: "In our own words, how important aesthetics, micro-interactions, and psychological friction removal is to our web design process.",
        content: `Design is not just what it looks like and feels like. Design is how it works. And how it works is entirely dependent on how the human brain processes information.
        
        Most agencies stop at 'looking good'. At Rapsora, we start at 'feeling inevitable'. 
        
        ### The Three Pillars of Engineering Desire
        
        When we build a system, we aren't just placing pixels. We are managing cognitive load. We are removing the 'friction of choice'. 
        
        **Pillar 1: Micro-Interactions as Neurotransmitters**
        A button that reacts with a subtle magnetic pull isn't just a gimmick. It's a dopamine hit. It tells the user: "You are in control. Something is happening."
        
        **Pillar 2: Visual Hierarchy as Authority**
        If a user has to think about where to look next, you've already lost them. We use mathematical grids and typographic scale to force the eye towards action.
        
        **Pillar 3: The 'Hook' Transition**
        The way one section flows into another should feel like a conversation, not a slide deck. We use custom ease-curves that mimic natural human movement to keep the brain engaged.
        
        High conversion isn't luck. It's engineering.`,
        readTime: "6 min read",
        category: "web design",
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80&auto=format&fit=crop",
        authorName: "Rohan Sharma",
        authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
        publishedAt: "2024-11-15T09:00:00Z"
    },
    {
        _id: '3',
        slug: 'video-editing-automation-tools',
        title: "Best Video Editing Automation Tools Every Modern Marketer Needs",
        excerpt: "How to mathematically prove your value to enterprise clients before they even scroll down your landing page.",
        content: `Content is king, but consistency is the kingdom. For the modern marketer, the bottleneck is no longer creativity—it's production speed.
        
        In the Rapsora lab, we've tested hundreds of tools to see what actually moves the needle for our clients. Here is the definitive list of automation tools that integrate with world-class design systems.
        
        ### The Automation Stack
        
        1. **Submagic**: For those viral 'Hook' style captions that keep viewers glued to the screen. 
        2. **Descript**: The ultimate 'text-to-video' editor. If you can edit a Google Doc, you can edit high-end marketing content.
        3. **Loomie**: Automating personalized video outreach at scale.
        
        By automating the mundane, your team can focus on what matters: the strategy behind the hook. We don't just use these tools; we build systems around them.`,
        readTime: "3 min read",
        category: "web development",
        coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80&auto=format&fit=crop",
        authorName: "Sarah Davis",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        publishedAt: "2024-10-10T14:30:00Z"
    },
    {
        _id: '4',
        slug: 'sms-marketing-platform-ecommerce',
        title: "Best SMS Marketing Platform for Ecommerce",
        excerpt: "Reach your customers where they are: in their pockets. A guide to the most high-converting SMS platforms for 2025.",
        content: `Email is for records. SMS is for relationships. 
        
        For ecommerce brands, the 'Hook' isn't on a giant billboard—it's in the notification tray of a smartphone. But with 98% open rates comes 100% responsibility. You cannot spam. You must engineer intent.
        
        We've analyzed the ROI of over 50 platforms, and the results are clear: the best platform is the one that integrates seamlessly with your design language.
        
        ### Our Top Picks
        - **Klaviyo SMS**: Unmatched data integration.
        - **Postscript**: The best for creative 'on-brand' automation.
        - **Attentive**: Scalability for enterprise-level growth.
        
        At Rapsora, we build the bridges between your store and your customers' pockets.`,
        readTime: "7 min read",
        category: "archive",
        coverImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1600&q=80&auto=format&fit=crop",
        authorName: "Aditya Singh",
        authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        publishedAt: "2024-09-05T12:15:00Z"
    },
    {
        _id: '5',
        slug: 'data-storage-digital-marketing',
        title: "The Importance of Data Storage in Digital Marketing Strategies",
        excerpt: "Why Every Agency Should Give Their Team Two Weeks Off. Our data suggests that rest is the ultimate productivity hack.",
        content: `In the age of AI, data is the new oil. But oil is useless if you don't have a refinery. 
        
        Your 'Refinery' is your data storage architecture. At Rapsora, we specialize in building fast, scalable, and secure data pipelines that power high-conversion frontends.
        
        ### Why It Matters
        Speed is a conversion factor. If your database query takes more than 100ms, your 'Hook' is already losing its grip. We use Edge-caching and distributed databases to ensure your brand feels instant, everywhere.`,
        readTime: "6 min read",
        category: "web design",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
        authorName: "Alex Morgan",
        publishedAt: "2024-08-20T08:45:00Z"
    },
    {
        _id: '6',
        slug: 'webflow-to-nextjs-migration',
        title: "Migrating from Webflow to Custom Next.js: The Agency Guide",
        excerpt: "When your brand outgrows low-code, it's time to build for the future. Here is how we handle enterprise-scale migrations.",
        content: `Webflow is great for prototypes. Next.js is great for empires.
        
        As an agency, we often see clients hitting a 'performance ceiling' with standard builders. The transitions feel clunky, the SEO isn't quite modular enough, and the customization is limited.
        
        ### The Migration Workflow
        We don't just move content; we rebuild the experience from the ground up to utilize the full power of React and Next.js. 
        - **Phase 1: Performance Audit**
        - **Phase 2: Architectural Mapping**
        - **Phase 3: The 'Hook' Injection** (Adding our custom animation and interaction engine)
        
        The result? A site that isn't just a site, but a high-performance business asset.`,
        readTime: "16 min read",
        category: "web development",
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop",
        authorName: "Rohan Sharma",
        authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
        publishedAt: "2024-07-12T11:20:00Z"
    }
];
