import { useRef } from "react";
import { NoteEditorButtons } from "../ui/Buttons";

type Props = {
	onChange: (value: string) => void;
	prevValue: string;
}

// Note editor passes the data the user wrote to NoteModal.tsx
export default function NoteEditor({ onChange, prevValue }: Props) {
	type Command = | "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList";

	const editorRef = useRef<HTMLDivElement>(null);

	const ApplyFormat = (command: Command) => {
		if ( editorRef.current ) {
			editorRef.current.focus();
			document.execCommand(command, false);
		}
	};


	return (
		<div className="max-w-xl mx-auto mb-6 rounded text-white shadow-2xl">
			{/* Toolbar */}
			<div className="flex gap-2 px-2 py-1 rounded-t-md rounded-tl-md bg-[#150232] outline-1 outline-[#ffffff20]">
				{
					NoteEditorButtons.map(({ icon: Icon, format }) => (
						<button onClick={() => ApplyFormat(format)} key={format} className="px-2 py-1.5 rounded hover:bg-[#2c0369] transition-all">
						<Icon />
						</button>
					))
				}
			</div>
			<div
				ref={editorRef}
				contentEditable
				suppressContentEditableWarning={true}
				className="h-full w-full max-h-52 text-black p-4 bg-white rounded-b-md rounded-bl-md outline-1 outline-[#ffffff20] overflow-y-auto [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:mb-1"
				onBlur={() => onChange(editorRef.current?.innerHTML ?? "")}
				dangerouslySetInnerHTML={{ __html: prevValue }}
			/>
		</div>
	);
}

