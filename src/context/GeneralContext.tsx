"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore"
import { db, auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

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

    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;

    // GENERAL STATES
    isMobile: boolean;
};

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log("User signed out, clearing data 💨");
                setNotes([]);
                setHasUnsavedChanges(false);
                return;
            }

            try {
                console.log("User signed in:", user.uid);
                const noteRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(noteRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.notes) {
                        setNotes(data.notes);
                        console.log("Notes synced from Firestore! 🌠");
                    }
                } else {
                    console.log("No notes found for this user.");
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        });

        return () => unsubscribe();
    }, []);


    // NOTE FUNCTIONALITIES AND STATES
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes((prev) => [...prev, note]);
        setHasUnsavedChanges(true);
    }

    const updateNote = (updatedNote: Note) => {
        setNotes((prev) => 
            prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
        )
        setHasUnsavedChanges(true);
    }
    
    const deleteNote = (id: string) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        setHasUnsavedChanges(true);
    }

    const toggleFavorite = (id: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
            )
        );
        setHasUnsavedChanges(true);
    }

    const toggleArchived = (id: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, isArchived: !note.isArchived } : note
            )
        );
        setHasUnsavedChanges(true);
    }

    // SIDEBAR STATES
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    // WALLPAPERS
    const [ currWallpaper, setCurrWallpaper ] = useState("NativeAnimation.tsx");
    const setCurrentWallpaper = (wallpaperId: string) => {
        setCurrWallpaper(wallpaperId);
    }

    const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <GeneralContext.Provider value={{ notes, addNote, updateNote, deleteNote, toggleFavorite, toggleArchived, isSidebarOpen, toggleSidebar, currWallpaper, setCurrentWallpaper, hasUnsavedChanges, setHasUnsavedChanges, isMobile}}>
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
