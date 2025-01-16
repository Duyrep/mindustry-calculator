import { BuildingsEnum, BuildingTypes, ResourcesEnum, TilesEnum, UnitsEnum } from "./enums"

export type Data = {
    products: Products,
    buildings: { [key in BuildingsEnum]: Buildings }
}

export type Products = {
    [key in ResourcesEnum]: {
        key: BuildingsEnum[]
    }
}

export type Buildings = {
    type: BuildingTypes,
    power: number,
    input?: InputOutputBuilding[] | InputOutputBuildingUint[],
    output: InputOutputBuilding[] | InputOutputBuildingUint[] | UnitsEnum[],
    affinities?: Affinities,
    booster?: Booster[]
    speedBoost?: number
}

export type Affinities = {
    titles?: AffinitieTiles[]
}

export type AffinitieTiles = {
    name: TilesEnum,
    productivity: number
}

export type Booster = {
    name: ResourcesEnum,
    perSecond: number,
    speedBoost: number
}

export type InputOutputBuilding = {
    name: ResourcesEnum,
    perSecond: number,
    rate?: number
}

export type InputOutputBuildingUint = {
    unit: UnitsEnum,
    cost?: {
        name: ResourcesEnum,
        perSecond: number
    }[],
    productionTime: number
}