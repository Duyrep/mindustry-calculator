import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ItemSelectorDialogContent } from "./ItemSelectorDialogContent";
import { Dialog, DialogTrigger, SpriteImage } from "@/components/ui";
import { getItemById } from "@/game";
import { useProductionStore } from "@/store";

export function ItemSelector({ id }: { id: string }) {
  const changeTarget = useProductionStore((state) => state.changeTarget);
  const getTarget = useProductionStore((state) => state.getTarget);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const item = getItemById(getTarget(id)?.itemId ?? "");

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger asChild>
        <div
          className={twMerge(
            "m-1 p-1 border border-surface-a50 rounded-md flex flex-wrap content-center justify-center duration-200 outline-primary aspect-square",
            "hover:outline-1 hover:border hover:border-primary hover:cursor-pointer",
          )}
        >
          <SpriteImage
            row={item?.image.row ?? 0}
            col={item?.image.col ?? 0}
            title={item?.name}
          />
        </div>
      </DialogTrigger>

      <ItemSelectorDialogContent
        itemId={item?.id}
        onSelect={(itemId) => {
          changeTarget(id, itemId);
          setShowAddDialog(false);
        }}
      />
    </Dialog>
  );
}
