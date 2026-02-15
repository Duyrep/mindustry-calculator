export type GameDataType = {
  image: string;
  items: ItemDataType[];
  belts: BeltDataType[];
  buildings: BuildingDataType[];
  beacons: BeaconDataType[];
  tiles: TileDataType[];
  recipes: RecipeDataType[];
};

export type ItemDataType = {
  id: string;
  name: string;
  group: string;
  image: { row: number; col: number };
  producedBy: string[];
};

export type BeltDataType = {
  id: string;
  name: string;
  speed: number;
  image: { row: number; col: number };
  transportType: string;
};

export type BuildingDataType = {
  id: string;
  name: string;
  power?: number;
  image: { row: number; col: number };
  requiredTiles?: { id: string; efficiency: number }[];
  optionalEnhancements?: {
    booster?: { id: string; speed: number; perSec: number }[];
    affinities?: { id: string; efficiency: number }[];
  };
};

export type BeaconDataType = {
  id: string;
  name: string;
  speed: number;
  image: { row: number; col: number };
};

export type TileDataType = {
  id: string;
  name: string;
  image: { row: number; col: number };
};

export type RecipeDataType = {
  id: string;
  image?: { row: number; col: number };
  buildings: {
    id: string;
    image?: { row: number; col: number };
    input?: { id: string; perSec: number | string }[];
    output: { id: string; perSec: number | string; rate?: number }[];
  }[];
};
