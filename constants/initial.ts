import type { ProductionTarget } from "@/context";
import { ProductionUnit } from "@/enums";
import { GameSettings } from "@/store";

export const INITIAL_TARGETS: ProductionTarget[] = [
  {
    id: "36",
    itemId: "silicon",
    currentUnit: ProductionUnit.Buildings,
    values: {
      [ProductionUnit.Buildings]: 1,
      [ProductionUnit.PerSec]: 5.3,
      [ProductionUnit.PerMin]: 318,
      [ProductionUnit.PerHour]: 19080,
      [ProductionUnit.Custom]: 5.3,
    },
  },
];

export const INITIAL_SETTINGS: GameSettings = {
  items: {
    silicon: "silicon-crucible",
    sand: "air-blast-drill",
    coal: "coal-centrifuge",
    lead: "air-blast-drill",
  },
  belts: {},
  beacons: {},
  affinitiesBoosts: {},
};
