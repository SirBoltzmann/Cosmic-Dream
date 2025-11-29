"use client"

import AdaptiveNavigation from "@/components/ui/AdaptiveNavigation";
import { useGeneral } from "@/context/GeneralContext";
import { useEffect } from "react";
import Image from "next/image";

interface wallpaperTypes {
    id: number;
    name: string;
    preview: string;
    wallpaperPath: string;
    category: string;
    description: string;
}

export default function SettingsPage() {
    const { currWallpaper, setCurrentWallpaper, isMobile, isSidebarOpen } = useGeneral();

    useEffect(() => {
        const savedWallpaper = localStorage.getItem("currWallpaper");
        if (savedWallpaper) {
            setCurrentWallpaper(savedWallpaper);
        }
    }, [setCurrentWallpaper]);

    useEffect(() => {
        localStorage.setItem("currWallpaper", currWallpaper);
    }, [currWallpaper]);

    const wallpapers:wallpaperTypes[] = [
        { 
            id: 1,
            name: "Cosmic Wanderer",
            preview: "cosmic-stars-thumb.png",
            wallpaperPath: "NativeAnimation.tsx",
            category: "Native animation",
            description: "Find peace, introspection and calm here.. This is a safe place.. floating, drifting away, orbiting..",
        },
        { 
            id: 2,
            name: "Cosmic Dreaming",
            preview: "space-bg-thumb.png",
            wallpaperPath: "space-bg.png",
            category: "Static wallpaper",
            description: "A dark-purple themed nebula.. you can see asteroids and stars here.. It's.. so perfect and peaceful..",
        },
        { 
            id: 3,
            name: "Star Chaser",
            preview: "starry-bg-thumb.png",
            wallpaperPath: "starry-bg.mp4",
            category: "Animated wallpaper",
            description: "A light blue-purple nebula, it's so peaceful you can watch the stars move.. Majestic, isn't it?",
        },
        { 
            id: 4,
            name: "Endless Ocean of Stars",
            preview: "nebulae-bg-thumb.png",
            wallpaperPath: "nebulae-bg.mp4",
            category: "Animated wallpaper",
            description: "Dive into the deepest of the cosmos... tranquility and peace will guide your way to the stars..",
        },
        { 
            id: 5,
            name: "Stargazing in the Darkness",
            preview: "dark-starry-night-thumb.jpg",
            wallpaperPath: "dark-starry-night.jpg",
            category: "Static wallpaper",
            description: "A peaceful dark night, with a sky full of stars.. You can rest here for as long as you want.. traveler..",
        },
    ];

    return (
       <>
            <AdaptiveNavigation/>
            <div className="relative w-full h-full backdrop-blur-[1px] backdrop-saturate-[100%] bg-opacity-0">
                <div className="flex flex-col h-full justify-center">
                    <h2 className={`flex items-center text-4xl font-bold text-purple-50 h-[12%] mb-8 mt-5 ${isMobile ? "pl-7" : isSidebarOpen ? "pl-70" : "pl-23"}`}>Settings</h2>
                    <div className={`${isMobile ? "pl-5" : "pl-[6rem]"} pr-5`}>
                        <div className="w-full"> {/* WALLPAPER SETTING */}
                            <h2 className="text-2xl font-semibold text-white mb-10">Wallpapers</h2>
                            <div className="flex flex-row gap-6 flex-wrap justify-center items-stretch ">
                                {wallpapers.map(({ id, name, preview, wallpaperPath, category, description }) => ( // RENDERING CARDS here <3
                                    <div className="flex flex-col max-w-[400px] min-w-[320px] bg-white rounded-2xl p-3" key={id}>
                                        <h3 className="text-[22px] font-bold mb-3">{name}</h3>
                                        <div className="h-[250px] w-full">
                                            <Image 
                                                src={`/wallpapers/previews/${preview}`} 
                                                alt="wallpaper-image" 
                                                className="w-full h-full rounded-xl object-cover"
                                                draggable={false}
                                                width={400}
                                                height={250}
                                            />
                                        </div>
                                        <p className="font-semibold text-[18px] text-center py-1">{category}</p>
                                        <p className="text-center mb-3.5">{description}</p>
                                        <button 
                                            onClick={() => setCurrentWallpaper(wallpaperPath)}
                                            className= {`cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-[#180029] bg-opacity-80 text-white rounded-3xl transition font-semibold shadow-md`}
                                        >
                                            { currWallpaper === wallpaperPath ? "Current wallpaper" : "Set as wallpaper"}
                                            <div className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-white text-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
                                                { currWallpaper === wallpaperPath ? "Current wallpaper" : "Set as wallpaper?"}
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-2xl text-white font-bold mt-9 mb-24">
                            Adding more configurations and settings in the future.. <br />
                            Stay tuned ❤️🌌
                        </div>
                    </div>
                </div>
            </div>
       </>
    );
}
