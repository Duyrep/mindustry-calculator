import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import SettingsContextProvider from "@/contexts/SettingsContext";
import { ObjectiveContextProvider } from "@/contexts/ObjectiveContext";

export const metadata: Metadata = {
  title: "Mindustry Calculator",
  description: "",
  keywords: ["mindustry ratio, mindustry calculator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark w-full" translate="no">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SettingsContextProvider>
          <ObjectiveContextProvider>
            <div className="fixed w-full z-10">
              <Header />
              <NavBar />
            </div>
            <div className="pt-22">{children}</div>
          </ObjectiveContextProvider>
        </SettingsContextProvider>
      </body>
    </html>
  );
}
