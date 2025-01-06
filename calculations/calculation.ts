import { data } from "./data/7.0-Build-146";
import { AffinitieTiles, Booster, Buildings, InputOutputBuilding } from "./dataTypes";
import { BuildingsEnum, BuildingTypes, ResourcesEnum, TilesEnum } from "./enums";

export type Settings = {
  buildings: BuildingSettings
  product: ProductSettings
}

export type BuildingSettings = {
  [key in BuildingsEnum]: {
    type: BuildingTypes | undefined
    affinitiesTile?: AffinitieTiles
    booster?: Booster | null
  }
}

export type ProductSettings = {
  [key in ResourcesEnum]: { key: BuildingsEnum }
}

type Node = {
  to: {
    name: string,
    numOfProductsPerSec: number
  }[],
  buildingName: string,
  productName: string,
  numOfBuildings: number,
  link: number
  surplus?: {
    name: string,
    numOfProductsPerSec: number
  }[]
}

export function calculate(
  numOfBuildings: number,
  product: ResourcesEnum,
  settings: Settings,
  nodes: { [key: string]: Node } = {},
  to: { name: string, numOfProductsPerSec: number } = { name: "", numOfProductsPerSec: 0 },
  link: number = 0
) {
  const building = getCurrentBuildingOfProduct(product, settings.product)
  const buildingName = getCurrentBuildingNameOfProduct(product, settings.product)
  const nodeName = buildingName + " " + product
  const productPerSec = getNumOfProductsPerSecondOfOutput(product, settings) * numOfBuildings
  let node = createNode([], buildingName, product, numOfBuildings, link)

  if (nodes[nodeName]) {
    node = nodes[nodeName]
    const found = node.to.find(value => value.name === to.name);
    if (found) {
      found.numOfProductsPerSec += to.numOfProductsPerSec;
    } else {
      node.to.push(to);
    }
    node.numOfBuildings += numOfBuildings
  } else {
    node = createNode([], buildingName, product, numOfBuildings, link)
    if (Object.keys(nodes).length == 0) {
      node.to.push({ name: "Output", numOfProductsPerSec: productPerSec })
    } else {
      node.to.push(to)
    }
  }

  nodes[nodeName] = node
  if (building.type == BuildingTypes.Factory) {
    (building.input as InputOutputBuilding[]).forEach((product1) => {
      const numOfBuildings1 = calculateNumOfBuildings(product1.perSecond * numOfBuildings, product1.name, settings)
      calculate(numOfBuildings1, product1.name, settings, nodes, { name: nodeName, numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, product1.name, settings) }, link + 1)
    })

    if ((building.output as InputOutputBuilding[]).length > 1) {
      (building.output as InputOutputBuilding[]).filter((value) => value.name != product).forEach((product1) => {
        const node1 = createNode([], "", "", 0, link)
        nodes["Surplus"] = node1
        node.to.push({ name: "Surplus", numOfProductsPerSec: product1.perSecond * numOfBuildings })
      })
    }
  } else if (building.type == BuildingTypes.Extractor) {
    if (building.input) {
      (building.input as InputOutputBuilding[]).forEach((product1) => {
        const numOfBuildings1 = calculateNumOfBuildings(product1.perSecond * numOfBuildings, product1.name, settings)
        calculate(numOfBuildings1, product1.name, settings, nodes, { name: nodeName, numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, product1.name, settings) }, link + 1)
      })
    } else if (building.booster && settings.buildings[buildingName].booster) {
      const found = building.booster.find((value) => value.name == settings.buildings[buildingName].booster?.name)
      if (found) {
        const numOfBuildings1 = calculateNumOfBuildings(found.perSecond * (numOfBuildings * found.perSecond), found.name, settings)
        calculate(numOfBuildings1, found.name, settings, nodes, { name: nodeName, numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, found.name, settings) }, link + 1)
      }
    }
  } else if (building.type == BuildingTypes.Unit) {
  } else if (building.type == BuildingTypes.Reconstructor) { }

  return nodes
}

function createNode(
  to: {
    name: string,
    numOfProductsPerSec: number
  }[],
  buildingName: string,
  productName: string,
  numOfBuildings: number,
  link: number
): Node {
  return {
    to: to,
    buildingName: buildingName,
    productName: productName,
    numOfBuildings: numOfBuildings,
    link: link
  }
}

export function calculateNumOfBuildings(numOfProducts: number, product: ResourcesEnum, settings: Settings) {
  try {
    return numOfProducts / getNumOfProductsPerSecondOfOutput(product, settings)
  } catch {
    return 0
  }
}

export function calculateNumOfProducts(numOfBuildings: number, product: ResourcesEnum, settings: Settings) {
  return numOfBuildings * getNumOfProductsPerSecondOfOutput(product, settings)
}

export function getBuildingsOfProduct(product: ResourcesEnum) {
  return data.products[product].key
}

export function getCurrentBuildingNameOfProduct(product: ResourcesEnum, settings: ProductSettings) {
  if (settings[product]) {
    return settings[product].key
  } else {
    return data.products[product].key[0]
  }
}

export function getCurrentBuildingOfProduct(product: ResourcesEnum, settings: ProductSettings) {
  if (settings[product]) {
    return getBuilding(settings[product].key)
  } else {
    return getBuilding(data.products[product].key[0])
  }
}

export function getNumOfProductsPerSecondOfOutput(product: ResourcesEnum, settings: Settings) {
  const building = getCurrentBuildingOfProduct(product, settings.product)
  const buildingName = getCurrentBuildingNameOfProduct(product, settings.product)
  if (building.type == BuildingTypes.Factory) {
    const outputProduct = (building.output as InputOutputBuilding[]).find((value) => value.name === product)
    if (!outputProduct) return 0;
    if (building.affinities) {
      return outputProduct.perSecond + outputProduct.perSecond * (settings.buildings[buildingName].affinitiesTile as AffinitieTiles).productivity
    } else {
      return outputProduct.perSecond
    };
  } else if (building.type == BuildingTypes.Extractor) {
    const outputProduct = (building.output as InputOutputBuilding[]).find((value) => value.name === product)
    if (!outputProduct) return 0;
    if (building.affinities) {
      return outputProduct.perSecond + outputProduct.perSecond * (settings.buildings[buildingName].affinitiesTile as AffinitieTiles).productivity
    } else if (building.booster && settings.buildings[buildingName].booster) {
      return outputProduct.perSecond * settings.buildings[buildingName].booster.speedBoost
    } else {
      return outputProduct.perSecond
    };
  } else {
    return 0
  }
}

export function getAffinitiesOfBuilding(name: BuildingsEnum) {
  return getBuilding(name).affinities?.titles
}

export function getBoostersOfBuilding(name: BuildingsEnum) {
  return getBuilding(name).booster
}

export function getBuilding(name: BuildingsEnum) {
  return data.buildings[name]
}

export function getDefaultSettings(): Settings {
  return {
    buildings: getDefaultBuildingSettings(),
    product: getDefaultProductSettings()
  }
}

export function getDefaultProductSettings(): ProductSettings {
  return Object.values(ResourcesEnum).reduce((acc, resource) => {
    const building = getBuildingsOfProduct(resource)
    if (building.length > 1)
      acc[resource] = { key: data.products[resource as ResourcesEnum].key[0] };
    return acc;
  }, {} as ProductSettings);
}

export function getDefaultBuildingSettings(): BuildingSettings {
  return Object.values(BuildingsEnum).reduce((settings, buildingName) => {
    const building = getBuilding(buildingName)
    if (building.booster) {
      settings[buildingName] = { type: building.type, booster: null };
    } else if (building.affinities && building.affinities.titles) {
      settings[buildingName] = { type: building.type, affinitiesTile: building.affinities.titles[0] };
    }
    return settings;
  }, {} as BuildingSettings);
}
