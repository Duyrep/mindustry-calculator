"use client";

import { Objectives } from "@/components";
import Table from "@/components/Table";
import { ObjectiveContext } from "@/context/ObjectiveContext";
import { SettingsContext } from "@/context/SettingsContext";
import { getBuildingForItem, getItem, getRecipe } from "@/utils";
import { calculateBuildings } from "@/utils/calculate";
import React, { useContext, useEffect, useMemo, useState } from "react";
import type { Settings, CalculationResult } from "@/types";

export default function Home() {
  const [settings] = useContext(SettingsContext).settingsState;
  const [ignoredItems] = useContext(SettingsContext).ignoredItemsState;
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const [productsPerSec] = useContext(ObjectiveContext).productsPerSecState;
  const [result, setResult] = useState(
    calculate(objective, productsPerSec, settings, ignoredItems)
  );

  const calculatedResult = useMemo(() => {
    return calculate(objective, productsPerSec, settings, ignoredItems);
  }, [objective, productsPerSec, settings, ignoredItems]);

  useEffect(() => {
    setResult(calculatedResult);
  }, [calculatedResult]);

  return (
    <main className="flex flex-col gap-2 p-2">
      <Objectives />
      <Table result={result} />
    </main>
  );
}

function calculate(
  objective: string,
  productsPerSec: number,
  settings: Settings,
  ignoredItems: string[],
  result: CalculationResult = {}
): CalculationResult {
  const item = getItem(objective, settings.mode);
  if (!item) return result;
  const recipe = getRecipe(objective, settings.mode);
  if (!recipe) return result;

  const building = getBuildingForItem(objective, settings);
  const numOfBuildings = calculateBuildings(
    objective,
    productsPerSec,
    settings
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
    calculate(id, perSec * numOfBuildings, settings, ignoredItems, result);
  });

  const selectedBoostId =
    settings.gameSettings.affinitiesBoosts[objective]?.[building.getId()];
  const boost = building
    .getBooster(settings.mode)
    ?.find((v) => v.obj.getId() === selectedBoostId);
  if (boost)
    calculate(
      boost?.obj.getId(),
      boost?.perSec * numOfBuildings,
      settings,
      ignoredItems,
      result
    );

  return result;
}
