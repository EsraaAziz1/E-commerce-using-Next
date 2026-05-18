import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { request } from "http";
import { signOut } from "next-auth/react";

const authCongig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        })
    ],
    callbacks: {
        authorized: async ({ auth, request }) => {
            console.log("auth", auth);
            console.log("request", request);
            return !!auth?.user;
        }
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout",
    },
    secret: process.env.SECRET!,
    // redirectUri: "http://localhost:3000/api/auth/callback",
    // scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
};
export const {
  auth,
  signIn,
  handlers: { GET, POST },
} = NextAuth(authCongig);