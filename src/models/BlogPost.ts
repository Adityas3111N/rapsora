import mongoose, { Schema, models, model } from 'mongoose';

export interface IBlogPost {
    _id: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    author: mongoose.Types.ObjectId;
    authorName: string;
    authorImage?: string;
    status: 'draft' | 'published';
    readTime: string;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        coverImage: { type: String, default: '' },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        authorName: { type: String, required: true },
        authorImage: { type: String },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        readTime: { type: String, default: '5 min read' },
        publishedAt: { type: Date },
    },
    { timestamps: true }
);

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);
export default BlogPost;
