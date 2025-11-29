"use client"
import { useGeneral } from "@/context/GeneralContext";
import AdaptiveNavigation from "@/components/ui/AdaptiveNavigation";
import NotesList from "@/components/notes/NotesList";

export default function FavoritesPage() {
    // Context
    const { notes, deleteNote, isSidebarOpen, isMobile } = useGeneral();
    const favoriteNotes = notes.filter((note) => note.isFavorite);

    const handleDeleteSpecialNote = (id: string) => {
        deleteNote(id);
    }

    return (
        <div className="h-screen">
            <AdaptiveNavigation/>
            <div className="flex flex-col h-full justify-center content-center">
                <h2 className={`${isMobile ? "pl-7" : isSidebarOpen ? "pl-70" : "pl-23"} flex items-center text-4xl font-bold text-purple-50 h-[12%]`}>Favourites</h2>
                <NotesList // Remember that NotesList's height is 88% of the VH, so let's give our <h2/> 12% vh <3
                    onDelete={handleDeleteSpecialNote}
                    notes={favoriteNotes}
                />
            </div>
        </div>
    );
}
