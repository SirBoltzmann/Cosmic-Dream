import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
    throw new Error("❌ Missing Firebase Admin credentials");
}

const serviceAccount = {
    projectId,
    clientEmail,
    privateKey,
};

const adminApp = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
        projectId, // 👈 esto a veces es necesario
    });

export const adminAuth = getAuth(adminApp);
export default adminApp;
