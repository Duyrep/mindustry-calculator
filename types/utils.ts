import { data, ModesEnum, MaterialEnum, BuildingsEnum } from "./data/7.0-Build-146";

export function getMaterial(materialName: string) {
  if (Object.values(MaterialEnum).includes(materialName as MaterialEnum)) {
    return data.material[materialName as MaterialEnum];
  } else {
    return undefined;
  }
}

export function getMaterialDisplayName(materialName: string, settings: SettingsType) {
  const material = getMaterial(materialName);
  if (material) {
    const displayName = material.displayName[settings.lang];
    if (displayName) {
      return displayName;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function getBuilding(buildingName: string) {
  if (Object.values(BuildingsEnum).includes(buildingName as BuildingsEnum)) {
    return data.buildings[buildingName as BuildingsEnum]
  } else {
    return undefined;
  }
}

export function getListFactoryNames(materialName: string, mode: ModesEnum) {
  const material = getMaterial(materialName)
  if (!material) return [];

  if (mode == ModesEnum.Any) {
    let listBuilding: BuildingsEnum[] = []
    for (const modeName of Object.values(ModesEnum)) {
      if (material.buildings[modeName]) {
        listBuilding = listBuilding.concat(material.buildings[modeName])
      }
    }
    return listBuilding
  } else {
    if (material.modes.length == 1 && material.modes[0] != mode) return [];
    const building = material.buildings[mode]
    if (!building) return [];
    return building
  }
}

export function getFactoryNameOfMaterial(materialName: string, settings: SettingsType) {
  if (!Object.values(MaterialEnum).includes(materialName as MaterialEnum)) return undefined
  return settings.material[settings.mode][materialName as MaterialEnum]
}

export function calculateMaterialsPerSec(materialName: string, numOfBuildings: number, settings: SettingsType) {
  const buildingName = getFactoryNameOfMaterial(materialName, settings);
  if (!buildingName) return 0;

  const building = getBuilding(buildingName as BuildingsEnum);
  if (building) {
    let speedBoost = 1
    if (settings.boosts[settings.mode][materialName as MaterialEnum] && settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName]) {
      const building1 = getBuilding(buildingName)
      if (building1) {
        const exist = building.booster?.find(boost => boost.name == settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName])
        if (exist) {
          speedBoost = exist.speedBoost
        }
      }
    }

    let efficiency = 1
    let affinity = 0
    if (settings.affinities[settings.mode][materialName as MaterialEnum] && settings.affinities[settings.mode][materialName as MaterialEnum]!.building[buildingName]) {
      const building1 = getBuilding(buildingName)
      if (building1) {
        const exist = building.affinities?.find(affinities => affinities.type == settings.affinities[settings.mode][materialName as MaterialEnum]!.building[buildingName])
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
      if (exist) {speedIncrease = exist.speedBoost; console.log(beaconName)}
    }

    if (building.output[settings.mode]) {
      const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName)

      if (outputMaterial) {
        return numOfBuildings * (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease)) * speedBoost
      } else {
        return 0
      }
    } else if (settings.mode == ModesEnum.Any) {
      let outputMaterial = undefined
      for (const modeName of Object.values(ModesEnum)) {
        if (building.output[modeName]) {
          outputMaterial = building.output[modeName].find(value => value.name == materialName)
          if (outputMaterial) {
            return numOfBuildings * (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease)) * speedBoost
          } else {
            return 0
          }
        }
      }
      return 0
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export function calculateNumOfBuildings(materialName: string, materialPerSec: number, settings: SettingsType): number {
  const buildingName = getFactoryNameOfMaterial(materialName, settings);
  if (!buildingName) return 0;

  const building = getBuilding(buildingName);
  if (building) {
    let speedBoost = 1
    if (settings.boosts[settings.mode][materialName as MaterialEnum] && settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName]) {
      const building1 = getBuilding(buildingName)
      if (building1) {
        const exist = building.booster?.find(boost => boost.name == settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName])
        if (exist) {
          speedBoost = exist.speedBoost
        }
      }
    }

    let efficiency = 1
    let affinity = 0
    if (settings.affinities[settings.mode][materialName as MaterialEnum] && settings.affinities[settings.mode][materialName as MaterialEnum]!.building[buildingName]) {
      const building1 = getBuilding(buildingName)
      if (building1) {
        const exist = building.affinities?.find(affinities => affinities.type == settings.affinities[settings.mode][materialName as MaterialEnum]!.building[buildingName])
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
      if (exist) {speedIncrease = exist.speedBoost; console.log(beaconName)}
    }

    if (building.output[settings.mode]) {
      const outputMaterial = building.output[settings.mode]?.find(value => value.name == materialName)
      if (outputMaterial) {
        return materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease)) / speedBoost
      } else {
        return 0
      }
    } else if (settings.mode == ModesEnum.Any) {
      for (const modeName of Object.values(ModesEnum)) {
        if (building.output[modeName]) {
          const outputMaterial = building.output[modeName].find(value => value.name == materialName)
          if (outputMaterial) {
            return materialPerSec / (outputMaterial.perSec * efficiency + (outputMaterial.perSec * affinity) + (outputMaterial.perSec * speedIncrease)) / speedBoost
          }
        }
      }
      return 0
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export type SettingsType = {
  lang: string,
  mode: ModesEnum,
  displayRates: "second" | "minute" | "hour",
  graphDirection: "LR" | "TB",
  material: { [key in ModesEnum]: { [key in MaterialEnum]: BuildingsEnum } }
  boosts: Record<ModesEnum, Partial<Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string | null>>, showDropDown: boolean }>>>
  affinities: Record<ModesEnum, Partial<Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string>>, showDropDown: boolean }>>>
  beacons: Record<ModesEnum, Record<MaterialEnum, { beacon: string, showDropDown: boolean }>>
  defaultBoosts: { [key in ModesEnum]: Partial<Record<BuildingsEnum, string | null>> }
  defaultAffinities: Record<ModesEnum, Record<BuildingsEnum, string>>
  defaultBeacons: string
}

export function getDefaultSettings(): SettingsType {
  const materialSettings = {} as { [key in ModesEnum]: { [key in MaterialEnum]: BuildingsEnum } }
  for (const mode in ModesEnum) {
    if (!materialSettings[mode as ModesEnum]) {
      materialSettings[mode as ModesEnum] = {} as { [key in MaterialEnum]: BuildingsEnum };
    }
    for (const materialName in MaterialEnum) {
      const material = getMaterial(materialName)
      if (!material) continue;

      const buildingList = getListFactoryNames(materialName, mode as ModesEnum)

      materialSettings[mode as ModesEnum][materialName as MaterialEnum] = buildingList[0]
    }
  }

  const defaultBoostsSettings = {} as { [key in ModesEnum]: Partial<Record<BuildingsEnum, string | null>> }
  Object.values(ModesEnum).map((mode) => Object.values(BuildingsEnum).map(
    (buildingName) => {
      const building = getBuilding(buildingName)
      if (!building) return
      if (!building.booster) return
      if (defaultBoostsSettings[mode])
        defaultBoostsSettings[mode][buildingName] = null
      else defaultBoostsSettings[mode] = { [buildingName]: null }
    }
  ))

  const boostsSettings = {} as Record<ModesEnum, Partial<Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string | null>>, showDropDown: boolean }>>>
  Object.values(ModesEnum).forEach((mode) => {
    const boosts = {} as Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string | null>>, showDropDown: boolean }>
    Object.values(MaterialEnum).forEach((materialName) => {
      const material = getMaterial(materialName)
      if (!material) return
      if (!material.modes.includes(mode) && mode != ModesEnum.Any) return
      const buildingSetting = {} as Partial<Record<BuildingsEnum, string | null>>
      Object.values(BuildingsEnum).forEach((buildingName) => {
        if (mode == ModesEnum.Any) {
          Object.values(ModesEnum).forEach((modeName) => {
            let buildingName1 = data.material[materialName].buildings[modeName]?.find(value => value == buildingName)
            buildingName1 = data.material[materialName].buildings[modeName]?.find(value => value == buildingName)
            if (!buildingName1) return
            const building = getBuilding(buildingName1)
            if (!building) return
            if (!building.booster) return
            buildingSetting[buildingName1] = null
          })
        } else {
          let buildingName1 = data.material[materialName].buildings[mode]?.find(value => value == buildingName)
          buildingName1 = data.material[materialName].buildings[mode]?.find(value => value == buildingName)
          if (!buildingName1) return
          const building = getBuilding(buildingName1)
          if (!building) return
          if (!building.booster) return
          if (!building.modes.includes(mode)) return
          buildingSetting[buildingName1] = null
        }
      })
      if (Object.values(buildingSetting).length === 0) return
      boosts[materialName] = {
        building: buildingSetting,
        showDropDown: false
      }
    })
    boostsSettings[mode] = boosts
  })

  const defaultAffinities = {} as Record<ModesEnum, Record<BuildingsEnum, string>>
  Object.values(ModesEnum).forEach((mode) => {
    const affinities = {} as Record<BuildingsEnum, string>
    Object.values(BuildingsEnum).map((buildingName) => {
      const building = getBuilding(buildingName)
      if (!building) return
      if (!building.affinities) return
      affinities[buildingName] = building.affinities[0].type
    })
    defaultAffinities[mode] = affinities
  })

  const affinitiesSettings = {} as Record<ModesEnum, Partial<Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string>>, showDropDown: boolean }>>>
  Object.values(ModesEnum).forEach((mode) => {
    const affinities = {} as Record<MaterialEnum, { building: Partial<Record<BuildingsEnum, string>>, showDropDown: boolean }>
    Object.values(MaterialEnum).forEach((materialName) => {
      const material = getMaterial(materialName)
      if (!material) return
      if (!material.modes.includes(mode) && mode != ModesEnum.Any) return
      const buildingSetting = {} as Partial<Record<BuildingsEnum, string>>
      Object.values(BuildingsEnum).forEach((buildingName) => {
        if (mode == ModesEnum.Any) {
          Object.values(ModesEnum).forEach((modeName) => {
            let buildingName1 = data.material[materialName].buildings[modeName]?.find(value => value == buildingName)
            buildingName1 = data.material[materialName].buildings[modeName]?.find(value => value == buildingName)
            if (!buildingName1) return
            const building = getBuilding(buildingName1)
            if (!building) return
            if (!building.affinities) return
            buildingSetting[buildingName1] = building.affinities[0].type
          })
        } else {
          let buildingName1 = data.material[materialName].buildings[mode]?.find(value => value == buildingName)
          buildingName1 = data.material[materialName].buildings[mode]?.find(value => value == buildingName)
          if (!buildingName1) return
          const building = getBuilding(buildingName1)
          if (!building) return
          if (!building.affinities) return
          if (!building.modes.includes(mode)) return
          buildingSetting[buildingName1] = building.affinities[0].type
        }
      })
      if (Object.values(buildingSetting).length === 0) return
      affinities[materialName] = {
        building: buildingSetting,
        showDropDown: false
      }
    })
    affinitiesSettings[mode] = affinities
  })

  const beaconSettings = {} as Record<ModesEnum, Record<MaterialEnum, { beacon: string, showDropDown: boolean }>>
  Object.values(ModesEnum).forEach((mode) => {
    const beacons = {} as Record<MaterialEnum, { beacon: string, showDropDown: boolean }>
    Object.values(MaterialEnum).forEach((materialName) => {
      const material = getMaterial(materialName)
      if (!material) return
      beacons[materialName] = {
        beacon: "",
        showDropDown: false
      }
    })
    beaconSettings[mode] = beacons
  })


  return {
    lang: "en",
    mode: ModesEnum.Serpulo,
    displayRates: "second",
    graphDirection: "TB",
    material: materialSettings,
    boosts: boostsSettings,
    affinities: affinitiesSettings,
    beacons: beaconSettings,
    defaultBoosts: defaultBoostsSettings,
    defaultAffinities: defaultAffinities,
    defaultBeacons: ""
  }
}

export function getTimeUnitInSeconds(settings: SettingsType) {
  return settings.displayRates == "minute" ? 60 : settings.displayRates == "hour" ? 3600 : 1
}