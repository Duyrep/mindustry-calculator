import getBuildingById from "./getBuildingById";
import getItemById from "./getItemById";
import type { GameSettings } from "@/store/GameSettings";

export default function getProducerForItem(itemId: string, settings: GameSettings) {
  return getBuildingById(
    settings.items?.[itemId] ??
      getItemById(itemId).getProducedBy()[0] ??
      "ohno",
  );
}
