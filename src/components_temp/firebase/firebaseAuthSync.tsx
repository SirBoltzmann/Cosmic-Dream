"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

type FirebaseTokenResponse = {
  customToken: string;
  error?: string;
};


export default function FirebaseAuthSync() {
    const { data: session } = useSession();

    useEffect(() => {
        const syncFirebaseAuth = async () => {
            if (!session) return;

            const currentUser = auth.currentUser;
            if (currentUser && currentUser.email === session.user?.email) return;

            try {
                const res = await fetch("/api/auth/firebase-token");
                const data:FirebaseTokenResponse = await res.json();

                if (!res.ok) throw new Error(data.error || "Error fetching custom token");

                await signInWithCustomToken(auth, data.customToken);
                console.log("NextAuth & Firebase synced succesfully!! ✅");
            } catch (err) {
                console.error("Error syncing Firebase auth", err);
            }
        };

        syncFirebaseAuth();

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!session) return;
            if (!firebaseUser) {
                const timeout = setTimeout(() => {
                   const current = auth.currentUser;
                   if (!current) {
                    signOut({ callbackUrl: "/auth/signin" });
                   } 
                }, 3000);

                return () => clearTimeout(timeout);
            }
        });

        return () => unsubscribe();
    }, [session]);

    // 🔥 Detects an user already in Firebase
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                // console.log("Token obtained:", token);

                const res = await fetch("/api/test-firebase", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                await res.json();
                // console.log("🔥 Server response:", data);
            } else {
                console.log("No user in firebase yet...");
            }
        });

        return () => unsub();
    }, []);

    return null;
}
