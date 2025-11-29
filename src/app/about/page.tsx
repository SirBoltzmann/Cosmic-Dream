"use client"

import AdaptiveNavigation from "@/components/ui/AdaptiveNavigation";
import { useGeneral } from "@/context/GeneralContext";

export default function AboutPage() {
	const { isSidebarOpen, isMobile } = useGeneral();

	return (
		<>
			<AdaptiveNavigation/>
			<div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[1px] bg-[#0000000a] backdrop-saturate-[115%] bg-opacity-150 -z-1"></div> {/* BLURRED BG */}
			<div className="w-full h-full">
				<div className="flex flex-col h-full items-center gap-3">
					<h2 className={`self-start text-3xl md:text-4xl font-bold text-purple-50 h-[12%] mb-8 mt-5 ${isMobile ? "pl-7" : isSidebarOpen ? "pl-70" : "pl-23"}`}>About my Project</h2>
					{/* TOP GRID */}
					<div className={`flex flex-col md:flex-row md:justify-center flex-wrap gap-5 ${isMobile ? "pl-5" : "pl-23"}`}> 
						<div className="w-[95%] md:w-[45%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* APP */}
							<h3 className="text-2xl font-bold mb-2">Cosmic Dream 🌌</h3>
							<p>
								A poetic cosmic experience — a quiet space where every thought becomes a drifting asteroid across the cosmos.  
    							<br />Each fragment of your mind floats in silence, waiting to be found again under a new constellation...
							</p>
						</div>

						<div className="w-[95%] md:w-[45%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* INSPIRATION */}
							<h3 className="text-2xl font-bold mb-2">My Inspiration</h3>
							<p>
								I always dreamed about a private universe ¬ a sanctuary for cosmic dreams and thoughts.
								<br /> To let them wander freely as glowing memories among the stars..
								<br /> This project isn&apos;t only code and maths.. it was born from inside my soul.. it&apos;s about peace, introspection and finding beauty and silence and calm..
							</p>
						</div>
					</div>

					{/* MID GRID */}
					<div className={`flex flex-col md:flex-row md:justify-center flex-wrap gap-2.5 ${isMobile ? "pl-5" : "pl-23"}`}> 
						<div className="w-[95%] md:w-[30%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* CREATION */}
							<h3 className="text-2xl font-bold mb-2">The Creation</h3>
							<p>
								Built with Next.js, React and Tailwind CSS ¬ each component designed to feel fluid and alive.
								<br/> Every pixel was placed to capture and reflect serenity of space.. Feel free to dive and let this space become your safe place.. 
							</p>
						</div>

						<div className="w-[95%] md:w-[30%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* PHILOSOPHY */}
							<h3 className="text-2xl font-bold mb-2">My Philosophy</h3>
							<p>
								Look for answers, find the truth. 
							</p>
						</div>

						<div className="w-[95%] md:w-[30%] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* MESSAGE */}
							<h3 className="text-2xl font-bold mb-2">My Message to You</h3>
							<p>
								Did you somehow have the feeling that the world is not what we think it is..?
								<br /> Look for answers, find the truth. Follow your curiosity, lead humanity forward.. The stars are waiting for us.
							</p>
						</div>
					</div>

					{/* BOTTOM GRID */}
					<div className={`flex w-full md:justify-center ${isMobile ? "pl-5 pb-24" : "pl-23"}`}> 
						<div className="w-[95%] md:w-[calc(90%+20px)] bg-[#ffffff] rounded-2xl px-6 py-3 space-box"> {/* SPECIAL CREDITS */}
							<h3 className="text-2xl font-bold mb-2">Special Credits..</h3>
							<p>
								Thanks to the stars that inspired me, to the silence that gave me space, to the people who believed in me, the ones I love, and helped me. Thanks my dear Meily ❤️🌌<br />
								Gaze into the night and discover ancient stories written in starlight. <br />
								Each constellation whispers secrets of time, and every star burns and echo the dreams of those who once looked up... God bless, you. ❤️
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
