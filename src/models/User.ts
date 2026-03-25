import mongoose, { Schema, models, model } from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    image?: string;
    role: 'user' | 'admin' | 'superadmin';
    emailVerified?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user',
        },
        emailVerified: { type: Date },
    },
    { timestamps: true }
);

const User = models.User || model('User', UserSchema);
export default User;
