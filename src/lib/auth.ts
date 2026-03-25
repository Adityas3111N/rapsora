import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const SUPER_ADMIN_EMAIL = 'singhaditya4333@gmail.com';

export const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: user.email === SUPER_ADMIN_EMAIL ? 'superadmin' : 'user',
                        });
                    } else {
                        // Update profile info on each sign-in
                        existingUser.name = user.name || existingUser.name;
                        existingUser.image = user.image || existingUser.image;
                        await existingUser.save();
                    }
                } catch (error) {
                    console.error('Error during sign-in:', error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            if (session?.user?.email) {
                try {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        (session.user as any).id = dbUser._id.toString();
                        (session.user as any).role = dbUser.role;
                        // Premium anime-style avatar override
                        session.user.image = `https://api.dicebear.com/7.x/adventurer/svg?seed=${dbUser.email}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf`;
                    }
                } catch (error) {
                    console.error('Error fetching session user:', error);
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                try {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: user.email });
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role;
                    }
                } catch (error) {
                    console.error('Error in JWT callback:', error);
                }
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
