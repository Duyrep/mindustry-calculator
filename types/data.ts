export type Data = {
  items: itemData[];
  belts: beltData[];
  buildings: buildingData[];
  beacons: beaconData[];
  tiles: tileData[]
  recipes: recipeData[];
};

export type itemData = {
  id: string;
  name: string;
  category: string;
  image: { row: number; col: number };
  producedBy: string[];
};

export type beltData = {
  id: string;
  name: string;
  speed: number;
  image: { row: number; col: number };
};

export type buildingData = {
  id: string;
  name: string;
  power?: number;
  image: { row: number; col: number };
  requiredTiles?: {id: string; efficiency: number }[]
  optionalEnhancements?: {
    booster?: { id: string; speed: number; perSec: number }[];
    affinities?: { id: string; efficiency: number }[];
  };
};

export type beaconData = {
  id: string;
  name: string;
  speed: number;
  image: { row: number; col: number };
};

export type tileData = {
  id: string;
  name: string;
  image: { row: number; col: number };
}

export type recipeData = {
  id: string;
  image?: { row: number; col: number };
  buildings: {
    id: string;
    image?: { row: number; col: number };
    input?: { id: string; perSec: number | string }[];
    output: { id: string; perSec: number | string }[];
  }[];
};
