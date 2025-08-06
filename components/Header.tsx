"use client";

import { SettingsContext } from "@/context/SettingsContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { MoonIcon, SunIcon } from "./icons";

export default function Header() {
  const [settings, setSettings] = useContext(SettingsContext).settingsState;

  return (
    <header className={`flex justify-between h-12 px-4 duration-200 ${settings.theme === "dark" ? "bg-surface-a30" : "bg-primary"}`}>
      <Link href="/" className="flex gap-2 items-center w-max">
        <Image src="/favicon.ico" width={28} height={28} alt={"Icon"} />
        <div className="whitespace-nowrap overflow-auto scroll-hidden">
          <b>Mindustry Calculator</b>
        </div>
      </Link>
      <div
        className="flex items-center cursor-pointer"
        onClick={() =>
          setSettings((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
          }))
        }
      >
        {settings.theme === "dark" ? (
          <MoonIcon width="1.5rem" height="1.5rem" />
        ) : (
          <SunIcon width="1.5rem" height="1.5rem" />
        )}
      </div>
    </header>
  );
}
