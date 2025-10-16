"use client"
import { useGeneral } from "@/context/GeneralContext";
import Sidebar from "@/Components/ui/Sidebar";
import NotesList from "@/Components/notes/NotesList";

export default function FavoritesPage() {
    // Context
    const { notes, deleteNote, isSidebarOpen } = useGeneral();
    const favoriteNotes = notes.filter((note) => note.isFavorite);

    const handleDeleteSpecialNote = (id: string) => {
        deleteNote(id);
    }

    return (
        <div className="h-screen">
            <Sidebar/> {/* WIDTH: 16 || 64 */}
            <div className="flex flex-col h-full justify-center content-center">
                <h2 className={`${isSidebarOpen ? "pl-70" : "pl-23"} flex items-center text-4xl font-bold text-purple-50 h-[12%]`}>Favourites</h2>
                <NotesList // Remember that NotesList's height is 88% of the VH, so let's give our <h2/> 12% vh <3
                    onDelete={handleDeleteSpecialNote}
                    notes={favoriteNotes}
                />
            </div>
        </div>
    );
}
