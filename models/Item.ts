import { itemData } from "@/types/data";

export default class Item {
  private id: string;
  private name: string;
  private category: string;
  private producedBy: string[];
  private image: { row: number; col: number };

  constructor(init: itemData) {
    this.id = init.id;
    this.name = init.name;
    this.category = init.category;
    this.producedBy = init.producedBy;
    this.image = init.image;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getCategory() {
    return this.category;
  }

  public getProducedBy() {
    return this.producedBy;
  }

  public getImage() {
    return this.image;
  }
}
