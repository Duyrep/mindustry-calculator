import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ItemSelectorDialogContent } from "./ItemSelectorDialogContent";
import { Dialog, DialogTrigger, SpriteImage } from "@/components/ui";
import { getItemById } from "@/game";
import { useProductionStore } from "@/store";
import { useTarget } from "@/store/Production";

export function ItemSelector({ targetId }: { targetId: string }) {
  const changeTarget = useProductionStore((state) => state.changeTarget);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const item = getItemById(useTarget(targetId)?.itemId ?? "");

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger
        className={twMerge(
          "m-1 p-1 border border-surface-a50 rounded-md flex flex-wrap content-center justify-center duration-200 outline-primary aspect-square",
          "hover:outline-1 hover:border hover:border-primary hover:cursor-pointer",
        )}
      >
        <SpriteImage
          row={item.getImage().row}
          col={item.getImage().col}
          title={item.getName()}
        />
      </DialogTrigger>

      <ItemSelectorDialogContent
        itemId={item.getId()}
        onSelect={(itemId) => {
          changeTarget(targetId, itemId);
          setShowAddDialog(false);
        }}
      />
    </Dialog>
  );
}
