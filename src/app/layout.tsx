import { Providers } from "@/providers/Providers";
import { GeneralProvider } from "@/context/GeneralContext";
import Wallpapers from "@/components/ui/Wallpapers";
import FirebaseAuthSync from "@/components/firebase/firebaseAuthSync";
import RegisterSW from "@/components/pwa/RegisterSW";
import type { Metadata } from "next";
import { poppins, lato, } from "./ui/fonts";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Cosmic Dream",
  description: "A stellar diary",
};


export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
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
