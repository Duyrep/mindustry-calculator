import { BaseType, select, Selection, text } from "d3";
import { ResourcesEnum, UnitsEnum } from "./enums";
import { graphviz, GraphvizOptions } from "d3-graphviz";
import { calculate, calculateProduct, Settings } from "./calculations";

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
      const productName = title.text().split(" ")[1].split("->")[0];

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
    `ranksep=1;`,
    `"Output" [label="Output"];`
  ]

  let result = calculate(targets, settings)
  for (const key in result) {
    textDot.push(`"${key}"[label="                    x ${+result[key].numOfFactory.toFixed(1)}"];`)
    result[key].to.forEach((value) => {
      textDot.push(`"${key}" -> "${value.name}"[label=" x ${+value.numOfProductPerSec.toFixed(2)}         "]`)
    })
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