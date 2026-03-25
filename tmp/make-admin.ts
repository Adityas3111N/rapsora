import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI environment variable');
    process.exit(1);
}

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    image: String,
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function makeAdmin() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        const emailToUpgrade = 'vasuzx890@gmail.com';
        
        let user = await User.findOne({ email: emailToUpgrade });
        
        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`Successfully upgraded ${emailToUpgrade} to admin role.`);
        } else {
            console.log(`User ${emailToUpgrade} not found. Creating a new admin account...`);
            await User.create({
                email: emailToUpgrade,
                name: 'Vasu (Admin)',
                role: 'admin',
                image: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(emailToUpgrade)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf`,
            });
            console.log(`Successfully created and upgraded ${emailToUpgrade} as admin.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error updating user role:', error);
        process.exit(1);
    }
}

makeAdmin();
