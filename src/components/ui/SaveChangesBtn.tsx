"use client";

import { useState, useEffect } from "react";
import { useGeneral } from "@/context/GeneralContext";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseClient";

export default function SaveChangesBtn () {
    const user = auth.currentUser; // or NextUser
    const [ showExitModal, setShowExitModal ] = useState(false);
    const [ saveBtnClicked, setSaveBtnClicked ] = useState(false);
    const [ saveStatus, setSaveStatus ] = useState("");
    const { notes, hasUnsavedChanges, setHasUnsavedChanges, isMobile } = useGeneral();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasUnsavedChanges === true) {    
                event.preventDefault();
                event.returnValue = "";
                setShowExitModal(true); 
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    async function saveChanges() {
        if (!user) {
            setSaveStatus("You're not signed in. Sign in to save your changes..");
            return;
        };
        if (hasUnsavedChanges === false) {
            setSaveStatus("You've no changes to save... Write something!! 🌌");
            return;
        };

        const noteRef = doc(db, "Users", user.uid);

        await setDoc(noteRef, { displayName: user.displayName || "Anonymous", notes, }, { merge: true });

        console.log("Our notes were saved succesfully.. Yikes!!");
        setHasUnsavedChanges(false);
        setSaveStatus("Your changes have been saved!! ❤️🌌");
    }

    const toggleSaveMessage = () => {
        setSaveBtnClicked(true);
        const timeout = setTimeout(() => {
            setSaveBtnClicked(false);
        }, 3500);

        return () => clearTimeout(timeout);
    }

    return (
        // This button's parent component has h-12%, so it fits
        <div className={`flex justify-center items-center ${isMobile ? "" : "mr-7"}`}>
            {/* SAVE BUTTON */}
            <button 
                onClick={() => {
                    saveChanges();
                    toggleSaveMessage();
                }} 
                className="px-5 py-3 rounded-2xl text-zinc-200 hover:text-[#fff] font-semibold backdrop-blur-[5px] backdrop-saturate-[122%] bg-[#ffffff11] hover:bg-[#ffffff24] bg-opacity-20 border border-opacity-40 border-[#ffffff8e] hover:border-[#fff] cursor-pointer transition-all ease-out"
            >
                <span className="hidden sm:inline">Save Changes</span>   
                <span className="inline sm:hidden">Save</span>   
            </button>

            {/* EXIT MODAL */}
            { showExitModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-[3px] backdrop-saturate-[100%] bg-opacity-0 flex items-center justify-center z-50">
                    <div className="bg-[#121113] text-white rounded-2xl border-1 border-[#ffffff9d] p-6 shadow-lg w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-3">Please save your changes before exiting.</h2>
                        <p className="text-zinc-400 mb-5">
                            You have unsaved changes. Do you want to save them before leaving? <br />
                            Please save ❤️🌌
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowExitModal(false)} 
                                className="px-4 py-2 rounded-lg bg-[#451f1f] hover:bg-[#6b0707] transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Save function...
                                    saveChanges();
                                    setShowExitModal(false);
                                    toggleSaveMessage();
                                }}
                                className="px-4 py-2 rounded-lg bg-[#381667] hover:bg-[#6903ae] transition cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SAVE STATUS MESSAGE */}
            <div className={`fixed px-5 py-3 bg-white rounded-2xl right-3 bottom-5 z-50 text-black shadow-lg transform transition-transform duration-700 ease-out ${saveBtnClicked ? "translate-y-0 opacity-100" : "translate-y-20 opacity-50"}`}>
                <p className="whitespace-nowrap">{saveStatus}</p>
            </div>
        </div>
    );
}