import { SpriteImage, TooltipTrigger } from "@/components/ui";
import { Tooltip, TooltipContent } from "@/components/ui";
import { getItemById } from "@/game";
import { useCalculationResults } from "@/hooks";
import { Item } from "@/models";
import { useProductionStore } from "@/store";
import { useIsIgnored } from "@/store/Production";
import { EyeOff } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function ItemCol({ itemId }: { itemId: string }) {
  const toggleIgnore = useProductionStore((state) => state.toggleIgnore);
  const isIsIgnore = useIsIgnored(itemId)
  const results = useCalculationResults();
  const result = results[itemId];
  const item = getItemById(itemId);

  return (
    <td className="px-4 border-b border-surface-a20">
      <div className="flex">
        <Tooltip disableHoverableContent={true}>
          <TooltipTrigger onClick={() => toggleIgnore(itemId)}>
            <div className="relative group cursor-pointer">
              <div
                className={twMerge(
                  "absolute w-full h-full flex flex-wrap justify-center content-center rounded-md duration-200",
                  isIsIgnore ? "opacity-50 bg-surface-a0/60" : "opacity-0 group-hover:opacity-50 group-hover:bg-surface-a0/30",
                )}
              >
                <EyeOff />
              </div>

              <div className="p-1">
                <SpriteImage
                  row={item.getImage().row}
                  col={item.getImage().col}
                />
              </div>
            </div>
          </TooltipTrigger>
          <ItemTooltipContent item={item} />
        </Tooltip>
        <div
          className="flex flex-col justify-center text-sm"
          title={`${result.productsPerSec}`}
        >
          &nbsp;
          {+result.productsPerSec.toFixed(1) < 0.1 &&
          result.productsPerSec !== 0
            ? "< 0.1"
            : +result.productsPerSec.toFixed(1)}
        </div>
      </div>
    </td>
  );
}

function ItemTooltipContent({ item }: { item: Item }) {
  return (
    <TooltipContent side="right">
      <div className="flex">
        <SpriteImage row={item.getImage().row} col={item.getImage().col} />
        <b className="flex flex-wrap content-center">&nbsp;{item.getName()}</b>
      </div>
    </TooltipContent>
  );
}
