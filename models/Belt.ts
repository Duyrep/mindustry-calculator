import type { BeltDataType } from "@/types";

export default class Belt {
  private id: string;
  private name: string;
  private speed: number;
  private image: { row: number; col: number };
  private transportType: string;

  constructor(init: BeltDataType) {
    this.id = init.id;
    this.name = init.name;
    this.speed = init.speed;
    this.image = init.image;
    this.transportType = init.transportType;
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

  public getTransportType() {
    return this.transportType;
  }

  public getImage() {
    return this.image;
  }
}
