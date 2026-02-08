import { Menu, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { ItemSelector } from "./ItemSelector";
import { useProductionStore } from "@/store";

export function Item({ id }: { id: string }) {
  const removeTarget = useProductionStore((state) => state.removeTarget)

  return (
    <div className="flex flex-wrap content-center justify-between gap-1 bg-surface-a20 rounded-md">
      <div className="flex gap-2">
        <div className="p-2 flex flex-wrap justify-center content-center hover:cursor-grab active:cursor-grabbing border-r border-surface-a50">
          <Menu size={32} className="w-8 h-8" />
        </div>
        <ItemSelector id={id} />
        <Input />
      </div>
      <div className="p-1 flex flex-wrap justify-center content-center">
        <Button className="p-1" onClick={() => removeTarget(id)}>
          <Trash2 className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
