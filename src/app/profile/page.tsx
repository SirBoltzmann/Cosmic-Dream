"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Sidebar from "@/Components/ui/Sidebar";

export default function ProfilePage() {
  const { data: session } = useSession();

    if (!session) {
        return (
            <>
                <Sidebar/>
                <div className="min-h-screen flex flex-col text-white p-5 pl-23">
                    <header className="flex items-center justify-between mb-10">
                        <h1 className="text-2xl md:text-4xl font-bold">My Profile</h1>
                        <button onClick={() => signIn()} className="bg-[#0000005d] border-2 border-slate-400 px-4 py-2 cursor-pointer rounded-lg transition-all hover:scale-105">
                            Sign In
                        </button>
                    </header>

                    <section className="bg-white/10 py-4 px-3 md:p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-4 md:gap-6">
                        <div className="relative min-w-14 min-h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-full bg-gradient-to-t from-purple-950 via-purple-700 to-purple-400"></div>
                        <div>
                            <h2 className="text-md sm:text-xl font-semibold"></h2>
                            <p className="text-sm sm:text-md text-white">You&apos;re not logged in...</p>
                        </div>
                    </section>

                    <section className="mt-6 bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xs shadow-lg gap-6">
                        <h3 className="text-lg font-semibold mb-3">Your Notes</h3>
                        <p className="text-slate-200">Log In to see and read your cosmic thoughts.. 🌌❤️</p>
                    </section>

                    <section className="mt-4 bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xs shadow-lg gap-6">
                        <h3 className="text-lg font-semibold mb-3">Most Recent Notes</h3>
                        <p className="text-slate-200">Log In to see and read your recent cosmic thoughts...</p>
                    </section>
                </div>
            </>
        );
    }

    return (
        <>
            <Sidebar/>
            <div className="min-h-screen flex flex-col text-white p-5 pl-23">
                <header className="flex items-center justify-between mb-10">
                    <h1 className="text-2xl md:text-4xl font-bold">My Profile</h1>
                    <button onClick={() => signOut()} className="bg-[#0000005d] border-2 border-slate-400 px-4 py-2 cursor-pointer rounded-lg transition-all hover:scale-105">
                        Sign Out
                    </button>
                </header>

                <section className="bg-white/10 py-4 px-3 md:p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <div className="relative min-w-14 min-h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-full">
                        {session.user?.image ? (
                            <Image
                                src={session.user?.image}
                                alt="User avatar"
                                fill
                                className="object-cover rounded-full border border-white/20"
                            />
                        ) : (
                            <div className="relative w-[128px] h-[128px] sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-full bg-cyan-900 animate-pulse"></div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-md sm:text-xl font-semibold">{session.user?.name}</h2>
                        <p className="text-sm sm:text-md text-white">
                            Logged in as 
                            <span className="text-sm sm:text-md text-[#b5b4bcd6]"> {session.user?.email}</span>
                        </p>
                    </div>
                </section>

                <section className="mt-6 bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xs shadow-lg gap-6">
                    <h3 className="text-lg font-semibold mb-3">Your Notes</h3>
                    <p className="text-slate-200">Here you&apos;ll see your saved cosmic thoughts soon 💭✨</p>
                </section>

                <section className="mt-4 bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xs shadow-lg gap-6">
                    <h3 className="text-lg font-semibold mb-3">Most Recent Notes</h3>
                    <p className="text-slate-200">Here you&apos;ll see your most recent notes and cosmic thoughts...</p>
                </section>
            </div>
        </>
    );
}
