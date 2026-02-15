import pluralize from "@/lib/pluralize";
import { useState } from "react";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  SpriteImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { getAllGroupsOfItems, getAllItems } from "@/game";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";

export function ItemSelectorDialogContent({
  itemId,
  onSelect,
}: {
  itemId?: string;
  onSelect: (itemId: string) => void;
}) {
  const [showGroup, setShowGroup] = useState<string>("all");

  return (
    <DialogContent className="max-h-[80vh] flex flex-col p-4">
      <div>
        <DialogTitle asChild>
          <div className="flex gap-2">
            <div className="flex flex-wrap content-center">
              <Search strokeWidth={3} />
            </div>
            <div className="flex flex-wrap content-center w-full">
              <Input placeholder="Search" className="w-full h-10 font-black" />
            </div>
          </div>
        </DialogTitle>

        <div className="flex gap-1 overflow-x-auto w-full no-scrollbar">
          {["all", ...getAllGroupsOfItems()].map((group) => (
            <Button
              key={group}
              className={twMerge(
                "p-1 bg-surface-a20 rounded-md font-bold min-w-16",
                showGroup === group && "bg-primary text-white",
              )}
              onClick={() => setShowGroup(group)}
            >
              {pluralize(
                group.charAt(0).toUpperCase() + group.slice(1),
                group === "all" ? 1 : 0,
              )}
            </Button>
          ))}
        </div>
      </div>

      <hr className="my-2 border-surface-a30" />

      <div className="flex-1 overflow-y-auto min-h-0 pr-2">
        <div className="flex flex-wrap justify-center gap-1">
          {getAllItems().map(({ id, image, group, name }) => (
            <Tooltip key={`item-selector-dialog-${id}`} disableHoverableContent={true}>
              <TooltipTrigger asChild>
                <Button
                  key={id}
                  className={twMerge(
                    "rounded-md duration-200 p-1",
                    "hover:cursor-pointer active:bg-surface-a30/25",
                    itemId === id
                      ? "bg-primary"
                      : "bg-surface-a20 hover:bg-surface-a30",
                    group !== showGroup && showGroup !== "all" && itemId !== id
                      ? "hidden"
                      : "",
                  )}
                  onClick={() => onSelect(id)}
                >
                  <SpriteImage row={image.row} col={image.col} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <b>{name}</b>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <DialogClose />
    </DialogContent>
  );
}
