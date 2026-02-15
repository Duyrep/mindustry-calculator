import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { Plus } from "lucide-react";
import { ItemSelectorDialogContent } from "./ItemSelectorDialogContent";
import { useProductionStore } from "@/store";
import { useState } from "react";

export function AddProduction() {
  const addTarget = useProductionStore((state) => state.addTarget)
  const [showAddDialog, setShowAddDialog] = useState(false);
  return (
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
  );
}
