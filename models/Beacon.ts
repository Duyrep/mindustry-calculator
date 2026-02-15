import type { BeaconDataType } from "@/types";

export default class Beacon {
  private id: string;
  private name: string;
  private speed: number;
  private image: { row: number; col: number };

  constructor(init: BeaconDataType) {
    this.id = init.id;
    this.name = init.name;
    this.speed = init.speed;
    this.image = init.image;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getSpeed() {
    return this.speed;
  }

  public getImage() {
    return this.image;
  }

}
