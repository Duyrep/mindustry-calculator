import { beaconData } from "@/types/data";

export default class Beacon {
  private id: string;
  private name: string;
  private speed: number;
  private image: { row: number; col: number };

  constructor(init: beaconData) {
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
