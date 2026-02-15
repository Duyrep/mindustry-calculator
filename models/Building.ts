import type { BuildingDataType } from "@/types";
import type Item from "./Item";
import { getItemById } from "@/game";
import { Tile } from ".";
import { getTileById } from "@/game";

export default class Building {
  private id: string;
  private name: string;
  private power?: number;
  private image: { row: number; col: number };
  private requiredTiles?: {
    id: string;
    efficiency: number;
  }[];
  private optionalEnhancements?: {
    booster?: {
      id: string;
      speed: number;
      perSec: number;
    }[];
    affinities?: {
      id: string;
      efficiency: number;
    }[];
  };

  constructor(init: BuildingDataType) {
    this.id = init.id;
    this.name = init.name;
    this.power = init.power;
    this.image = init.image;
    this.requiredTiles = init.requiredTiles;
    this.optionalEnhancements = init.optionalEnhancements;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getPower() {
    return this.power;
  }

  public getImage() {
    return this.image;
  }

  public getRequiredTiles() {
    return this.requiredTiles;
  }

  public getOptionalEnhancements() {
    return this.optionalEnhancements;
  }

  public getBooster(
    mode: string,
  ): { obj: Item; speed: number; perSec: number }[];
  public getBooster(): {
    id: string;
    speed: number;
    perSec: number;
  }[];
  public getBooster(mode?: string) {
    return mode
      ? (this.optionalEnhancements?.booster?.map(({ id, speed, perSec }) => ({
          obj: getItemById(id),
          speed,
          perSec,
        })) ?? [])
      : (this.optionalEnhancements?.booster ?? []);
  }

  public getAffinities(mode: string): { obj: Tile; efficiency: number }[];
  public getAffinities(): {
    id: string;
    efficiency: number;
  }[];
  public getAffinities(mode?: string) {
    return mode
      ? (this.optionalEnhancements?.affinities?.map(({ id, efficiency }) => ({
          obj: getTileById(id),
          efficiency,
        })) ?? [])
      : (this.optionalEnhancements?.affinities ?? []);
  }
}
