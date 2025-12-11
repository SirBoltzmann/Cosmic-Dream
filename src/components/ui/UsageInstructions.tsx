"use client"
import { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function UsageInstructions () {
    const [ showAuto, setShowAuto ] = useState(false);
    const [ showManual, setShowManual ] = useState(false);
    
    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenUsageInstructions");

        if (!hasSeen) {
            setShowAuto(true);
            localStorage.setItem("hasSeenUsageInstructions", "true");
        }
    }, []);

    return (
        <div className="absolute top-30 right-2 bg-white/5 p-2 outline-1 outline-white/50 rounded-xl z-50">
            <InfoIcon onClick={() => setShowManual(true)} size={22} strokeWidth={3} className="text-white hover:cursor-pointer" />
            <AnimatePresence>
                {(showManual || showAuto) && (
                    <motion.div // DARK OVERLAY
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => {
                            setShowAuto(false);
                            setShowManual(false);
                        }}
                        className="flex justify-center items-center fixed inset-0 h-screen w-screen bg-[#00000086] backdrop-blur-[3px] backdrop-saturate-[100%] z-[99]"
                    >
                        {/* MAIN CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            onClick={e => e.stopPropagation()} 
                            className={`relative w-[90%] max-w-[800px] h-[90%] bg-white/5 text-white rounded-xl outline-2 outline-white/90 `}
                        > 
                            <div className="flex flex-col w-full h-full overflow-y-auto slider px-4 py-5">
                                <div >
                                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-2xl font-semibold mb-6">How to use Cosmic Dream:</motion.h2>

                                    <div className="flex flex-col items-center gap-5">
                                        {/* CREATE A NOTE */}
                                        <motion.h3 
                                            initial={{ opacity: 0, y: 20 }} 
                                            whileInView={{ opacity: 1, y: 0 }} 
                                            transition={{ duration: 0.5, ease: "easeOut" }} 
                                            className="self-start text-lg"
                                        >
                                            Create a note:
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }} 
                                            whileInView={{ opacity: 1, y: 0 }} 
                                            transition={{ duration: 0.5, ease: "easeOut" }} 
                                            className="self-start font-light"
                                        >
                                            Click the &#34;Create New Note&#34; button in the top of your screen, and write your thoughts, ideas and feelings...
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            className="relative w-[95%] max-w-[650px] aspect-video mb-7 outline-2 outline-white/50 rounded-xl"
                                        >
                                            <Image
                                                src="/images/create-note.png"
                                                alt="Desktop step one"
                                                fill
                                                className="object-cover rounded-xl"
                                            />
                                        </motion.div>

                                        {/* SAVE YOUR CHANGES */}
                                        <motion.h3 
                                            initial={{ opacity: 0, y: 20 }} 
                                            whileInView={{ opacity: 1, y: 0 }} 
                                            transition={{ duration: 0.5, ease: "easeOut" }} 
                                            className="self-start text-lg"
                                        >
                                            Save your changes:
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }} 
                                            whileInView={{ opacity: 1, y: 0 }} 
                                            transition={{ duration: 0.5, ease: "easeOut" }} 
                                            className="self-start font-light"
                                        >
                                            After creating a note, don&#39;t forget to click the &#34;Save Changes&#34; button at the top-right of your screen, to save your changes. Enjoy Cosmic Dream 🌌✨🌠
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            className="relative w-[95%] max-w-[650px] aspect-video outline-2 outline-white/50 rounded-xl"
                                        >
                                            <Image
                                                src="/images/save-changes.png"
                                                alt="Desktop step two"
                                                fill
                                                className="object-cover rounded-xl"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="mt-12 mb-10 self-center bg-[#010001] text-white font-semibold px-6 py-2 rounded-2xl outline-white outline-1 hover:outline-2 hover:bg-[#2a004b]
                                        hover:shadow-[0px_15px_30px_-5px_rgba(147,_51,_234,_0.7)] transition-all duration-400 ease-in-out hover:cursor-pointer"
                                    onClick={() => {
                                        setShowAuto(false);
                                        setShowManual(false);
                                    }}
                                >
                                    Got it!! ✨🌌
                                </motion.button>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-black/0 rounded-b-xl"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};