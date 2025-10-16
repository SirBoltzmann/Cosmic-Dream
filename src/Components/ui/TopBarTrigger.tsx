"use client";

import { useState } from "react";
import NoteModal from "../notes/NoteModal";
import NotesList from "../notes/NotesList";
import { useGeneral } from "@/context/GeneralContext";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
};

export default function TopBarTrigger() {
    /* Using context */
    const { notes, addNote, deleteNote, updateNote } = useGeneral(); 
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalMode, setModalMode ] = useState<"create" | "edit">("create");
    const [ selectedNote, setSelectedNote ] = useState<Note | null>(null);


    const saveNote = ( note: Note ) => {
        if (modalMode === "create") {
            addNote(note);
        } else {
            updateNote(note);
        }
    }

    const handleDeleteNote = ( id: string ) => {
        deleteNote(id);
    }

    const editNote = ( id: string ) => {
        const noteToEdit = notes.find((n) => n.id === id);
        if (noteToEdit) {
            setModalMode("edit");
            setSelectedNote(noteToEdit);
            console.log(noteToEdit);
            setIsModalOpen(true);
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center content-center ">
            {/* Create button 12%*/}
            <div className="h-[12%] flex justify-center items-center">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setModalMode("create");
                        setSelectedNote(null);
                    }}
                    className="px-8 py-3 rounded-2xl text-zinc-200 hover:text-[#fff] font-semibold backdrop-blur-[5px] backdrop-saturate-[122%] bg-[#ffffff11] hover:bg-[#ffffff24] bg-opacity-10 border border-opacity-20 border-[#ffffff8e] hover:border-[#fff] cursor-pointer transition-all ease-out"
                >
                    + Create New Note
                </button>
            </div>

            {/* Notes list 88% */}
            <NotesList 
                notes={notes} 
                onDelete={handleDeleteNote} 
                onEdit={editNote}
            />

            {/* Modal */}
            {isModalOpen && (
                <NoteModal 
                    mode={modalMode}
                    note={selectedNote ?? undefined}
                    onSave={saveNote}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
