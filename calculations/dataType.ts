import { ResourcesEnum, FactoriesEnum, ExtractorsEnum, UnitsEnum, UnitFactoriesEnum } from "./enums"

export type Data = {
  resources: Resources
  units: Units
  factories: Factories
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
  [key in FactoriesEnum | ExtractorsEnum | UnitFactoriesEnum]: {
    power: number
    input: {
      resources: Resource[]
    }
    output: {
      resources: Resource[]
    }
    boots?: {
      resources: Resource[]
    }
    unitsInput?: Unit[]
    unitsOutput?: Unit[]
  }
}

type Extractors = {
  power: number
    boots: {
      resources: Resource[]
    }
    input: {
      resources: Resource[]
    },
    output: {
      resources: Resource[]
    }
}

export type Resource = {
  name: ResourcesEnum | UnitsEnum
  perSecond: number
  rate?: number
}

export type Unit = {
  name: UnitsEnum
  perSecond: 1
}