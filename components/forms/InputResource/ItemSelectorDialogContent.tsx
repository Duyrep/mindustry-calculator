import pluralize from "pluralize";
import { useState } from "react";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  SpriteImage,
} from "@/components/ui";
import { getAllGroupsOfItems, getAllItems } from "@/game";

export function ItemSelectorDialogContent({
  itemId,
  onSelect,
}: {
  itemId?: string;
  onSelect: (itemId: string) => void;
}) {
  const [showGroup, setShowGroup] = useState<string>("all");

  return (
    <DialogContent className="w-96">
      <DialogTitle asChild>
        <Input placeholder="Search" className="w-full h-10 font-black" />
      </DialogTitle>

      {/* group */}
      <div className="flex gap-1 y-1 overflow-x-auto w-full">
        {["all", ...getAllGroupsOfItems()].map((group) => (
          <Button
            key={group}
            className={`p-1 bg-surface-a20 rounded-md font-bold min-w-16 ${showGroup === group && "bg-primary"}`}
            onClick={() => setShowGroup(group)}
          >
            {pluralize(
              group.charAt(0).toUpperCase() + group.slice(1),
              group === "all" ? 1 : 0,
            )}
          </Button>
        ))}
      </div>

      <hr className="my-2 border-surface-a30" />

      <div className="overflow-auto">
        {/* items */}
        <div className="flex flex-wrap justify-center duration-200">
          {getAllItems().map(({ id, image, group }) => (
            <Button
              key={id}
              className={`
                rounded-md duration-200 Button
                hover:cursor-pointer active:bg-surface-a30/25
                ${group !== showGroup && showGroup !== "all" ? "p-0 max-w-0 max-h-0 delay-200 m-0" : "p-1 max-w-40 max-h-40 m-0.5"}
                ${itemId === id ? "bg-primary" : "bg-surface-a20 hover:bg-surface-a30"}
              `}
              onClick={() => onSelect(id)}
            >
              <div
                className={`duration-200 ${group !== showGroup && showGroup !== "all" ? "scale-0" : "scale-[100%] delay-200"}`}
              >
                <SpriteImage row={image.row} col={image.col} />
              </div>
            </Button>
          ))}
        </div>
      </div>

      <DialogClose />
    </DialogContent>
  );
}
