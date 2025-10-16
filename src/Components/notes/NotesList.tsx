import NoteCard from "./NoteCard";
import { useEffect, useRef, useState } from "react";

type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    isArchived?: boolean;
};

interface NotesListProps {
    notes: Note[]
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export default function NotesList ({ notes, onDelete, onEdit }: NotesListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);  

    // DragSlide and xScroll Logic
    useEffect(() => {
        const slideContainer = scrollRef.current;
        if (!slideContainer) return;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - slideContainer.offsetLeft);
            setScrollLeft(slideContainer.scrollLeft);
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - slideContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            slideContainer.scrollLeft -= scrollLeft - walk;
        };
        const handleMouseUp = () => setIsDragging(false);

        const handleWheel= (e:WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            slideContainer.scrollLeft += e.deltaY;
        }

        slideContainer.addEventListener("mousedown", handleMouseDown);
        slideContainer.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        slideContainer.addEventListener("wheel", handleWheel, {passive: false});

        return () => {
            slideContainer.removeEventListener("mousedown", handleMouseDown);
            slideContainer.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            slideContainer.removeEventListener("wheel", handleWheel);
        };
    }, [isDragging, startX, scrollLeft]);

    return (
        <div className="h-[88%] max-w-[100vw] pl-15 relative flex items-center select-none" >
            <div 
                className={`slider flex items-center gap-7 w-full h-full overflow-y-hidden overflow-x-auto scroll-smooth ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                ref={scrollRef}
            >
                {notes.map((note) => (
                    <div key={note.id} className="flex-shrink-0">
                        <NoteCard
                            key={note.id}
                            note={note}
                            {...(onDelete ? { onDelete } : {})}
                            {...(onEdit ? { onEdit } : {})}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}