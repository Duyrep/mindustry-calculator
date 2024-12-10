import { BaseType, select, Selection, text, zoom } from "d3";
import { data } from "./data/7.0-Build-146";
import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitsEnum } from "./enums";
import { graphviz, GraphvizOptions } from "d3-graphviz";

type Settings = {
  [key in ResourcesEnum]: { key: FactoriesEnum | ExtractorsEnum }
}

type Result = {
  [key: string]: string[]
}

export function factoryCalculation(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings, result: Result = {}) {
  let factory = getCurrentFactoryForProduct(product, settings)
  let node = getCurrentFactoryNameForProduct(product, settings) + " " + product
  if (Object.keys(result).length == 0) {
    result["Output"] = [node]
  }
  result[node] = []

  try {
    factory.input.resources.forEach((resource) => {
      let factory2 = getCurrentFactoryNameForProduct(resource.name, settings)

      if (Object.values(FactoriesEnum).includes(factory2 as FactoriesEnum)) {
        factoryCalculation(resource.name, 1, settings, result)
      }
      result[node].push(factory2 + " " + resource.name)

    })
  } catch {
    return { "Output": ["Error"] }
  }

  return result
}

export function productCalculation(product: ResourcesEnum | UnitsEnum, numOfProduct: number) {

}

export function getFactoriesByProduct(product: ResourcesEnum | UnitsEnum) {
  if (Object.values(ResourcesEnum).includes(product as ResourcesEnum)) {
    return data.resources[product as ResourcesEnum].key;
  } else {
    return data.units[product as UnitsEnum].key;
  }
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

export default function renderChart(targets: (ResourcesEnum | UnitsEnum)[], options: GraphvizOptions | boolean, settings: Settings) {
  const color = select("html").classed("dark") ? "white" : "black";
  select("#graph-container").selectAll("*").remove()
  select("#graph-container").append("div").attr("id", "graph")
  const div = select("#graph");

  const renderNodes = () => {
    div.selectAll(".node").each(function () {
      const node = select(this);
      const polygon = node.select("polygon");
      const points = getPolygonPoints(polygon);

      node.append("rect")
        .attr("x", points[1][0])
        .attr("y", points[1][1])
        .attr("width", getRectangleWidth(points))
        .attr("height", getRectangleHeight(points))
        .attr("stroke", color)
        .attr("rx", 4)
        .attr("fill", "rgba(0, 0, 0, 0)")
        .lower();

      polygon.remove();
    });
  };

  const renderEdges = () => {
    div.selectAll(".edge").each(function () {
      const edge = select(this);
      edge.select("polygon").attr("stroke", color);
      edge.select("path").attr("stroke", color);
    });
  };

  const getPolygonPoints = (polygon: Selection<BaseType, unknown, null, undefined>) => {
    return polygon.attr("points")
      .split(" ")
      .map((value) => value.split(",").map(Number));
  };

  const getRectangleWidth = (points: number[][]) => {
    return Math.max(...points.map(point => point[0])) - Math.min(...points.map(point => point[0]));
  };

  const getRectangleHeight = (points: number[][]) => {
    return Math.max(...points.map(point => point[1])) - Math.min(...points.map(point => point[1]));
  };

  const textDot = [
    `digraph {`,
    `node[shape=rect];`,
    "Output"
  ]

  targets.forEach((target) => {
    let result = factoryCalculation(target, 1, settings);
    for (const key in result) {
      result[key].forEach((value) => {
        textDot.push(`"${value}" -> "${key}";`)
      })
    }
  })

  textDot.push("}")

  console.log(textDot.join("\n  "))

  graphviz(div.node(), options).renderDot(textDot.join(""), () => {
    let svg = div.select("svg");

    svg.select("polygon").remove();
    svg.selectAll("text").attr("fill", color);

    renderNodes();
    renderEdges();

    svg.attr("class", "border-2 border-border");
    svg.attr("width", null).attr("height", null);
  });
}

function getCurrentFactoryForProduct(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  if (Object.values(UnitsEnum).includes(product as UnitsEnum)) {
    return data.factories[data.units[product as UnitsEnum].key];
  } else {
    return data.factories[settings[product as ResourcesEnum].key as FactoriesEnum];
  }
}

function getCurrentFactoryNameForProduct(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  if (Object.values(UnitsEnum).includes(product as UnitsEnum)) {
    return data.units[product as UnitsEnum].key
  } else {
    return settings[product as ResourcesEnum].key;
  }
}