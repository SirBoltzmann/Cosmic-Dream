"use client";
import { usePWA } from "@/utils/usePWA";
import { useGeneral } from "@/context/GeneralContext";
import { motion } from "framer-motion";
import { Download, CheckCircle, Info } from "lucide-react";

export default function InstallAppButton() {
    const { isMobile } = useGeneral();
    const { canInstall, isInstalled, inStandalone, install } = usePWA();
    // console.log({
    //     canInstall,
    //     isInstalled,
    //     inStandalone,
    //     install,
    // });
    
    return (
        <>
            {/* If installed and openned inside the PWA */}
            { isInstalled && inStandalone && (
                <motion.div
                    initial={{ transform: "translateY(20px)" }}
                    transition={{ type: "spring" }}
                    whileInView={{ transform: "translateY(0px)" }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#21003A] via-[#140023] to-[#000000] outline-1 outline-white text-white rounded-full text-sm font-medium shadow"
                >
                    <CheckCircle size={17} />
                    {isMobile ? "Cosmic Dream Installed ✨🌌" : "Cosmic Dream Installed in your Device 🌌🌠✨"}
                </motion.div>
            )}

            {/* If installed but openned in the browser */}
            { isInstalled && !inStandalone && (
                <motion.div
                    initial={{ transform: "translateY(20px)" }}
                    transition={{ type: "spring" }}
                    whileInView={{ transform: "translateY(0px)" }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-l from-[#250041] via-[#140023] to-[#000000] outline-1 outline-white text-indigo-100 rounded-xl text-sm font-medium"
                >
                    <Info size={17} />
                    {isMobile ? "App installed, find it in your homescreeen" : "Cosmic Dream Installed 🌌✨ — Find it in your homescreen"}
                </motion.div>
            )}

            {/* Install button */}
            { !isInstalled && canInstall && !inStandalone && (
                <motion.button
                    onClick={install}
                    initial={{ transform: "translateY(20px)" }}
                    transition={{ type: "spring" }}
                    whileInView={{ transform: "translateY(0px)" }}
                    whileHover={{ scale: 1.06, cursor: "pointer" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#21003A] via-[#140023] to-[#000000] outline-1 outline-white text-white rounded-full text-sm font-medium shadow"
                >
                    <Download size={18} />
                    <span>Install Cosmic Dream ✨🌌</span>
                </motion.button>
            )}
        </>
    )
}
