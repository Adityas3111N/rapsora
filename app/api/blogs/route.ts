import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';

// GET /api/blogs — list all published blogs (public) or all blogs (admin)
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const session = await auth();
        const isAdmin = (session?.user as any)?.role === 'admin' || (session?.user as any)?.role === 'superadmin';

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        let filter: any = {};
        if (isAdmin && status) {
            filter.status = status;
        } else if (!isAdmin) {
            filter.status = 'published';
        }

        const total = await BlogPost.countDocuments(filter);
        const blogs = await BlogPost.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return NextResponse.json({
            blogs,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

// POST /api/blogs — create a new blog post (admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || (role !== 'admin' && role !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { title, excerpt, content, category, coverImage, status } = body;

        if (!title || !excerpt || !content || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate slug
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Check slug uniqueness
        const existing = await BlogPost.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'A post with this title already exists' }, { status: 409 });
        }

        // Calculate read time
        const wordCount = content.split(/\s+/).length;
        const readTime = `${Math.ceil(wordCount / 200)} min read`;

        const dbUser = await User.findOne({ email: session.user?.email });

        const blog = await BlogPost.create({
            title,
            slug,
            excerpt,
            content,
            category,
            coverImage: coverImage || '',
            author: dbUser?._id,
            authorName: session.user?.name || 'Admin',
            authorImage: session.user?.image || '',
            status: status || 'draft',
            readTime,
            publishedAt: status === 'published' ? new Date() : undefined,
        });

        return NextResponse.json({ blog }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
