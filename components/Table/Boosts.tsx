import { SettingsContext } from "@/context";
import { getItem } from "@/utils";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown, { DropdownContent, DropdownTrigger } from "../Dropdown";
import { MindustryIcon } from "../icons";
import SpriteImage from "../SpriteImage";
import type { Building, Item } from "@/models";

export default function Boosts({
  building,
  product,
}: {
  building: Building;
  product: Item;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemId =
    settings.gameSettings.affinitiesBoosts[product.getId()]?.[building.getId()];
  const item = getItem(itemId + "", settings.mode);

  if (building.getBooster().length > 0)
    return (
      <div className="flex justify-center">
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
          </DropdownTrigger>
          <DropdownContent>
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
                            setSettings((prev) => {
                              const itemId =
                                prev.gameSettings.affinitiesBoosts[
                                  product.getId()
                                ]?.[building.getId()];
                              if (
                                itemId === (booster ? booster.id : undefined) ||
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
          </DropdownContent>
        </Dropdown>
      </div>
    );
}
