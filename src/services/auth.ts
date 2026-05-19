import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

const authCongig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials?.email });
                if (!user || !user.password) return null;
                const isValid = await bcrypt.compare(
                    credentials?.password as string,
                    user.password
                );
                if (!isValid) return null;
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        authorized: async ({ auth, request }: { auth: any; request: any }) => {
            return !!auth?.user;
        },

        async jwt({ token, trigger, session }: any) {
            if (trigger === "update" && session) {
                token.name = session.name
                token.picture = session.image
            }
            return token
        },
        async session({ session, token }: any) {
            if (session?.user?.email) {
                await connectDB();
                const user = await User.findOne({ email: session.user.email }).lean() as any;
                if (user) {
                    session.user.name = user.name
                    session.user.image = user.image
                }
            }
            return session
        },
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth(authCongig);