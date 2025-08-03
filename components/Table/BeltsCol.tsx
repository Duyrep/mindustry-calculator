import { SettingsContext } from "@/context";
import { getBelt, getBelts } from "@/utils";
import React from "react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown, { DropdownContent, DropdownTrigger } from "../Dropdown";
import { MindustryIcon } from "../icons";
import SpriteImage from "../SpriteImage";
import type { Item } from "@/models";

export function BeltCol({
  product,
  productsPerSec,
}: {
  product: Item;
  productsPerSec: number;
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const beltId = settings.gameSettings.belts[product.getId()];
  const belts = getBelts(settings.mode).filter(
    (belt) => belt.getTransportType() === product.getCategory()
  );
  const belt = getBelt(beltId, settings.mode);

  return (
    <td className="pl-2">
      {belts.length !== 0 && (
        <div className="flex items-center gap-1">
          <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
            <DropdownTrigger>
              <div
                className={`relative group rounded-md duration-200 hover:border-primary ${
                  belts.length > 1 && "border border-surface-a30 cursor-pointer"
                }`}
              >
                {belts.length > 1 && (
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
                    row={belt.getImage().row}
                    col={belt.getImage().col}
                  />
                </div>
              </div>
            </DropdownTrigger>
            <DropdownContent>
              {belts.length > 1 && (
                <div className="overflow-auto">
                  <div className="flex flex-col max-h-48 gap-1 p-1 text-xs font-[MindustryFont]">
                    {belts.map((belt, idx) => (
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
                          onClick={() =>
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
                            )
                          }
                        >
                          <SpriteImage
                            row={belt.getImage().row}
                            col={belt.getImage().col}
                            size={28}
                          />
                          <div className="flex flex-col whitespace-nowrap">
                            <span>{t(belt.getName())}</span>
                            <span className="text-surface-a50 text-shadow-xs text-shadow-black">
                              {belt.getSpeed()} {t(product.getCategory() + "s")}
                              /{t("second")[0]}
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </DropdownContent>
          </Dropdown>
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
      )}
    </td>
  );
}
