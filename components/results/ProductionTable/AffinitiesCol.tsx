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
import { getBuildingById, getTileById } from "@/game";
import { useCalculationResults } from "@/hooks";
import { useGameSettingsStore } from "@/store";
import {
  Ban,
  ChevronsLeftRight,
  ChevronsRightLeft,
  ChevronsUpDown,
  ListChevronsDownUp,
  ListChevronsUpDown,
} from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface AffinityType {
  id: string;
  efficiency: number;
}

export default function AffinitiesCol({ itemId }: { itemId: string }) {
  const results = useCalculationResults();
  const settings = useGameSettingsStore((state) => state.settings);

  const result = results[itemId];
  const building = getBuildingById(result.building);
  const affinities = building.getAffinities();

  const affinity = affinities.find(
    ({ id }) => id === settings.affinitiesBoosts[itemId]?.[building.getId()],
  ) ??
    affinities[0] ?? { id: "ohno", efficiency: NaN };

  return (
    <td className="px-4 py-1 border-b border-surface-a20">
      {affinities.length > 1 && (
        <Dropdown modal={false}>
          <DropdownTrigger className="group">
            <AffinityCell affinity={affinity} quantity={affinities.length} />
          </DropdownTrigger>
          <DropdownContent className="max-h-60 overflow-y-auto" side="right">
            {affinities.map(
              ({ id, efficiency }) =>
                id !== affinity.id && (
                  <AffinityDropdownItem
                    {...{
                      id,
                      efficiency,
                      itemId,
                      buildingId: building.getId(),
                    }}
                    key={`dropdown-affinity-${id}`}
                  />
                ),
            )}
          </DropdownContent>
        </Dropdown>
      )}
    </td>
  );
}

function AffinityCell({
  affinity,
  quantity,
}: {
  affinity: AffinityType;
  quantity: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tile = getTileById(affinity.id);
  const isExpandable = quantity > 1;
  const isDisabled = affinity.id === "other";

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
              "group relative border p-1 rounded-md duration-200 cursor-pointer overflow-hidden",
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
              {tile.getId() === "other" ? (
                <Ban />
              ) : (
                <SpriteImage
                  row={tile.getImage().row}
                  col={tile.getImage().col}
                />
              )}
            </div>
          </div>
        </TooltipTrigger>
        <AffinityTooltipContent {...affinity} />
      </Tooltip>
    </div>
  );
}

function AffinityDropdownItem({
  itemId,
  buildingId,
  id,
  efficiency,
}: { itemId: string; buildingId: string } & AffinityType) {
  const setItemProducerAffinity = useGameSettingsStore(
    (state) => state.setItemProducerAffinity,
  );
  const tile = getTileById(id);
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = id === "other";

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
            setItemProducerAffinity(itemId, buildingId, tile.getId())
          }
        >
          {tile.getName() === "Other" ? (
            <div className="w-8 h-8 flex flex-wrap content-center justify-center">
              <Ban />
            </div>
          ) : (
            <SpriteImage row={tile.getImage().row} col={tile.getImage().col} />
          )}
          <div className="flex flex-col text-xs text-left">
            <b>{tile.getName()}</b>
            <div className="flex">
              <div className="flex-wrap content-center">
                {efficiency > 0 && "+"}
                {efficiency * 100}%
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <AffinityTooltipContent id={id} efficiency={efficiency} />
      </Tooltip>
    </DropdownItem>
  );
}

export function AffinityTooltipContent({ id, efficiency }: AffinityType) {
  const tile = getTileById(id);
  return (
    <TooltipContent side="right" sideOffset={6}>
      <div className="flex">
        <SpriteImage row={tile.getImage().row} col={tile.getImage().col} />
        <b className="flex flex-wrap content-center">&nbsp;{tile.getName()}</b>
      </div>
      <b className="text-sm">
        <span>Full coverage: </span>
        <span>
          {efficiency > 0 && "+"}
          {efficiency * 100}%
        </span>
      </b>
    </TooltipContent>
  );
}
