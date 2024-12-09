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
    key: UnitFactoriesEnum
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
      key: [
        ExtractorsEnum.MechanicalDrill,
        ExtractorsEnum.PneumaticDrill,
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.Pulverizer,
        FactoriesEnum.Disassembler
      ]
    },
    [ResourcesEnum.Silicon]: {
      key: [
        FactoriesEnum.SiliconSmelter,
        FactoriesEnum.SiliconCrucible,
        FactoriesEnum.SiliconArcFurnace
      ]
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
      key: [
        ExtractorsEnum.MechanicalDrill,
        ExtractorsEnum.PneumaticDrill,
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.CoalCentrifuge
      ]
    },
    [ResourcesEnum.Copper]: {
      key: [
        ExtractorsEnum.MechanicalDrill,
        ExtractorsEnum.PneumaticDrill,
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.Separator
      ]
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

  units: {
    [UnitsEnum.Dagger]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Mace]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Fortress]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Scepter]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Reign]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Nova]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Pulsar]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Quasar]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Vela]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Corvus]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Crawler]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Atrax]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Spiroct]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Arkyid]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Toxopid]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Flare]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Horizon]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Zenith]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Antumbra]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Eclipse]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Mono]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Poly]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Mega]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Quad]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Oct]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Risso]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Minke]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Bryde]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Sei]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Omura]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Retusa]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Oxynoe]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Aegires]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Cyerce]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Navanax]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Stell]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Locus]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Precept]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Vanquish]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Conquer]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Merui]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Cleroi]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Anthicus]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Tecta]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Collaris]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Elude]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Avert]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Obviate]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Quell]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Disrupt]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
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
      power: 30,
      input: {
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 3
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 1.5
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Silicon,
            perSecond: 1.5
          }
        ]
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
}