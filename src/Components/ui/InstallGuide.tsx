"use client"
import { useGeneral } from "@/context/GeneralContext";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function InstallGuide () {
    const [ hydrated, setHydrated ] = useState(false);
    const { isMobile } = useGeneral();
    const [ showAuto, setShowAuto ] = useState(false);
    const [ showManual, setShowManual ] = useState(false);
    const [ platform, setPlatform ] = useState<"android"|"desktop"|"ios">("desktop");

    // DETECTING HYDRATION
    useEffect(() => {
        setHydrated(true);
    }, [])
    
    // PLATFORM DETECTION
    function detectPlatform() {
        const ua = navigator.userAgent.toLowerCase();

        const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

        const isAndroid = /android/.test(ua);

        if (isIOS) return "ios";
        if (isAndroid) return "android";
        return "desktop";
    }

    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenInstallGuide");

        if (!hasSeen) {
            const p = detectPlatform();
            // console.log("auto", p);
            setPlatform(p);
            setShowAuto(true);
            localStorage.setItem("hasSeenInstallGuide", "true");
        } else {
            const plat = detectPlatform();
            // console.log("manual", plat);
            setPlatform(plat);
        }
    }, []);

    if (!hydrated) return null;

    return (
        <div className="absolute bottom-30 right-2 bg-white/5 p-2 outline-1 outline-white/50 rounded-xl">
            <Download onClick={() => setShowManual(true)} size={22} strokeWidth={3} className="text-white hover:cursor-pointer" />
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
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            onClick={e => e.stopPropagation()} 
                            className={`relative w-[90%] max-w-[800px] h-[90%] ${platform === "ios" && "h-fit"} bg-white/5 text-white rounded-xl outline-2 outline-white/90 `} /* h-fit as IOS is a small section */ 
                        > 
                            <div className="flex flex-col w-full h-full overflow-y-auto slider px-4 py-5">
                                {platform === "ios" && (
                                    <>
                                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="text-2xl font-semibold mb-6">How to install on iOS</motion.h2>
                                        <p className="self-start font-light">I&apos;m still working on this!! Be patient, I won&apos;t abandon my IOS users..</p>
                                        <p className="self-start font-semibold">Thank you for being here.. I appreciate you.. ❤️🌌✨</p>
                                    </>
                                )}

                                {platform === "android" && (
                                    <div >
                                        <motion.h2 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            viewport={{ once: false }}
                                            className="text-2xl font-semibold mb-6"
                                        >
                                            How to install {isMobile ? "" : "Cosmic Dream"} on Android:
                                        </motion.h2>

                                        <div className="flex flex-col items-center gap-5">
                                            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="self-start font-light">1. Tap on the three dots, at the top-right corner..</motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="relative w-[95%] max-w-[650px] aspect-[9/20] mb-3 outline-2 outline-white/50 rounded-xl"
                                            >
                                                <Image
                                                    src="/images/android-guide-first.jpeg"
                                                    alt="Android step one"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </motion.div>

                                            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="self-start font-light">2. Look for the &quot;Add to Home Screen&quot; option.. 🌌✨🌠</motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="relative w-[95%] max-w-[650px] aspect-[9/20] mb-3 outline-2 outline-white/50 rounded-xl"
                                            >
                                                <Image
                                                    src="/images/android-guide-second.jpeg"
                                                    alt="Android step two"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </motion.div>

                                            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="self-start font-light">3. The clicked option will display a modal. Click on &quot;Install&quot;.. And enjoy Cosmic Dream 🌌✨🌠</motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="relative w-[95%] max-w-[650px] aspect-[9/20] outline-2 outline-white/50 rounded-xl"
                                            >
                                                <Image
                                                    src="/images/android-guide-third.jpeg"
                                                    alt="Android step three"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {platform === "desktop" && (
                                    <div >
                                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-2xl font-semibold mb-6">How to install {isMobile ? "" : "Cosmic Dream"} on Desktop:</motion.h2>

                                        <div className="flex flex-col items-center gap-5">
                                            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="self-start font-light">
                                                1. Click on the icon showed in the following picture..
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="relative w-[95%] max-w-[650px] aspect-video mb-3 outline-2 outline-white/50 rounded-xl"
                                            >
                                                <Image
                                                    src="/images/desktop-guide-first.png"
                                                    alt="Desktop step one"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </motion.div>

                                            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="self-start font-light">
                                                2. The clicked icon will display a modal. Click on &quot;Install&quot;.. And enjoy Cosmic Dream 🌌✨🌠
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="relative w-[95%] max-w-[650px] aspect-video outline-2 outline-white/50 rounded-xl"
                                            >
                                                <Image
                                                    src="/images/desktop-guide-second.png"
                                                    alt="Desktop step two"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="mt-12 mb-10 self-center bg-[#010001] text-white font-semibold px-6 py-2 rounded-2xl outline-white outline-1 hover:outline-2 hover:bg-[#2a004b]
                                        hover:shadow-[0px_15px_30px_-5px_rgba(147,_51,_234,_0.7)] transition-all duration-400 ease-in-out hover:cursor-pointer"
                                    onClick={() => {
                                        setShowAuto(false);
                                        setShowManual(false);
                                    }}
                                >
                                    I understand this ✨🌌
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