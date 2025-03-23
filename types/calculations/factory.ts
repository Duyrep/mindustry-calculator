import { BuildingGroupEnum, BuildingsEnum, MaterialEnum, ModesEnum } from "../data/7.0-Build-146";
import { getBuilding, getFactoryNameOfMaterial, SettingsType } from "../utils";

export type FactoryResultType = {
  result: Partial<Record<MaterialEnum, {
    building: BuildingsEnum | undefined
    numOfBuildings: number,
    material: MaterialEnum,
    materialPerSec: number,
    powerUse: number
  }>>
  totalPowerUse: number
}

export function factoryCalculator(
  materialName: MaterialEnum,
  materialPerSec: number,
  settings: SettingsType,
  result: FactoryResultType = { result: {}, totalPowerUse: 0 }
): FactoryResultType {
  const buildingName = getFactoryNameOfMaterial(materialName, settings);
  if (!buildingName) return result;
  const building = getBuilding(buildingName);
  if (!building) return result;

  let efficiency = 1
  let affinity = 0
  if (settings.affinities[settings.mode][materialName] && settings.affinities[settings.mode][materialName]!.building[buildingName]) {
    const building1 = getBuilding(buildingName)
    if (building1) {
      const exist = building.affinities?.find(affinities => affinities.type == settings.affinities[settings.mode][materialName]!.building[buildingName])
      if (exist) {
        if (exist.affinity) {
          affinity = exist.affinity
        }
        if (exist.efficiency) {
          efficiency = exist.efficiency
        }
      }
    }
  }

  let speedIncrease = 0
  const beaconName = settings.beacons[settings.mode][materialName].beacon as BuildingsEnum
  const beacon = getBuilding(beaconName)
  if (beacon && beacon.speedIncrease) speedIncrease = beacon.speedIncrease
  if (beacon && settings.defaultBoosts[beacon.modes][beaconName] && beacon.booster) {
    const exist = beacon.booster.find(value => value.name == settings.defaultBoosts[beacon.modes][beaconName])
    if (exist) {speedIncrease = exist.speedBoost; console.log(beaconName)}
  }

  let numOfBuildings = 0
  if (settings.mode == ModesEnum.Any) {
    for (const modeName of Object.values(ModesEnum)) {
      if (building.output[modeName]) {
        const outputMaterial = building.output[modeName].find(value => value.name == materialName);
        if (outputMaterial) {
          numOfBuildings = materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease))
          break
        }
      }
    }
  } else if (building.output[settings.mode]) {
    const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
    if (outputMaterial) {
      numOfBuildings = materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease))
    }
  }

  let speedBoost = 1
  if (settings.boosts[settings.mode][materialName] && settings.boosts[settings.mode][materialName]!.building[buildingName]) {
    const building1 = getBuilding(buildingName)
    if (building1) {
      const exist = building.booster?.find(boost => boost.name == settings.boosts[settings.mode][materialName]!.building[buildingName])
      if (exist) {
        speedBoost = exist.speedBoost
        numOfBuildings /= speedBoost
        factoryCalculator(exist.name, exist.perSec * numOfBuildings, settings, result)
      }
    }
  }

  if (result.result[materialName]) {
    result.result[materialName].numOfBuildings += numOfBuildings
    result.result[materialName].materialPerSec += materialPerSec
    result.result[materialName].powerUse += building.power * numOfBuildings
  } else {
    result.result[materialName] = {
      building: buildingName,
      numOfBuildings: numOfBuildings,
      material: materialName,
      materialPerSec: materialPerSec,
      powerUse: building.power * numOfBuildings,
    }
  }

  if (building.group == BuildingGroupEnum.Factory) {
    if (building.input) {
      building.input.forEach(({ name, perSec }) => {
        factoryCalculator(name, perSec * numOfBuildings, settings, result)
      })
    }
    if (settings.defaultBoosts[settings.mode][buildingName]) {
      console.log(buildingName, settings.defaultBoosts[settings.mode][buildingName])
    }
  } else if (building.group == BuildingGroupEnum.Extractor) {
    if (building.input) {
      building.input.forEach(({ name, perSec }) => {
        factoryCalculator(name, perSec * numOfBuildings, settings, result)
      })
    }
  } else if (building.group == BuildingGroupEnum.FactoryUnit) {
    if (settings.mode == ModesEnum.Any) {
      for (const modeName of Object.values(ModesEnum)) {
        if (building.output[modeName]) {
          const outputMaterial = building.output[modeName]?.find(value => value.name == materialName);
          if (outputMaterial && outputMaterial.unitCost) {
            outputMaterial.unitCost.forEach(({ name, perSec }) => {
              factoryCalculator(name, perSec * numOfBuildings, settings, result)
            })
          }
        }
      }
    } else {
      if (building.output[settings.mode]) {
        const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
        if (outputMaterial && outputMaterial.unitCost) {
          outputMaterial.unitCost.forEach(({ name, perSec }) => {
            factoryCalculator(name, perSec * numOfBuildings, settings, result)
          })
        }
      }
    }
  } else if (building.group == BuildingGroupEnum.FactoryUnit1) {
    if (settings.mode == ModesEnum.Any) {
      for (const modeName of Object.values(ModesEnum)) {
        if (building.output[modeName]) {
          const outputMaterial = building.output[modeName]?.find(value => value.name == materialName);
          if (outputMaterial && outputMaterial.unitInput) {
            factoryCalculator(outputMaterial.unitInput, outputMaterial.perSec * numOfBuildings, settings, result)
          }
        }
      }
    } else {
      if (building.output[settings.mode]) {
        const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
        if (outputMaterial && outputMaterial.unitInput) {
          factoryCalculator(outputMaterial.unitInput, outputMaterial.perSec * numOfBuildings, settings, result)
        }
      }
    }
    if (building.input) {
      building.input.forEach(({ name, perSec }) => {
        factoryCalculator(name, perSec * numOfBuildings, settings, result)
      })
    }
  } else {
    return result
  }

  result.totalPowerUse += building.power * numOfBuildings

  return result
}