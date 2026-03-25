import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(req: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');

        const query: any = {};
        if (category && category !== 'all') query.category = category;
        if (status) query.status = status;

        const blogs = await BlogPost.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        console.error('Fetch blogs error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Very basic validation
        if (!body.title || !body.slug || !body.excerpt || !body.content || !body.category) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Just bypass auth for now for simplicity based on user instructions, or use session if needed
        const newBlog = await BlogPost.create({
            ...body,
            author: "000000000000000000000000", // placeholder
            authorName: body.authorName || 'Rapsora Editor',
        });

        return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
    } catch (error: any) {
        console.error('Create blog error:', error);
        if (error.code === 11000) {
             return NextResponse.json({ success: false, error: 'Warning: Slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
    }
}
