export type CalculationResult = Record<
  string,
  {
    productsPerSec: number;
    building: string;
    numOfBuildings: number;
    power?: number;
  }
>;