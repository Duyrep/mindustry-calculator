import type { Metadata } from "next";
import "./globals.css";
import { NavBar, Header } from "@/components/";
import {
  ObjectiveContextProvider,
  SettingsContextProvider,
  URLHandlerContextProvider,
} from "@/context";

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
            <URLHandlerContextProvider>
              <div className="fixed w-full z-10">
                <Header />
                <NavBar />
              </div>
              <main className="pt-24 p-2">{children}</main>
            </URLHandlerContextProvider>
          </ObjectiveContextProvider>
        </SettingsContextProvider>
      </body>
    </html>
  );
}
