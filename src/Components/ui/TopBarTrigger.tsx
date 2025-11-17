"use client";

import { Timestamp } from "firebase/firestore";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

interface TopBarTriggerProps {
    onOpenModal: (status: boolean) => void;
    onModeChange: (mode: "create" | "edit") => void;
    onSelectNote: (note: Note | null) => void;
}


export default function TopBarTrigger({onOpenModal, onModeChange, onSelectNote}: TopBarTriggerProps) {
    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => {
                    onOpenModal(true);
                    onModeChange("create");
                    onSelectNote(null);
                }}
                className="px-4 md:px-8 py-3 rounded-2xl text-zinc-200 hover:text-[#fff] font-semibold backdrop-blur-[5px] backdrop-saturate-[122%] bg-[#ffffff11] hover:bg-[#ffffff24] bg-opacity-10 border border-opacity-20 border-[#ffffff8e] hover:border-[#fff] cursor-pointer transition-all ease-out"
            >
                <span className="inline sm:hidden">New Note</span>
                <span className="hidden sm:inline">+ Create New Note</span>
            </button>
        </div>
    );
}
