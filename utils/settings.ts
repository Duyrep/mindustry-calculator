import { GameSettings, Settings } from "@/types/settings";
import { getBelts, getBuilding, getItem, getItems } from "./data";

export function getDefaultSettings(): Settings {
  return {
    theme: "dark",
    mode: "serpulo",
    displayRate: "second",
    lang: "en",
    gameSettings: getDefaultGameSettings("serpulo"),
  };
}

export function getDefaultGameSettings(mode: string): GameSettings {
  return {
    items: Object.fromEntries(
      getItems(mode)
        .map((item) => [
          item.getId(),
          item.getProducedBy().length > 1 && item.getProducedBy()[0],
        ])
        .filter(([k, v]) => k && v)
    ),
    belts: Object.fromEntries(
      getItems(mode)
        .map((item) => [item.getId(), getBelts(mode)[0]?.getId()])
        .filter(([k, v]) => k && v)
    ),
    beacons: {},
    affinitiesBoosts: Object.fromEntries(
      getItems(mode)
        .map((item) => [item.getId(), Object.fromEntries(item.getProducedBy().map(buildingId => {
          const building = getBuilding(buildingId, mode)
          return [[building.getId()], building.getAffinities()[0]?.id]
        }).filter(([,v]) => v))])
        .filter(([k, v]) => k && Object.keys(v).length > 0)
    )
  };
}

export function getBuildingForItem(itemId: string, settings: Settings) {
  return getBuilding(
    settings.gameSettings.items?.[itemId] ??
    getItem(itemId, settings.mode).getProducedBy()[0] ??
    "ohno"
  , settings.mode);
}
