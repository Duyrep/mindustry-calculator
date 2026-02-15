import { useGameDataStore } from "@/store";
import { Recipe } from "@/models";
import getItemById from "./getItemById";

export default function getRecipeById(id: string) {
  const { getGameData } = useGameDataStore.getState();
  const d = getGameData()?.recipes.find((v) => v.id === id);
  return new Recipe({
    id: d?.id ?? "ohno",
    buildings: d?.buildings ?? [],
    image: d?.image ?? getItemById(d?.id ?? "ohno").getImage(),
  });
}