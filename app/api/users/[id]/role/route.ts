import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const SUPER_ADMIN_EMAIL = 'singhaditya4333@gmail.com';

// PUT /api/users/[id]/role — update user role (superadmin only)
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || role !== 'superadmin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const { role: newRole } = body;

        if (!['user', 'admin'].includes(newRole)) {
            return NextResponse.json({ error: 'Invalid role. Can only set user or admin.' }, { status: 400 });
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prevent demoting the super admin
        if (user.email === SUPER_ADMIN_EMAIL) {
            return NextResponse.json({ error: 'Cannot modify super admin role' }, { status: 403 });
        }

        user.role = newRole;
        await user.save();

        return NextResponse.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
    }
}
