import { Providers } from "@/providers/Providers";
import { GeneralProvider } from "@/context/GeneralContext";
import Wallpapers from "@/Components/ui/Wallpapers";
import FirebaseAuthSync from "@/Components/firebase/firebaseAuthSync";
import RegisterSW from "@/Components/pwa/RegisterSW";
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#21003a" />
      </head>
      <body className="antialiased">
          <Providers>
            <GeneralProvider>
              <FirebaseAuthSync/>
              <Wallpapers />
              <div className="relative z-1">{children}</div>
              <RegisterSW/>
            </GeneralProvider>
          </Providers>
      </body>
    </html>
  );
}
