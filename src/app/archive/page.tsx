"use client"
import { useGeneral } from "@/context/GeneralContext";
import Sidebar from "@/Components/ui/Sidebar";
import NotesList from "@/Components/notes/NotesList";

export default function ArchivePage() {
  // Context
  const { notes, deleteNote, isSidebarOpen } = useGeneral();
  const archivedNotes = notes.filter((note) => note.isArchived);

  const handleDeleteSpecialNote = (id: string) => {
      deleteNote(id);
  }

  return (
    <div className="h-screen">
      <Sidebar/> {/* WIDTH: 16 || 64 */}
      <div className="flex flex-col h-full justify-center content-center">
        <h1 className={`${isSidebarOpen ? "pl-70" : "pl-23"} flex items-center text-4xl font-bold text-purple-50 h-[12%]`}>Archived Notes</h1>
        <NotesList // Remember that NotesList's height is 88% of the VH, so let's give our <h1/> 12% vh <3
          onDelete={handleDeleteSpecialNote}
          notes={archivedNotes}
        />
      </div>
    </div>
  );
}
