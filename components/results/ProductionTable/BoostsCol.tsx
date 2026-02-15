import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  SpriteImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { getBuildingById, getItemById } from "@/game";
import { useCalculationResults } from "@/hooks";
import { useGameSettingsStore } from "@/store";
import { Ban, ChevronsLeftRight, ChevronsRightLeft } from "lucide-react";
import pluralize from "@/lib/pluralize";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface BoosterType {
  id: string;
  speed: number;
  perSec: number;
}

export default function BoostsCol({ itemId }: { itemId: string }) {
  const results = useCalculationResults();
  const settings = useGameSettingsStore((state) => state.settings);

  const result = results[itemId];
  const building = getBuildingById(result.building);
  const boosters =
    building.getBooster().length > 0
      ? [{ id: "none", speed: 0, perSec: 0 }, ...building.getBooster()]
      : [];

  const booster =
    boosters.find(
      ({ id }) => id === settings.affinitiesBoosts[itemId]?.[building.getId()],
    ) ?? boosters[0];

  return (
    <td className="px-4 py-1 border-b border-surface-a20">
      {boosters.length > 1 ? (
        <Dropdown modal={false}>
          <DropdownTrigger className="group cursor-pointer">
            <BoosterCell booster={booster} quantity={boosters.length} />
          </DropdownTrigger>
          <DropdownContent
            className="max-h-60 overflow-y-auto p-1"
            side="right"
          >
            {boosters.map(
              ({ id, speed, perSec }) =>
                id !== booster.id && (
                  <BoosterDropdownItem
                    {...{
                      booster: { id, speed, perSec },
                      itemId,
                      buildingId: building.getId(),
                    }}
                    key={`dropdown-affinity-${crypto.randomUUID()}`}
                  />
                ),
            )}
          </DropdownContent>
        </Dropdown>
      ) : (
        boosters.length === 1 && (
          <BoosterCell booster={booster} quantity={boosters.length} />
        )
      )}
    </td>
  );
}

function BoosterCell({
  booster,
  quantity,
}: {
  booster: BoosterType;
  quantity: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const item = getItemById(booster.id);
  const isExpandable = quantity > 1;
  const isDisabled = booster.id === "none";

  return (
    <div className="relative group/cell">
      <Tooltip
        disableHoverableContent={true}
        open={isDisabled ? false : isOpen}
        onOpenChange={setIsOpen}
      >
        <TooltipTrigger asChild>
          <div
            className={twMerge(
              "group relative border p-1 rounded-md duration-200 overflow-hidden",
              isExpandable
                ? "border-surface-a30 hover:border-primary"
                : "border-transparent",
            )}
          >
            {isExpandable && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-a0/30 opacity-0 group-hover:opacity-100 duration-200 pointer-events-none">
                <ChevronsLeftRight className="absolute group-data-[state=open]:opacity-0 duration-200" />
                <ChevronsRightLeft className="absolute opacity-0 group-data-[state=open]:opacity-100 duration-200" />
              </div>
            )}

            <div className="w-8 h-8 flex items-center justify-center">
              {booster.id === "none" ? (
                <Ban />
              ) : (
                <SpriteImage
                  row={item.getImage().row}
                  col={item.getImage().col}
                />
              )}
            </div>
          </div>
        </TooltipTrigger>
        <BoosterTooltipContent {...booster} />
      </Tooltip>
    </div>
  );
}

function BoosterDropdownItem({
  itemId,
  buildingId,
  booster,
}: {
  itemId: string;
  buildingId: string;
  booster: BoosterType;
}) {
  const setItemProducerAffinity = useGameSettingsStore(
    (state) => state.setItemProducerAffinity,
  );
  const item = getItemById(booster.id);
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = booster.id === "none";

  return (
    <DropdownItem>
      <Tooltip
        disableHoverableContent={true}
        open={isDisabled ? false : isOpen}
        onOpenChange={setIsOpen}
      >
        <TooltipTrigger
          className={twMerge(
            "w-full flex flex-wrap gap-1 cursor-pointer rounded-md p-1",
            "hover:bg-surface-a20",
          )}
          onClick={() =>
            setItemProducerAffinity(itemId, buildingId, item.getId())
          }
        >
          {booster.id === "none" ? (
            <div className="flex">
              <div className="w-8 h-8 flex flex-wrap content-center justify-center">
                <Ban />
              </div>
              <div className="flex font-bold flex-wrap content-center justify-center">&nbsp;None</div>
            </div>
          ) : (
            <>
              <SpriteImage
                row={item.getImage().row}
                col={item.getImage().col}
              />
              <div className="flex flex-col text-xs text-left">
                <b>{item.getName()}</b>
                <div className="flex">
                  <div className="flex-wrap content-center">
                    &times;{booster.speed}
                  </div>
                </div>
              </div>
            </>
          )}
        </TooltipTrigger>
        <BoosterTooltipContent {...booster} />
      </Tooltip>
    </DropdownItem>
  );
}

export function BoosterTooltipContent({ id, speed, perSec }: BoosterType) {
  const item = getItemById(id);
  return (
    <TooltipContent side="right" sideOffset={6}>
      <div className="flex">
        <SpriteImage row={item.getImage().row} col={item.getImage().col} />
        <b className="flex flex-wrap content-center">&nbsp;{item.getName()}</b>
      </div>
      <b className="text-sm">
        {perSec} {pluralize(item.getName())}/sec <br />&times;{speed} speed
      </b>
    </TooltipContent>
  );
}
