import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Work from '@/models/Work';

// GET /api/works/[id] — fetch single work
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } | { params: { id: string } }
) {
    try {
        await dbConnect();
        // Await params to fix Next.js 15 sync params route issue
         const { id } = await (context.params as Promise<{ id: string }>);
        const isMongoId = id.match(/^[0-9a-fA-F]{24}$/);
        const work = isMongoId 
            ? await Work.findById(id).lean()
            : await Work.findOne({ slug: id }).lean();

        if (!work) {
            return NextResponse.json({ error: 'Work not found' }, { status: 404 });
        }

        return NextResponse.json({ work });
    } catch (error) {
        console.error('Error fetching work:', error);
        return NextResponse.json({ error: 'Failed to fetch work' }, { status: 500 });
    }
}

// PUT /api/works/[id] — update (admin)
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } | { params: { id: string } }
) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || (role !== 'admin' && role !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await (context.params as Promise<{ id: string }>);
        const body = await req.json();

        // Check if title changed and update slug
        if (body.title) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        const work = await Work.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        
        if (!work) {
            return NextResponse.json({ error: 'Work not found' }, { status: 404 });
        }

        return NextResponse.json({ work });
    } catch (error) {
        console.error('Error updating work:', error);
        return NextResponse.json({ error: 'Failed to update work' }, { status: 500 });
    }
}

// DELETE /api/works/[id] — delete (admin)
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } | { params: { id: string } }
) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || (role !== 'admin' && role !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await (context.params as Promise<{ id: string }>);
        const work = await Work.findByIdAndDelete(id);

        if (!work) {
            return NextResponse.json({ error: 'Work not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting work:', error);
        return NextResponse.json({ error: 'Failed to delete work' }, { status: 500 });
    }
}
