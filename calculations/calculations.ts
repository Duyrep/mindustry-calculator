import { data } from "./data/7.0-Build-146";
import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitFactoriesEnum, UnitsEnum } from "./enums";

export type Settings = {
  [key in ResourcesEnum]: { key: FactoriesEnum | ExtractorsEnum }
}

type NodeData = {
  [key: string]: {
    to: {
      name: string,
      numOfProductPerSec: number
    }[],
    factoryName: string,
    productName: string,
    numOfFactory: number,
  }
}

export function calculateProduct(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings, result: NodeData = {}, to: {name: string, numOfProductPerSec: number} = {name: "", numOfProductPerSec: 0}) {
  let factory = getCurrentFactoryForProduct(product, settings)
  let noteName = String(getCurrentFactoryNameForProduct(product, settings)) + " " + product

  if (Object.keys(result).length == 0) {
    result[noteName] = {
      to: [{ name: "Output", numOfProductPerSec: factoryCalculation(product, numOfFactory, settings) }],
      factoryName: getCurrentFactoryNameForProduct(product, settings),
      productName: product,
      numOfFactory: numOfFactory
    }
  } else {
    let nodeData = {
      to: [to],
      factoryName: getCurrentFactoryNameForProduct(product, settings),
      productName: product,
      numOfFactory: numOfFactory,
    }

    if (result[noteName]) {
      nodeData.to = result[noteName].to
      nodeData.to.push({ name: to.name, numOfProductPerSec: factoryCalculation(product, numOfFactory, settings) })
      nodeData.numOfFactory = nodeData.numOfFactory + result[noteName].numOfFactory
    }
    result[noteName] = nodeData
  }

  try {
    factory.input.resources.forEach((resource) => {
    let numOfFactory1 = productCalculation(resource.name, resource.perSecond, settings) * numOfFactory

    calculateProduct(resource.name, numOfFactory1, settings, result, {name: noteName, numOfProductPerSec: factoryCalculation(product, numOfFactory, settings)})
  });
  } catch {
    return {}
  }
  

  return result
}

export function calculate(targets: [(ResourcesEnum | UnitsEnum), number][], settings: Settings) {
  let arr: NodeData[] = []
  let result: NodeData = {}
  targets.forEach((target) => {
    arr.push(calculateProduct(target[0], target[1], settings))
  })

  arr.forEach((value) => {
    for (const key in value) {
      if (result[key]) {
        let nodeData = {
          to: value[key].to,
          factoryName: value[key].factoryName,
          productName: value[key].productName,
          numOfFactory: value[key].numOfFactory,
        }

        nodeData.to = nodeData.to.concat(result[key].to)
        const a: Record<string, number> = {};
        nodeData.to.forEach(({ name, numOfProductPerSec }) => {
          a[name] = (a[name] || 0) + numOfProductPerSec;
        });
        nodeData.to = Object.entries(a).map(([name, numOfProductPerSec]) => ({ name, numOfProductPerSec }));

        nodeData.numOfFactory += result[key].numOfFactory

        result[key] = nodeData
      } else {
        result[key] = {
          to: value[key].to,
          factoryName: value[key].factoryName,
          productName: value[key].productName,
          numOfFactory: value[key].numOfFactory,
        }
      }
    }
  })

  return result
}

export function getDefaultSettings() {
  let settings: Settings = Object.values(ResourcesEnum).reduce((acc, resource) => {
    acc[resource] = { key: FactoriesEnum.BlastMixer };
    return acc;
  }, {} as Settings);

  Object.keys(data.resources).forEach((value) => {
    settings[value as ResourcesEnum].key = data.resources[value as ResourcesEnum].key[0];
  });

  return settings;
}

export function factoryCalculation(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings) {
  return getPerSec(product, settings) * numOfFactory
}

export function productCalculation(product: ResourcesEnum | UnitsEnum, numOfProduct: number, settings: Settings) {
  return numOfProduct / getPerSec(product, settings)
}

function getPerSec(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  try {
    let factory = getCurrentFactoryForProduct(product, settings);
    const resource = factory.output.resources.find((value) => value.name === product);
    return resource ? resource.perSecond : 0;
  } catch {
    return 0
  }
}

function getCurrentFactoryNameForProduct(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  if (Object.values(UnitsEnum).includes(product as UnitsEnum)) {
    return data.units[product as UnitsEnum].key;
  } else {
    return settings[product as ResourcesEnum].key;
  }
}

function getCurrentFactoryForProduct(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  if (Object.values(UnitsEnum).includes(product as UnitsEnum)) {
    return data.unitFactories[data.units[product as UnitsEnum].key];
  } else {
    return data.factories[settings[product as ResourcesEnum].key];
  }
}

export function getFactoriesByProduct(product: ResourcesEnum | UnitsEnum) {
  if (Object.values(ResourcesEnum).includes(product as ResourcesEnum)) {
    return data.resources[product as ResourcesEnum].key;
  } else {
    return data.units[product as UnitsEnum].key;
  }
}