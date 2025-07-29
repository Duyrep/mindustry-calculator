import dagre from "@dagrejs/dagre";
import * as d3 from "d3";

export interface VisualizeNodeData {
  productName: string;
  buildingName: string;
  numOfBuildings: number;
  image: {
    row: number;
    col: number;
  };
}

export interface VisualizeEdgeData {
  productName: string;
  products: number;
  image: {
    row: number;
    col: number;
  };
}

export interface NodeData extends dagre.Node {
  data: VisualizeNodeData & Record<string, unknown>;
}

export interface EdgeData extends dagre.GraphEdge {
  width: number;
  height: number;
  targetWidth: number;
  targetHeight: number;
  data: VisualizeEdgeData & Record<string, unknown>;
}

export interface BoxlineNodeType {
  id: string;
  data: VisualizeNodeData & Record<string, unknown>;
}

export interface BoxlineEdgeType {
  source: string;
  target: string;
  data: VisualizeEdgeData & Record<string, unknown>;
}

export function layoutBoxlineGraph(
  nodes: BoxlineNodeType[],
  edges: BoxlineEdgeType[],
  direction: string = "LR",
  specialNodeLabels: string[] = ["output"],
  svgElement?: SVGSVGElement,
  nodeHeight: number = 48,
  edgeHeight: number = 48
) {
  let svg = null;
  if (!svgElement) {
    svg = d3.select("html").append("svg");
  }

  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({ rankdir: direction });
  g.setDefaultEdgeLabel(() => ({}));

  specialNodeLabels.forEach((label) => {
    g.setNode(label, {
      label: label,
      width:
        getLabelWidth(
          label[0].toUpperCase() + label.slice(1),
          svgElement ?? svg?.node() ?? null
        ) + 16,
      height: nodeHeight,
    });
  });

  nodes.forEach((node) =>
    g.setNode(node.id, {
      label: node.id,
      width:
        getLabelWidth(
          +node.data.numOfBuildings.toFixed(3) + "",
          svgElement ?? svg?.node() ?? null
        ) + 118,
      height: nodeHeight,
      data: node.data,
    })
  );

  edges.forEach((edge, idx) =>
    g.setEdge(
      edge.source,
      edge.target,
      {
        id: `${edge.source}-${edge.target}-${idx}`,
        source: edge.source,
        target: edge.target,
        targetWidth: g.node(edge.target).width,
        targetHeight: nodeHeight,
        width:
          getLabelWidth(
            +edge.data.products.toFixed(3) + "/s",
            svgElement ?? svg?.node() ?? null
          ) + 60,
        height: edgeHeight,
        data: edge.data,
      },
      `${edge.source}-${edge.target}-${idx}`
    )
  );

  dagre.layout(g);
  svg?.remove();

  return {
    nodes: g.nodes().map((v) => g.node(v) as NodeData),
    edges: g.edges().map((v) => g.edge(v) as EdgeData),
  };
}

function getLabelWidth(text: string, svgEl: SVGSVGElement | null) {
  const svg = d3.select(svgEl);
  const textEl = svg.append("text");
  const width = textEl.text(text).node()?.getBBox().width ?? 0;
  textEl.remove();
  return width;
}
