import { tileData } from "@/types/data";

export default class Tile {
  private id: string;
  private name: string;
  private image: { row: number; col: number };

  constructor(init: tileData) {
    this.id = init.id
    this.name = init.name
    this.image = init.image
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getImage() {
    return this.image;
  }
}
