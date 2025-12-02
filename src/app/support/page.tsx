"use client"

import AdaptiveNavigation from "@/components/ui/AdaptiveNavigation";
import { Instagram, Github, Codepen, Linkedin, TentTree} from "lucide-react";
import { useGeneral } from "@/context/GeneralContext";
import { motion } from "framer-motion";

export default function SupportPage() {
    const { isSidebarOpen, isMobile } = useGeneral();

    return (
        <>
            <AdaptiveNavigation/>
            <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[1px] bg-[#00000008] backdrop-saturate-[125%] bg-opacity-150 -z-1"></div> {/* BLURRED BG */}
            <div className="w-full h-full">
                <div className="flex flex-col h-full items-center gap-3">
					<motion.h2
                        initial={{ transform: "translateX(-20px)", opacity: 0 }} 
                        transition={{ type: "spring" }} 
                        whileInView={{ transform: "translateX(0px)", opacity: 1 }} 
                        className={`self-start text-3xl md:text-4xl font-bold text-purple-50 h-[12%] mb-8 mt-5 ${isMobile ? "pl-7" : isSidebarOpen ? "pl-70" : "pl-23"}`}
                    >
                        Support this Cosmic Dream ❤️🌌
                    </motion.h2>

					<div className={`flex w-full flex-col items-center gap-2 ${isMobile ? "px-1" : "pl-23"}`}> 
                        {/* ABOUT ME */}
						<motion.div
                            initial={{ transform: "translateX(-10px)", opacity: 0 }} 
                            transition={{ type: "spring" }} 
                            whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                            className="w-[95%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"
                        >
							<h3 className="text-2xl font-bold mb-2">A little about me...</h3>
                            <p>Hi, I’m Dario — a dreamer wandering among the stars. 🌌</p>
							<p>
								This project was born from that longing: to build something that connects hearts through creativity, beauty, and the quiet magic of imagination.
                                Every line of code, every design, every idea — carries a fragment of that cosmic dream.
							</p>
                            <p className="font-semibold">
                                If you’d like to help me continue this journey among the stars, you can support me in different ways.. <br />
                                Thank you, truly, for believing in dreams. 💖
                            </p>
						</motion.div>
                        
                        {/* SUPPORT ME pls lol */}
                        <motion.div
                            initial={{ transform: "translateX(10px)", opacity: 0 }} 
                            transition={{ type: "spring" }} 
                            whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                            className="w-[95%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"
                        > 
                            <p className="font-semibold italic">Cosmic Dream will always be free for everyone.</p>
                            <p>
                                But maintaining servers, tools, and time for updates can be challenging. <br />
                                Supporting this project on Patreon helps me keep developing new features, polish the experience, and keep this cosmic diary alive for dreamers like you. 🌌
                            </p>
						</motion.div>
                        
                        {/* SUPPORT */}
                        <div className="flex flex-col w-[95%] md:flex-row md:justify-center gap-3"> 
                            <motion.div 
                                initial={{ transform: "translateX(-10px)", opacity: 0 }} 
                                transition={{ type: "spring" }} 
                                whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                                className="w-full bg-[#ffffff] rounded-2xl px-6 py-3 space-box"
                            >
                                <h3 className="text-xl font-bold mb-2">Ways to support</h3>
                                <ul>
                                    <li>
                                        <a 
                                            href="https://www.patreon.com/cw/SirBoltzmann"
                                            target="_blank" rel="noopener noreferrer"
                                            className="cursor-pointer"
                                        >
                                            <span className="font-bold hover:underline">Patreon</span> :To support me and help the project grow.
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="https://buymeacoffee.com/sirboltzmann" 
                                            target="_blank" rel="noopener noreferrer"
                                            className="cursor-pointer"
                                        >
                                            <span className="font-bold hover:underline ">Buy me a Coffee ☕</span> :To support me and help the project get better.
                                        </a>
                                    </li>
                                    <li>
                                        <span className="font-semibold">Share Cosmic Dream: </span>Telling others about this space means a lot too.
                                    </li>
                                    <li>
                                        <span className="font-semibold">Feedback: </span>Your kind words and ideas help me more than you imagine.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ transform: "translateX(10px)", opacity: 0 }} 
                                transition={{ type: "spring" }} 
                                whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                                className="w-full bg-[#ffffff] rounded-2xl px-6 py-3 space-box "
                            > {/* SOCIALS */}
                                <h3 className="text-xl font-bold mb-2">You can follow me</h3>
                                <p>The following are my social accounts:</p>

                                <div className="flex items-center justify-center gap-4 mt-3">
                                    <div className="relative group">
                                        <a 
                                            href="https://github.com/SirBoltzmann" 
                                            target="_blank" rel="noopener noreferrer" 
                                            className="cursor-pointer"
                                        >
                                            <Github size={30} />
                                        </a>
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 text-white text-sm px-2 py-1 rounded-md -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            Visit my GitHub
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <a 
                                            href="https://www.linkedin.com/in/dario-arica-camacho-60ab822ba/" 
                                            target="_blank" rel="noopener noreferrer" 
                                            className="cursor-pointer"
                                        >
                                            <Linkedin size={30} />
                                        </a>
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 text-white text-sm px-2 py-1 rounded-md bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            Visit my LinkedIn
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <a 
                                            href="https://codepen.io/StellarVoyageur" 
                                            target="_blank" rel="noopener noreferrer" 
                                            className="cursor-pointer"
                                        >
                                            <Codepen size={30} />
                                        </a>
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 text-white text-sm px-2 py-1 rounded-md -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            Visit my Codepen
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <a 
                                            href="https://darioaricav2.netlify.app/" 
                                            target="_blank" rel="noopener noreferrer" 
                                            className="cursor-pointer"
                                        >
                                            <TentTree size={30} />
                                        </a>
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 text-white text-sm px-2 py-1 rounded-md bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            My Website
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <a 
                                            href="https://www.instagram.com/darioaricacamacho/" 
                                            target="_blank" rel="noopener noreferrer" 
                                            className="cursor-pointer"
                                        >
                                            <Instagram size={30} />
                                        </a>
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 text-white text-sm px-2 py-1 rounded-md -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            Visit my Intagram
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* BUTTONS */}
                        <div className={`flex flex-col items-center w-[95%] sm:flex-row sm:justify-center gap-4 my-7 ${isMobile ? "pb-24" : ""}`} >
                            <motion.a
                                initial={{ transform: "translateX(-20px)", opacity: 0 }} 
                                transition={{ type: "spring" }} 
                                whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                                href="https://www.patreon.com/SirBoltzmann"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-56 px-6 py-3 bg-[#ff424d] text-white font-semibold rounded-2xl shadow-lg shadow-[#ff424d]/40 hover:scale-105 hover:shadow-[#ff424d]/60 transition-all duration-300"
                            >
                                Support on Patreon ❤️
                            </motion.a>

                            <motion.a
                                initial={{ transform: "translateX(20px)", opacity: 0 }} 
                                transition={{ type: "spring" }} 
                                whileInView={{ transform: "translateX(0px)", opacity: 1 }}
                                href="https://buymeacoffee.com/sirboltzmann"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-56 px-6 py-3 bg-[#ffdd00] text-[#232323] font-semibold rounded-2xl shadow-lg shadow-[#ffdd00]/40 hover:scale-105 hover:shadow-[#ffdd00]/60 transition-all duration-300"
                            >
                                Buy me a Coffee ☕
                            </motion.a>
                        </div>
					</div>
				</div>
            </div>
        </>
    );
}
