import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const blog = await BlogPost.findById(params.id);
        
        if (!blog) {
             return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        console.error('Fetch single blog error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const body = await req.json();

        const updatedBlog = await BlogPost.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true
        });

        if (!updatedBlog) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedBlog });
    } catch (error) {
        console.error('Update blog error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const deletedBlog = await BlogPost.findByIdAndDelete(params.id);
        
        if (!deletedBlog) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error('Delete blog error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
