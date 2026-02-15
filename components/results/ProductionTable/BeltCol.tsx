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
import { getAllBelts, getBeltById, getItemById } from "@/game";
import { useCalculationResults } from "@/hooks";
import { Belt } from "@/models";
import { useGameSettingsStore } from "@/store";
import { formatThreshold } from "@/utils";
import { ChevronDown } from "lucide-react";
import pluralize from "@/lib/pluralize";
import { twMerge } from "tailwind-merge";

export default function BeltCol({ itemId }: { itemId: string }) {
  const result = useCalculationResults()[itemId];
  const belts = getAllBelts();
  const item = getItemById(itemId);
  const settings = useGameSettingsStore((state) => state.settings);
  const currentBelt = settings.belts[itemId]
    ? getBeltById(settings.belts[itemId])
    : (belts.find((belt) => belt.getTransportType() === item.getGroup()) ??
      getBeltById("ohno"));
  const numOfBelt = result.productsPerSec / currentBelt.getSpeed();

  const setItemBelt = useGameSettingsStore((state) => state.setItemBelt);

  if (currentBelt.getId() === "ohno")
    return <td className="border-b border-surface-a20 px-4"></td>;

  return (
    <td className="border-b border-surface-a20 px-4">
      <div className="flex">
        <Dropdown modal={false}>
          <DropdownTrigger>
            <BeltCell belt={currentBelt} />
          </DropdownTrigger>
          <DropdownContent className="p-1" side="right">
            {belts.map(
              (belt) =>
                belt.getId() !== currentBelt.getId() &&
                belt.getTransportType() === item.getGroup() && (
                  <DropdownItem key={`dropdown-${itemId}-${belt.getId()}`}>
                    <Tooltip disableHoverableContent={true}>
                      <TooltipTrigger
                        className={twMerge(
                          "w-full flex flex-wrap gap-1 cursor-pointer rounded-md p-1",
                          "hover:bg-surface-a20",
                        )}
                        onClick={() => setItemBelt(itemId, belt.getId())}
                      >
                        <SpriteImage
                          row={belt.getImage().row}
                          col={belt.getImage().col}
                        />
                        <div className="flex flex-col text-xs text-left">
                          <b>{belt.getName()}</b>
                          <div>
                            {formatThreshold(belt.getSpeed())}&nbsp;
                            {pluralize(
                              belt.getTransportType(),
                              belt.getSpeed(),
                            )}
                            /sec
                          </div>
                        </div>
                      </TooltipTrigger>
                      <BeltTooltipContent belt={belt} />
                    </Tooltip>
                  </DropdownItem>
                ),
            )}
          </DropdownContent>
        </Dropdown>
        <div
          className="flex flex-col justify-center text-sm"
          title={`${numOfBelt}`}
        >
          &nbsp;&times;&nbsp;
          {formatThreshold(numOfBelt)}
        </div>
      </div>
    </td>
  );
}

function BeltCell({ belt }: { belt: Belt }) {
  const belts = getAllBelts();

  return (
    <Tooltip disableHoverableContent={true}>
      <TooltipTrigger asChild>
        <div
          className={twMerge(
            "border",
            belts.length > 1
              ? "group border-surface-a30 rounded-md duration-200 cursor-pointer relative"
              : "border-transparent",
            belts.length > 1 && "hover:border-primary",
          )}
        >
          {belts.length > 1 && (
            <div
              className={twMerge(
                "absolute flex flex-wrap content-center justify-center w-full h-full pointer-events-none",
                "duration-200",
                "opacity-0 group-hover:opacity-100",
                "bg-surface-a0/30",
              )}
            >
              <ChevronDown />
            </div>
          )}
          <div className="p-1">
            <SpriteImage row={belt.getImage().row} col={belt.getImage().col} />
          </div>
        </div>
      </TooltipTrigger>
      <BeltTooltipContent belt={belt} />
    </Tooltip>
  );
}

export function BeltTooltipContent({ belt }: { belt: Belt }) {
  return (
    <TooltipContent side="right" sideOffset={6}>
      <div className="flex">
        <SpriteImage row={belt.getImage().row} col={belt.getImage().col} />
        <b className="flex flex-wrap content-center">&nbsp;{belt.getName()}</b>
      </div>
      <b className="text-sm">
        Speed: {formatThreshold(belt.getSpeed())}&nbsp;
        {pluralize(belt.getTransportType())}/sec
      </b>
    </TooltipContent>
  );
}

