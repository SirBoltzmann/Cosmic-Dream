"use client"
import { useGeneral } from "@/context/GeneralContext";
import { useState, useRef, useEffect } from "react";
import { soundtracks } from "@/data/soundtracks";
import SoundtrackItem from "@/components/ui/SoundtrackItem";
import { Play, Pause, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// interface soundtrackTypes {
//     id: number;
//     title: string;
//     artist: string;
//     url: string;
//     imageUrl: string;
// }

export const MenuMusic = () => {
    // STATES
    const { audioRef, isPlaying, togglePlay, currentTrack, handleSelectSoundtrack, isMobile } = useGeneral();
    const [isDeployed, setIsDeployed] = useState(false);

    // Scroll animation
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [ scrollWidth, setScrollWidth ] = useState(0);
    const soundtrackName = `${currentTrack.title} - ${currentTrack.artist}`;
    const shouldScroll = soundtrackName.length > 13;

    // MEASURE THE DIV WIDTH FOR THE SCROLL ANIMATION
    useEffect(() => {
        if (marqueeRef.current) {
            const singleItemWidth = Math.ceil(marqueeRef.current.scrollWidth / 2);
            setScrollWidth(singleItemWidth);
        }
    }, [marqueeRef, currentTrack]);

    const isSoundtrackPlaying = (id: number) => isPlaying && currentTrack.id === id;

    return (
        <div className={`flex gap-2 absolute ${isMobile ? "flex-row items-center bottom-30 left-3" : "flex-col bottom-7 left-20"} z-20`}>
            <AnimatePresence>
                {!isMobile && !isDeployed && 
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: (isMobile ? 20 : -50) }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        exit={{ opacity: 0, scale: 0.95, x: (isMobile ? 20 : -50) }}
                    >
                        <Image
                            src={currentTrack.imageUrl} 
                            alt="cover-image"
                            width={110}
                            height={110}
                            className="rounded-xl outline-1 outline-white/60 hover:outline-white/90 transition-all ease-in-out z-20"
                        />
                    </motion.div>
                }
            </AnimatePresence>
            {isMobile &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: (isMobile ? 20 : -50) }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <Image
                        src={currentTrack.imageUrl} 
                        alt="cover-image"
                        width={50}
                        height={50}
                        className="rounded-xl outline-1 outline-white/60 hover:outline-white/90 transition-all ease-in-out z-20"
                    />
                </motion.div>
            }
            <motion.div
                initial={{ opacity: 0, scale: 0.95, x: (isMobile ? 20 : -50) }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`
                    w-54 h-10 backdrop-blur-[1px] text-white rounded-xl outline-2 outline-white/60
                    px-3 py-2 hover:outline-white/90 transition-all ease-in-out
                `}
            >
                {/* BUTTON */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-full h-full flex flex-wrow items-center justify-between"
                >
                    <motion.div className="w-28 overflow-hidden relative">
                        {shouldScroll
                            ? (
                                <motion.div
                                    ref={marqueeRef}
                                    key={currentTrack.id}
                                    animate={{ x: [0, -scrollWidth / 2 - 70]}}
                                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                    className="flex gap-6"
                                >
                                    <span className="font-light text-md whitespace-nowrap">{currentTrack.title} - {currentTrack.artist}</span>
                                    <span className="font-light text-md whitespace-nowrap">{currentTrack.title} - {currentTrack.artist}</span>
                                </motion.div>
                            ) : (<span className="font-light text-md">{currentTrack.title} - {currentTrack.artist}</span>)

                        }
                    </motion.div>
                    {isPlaying 
                        ? <Pause onClick={() => {togglePlay()}} size={23} strokeWidth={1} fill="#fff" className="hover:cursor-pointer active:scale-110"/>
                        : <Play onClick={() => togglePlay()} size={23} strokeWidth={1} fill="#fff" className="hover:cursor-pointer active:scale-110"/>
                    }
                    <List onClick={() => setIsDeployed(!isDeployed)} size={23} strokeWidth={2} color="#fff" className="hover:cursor-pointer"/>
                </motion.div>

                {/* DROPDOWN */}
                <AnimatePresence>
                    {isDeployed && 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className={`
                                absolute w-54 bottom-12 left-0 backdrop-blur-[1px] text-white rounded-xl outline-2 outline-white/60 z-50
                                p-2
                            `}
                        >
                            {soundtracks.map((st) => (
                                <SoundtrackItem
                                    key={st.id}
                                    soundtrack={st}
                                    isActive={isSoundtrackPlaying(st.id)}
                                    onSelect={() => handleSelectSoundtrack(st)}
                                />
                            ))}
                            <button
                                className={`flex flex-row items-center justify-between w-full px-2 py-1 rounded outline-1 bg-white/5 outline-white/50 cursor-pointer transition-all ease-in-out`}
                            >
                                <span className="text-sm font-light">Adding more music in the future, so stay tuned ❤️🌌</span>
                            </button>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
