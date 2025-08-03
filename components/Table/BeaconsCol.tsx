import { SettingsContext } from "@/context";
import type { Item } from "@/models";
import { getBeacon, getBeacons } from "@/utils";
import React, { useContext, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Dropdown, { DropdownContent, DropdownTrigger } from "../Dropdown";
import { MindustryIcon } from "../icons";
import SpriteImage from "../SpriteImage";

export default function BeaconsCol({ product }: { product: Item }) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef(null);
  const beaconId = settings.gameSettings.beacons[product.getId()];
  const beacon = getBeacon(beaconId + "", settings.mode);

  return (
    <td>
      <div className="flex justify-center">
        <div>
          <Dropdown onOpen={(isOpen) => setIsDropdownOpen(isOpen)}>
            <DropdownTrigger>
              <div
                ref={triggerRef}
                className="group relative border border-surface-a30 rounded-md cursor-pointer duration-200 hover:border-primary"
              >
                <div
                  className={`absolute text-lg pointer-event-none rounded-md opacity-0 duration-200 bg-surface-a30 w-full h-full flex justify-center items-center ${
                    !isDropdownOpen && "group-hover:opacity-40"
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
            </DropdownTrigger>
            <DropdownContent>
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
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </td>
  );
}
