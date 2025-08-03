import serpuloData from "@/public/data/vanilla-serpulo-v8.json";
import erekirData from "@/public/data/vanilla-erekir-v8.json";
import Item from "@/models/Item";
import { Data } from "@/types/data";
import Recipe from "@/models/Recipe";
import Building from "@/models/Building";
import Belt from "@/models/Belt";
import Beacon from "@/models/Beacon";
import Tile from "@/models/Tile";

export function getData(mode: string): Data | undefined {
  if (mode.toLowerCase() === "serpulo") return serpuloData;
  else if (mode.toLowerCase() === "erekir") return erekirData;
  else return undefined;
}

export function getItem(id: string, mode: string) {
  const d = getData(mode)?.items.find((v) => v.id === id);
  return new Item({
    id: d?.id ?? "oh no",
    name: d?.name ?? "Oh no",
    category: d?.category ?? "ohno",
    producedBy: d?.producedBy ?? [],
    image: d?.image ?? { row: 0, col: 0 },
  });
}

export function getItems(mode: string) {
  return getData(mode)?.items.map((v) => getItem(v.id, mode)) ?? [];
}

export function getItemByName(name: string, mode: string) {
  const d = getData(mode)?.items.find((v) => v.name === name);
  return getItem(d?.id ?? "", mode)
}

export function getItemIDsByCategory(mode: string) {
  const itemsByCategory = {} as Record<string, string[]>;
  getData(mode)?.items?.forEach(({ id, category }) => {
    if (itemsByCategory[category]) {
      itemsByCategory[category].push(id);
    } else {
      itemsByCategory[category] = [id];
    }
  });
  return itemsByCategory;
}

export function getItemNames(mode: string) {
  return (
    getData(mode)?.items.map(({ id }) => getItem(id, mode).getName()) ?? []
  );
}

export function getBelt(id: string, mode: string) {
  const d = getData(mode)?.belts.find((v) => v.id === id);
  return new Belt({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    speed: d?.speed ?? NaN,
    image: d?.image ?? { row: 0, col: 0 },
    transportType: d?.transportType ?? "ohno"
  });
}

export function getBelts(mode: string) {
  return getData(mode)?.belts.map((d) => getBelt(d.id, mode)) ?? [];
}

export function getBuilding(id: string, mode: string) {
  const d = getData(mode)?.buildings.find((v) => v.id === id);
  return new Building({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    image: d?.image ?? { row: 0, col: 0 },
    power: d?.power,
    requiredTiles: d?.requiredTiles,
    optionalEnhancements: d?.optionalEnhancements,
  });
}

export function getBuildings(mode: string) {
  return getData(mode)?.buildings.map((d) => getBuilding(d.id, mode)) ?? [];
}

export function getBeacon(id: string, mode: string) {
  const d = getData(mode)?.beacons.find((v) => v.id === id);
  return new Beacon({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    speed: d?.speed ?? 0,
    image: d?.image ?? { row: 0, col: 0 },
  });
}

export function getBeacons(mode: string) {
  return getData(mode)?.beacons.map((v) => getBeacon(v.id, mode)) ?? [];
}

export function getTile(id: string, mode: string) {
  const d = getData(mode)?.tiles.find((v) => v.id === id);
  return new Tile({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    image: d?.image ?? { row: 0, col: 0 },
  });
}

export function getTiles(mode: string) {
  return getData(mode)?.tiles.map((d) => getTile(d.id, mode)) ?? [];
}

export function getRecipe(id: string, mode: string) {
  const d = getData(mode)?.recipes.find((v) => v.id === id);
  return new Recipe({
    id: d?.id ?? "ohno",
    buildings: d?.buildings ?? [],
    image: d?.image ?? getItem(d?.id ?? "ohno", mode).getImage(),
  });
}

export function getRecipes(mode: string) {
  return getData(mode)?.recipes.map((d) => getRecipe(d.id, mode)) ?? [];
}
