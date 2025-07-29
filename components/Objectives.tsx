"use client";

import {
  getItem,
  getItemByName,
  getItemIDsByCategory,
  getItemNames,
} from "@/utils";
import SpriteImage from "./SpriteImage";
import { useContext, useEffect, useRef, useState } from "react";
import { ObjectiveContext } from "@/contexts/ObjectiveContext";
import Item from "@/models/Item";
import { SettingsContext } from "@/contexts/SettingsContext";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import { MindustryIcon } from "./common/icons";
import { calculateBuildings, calculateItemsPerSecond } from "@/utils/calculate";

export default function Objectives() {
  const { t } = useTranslation();
  const [productsPerSec, setProductsPerSec] =
    useContext(ObjectiveContext).productsPerSecState;
  const [settings] = useContext(SettingsContext).settingsState;
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const [mode, setMode] = useState<"item" | "building">("building");
  const buildingRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const itemCurrent = itemRef.current;
    const buildingCurrent = buildingRef.current;
    if (!itemCurrent || !buildingCurrent) return;
    if (mode === "building") {
      const productsPerSec = +calculateItemsPerSecond(
        objective,
        Number(buildingCurrent.value),
        settings
      );
      itemCurrent.value = +productsPerSec.toFixed(3) + "";
      buildingCurrent.value =
        +calculateBuildings(objective, productsPerSec, settings).toFixed(3) +
        "";
      setProductsPerSec(productsPerSec);
    } else if (mode === "item") {
      itemCurrent.value = +productsPerSec.toFixed(3) + "";
      buildingCurrent.value =
        +calculateBuildings(objective, productsPerSec, settings).toFixed(3) +
        "";
      setProductsPerSec(productsPerSec);
    }
  }, [productsPerSec, objective, settings, mode, setProductsPerSec]);

  return (
    <div className="flex flex-wrap gap-2 bg-surface-a10 p-2 rounded-md">
      <ObjectiveItem />
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1 items-center">
          <label
            htmlFor="building-amount"
            className={`whitespace-nowrap ${
              mode === "building" && "font-bold"
            }`}
          >
            {t("Buildings")}:
          </label>
          <input
            ref={buildingRef}
            id="building-amount"
            type="number"
            className="border border-surface-a30 w-24 rounded-md px-2 py-1 text-sm duration-200 focus:border-primary"
            autoComplete="off"
            defaultValue="1"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setMode("building");
                const productsPerSec = calculateItemsPerSecond(
                  objective,
                  Number((event.target as HTMLInputElement).value),
                  settings
                );
                setProductsPerSec((prev) =>
                  prev === productsPerSec ? prev : productsPerSec
                );
              }
            }}
            onBlur={(event) => {
              setMode("building");
              const productsPerSec = calculateItemsPerSecond(
                objective,
                Number((event.target as HTMLInputElement).value),
                settings
              );
              setProductsPerSec((prev) =>
                prev === productsPerSec ? prev : productsPerSec
              );
            }}
          />
        </div>
        <div className="flex gap-1 items-center">
          <label
            htmlFor="item-amount"
            className={`whitespace-nowrap ${mode === "item" && "font-bold"}`}
          >
            {t("Items")}/{t(settings.displayRate)[0]}:
          </label>
          <input
            ref={itemRef}
            id="item-amount"
            type="number"
            className="border border-surface-a30 w-24 rounded-md px-2 py-1 text-sm duration-200 focus:border-primary"
            autoComplete="off"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const value = Number((event.target as HTMLInputElement).value);
                setMode("item");
                setProductsPerSec((prev) => (prev === value ? prev : value));
              }
            }}
            onBlur={(event) => {
              const value = Number((event.target as HTMLInputElement).value);
              setMode("item");
              setProductsPerSec((prev) => (prev === value ? prev : value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ObjectiveItem() {
  const { t } = useTranslation();
  const [settings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const [objective, setObjective] = useContext(ObjectiveContext).objectiveState;
  const [item, setItem] = useState<Item>(getItem(objective, settings.mode));
  const [searchResult, setSearchResult] = useState<string[]>(
    getItemNames(settings.mode)
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const bgItem = useRef<HTMLDivElement>(null);
  const itemIDsByCategory = getItemIDsByCategory(settings.mode);
  const itemNames = getItemNames(settings.mode);

  useEffect(() => {
    setItem(getItem(objective, settings.mode));
  }, [objective, settings.mode]);

  return (
    <>
      <div
        className="flex items-center select-none gap-1 border border-surface-a30 rounded-md p-1 max-w cursor-pointer hover:border-primary duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SpriteImage
          row={item.getImage().row}
          col={item.getImage().col}
          title={item.getId()}
        />
        <span className="whitespace-nowrap">{t(item.getName())}</span>
      </div>
      <Dialog
        openState={[open, setOpen]}
        className="w-full max-w-[40rem] max-sm:h-screen"
        onClose={() => {
          setSearchResult(itemNames);
          if (searchInput.current) searchInput.current.value = "";
        }}
      >
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
                    removeDiacritics((event.target as HTMLInputElement).value),
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
                              setOpen(false);
                              setObjective((prev) => (prev === id ? prev : id));
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
