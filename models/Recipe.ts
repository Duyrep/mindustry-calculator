import type { RecipeDataType } from "@/types/data";

export default class Recipe {
  private id: string;
  private buildings: {
    id: string;
    image?: { row: number; col: number };
    input?: { id: string; perSec: number | string }[];
    output: { id: string; perSec: number | string; rate?: number }[];
  }[];
  private image: { row: number; col: number };

  constructor(init: RecipeDataType) {
    this.id = init.id;
    this.buildings = init.buildings;
    this.image = init.image as {
      row: number;
      col: number;
    };
  }

  public getId() {
    return this.id;
  }

  public getImage() {
    return this.image;
  }

  public getInput(building: string) {
    return (
      this.buildings
        .find(({ id }) => id === building)
        ?.input?.map((v) => ({
          ...v,
          perSec:
            typeof v.perSec === "number"
              ? v.perSec
              : Number(v.perSec.split("/")[0]) / Number(v.perSec.split("/")[1]),
        })) ?? []
    );
  }

  public getOutput(building: string) {
    return (
      this.buildings
        .find(({ id }) => id === building)
        ?.output.map((v) => ({
          ...v,
          perSec:
            typeof v.perSec === "number"
              ? v.perSec
              : Number(v.perSec.split("/")[0]) / Number(v.perSec.split("/")[1]),
        })) ?? []
    );
  }
}
