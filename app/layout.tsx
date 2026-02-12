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
  description: "The ultimate production calculator for Mindustry. Optimize your factory ratios, calculate power consumption, and eliminate bottlenecks for Serpulo and Erekir.",
  keywords: [
    "mindustry ratio", 
    "mindustry calculator", 
    "factory optimizer", 
    "mindustry production chain", 
    "serpulo ratios", 
    "erekir calculator", 
    "mindustry schematic helper"
  ],
  authors: [{ name: "Duyrep" }],
  openGraph: {
    title: "Mindustry Calculator",
    description: "Calculate perfect ratios for Mindustry factories. Maximize your resource output and solve bottlenecks instantly.",
    url: "https://mindustry-calculator.vercel.app",
    siteName: "Mindustry Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindustry Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindustry Calculator",
    description: "Perfect ratios for all Mindustry resources and factories.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
