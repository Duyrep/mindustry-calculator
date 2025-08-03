import { SettingsContext } from "@/context";
import type { Building, Item } from "@/models";
import { getTile } from "@/utils";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown, { DropdownContent, DropdownTrigger } from "../Dropdown";
import { MindustryIcon } from "../icons";
import SpriteImage from "../SpriteImage";

export default function Affinities({
  building,
  product,
}: {
  building: Building;
  product: Item;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const affinityId =
    settings.gameSettings.affinitiesBoosts[product.getId()]?.[building.getId()];
  const affinity = getTile(affinityId + "", settings.mode);

  if (building.getAffinities().length > 0)
    return (
      <div className="flex justify-center font-[MindustryFont] text-xs">
        <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
          <DropdownTrigger>
            <div className="relative group border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary">
              <div
                className={`absolute text-lg pointer-event-none rounded-md opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                  !isDropdownOpen && "group-hover:opacity-40"
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
          </DropdownTrigger>
          <DropdownContent>
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
                          setSettings((prev) => {
                            const itemId =
                              prev.gameSettings.affinitiesBoosts[
                                product.getId()
                              ]?.[building.getId()];
                            if (
                              itemId ===
                                (affinity ? affinity.obj.getId() : undefined) ||
                              itemId ===
                                (affinity ? affinity.obj.getId() : null)
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
          </DropdownContent>
        </Dropdown>
      </div>
    );
}
