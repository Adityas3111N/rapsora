import mongoose, { Schema, models, model } from 'mongoose';

export interface ISubscriber {
    _id: mongoose.Types.ObjectId;
    email: string;
    subscribedAt: Date;
}

const SubscriberSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        subscribedAt: { type: Date, default: Date.now }
    },
    { timestamps: false }
);

const Subscriber = models.Subscriber || model('Subscriber', SubscriberSchema);
export default Subscriber;
