"use client"

import { useGeneral } from "@/context/GeneralContext";
import { PanelRight, LucideLogIn } from "lucide-react";
import { sidebarBtnData } from '@/data/sidebarBtnData';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar () {
    const { isSidebarOpen, toggleSidebar } = useGeneral();
    const pathname = usePathname();

    return (
        <aside className={`${isSidebarOpen ? 'w-64 p-3' : 'w-16 p-2'} flex flex-col justify-between h-screen fixed z-40 left-0 top-0 bg-white text-gray-900 rounded-tr-xl rounded-br-xl transition-all duration-300 shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.7)]`}>
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
            <ul className="flex flex-col h-full">
                {sidebarBtnData.map(({ label, icon: Icon, href }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={label} className={`${isActive ? "!bg-gray-200" : ""} relative group rounded-2xl hover:bg-gray-100 transition-all`}>
                            <Link 
                                href={href}
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
                
                <li className="relative group mt-auto rounded-2xl hover:bg-gray-100 transition-all">
                    <Link 
                        href={"/log-in"}
                        className={`flex items-center gap-3 pt-4.5 pb-4.5 pl-1.5 pr-1.5 hover:font-bold transition-all ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LucideLogIn size={isSidebarOpen ? 21 : 22}/>
                        { isSidebarOpen && "Log In" }
                    </Link>
                    {!isSidebarOpen && (
                        <span className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 bg-white text-black text-sm px-2 py-1 rounded-md bottom-3 left-16 whitespace-nowrap shadow-[0px_-3px_36px_5px_rgba(0,0,0,0.5)]">
                            Log in
                        </span>
                    )}
                </li>
            </ul>
        </aside>
    )
}