import { Providers } from "@/providers/Providers";
import Wallpapers from "@/Components/ui/Wallpapers";
import type { Metadata } from "next";
import { parkinsans, poppins, lato, } from "./ui/fonts";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Cosmic Dream",
  description: "A stellar diary",
};


export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${poppins.variable} ${lato.variable}`}>
      <body className="antialiased">
          <Providers>
            <Wallpapers />
            <div className="relative z-1">{children}</div>
          </Providers>
      </body>
    </html>
  );
}
