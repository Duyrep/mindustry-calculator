import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitFactoriesEnum, UnitsEnum } from "@/calculations/enums"
import { Data } from "../dataType"

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
      key: [
        FactoriesEnum.PhaseWeaver,
        FactoriesEnum.PhaseSynthesizer
      ]
    },
    [ResourcesEnum.SurgeAlloy]: {
      key: [
        FactoriesEnum.SurgeSmelter,
        FactoriesEnum.SurgeCrucible
      ]
    },
    [ResourcesEnum.Thorium]: {
      key: [
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.Disassembler
      ]
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
      key: [
        FactoriesEnum.CryofluidMixer,
        ExtractorsEnum.MechanicalPump,
        ExtractorsEnum.RotaryPump,
        ExtractorsEnum.ImpulsePump
      ]
    },
    [ResourcesEnum.Lead]: {
      key: [
        ExtractorsEnum.MechanicalDrill,
        ExtractorsEnum.PneumaticDrill,
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.Separator
      ]
    },
    [ResourcesEnum.Metaglass]: {
      key: [
        FactoriesEnum.Kiln
      ]
    },
    [ResourcesEnum.Oil]: {
      key: [
        ExtractorsEnum.MechanicalPump,
        ExtractorsEnum.RotaryPump,
        ExtractorsEnum.ImpulsePump,
        ExtractorsEnum.OilExtractor,
        FactoriesEnum.SporePress
      ]
    },
    [ResourcesEnum.Plastanium]: {
      key: [
        FactoriesEnum.PlastaniumCompressor
      ]
    },
    [ResourcesEnum.Pyratite]: {
      key: [
        FactoriesEnum.PyratiteMixer
      ]
    },
    [ResourcesEnum.Scrap]: {
      key: []
    },
    [ResourcesEnum.SporePod]: {
      key: []
    },
    [ResourcesEnum.Titanium]: {
      key: [
        ExtractorsEnum.PneumaticDrill,
        ExtractorsEnum.LaserDrill,
        ExtractorsEnum.AirblastDrill,
        FactoriesEnum.Separator,
        FactoriesEnum.Disassembler
      ]
    },
    [ResourcesEnum.Water]: {
      key: [
        ExtractorsEnum.MechanicalPump,
        ExtractorsEnum.RotaryPump,
        ExtractorsEnum.ImpulsePump,
        ExtractorsEnum.WaterExtractor
      ]
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
      key: UnitFactoriesEnum.GroundFactory
    },
    [UnitsEnum.Mace]: {
      key: UnitFactoriesEnum.AdditiveReconstructor
    },
    [UnitsEnum.Fortress]: {
      key: UnitFactoriesEnum.MultiplicativeReconstructor
    },
    [UnitsEnum.Scepter]: {
      key: UnitFactoriesEnum.ExponentialReconstructor
    },
    [UnitsEnum.Reign]: {
      key: UnitFactoriesEnum.TetrativeReconstructor
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
      power: 42,
      input: {
        resources: [
          {
            name: ResourcesEnum.Oil,
            perSecond: 1
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Coal,
            perSecond: 2
          }
        ]
      }
    },
    [FactoriesEnum.CryofluidMixer]: {
      power: 60,
      input: {
        resources: [
          {
            name: ResourcesEnum.Titanium,
            perSecond: 0.5
          },
          {
            name: ResourcesEnum.Water,
            perSecond: 12.0
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Cryofluid,
            perSecond: 12.0
          }
        ]
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
      power: 36,
      input: {
        resources: [
          {
            name: ResourcesEnum.Lead,
            perSecond: 2.0
          },
          {
            name: ResourcesEnum.Sand,
            perSecond: 2.0
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Metaglass,
            perSecond: 2.0
          }
        ]
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
      power: 300,
      input: {
        resources: [
          {
            name: ResourcesEnum.Thorium,
            perSecond: 2
          },
          {
            name: ResourcesEnum.Sand,
            perSecond: 5
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.PhaseFabric,
            perSecond: 0.5
          }
        ]
      }
    },
    [FactoriesEnum.PlastaniumCompressor]: {
      power: 180,
      input: {
        resources: [
          {
            name: ResourcesEnum.Titanium,
            perSecond: 2
          },
          {
            name: ResourcesEnum.Oil,
            perSecond: 15
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Plastanium,
            perSecond: 1
          }
        ]
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
      power: 12,
      input: {
        resources: [
          {
            name: ResourcesEnum.Lead,
            perSecond: 1.5
          },
          {
            name: ResourcesEnum.Sand,
            perSecond: 1.5
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 0.75
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Pyratite,
            perSecond: 0.75
          }
        ]
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
      power: 240,
      input: {
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 4
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 2.6
          },
          {
            name: ResourcesEnum.Pyratite,
            perSecond: 0.6
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Silicon,
            perSecond: 5.3
          }
        ]
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
      power: 240,
      input: {
        resources: [
          {
            name: ResourcesEnum.Copper,
            perSecond: 2.4
          },
          {
            name: ResourcesEnum.Lead,
            perSecond: 3.2
          },
          {
            name: ResourcesEnum.Titanium,
            perSecond: 1.6
          },
          {
            name: ResourcesEnum.Silicon,
            perSecond: 2.4
          }
        ]
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.SurgeAlloy,
            perSecond: 0.8
          }
        ]
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
      power: 180,
      input: {
        resources: []
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 3.42
          },
          {
            name: ResourcesEnum.Scrap,
            perSecond: 3.42
          },
          {
            name: ResourcesEnum.Copper,
            perSecond: 2.9
          },
          {
            name: ResourcesEnum.Lead,
            perSecond: 2.9
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 2.52
          },
          {
            name: ResourcesEnum.Titanium,
            perSecond: 2.23
          },
          {
            name: ResourcesEnum.Thorium,
            perSecond: 2.0
          },
        ]
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
      power: 66,
      input: {
        resources: []
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 1.92
          },
          {
            name: ResourcesEnum.Scrap,
            perSecond: 1.92
          },
          {
            name: ResourcesEnum.Copper,
            perSecond: 1.63
          },
          {
            name: ResourcesEnum.Lead,
            perSecond: 1.63
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 1.42
          },
          {
            name: ResourcesEnum.Titanium,
            perSecond: 1.92
          },
          {
            name: ResourcesEnum.Thorium,
            perSecond: 1.12
          }
        ]
      }
    },
    [ExtractorsEnum.MechanicalDrill]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 0.4
          },
          {
            name: ResourcesEnum.Scrap,
            perSecond: 0.4
          },
          {
            name: ResourcesEnum.Copper,
            perSecond: 0.36
          },
          {
            name: ResourcesEnum.Lead,
            perSecond: 0.36
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 0.34
          }
        ]
      }
    },
    [ExtractorsEnum.MechanicalPump]: {
      power: 0,
      input: {
        resources: []
      },
      output: {
        resources: [
          {
            name: ResourcesEnum.Water,
            perSecond: 7.0
          },
          {
            name: ResourcesEnum.Cryofluid,
            perSecond: 7.0
          },
          {
            name: ResourcesEnum.Oil,
            perSecond: 7.0
          }
        ]
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
        resources: [
          {
            name: ResourcesEnum.Sand,
            perSecond: 0.6
          },
          {
            name: ResourcesEnum.Scrap,
            perSecond: 0.6
          },
          {
            name: ResourcesEnum.Copper,
            perSecond: 0.53
          },
          {
            name: ResourcesEnum.Lead,
            perSecond: 0.53
          },
          {
            name: ResourcesEnum.Coal,
            perSecond: 0.47
          },
          {
            name: ResourcesEnum.Titanium,
            perSecond: 0.43
          }
        ]
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
  },

  unitFactories: {
      [UnitFactoriesEnum.AdditiveReconstructor]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.AirFactory]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.ExponentialReconstructor]: {
        power: 780,
        input: {
          resources: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 9.44
            },
            {
              name: ResourcesEnum.Titanium,
              perSecond: 8.33
            },
            {
              name: ResourcesEnum.Plastanium,
              perSecond: 7.22
            },
            {
              name: ResourcesEnum.Cryofluid,
              perSecond: 60.0
            }
          ],
          units: []
        },
        output: {
          resources: [
            {
              name: UnitsEnum.Scepter,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Vela,
              perSecond: 1.0
            },

            {
              name: UnitsEnum.Arkyid,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Antumbra,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Sei,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Aegires,
              perSecond: 1.0
            }
          ]
        }
      },
      [UnitFactoriesEnum.GroundFactory]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.MultiplicativeReconstructor]: {
        power: 360,
        input: {
          resources: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 4.33
            },
            {
              name: ResourcesEnum.Titanium,
              perSecond: 2.67
            },
            {
              name: ResourcesEnum.Metaglass,
              perSecond: 1.33
            }
          ],
          units: []
        },
        output: {
          resources: [
            {
              name: UnitsEnum.Fortress,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Quasar,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Spiroct,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Zenith,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Mega,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Bryde,
              perSecond: 1.0
            },
            {
              name: UnitsEnum.Cyerce,
              perSecond: 1.0
            }
          ]
        }
      },
      [UnitFactoriesEnum.NavalFactory]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.TetrativeReconstructor]: {
        power: 1500,
        input: {
          resources: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 4.17
            },
            {
              name: ResourcesEnum.Plastanium,
              perSecond: 2.5
            },
            {
              name: ResourcesEnum.SurgeAlloy,
              perSecond: 4.17
            },
            {
              name: ResourcesEnum.PhaseFabric,
              perSecond: 1.46
            },
            {
              name: ResourcesEnum.Cryofluid,
              perSecond: 180.0
            }
          ],
          units: []
        },
        output: {
          resources: [
            {
              name: UnitsEnum.Reign,
              perSecond: 1.0
            }
          ]
        }
      },
      [UnitFactoriesEnum.MechAssembler]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.MechFabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.MechRefabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.PrimeRefabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.ShipAssembler]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.ShipFabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.ShipRefabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.TankAssembler]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.TankFabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      },
      [UnitFactoriesEnum.TankRefabricator]: {
        power: 0,
        input: {
          resources: [],
          units: []
        },
        output: {
          resources: []
        }
      }
    }
}