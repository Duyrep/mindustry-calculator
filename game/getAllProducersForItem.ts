import getItemById from "./getItemById";
import getBuildingById from "./getBuildingById";

export default function getAllProducersForItem(itemId: string) {
  const item = getItemById(itemId);
  return item.getProducedBy().map((building) => getBuildingById(building));
}
