export * from "./settings";
export * from "./calculate";

export type ColumnSettingsType = {
  belts: boolean;
  affinities: boolean;
  boosts: boolean;
  beacons: boolean;
  power: boolean;
  links: boolean;
};

export type VisualizeSettingsType = {
  type: "boxline" | "sankey"
  mode: "flow" | "fixed";
  direction: "LR" | "TB";
};
