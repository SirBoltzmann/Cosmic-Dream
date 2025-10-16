import { Notebook, Settings, Info, LucideIcon, Star, Heart, Archive } from "lucide-react";

export interface SidebarBtn {
    label: string;
    icon: LucideIcon;
    href: string;
}

export const sidebarBtnData: SidebarBtn[] = [
  {
    label: "Notes",
    icon: Notebook,
    href: "/",
  },
  {
    label: "Favorites",
    icon: Star,
    href: "/favorites",
  },
  {
    label: "Archive",
    icon: Archive,
    href:"/archive",
  },
  // {
  //   label: "Trash bin",
  //   icon: Trash,
  //   href: "/trash",
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "About me",
    icon: Info,
    href: "/about",
  },
  {
    label: "Support Me",
    icon: Heart,
    href: "/support",
  },
  // {
  //   label: "Sign In / Sign Up",
  //   icon: LogIn,
  //   href: "sign-in",
  // },
];
