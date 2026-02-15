import type { ItemDataType } from "@/types/data";

export default class Item {
  private id: string;
  private name: string;
  private group: string;
  private producedBy: string[];
  private image: { row: number; col: number };

  constructor(init: ItemDataType) {
    this.id = init.id;
    this.name = init.name;
    this.group = init.group;
    this.producedBy = init.producedBy;
    this.image = init.image;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getGroup() {
    return this.group;
  }

  public getProducedBy() {
    return this.producedBy;
  }

  public getImage() {
    return this.image;
  }
}
