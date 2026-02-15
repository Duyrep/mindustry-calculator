import { getBuildingById } from "@/game";
import { useCalculationResults } from "@/hooks";

export default function PowerCol({ itemId }: { itemId: string }) {
  const results = useCalculationResults();
  const result = results[itemId];
  const building = getBuildingById(result.building);

  return (
    <td className="px-4 text-sm border-b border-surface-a20 text-right">
      {building.getPower()
        ? +((building.getPower() ?? 0) * result.numOfBuildings).toFixed(1)
        : ""}
    </td>
  );
}
