import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui";
import { ProductionUnit } from "@/enums";
import { useProductionStore, useTargetCurrentUnit } from "@/store";
import { ChevronDown } from "lucide-react";

const UnitLabels = new Map<ProductionUnit | undefined, string>([
  [ProductionUnit.Buildings, "Buildings"],
  [ProductionUnit.PerSec, "Items/s"],
  [ProductionUnit.PerMin, "Items/m"],
  [ProductionUnit.PerHour, "Items/h"],
  [ProductionUnit.Custom, "Custom"],
]);

export default function UnitSelector({ targetId }: { targetId: string }) {
  const changeUnit = useProductionStore((state) => state.changeUnit);
  const currentUnit = useTargetCurrentUnit(targetId);

  return (
    <div className="flex flex-warp content-center">
      <Dropdown modal={false}>
        <DropdownTrigger className="group" asChild>
          <div className="flex flex-col justify-center">
            <Button size="sm" className="flex py-1 font-bold">
              {UnitLabels.get(currentUnit)}
              <ChevronDown
                className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                strokeWidth={3}
              />
            </Button>
          </div>
        </DropdownTrigger>
        <DropdownContent className="flex flex-col gap-2">
          {[...UnitLabels].map(([unit, label]) => (
            <DropdownItem key={`${targetId}-${unit}`} asChild>
              <Button
                size="sm"
                className="w-full text-left py-1 font-bold"
                onClick={() =>
                  changeUnit(targetId, unit as unknown as ProductionUnit)
                }
              >
                {label}
              </Button>
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
