import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async jwt({ token, account }) {
            // Save google's id_token in NextAuth's..
            if (account?.id_token) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass idToken to client session..
            session.idToken = token.idToken as string;
            return session;
        },
    },
};