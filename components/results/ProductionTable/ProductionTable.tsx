"use client";

import { useCalculationResults } from "@/hooks";
import { twMerge } from "tailwind-merge";
import ItemCol from "./ItemCol";
import BuildingCol from "./BuildingCol";
import PowerCol from "./PowerCol";
import { useEffect } from "react";
import { useGameSettingsStore } from "@/store";
import TableSettings from "./TableSettings";
import BeltCol from "./BeltCol";
import AffinitiesCol from "./AffinitiesCol";
import BoostsCol from "./BoostsCol";

export function ProductionTable() {
  const results = useCalculationResults();
  const settings = useGameSettingsStore((state) => state.settings);

  useEffect(() => console.log(settings), [settings]);

  return (
    <div className="bg-surface-a10 rounded-md w-full whitespace-nowrap">
      <TableSettings />
      <table>
        <thead>
          <tr>
            {["Items/s", "Buildings", "Belts", "Affinities", "Boosts", "Power"].map(
              (label) => (
                <th key={label}>
                  <div className={twMerge("p-2 border-b border-surface-a20")}>
                    {label ?? <>&nbsp;</>}
                  </div>
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([itemId]) => {
            return (
              <tr key={itemId}>
                <ItemCol itemId={itemId} />
                <BuildingCol itemId={itemId} />
                <BeltCol itemId={itemId} />
                <AffinitiesCol itemId={itemId} />
                <BoostsCol itemId={itemId} />
                <PowerCol itemId={itemId} />
              </tr>
            );
          })}
          <tr className="text-sm">
            <td colSpan={2} className="text-right">
              <b>Total Power:&nbsp;</b>
            </td>
            <td>
              <b className="px-4">
                {
                  +Object.values(results)
                    .reduce((power, result) => power + (result.power ?? 0), 0)
                    .toFixed(3)
                }
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
