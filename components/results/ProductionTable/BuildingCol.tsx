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
import {
  getAllProducersForItem,
  getBuildingById,
  getItemById,
  getRecipeById,
} from "@/game";
import { useCalculationResults } from "@/hooks";
import type { Building } from "@/models";
import { useGameSettingsStore } from "@/store";
import { formatThreshold } from "@/utils";
import { ChevronDown } from "lucide-react";
import pluralize from "@/lib/pluralize";
import { twMerge } from "tailwind-merge";

export default function BuildingCol({ itemId }: { itemId: string }) {
  const results = useCalculationResults();
  const result = results[itemId];
  const building = getBuildingById(result.building);
  const producers = getAllProducersForItem(itemId);

  return (
    <td className="px-4 py-1 border-b border-surface-a20">
      <div className="flex">
        {producers.length > 1 ? (
          <Dropdown modal={false}>
            <DropdownTrigger>
              <ProducerCell itemId={itemId} building={building} />
            </DropdownTrigger>
            <DropdownContent className="p-1" side="right">
              {producers.map(
                (producer) =>
                  producer.getId() !== building.getId() && (
                    <BuildingDropdownItem
                      key={`dropdown-${itemId}-${producer.getId()}`}
                      itemId={itemId}
                      producer={producer}
                    />
                  ),
              )}
            </DropdownContent>
          </Dropdown>
        ) : (
          <ProducerCell itemId={itemId} building={building} />
        )}
        <div
          className="flex flex-col justify-center text-sm text-nowrap"
          title={`${result.numOfBuildings}`}
        >
          &nbsp;&times;&nbsp;
          {formatThreshold(result.numOfBuildings)}
        </div>
      </div>
    </td>
  );
}

function ProducerCell({
  itemId,
  building,
}: {
  itemId: string;
  building: Building;
}) {
  const producers = getAllProducersForItem(itemId);

  return (
    <Tooltip disableHoverableContent={true}>
      <TooltipTrigger asChild>
        <div
          className={twMerge(
            "border",
            producers.length > 1
              ? "group border-surface-a30 rounded-md duration-200 cursor-pointer relative"
              : "border-transparent",
            producers.length > 1 && "hover:border-primary",
          )}
        >
          {producers.length > 1 && (
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
            <SpriteImage
              row={building.getImage().row}
              col={building.getImage().col}
            />
          </div>
        </div>
      </TooltipTrigger>
      <BuildingTooltipContent itemId={itemId} building={building} />
    </Tooltip>
  );
}

function BuildingDropdownItem({
  itemId,
  producer,
}: {
  itemId: string;
  producer: Building;
}) {
  const setItemProducer = useGameSettingsStore(
    (state) => state.setItemProducer,
  );

  const recipe = getRecipeById(itemId);
  const output = recipe.getOutput(producer.getId());
  const { id, perSec } = output.find(({ id }) => id === itemId) ?? {
    id: "ohno",
    perSec: NaN,
  };
  const item = getItemById(id);

  return (
    <DropdownItem>
      <Tooltip disableHoverableContent={true}>
        <TooltipTrigger
          className={twMerge(
            "w-full flex flex-wrap gap-1 cursor-pointer rounded-md p-1",
            "hover:bg-surface-a20",
          )}
          onClick={() => setItemProducer(itemId, producer.getId())}
        >
          <SpriteImage
            row={producer.getImage().row}
            col={producer.getImage().col}
          />
          <div className="flex flex-col text-xs text-left">
            <b>{producer.getName()}</b>
            <div className="flex">
              <SpriteImage
                size={18}
                row={item.getImage().row}
                col={item.getImage().col}
              />
              <div className="flex-wrap content-center">
                {formatThreshold(perSec, 2)}
                &nbsp;{pluralize(item.getName(), perSec)}
                /sec
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <BuildingTooltipContent itemId={itemId} building={producer} />
      </Tooltip>
    </DropdownItem>
  );
}

function BuildingTooltipContent({
  itemId,
  building,
}: {
  itemId: string;
  building: Building;
}) {
  const recipe = getRecipeById(itemId);
  const input = recipe.getInput(building.getId());
  const output = recipe.getOutput(building.getId());

  return (
    <TooltipContent side="right" sideOffset={6}>
      <div className="flex">
        <SpriteImage
          row={building.getImage().row}
          col={building.getImage().col}
        />
        <b className="flex flex-wrap content-center">
          &nbsp;{building.getName()}
        </b>
      </div>
      <div className="text-sm">
        {input.length !== 0 && (
          <>
            <b>Input</b>
            {input.map(({ id, perSec }) => {
              const item = getItemById(id);
              return (
                <div key={`tooltip-building-input-${id}`} className="flex">
                  <SpriteImage
                    size={24}
                    row={item.getImage().row}
                    col={item.getImage().col}
                  />
                  <div className="flex flex-wrap content-center">
                    &nbsp;
                    {formatThreshold(perSec, 2)}
                    &nbsp;
                    {pluralize(item.getName(), perSec)}/sec
                  </div>
                </div>
              );
            })}
          </>
        )}
        <b>Output</b>
        {output.map(({ id, perSec, rate }) => {
          const item = getItemById(id);
          return (
            <div key={`tooltip-building-input-${id}`} className="flex">
              <SpriteImage
                size={24}
                row={item.getImage().row}
                col={item.getImage().col}
              />
              <div className="flex flex-wrap content-center">
                &nbsp;
                {formatThreshold(perSec, 2)}
                &nbsp;
                {pluralize(item.getName(), perSec)}/sec&nbsp;
                {rate && `(${rate}%)`}
              </div>
            </div>
          );
        })}
        {building.getPower() && <b>Power:&nbsp;{building.getPower()}</b>}
      </div>
    </TooltipContent>
  );
}
