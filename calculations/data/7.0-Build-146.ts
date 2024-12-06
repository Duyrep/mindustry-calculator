import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitFactoriesEnum, UnitsEnum } from "@/calculations/enums"

type Data = {
  resources: Resources
  units: Units
  factories: Factories
}

type Resources = {
  [key in ResourcesEnum]: { key: (FactoriesEnum | ExtractorsEnum)[] }
}

type Units = {
  [key in UnitsEnum]: {
    key: UnitFactoriesEnum[]
  }
}

type Factories = {
  [key in FactoriesEnum | ExtractorsEnum | UnitFactoriesEnum]: {
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
    [ExtractorsEnum.AirblastDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.CliffCrusher]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ImpulsePump]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.LaserDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.MechanicalDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.MechanicalPump]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.OilExtractor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.PneumaticDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.RotaryPump]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.TurbineCondenser]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.WaterExtractor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.Cultivator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.EruptionDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ImpactDrill]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.LargePlasmaBore]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.PlasmaBore]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ReinforcedPump]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.VentCondenser]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.AdditiveReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.AirFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ExponentialReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.GroundFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MultiplicativeReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.NavalFactory]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TetrativeReconstructor]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.PrimeRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankAssembler]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankFabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankRefabricator]: {
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    }
  },
  units: {
    [UnitsEnum.Aegires]: {
      key: []
    },
    [UnitsEnum.Antumbra]: {
      key: []
    },
    [UnitsEnum.Arkyid]: {
      key: []
    },
    [UnitsEnum.Atrax]: {
      key: []
    },
    [UnitsEnum.Bryde]: {
      key: []
    },
    [UnitsEnum.Corvus]: {
      key: []
    },
    [UnitsEnum.Crawler]: {
      key: []
    },
    [UnitsEnum.Cyerce]: {
      key: []
    },
    [UnitsEnum.Dagger]: {
      key: []
    },
    [UnitsEnum.Eclipse]: {
      key: []
    },
    [UnitsEnum.Flare]: {
      key: []
    },
    [UnitsEnum.Fortress]: {
      key: []
    },
    [UnitsEnum.Horizon]: {
      key: []
    },
    [UnitsEnum.Mace]: {
      key: []
    },
    [UnitsEnum.Mega]: {
      key: []
    },
    [UnitsEnum.Minke]: {
      key: []
    },
    [UnitsEnum.Mono]: {
      key: []
    },
    [UnitsEnum.Navanax]: {
      key: []
    },
    [UnitsEnum.Nova]: {
      key: []
    },
    [UnitsEnum.Oct]: {
      key: []
    },
    [UnitsEnum.Omura]: {
      key: []
    },
    [UnitsEnum.Poly]: {
      key: []
    },
    [UnitsEnum.Pulsar]: {
      key: []
    },
    [UnitsEnum.Quad]: {
      key: []
    },
    [UnitsEnum.Quasar]: {
      key: []
    },
    [UnitsEnum.Reign]: {
      key: []
    },
    [UnitsEnum.Retusa]: {
      key: []
    },
    [UnitsEnum.Risso]: {
      key: []
    },
    [UnitsEnum.Scepter]: {
      key: []
    },
    [UnitsEnum.Sei]: {
      key: []
    },
    [UnitsEnum.Spiroct]: {
      key: []
    },
    [UnitsEnum.Toxopid]: {
      key: []
    },
    [UnitsEnum.Vela]: {
      key: []
    },
    [UnitsEnum.Zenith]: {
      key: []
    },
    [UnitsEnum.Anthicus]: {
      key: []
    },
    [UnitsEnum.Avert]: {
      key: []
    },
    [UnitsEnum.Cleroi]: {
      key: []
    },
    [UnitsEnum.Collaris]: {
      key: []
    },
    [UnitsEnum.Conquer]: {
      key: []
    },
    [UnitsEnum.Disrupt]: {
      key: []
    },
    [UnitsEnum.Elude]: {
      key: []
    },
    [UnitsEnum.Emanate]: {
      key: []
    },
    [UnitsEnum.Evoke]: {
      key: []
    },
    [UnitsEnum.Incite]: {
      key: []
    },
    [UnitsEnum.Locus]: {
      key: []
    },
    [UnitsEnum.Merui]: {
      key: []
    },
    [UnitsEnum.Obviate]: {
      key: []
    },
    [UnitsEnum.Precept]: {
      key: []
    },
    [UnitsEnum.Quell]: {
      key: []
    },
    [UnitsEnum.Stell]: {
      key: []
    },
    [UnitsEnum.Tecta]: {
      key: []
    },
    [UnitsEnum.Vanquish]: {
      key: []
    }
  }
}