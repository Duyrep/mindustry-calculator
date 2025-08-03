"use client";

import { MindustryIcon } from "@/components/icons";
import Dropdown, {
  DropdownContent,
  DropdownTrigger,
} from "@/components/Dropdown";
import SpriteImage from "@/components/SpriteImage";
import { SettingsContext } from "@/context/SettingsContext";
import {
  getBelts,
  getBuilding,
  getBuildings,
  getDefaultSettings,
  getItem,
  getItems,
} from "@/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;

  return (
    <main className="p-2">
      <div className="w-full flex justify-end text-background">
        <button
          className="mb-2 bg-primary py-1 px-2 rounded-md duration-200 hover:scale-110 active:scale-90"
          onClick={() => setSettings(getDefaultSettings())}
        >
          <MindustryIcon>&#xe86f;&nbsp;</MindustryIcon>
          {t("Reset")}
        </button>
      </div>
      <Details
        summary={t("General")}
        className="rounded-t-md border-surface-a30"
        onOpen={(open, target) => {
          if (open) {
            target.classList.add("mb-2");
            target.classList.remove("border-b");
          } else {
            target.classList.remove("mb-2");
            target.classList.add("border-b");
          }
        }}
      >
        <div className="flex flex-col gap-2">
          <LanguageSettings />
          <DisplayRateSettings />
          <ModeSettings />
        </div>
      </Details>
      <Details
        summary={t("Items")}
        className="border-surface-a30"
        onOpen={(open, target) => {
          if (open) {
            target.classList.add("my-2");
            target.classList.remove("border-b");
          } else {
            target.classList.remove("my-2");
            target.classList.add("border-b");
          }
        }}
      >
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getItems(settings.mode).map((item) => (
              <React.Fragment key={item.getId()}>
                {item.getProducedBy().length > 1 && (
                  <tr>
                    <td>
                      <div className="flex px-2 gap-1 py-2">
                        <SpriteImage
                          row={item.getImage().row}
                          col={item.getImage().col}
                        />
                        <span>:</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {item.getProducedBy().map((buildingId) => {
                          const building = getBuilding(
                            buildingId,
                            settings.mode
                          );
                          return (
                            <div
                              key={buildingId}
                              className={`p-1 cursor-pointer rounded-md duration-200 ${
                                settings.gameSettings.items[item.getId()] ===
                                buildingId
                                  ? "bg-primary"
                                  : "bg-surface-a20 hover:bg-surface-a30"
                              }`}
                              onClick={() =>
                                setSettings((prev) =>
                                  settings.gameSettings.items[item.getId()] ===
                                  buildingId
                                    ? prev
                                    : {
                                        ...prev,
                                        gameSettings: {
                                          ...prev.gameSettings,
                                          items: {
                                            ...prev.gameSettings.items,
                                            [item.getId()]: buildingId,
                                          },
                                        },
                                      }
                                )
                              }
                            >
                              <SpriteImage
                                row={building.getImage().row}
                                col={building.getImage().col}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Details>
      <Details
        summary={t("Belts")}
        className="border-surface-a30"
        onOpen={(open, target) => {
          if (open) {
            target.classList.add("my-2");
            target.classList.remove("border-b");
          } else {
            target.classList.remove("my-2");
            target.classList.add("border-b");
          }
        }}
      >
        <div className="flex flex-col w-min gap-1">
          {getBelts(settings.mode).map((belt) => (
            <div
              key={belt.getId()}
              className={`flex items-center gap-2 whitespace-nowrap text-sm font-[MindustryFont] p-1 rounded-md cursor-pointer duration-200 ${
                Object.values(settings.gameSettings.belts).every(
                  (v) => v === belt.getId()
                )
                  ? "bg-primary text-background"
                  : "bg-surface-a20 hover:bg-surface-a30"
              }`}
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  gameSettings: {
                    ...prev.gameSettings,
                    belts: Object.fromEntries(
                      Object.entries(prev.gameSettings.belts).map(([k]) => [
                        k,
                        getItem(k, prev.mode).getCategory() ===
                        belt.getTransportType()
                          ? belt.getId()
                          : prev.gameSettings.belts[k],
                      ])
                    ),
                  },
                }))
              }
            >
              <SpriteImage
                row={belt.getImage().row}
                col={belt.getImage().col}
              />
              <div className="flex flex-col">
                <span>{t(belt.getName())}</span>
                <span>
                  {belt.getSpeed()} {t("items")}/{t("second")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Details>
      <Details
        summary={t("Optional enhancements")}
        className="border-surface-a30"
        onOpen={(open, target) => {
          if (open) {
            target.classList.add("my-2");
            target.classList.remove("rounded-b-md");
          } else {
            target.classList.remove("my-2");
            target.classList.add("rounded-b-md");
          }
        }}
      >
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getBuildings(settings.mode).map(
              (building) =>
                building.getOptionalEnhancements() && (
                  <tr key={building.getId()}>
                    <td>
                      <div className="flex py-2 items-center">
                        <SpriteImage
                          row={building.getImage().row}
                          col={building.getImage().col}
                        />
                        <span>&nbsp;:&nbsp;</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        {[
                          null,
                          ...building.getAffinities(settings.mode),
                          ...building.getBooster(settings.mode),
                        ].map((affinitiesBoosts, idx) => {
                          const affinitiesBoostsForBuilding =
                            Object.fromEntries(
                              getItems(settings.mode)
                                .map((item) => [
                                  item
                                    .getProducedBy()
                                    .includes(building.getId())
                                    ? item.getId()
                                    : undefined,
                                  {
                                    ...settings.gameSettings.affinitiesBoosts[
                                      item.getId()
                                    ],
                                    [building.getId()]:
                                      affinitiesBoosts?.obj.getId() ?? null,
                                  },
                                ])
                                .filter((v) => v[0])
                            );
                          if (
                            idx === 0 &&
                            building.getBooster(settings.mode).length === 0
                          )
                            return;
                          return (
                            <div
                              key={affinitiesBoosts?.obj.getId() ?? idx}
                              className={`p-1 rounded-md duration-200 cursor-pointer ${
                                (Object.entries(
                                  settings.gameSettings.affinitiesBoosts
                                )
                                  .filter(([k]) =>
                                    Object.keys(
                                      affinitiesBoostsForBuilding
                                    ).includes(k)
                                  )
                                  .every(
                                    ([, v]) =>
                                      v[building.getId()] ===
                                      (affinitiesBoosts?.obj.getId() ?? null)
                                  ) &&
                                  Object.keys(
                                    settings.gameSettings.affinitiesBoosts
                                  ).filter((k) =>
                                    Object.keys(
                                      affinitiesBoostsForBuilding
                                    ).includes(k)
                                  ).length ===
                                    Object.keys(affinitiesBoostsForBuilding)
                                      .length) ||
                                (Object.values(
                                  settings.gameSettings.affinitiesBoosts
                                ).filter((v) => v[building.getId()]).length ===
                                  0 &&
                                  affinitiesBoosts === null)
                                  ? "bg-primary"
                                  : "bg-surface-a20 hover:bg-surface-a30"
                              }`}
                              onClick={() =>
                                setSettings((prev) => ({
                                  ...prev,
                                  gameSettings: {
                                    ...prev.gameSettings,
                                    affinitiesBoosts: {
                                      ...prev.gameSettings.affinitiesBoosts,
                                      ...affinitiesBoostsForBuilding,
                                    },
                                  },
                                }))
                              }
                            >
                              {affinitiesBoosts &&
                              affinitiesBoosts.obj.getId() !== "other" ? (
                                <SpriteImage
                                  row={affinitiesBoosts.obj.getImage().row}
                                  col={affinitiesBoosts.obj.getImage().col}
                                />
                              ) : (
                                <div className="flex items-center justify-center p-1 w-8 h-8 text-2xl">
                                  <MindustryIcon>&#xe868;</MindustryIcon>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </Details>
    </main>
  );
}

function DisplayRateSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const rates = { second: "Second", minute: "Minute", hour: "Hour" };

  return (
    <SettingsDropdown
      label={t("Display rates")}
      options={rates}
      selected={settings.displayRate}
      onSelect={(key) =>
        setSettings((prev) => ({
          ...prev,
          displayRate: key as "second" | "minute" | "hour",
        }))
      }
    />
  );
}

function LanguageSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const langs = { en: "English", vi: "Việt Nam" };

  return (
    <SettingsDropdown
      label={t("Languages")}
      options={langs}
      selected={settings.lang}
      onSelect={(key) => setSettings((prev) => ({ ...prev, lang: key }))}
    />
  );
}

function ModeSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const modes = { serpulo: "Serpulo", erekir: "Erekir" };

  return (
    <SettingsDropdown
      label={t("Modes")}
      options={modes}
      selected={settings.mode}
      onSelect={(key) => setSettings((prev) => ({ ...prev, mode: key }))}
    />
  );
}

type SettingsDropdownProps = {
  label: string;
  options: Record<string, string>;
  selected: string;
  onSelect: (key: string) => void;
};

function SettingsDropdown({
  label,
  options,
  selected,
  onSelect,
}: SettingsDropdownProps) {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {label}:
      <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
        <DropdownTrigger>
          <div
            className={`flex items-center gap-1 bg-surface-a20 p-1 rounded-md cursor-pointer select-none border duration-200 hover:border-primary ${
              isDropdownOpen ? "border-primary" : "border-surface-a30"
            }`}
          >
            <div className={`duration-200 ${isDropdownOpen && "rotate-x-180"}`}>
              <MindustryIcon>&#xe824;</MindustryIcon>
            </div>
            {t(options[selected])}
          </div>
        </DropdownTrigger>
        <DropdownContent>
          <div className="flex flex-col gap-1 p-1">
            {Object.entries(options).map(([key, value], idx) => (
              <React.Fragment key={key}>
                {idx !== 0 && <hr className="border-surface-a30" />}
                <div
                  className={`p-1 cursor-pointer select-none rounded-md duration-200 ${
                    selected === key
                      ? "bg-primary text-background"
                      : "hover:bg-surface-a20"
                  }`}
                  onClick={() => {
                    onSelect(key);
                  }}
                >
                  {t(value)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

function Details({
  children,
  summary = "",
  className,
  onOpen,
}: {
  children?: React.ReactNode;
  summary?: string;
  className?: string;
  onOpen?: (open: boolean, target: HTMLElement) => void;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    if (onOpen && container.current) {
      onOpen(open, container.current);
    }
  }, [onOpen, open]);

  return (
    <div ref={container} className={`bg-surface-a10 duration-200 ${className}`}>
      <div
        className="cursor-pointer select-none p-1 group"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex p-1 gap-2 items-center rounded-md duration-200 group-hover:bg-surface-a20">
          <div className={`text-lg duration-200 ${!open && "-rotate-90"}`}>
            <MindustryIcon>&#xe824;</MindustryIcon>
          </div>
          <b>{summary}</b>
        </div>
      </div>

      <div
        className={`overflow-hidden duration-200 ${
          open ? "max-h-[100rem]" : "max-h-0"
        }`}
      >
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
