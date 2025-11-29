"use client";

import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import { useGeneral } from "@/context/GeneralContext";

export default function AdaptiveNavigation() {
    const { isMobile } = useGeneral();

    return isMobile ? <Bottombar /> : <Sidebar />;
}
