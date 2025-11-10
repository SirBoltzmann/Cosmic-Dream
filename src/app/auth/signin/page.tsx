"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/wallpapers/space-bg.png";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebaseClient";

type Star = {
    id: number;
    x: number;
    y: number;
    size: number;
    blinkGroup: string;
}

export default function SignInPage() {
    const [stars, setStars] = useState<Array<Star>>(() => []);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            redirect("/");
        }
    }, [status]);

    useEffect(() => {
        const starNumber: number = 350;
        const starArr: Star[] = [];

        for (let i = 0; i < starNumber; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 3;

            starArr.push({
                id: i,
                x,
                y,
                size,
                blinkGroup: i % 2 === 0 ? 'group1' : 'group2',
            });
        }
        
        setStars(starArr);
    }, []);

    // Test firebase connection
    useEffect(() => {
        async function testFirebaseConnection() {
            try {
                const auth = getAuth(app);
                const user = auth.currentUser;

                if (!user) {
                    console.warn("Not an authenticated user yet..");
                    return;
                }

                const token = await user.getIdToken();
                // console.log("Obtained token: ", token.slice(0, 20) + "...");

                await fetch("/api/test-firebase", {
                    headers: {Authorization: `Bearer ${token}`},
                });
            } catch(err) {
                console.error("Error testing Firebase connection: ", err);
            } 
        }
        
        if (session) {
            testFirebaseConnection();
        }
    },[session]);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#000000] via-[#120020] to-[#280047] text-white z-0">
            {/* BG Stars */}
            <div className='fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none'>
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className={`
                            z-20 inline absolute rounded-[100%] bg-white
                            ${star.blinkGroup === "group1" ? "animate-[starBlink_3s_ease-in-out_infinite]" : "animate-[starBlink_2s_ease-in-out_infinite]"}`}
                        style={{
                            top: `${star.y}px`,
                            left: `${star.x}px`,
                            width: `${star.size}px`,
                            height: `${star.size}px`
                        }}
                    ></div>
                ))}
            </div>

            {/* Space Glow */}
            <div className="absolute inset-0 z-30">
                <div className="
                    absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                    bg-[#2a0057] rounded-full blur-3xl top-[-200px] left-[-150px] animate-[floatInSite_6s_ease-in-out_infinite]"
                />
                <div className="
                    absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                    bg-[#070060] rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-[floatInSite_8s_ease-in-out_infinite]" 
                />
            </div>

            {/* Main Content */}
            <div className="z-50 flex flex-col items-center text-center px-6">
                <Image
                    src={Logo}
                    alt="Cosmic Dream Logo"
                    width={300}
                    height={300}
                    className="mb-6 animate-pulse rounded-3xl"
                />
                <h1 className="text-4xl font-bold mb-2 tracking-wide">Welcome, Cosmic Dreamer 🌌</h1>
                <p className="text-slate-300 mb-10 max-w-md">Sign in to continue exploring the stars and your creative universe of thoughts... ✨</p>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="group flex items-center gap-3 bg-white text-slate-900 px-6 py-2 rounded-2xl font-semibold cursor-pointer hover:bg-slate-100 hover:scale-102 transition-all shadow-lg"
                >
                    <Image
                        src="/google-icon.png"
                        alt="Google Logo"
                        width={30}
                        height={30}
                        className="group-hover:scale-120 transition"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
