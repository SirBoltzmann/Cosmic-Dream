import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
	const authHeader = request.headers.get("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
	}

	const token = authHeader.split("Bearer ")[1];

	try {
		const decoded = await adminAuth.verifyIdToken(token);
		return NextResponse.json({ uid: decoded.uid, success: "Token verificado correctamente 🩵" });
	} catch (err) {
		return NextResponse.json({ err: "Token inválido", details: err }, { status: 403 });
	}
}
