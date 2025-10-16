"use client";

import React, { createContext, useContext, useState } from "react";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
};

type GeneralContextType = {
    // NOTE FUNCTIONALITIES AND STATES
    notes: Note[];
    addNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    toggleFavorite: (id: string) => void;
    toggleArchived: (id: string) => void;

    // SIDEBAR STATES
    isSidebarOpen: boolean;
    toggleSidebar: () => void;

    // WALLPAPERS
    currWallpaper: string;
    setCurrentWallpaper: (wallpaperId: string) => void;
};

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
    // NOTE FUNCTIONALITIES AND STATES
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => setNotes((prev) => [...prev, note]);

    const updateNote = (updatedNote: Note) => {
        setNotes((prev) => 
            prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
        )
    }
    
    const deleteNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));

    const toggleFavorite = (id: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
            )
        );
    }

    const toggleArchived = (id: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isArchived: !note.isArchived } : note
            )
        );
    }

    // SIDEBAR STATES
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    // WALLPAPERS
    const [ currWallpaper, setCurrWallpaper ] = useState("space-bg.png");
    const setCurrentWallpaper = (wallpaperId: string) => {
        setCurrWallpaper(wallpaperId);
    }

    return (
        <GeneralContext.Provider value={{ notes, addNote, updateNote, deleteNote, toggleFavorite, toggleArchived, isSidebarOpen, toggleSidebar, currWallpaper, setCurrentWallpaper }}>
            {children}
        </GeneralContext.Provider>
    );
};

export const useGeneral = () => {
    const context = useContext(GeneralContext);

    if (!context) {
        throw new Error("UseGeneral must be used within GeneralProvider");
    }
    return context;
};
