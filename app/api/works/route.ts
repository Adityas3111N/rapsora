import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Work from '@/models/Work';

// GET /api/works — fetch all works
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const limitParam = searchParams.get('limit');
        let query = Work.find().sort({ order: 1, createdAt: -1 });
        
        if (limitParam) {
            query = query.limit(parseInt(limitParam, 10));
        }

        const works = await query.lean();

        return NextResponse.json({ works });
    } catch (error) {
        console.error('Error fetching works:', error);
        return NextResponse.json({ error: 'Failed to fetch works' }, { status: 500 });
    }
}

// POST /api/works — create new work (admin)
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || (role !== 'admin' && role !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        
        const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const existing = await Work.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'Work with this title/slug already exists' }, { status: 409 });
        }

        const work = await Work.create({
            ...body,
            slug
        });

        return NextResponse.json({ work }, { status: 201 });
    } catch (error) {
        console.error('Error creating work:', error);
        return NextResponse.json({ error: 'Failed to create work' }, { status: 500 });
    }
}
