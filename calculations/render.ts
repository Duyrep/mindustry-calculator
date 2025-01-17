import { BaseType, select, Selection} from "d3";
import { calculate, Settings } from "./calculation";
import { graphviz, GraphvizOptions } from "d3-graphviz"
import { ResourcesEnum } from "./enums";

export function renderChart(numOfBuildings: number, target: undefined | ResourcesEnum, settings: Settings) {
  deleteChart()

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
        .attr("rx", 4)
        .attr("fill", "rgba(0, 0, 0, 0)")
        .lower();
      polygon.remove();

      const title = node.select("title")
      const [buildingName, product] = title.text().split(" ")

      if (buildingName == "Output" || buildingName == "Surplus") {
        return
      }
      // title.text(product)

      const image = node.append("image")
        .attr("x", Number(rect.attr("x")) + 2)
        .attr("y", Number(rect.attr("y")) + 2)
        .attr("height", getRectangleHeight(points) - 4)
        .attr("href", `/assets/sprites/${product ? product : buildingName + "Output"}.webp`)

      node.append("image")
        .attr("x", Number(image.attr("x")) + getRectangleHeight(points) + 2)
        .attr("y", Number(image.attr("y")))
        .attr("width", getRectangleHeight(points) - 4)
        .attr("height", getRectangleHeight(points) - 4)
        .attr("href", `/assets/sprites/${buildingName}.webp`)
    });
  };

  const renderEdges = () => {
    div.selectAll(".edge").each(function () {
      const edge = select(this);
      const title = edge.select("title");
      const text = edge.select("text");
      const textFontSize = Number(text.attr("font-size")) * 2
      const textBBox = (text.node() as SVGGraphicsElement).getBBox()
      const aTitle = edge.select("g").select("a").attr("title").split(" ")
      const [link, productName] = aTitle

      edge.select("path").attr("stroke", "")
      edge.select("polygon").attr("stroke", "")

      title.text("")

      edge.select("text")
        .attr("x", textBBox.x)

      edge.append("image")
        .attr("x", (+text.attr("x") - textBBox.width / 2 - textFontSize) + 28)
        .attr("y", +text.attr("y") - textBBox.height - 4)
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
    `node[shape=rect];`,
    `edge[labeldistance=0.5];`,
    `rankdir="${settings.graphDirection}";`,
    `ranksep=1;`,
    `"Output"`
  ]

  if (target) {
    const result = calculate(numOfBuildings, target, settings)
    Object.keys(result).forEach((key) => {
      textDot.push(
        `"${key}"[label="        :           x ${+result[key].numOfBuildings.toFixed(1)}" tooltip="${result[key].link}"];`
      )
      result[key].to.forEach(({ name, productName, numOfProductsPerSec }) => {
        textDot.push(
          `"${key}" -> "${name}"[label="         x ${+numOfProductsPerSec.toFixed(3)}/s" tooltip="${result[key].link} ${productName}"];`
        )
      })
    })
  }

  textDot.push("}")
  const div = select("#graph-container-secondary")
  const option: GraphvizOptions = {
    useWorker: false,
    zoom: !isMobile(),
    growEnteringEdges: false,
    tweenShapes: false,
    tweenPaths: false,
    zoomScaleExtent: [0.9, 4],
  }
  graphviz(div.node(), option).renderDot(textDot.join(""), () => {
    let svg = div.select("svg");

    svg.attr("width", (div.node() as HTMLElement).getBoundingClientRect().width).attr("height", null);
    svg.attr("class", "border-2 border-border")
    svg.select("polygon").remove()

    renderNodes()
    renderEdges()

    resizeChart()
    window.removeEventListener("resize", resizeChart)
    window.addEventListener("resize", resizeChart)
  })
}

function deleteChart() {
  select("#graph-container-main").select("*").remove()
  select("#graph-container-main").append("div").attr("id", "graph-container-secondary")
}

function resizeChart() {
  let width = (select("#graph-container-secondary").node() as HTMLElement).getBoundingClientRect().width
  select("#graph-container-secondary").select("svg").attr("width", width).attr("height", width * 9 / 16);
}

function isMobile() {
  if (typeof navigator !== "undefined") {
    return /mobile|android|touch|webos/i.test(
      navigator.userAgent.toLowerCase()
    );
  } else {
    return false
  }
}