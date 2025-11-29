"use client";
import { useEffect, useState } from "react";

type Star = {
    id: number;
    x: number;
    y: number;
    size: number;
    blinkGroup: string;
}

export default function NativeAnimation() {
    const [stars, setStars] = useState<Star[]>([]);
    const [ isClient, setIsClient ] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const starNumber: number = 400;
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

    if (!isClient) return null;

    return (
        <div className="fixed flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-gradient-to-b from-[#000000] via-[#0d0017] to-[#21003a] text-white z-0">
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
                    bg-[#210144] rounded-full blur-3xl top-[-200px] left-[-150px] animate-[floatInSite_6s_ease-in-out_infinite]"
                />
                <div className="
                    absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                    bg-[#050051ef] rounded-full blur-3xl bottom-[-200px] right-[-100px] animate-[floatInSite_8s_ease-in-out_infinite]" 
                />
            </div>
        </div>
    );
}
