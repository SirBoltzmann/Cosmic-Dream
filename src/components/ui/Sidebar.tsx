"use client"

import { useGeneral } from "@/context/GeneralContext";
import { PanelRight, LucideLogIn, LogOut } from "lucide-react";
import { sidebarBtnData } from '@/data/sidebarBtnData';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut as nextSignOut } from "next-auth/react";
import { auth } from "@/lib/firebaseClient";
import { signOut as firebaseSignOut } from "firebase/auth";

export default function Sidebar () {
    const { isSidebarOpen, toggleSidebar } = useGeneral();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        try {
            await firebaseSignOut(auth);
            await nextSignOut();
            console.log("Both Firebase and NextAuth sessions closed!");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <aside className={`${isSidebarOpen ? 'w-64 p-3' : 'w-16 p-2'} flex flex-col justify-between min-h-dvh fixed z-40 left-0 top-0 bg-white text-gray-900 rounded-tr-xl rounded-br-xl transition-all duration-300 shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.7)]`}>
            {/* Sidebar Header */}
            <div className={`flex justify-between items-center mb-6 ${!isSidebarOpen && 'justify-center'}`}>
                { isSidebarOpen && <h2 className="text-xl font-bold">Cosmic Dream</h2> }
                <button className={`${isSidebarOpen ? '' : 'p-2'} relative group cursor-pointer`} onClick={() => toggleSidebar()}>
                    <PanelRight size={ isSidebarOpen ? 21 : 25 } strokeWidth={2}/>
                    {!isSidebarOpen && (
                        <span className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 bg-white text-black text-sm px-2 py-1 rounded-md bottom-1 left-16 whitespace-nowrap shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.5)]">
                            Open Sidebar
                        </span>
                    )}
                </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col flex-1">
                {sidebarBtnData.map(({ label, icon: Icon, href }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={label} className={`${isActive ? "!bg-gray-200" : ""} relative group rounded-2xl hover:bg-gray-100 transition-all`}>
                            <Link 
                                href={href}
                                onClick={() => {if (isSidebarOpen) toggleSidebar()}}
                                className={`${isActive ? "!font-bold" : ""} flex items-center gap-3 pt-4.5 pb-4.5 pl-1.5 pr-1.5 hover:font-semibold transition-all ${!isSidebarOpen && 'justify-center'}`}
                            >
                                <Icon size={isSidebarOpen ? 21 : 22} strokeWidth={isActive ? "2.5" : "2"}/>
                                { isSidebarOpen && label }
                            </Link>
                            {!isSidebarOpen && (
                                <span className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 bg-white text-black text-sm px-2 py-1 rounded-md bottom-3 left-16 whitespace-nowrap shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.5)]">
                                    {label}
                                </span>
                            )}
                        </li>
                    )
                })}
                
                {/* --- User Section --- */}
                <li className="relative mt-auto rounded-2xl hover:bg-gray-200 transition-all">
                    { status === "loading" ? (
                        <div className={`flex items-center justify-center py-2 w-full pt-3 pb-3 pl-1.5 pr-1.5`}>
                            <div className={`min-w-10 h-10 bg-gradient-to-b from-purple-200 to-purple-400 rounded-full animate-pulse`}></div>
                        </div>
                    ) : session ? (
                        <Link onClick={() => {if (isSidebarOpen) toggleSidebar()}} href={"/profile"} className={`flex items-center justify-between gap-3 w-full pt-3 pb-3 pl-1.5 pr-1.5 cursor-auto transition-all ${!isSidebarOpen && "justify-center"}`}>
                            {session.user?.image ? (
                                <div className="group relative">
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "user-avatar"}
                                        width={isSidebarOpen ? 34 : 40}
                                        height={isSidebarOpen ? 34 : 40}
                                        className="rounded-full border border-gray-300 cursor-pointer"
                                    />
                                    {/* Tooltip */}
                                    <span className={`absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white text-black transition-all duration-300 text-sm px-2 py-0.5 rounded-md ${isSidebarOpen ? "bottom-13 -left-3" : "bottom-2 left-14"} whitespace-nowrap shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.3)]`}>
                                        My profile
                                    </span>
                                </div>
                            ) : (
                                <div className={`${isSidebarOpen ? "w-[34px] h-[34px]" : "w-10 h-10"} bg-gradient-to-b from-purple-200 to-fuchsia-400 rounded-full`}></div>
                            )}
                            {isSidebarOpen && (
                                <span className="truncate">
                                    {session?.user?.name
                                        ? session.user?.name?.length < 16
                                            ? session.user.name
                                            : session.user.name.slice(0, 16) + ".."
                                        : "Sign Out"
                                    }
                                </span>
                            )}
                            {isSidebarOpen && (
                                <div className="group relative">
                                    <LogOut size={23} onClick={() => handleLogout()} className="cursor-pointer hover:scale-110 m-1" />
                                    {isSidebarOpen && (
                                        <span className={`absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white text-black transition-all duration-300 text-sm px-2 py-0.5 rounded-md bottom-1 left-13 whitespace-nowrap shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.3)]`}>
                                            Log Out
                                        </span>
                                    )}
                                </div>
                            )}
                        </Link>
                    ) : (
                        <Link href={"/profile"} className={`flex items-center ${isSidebarOpen ? "justify-around gap-3" : "justify-center"} w-full pt-3 pb-3 pl-1.5 pr-1.5 transition-all`}>
                            <div className={`min-w-10 h-10 bg-gradient-to-b from-purple-200 to-purple-800 rounded-full`}></div>
                            { isSidebarOpen && (
                                <span>Sign In</span>
                            )}
                            {isSidebarOpen && (
                                <LucideLogIn onClick={() => signIn()} size={23} className="cursor-pointer hover:scale-110"/>
                            )}
                        </Link>
                    )} 
                </li>
            </ul>
        </aside>
    )
}