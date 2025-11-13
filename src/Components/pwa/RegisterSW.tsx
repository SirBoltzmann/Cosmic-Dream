"use client";
import { useEffect } from "react";

export default function RegisterSW() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then(() => console.log("SW registered ✨"))
                .catch((err) => console.error("Error registering SW:", err));
        }
    }, []);

  return null;
}
