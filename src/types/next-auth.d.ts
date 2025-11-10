import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            email?: string;
            name?: string;
            image?: string;
        } & DefaultSession["user"];
        idToken?: string;
    }

    interface User extends DefaultUser {
        idToken?: string;
    }

    interface JWT {
        idToken?: string;
    }
}
