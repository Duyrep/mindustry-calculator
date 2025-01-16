import { data } from "./data/7.0-Build-146";
import { AffinitieTiles, Booster, InputOutputBuilding } from "./dataTypes";
import { BuildingsEnum, BuildingTypes, ResourcesEnum } from "./enums";

export type Settings = {
  graphDirection: "LR" | "TB"
  beacon: BeaconSettings
  buildings: BuildingSettings
  product: ProductSettings
}

export type BeaconSettings = {
  name: BuildingsEnum | undefined
  input: boolean
}

export type BuildingSettings = {
  [key in BuildingsEnum]: {
    type: BuildingTypes | undefined,
    affinitiesTile?: AffinitieTiles,
    booster?: Booster | null
  }
}

export type ProductSettings = {
  [key in ResourcesEnum]: { key: BuildingsEnum }
}

type Node = {
  to: {
    name: string,
    productName: string,
    numOfProductsPerSec: number
  }[],
  buildingName: string,
  numOfBuildings: number,
  link: number
}

export function calculate(
  numOfBuildings: number,
  product: ResourcesEnum,
  settings: Settings,
  nodes: { [key: string]: Node } = {},
  to: { name: string, productName: string, numOfProductsPerSec: number } = { name: "", productName: "", numOfProductsPerSec: 0 },
  link: number = 0,
) {
  const building = getCurrentBuildingOfProduct(product, settings.product)
  const buildingName = getCurrentBuildingNameOfProduct(product, settings.product)
  const productPerSec = getNumOfProductsPerSecondOfOutput(product, settings) * numOfBuildings
  let nodeName = buildingName + " " + product
  let node = createNode([], buildingName, numOfBuildings, link)

  if (building.type == BuildingTypes.Factory && (building.output as InputOutputBuilding[]).length > 1) {
    nodeName = buildingName;
  }

  if (nodes[nodeName]) {
    node = nodes[nodeName]
    const found = node.to.find(value => value.name === to.name && value.productName === to.productName);
    if (found) {
      found.numOfProductsPerSec += to.numOfProductsPerSec;
    } else {
      node.to.push(to);
    }
    node.numOfBuildings += numOfBuildings;
    const found1 = node.to.find(value => value.productName === to.productName && value.name == "Surplus");
    if (found1) {
      const index = node.to.indexOf(found1);
      if (index > -1) {
        node.to.splice(index, 1);
      }
    }
  } else {
    node = createNode([], buildingName, numOfBuildings, link)
    if (Object.keys(nodes).length == 0) {
      node.to.push({ name: "Output", productName: product, numOfProductsPerSec: productPerSec })
    } else {
      node.to.push(to)
    }
  }

  nodes[nodeName] = node
  if (building.type == BuildingTypes.Factory) {
    if ((building.output as InputOutputBuilding[]).length > 1) {
      (building.output as InputOutputBuilding[]).forEach((product1) => {
        const numOfBuildings1 = calculateNumOfBuildings(product1.perSecond * numOfBuildings, product1.name, settings)
        const numOfProductsPerSec = calculateNumOfProducts(numOfBuildings1, product1.name, settings)
        const found = nodes[nodeName].to.find(value => value.productName === product1.name);
        if (found) {
          found.numOfProductsPerSec += numOfProductsPerSec;
        } else {
          nodes[nodeName].to.push({ name: "Surplus", productName: product1.name, numOfProductsPerSec: numOfProductsPerSec })
        }
      })
    }
    (building.input as InputOutputBuilding[]).forEach((product1) => {
      const numOfBuildings1 = calculateNumOfBuildings(product1.perSecond * numOfBuildings, product1.name, settings)
      calculate(
        numOfBuildings1,
        product1.name,
        settings,
        nodes,
        {
          name: nodeName,
          productName: product1.name,
          numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, product1.name, settings)
        },
        link + 1
      )
    })
  } else if (building.type == BuildingTypes.Extractor) {
    if (building.input) {
      (building.input as InputOutputBuilding[]).forEach((product1) => {
        const numOfBuildings1 = calculateNumOfBuildings(product1.perSecond * numOfBuildings, product1.name, settings)
        calculate(numOfBuildings1, product1.name, settings, nodes, { name: nodeName, productName: product1.name, numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, product1.name, settings) }, link + 1)
      })
    } else if (building.booster && settings.buildings[buildingName].booster) {
      const found = building.booster.find((value) => value.name == settings.buildings[buildingName].booster?.name)
      if (found) {
        const numOfBuildings1 = calculateNumOfBuildings(found.perSecond * numOfBuildings, found.name, settings)
        calculate(numOfBuildings1, found.name, settings, nodes, { name: nodeName, productName: found.name, numOfProductsPerSec: calculateNumOfProducts(numOfBuildings1, found.name, settings) }, link + 1)
      }
    }
  }

  return nodes
}

function createNode(
  to: {
    name: string,
    productName: string
    numOfProductsPerSec: number
  }[],
  buildingName: string,
  numOfBuildings: number,
  link: number
): Node {
  return {
    to: to,
    buildingName: buildingName,
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

export function getNumOfProductsPerSecondOfOutput(product: ResourcesEnum, settings: Settings): number {
  const building = getCurrentBuildingOfProduct(product, settings.product);
  const buildingName = getCurrentBuildingNameOfProduct(product, settings.product);

  const outputProduct = (building.output as InputOutputBuilding[]).find((value) => value.name === product);
  if (!outputProduct) return 0;

  const calculateProductivity = (base: number, productivity: number | undefined): number => {
    let result = base;
    if (productivity) {
      result += base * productivity;
    }
    if (settings.beacon.name) {
      const beaconBuilding = getBuilding(settings.beacon.name)
      if (beaconBuilding.speedBoost) {
        result += base * beaconBuilding.speedBoost;
      }
    }
    return result;
  };

  switch (building.type) {
    case BuildingTypes.Factory:
      return calculateProductivity(
        outputProduct.perSecond,
        settings.buildings[buildingName]?.affinitiesTile?.productivity
      );

    case BuildingTypes.Extractor:
      const productivity = settings.buildings[buildingName]?.affinitiesTile?.productivity;
      const boosterSpeed = settings.buildings[buildingName]?.booster?.speedBoost;
      if (productivity) {
        return calculateProductivity(outputProduct.perSecond, productivity);
      } else if (boosterSpeed) {
        return outputProduct.perSecond * boosterSpeed;
      } else {
        return outputProduct.perSecond;
      }

    default:
      return 0;
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
    beacon: { name: undefined, input: false },
    graphDirection: "TB",
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
