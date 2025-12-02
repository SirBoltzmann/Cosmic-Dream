"use client"
import { useGeneral } from "@/context/GeneralContext";
import AdaptiveNavigation from "@/components/ui/AdaptiveNavigation";
import NotesList from "@/components/notes/NotesList";
import { motion } from "framer-motion";

export default function ArchivePage() {
  // Context
  const { notes, deleteNote, isSidebarOpen, isMobile } = useGeneral();
  const archivedNotes = notes.filter((note) => note.isArchived);

  const handleDeleteSpecialNote = (id: string) => {
      deleteNote(id);
  }

	return (
		<div className="h-screen">
			<AdaptiveNavigation/> {/* SIDEBAR WIDTH: 16 || 64 */}
			<div className="flex flex-col h-full justify-center content-center">
				<motion.h1
					initial={{ transform: "translateY(-20px)", opacity: 0 }} 
					transition={{ type: "spring" }} 
					whileInView={{ transform: "translateY(0px)", opacity: 1 }} 
					className={`${isMobile ? "pl-7" : isSidebarOpen ? "pl-70" : "pl-23"} flex items-center text-4xl font-bold text-purple-50 h-[12%]`}
				>
					Archived Notes
				</motion.h1>
				<NotesList // Remember that NotesList's height is 88% of the VH, so let's give our <h1/> 12% vh <3
					onDelete={handleDeleteSpecialNote}
					notes={archivedNotes}
				/>
			</div>
		</div>
	);
}
