"use client"
import { useEffect, useState } from "react";

export interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

export interface PWAState {
    canInstall: boolean
    isInstalled: boolean
    inStandalone: boolean
    promptEvent: BeforeInstallPromptEvent | null
}

export function usePWA() {
    const [state, setState] = useState<PWAState>({
        canInstall: false,
        isInstalled: false,
        inStandalone: false,
        promptEvent: null,
    });

    const detectStandalone = () => {
        return (
            window.matchMedia("(display-mode: standalone)").matches ||
            // IOS  Safari bruh xd
            (navigator as unknown as { standalone?: boolean }).standalone === true
        );
    };

    // Detect installation state on load
    useEffect(() => {
        const standalone = detectStandalone();
        const installedFromStorage = localStorage.getItem("isInstalled") === "true";

        setState((prev) => ({
            ...prev,
            isInstalled: installedFromStorage,
            inStandalone: standalone,
        }))
    }, []);

    // Manage beforeinstallprompt
    useEffect(() => {
        const handler = (e: Event) => {
            const bipEvent = e as BeforeInstallPromptEvent;
            e.preventDefault();

            setState((prev) => ({
                ...prev,
                canInstall: true,
                promptEvent: bipEvent,
            }));
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    // Manage App Installing
    useEffect(() => {
        const onInstalled = () => {
            localStorage.setItem("isInstalled", "true");
            setState((prev) => ({
                ...prev,
                canInstall: false,
                promptEvent: null,
            }));
        };

        window.addEventListener("appinstalled", onInstalled);
        return () => window.removeEventListener("appinstalled", onInstalled);
    }, []); 

    // Install function..
    const install = async () => {
        if (!state.promptEvent) return;
        await state.promptEvent.prompt();
        const result = await state.promptEvent.userChoice;

        if (result.outcome === "accepted") {
            localStorage.setItem("isInstalled", "true");

            setState((prev) => ({
                ...prev,
                canInstall: false,
                promptEvent: null,
            }));
        };
    };

    return { ...state, install };
}