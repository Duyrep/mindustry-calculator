"use client";

import i18n from "@/i18n";
import { Settings } from "@/types/settings";
import { getDefaultSettings } from "@/utils";
import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext(
  {} as {
    settingsState: [Settings, React.Dispatch<React.SetStateAction<Settings>>];
    ignoredItemsState: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  }
);

export default function SettingsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ignoredItems, setIgnoredItems] = useState<string[]>([])
  const [settings, setSettings] = useState<Settings>(getDefaultSettings());

  useEffect(() => {
    i18n.changeLanguage(settings.lang);
  }, [settings.lang]);

  useEffect(() => {
    console.log(settings)
  }, [settings])

  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [settings.theme]);

  return (
    <SettingsContext
      value={{
        settingsState: [settings, setSettings],
        ignoredItemsState: [ignoredItems, setIgnoredItems]
      }}
    >
      {children}
    </SettingsContext>
  );
}
