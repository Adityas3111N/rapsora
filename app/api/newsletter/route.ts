import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });
        return NextResponse.json({ success: true, count: subscribers.length, data: subscribers });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch subscribers' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
             return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
             return NextResponse.json({ success: true, message: 'You are already subscribed. Thanks!' });
        }

        await Subscriber.create({ email });
        return NextResponse.json({ success: true, message: 'Successfully subscribed to the newsletter.' });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
