import calculate, { calculateTest } from "@/core/calculate";
import { ProductionUnit } from "@/enums";
import { useGameSettingsStore, useProductionStore } from "@/store";
import { useMemo } from "react";

export default function useCalculationResults() {
  const ignores = useProductionStore(state => state.ignores)
  const settings = useGameSettingsStore((state) => state.settings);
  const targets = useProductionStore((state) => state.targets);

  const results = useMemo(() => {
    if (targets.length === 0) return {};
    return calculateTest(
      targets.map(({ itemId, values }) => ({
        id: itemId,
        perSec: values[ProductionUnit.PerSec],
      })),
      ignores,
      settings,
    );
  }, [targets, settings, ignores]);

  return results;
}
