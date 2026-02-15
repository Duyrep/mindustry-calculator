import { ProductionTarget } from "@/context";
import { getItemById, getProducerForItem, getRecipeById } from "@/game";
import { GameSettings } from "@/store/GameSettings";
import Decimal from "decimal.js";

export type CalculationResult = Record<
  string,
  {
    productsPerSec: number;
    building: string;
    numOfBuildings: number;
    power?: number;
  }
>;

export default function calculate(
  objective: string,
  productsPerSec: number,
  ignoredItems: string[],
  settings: GameSettings,
  result: CalculationResult = {},
): CalculationResult {
  const item = getItemById(objective);
  if (!item) return result;
  const recipe = getRecipeById(objective);
  if (!recipe) return result;

  const building = getProducerForItem(objective, settings);
  const numOfBuildings = calculateBuildings(
    objective,
    productsPerSec,
    settings,
  );
  const power = building.getPower();
  if (result[objective]) {
    result[objective].productsPerSec += productsPerSec;
    result[objective].numOfBuildings += numOfBuildings;
    if (result[objective].power && power)
      result[objective].power += power * numOfBuildings;
  } else {
    result[objective] = {
      productsPerSec: productsPerSec,
      building: building.getId(),
      numOfBuildings: numOfBuildings,
      power: power ? power * numOfBuildings : power,
    };
  }

  if (ignoredItems.includes(objective)) return result;

  recipe.getInput(building.getId())?.forEach(({ id, perSec }) => {
    calculate(id, perSec * numOfBuildings, ignoredItems, settings, result);
  });

  // const selectedBoostId =
  //   settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  // const boost = building
  //   .getBooster()
  //   ?.find((v) => v.obj.getId() === selectedBoostId);
  // if (boost)
  //   calculate(
  //     boost?.obj.getId(),
  //     boost?.perSec * numOfBuildings,
  //     ignoredItems,
  //     result
  //   );

  return result;
}

export function calculateTest(
  targets: { id: string; perSec: number }[],
  ignoredItems: string[],
  settings: GameSettings,
  result: CalculationResult = {},
): CalculationResult {
  targets.forEach((target) => {
    const item = getItemById(target.id);
    if (!item) return;
    const recipe = getRecipeById(target.id);
    if (!recipe) return;

    const building = getProducerForItem(target.id, settings);
    const numOfBuildings = calculateBuildings(
      target.id,
      target.perSec,
      settings,
    );
    const power = building.getPower();
    if (result[target.id]) {
      result[target.id].productsPerSec += target.perSec;
      result[target.id].numOfBuildings += numOfBuildings;
      if (result[target.id].power && power)
        (result[target.id].power as number) += power * numOfBuildings;
    } else {
      result[target.id] = {
        productsPerSec: target.perSec,
        building: building.getId(),
        numOfBuildings: numOfBuildings,
        power: power ? power * numOfBuildings : power,
      };
    }

    if (ignoredItems.includes(target.id)) return;

    recipe.getInput(building.getId())?.forEach(({ id, perSec }) => {
      calculate(id, perSec * numOfBuildings, ignoredItems, settings, result);
    });
  });

  return result;
}

export function calculateItemsPerSecond(
  objective: string,
  buildings: number,
  settings: GameSettings,
) {
  return calculateProductionPerSecond(objective, settings) * buildings;
}

export function calculateBuildings(
  objective: string,
  productsPerSec: number,
  settings: GameSettings,
) {
  return productsPerSec / calculateProductionPerSecond(objective, settings);
}

function calculateProductionPerSecond(
  objective: string,
  settings: GameSettings,
) {
  const recipe = getRecipeById(objective);
  const building = getProducerForItem(objective, settings);

  let perSec = recipe
    .getOutput(building.getId())
    ?.find((v) => v.id === objective)?.perSec;
  if (!perSec) return 0;

  // const beacon = getBeacon(
  //   settings.gameSettings.beacons[objective] + "",
  //   settings.mode
  // );
  // perSec += perSec * beacon.getSpeed();

  const affinities = building.getAffinities();
  const affinity =
    affinities.find(
      ({ id }) =>
        id === settings.affinitiesBoosts[objective]?.[building.getId()],
    ) ?? affinities?.[0];
  perSec += perSec * (affinity?.efficiency ?? 0);

  // const boost =
  //   settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  // perSec *= building.getBooster()?.find((v) => v.id === boost)?.speed ?? 1;

  return perSec;
}
