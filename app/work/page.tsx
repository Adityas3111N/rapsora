import dbConnect from '@/lib/mongodb';
import Work from '@/models/Work';
import { WorkClient } from './work-client';

export const metadata = {
    title: 'Our Work | RapSora Agency',
    description: 'Explore our portfolio of award-winning websites, branding, and digital experiences.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function WorkPage() {
    await dbConnect();
    
    // Fetch all works sorted by order then newest
    const rawWorks = await Work.find().sort({ order: 1, createdAt: -1 }).lean();
    
    // Clean Mongoose IDs and convert dates for serialization
    const works = rawWorks.map(w => ({
        ...w,
        _id: w._id.toString(),
        createdAt: w.createdAt?.toISOString() || null,
        updatedAt: w.updatedAt?.toISOString() || null,
    }));

    // Extract unique categories and count them
    const catCounts = works.reduce((acc, work) => {
        work.categories?.forEach((cat: string) => {
            acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    return (
        <main className="min-h-screen pt-[120px] bg-background text-foreground overflow-hidden">
            <WorkClient works={works} categories={catCounts} />
        </main>
    );
}
