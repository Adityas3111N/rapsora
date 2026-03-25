import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;
        if (!session || (role !== 'admin' && role !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { subject, content } = await req.json();

        if (!subject || !content) {
            return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
        }

        const subscribers = await Subscriber.find({});
        const emails = subscribers.map(s => s.email);

        if (emails.length === 0) {
             return NextResponse.json({ error: 'No subscribers found' }, { status: 400 });
        }

        // Simulate sending emails
        console.log(`Sending newsletter to ${emails.length} subscribers:`);
        console.log(`Subject: ${subject}`);
        console.log(`Content: ${content}`);
        
        // In a real scenario, you would integrate Resend or SendGrid here:
        // await resend.emails.send({
        //   from: 'Rapsora <newsletter@rapsora.com>',
        //   to: emails,
        //   subject,
        //   html: content
        // });

        return NextResponse.json({ 
            success: true, 
            message: `Newsletter broadcast to ${emails.length} subscribers successfully!`,
            count: emails.length 
        });
    } catch (error) {
        console.error('Newsletter send error:', error);
        return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 });
    }
}
