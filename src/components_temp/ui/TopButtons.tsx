"use client"

import { useState } from "react";
import NoteModal from "../notes/NoteModal";
import NotesList from "../notes/NotesList";
import { useGeneral } from "@/context/GeneralContext";
import TopBarTrigger from "./TopBarTrigger";
import SaveChangesBtn from "./SaveChangesBtn";
import SearchNote from "./SearchNote";
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

export default function TopButtons() {
    const { notes, addNote, deleteNote, updateNote, isMobile } = useGeneral(); 
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalMode, setModalMode ] = useState<"create" | "edit">("create");
    const [ selectedNote, setSelectedNote ] = useState<Note | null>(null);
    const [ searchTerm, setSearchTerm ] = useState("");

    // NOTE INTERACTIONS
    const saveNote =  ( note: Note ) => {
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

    // NOTE FILTERING by SEARCH TERM
    const filteredNotes = notes.filter(
        (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
        <div className="h-screen">
            <div className={`flex flex-row justify-between h-[12%] ${isMobile ? "mx-3" : ""}`}>
                <SearchNote onSearchChange={setSearchTerm}/>
                <TopBarTrigger
                    onOpenModal={setIsModalOpen}
                    onModeChange={setModalMode}
                    onSelectNote={setSelectedNote}
                />
                <SaveChangesBtn/>
            </div>

            {/* Notes list 88% */}
            <NotesList 
                notes={filteredNotes} 
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
    )
}