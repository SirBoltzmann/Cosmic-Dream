"use client";

import { useState, useEffect } from "react";
import NoteEditor from "../notes/NoteEditor";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
};

interface NoteModalProps {
    mode: "create" | "edit";
    note?: Note;
    onClose: () => void;
    onSave: ( note: Note ) => void;
}

// NoteModal passes "onClose" and "onCreate" to TopBarTrigger
export default function NoteModal( { mode, note, onClose, onSave }: NoteModalProps ) {
    const [ title, setTitle ] = useState(note?.title ?? "");
    const [ content, setContent ] = useState(note?.content ?? "");

    useEffect(() => {
        if (mode === "edit" && note) {
            setTitle(note.title);
            setContent(note.content);
        } else if (mode === "create") {
            setTitle("");
            setContent("");
        }
    }, [mode, note]);

    const handleSave = () => {
        const newNote: Note = {
            id: note?.id ?? crypto.randomUUID(),
            title: title,
            content: content,
            isFavorite: note?.isFavorite ?? false,
            isArchived: note?.isArchived ?? false,
        };
        onClose();
        onSave(newNote);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a2] backdrop-blur-[3px] backdrop-saturate-[112%] z-50 transition-all ease-in-out">
            <div className="bg-[#121113] border-2 border-[#ffffff8a] hover:border-[#ffffffbe] rounded-2xl p-6 w-120 shadow-lg transition">
                <h2 className="text-white text-xl font-bold mb-4">{ mode === "create" ? "Create Note" : "Edit Note" }</h2>
                <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="text-white w-full font-semibold border-1 border-[#ffffff85] rounded px-3 py-2.5 mb-4 focus:outline-none focus:ring-1 focus:ring-[#ffffffa9]"
                />
                <NoteEditor onChange={setContent} prevValue={content} />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-amber-50 rounded bg-red-500 hover:bg-red-600 cursor-pointer transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            console.log(`Your List was Created / Updated!! 💙 ${title} ${content}`);
                            handleSave();
                        }}
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-800 cursor-pointer transition"
                    >
                        { mode === "create" ? "Save Note" : "Update Note" }
                    </button>
                </div>
            </div>
        </div>
    )
}