import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI environment variable');
    process.exit(1);
}

const workSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    year: { type: Number, required: true },
    categories: { type: [String], required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    testimonial: {
        quote: { type: String },
        author: { type: String },
        role: { type: String },
        company: { type: String }
    },
    gridSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'small'
    },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Work = mongoose.models.Work || mongoose.model('Work', workSchema);

const seedWorks = [
    {
        title: "Refreshing Gary Neville's digital presence",
        slug: "gary-neville-digital-presence",
        client: "Gary Neville",
        year: 2023,
        categories: ["corporate", "branding"],
        tags: ["Branding", "Website", "SEO"],
        image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?w=1600&h=1000&fit=crop",
        isFeatured: true,
        gridSize: "large",
        testimonial: {
            quote: "Shape implicitly understood our vision for the brand and were able to translate our ideas into a tangible and exciting new concept.",
            author: "Adam Sage",
            role: "Marketing Director",
            company: "MiChild Nurseries"
        },
        order: 1
    },
    {
        title: "Maturing a brand, without losing its bite",
        slug: "rise-at-seven-rebrand",
        client: "Rise At Seven",
        year: 2025,
        categories: ["agency", "branding"],
        tags: ["Branding", "Website", "SEO"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        isFeatured: false,
        gridSize: "large",
        order: 2
    },
    {
        title: "Reimagining the built environment",
        slug: "enabl-built-environment",
        client: "Enabl",
        year: 2024,
        categories: ["property", "education"],
        tags: ["Branding", "Website", "Content Writing"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&h=1200&fit=crop",
        isFeatured: false,
        gridSize: "medium",
        order: 3
    },
    {
        title: "Live. Work. Experience.",
        slug: "found-live-work-experience",
        client: "Found",
        year: 2024,
        categories: ["fashion", "ecommerce"],
        tags: ["Branding", "Website"],
        image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1200&h=800&fit=crop",
        isFeatured: false,
        gridSize: "medium",
        order: 4
    },
    {
        title: "High Performance Gear",
        slug: "fitness-gear-ecommerce",
        client: "AthletiCore",
        year: 2024,
        categories: ["fitness & sport", "ecommerce", "shopify"],
        tags: ["Shopify", "Website", "SEO"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&h=1000&fit=crop",
        isFeatured: false,
        gridSize: "small",
        order: 5
    },
    {
        title: "Crafting Content for the Brave",
        slug: "content-brave-agency",
        client: "KOO Visuals",
        year: 2023,
        categories: ["agency", "food & drink"],
        tags: ["Website", "Branding"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
        isFeatured: false,
        gridSize: "small",
        order: 6
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Clear existing test works
        await Work.deleteMany({});
        console.log('Cleared existing works');

        // Insert new works
        await Work.insertMany(seedWorks);
        console.log('Successfully seeded works!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding works:', error);
        process.exit(1);
    }
}

seed();
