import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "No NextAuth session" }, { status: 401 });
        }

        const email = session.user.email as string;

        // Search for the user by email in FirebaseAuth if doesn't exist, create it.
        let userRecord;
        try {
            userRecord = await adminAuth.getUserByEmail(email);
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "auth/user-not-found") {
                userRecord = await adminAuth.createUser({
                    email,
                    displayName: session.user.name || undefined,
                });
            } else {
                throw err;
            }
        }

        const uid = userRecord.uid;
        const customToken = await adminAuth.createCustomToken(uid);
        return NextResponse.json({ customToken });
    } catch (err) {
        console.error("Error creating custom token:", err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
