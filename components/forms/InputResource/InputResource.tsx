"use client";

import { ClearAllProduction } from "./ClearAllProduction";
import { Item } from "./Item";
import { useGameSettingsStore, useProductionStore } from "@/store";
import { AddProduction } from "./Add";
import { useEffect } from "react";
import { calculateTest } from "@/core/calculate";
import { ProductionTable } from "@/components/results/ProductionTable";
import { ProductionUnit } from "@/enums";

export default function InputResource() {
  const settings = useGameSettingsStore((state) => state.settings);
  const targets = useProductionStore((state) => state.targets);

  useEffect(
    () =>
      console.log(
        "test",
        calculateTest(
          targets.map(({ itemId, values }) => ({
            id: itemId,
            perSec: values[ProductionUnit.PerSec],
          })),
          [],
          settings,
        ),
      ),
    [targets],
  );

  return (
    <div className="p-2 bg-surface-a10 rounded-md min-w-max">
      <div className="flex flex-col gap-1">
        {targets.map((target) => (
          <Item targetId={target.id} key={target.id} />
        ))}

        <div className="flex gap-2">
          <AddProduction />
          <ClearAllProduction />
        </div>
      </div>
    </div>
  );
}
