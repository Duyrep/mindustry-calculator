export type Settings = {
  theme: "dark" | "light";
  mode: string;
  displayRate: "second" | "minute" | "hour";
  lang: string;
  gameSettings: GameSettings;
};

export type GameSettings = {
  items: Record<string, string>;
  belts: Record<string, string>;
  beacons: Record<string, string | null>;
  affinitiesBoosts: Record<string, Record<string, string | null>>;
};
