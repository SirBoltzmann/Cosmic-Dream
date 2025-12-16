"use client"
import { Play, AudioLines } from "lucide-react";

interface soundtrackTypes {
    id: number;
    title: string;
    artist: string;
    url: string;
	imageUrl: string;
}

interface SoundtrackItemProps {
    soundtrack: soundtrackTypes;
	isActive: boolean;
	onSelect: () => void;
};

export default function SoundtrackItem({ soundtrack, isActive, onSelect }: SoundtrackItemProps) {

	return (
		<button
			className={`flex flex-row items-center justify-between w-full px-2 py-1 mb-2 rounded outline-1 ${isActive ? "bg-white/5 outline-white/50" : "bg-white/20 outline-white/20"} transition-all ease-in-out`}
		>
			<span className="text-sm font-light">{soundtrack.title} — {soundtrack.artist}</span>
			{isActive && <AudioLines size={23}/>}
			<Play onClick={onSelect} size={23} fill="#fff" className="hover:cursor-pointer active:scale-110"/>
		</button>
	);
}
