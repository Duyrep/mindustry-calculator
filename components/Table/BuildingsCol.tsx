"use client"

import { SettingsContext } from "@/context";
import { SpriteImage } from "..";
import { getBuilding } from "@/utils";
import Dropdown, { DropdownTrigger, DropdownContent } from "../Dropdown";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import type { Building, Item } from "@/models";
import { MindustryIcon } from "../icons";

export default function BuildingCol({
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
