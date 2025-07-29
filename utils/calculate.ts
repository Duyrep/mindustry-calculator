import { Settings } from "@/types";
import { getBeacon, getRecipe } from "./data";
import { getBuildingForItem } from "./settings";

export function calculateItemsPerSecond(
  objective: string,
  buildings: number,
  settings: Settings
) {
  return calculateProductionPerSecond(objective, settings) * buildings;
}

export function calculateBuildings(
  objective: string,
  productsPerSec: number,
  settings: Settings
) {
  return productsPerSec / calculateProductionPerSecond(objective, settings);
}

function calculateProductionPerSecond(objective: string, settings: Settings) {
  const recipe = getRecipe(objective, settings.mode);
  const building = getBuildingForItem(objective, settings);

  let perSec = recipe
    .getOutput(building.getId())
    ?.find((v) => v.id === objective)?.perSec;
  if (!perSec) return 0;

  const beacon = getBeacon(
    settings.gameSettings.beacons[objective] + "",
    settings.mode
  );
  perSec += perSec * beacon.getSpeed();

  const affinity =
    settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  perSec +=
    perSec *
    (building.getAffinities()?.find((v) => v.id === affinity)?.efficiency ?? 0);

  const boost =
    settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  perSec *= building.getBooster()?.find((v) => v.id === boost)?.speed ?? 1;

  return perSec;
}
