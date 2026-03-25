import mongoose, { Schema, Document } from 'mongoose';

export interface IWork extends Document {
    title: string;
    slug: string;
    client: string;
    year: number;
    categories: string[];
    tags: string[];
    image: string;
    isFeatured: boolean;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    gridSize?: 'small' | 'medium' | 'large';
    order?: number;
    createdAt: Date;
    updatedAt: Date;
}

const WorkSchema: Schema = new Schema(
    {
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
    },
    { timestamps: true }
);

// Add index for fast querying
WorkSchema.index({ slug: 1 });
WorkSchema.index({ 'categories': 1 });

export default mongoose.models.Work || mongoose.model<IWork>('Work', WorkSchema);
