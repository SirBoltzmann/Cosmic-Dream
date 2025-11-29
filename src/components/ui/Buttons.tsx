import { LucideIcon, Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export type Command = "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList";

export interface NoteEditorButton {
    icon: LucideIcon;
    format: Command;
}

export const NoteEditorButtons: NoteEditorButton[] =  [
    {
        icon: Bold,
        format: "bold",
    },
    {
        icon: Italic,
        format: "italic",
    },
    {
        icon: Underline,
        format: "underline",
    },
    {
        icon: List,
        format: "insertUnorderedList",
    },
    {
        icon: ListOrdered,
        format: "insertOrderedList",
    },
];