"use client";

import { MindustryIcon } from "@/components/icons";
import Dialog from "@/components/Dialog";
import Dropdown, {
  DropdownContent,
  DropdownTrigger,
} from "@/components/Dropdown";
import { Objectives, SpriteImage } from "@/components";
import Table from "@/components/Table";
import { ObjectiveContext } from "@/context/ObjectiveContext";
import { SettingsContext } from "@/context/SettingsContext";
import Building from "@/models/Building";
import Item from "@/models/Item";
import {
  getBeacon,
  getBeacons,
  getBelt,
  getBelts,
  getBuilding,
  getBuildingForItem,
  getItem,
  getRecipe,
  getTile,
} from "@/utils";
import { calculateBuildings } from "@/utils/calculate";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Settings, CalculationResult } from "@/types";

type ColumnSettingsType = {
  belts: boolean;
  affinities: boolean;
  boosts: boolean;
  beacons: boolean;
  power: boolean;
  links: boolean;
};

export default function Home() {
  const { t } = useTranslation();
  const [settings] = useContext(SettingsContext).settingsState;
  const [ignoredItems] = useContext(SettingsContext).ignoredItemsState;
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const [productsPerSec] = useContext(ObjectiveContext).productsPerSecState;
  const [columnSettings, setColumnSettings] = useState<ColumnSettingsType>({
    belts: false,
    affinities: false,
    boosts: false,
    beacons: false,
    power: false,
    links: false,
  });
  const [result, setResult] = useState(
    calculate(objective, productsPerSec, settings, ignoredItems)
  );

  const calculatedResult = useMemo(() => {
    return calculate(objective, productsPerSec, settings, ignoredItems);
  }, [objective, productsPerSec, settings, ignoredItems]);

  useEffect(() => {
    setResult(calculatedResult);
  }, [calculatedResult]);

  return (
    <main className="flex flex-col gap-2 p-2">
      <Objectives />
      <Table result={result}/>
      {/* <div className="bg-surface-a10 rounded-md p-2">
        <ColumnSettings
          columnSettingsState={[columnSettings, setColumnSettings]}
        />
        <div className="p-2 overflow-auto">
          <table>
            <thead className="border-b border-surface-a30">
              <tr>
                <TableHeadItem>
                  {t("Items")}/{t(settings.displayRate)[0]}
                </TableHeadItem>
                <TableHeadItem>{t("Buildings")}</TableHeadItem>
                {columnSettings.belts && (
                  <TableHeadItem>{t("Belts")}</TableHeadItem>
                )}
                {(columnSettings.affinities || columnSettings.boosts) && (
                  <TableHeadItem>
                    <div
                      className={`flex flex-col ${
                        columnSettings.affinities &&
                        columnSettings.boosts &&
                        "text-sm"
                      }`}
                    >
                      {columnSettings.affinities && (
                        <span>{t("Affinities")}</span>
                      )}
                      {columnSettings.boosts && <span>{t("Boosts")}</span>}
                    </div>
                  </TableHeadItem>
                )}
                {columnSettings.beacons && (
                  <TableHeadItem>{t("Beacons")}</TableHeadItem>
                )}
                {columnSettings.power && (
                  <TableHeadItem>{t("Power")}</TableHeadItem>
                )}
                {columnSettings.links && <th></th>}
              </tr>
            </thead>
            <tbody>
              {Object.entries(result).map(
                ([
                  product,
                  { productsPerSec, building, numOfBuildings, power },
                ]) => (
                  <tr key={product} className="border-b border-surface-a30">
                    <ItemCol
                      product={getItem(product, settings.mode)}
                      productsPerSec={productsPerSec}
                    />
                    <BuildingCol
                      product={getItem(product, settings.mode)}
                      building={getBuilding(building, settings.mode)}
                      numOfBuildings={numOfBuildings}
                    />
                    {columnSettings.belts && (
                      <BeltCol
                        product={getItem(product, settings.mode)}
                        productsPerSec={productsPerSec}
                      />
                    )}
                    {(columnSettings.affinities || columnSettings.boosts) && (
                      <td>
                        <div className="flex gap-1 px-2 justify-center">
                          {columnSettings.affinities && (
                            <AffinitiesCol
                              building={getBuilding(building, settings.mode)}
                              product={getItem(product, settings.mode)}
                            />
                          )}
                          {columnSettings.boosts && (
                            <BoostsCol
                              building={getBuilding(building, settings.mode)}
                              product={getItem(product, settings.mode)}
                            />
                          )}
                        </div>
                      </td>
                    )}
                    {columnSettings.beacons && (
                      <BeaconsCol product={getItem(product, settings.mode)} />
                    )}
                    {columnSettings.power && <Power power={power} />}
                    {columnSettings.links && <LinksCol />}
                  </tr>
                )
              )}
              <tr>
                <td
                  colSpan={
                    5 -
                    (columnSettings.belts ? 0 : 1) -
                    (columnSettings.affinities || columnSettings.boosts
                      ? 0
                      : 1) -
                    (columnSettings.beacons ? 0 : 1)
                  }
                  className="text-right"
                >
                  <b>{t("Total power")}:&nbsp;</b>
                </td>
                <td className="text-right">
                  {
                    +Object.entries(result)
                      .map(([, { power }]) => power ?? 0)
                      .reduce((acc, v) => acc + v, 0)
                      .toFixed(3)
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </main>
  );
}

function ColumnSettings({
  columnSettingsState,
}: {
  columnSettingsState: [
    ColumnSettingsType,
    React.Dispatch<React.SetStateAction<ColumnSettingsType>>
  ];
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [columnSettings, setColumnSettings] = columnSettingsState;
  return (
    <>
      <span
        className="cursor-pointer border border-surface-a30 rounded-md p-1 duration-200 hover:border-primary"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MindustryIcon className="text-xl">
          &#xe88c; {t("Column settings")}
        </MindustryIcon>
      </span>
      <Dialog openState={[open, setOpen]} className="max-w-max">
        <h4 className="text-primary w-full text-center font-bold p-1">
          {t("Column settings")}
        </h4>
        <hr className="border-primary mb-2" />
        <div className="flex flex-col gap-2 overflow-auto">
          {Object.entries(columnSettings).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1 px-1">
              <div
                className={`flex items-center justify-center w-8 h-8 border border-surface-a30 rounded-md cursor-pointer duration-100 hover:border-primary hover:border-2 active:scale-90 ${
                  value && "bg-primary"
                }`}
                onClick={() =>
                  setColumnSettings((prev) => ({
                    ...prev,
                    [key]: !value,
                  }))
                }
              >
                <MindustryIcon
                  className={`duration-100 ${
                    value ? "opacity-100" : "opacity-0"
                  }`}
                >
                  &#xe800;
                </MindustryIcon>
              </div>
              {t(key[0].toUpperCase() + key.slice(1))}
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}

function ItemCol({
  product,
  productsPerSec,
}: {
  product: Item;
  productsPerSec: number;
}) {
  const [ignoredItems, setIgnoredItems] =
    useContext(SettingsContext).ignoredItemsState;
  return (
    <td className="pl-2">
      <div className="flex gap-1 items-center py-2 text-xs">
        <div className="relative cursor-pointer">
          <div
            className={`absolute flex justify-center hover:opacity-40 items-center bg-surface-a30 rounded-md text-lg w-full h-full duration-200 ${
              ignoredItems.includes(product.getId())
                ? "opacity-40"
                : "opacity-0"
            }`}
            onClick={() =>
              setIgnoredItems((prev) =>
                prev.includes(product.getId())
                  ? prev.filter((v) => v !== product.getId())
                  : [...prev, product.getId()]
              )
            }
          >
            <MindustryIcon>&#xe88f;</MindustryIcon>
          </div>
          <div className="p-1">
            <SpriteImage
              row={product.getImage().row}
              col={product.getImage().col}
            />
          </div>
        </div>
        <span title={productsPerSec + ""}>
          {productsPerSec > 0.1 ? +productsPerSec.toFixed(3) : "<0.1"}
        </span>
      </div>
    </td>
  );
}

function BuildingCol({
  product,
  building,
  numOfBuildings,
}: {
  product: Item;
  building: Building;
  numOfBuildings: number;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMultiProduced = product.getProducedBy().length > 1;

  return (
    <td className="pl-2">
      <div className="flex gap-1 items-center py-2 text-xs">
        <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
          <DropdownTrigger>
            <div
              className={`relative group border-surface-a30 rounded-md duration-200 border ${
                isMultiProduced
                  ? "cursor-pointer hover:border-primary"
                  : "border-transparent"
              }`}
            >
              {isMultiProduced && (
                <div
                  className={`absolute text-lg opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                    !isDropdownOpen && "group-hover:opacity-40"
                  }`}
                >
                  <MindustryIcon>&#xe824;</MindustryIcon>
                </div>
              )}
              <div className="p-1">
                <SpriteImage
                  row={building.getImage().row}
                  col={building.getImage().col}
                />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownContent>
            {product.getProducedBy().length > 1 && (
              <div className="overflow-auto max-h-56">
                <div className="flex flex-col gap-1 p-1 text-xs font-[MindustryFont]">
                  {product.getProducedBy().map((buildingId, idx) => {
                    const building1 = getBuilding(buildingId, settings.mode);
                    return (
                      <React.Fragment key={buildingId}>
                        {idx !== 0 && <hr className="border-surface-a30" />}
                        <div
                          className={`flex items-center gap-1 cursor-pointer p-1 rounded-md duration-200 ${
                            buildingId === building.getId()
                              ? "bg-primary text-background"
                              : "bg-transparent hover:bg-surface-a20"
                          }`}
                          onClick={() => {
                            setSettings((prev) =>
                              prev.gameSettings.items[product.getId()] ===
                              building1.getId()
                                ? prev
                                : {
                                    ...prev,
                                    gameSettings: {
                                      ...prev.gameSettings,
                                      items: {
                                        ...prev.gameSettings.items,
                                        [product.getId()]: building1.getId(),
                                      },
                                    },
                                  }
                            );
                          }}
                        >
                          <SpriteImage
                            row={building1.getImage().row}
                            col={building1.getImage().col}
                            size={28}
                          />
                          <span className="whitespace-nowrap">
                            {t(building1.getName())}
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </DropdownContent>
        </Dropdown>
        <span title={numOfBuildings + ""}>
          x{numOfBuildings > 0.1 ? +numOfBuildings.toFixed(1) : "<0.1"}
        </span>
      </div>
    </td>
  );
}

function BeltCol({
  product,
  productsPerSec,
}: {
  product: Item;
  productsPerSec: number;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const beltId = settings.gameSettings.belts[product.getId()];
  const belt = getBelt(beltId, settings.mode);

  return (
    <td className="pl-2">
      <div className="flex items-center gap-1">
        <div ref={triggerRef} className="">
          <Dropdown
            trigger={triggerRef.current}
            openState={[open, setOpen]}
            anchorEl={
              <div
                className="relative group border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary"
                onClick={() => setOpen((prev) => !prev)}
              >
                <div
                  className={`absolute text-lg opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                    !open && "group-hover:opacity-40"
                  }`}
                >
                  <MindustryIcon>&#xe824;</MindustryIcon>
                </div>
                <div className="p-1">
                  <SpriteImage
                    row={belt.getImage().row}
                    col={belt.getImage().col}
                  />
                </div>
              </div>
            }
          >
            <div className="overflow-auto">
              <div className="flex flex-col max-h-48 gap-1 p-1 text-xs font-[MindustryFont]">
                {getBelts(settings.mode).map((belt, idx) => (
                  <React.Fragment key={belt.getId()}>
                    {idx !== 0 && (
                      <hr className="border-t border-surface-a30" />
                    )}
                    <div
                      className={`flex gap-1 items-center p-1 cursor-pointer rounded-md duration-200 ${
                        belt.getId() === beltId
                          ? "bg-primary text-background"
                          : "bg-transparent hover:bg-surface-a30"
                      }`}
                      onClick={() => {
                        setOpen(false);
                        setSettings((prev) =>
                          prev.gameSettings.belts[product.getId()] ===
                          belt.getId()
                            ? prev
                            : {
                                ...prev,
                                gameSettings: {
                                  ...prev.gameSettings,
                                  belts: {
                                    ...prev.gameSettings.belts,
                                    [product.getId()]: belt.getId(),
                                  },
                                },
                              }
                        );
                      }}
                    >
                      <SpriteImage
                        row={belt.getImage().row}
                        col={belt.getImage().col}
                        size={28}
                      />
                      <div className="flex flex-col whitespace-nowrap">
                        <span>{t(belt.getName())}</span>
                        <span className="text-surface-a50 text-shadow-xs text-shadow-black">
                          {belt.getSpeed()} {t("items")}/{t("second")[0]}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Dropdown>
        </div>
        <span
          className="text-xs whitespace-nowrap"
          title={productsPerSec / belt.getSpeed() + ""}
        >
          x
          {productsPerSec / belt.getSpeed() > 0.1
            ? +(productsPerSec / belt.getSpeed()).toFixed(1)
            : "<0.1"}
        </span>
      </div>
    </td>
  );
}

function AffinitiesCol({
  building,
  product,
}: {
  building: Building;
  product: Item;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const affinityId =
    settings.gameSettings.affinitiesBoosts[product.getId()]?.[building.getId()];
  const affinity = getTile(affinityId + "", settings.mode);

  if (building.getAffinities().length > 0)
    return (
      <div className="flex justify-center font-[MindustryFont] text-xs">
        <Dropdown
          trigger={triggerRef.current}
          openState={[open, setOpen]}
          anchorEl={
            <div
              ref={triggerRef}
              className="relative group border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary"
              onClick={() => setOpen((prev) => !prev)}
            >
              <div
                className={`absolute text-lg pointer-event-none rounded-md opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                  !open && "group-hover:opacity-40"
                }`}
              >
                <MindustryIcon>&#xe824;</MindustryIcon>
              </div>
              <div className="p-1">
                {affinityId && affinityId !== "other" ? (
                  <SpriteImage
                    row={affinity.getImage().row}
                    col={affinity.getImage().col}
                  />
                ) : (
                  <div className="w-8 h-8 text-2xl flex items-center justify-center">
                    <MindustryIcon>&#xe868;</MindustryIcon>
                  </div>
                )}
              </div>
            </div>
          }
        >
          <div className="overflow-auto">
            <div className="flex flex-col max-h-60 gap-1 p-1">
              {(building.getAffinities(settings.mode) ?? []).map(
                (affinity, idx) => (
                  <React.Fragment key={affinity?.obj.getId() ?? idx}>
                    {idx !== 0 && <hr className="border-surface-a30" />}
                    <div
                      className={`flex items-center gap-1 cursor-pointer p-1 rounded-md duration-200 ${
                        affinityId === affinity?.obj.getId() ||
                        (affinityId == null &&
                          affinity?.obj.getId() === "other")
                          ? "bg-primary text-background"
                          : "bg-transparent hover:bg-surface-a20"
                      }`}
                      onClick={() => {
                        setOpen(false);
                        setSettings((prev) => {
                          const itemId =
                            prev.gameSettings.affinitiesBoosts[
                              product.getId()
                            ]?.[building.getId()];
                          if (
                            itemId ===
                              (affinity ? affinity.obj.getId() : undefined) ||
                            itemId === (affinity ? affinity.obj.getId() : null)
                          )
                            return prev;
                          return {
                            ...prev,
                            gameSettings: {
                              ...prev.gameSettings,
                              affinitiesBoosts: {
                                ...prev.gameSettings.affinitiesBoosts,
                                [product.getId()]: {
                                  ...prev.gameSettings.affinitiesBoosts[
                                    product.getId()
                                  ],
                                  [building.getId()]: affinity
                                    ? affinity.obj.getId()
                                    : null,
                                },
                              },
                            },
                          };
                        });
                      }}
                    >
                      {affinity && affinity?.obj.getId() !== "other" ? (
                        <>
                          <SpriteImage
                            row={affinity.obj.getImage().row}
                            col={affinity.obj.getImage().col}
                            size={28}
                          />
                          <div className="whitespace-nowrap flex flex-col">
                            <span>{t(affinity.obj.getName())}</span>
                            <span className="text-surface-a50 text-shadow text-shadow-black">
                              {affinity.efficiency > 0 ? "+" : ""}
                              {affinity.efficiency * 100}%
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 text-2xl flex items-center justify-center">
                            <MindustryIcon>&#xe868;</MindustryIcon>
                          </div>
                          <span>
                            {t(
                              affinity?.obj.getId() !== "other"
                                ? "None"
                                : "Other"
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </Dropdown>
      </div>
    );
}

function BoostsCol({
  building,
  product,
}: {
  building: Building;
  product: Item;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const itemId =
    settings.gameSettings.affinitiesBoosts[product.getId()]?.[building.getId()];
  const item = getItem(itemId + "", settings.mode);

  if (building.getBooster().length > 0)
    return (
      <div>
        <div className="flex justify-center">
          <div>
            <Dropdown
              trigger={triggerRef.current}
              openState={[open, setOpen]}
              anchorEl={
                <div
                  ref={triggerRef}
                  className="relative group border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <div
                    className={`absolute text-lg pointer-event-none rounded-md opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                      !open && "group-hover:opacity-40"
                    }`}
                  >
                    <MindustryIcon>&#xe824;</MindustryIcon>
                  </div>
                  <div className="p-1">
                    {itemId ? (
                      <SpriteImage
                        row={item.getImage().row}
                        col={item.getImage().col}
                      />
                    ) : (
                      <div className="w-8 h-8 text-2xl flex items-center justify-center">
                        <MindustryIcon>&#xe868;</MindustryIcon>
                      </div>
                    )}
                  </div>
                </div>
              }
            >
              <div className="overflow-auto">
                <div className="flex flex-col max-h-48 gap-1 p-1 font-[MindustryFont] text-xs">
                  {[null, ...(building.getBooster() ?? [])].map(
                    (booster, idx) => {
                      const item = getItem(booster?.id + "", settings.mode);
                      return (
                        <React.Fragment key={booster?.id ?? idx}>
                          {idx !== 0 && <hr className="border-surface-a30" />}
                          <div
                            className={`flex items-center gap-1 cursor-pointer p-1 rounded-md duration-200 ${
                              itemId === (booster ? booster.id : undefined) ||
                              itemId === (booster ? booster.id : null)
                                ? "bg-primary text-background"
                                : "bg-transparent hover:bg-surface-a20"
                            }`}
                            onClick={() => {
                              setOpen(false);
                              setSettings((prev) => {
                                const itemId =
                                  prev.gameSettings.affinitiesBoosts[
                                    product.getId()
                                  ]?.[building.getId()];
                                if (
                                  itemId ===
                                    (booster ? booster.id : undefined) ||
                                  itemId === (booster ? booster.id : null)
                                )
                                  return prev;
                                return {
                                  ...prev,
                                  gameSettings: {
                                    ...prev.gameSettings,
                                    affinitiesBoosts: {
                                      ...prev.gameSettings.affinitiesBoosts,
                                      [product.getId()]: {
                                        ...prev.gameSettings.affinitiesBoosts[
                                          product.getId()
                                        ],
                                        [building.getId()]: booster
                                          ? booster.id
                                          : null,
                                      },
                                    },
                                  },
                                };
                              });
                            }}
                          >
                            {booster ? (
                              <>
                                <SpriteImage
                                  row={item.getImage().row}
                                  col={item.getImage().col}
                                  size={28}
                                />
                                <div className="flex flex-col whitespace-nowrap">
                                  <span>{t(item.getName())}</span>
                                  <span className="text-surface-a50 text-shadow-xs text-shadow-black">
                                    x{booster.speed}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 text-2xl flex items-center justify-center">
                                  <MindustryIcon>&#xe868;</MindustryIcon>
                                </div>
                                <span>{t("None")}</span>
                              </>
                            )}
                          </div>
                        </React.Fragment>
                      );
                    }
                  )}
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    );
}

function BeaconsCol({ product }: { product: Item }) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const beaconId = settings.gameSettings.beacons[product.getId()];
  const beacon = getBeacon(beaconId + "", settings.mode);

  return (
    <td>
      <div>
        <div className="flex justify-center">
          <div>
            <Dropdown
              trigger={triggerRef.current}
              openState={[open, setOpen]}
              anchorEl={
                <div
                  ref={triggerRef}
                  className="group relative border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <div
                    className={`absolute text-lg pointer-event-none rounded-md opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                      !open && "group-hover:opacity-40"
                    }`}
                  >
                    <MindustryIcon>&#xe824;</MindustryIcon>
                  </div>
                  <div className="p-1">
                    {beaconId ? (
                      <SpriteImage
                        row={beacon.getImage().row}
                        col={beacon.getImage().col}
                      />
                    ) : (
                      <div className="w-8 h-8 text-2xl flex items-center justify-center">
                        <MindustryIcon>&#xe868;</MindustryIcon>
                      </div>
                    )}
                  </div>
                </div>
              }
            >
              <div className="overflow-auto">
                <div className="flex flex-col max-h-48 gap-1 p-1 font-[MindustryFont] text-xs">
                  {[null, ...getBeacons(settings.mode)].map((beacon1, idx) => (
                    <React.Fragment key={beacon1?.getId() ?? idx}>
                      {idx !== 0 && <hr className="border-surface-a30" />}
                      <div
                        className={`flex items-center gap-1 cursor-pointer p-1 rounded-md duration-200 ${
                          beaconId ===
                            (beacon1 ? beacon1.getId() : undefined) ||
                          beaconId === (beacon1 ? beacon1.getId() : null)
                            ? "bg-primary text-background"
                            : "bg-transparent hover:bg-surface-a20"
                        }`}
                        onClick={() => {
                          setOpen(false);
                          setSettings((prev) => {
                            const beaconId =
                              prev.gameSettings.beacons[product.getId()];
                            if (
                              beaconId ===
                                (beacon1 ? beacon1.getId() : undefined) ||
                              beaconId === (beacon1 ? beacon1.getId() : null)
                            )
                              return prev;
                            return {
                              ...prev,
                              gameSettings: {
                                ...prev.gameSettings,
                                beacons: {
                                  ...prev.gameSettings.beacons,
                                  [product.getId()]: beacon1
                                    ? beacon1.getId()
                                    : null,
                                },
                              },
                            };
                          });
                        }}
                      >
                        {beacon1 ? (
                          <>
                            <SpriteImage
                              row={beacon1.getImage().row}
                              col={beacon1.getImage().col}
                              size={28}
                            />
                            <div className="flex flex-col whitespace-nowrap">
                              <span className="">{t(beacon1.getName())}</span>
                              <span className="text-surface-a50 text-shadow-xs text-shadow-black">
                                {beacon1.getSpeed() > 0 ? "+" : "-"}
                                {beacon1.getSpeed() * 100}%
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-8 h-8 text-2xl flex items-center justify-center">
                              <MindustryIcon>&#xe868;</MindustryIcon>
                            </div>
                            <span>{t("None")}</span>
                          </>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </td>
  );
}

function Power({ power }: { power?: number }) {
  return (
    <td className="text-xs text-right pr-2">
      {power && <span title={+power.toFixed(3) + ""}>{+power.toFixed(3)}</span>}
    </td>
  );
}

function LinksCol() {
  return (
    <td className="px-2">
      <Link href="/" title="">
        <MindustryIcon className="text-2xl">&#xe81c;</MindustryIcon>
      </Link>
    </td>
  );
}

function TableHeadItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={className}>
      <div className={`py-1 px-2`}>{children}</div>
    </th>
  );
}



function calculate(
  objective: string,
  productsPerSec: number,
  settings: Settings,
  ignoredItems: string[],
  result: CalculationResult = {}
): CalculationResult {
  const item = getItem(objective, settings.mode);
  if (!item) return result;
  const recipe = getRecipe(objective, settings.mode);
  if (!recipe) return result;

  const building = getBuildingForItem(objective, settings);
  const numOfBuildings = calculateBuildings(
    objective,
    productsPerSec,
    settings
  );
  const power = building.getPower();
  if (result[objective]) {
    result[objective].productsPerSec += productsPerSec;
    result[objective].numOfBuildings += numOfBuildings;
    if (result[objective].power && power)
      result[objective].power += power * numOfBuildings;
  } else {
    result[objective] = {
      productsPerSec: productsPerSec,
      building: building.getId(),
      numOfBuildings: numOfBuildings,
      power: power ? power * numOfBuildings : power,
    };
  }

  if (ignoredItems.includes(objective)) return result;

  recipe.getInput(building.getId())?.forEach(({ id, perSec }) => {
    calculate(id, perSec * numOfBuildings, settings, ignoredItems, result);
  });

  const selectedBoostId =
    settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  const boost = building
    .getBooster(settings.mode)
    ?.find((v) => v.obj.getId() === selectedBoostId);
  if (boost)
    calculate(
      boost?.obj.getId(),
      boost?.perSec * numOfBuildings,
      settings,
      ignoredItems,
      result
    );

  return result;
}
