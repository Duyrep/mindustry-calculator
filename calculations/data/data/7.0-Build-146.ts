import { ExtractorsEnum, FactoriesEnum, ResourcesEnum } from "@/calculations/enums"

type Data = {
  resources: Resources
  factories: Factories
}

type Resources = {
  [key in ResourcesEnum]: { key: (FactoriesEnum | ExtractorsEnum)[] }
}

type Factories = {
  [key in FactoriesEnum]: {
    input: {
      resources: ResourceInput[]
    },
    output: {
      resources: ResourceInput[]
    }
  }
}

type ResourceInput = {
  name: ResourcesEnum
  perSecond: number
}

export const data: Data = {
  resources: {
    [ResourcesEnum.Graphite]: {
      key: []
    },
    [ResourcesEnum.Sand]: {
      key: []
    },
    [ResourcesEnum.Silicon]: {
      key: []
    },
    [ResourcesEnum.PhaseFabric]: {
      key: []
    },
    [ResourcesEnum.SurgeAlloy]: {
      key: []
    },
    [ResourcesEnum.Thorium]: {
      key: []
    },
    [ResourcesEnum.Slag]: {
      key: []
    },
    [ResourcesEnum.BlastCompound]: {
      key: [
        FactoriesEnum.BlastMixer
      ]
    },
    [ResourcesEnum.Coal]: {
      key: []
    },
    [ResourcesEnum.Copper]: {
      key: []
    },
    [ResourcesEnum.Cryofluid]: {
      key: []
    },
    [ResourcesEnum.Lead]: {
      key: []
    },
    [ResourcesEnum.Metaglass]: {
      key: []
    },
    [ResourcesEnum.Oil]: {
      key: []
    },
    [ResourcesEnum.Plastanium]: {
      key: []
    },
    [ResourcesEnum.Pyratite]: {
      key: []
    },
    [ResourcesEnum.Scrap]: {
      key: []
    },
    [ResourcesEnum.SporePod]: {
      key: []
    },
    [ResourcesEnum.Titanium]: {
      key: []
    },
    [ResourcesEnum.Water]: {
      key: []
    },
    [ResourcesEnum.Arkycite]: {
      key: []
    },
    [ResourcesEnum.Beryllium]: {
      key: []
    },
    [ResourcesEnum.Carbide]: {
      key: []
    },
    [ResourcesEnum.Cyanogen]: {
      key: []
    },
    [ResourcesEnum.Hydrogen]: {
      key: []
    },
    [ResourcesEnum.Neoplasm]: {
      key: []
    },
    [ResourcesEnum.Nitrogen]: {
      key: []
    },
    [ResourcesEnum.Oxide]: {
      key: []
    },
    [ResourcesEnum.Ozone]: {
      key: []
    },
    [ResourcesEnum.Tungsten]: {
      key: []
    }
  },

  factories: {
    [FactoriesEnum.BlastMixer]: {
      input: {
        resources: [
          {
            name: ResourcesEnum.Pyratite,
            perSecond: 0.75
          },
          {
            name: ResourcesEnum.SporePod,
            perSecond: 0.75
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.BlastCompound,
            perSecond: 0.75
          }
        ]
      }
    },
    [FactoriesEnum.CoalCentrifuge]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CryofluidMixer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Disassembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.GraphitePress]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Kiln]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Melter]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MultiPress]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseWeaver]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PlastaniumCompressor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Pulverizer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PyratiteMixer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Separator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconCrucible]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconSmelter]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SporePress]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SurgeSmelter]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.AdditiveReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.AirFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ExponentialReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.GroundFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MultiplicativeReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.NavalFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.TetrativeReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.AtmosphericConcentrator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CarbideCrucible]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CyanogenSynthesizer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Electrolyzer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.OxidationChamber]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseSynthesizer]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconArcFurnace]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SlagIncinerator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SurgeCrucible]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ElectricHeater]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.HeatRedirector]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.HeatRouter]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseHeater]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SlagHeater]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MechAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MechFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MechRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PrimeRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ShipAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ShipFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ShipRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.TankAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.TankFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.TankRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    }
  }
}