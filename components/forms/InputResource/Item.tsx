import { Menu, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { ItemSelector } from "./ItemSelector";
import { useProductionStore } from "@/store";
import UnitSelector from "./UnitSelector";
import { useTargetValue } from "@/store/Production";
import { useEffect, useRef } from "react";

export function Item({ targetId }: { targetId: string }) {
  const targetValue = useTargetValue(targetId);
  const targets = useProductionStore((state) => state.targets);
  const changeValue = useProductionStore((state) => state.changeValue);
  const removeTarget = useProductionStore((state) => state.removeTarget);
  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputValue.current) return;
    console.log(targets);
    inputValue.current.value = `${targetValue}`;
  }, [targetValue, targets]);

  return (
    <div className="flex justify-between gap-1 bg-surface-a20 rounded-md">
      <div className="flex gap-2">
        <div className="p-2 flex flex-wrap justify-center content-center hover:cursor-grab active:cursor-grabbing border-r border-surface-a50">
          <Menu size={32} className="w-8 h-8" />
        </div>
        <ItemSelector targetId={targetId} />
        <UnitSelector targetId={targetId} />
        <div className="flex flex-wrap content-center">
          <Input
            ref={inputValue}
            className="h-min py-1 w-25"
            type="number"
            min={0}
            defaultValue="0"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                changeValue(
                  targetId,
                  +(event.target as HTMLInputElement).value,
                );
              }
            }}
            onFocus={(event) => (event.target as HTMLInputElement).select()}
            onBlur={(event) =>
              changeValue(targetId, +(event.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>
      <div className="p-1 flex flex-wrap justify-center content-center">
        <Button className="p-1" onClick={() => removeTarget(targetId)}>
          <Trash2 className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
