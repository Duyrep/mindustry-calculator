"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BoxlineFixed from "./boxline/BoxlineFixed";
import BoxlineFlow from "./boxline/BoxlineFlow";
import { Settings } from "@/types";
import { ObjectiveContext } from "@/contexts/ObjectiveContext";
import { SettingsContext } from "@/contexts/SettingsContext";
import { getBuildingForItem, getItem, getRecipe } from "@/utils";
import Objectives from "@/components/Objectives";
import { calculateBuildings } from "@/utils/calculate";
import { VisualizeEdgeData, VisualizeNodeData } from "./boxline/graphLayout";
import { ReactFlowProvider } from "@xyflow/react";

export default function Visualize() {
  const { t } = useTranslation();
  const [objective] = useContext(ObjectiveContext).objectiveState;
  const [productsPerSec] = useContext(ObjectiveContext).productsPerSecState;
  const [settings] = useContext(SettingsContext).settingsState;
  const [mode, setMode] = useState<"fixed" | "flow">("flow");
  const [direction, setDirection] = useState<"TB" | "LR">("LR");
  const [result, setResult] = useState<{
    result: VisualizeResult;
    specialNodeLabels: string[];
  }>({ result: {}, specialNodeLabels: [] });
  const [nodes, setNodes] = useState<
    { id: string; data: VisualizeNodeData & Record<string, unknown> }[]
  >([]);
  const [edges, setEdges] = useState<
    {
      source: string;
      target: string;
      data: VisualizeEdgeData & Record<string, unknown>;
    }[]
  >([]);
  const graphContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(result);
    setNodes(
      Object.entries(result.result).map(([k, v]) => ({
        id: k,
        data: {
          productName: v.productName,
          buildingName: v.building,
          numOfBuildings: v.numOfBuildings,
          image: v.image,
        },
      }))
    );
    setEdges(
      Object.entries(result.result)
        .map(([k, v]) =>
          Object.values(v.to).map(({ id, productName, productsPerSec }) => ({
            source: k,
            target: id,
            data: {
              productName,
              products: productsPerSec,
              image: v.image,
            },
          }))
        )
        .reduce((acc, curr) => acc.concat(curr), [])
    );
  }, [result]);

  useEffect(() => {
    console.log(nodes, edges);
  }, [nodes, edges]);

  useEffect(() => {
    setResult(calculate(objective, productsPerSec, settings));
  }, [objective, productsPerSec, settings, direction]);

  useEffect(() => {
    const resizeHandle = () => {
      if (!graphContainer.current) return;
      const style = graphContainer.current.style;
      if (window.innerWidth > window.innerHeight) {
        graphContainer.current.style.width =
          innerHeight * (16 / 9) - 180 + "px";
      } else {
        style.width = "100%";
      }
    };

    window.addEventListener("resize", resizeHandle, true);

    return () => window.removeEventListener("resize", resizeHandle, true);
  }, []);

  return (
    <main className="flex flex-col gap-2 p-2">
      <Objectives />
      <div className="flex flex-col flex-wrap bg-surface-a10 rounded-md p-2 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {t("Mode")}:
          <button
            className={`py-1 px-3 rounded-md duration-200 ${
              mode === "flow"
                ? "bg-primary text-background"
                : "hover:bg-surface-a30 bg-surface-a20"
            }`}
            onClick={() => setMode((prev) => (prev === "flow" ? prev : "flow"))}
          >
            {t("Flow")}
          </button>
          <button
            className={`py-1 px-3 rounded-md duration-200 ${
              mode === "fixed"
                ? "bg-primary text-background"
                : "hover:bg-surface-a30 bg-surface-a20"
            }`}
            onClick={() =>
              setMode((prev) => (prev === "fixed" ? prev : "fixed"))
            }
          >
            {t("Fixed")}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {t("Direction")}:
          <button
            className={`py-1 px-3 rounded-md duration-200 ${
              direction === "LR"
                ? "bg-primary text-background"
                : "hover:bg-surface-a30 bg-surface-a20"
            }`}
            onClick={() =>
              setDirection((prev) => (prev === "LR" ? prev : "LR"))
            }
          >
            {t("Left to right")}
          </button>
          <button
            className={`py-1 px-3 rounded-md duration-200 ${
              direction === "TB"
                ? "bg-primary text-background"
                : "hover:bg-surface-a30 bg-surface-a20"
            }`}
            onClick={() =>
              setDirection((prev) => (prev === "TB" ? prev : "TB"))
            }
          >
            {t("Top to bottom")}
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div ref={graphContainer} className="w-full">
          {mode === "fixed" ? (
            <div className="w-full aspect-video border border-surface-a30 rounded-md relative">
              <BoxlineFixed
                nodes={nodes}
                edges={edges}
                direction={direction}
                specialNodeLabels={result.specialNodeLabels}
              />
            </div>
          ) : (
            <div className="w-full aspect-video border border-surface-a30 rounded-md">
              <ReactFlowProvider>
                <BoxlineFlow
                  nodes={nodes}
                  edges={edges}
                  direction={direction}
                  specialNodeLabels={result.specialNodeLabels}
                />
              </ReactFlowProvider>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

type VisualizeResult = Record<
  string,
  {
    image: {
      row: number;
      col: number;
    };
    productName: string;
    building: string;
    numOfBuildings: number;
    to: Record<
      string,
      {
        id: string;
        productName: string;
        productsPerSec: number;
      }
    >;
  }
>;

function calculate(
  objective: string,
  productsPerSec: number,
  settings: Settings,
  result: { result: VisualizeResult; specialNodeLabels: string[] } = {
    result: {},
    specialNodeLabels: ["output"],
  },
  to: string = "output"
): { result: VisualizeResult; specialNodeLabels: string[] } {
  const item = getItem(objective, settings.mode);
  const building = getBuildingForItem(item.getId(), settings);
  const recipe = getRecipe(objective, settings.mode);
  const numOfBuildings = calculateBuildings(
    objective,
    productsPerSec,
    settings
  );
  const nodeName =
    building.getId() +
    (recipe.getOutput(building.getId()).length > 1 ? "" : " " + objective);

  if (result.result[nodeName]) {
    result.result[nodeName].numOfBuildings += numOfBuildings;
    if (result.result[nodeName].to[to + " " + objective]) {
      result.result[nodeName].to[to + " " + objective].productsPerSec +=
        productsPerSec;
    } else {
      result.result[nodeName].to[to + " " + objective] = {
        id: to,
        productName: objective,
        productsPerSec: productsPerSec,
      };
    }
  } else {
    result.result[nodeName] = {
      image: recipe.getImage(),
      productName: objective,
      building: building.getId(),
      numOfBuildings: numOfBuildings,
      to: {
        [to + " " + objective]: {
          id: to,
          productName: objective,
          productsPerSec: productsPerSec,
        },
      },
    };
  }

  recipe.getInput(building.getId()).forEach(({ id, perSec }) => {
    calculate(id, perSec * numOfBuildings, settings, result, nodeName);
  });

  if (recipe.getOutput(building.getId()).length > 1) {
    if (!result.specialNodeLabels.includes("surplus"))
      result.specialNodeLabels.push("surplus");
    recipe.getOutput(building.getId()).forEach(({ id, perSec }) => {
      if (id !== objective) {
        if (result.result[nodeName].to["surplus " + id]) {
          result.result[nodeName].to["surplus " + id].productsPerSec +=
            numOfBuildings * perSec;
        } else {
          result.result[nodeName].to["surplus " + id] = {
            id: "surplus",
            productName: id,
            productsPerSec: numOfBuildings * perSec,
          };
        }
      }
    });
  }

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
      result,
      nodeName
    );

  return result;
}
