"use client"

import { useGeneral } from "@/context/GeneralContext";
import { useRef, useState } from "react";
import { getDate } from "@/utils/utils";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { EditIcon, TrashIcon, Star, Archive, X } from "lucide-react";
import AsteroidImg from "../../../public/test3.png";
// IMPORT ASTEROID

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

interface NoteCardProps {
    note: Note;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
    const [ isCardOpen, setIsCardOpen ] = useState(false);
    const {notes, toggleFavorite, toggleArchived } = useGeneral();
    const currNote = notes.find(({ id }) => id === note.id);
    const data = currNote ?? note;
    
    const toggleCard = () => {
        setIsCardOpen(!isCardOpen);
    };

    function randomAnimation() {
        const animations = [
            "animate-[float_6s_ease-in-out_infinite]",
            "animate-[drift_7s_ease-in-out_infinite]",
            "animate-[hover_6s_ease-in-out_infinite]",
            "animate-[sway_5s_ease-in-out_infinite]",
            "animate-[slide_4s_ease-in-out_infinite]",
        ];
        return animations[Math.floor(Math.random() * animations.length)];
    }

    const animationClass = useRef(randomAnimation()); // Using ref, so the animation doesn't change when re-render..

    return (
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] p-2">
            <Image 
                className={`w-full h-full cursor-pointer transition hover:scale-110 ${animationClass.current}`}
                onClick={toggleCard} 
                src={AsteroidImg} alt="asteroid" draggable={false} 
            />
            <h2 className="text-center absolute top-[20%] left-1/2 -translate-x-1/2 text-white text-2xl font-bold " onClick={toggleCard}>
                {note.title.length > 16 ? (note.title.slice(0, 16) + "...") : note.title}
            </h2>

            { isCardOpen && /* OVERLAY */
                <div onClick={toggleCard} className="flex justify-center items-center fixed right-0 top-0 h-screen w-screen bg-[#000000a2] backdrop-blur-[3px] backdrop-saturate-[100%] z-50 cursor-default">
                    <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col justify-center w-full sm:w-[28rem] md:w-[32rem] lg:w-[36rem] gap-3 p-5 pb-11 bg-[#121113] border-2 border-[#ffffff8a] hover:border-[#ffffffbe] rounded-2xl transition">
                        <button onClick={toggleCard} className="absolute top-3 right-3 text-amber-50 cursor-pointer">
                            <X size={25} strokeWidth={2.2}/>
                        </button>
                        <h2 className="w-full font-bold text-white text-lg" >{data.title}</h2>
                        <div 
                            className="w-full max-h-52 sm:max-h-64 md:max-h-72 lg:max-h-96 overflow-auto text-white [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:mb-1"
                            dangerouslySetInnerHTML={{ __html: data.content }}> 
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <div className="flex justify-around items-center gap-3 mr-3 text-white">
                                <Star 
                                    className="cursor-pointer"
                                    fill={`${currNote?.isFavorite ? "#fff" : ""}`} 
                                    size={28} 
                                    strokeWidth={2.2} 
                                    onClick={() => toggleFavorite(note.id)}
                                />
                                <Archive
                                    className="cursor-pointer"
                                    fill={`${currNote?.isArchived ? "#fff" : ""}`} 
                                    size={28} 
                                    strokeWidth={2.2} 
                                    onClick={() => toggleArchived(note.id)}
                                />
                            </div>
                            { onDelete && (
                                <button
                                    onClick={() => onDelete(note.id)}
                                    className=" flex items-center gap-3 w-fit px-4 py-2 whitespace-nowrap text-amber-50 bg-red-500 hover:bg-red-600 cursor-pointer hover:outline hover:outline-[#ffffffd5] rounded transition"
                                >
                                    <span className="hidden sm:inline">Delete</span>
                                    <TrashIcon size={18} strokeWidth={2.2}/>
                                </button>
                            )}
                            { onEdit && (
                                <button
                                    onClick={() => onEdit(note.id)}
                                    className="flex items-center gap-3 px-4 py-2 whitespace-nowrap text-amber-50 rounded bg-cyan-600 hover:bg-cyan-800 cursor-pointer hover:outline hover:outline-[#ffffffd5] transition"
                                >
                                    <span className="hidden sm:inline">Edit Note</span>
                                    <EditIcon size={18} strokeWidth={2.2}/>
                                </button>
                            )}
                        </div>

                        <div className="absolute bottom-2 left-3 text-sm font-light text-[#ffffff60]">
                            <div className="relative group cursor-default w-fit">
                                Updated: {getDate(data.updatedAt)}

                                {/* Tooltip */}
                                <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block bg-[#1211134f] text-white text-xs  px-2 py-1 rounded whitespace-nowrap border border-white/20 shadow-lg backdrop-blur-sm">
                                    Created: {getDate(data.createdAt)}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}