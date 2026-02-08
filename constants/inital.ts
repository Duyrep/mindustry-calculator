import type { ProductionTarget } from "@/context";
import { ProductionUnit } from "@/enums";

export const INITIAL_TARGETS: ProductionTarget[] = [
  {
    id: "36",
    itemId: "silicon",
    currentUnit: ProductionUnit.Buildings,
    values: Object.fromEntries(
      Object.values(ProductionUnit).map((unit) => [unit, 0]),
    ) as Record<ProductionUnit, number>,
  },
];
