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
    power: number
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
      power: 24,
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
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CryofluidMixer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Disassembler]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.GraphitePress]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Kiln]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Melter]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.MultiPress]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseWeaver]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PlastaniumCompressor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Pulverizer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PyratiteMixer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Separator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconCrucible]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconSmelter]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SporePress]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SurgeSmelter]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.AtmosphericConcentrator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CarbideCrucible]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.CyanogenSynthesizer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.Electrolyzer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.OxidationChamber]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseSynthesizer]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SiliconArcFurnace]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SlagIncinerator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SurgeCrucible]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.ElectricHeater]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.HeatRedirector]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.HeatRouter]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.PhaseHeater]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [FactoriesEnum.SlagHeater]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.AirblastDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.CliffCrusher]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ImpulsePump]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.LaserDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.MechanicalDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.MechanicalPump]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.OilExtractor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.PneumaticDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.RotaryPump]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.TurbineCondenser]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.WaterExtractor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.Cultivator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.EruptionDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ImpactDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.LargePlasmaBore]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.PlasmaBore]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.ReinforcedPump]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [ExtractorsEnum.VentCondenser]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.AdditiveReconstructor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.AirFactory]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ExponentialReconstructor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.GroundFactory]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MultiplicativeReconstructor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.NavalFactory]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TetrativeReconstructor]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechAssembler]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechFabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.MechRefabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.PrimeRefabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipAssembler]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipFabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.ShipRefabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankAssembler]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankFabricator]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: []
      }
    },
    [UnitFactoriesEnum.TankRefabricator]: {
      power: 0,
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