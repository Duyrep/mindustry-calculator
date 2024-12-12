import { BaseType, select, Selection } from "d3";
import { data } from "./data/7.0-Build-146";
import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitFactoriesEnum, UnitsEnum } from "./enums";
import { graphviz, GraphvizOptions } from "d3-graphviz";

export type Settings = {
  [key in ResourcesEnum]: { key: FactoriesEnum | ExtractorsEnum }
}

type Result = {
  [key: string]: string[]
}

export function calculation(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings, result: Result = {}) {
  let factory = getCurrentFactoryForProduct(product, settings)
  let node = getCurrentFactoryNameForProduct(product, settings) + " " + product + " " + numOfFactory.toFixed(1) + " " + (getPerSec(product, settings) * numOfFactory).toFixed(1)
  if (Object.keys(result).length == 0) {
    result["Output"] = [node]
  }
  result[node] = []

  try {
    factory.input.resources.forEach((resource) => {
      let factory2 = getCurrentFactoryNameForProduct(resource.name, settings)
      let numOfFactory2 = (resource.perSecond / getPerSec(resource.name, settings)) * numOfFactory
      let numOfProduct = resource.perSecond * numOfFactory

      if (Object.values(FactoriesEnum).includes(factory2 as FactoriesEnum)) {
        calculation(resource.name, numOfFactory2, settings, result)
      }
      result[node].push(factory2 + " " + resource.name + " " + numOfFactory2.toFixed(1) + " " + numOfProduct.toFixed(1))
    })
  } catch {
    return { "Output": ["Error"] }
  }

  return abbreviate(result)
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

function abbreviate(chart: Result) {
  let buildingCount1: Record<string, [number, number]> = {}
  let buildingCount2: Record<string, [[string, number][], number]> = {}
  let result: Result = {}

  for (const key in chart) {
    if (key == "Output") {
      result["Output"] = chart["Output"]
      continue
    }

    let [factoryName, productName, numOfFactory, numOfProduct] = key.split(" ")
    let str = factoryName + " " + productName

    if (buildingCount1[str]) {
      buildingCount1[str][0] += Number(numOfFactory)

    } else {
      buildingCount1[str] = [Number(numOfFactory), Number(numOfProduct)]
    }

    chart[key].forEach((value) => {
      let [factoryName, productName, numOfFactory, numOfProduct] = value.split(" ")
      let str = factoryName + " " + productName

      if (buildingCount2[str]) {
        buildingCount2[str][0].push([key, Number(numOfProduct)])
        buildingCount2[str][1] += Number(numOfFactory)
      } else {
        buildingCount2[str] = [[[key, Number(numOfProduct)]], Number(numOfFactory)]
      }
    })
  }

  for (const key1 in buildingCount1) {
    let key = `${key1} ${buildingCount1[key1][0].toFixed(1)} ${buildingCount1[key1][1].toFixed(1)}`;
    result[key] = []
  }

  try {
    for (const key2 in buildingCount2) {
      let value = `${key2} ${buildingCount2[key2][1]}`
      buildingCount2[key2][0].forEach((keyNum) => {

        result[keyNum[0]].push(value + " " + keyNum[1])

      })
    }
  } catch {
    return { "Output": ["Error"] }
  }

  return result
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

export default function renderChart(targets: [(ResourcesEnum | UnitsEnum), number][], options: GraphvizOptions | boolean, settings: Settings) {
  const color = select("html").classed("dark") ? "white" : "black";
  select("#graph-container").selectAll("*").remove()
  select("#graph-container").append("div").attr("id", "graph")
  const div = select("#graph");

  const renderNodes = () => {
    div.selectAll(".node").each(function () {
      const node = select(this);
      const polygon = node.select("polygon");
      const points = getPolygonPoints(polygon);

      const rect = node.append("rect")
        .attr("x", points[1][0])
        .attr("y", points[1][1])
        .attr("width", getRectangleWidth(points))
        .attr("height", getRectangleHeight(points))
        .attr("stroke", color)
        .attr("rx", 4)
        .attr("fill", "rgba(0, 0, 0, 0)")
        .lower();
      polygon.remove();

      const title = node.select("title")
      const [factoryName, product] = title.text().split(" ")

      if (factoryName == "Output") {
        return
      }
      title.text(product)

      const image = node.append("image")
        .attr("x", Number(rect.attr("x")) + 2)
        .attr("y", Number(rect.attr("y")) + 2)
        .attr("height", getRectangleHeight(points) - 4)
        .attr("href", `/assets/sprites/${product}.webp`)

      node.append("image")
        .attr("x", Number(image.attr("x")) + getRectangleHeight(points) + 2)
        .attr("y", Number(image.attr("y")))
        .attr("width", getRectangleHeight(points) - 4)
        .attr("height", getRectangleHeight(points) - 4)
        .attr("href", `/assets/sprites/${factoryName}.webp`)
    });
  };

  const renderEdges = () => {
    div.selectAll(".edge").each(function () {
      const edge = select(this);
      const title = edge.select("title");
      const text = edge.select("text");
      const textFontSize = Number(text.attr("font-size")) * 2
      const textBBox = (text.node() as SVGGraphicsElement).getBBox()
      const productName = title.text().split(" ")[1];

      title.text("")
      edge.select("polygon").attr("stroke", color);
      edge.select("path").attr("stroke", color);

      edge.append("image")
        .attr("x", Number(text.attr("x")) - textBBox.width / 2 - textFontSize)
        .attr("y", Number(text.attr("y")) - textBBox.height - 4)
        .attr("width", textFontSize)
        .attr("height", textFontSize)
        .attr("href", `/assets/sprites/${productName}.webp`)
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
    `node[shape=rect label=""];`,
    `"Output" [label="Output"]`
  ]

  let targetCount: Record<string, number> = {};

  targets.forEach((target) => {
    if (targetCount[target[0]]) {
      targetCount[target[0]] += target[1];
    } else {

      targetCount[target[0]] = target[1];
    }
  });

  for (const target in targetCount) {
    let result = calculation(target as ResourcesEnum | UnitsEnum, targetCount[target], settings);

    for (const key in result) {
      result[key].forEach((value) => {
        textDot.push(`"${value.split(" ").slice(0, 3).join(" ")}" [label="                     x ${value.split(" ")[2]}"];`);
        textDot.push(`"${value.split(" ").slice(0, 3).join(" ")}" -> "${key.split(" ").slice(0, 3).join(" ")}" [label=" x ${value.split(" ")[3]}/s       "];`);
      });
    }
  }

  textDot.push("}")

  graphviz(div.node(), options).renderDot(textDot.join(""), () => {
    let svg = div.select("svg");

    svg.select("polygon").remove();
    svg.selectAll("text").attr("fill", color);

    renderNodes();
    renderEdges();

    svg.attr("class", "border-2 border-border");
    svg.attr("width", (div.node() as HTMLElement).getBoundingClientRect().width).attr("height", null);

    resizeChart()
    window.removeEventListener("resize", resizeChart)
    window.addEventListener("resize", resizeChart)
  });
}

function resizeChart() {
  let width = (select("#graph").node() as HTMLElement).getBoundingClientRect().width
  select("#graph").select("svg").attr("width", width).attr("height", width * 9 / 16);
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