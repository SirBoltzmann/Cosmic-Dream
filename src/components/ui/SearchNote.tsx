"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useGeneral } from "@/context/GeneralContext";

interface SearchNotesProps {
    onSearchChange: (value: string) => void;
}


export default function SearchNotes({onSearchChange}: SearchNotesProps) {
    const { isMobile } = useGeneral();
    const [ showInput, setShowInput ] = useState(true);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        setShowInput(!isMobile); //Starts hidden if mobile
    }, [isMobile]);

    return (
        <div className={`flex justify-center items-center ${isMobile ? "" : "ml-23"}`}>
            <div className={`
                flex flex-row items-center ${isMobile ? "justify-center px-2" : "justify-between px-8"} py-3 rounded-2xl text-zinc-200 hover:text-[#fff] font-semibold backdrop-blur-[5px] backdrop-saturate-[122%] bg-[#ffffff11] hover:bg-[#ffffff24] bg-opacity-10 border border-opacity-20 border-[#ffffff8e] hover:border-[#fff] cursor-auto transition-all ease-out
                ${showInput ? "w-[200px] sm:w-[170px] md:w-[300px] lg:w-[450px]" : "w-[60px]"}
            `}>
                {showInput && (
                    <input
                        type="text"
                        value={query}
                        placeholder="Search notes.."
                        className="focus:outline-none w-full"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            onSearchChange(e.target.value);
                        }}
                    />
                )}
                <Search 
                    size={22} 
                    strokeWidth={2} 
                    className="shrink-0"
                    onClick={() => {
                        if (isMobile) setShowInput((prev) => !prev);
                    }}
                />
            </div>
        </div>
    );
}