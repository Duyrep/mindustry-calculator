"use client";

import { Objectives } from "@/components";
import Table from "@/components/Table";
import { ObjectiveContext } from "@/context/ObjectiveContext";
import { SettingsContext } from "@/context/SettingsContext";
import { getBuildingForItem, getItem, getRecipe } from "@/utils";
import { calculateBuildings } from "@/utils/calculate";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { Settings, CalculationResult } from "@/types";
import Visualize from "./visualize/page";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Home() {
  const [settings] = useContext(SettingsContext).settingsState;
  const [ignoredItems] = useContext(SettingsContext).ignoredItemsState;
  const [mode] = useContext(ObjectiveContext).modeState;
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const [productsPerSec] = useContext(ObjectiveContext).productsPerSecState;
  const [result, setResult] = useState(
    calculate(objective, productsPerSec, settings, ignoredItems)
  );
  const [windowWidth, setWindowWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const visualizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResult(calculate(objective, productsPerSec, settings, ignoredItems));
  }, [objective, productsPerSec, settings, ignoredItems, mode]);

  useEffect(() => {
    const resizeHandle = () => {
      setWindowWidth(window.innerWidth);
    };

    const visualizeHandle = () => {
      if (!divRef.current || !visualizeRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const style = visualizeRef.current.style;
      if (
        rect.y < 100 &&
        visualizeRef.current.getBoundingClientRect().height + 100 <
          window.innerHeight
      ) {
        style.top = window.scrollY - 64 + "px";
        style.position = "absolute";
      } else {
        style.position = "";
        style.width = "";
      }
    };

    resizeHandle();

    window.addEventListener("resize", resizeHandle);
    window.addEventListener("resize", visualizeHandle);
    window.addEventListener("scroll", visualizeHandle);

    return () => {
      window.removeEventListener("resize", resizeHandle);
      window.removeEventListener("resize", visualizeHandle);
      window.removeEventListener("scroll", visualizeHandle);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Objectives />
      {windowWidth < 1280 ? (
        <Table result={result} />
      ) : (
        <PanelGroup direction="horizontal" className="w-full">
          <Panel minSize={1} defaultSize={40}>
            <Table result={result} />
          </Panel>
          <PanelResizeHandle>
            <div className="flex h-full items-center px-1">
              <div className="px-0.5 py-6 rounded-md bg-surface-a20"></div>
            </div>
          </PanelResizeHandle>
          <Panel minSize={1} defaultSize={60} className="relative">
            <div ref={divRef}></div>
            <div ref={visualizeRef} className="h-min w-full">
              <Visualize />
            </div>
          </Panel>
        </PanelGroup>
      )}
    </div>
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
