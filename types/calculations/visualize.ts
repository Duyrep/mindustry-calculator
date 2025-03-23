import { BuildingGroupEnum, BuildingsEnum, MaterialEnum, ModesEnum } from "../data/7.0-Build-146";
import { getBuilding, getFactoryNameOfMaterial, SettingsType } from "../utils";

export type Nodes = Record<string, {
  buildingName: string,
  materialName: string,
  numOfBuilding: number,
  to: Record<string, ToNode>
}>

type ToNode = {
  name: string,
  materialName: string,
  materialPerSec: number
}

export function boxLineCalculate(materialName: MaterialEnum, materialPerSec: number, settings: SettingsType, to: ToNode = { name: "Output", materialName: "", materialPerSec: 0 }, result: Nodes = {}) {
  const buildingName = getFactoryNameOfMaterial(materialName, settings);
  if (!buildingName) return result;
  const building = getBuilding(buildingName);
  if (!building) return result;
  let nodeName = `${buildingName} ${materialName}`

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
  const beaconName = settings.beacons[settings.mode][materialName as MaterialEnum].beacon as BuildingsEnum
  const beacon = getBuilding(beaconName)
  if (beacon && beacon.speedIncrease) speedIncrease = beacon.speedIncrease
  if (beacon && settings.defaultBoosts[beacon.modes][beaconName] && beacon.booster) {
    const exist = beacon.booster.find(value => value.name == settings.defaultBoosts[beacon.modes][beaconName])
    if (exist) { speedIncrease = exist.speedBoost; console.log(beaconName) }
  }

  let numOfBuildings = 0
  if (settings.mode == ModesEnum.Any) {
    for (const modeName of Object.values(ModesEnum)) {
      if (building.output[modeName]) {
        const outputMaterial = building.output[modeName]?.find(value => value.name == materialName);
        if (outputMaterial) {
          numOfBuildings = materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease))
          break;
        }
      }
    }
  } else if (building.output[settings.mode]) {
    const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
    if (outputMaterial) {
      numOfBuildings = materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease))
    }
  }

  if (settings.mode == ModesEnum.Any && building.group == BuildingGroupEnum.Factory) {
    for (const modeName of Object.values(ModesEnum)) {
      if (building.output[modeName] && building.output[modeName]!.length > 1) {
        nodeName = `${buildingName} ${buildingName}Output`
        break
      }
    }
  } else {
    if (building.group == BuildingGroupEnum.Factory && building.output[settings.mode] && building.output[settings.mode]!.length > 1) {
      nodeName = `${buildingName} ${buildingName}Output`
    }
  }

  const toNode: ToNode = { name: nodeName, materialName: materialName, materialPerSec: 0 }

  let speedBoost = 1
  if (settings.boosts[settings.mode][materialName] && settings.boosts[settings.mode][materialName]!.building[buildingName]) {
    const building1 = getBuilding(buildingName)
    if (building1) {
      const exist = building.booster?.find(boost => boost.name == settings.boosts[settings.mode][materialName]!.building[buildingName])
      if (exist) {
        speedBoost = exist.speedBoost
        numOfBuildings /= speedBoost
        boxLineCalculate(exist.name, exist.perSec * numOfBuildings, settings, toNode, result)
      }
    }
  }

  if (result[nodeName]) {
    result[nodeName].numOfBuilding += numOfBuildings
    if (result[nodeName].to[to.name + " " + materialName]) {
      result[nodeName].to[to.name + " " + materialName].materialPerSec += to.materialPerSec
    } else {
      result[nodeName].to[to.name + " " + materialName] = {
        name: to.name,
        materialName: materialName,
        materialPerSec: materialPerSec
      }
    }
  } else {
    result[nodeName] = ({
      buildingName: buildingName,
      materialName: materialName,
      numOfBuilding: numOfBuildings,
      to: {
        [to.name + " " + materialName]: {
          name: to.name,
          materialName: materialName,
          materialPerSec: materialPerSec
        }
      }
    })
  }

  if (building.group == BuildingGroupEnum.Factory) {
    if (settings.mode == ModesEnum.Any) {
      Object.values(ModesEnum).forEach((modeName) => {
        if (building.output[modeName] && building.output[modeName]!.length > 1) {
          building.output[modeName]!.forEach(({ name, perSec }) => {
            if (name == materialName) return
            result[nodeName].to["Surplus " + name] = {
              name: "Surplus",
              materialName: name,
              materialPerSec: perSec * numOfBuildings
            }
          })
        }
      })

    } else {
      if (building.output[settings.mode] && building.output[settings.mode]!.length > 1) {
        building.output[settings.mode]!.forEach(({ name, perSec }) => {
          if (name == materialName) return
          result[nodeName].to["Surplus " + name] = {
            name: "Surplus",
            materialName: name,
            materialPerSec: perSec * numOfBuildings
          }
        })
      }
    }
    if (!building.input) return result;
    building.input.forEach(({ name, perSec }) => boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result))

  } else if (building.group == BuildingGroupEnum.Extractor) {
    if (!building.input) return result;
    building.input.forEach(({ name, perSec }) => boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result))

  } else if (building.group == BuildingGroupEnum.FactoryUnit) {
    if (settings.mode == ModesEnum.Any) {
      for (const modeName of Object.values(ModesEnum)) {
        if (building.output[modeName]) {
          const outputMaterial = building.output[modeName]?.find(value => value.name == materialName);
          if (outputMaterial && outputMaterial.unitCost) {
            outputMaterial.unitCost.forEach(({ name, perSec }) => {
              boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result)
            })
            break;
          }
        }
      }
    } else {
      if (building.output[settings.mode]) {
        const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
        if (outputMaterial && outputMaterial.unitCost) {
          outputMaterial.unitCost.forEach(({ name, perSec }) => {
            boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result)
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
            boxLineCalculate(outputMaterial.unitInput, outputMaterial.perSec * numOfBuildings, settings, toNode, result)
          }
          break;
        }
      }
    } else {
      if (building.output[settings.mode]) {
        const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName);
        if (outputMaterial && outputMaterial.unitInput) {
          boxLineCalculate(outputMaterial.unitInput, outputMaterial.perSec * numOfBuildings, settings, toNode, result)
        }
      }
    }
    if (building.input) {
      building.input.forEach(({ name, perSec }) => {
        boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result)
      })
    }

  } else if (building.group == BuildingGroupEnum.Beacon) {
    if (!building.input) return result;
    building.input.forEach(({ name, perSec }) => boxLineCalculate(name, perSec * numOfBuildings, settings, toNode, result))
  } else {
    return result
  }

  return result;
}