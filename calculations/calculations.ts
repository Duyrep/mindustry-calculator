import { BaseType, select, Selection } from "d3";
import { data } from "./data/7.0-Build-146";
import { ExtractorsEnum, FactoriesEnum, ResourcesEnum, UnitsEnum } from "./enums";
import { graphviz, GraphvizOptions } from "d3-graphviz";

type Settings = {
  [key in ResourcesEnum]: { key: FactoriesEnum | ExtractorsEnum }
}

export function factoryCalculation(product: ResourcesEnum | UnitsEnum, numOfFactory: number, settings: Settings) {
  let factory = getCurrentFactoryForProduct(product, settings)
  console.log(factory)
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

export default function renderChart(options: GraphvizOptions | boolean, settings: Settings) {
  const color = select("html").classed("dark") ? "white" : "black";
  const div = select("#graph-container");

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

  graphviz(div.node(), options).renderDot(`digraph {node [shape=rect]; a->b}`, () => {
    let svg = div.select("svg");

    svg.select("polygon").remove();
    svg.selectAll("text").attr("fill", color);

    renderNodes();
    renderEdges();

    const { width, height } = (div.node() as HTMLDivElement).getBoundingClientRect();
    svg.attr("width", width).attr("height", height);
  });
}

export function resizeChart() {
  let div = select("#graph-container");
  let svg = div.select("svg");
  svg
    .attr("width", (div.node() as HTMLDivElement).getBoundingClientRect().width)
    .attr("height", (div.node() as HTMLDivElement).getBoundingClientRect().height)
}

function getCurrentFactoryForProduct(product: ResourcesEnum | UnitsEnum, settings: Settings) {
  if (Object.values(UnitsEnum).includes(product as UnitsEnum)) {
    return data.factories[data.units[product as UnitsEnum].key];
  } else {
    return data.factories[settings[product as ResourcesEnum].key as FactoriesEnum];
  }
}