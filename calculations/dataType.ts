import { ResourcesEnum, FactoriesEnum, ExtractorsEnum, UnitsEnum, UnitFactoriesEnum } from "./enums"

export type Data = {
  resources: Resources
  units: Units
  factories: Factories
  unitFactories: UnitFactories
}

export type Resources = {
  [key in ResourcesEnum]: { key: (FactoriesEnum | ExtractorsEnum)[] }
}

export type Units = {
  [key in UnitsEnum]: {
    key: UnitFactoriesEnum
  }
}

export type Factories = {
  [key in FactoriesEnum | ExtractorsEnum]: {
    power: number
    input: {
      resources: Resource[]
    },
    output: {
      resources: Resource[]
    }
  }
}

export type UnitFactories = {
  [key in UnitFactoriesEnum]: {
    power: number
    input: {
      units: UnitsInput[]
      resources: Resource[]
    },
    output: {
      resources: Resource[]
    }
  }
}

export type Resource = {
  name: ResourcesEnum | UnitsEnum
  perSecond: number
}

export type UnitsInput = {
  name: UnitsEnum
  perSecond: 1
}