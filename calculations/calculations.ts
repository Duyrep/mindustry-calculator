import { BaseType, select, Selection, text, zoom } from "d3";
import { data } from "./data/7.0-Build-146";
import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitsEnum } from "./enums";
import { graphviz, GraphvizOptions } from "d3-graphviz";
import { getEventListeners } from "events";

type Settings = {
  [key in ResourcesEnum]: { key: FactoriesEnum | ExtractorsEnum }
}

type Result = {
  [key: string]: string[]
}

export function factoryCalculation(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings, result: Result = {}) {
  const getPerSec = (product: ResourcesEnum | UnitsEnum): number => {
    let factory = getCurrentFactoryForProduct(product, settings);
    const resource = factory.output.resources.find((value) => value.name === product);
    return resource ? resource.perSecond : 0;
  }  

  let factory = getCurrentFactoryForProduct(product, settings)
  let node = getCurrentFactoryNameForProduct(product, settings) + " " + product + " " + numOfFactory.toFixed(1) + " " + (getPerSec(product) * numOfFactory).toFixed(1)
  if (Object.keys(result).length == 0) {
    result["Output"] = [node]
  }
  result[node] = []

  try {
    factory.input.resources.forEach((resource) => {
      let factory2 = getCurrentFactoryNameForProduct(resource.name, settings)
      let numOfFactory2 = resource.perSecond / getPerSec(resource.name)
      let numOfProduct = resource.perSecond * numOfFactory
      
      if (Object.values(FactoriesEnum).includes(factory2 as FactoriesEnum)) {
        factoryCalculation(resource.name, numOfFactory2, settings, result)
      }
      result[node].push(factory2 + " " + resource.name + " " + numOfFactory2.toFixed(1) + " " + numOfProduct.toFixed(1))
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
        .attr("height", getRectangleHeight(points) - 4)
        .attr("href", `/assets/sprites/${factoryName}.webp`)
    });
  };

  const renderEdges = () => {
    div.selectAll(".edge").each(function () {
      const edge = select(this);
      edge.select("polygon").attr("stroke", color);
      edge.select("path").attr("stroke", color);
      edge.select("title").text("")
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
    `ranksep=1.5`,
    `"Output" [label="Output"]`
  ]

  targets.forEach((target) => {
    let result = factoryCalculation(target, 1, settings);
    console.log(result)
    for (const key in result) {
      result[key].forEach((value) => {
        textDot.push(`"${value}" [label="                     x ${value.split(" ")[2]}"];`)
        textDot.push(`"${value}" -> "${key}" [label=" x${value.split(" ")[3]}    "];`)
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