import { beltData } from "@/types/data";

export default class Belt {
  private id: string;
  private name: string;
  private speed: number;
  private image: { row: number; col: number };

  constructor(init: beltData) {
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
