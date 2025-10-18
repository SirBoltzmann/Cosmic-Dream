"use client"
import { useGeneral } from "@/context/GeneralContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Wallpapers () {
    const { currWallpaper } = useGeneral();
    const [ visibleWallpaper, setVisibleWallpaper ] = useState(currWallpaper);
    const [ isFading, setIsfading ] = useState(false);

    useEffect(() => { // FADE ANIMATION
        if (currWallpaper !== visibleWallpaper) { // When the wallpaper is changed activate the fade  
            setIsfading(true);
            const timeout = setTimeout(() => { // After 700ms, update "currWallpaper", and disable the fade
                setVisibleWallpaper(currWallpaper);
                setIsfading(false);
            }, 700);
            return () => clearTimeout(timeout);
        }
    }, [currWallpaper, visibleWallpaper])
    
    if (!visibleWallpaper) return null;

    const isAnimated = visibleWallpaper.endsWith(".mp4");
    return isAnimated 
        ? // If the current wallpaper is Animated Wallpaper
        (
            <video 
                key={visibleWallpaper}
                autoPlay
                loop
                muted
                playsInline
                className={`fixed top-0 left-0 inset-0 w-full h-full object-cover z-[-1] select-none pointer-events-none transition-opacity duration-700 ${isFading ? "opacity-0" : "opacity-100"}`}
            >
                <source src={`/wallpapers/${currWallpaper}`} type="video/mp4" />
            </video>
        )
        : // If it's a Static Wallpaper
        (   
            <div className="fixed top-0 left-0 w-full h-full z-[-1]">
                <Image
                    key={visibleWallpaper}
                    src={`/wallpapers/${currWallpaper}`}
                    alt="background-wallpaper"
                    fill
                    priority
                    unoptimized
                    className={`object-cover select-none pointer-events-none transition-opacity duration-700 ${
                    isFading ? "opacity-0" : "opacity-100"
                    }`}
                />
            </div>
        )
}
