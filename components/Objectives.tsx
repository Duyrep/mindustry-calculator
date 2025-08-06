"use client";

import {
  getItem,
  getItemByName,
  getItemIDsByCategory,
  getItemNames,
} from "@/utils";
import SpriteImage from "./SpriteImage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ObjectiveContext } from "@/context/ObjectiveContext";
import Item from "@/models/Item";
import { SettingsContext } from "@/context/SettingsContext";
import { useTranslation } from "react-i18next";
import Dialog, { DialogContent, DialogHandle, DialogTrigger } from "./Dialog";
import { MindustryIcon } from "./icons";
import { calculateBuildings, calculateItemsPerSecond } from "@/utils/calculate";
import Dropdown, { DropdownContent, DropdownTrigger } from "./Dropdown";

export default function Objectives() {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productsPerSec, setProductsPerSec] =
    useContext(ObjectiveContext).productsPerSecState;
  const [settings] = useContext(SettingsContext).settingsState;
  const [mode, setMode] = useContext(ObjectiveContext).modeState;
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    if (mode === "building") {
      inputRef.current.value =
        +calculateBuildings(objective, productsPerSec, settings).toFixed(3) +
        "";
    } else if (mode === "item") {
      const buildings = +inputRef.current.value;
      inputRef.current.value =
        +calculateItemsPerSecond(objective, buildings, settings).toFixed(3) +
        "";
    }
  }, [mode]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (mode === "building") {
      const value = +inputRef.current.value;
      const productsPerSec = calculateItemsPerSecond(
        objective,
        value,
        settings
      );
      setProductsPerSec(productsPerSec);
      inputRef.current.value =
        +calculateBuildings(objective, productsPerSec, settings).toFixed(3) +
        "";
    } else if (mode === "item") {
      const value = inputRef.current.value;
      setProductsPerSec(+value);
      inputRef.current.value = value
    }
  }, [objective]);

  const inputHandle = (target: HTMLInputElement) => {
    if (target.value.length === 0 || +target.value < 0) {
      target.value = "1";
    }
    if (mode === "building") {
      const productsPerSec = calculateItemsPerSecond(
        objective,
        Number(target.value),
        settings
      );
      setProductsPerSec((prev) =>
        prev === productsPerSec ? prev : productsPerSec
      );
    } else if (mode === "item") {
      const value = Number(target.value);
      setMode("item");
      setProductsPerSec((prev) => (prev === value ? prev : value));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 bg-surface-a10 p-2 rounded-md">
      <ObjectiveItem />
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1 flex-wrap items-center">
            <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
              <DropdownTrigger>
                <div className="flex select-none gap-1 font-bold cursor-pointer px-2 py-1 bg-surface-a20 rounded-md duration-200 hover:bg-surface-a30">
                  <div
                    className={`duration-200 ${
                      isDropdownOpen && "rotate-x-180"
                    }`}
                  >
                    <MindustryIcon>&#xe824;</MindustryIcon>
                  </div>
                  <span>
                    {mode === "building"
                      ? t("Buildings")
                      : `${t("Items")}/${t(settings.displayRate)[0]}`}
                  </span>
                </div>
              </DropdownTrigger>
              <DropdownContent>
                {Object.entries({
                  item: `${t("Items")}/${t(settings.displayRate)[0]}`,
                  building: "Buildings",
                }).map(([k, v], idx) => (
                  <React.Fragment key={k}>
                    {idx !== 0 && <hr className="border-surface-a30 mx-2" />}
                    <div
                      className={`m-1 p-1 rounded-md cursor-pointer select-none duration-200 ${
                        mode === k
                          ? "bg-primary text-background"
                          : "hover:bg-surface-a20"
                      }`}
                      onClick={() => setMode((prev) => (prev === k ? prev : k))}
                    >
                      {v}
                    </div>
                  </React.Fragment>
                ))}
              </DropdownContent>
            </Dropdown>
            <b>:</b>
            <input
              ref={inputRef}
              type="number"
              className="border border-surface-a30 w-24 h-min rounded-md px-2 py-1 text-sm duration-200 focus:border-primary"
              autoComplete="off"
              defaultValue="1"
              min={0}
              onKeyDown={(event) =>
                event.key === "Enter" &&
                inputHandle(event.target as HTMLInputElement)
              }
              onBlur={(event) => inputHandle(event.target)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ObjectiveItem() {
  const { t } = useTranslation();
  const [settings] = useContext(SettingsContext).settingsState;
  const [objective, setObjective] = useContext(ObjectiveContext).objectiveState;
  const [item, setItem] = useState<Item>(getItem(objective, settings.mode));
  const [searchResult, setSearchResult] = useState<string[]>(
    getItemNames(settings.mode)
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const bgItem = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<DialogHandle>(null);
  const itemIDsByCategory = getItemIDsByCategory(settings.mode);
  const itemNames = getItemNames(settings.mode);

  useEffect(() => {
    setItem(getItem(objective, settings.mode));
  }, [objective, settings.mode]);

  return (
    <>
      <Dialog
        ref={dialogRef}
        className="w-full max-w-[40rem] max-sm:h-svh"
        onOpen={() => {
          setSearchResult(itemNames);
          if (searchInput.current) searchInput.current.value = "";
        }}
      >
        <DialogTrigger>
          <div className="flex items-center select-none gap-1 rounded-md p-1 max-w cursor-pointer bg-surface-a20 hover:bg-surface-a30 duration-200">
            <SpriteImage
              row={item.getImage().row}
              col={item.getImage().col}
              title={item.getId()}
            />
            <span className="whitespace-nowrap">{t(item.getName())}</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="max-sm:h-screen flex flex-col overflow-hidden">
            <div
              ref={bgItem}
              className="fixed bg-surface-a20 rounded-md transition-all"
            ></div>
            <div className="flex gap-2 px-2">
              <MindustryIcon className="text-2xl">&#xe88a;</MindustryIcon>
              <input
                ref={searchInput}
                type="text"
                onChange={(event) => {
                  setSearchResult(
                    searchItems(
                      removeDiacritics(
                        (event.target as HTMLInputElement).value
                      ),
                      itemNames
                    )
                  );
                }}
                className="border border-surface-a30 rounded-md w-full py-1 px-2"
                placeholder={t("Search by name")}
              />
            </div>
            <hr className="mb-2 mt-1 border-surface-a50" />
            <div className="h-min overflow-y-auto">
              <div
                className={`flex items-center justify-center font-bold transition-all duration-100 overflow-hidden ${
                  searchResult.map((name) => {
                    const item = getItemByName(name, settings.mode);
                    return item.getCategory();
                  }).length === 0
                    ? "h-10"
                    : "h-0"
                }`}
              >
                {t("No results")}
              </div>
              <div className="pl-1 pr-2">
                {Object.entries(itemIDsByCategory).map(
                  ([category, itemIds], idx) => (
                    <div key={idx}>
                      <div
                        className={`overflow-hidden transition-all duration-100 ${
                          searchResult
                            .map((name) => {
                              const item = getItemByName(name, settings.mode);
                              return item.getCategory();
                            })
                            .includes(category)
                            ? "h-7"
                            : "h-0"
                        }`}
                      >
                        <b>{category[0].toUpperCase() + category.slice(1)}</b>
                        <hr className="mb-2 border-t-2 border-surface-a50" />
                      </div>
                      <div className="flex flex-wrap">
                        {itemIds.map((id) => {
                          const item = getItem(id, settings.mode);
                          return (
                            <div
                              key={id}
                              onMouseEnter={(event) => {
                                if (!bgItem.current) return;
                                const rect = (
                                  event.currentTarget as HTMLDivElement
                                ).getBoundingClientRect();
                                const style = bgItem.current.style;
                                style.opacity = "1";
                                style.top = rect.top + "px";
                                style.left = rect.left + "px";
                                style.width = rect.width + "px";
                                style.height = rect.height + "px";
                              }}
                              onMouseLeave={() => {
                                if (!bgItem.current) return;
                                bgItem.current.style.opacity = "0";
                              }}
                              onClick={() => {
                                dialogRef.current?.closeDialog();
                                setObjective((prev) =>
                                  prev === id ? prev : id
                                );
                              }}
                              className={`relative overflow-hidden transition-all duration-300 z-10 ${
                                searchResult.includes(item.getName()) ||
                                searchResult.includes(t(item.getName()))
                                  ? "max-w-40 max-h-40 m-0.5 delay-100"
                                  : "max-w-0 max-h-0 delay-75"
                              }`}
                            >
                              <div
                                className={`flex p-1 items-center select-none cursor-pointer transition-all rounded-md ${
                                  objective === item.getId() &&
                                  "bg-primary text-background"
                                } ${
                                  searchResult.includes(item.getName()) ||
                                  searchResult.includes(t(item.getName()))
                                    ? "scale-100 delay-300"
                                    : "scale-0"
                                }`}
                              >
                                <SpriteImage
                                  row={item.getImage().row}
                                  col={item.getImage().col}
                                />
                                <span className="whitespace-nowrap">
                                  {t(item.getName())}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function searchItems(query: string, items: string[]) {
  return items.filter((item) =>
    removeDiacritics(item).toLowerCase().includes(query.toLowerCase())
  );
}

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
