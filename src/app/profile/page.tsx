"use client";
import { useGeneral } from "@/context/GeneralContext";
import { useSession, signOut as nextSignOut, signIn } from "next-auth/react";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { getDate } from "@/utils/utils";
import { AreaChart } from "@tremor/react";
import Image from "next/image";
import AdaptiveNavigation from "@/Components/ui/AdaptiveNavigation";
import { NotebookPen, Star, ArchiveIcon, ClockPlus, ChartSpline } from "lucide-react";
import { Timestamp } from "firebase/firestore";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export default function ProfilePage() {
    const { data: session } = useSession();
    const { notes, isMobile } = useGeneral();
    const notesWithRealDate = notes.map(n => ({
        ...n,
        date: n.createdAt.toDate(),
    }));
    const titleCharLimit = isMobile ? 25 : 20;
    const contentCharLimit = isMobile ? 30 : 25;

    const stripHtml = (str: string) => str.replace(/<[^>]+>/g, "");

    const decodeHtml = (string: string) => {
        const text = document.createElement("textarea");
        text.innerHTML = string;
        return text.value;
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut(auth);
            await nextSignOut();
            console.log("Both Firebase and NextAuth sessions closed!");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const getRecentNotes = (notes: Note[], limit: number) => {
        return [...notes].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()).slice(0, limit);
    };

    function groupNotesByDay(maxDays: number = 7) {
        const map = new Map();

        notesWithRealDate.forEach(n => {
            const day = n.date.toISOString().split("T")[0];
            map.set(day, (map.get(day) || 0) + 1);
        });

        const arr = Array.from(map, ([date, count]) => ({ date, count }));
        arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const limited = arr.slice(0, maxDays);
        return limited.reverse();
    }
    
    // Rendering UI
    if (!session) {
        return (
            <>
                <AdaptiveNavigation/>
                <div className={`min-h-screen flex flex-col text-white p-5 ${isMobile ? "pl-5" : "pl-23"}`}>
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
            <AdaptiveNavigation/>
            <div className={`min-h-screen flex flex-col text-white p-5 ${isMobile ? "pl-5" : "pl-23"}`}>
                <header className={`flex items-center justify-between mb-10`}>
                    <h1 className="text-2xl md:text-4xl font-bold">My Profile</h1>
                    <button onClick={() => handleLogout()} className="bg-[#0000005d] border-2 border-slate-400 px-4 py-2 cursor-pointer rounded-lg transition-all hover:scale-105">
                        Sign Out
                    </button>
                </header>

                <section className="bg-white/7 py-4 px-3 md:p-6 rounded-2xl border border-white/15 backdrop-blur-xs shadow-lg flex flex-col sm:flex-row items-center gap-4 md:gap-6">
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

                <section className="mt-6 bg-white/5 p-6 rounded-2xl border border-white/15 backdrop-blur-[2px] shadow-lg gap-6">
                    <h3 className="text-lg font-bold mb-2">Your Notes</h3>
                    <div>
                        <div className="flex flex-row gap-2 items-center">
                            <NotebookPen size={18}/> 
                            <p className="font-semibold">You&apos;ve written:</p>
                            <span className="font-light">{notes.length} notes.</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Star size={18}/>
                            <p className="font-semibold">Favourite notes: </p>
                            <span className="font-light">{notes.filter((note) => note.isFavorite).length} favourite notes.</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <ArchiveIcon size={18}/>
                            <p className="font-semibold">Archived notes:</p> 
                            <span className="font-light">{notes.filter((note) => note.isArchived).length} archived notes.</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <ClockPlus size={18}/>
                            <p className="font-semibold">Last note:</p> 
                            {getRecentNotes(notes, 1).length > 0 ? (
                                getRecentNotes(notes, 1).map((note, index) => (
                                    <span key={index} className="font-light">
                                        {note.title.slice(0, 20) + " ..." || (isMobile 
                                            ? "No title.. 🌌" 
                                            : "This note has no title yet.. ✨")}
                                    </span>
                                ))
                            ) : (
                                <span className="font-light">
                                    {isMobile 
                                        ? "No notes yet.. start 🌌" 
                                        : "No notes yet, start writing your thoughts ✨🌌"}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mt-4 relative bg-white/2 px-4 pt-4 pb-2 rounded-2xl border border-white/15 backdrop-blur-[1px] shadow-lg gap-6">
                    <header className="flex items-center gap-3 mb-8 ml-2">
                        <ChartSpline strokeWidth={2.3}/>
                        <h3 className="text-lg font-bold">Statistics Chart &#40;Weekly&#41;</h3>
                    </header>
                    <AreaChart 
                        className="h-64 mt-4 tremor-x-axis tremor-y-axis tremor-foreground recharts-area-area "
                        data={groupNotesByDay()}
                        index="date"
                        categories={["count"]}
                        valueFormatter={(n) => Intl.NumberFormat("us").format(n)}
                        xAxisLabel="Day"
                        yAxisLabel="Written Notes"
                        curveType="natural"
                        noDataText="You've no notes yet, start now 🌌✨"
                        showLegend={false}
                        customTooltip={({ payload, active, label }) => {
                            if (!active || !payload?.length) return null;

                            return (
                                <div className="bg-[#0000005d] border border-white/60 p-3 rounded-xl backdrop-blur-md shadow-3xl">
                                    <p className="text-white font-semibold mb-1">{label}</p>

                                    {payload.map((e, i) => (
                                        <div key={i} className="flex items-center justify-center gap-3">
                                            <span className="text-white">{e.name}:</span>
                                            <span className="text-white font-bold">{e.value}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />
                </section>

                <section className={`mt-4 bg-white/3 p-6 rounded-2xl border border-white/15 backdrop-blur-[3px] shadow-lg gap-6 ${isMobile ? "mb-20" : ""}`}>
                    <header className="flex items-center gap-3 mb-2">
                        <ClockPlus strokeWidth={2.3} size={23}/>
                        <h3 className="text-lg font-bold">Your Most Recent Notes</h3>
                    </header>
                    {getRecentNotes(notes, (isMobile ? 3 : 5)).map((n, i) => (
                        <div key={i} className={`flex ${isMobile ? "flex-col justify-center mb-3 gap-1" : "flex-row items-center gap-2"}`}>
                            <span className="font-semibold">
                                {isMobile && "Title: "}
                                {n.title.length > titleCharLimit 
                                    ? n.title.slice(0, titleCharLimit) + "... " 
                                    : n.title || "Untitled"
                                }:
                            </span>
                            <p className="font-light">
                                {isMobile && "Content: "}
                                {decodeHtml(stripHtml(n.content)).length > contentCharLimit 
                                    ? decodeHtml(stripHtml(n.content)).slice(0, contentCharLimit) + "..." 
                                    : decodeHtml(stripHtml(n.content)) || "no content"
                                }
                            </p>
                            <span className="text-xs text-neutral-400">
                                {isMobile && "Date: "}
                                {getDate(n.createdAt)}
                            </span>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}
