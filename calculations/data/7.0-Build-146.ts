import { Data } from "../dataTypes";
import { BuildingsEnum, BuildingTypes, ResourcesEnum, TilesEnum, UnitsEnum } from "../enums";

export const data: Data = {
  products: {
    [ResourcesEnum.Copper]: {
      key: [
        BuildingsEnum.MechanicalDrill,
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.Separator
      ]
    },
    [ResourcesEnum.Lead]: {
      key: [
        BuildingsEnum.MechanicalDrill,
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.Separator
      ]
    },
    [ResourcesEnum.Coal]: {
      key: [
        BuildingsEnum.MechanicalDrill,
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.CoalCentrifuge
      ]
    },
    [ResourcesEnum.Sand]: {
      key: [
        BuildingsEnum.MechanicalDrill,
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.Pulverizer,
        BuildingsEnum.Disassembler
      ]
    },
    [ResourcesEnum.Scrap]: {
      key: [
        BuildingsEnum.MechanicalDrill,
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill
      ]
    },
    [ResourcesEnum.Titanium]: {
      key: [
        BuildingsEnum.PneumaticDrill,
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.Separator,
        BuildingsEnum.Disassembler
      ]
    },
    [ResourcesEnum.Thorium]: {
      key: [
        BuildingsEnum.LaserDrill,
        BuildingsEnum.AirblastDrill,
        BuildingsEnum.Disassembler
      ]
    },
    [ResourcesEnum.Graphite]: {
      key: [
        BuildingsEnum.GraphitePress,
        BuildingsEnum.MultiPress,
        BuildingsEnum.Separator,
        BuildingsEnum.Disassembler
      ]
    },
    [ResourcesEnum.Silicon]: {
      key: [
        BuildingsEnum.SiliconSmelter,
        BuildingsEnum.SiliconCrucible
      ]
    },
    [ResourcesEnum.PhaseFabric]: {
      key: [
        BuildingsEnum.PhaseWeaver
      ]
    },
    [ResourcesEnum.SurgeAlloy]: {
      key: [
        BuildingsEnum.SurgeSmelter
      ]
    },
    [ResourcesEnum.BlastCompound]: {
      key: [
        BuildingsEnum.BlastMixer
      ]
    },
    [ResourcesEnum.Metaglass]: {
      key: [
        BuildingsEnum.Kiln
      ]
    },
    [ResourcesEnum.Plastanium]: {
      key: [
        BuildingsEnum.PlastaniumCompressor
      ]
    },
    [ResourcesEnum.Pyratite]: {
      key: [
        BuildingsEnum.PyratiteMixer
      ]
    },
    [ResourcesEnum.SporePod]: {
      key: [
        BuildingsEnum.Cultivator
      ]
    },
    [ResourcesEnum.Water]: {
      key: [
        BuildingsEnum.WaterExtractor,
        BuildingsEnum.MechanicalPump,
        BuildingsEnum.RotaryPump,
        BuildingsEnum.ImpulsePump
      ]
    },
    [ResourcesEnum.Slag]: {
      key: [
        BuildingsEnum.Melter,
        BuildingsEnum.MechanicalPump,
        BuildingsEnum.RotaryPump,
        BuildingsEnum.ImpulsePump,
      ]
    },
    [ResourcesEnum.Oil]: {
      key: [
        BuildingsEnum.OilExtractor,
        BuildingsEnum.MechanicalPump,
        BuildingsEnum.RotaryPump,
        BuildingsEnum.ImpulsePump,
        BuildingsEnum.SporePress
      ]
    },
    [ResourcesEnum.Cryofluid]: {
      key: [
        BuildingsEnum.CryofluidMixer,
        BuildingsEnum.MechanicalPump,
        BuildingsEnum.RotaryPump,
        BuildingsEnum.ImpulsePump
      ]
    },
    [UnitsEnum.Dagger]: {
      key: []
    },
    [UnitsEnum.Mace]: {
      key: []
    },
    [UnitsEnum.Fortress]: {
      key: []
    },
    [UnitsEnum.Scepter]: {
      key: []
    },
    [UnitsEnum.Reign]: {
      key: []
    },
    [UnitsEnum.Nova]: {
      key: []
    },
    [UnitsEnum.Pulsar]: {
      key: []
    },
    [UnitsEnum.Quasar]: {
      key: []
    },
    [UnitsEnum.Vela]: {
      key: []
    },
    [UnitsEnum.Corvus]: {
      key: []
    },
    [UnitsEnum.Crawler]: {
      key: []
    },
    [UnitsEnum.Atrax]: {
      key: []
    },
    [UnitsEnum.Spiroct]: {
      key: []
    },
    [UnitsEnum.Arkyid]: {
      key: []
    },
    [UnitsEnum.Toxopid]: {
      key: []
    },
    [UnitsEnum.Flare]: {
      key: []
    },
    [UnitsEnum.Horizon]: {
      key: []
    },
    [UnitsEnum.Zenith]: {
      key: []
    },
    [UnitsEnum.Antumbra]: {
      key: []
    },
    [UnitsEnum.Eclipse]: {
      key: []
    },
    [UnitsEnum.Mono]: {
      key: []
    },
    [UnitsEnum.Poly]: {
      key: []
    },
    [UnitsEnum.Mega]: {
      key: []
    },
    [UnitsEnum.Quad]: {
      key: []
    },
    [UnitsEnum.Oct]: {
      key: []
    },
    [UnitsEnum.Risso]: {
      key: []
    },
    [UnitsEnum.Minke]: {
      key: []
    },
    [UnitsEnum.Bryde]: {
      key: []
    },
    [UnitsEnum.Sei]: {
      key: []
    },
    [UnitsEnum.Omura]: {
      key: []
    },
    [UnitsEnum.Retusa]: {
      key: []
    },
    [UnitsEnum.Oxynoe]: {
      key: []
    },
    [UnitsEnum.Aegires]: {
      key: []
    },
    [UnitsEnum.Cyerce]: {
      key: []
    },
    [UnitsEnum.Navanax]: {
      key: []
    }
  },

  buildings: {
    [BuildingsEnum.AirblastDrill]: {
      type: BuildingTypes.Extractor,
      power: 180,
      output: [
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
        }
      ],
      booster: [
        {
          name: ResourcesEnum.Water,
          perSecond: 6,
          speedBoost: 3.24
        }
      ]
    },
    [BuildingsEnum.LaserDrill]: {
      type: BuildingTypes.Extractor,
      power: 66,
      output: [
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
          perSecond: 1.25
        },
        {
          name: ResourcesEnum.Thorium,
          perSecond: 1.12
        }
      ],
      booster: [
        {
          name: ResourcesEnum.Water,
          perSecond: 4.8,
          speedBoost: 2.56
        }
      ]
    },
    [BuildingsEnum.PneumaticDrill]: {
      type: BuildingTypes.Extractor,
      power: 0,
      output: [
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
      ],
      booster: [
        {
          name: ResourcesEnum.Water,
          perSecond: 3.6,
          speedBoost: 2.56
        }
      ]
    },
    [BuildingsEnum.MechanicalDrill]: {
      type: BuildingTypes.Extractor,
      power: 0,
      output: [
        {
          name: ResourcesEnum.Sand,
          perSecond: 0.4
        },
        {
          name: ResourcesEnum.Scrap,
          perSecond: 0.40
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
      ],
      booster: [
        {
          name: ResourcesEnum.Water,
          perSecond: 3.0,
          speedBoost: 2.56
        }
      ]
    },
    [BuildingsEnum.MechanicalPump]: {
      type: BuildingTypes.Extractor,
      power: 0,
      output: [
        {
          name: ResourcesEnum.Water,
          perSecond: 7.0
        },
        {
          name: ResourcesEnum.Cryofluid,
          perSecond: 7.0
        },
        {
          name: ResourcesEnum.Slag,
          perSecond: 7.0
        },
        {
          name: ResourcesEnum.Oil,
          perSecond: 7.0
        }
      ]
    },
    [BuildingsEnum.ImpulsePump]: {
      type: BuildingTypes.Extractor,
      power: 18,
      output: [
        {
          name: ResourcesEnum.Water,
          perSecond: 118.7
        },
        {
          name: ResourcesEnum.Cryofluid,
          perSecond: 118.7
        },
        {
          name: ResourcesEnum.Slag,
          perSecond: 118.7
        },
        {
          name: ResourcesEnum.Oil,
          perSecond: 118.7
        }
      ]
    },
    [BuildingsEnum.RotaryPump]: {
      type: BuildingTypes.Extractor,
      power: 0,
      output: [
        {
          name: ResourcesEnum.Water,
          perSecond: 48.0
        },
        {
          name: ResourcesEnum.Cryofluid,
          perSecond: 48.0
        },
        {
          name: ResourcesEnum.Slag,
          perSecond: 48.0
        },
        {
          name: ResourcesEnum.Oil,
          perSecond: 48.0
        }
      ]
    },
    [BuildingsEnum.OilExtractor]: {
      type: BuildingTypes.Extractor,
      power: 180,
      input: [
        {
          name: ResourcesEnum.Sand,
          perSecond: 1.0
        },
        {
          name: ResourcesEnum.Water,
          perSecond: 9.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Oil,
          perSecond: 15.0
        }
      ],
      affinities: {
        titles: [
          {
            name: TilesEnum.SaltFloor,
            productivity: 0.3
          },
          {
            name: TilesEnum.SandFloor,
            productivity: 0.7
          },
          {
            name: TilesEnum.DarkSandFloor,
            productivity: 1.5
          },
          {
            name: TilesEnum.ShaleFloor,
            productivity: 1.6
          }
        ]
      }
    },
    [BuildingsEnum.Cultivator]: {
      type: BuildingTypes.Extractor,
      power: 80,
      input: [
        {
          name: ResourcesEnum.Water,
          perSecond: 18.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.SporePod,
          perSecond: 1
        }
      ],
      affinities: {
        titles: [
          {
            name: TilesEnum.Other,
            productivity: 0
          },
          {
            name: TilesEnum.DarkSandFloor,
            productivity: 0.4
          },
          {
            name: TilesEnum.MossFloor,
            productivity: 0.6
          },
          {
            name: TilesEnum.TaintedWaterFloor,
            productivity: 0.6
          },
          {
            name: TilesEnum.SporeMossFloor,
            productivity: 1.2
          }
        ]
      }
    },
    [BuildingsEnum.WaterExtractor]: {
      type: BuildingTypes.Extractor,
      power: 90,
      output: [
        {
          name: ResourcesEnum.Water,
          perSecond: 6.6
        }
      ],
      affinities: {
        titles: [
          {
            name: TilesEnum.Other,
            productivity: 0
          },
          {
            name: TilesEnum.MagmaRock,
            productivity: -0.75
          },
          {
            name: TilesEnum.HotRock,
            productivity: -0.5
          },
          {
            name: TilesEnum.SaltFloor,
            productivity: -0.3
          },
          {
            name: TilesEnum.BasaltFloor,
            productivity: -0.25
          },
          {
            name: TilesEnum.GrassFloor,
            productivity: 0.1
          },
          {
            name: TilesEnum.SnowFloor,
            productivity: 0.2
          },
          {
            name: TilesEnum.IceSnowFloor,
            productivity: 0.3
          },
          {
            name: TilesEnum.IceFloor,
            productivity: 0.4
          },
          {
            name: TilesEnum.RedIceFloor,
            productivity: 0.4
          },
          {
            name: TilesEnum.MudFloor,
            productivity: 1.0
          }
        ]
      }
    },
    [BuildingsEnum.BlastMixer]: {
      type: BuildingTypes.Factory,
      power: 24,
      input: [
        {
          name: ResourcesEnum.Pyratite,
          perSecond: 0.75
        },
        {
          name: ResourcesEnum.SporePod,
          perSecond: 0.75
        }
      ],
      output: [
        {
          name: ResourcesEnum.BlastCompound,
          perSecond: 0.75
        }
      ]
    },
    [BuildingsEnum.CoalCentrifuge]: {
      type: BuildingTypes.Factory,
      power: 42,
      input: [
        {
          name: ResourcesEnum.Oil,
          perSecond: 6.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Coal,
          perSecond: 2.0
        }
      ]
    },
    [BuildingsEnum.CryofluidMixer]: {
      type: BuildingTypes.Factory,
      power: 60,
      input: [
        {
          name: ResourcesEnum.Titanium,
          perSecond: 0.5
        },
        {
          name: ResourcesEnum.Water,
          perSecond: 12.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Cryofluid,
          perSecond: 12.0
        }
      ],
    },
    [BuildingsEnum.Disassembler]: {
      type: BuildingTypes.Factory,
      power: 240,
      input: [
        {
          name: ResourcesEnum.Scrap,
          perSecond: 4.0
        },
        {
          name: ResourcesEnum.Slag,
          perSecond: 7.2
        }
      ],
      output: [
        {
          name: ResourcesEnum.Sand,
          perSecond: 1.6,
          rate: 40.0
        },
        {
          name: ResourcesEnum.Graphite,
          perSecond: 0.8,
          rate: 20.0
        },
        {
          name: ResourcesEnum.Titanium,
          perSecond: 0.8,
          rate: 20.0
        },
        {
          name: ResourcesEnum.Thorium,
          perSecond: 0.8,
          rate: 20.0
        }
      ]
    },
    [BuildingsEnum.GraphitePress]: {
      type: BuildingTypes.Factory,
      power: 0,
      input: [
        {
          name: ResourcesEnum.Coal,
          perSecond: 1.33
        }
      ],
      output: [
        {
          name: ResourcesEnum.Graphite,
          perSecond: 0.67
        }
      ],
    },
    [BuildingsEnum.Kiln]: {
      type: BuildingTypes.Factory,
      power: 36,
      input: [
        {
          name: ResourcesEnum.Lead,
          perSecond: 2.0
        },
        {
          name: ResourcesEnum.Lead,
          perSecond: 2.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Metaglass,
          perSecond: 2.0
        }
      ]
    },
    [BuildingsEnum.Melter]: {
      type: BuildingTypes.Factory,
      power: 60,
      input: [
        {
          name: ResourcesEnum.Scrap,
          perSecond: 6.25
        }
      ],
      output: [
        {
          name: ResourcesEnum.Slag,
          perSecond: 12.0
        }
      ]
    },
    [BuildingsEnum.MultiPress]: {
      type: BuildingTypes.Factory,
      power: 108,
      input: [
        {
          name: ResourcesEnum.Coal,
          perSecond: 6.0
        },
        {
          name: ResourcesEnum.Water,
          perSecond: 6.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Graphite,
          perSecond: 4.0
        }
      ]
    },
    [BuildingsEnum.PhaseWeaver]: {
      type: BuildingTypes.Factory,
      power: 300,
      input: [
        {
          name: ResourcesEnum.Thorium,
          perSecond: 2.0
        },
        {
          name: ResourcesEnum.Sand,
          perSecond: 5.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.PhaseFabric,
          perSecond: 0.5
        }
      ]
    },
    [BuildingsEnum.PlastaniumCompressor]: {
      type: BuildingTypes.Factory,
      power: 180,
      input: [
        {
          name: ResourcesEnum.Titanium,
          perSecond: 2.0
        },
        {
          name: ResourcesEnum.Oil,
          perSecond: 15.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Plastanium,
          perSecond: 1.0
        }
      ]
    },
    [BuildingsEnum.Pulverizer]: {
      type: BuildingTypes.Factory,
      power: 30,
      input: [
        {
          name: ResourcesEnum.Scrap,
          perSecond: 1.51
        }
      ],
      output: [
        {
          name: ResourcesEnum.Sand,
          perSecond: 1.51
        }
      ]
    },
    [BuildingsEnum.PyratiteMixer]: {
      type: BuildingTypes.Factory,
      power: 12,
      input: [
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
      ],
      output: [
        {
          name: ResourcesEnum.Pyratite,
          perSecond: 0.75
        }
      ]
    },
    [BuildingsEnum.Separator]: {
      type: BuildingTypes.Factory,
      power: 60,
      input: [
        {
          name: ResourcesEnum.Slag,
          perSecond: 4.1
        }
      ],
      output: [
        {
          name: ResourcesEnum.Copper,
          perSecond: 0.72,
          rate: 41.6
        },
        {
          name: ResourcesEnum.Lead,
          perSecond: 0.43,
          rate: 25.0
        },
        {
          name: ResourcesEnum.Graphite,
          perSecond: 0.29,
          rate: 16.6
        },
        {
          name: ResourcesEnum.Titanium,
          perSecond: 0.29,
          rate: 16.6
        }
      ]
    },
    [BuildingsEnum.SiliconCrucible]: {
      type: BuildingTypes.Factory,
      power: 240,
      input: [
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
      ],
      output: [
        {
          name: ResourcesEnum.Silicon,
          perSecond: 5.3
        }
      ],
      affinities: {
        titles: [
          {
            name: TilesEnum.Other,
            productivity: 0
          },
          {
            name: TilesEnum.HotRock,
            productivity: 0.67
          },
          {
            name: TilesEnum.MagmaRock,
            productivity: 1.01
          }
        ]
      }
    },
    [BuildingsEnum.SiliconSmelter]: {
      type: BuildingTypes.Factory,
      power: 30,
      input: [
        {
          name: ResourcesEnum.Coal,
          perSecond: 1.5
        },
        {
          name: ResourcesEnum.Sand,
          perSecond: 3.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Silicon,
          perSecond: 1.5
        }
      ]
    },
    [BuildingsEnum.SporePress]: {
      type: BuildingTypes.Factory,
      power: 42,
      input: [
        {
          name: ResourcesEnum.SporePod,
          perSecond: 3.0
        }
      ],
      output: [
        {
          name: ResourcesEnum.Oil,
          perSecond: 18.0
        }
      ]
    },
    [BuildingsEnum.SurgeSmelter]: {
      type: BuildingTypes.Factory,
      power: 240,
      input: [
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
      ],
      output: [
        {
          name: ResourcesEnum.SurgeAlloy,
          perSecond: 0.8
        }
      ]
    },
    [BuildingsEnum.AdditiveReconstructor]: {
      type: BuildingTypes.Reconstructor,
      power: 180,
      input: [
        {
          name: ResourcesEnum.Silicon,
          perSecond: 4.0
        },
        {
          name: ResourcesEnum.Graphite,
          perSecond: 4.0
        }
      ],
      output: [
        UnitsEnum.Mace,
        UnitsEnum.Pulsar,
        UnitsEnum.Atrax,
        UnitsEnum.Horizon,
        UnitsEnum.Poly,
        UnitsEnum.Minke,
        UnitsEnum.Oxynoe,
      ]
    },
    [BuildingsEnum.MultiplicativeReconstructor]: {
      type: BuildingTypes.Reconstructor,
      power: 360,
      input: [
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
      output: [
        UnitsEnum.Fortress,
        UnitsEnum.Quasar,
        UnitsEnum.Spiroct,
        UnitsEnum.Zenith,
        UnitsEnum.Mega,
        UnitsEnum.Bryde,
        UnitsEnum.Cyerce,
      ]
    },
    [BuildingsEnum.ExponentialReconstructor]: {
      type: BuildingTypes.Reconstructor,
      power: 360,
      input: [
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
      output: [
        UnitsEnum.Scepter,
        UnitsEnum.Vela,
        UnitsEnum.Arkyid,
        UnitsEnum.Antumbra,
        UnitsEnum.Quad,
        UnitsEnum.Sei,
        UnitsEnum.Aegires,
      ]
    },
    [BuildingsEnum.TetrativeReconstructor]: {
      type: BuildingTypes.Reconstructor,
      power: 360,
      input: [
        {
          name: ResourcesEnum.Silicon,
          perSecond: 4.17
        },
        {
          name: ResourcesEnum.SurgeAlloy,
          perSecond: 2.5
        },
        {
          name: ResourcesEnum.Plastanium,
          perSecond: 2.08
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
      output: [
        UnitsEnum.Reign,
        UnitsEnum.Corvus,
        UnitsEnum.Toxopid,
        UnitsEnum.Eclipse,
        UnitsEnum.Oct,
        UnitsEnum.Omura,
        UnitsEnum.Navanax,
      ]
    },
    [BuildingsEnum.GroundFactory]: {
      type: BuildingTypes.Unit,
      power: 72,
      input: [
        {
          unit: UnitsEnum.Dagger,
          cost: [
            {
              name: ResourcesEnum.Lead,
              perSecond: 0.67
            },
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.67
            }
          ],
          productionTime: 15.0
        },
        {
          unit: UnitsEnum.Nova,
          cost: [
            {
              name: ResourcesEnum.Lead,
              perSecond: 0.5
            },
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.75
            },
            {
              name: ResourcesEnum.Titanium,
              perSecond: 0.5
            }
          ],
          productionTime: 40.0
        },
        {
          unit: UnitsEnum.Crawler,
          cost: [
            {
              name: ResourcesEnum.Coal,
              perSecond: 1.0
            },
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.8
            }
          ],
          productionTime: 10.0
        }
      ],
      output: [
        UnitsEnum.Dagger,
        UnitsEnum.Nova,
        UnitsEnum.Crawler
      ],
      affinities: undefined
    },
    [BuildingsEnum.AirFactory]: {
      type: BuildingTypes.Unit,
      power: 72,
      input: [
        {
          unit: UnitsEnum.Flare,
          cost: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 1.0
            }
          ],
          productionTime: 15.0
        },
        {
          unit: UnitsEnum.Mono,
          cost: [
            {
              name: ResourcesEnum.Lead,
              perSecond: 0.43
            },
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.86
            }
          ],
          productionTime: 35.0
        }
      ],
      output: [
        UnitsEnum.Flare,
        UnitsEnum.Mono
      ]
    },
    [BuildingsEnum.NavalFactory]: {
      type: BuildingTypes.Unit,
      power: 72,
      input: [
        {
          unit: UnitsEnum.Risso,
          cost: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.44
            },
            {
              name: ResourcesEnum.Metaglass,
              perSecond: 0.78
            }
          ],
          productionTime: 45.0
        },
        {
          unit: UnitsEnum.Retusa,
          cost: [
            {
              name: ResourcesEnum.Silicon,
              perSecond: 0.43
            },
            {
              name: ResourcesEnum.Metaglass,
              perSecond: 0.5
            },
            {
              name: ResourcesEnum.Titanium,
              perSecond: 0.4
            }
          ],
          productionTime: 50.0
        }
      ],
      output: [
        UnitsEnum.Flare,
        UnitsEnum.Mono
      ]
    },
    [BuildingsEnum.OverdriveProjector]: {
      type: BuildingTypes.Beacon,
      power: 210,
      input: [
        {
          name: ResourcesEnum.PhaseFabric,
          perSecond: 0.15
        }
      ],
      output: [],
      speedBoost: 1.25
    },
    [BuildingsEnum.OverdriveDome]: {
      type: BuildingTypes.Beacon,
      power: 600,
      input: [
        {
          name: ResourcesEnum.PhaseFabric,
          perSecond: 0.2
        },
        {
          name: ResourcesEnum.Silicon,
          perSecond: 0.2
        }
      ],
      output: [],
      speedBoost: 1.5
    }
  }
}