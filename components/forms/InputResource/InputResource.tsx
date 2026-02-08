"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { ConfirmClearAllDialog } from "./ConfirmClearAllDialog";
import { Item } from "./Item";
import { ItemSelectorDialogContent } from "./ItemSelectorDialogContent";

import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { useProductionStore } from "@/store";

export default function InputResource() {
  const targets = useProductionStore((state) => state.targets)
  const addTarget = useProductionStore((state) => state.addTarget)
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="p-2 bg-surface-a10 rounded-md">
      <div className="flex flex-col gap-1">
        {targets.map((target) => (
          <Item {...target} key={target.id} />
        ))}

        <div className="flex gap-2">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full flex justify-center">
                <Plus size={28} strokeWidth={3} />
              </Button>
            </DialogTrigger>
            <ItemSelectorDialogContent
              onSelect={(itemId) => {
                addTarget(itemId);
                setShowAddDialog(false);
              }}
            />
          </Dialog>

          <ConfirmClearAllDialog />
        </div>
      </div>
    </div>
  );
}
