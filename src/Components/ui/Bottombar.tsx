"use client"

import { sidebarBtnData } from '@/data/sidebarBtnData';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Bottombar () {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    return (
        <aside className={`flex flex-col justify-between h-17 w-[97%] p-2 fixed left-1/2 -translate-x-1/2 z-40 bottom-2 bg-white text-gray-900 rounded-3xl transition-all duration-300 shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.7)]`}>
            {/* Links */}
            <ul className="relative flex flex-row items-center justify-between h-full">
                {sidebarBtnData.map(({ label, icon: Icon, href }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={label} className={`${isActive ? "!bg-gray-300" : ""} rounded-xl w-fit h-fit`}>
                            <Link 
                                href={href}
                                className={`flex items-center py-2 sm:py-4 px-2 sm:px-4 hover:font-semibold transition-all justify-center`}
                            >
                                <Icon size={22} strokeWidth={isActive ? "2.5" : "2"}/>
                            </Link>
                        </li>
                    )
                })}
                
                {/* --- User Section --- */}
                <li className="rounded-3xl w-fit h-fit hover:bg-gray-200 transition-all">
                    { status === "loading" ? (
                        <div className={`flex items-center justify-center w-full py-1.5 sm:py-3 px-1.5 sm:px-3`}>
                            <div className={`min-w-10 h-10 bg-gradient-to-b from-purple-200 to-purple-400 rounded-full animate-pulse`}></div>
                        </div>
                    ) : session ? (
                        <Link href={"/profile"} className={`flex items-center justify-between gap-3 w-full py-1.5 sm:py-3 px-1.5 sm:px-3 cursor-auto transition-all`}>
                            {session.user?.image ? (
                                <div className="group relative">
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "user-avatar"}
                                        width={34}
                                        height={34}
                                        className="rounded-full border border-gray-300 cursor-pointer"
                                    />
                                </div>
                            ) : (
                                <div className={`w-[34px] h-[34px] bg-gradient-to-b from-purple-200 to-fuchsia-400 rounded-full`}></div>
                            )}
                        </Link>
                    ) : (
                        <Link href={"/profile"} className={`flex items-center justify-center w-full pt-3 pb-3 pl-1.5 pr-1.5 transition-all`}>
                            <div className={`min-w-10 h-10 bg-gradient-to-b from-purple-200 to-purple-800 rounded-full`}></div>
                        </Link>
                    )} 
                </li>
            </ul>
        </aside>
    )
}