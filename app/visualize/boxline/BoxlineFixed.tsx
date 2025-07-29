import * as d3 from "d3";
import { useContext, useEffect, useRef, useState } from "react";
import { getBuilding, getItem } from "@/utils";
import { SettingsContext } from "@/contexts/SettingsContext";
import SpriteImage from "@/components/SpriteImage";
import {
  BoxlineEdgeType,
  BoxlineNodeType,
  EdgeData,
  layoutBoxlineGraph,
  NodeData,
} from "./graphLayout";
import { useTranslation } from "react-i18next";

export default function BoxlineFixed({
  nodes,
  edges,
  direction,
  specialNodeLabels = ["output"],
}: {
  nodes: BoxlineNodeType[];
  edges: BoxlineEdgeType[];
  direction: string;
  specialNodeLabels?: string[];
}) {
  const [viewBox, setViewBox] = useState("0 0 1980 1080");
  const [nodesGraph, setNodesGraph] = useState<NodeData[]>([]);
  const [edgesGraph, setEdgesGraph] = useState<EdgeData[]>([]);
  const overlay = useRef<SVGGElement>(null);
  const container = useRef<SVGSVGElement>(null);

  const fitView = () => {
    if (!overlay.current || !container.current) return;
    container.current.setAttribute(
      "viewBox",
      getAspectRatioViewBox(overlay.current.getBBox(), 10)
    );
    enableSVGEvents(
      container.current,
      getAspectRatioViewBox(overlay.current.getBBox(), 10)
    );
  };

  useEffect(() => {
    if (!container.current) return;
    const layout = layoutBoxlineGraph(
      nodes,
      edges,
      direction,
      specialNodeLabels,
      container.current,
    );
    setNodesGraph(layout.nodes);
    setEdgesGraph(layout.edges);
  }, [edges, nodes, direction]);

  useEffect(() => {
    if (!overlay.current) return;

    const observer = new ResizeObserver(() => {
      if (!overlay.current || !container.current) return;
      const viewBox = getAspectRatioViewBox(overlay.current.getBBox(), 10);
      setViewBox(viewBox);
      enableSVGEvents(container.current, viewBox);
    });

    observer.observe(overlay.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <svg
        ref={container}
        viewBox={viewBox}
        className="select-none cursor-grab active:cursor-grabbing"
      >
        <g ref={overlay}>
          {nodesGraph.map((v, idx) => (
            <GraphOverlayNode key={`overlay-node-${idx}`} nodeData={v} />
          ))}
        </g>
        <g>
          {edgesGraph.map((v, idx) => (
            <GraphEdge key={`edge-${idx}`} edgeData={v} />
          ))}
        </g>
        <g>
          {nodesGraph.map((v, idx) =>
            v?.data ? (
              <GraphNode key={`node-${idx}`} nodeData={v} />
            ) : (
              <GraphLabelNode key={`node-${idx}`} nodeData={v} />
            )
          )}
        </g>
        <g>
          {nodesGraph.map(
            (v, idx) =>
              v?.data && (
                <GraphDropdown
                  key={`dropdown-${idx}`}
                  nodeData={v}
                  svgEl={container.current}
                />
              )
          )}
        </g>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="15"
            markerHeight="10"
            refX="15"
            refY="5"
            orient="auto"
          >
            <polygon points="0 0, 15 5, 0 10" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <div className="flex flex-col absolute m-4 bottom-0 left-0 fill-foreground">
        {/* <button className="w-6.5 h-6.5 p-1 flex justify-center items-center rounded-t-md bg-surface-a10 duration-200 hover:bg-surface-a20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={12}
            height={12}
          >
            <path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path>
          </svg>
        </button>
        <button className="w-6.5 h-6.5 p-1 flex justify-center items-center bg-surface-a10 duration-200 hover:bg-surface-a20 border-t border-surface-a50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 5"
            width={12}
            height={12}
          >
            <path d="M0 0h32v4.2H0z"></path>
          </svg>
        </button> */}
        {/* <button className="w-6.5 h-6.5 p-1 flex justify-center items-center rounded-b-md bg-surface-a10 duration-200 hover:bg-surface-a20 border-t border-surface-a50"> */}
        <button
          className="w-6.5 h-6.5 p-1 flex justify-center items-center rounded-md bg-surface-a10 duration-200 hover:bg-surface-a20"
          title="Fit view"
          onClick={fitView}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 30"
            width={12}
            height={12}
          >
            <path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

function GraphOverlayNode({ nodeData }: { nodeData: NodeData }) {
  const { x, y, width, height } = nodeData;

  return (
    <g>
      <rect fill="transparent" x={x} y={y} width={width} height={height}></rect>
    </g>
  );
}

function GraphLabelNode({
  nodeData,
  padding = 8,
}: {
  nodeData: NodeData;
  padding?: number;
}) {
  const { x, y, width, height } = nodeData;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1"
        rx="6"
      ></rect>
      <text x={x + padding} y={y + (height + 8) / 2} fill="currentColor">
        {nodeData.label}
      </text>
    </g>
  );
}

function GraphDropdown({
  nodeData,
  padding = 8,
  svgEl,
}: {
  nodeData: NodeData;
  padding?: number;
  svgEl: SVGSVGElement | null;
}) {
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { x, y, height, data } = nodeData;
  const { productName } = data;
  const item = getItem(productName, settings.mode);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContainer = useRef<SVGForeignObjectElement>(null);
  const showDropdownButton = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!dropdownRef.current) return;
    setDropdownRect(
      clientRectToSVGSize(dropdownRef.current.getBoundingClientRect(), svgEl)
    );
  }, [open, svgEl]);

  useEffect(() => {
    if (!svgEl) return;
    const closeDropdown = () => setOpen(false);

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as SVGElement | HTMLElement;
      if (
        !dropdownContainer.current?.contains(target) &&
        !showDropdownButton.current?.contains(target)
      )
        setOpen(false);
    };

    svgEl.addEventListener("wheel", closeDropdown);
    svgEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      svgEl.removeEventListener("wheel", closeDropdown);
      svgEl.removeEventListener("mousedown", handleMouseDown);
    };
  }, [svgEl]);

  if (item.getProducedBy().length < 2) return;

  return (
    <g>
      <rect
        ref={showDropdownButton}
        x={x + padding + 47}
        y={y + (height - 38) / 2}
        width={38}
        height={38}
        fill="transparent"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      ></rect>
      <foreignObject
        ref={dropdownContainer}
        x={x}
        y={y + height}
        width={dropdownRect.width}
        height={dropdownRect.height}
        className={`cursor-auto ${!open && "pointer-events-none"}`}
      >
        <div ref={dropdownRef} className="w-min h-min">
          <div
            className={`w-min h-min p-1 flex flex-col gap-1 bg-surface-a20 border rounded-md border-surface-a50 duration-200 origin-top ${
              open ? "" : "pointer-events-none scale-y-75 opacity-0"
            }`}
          >
            {item.getProducedBy().map((buildingId) => {
              const building = getBuilding(buildingId, settings.mode);
              return (
                <div
                  key={buildingId}
                  className={`flex gap-1 whitespace-nowrap items-center w-full h-max p-1 duration-200 rounded-md cursor-pointer ${
                    settings.gameSettings.items[item.getId()] === buildingId
                      ? "bg-primary"
                      : "hover:bg-surface-a30"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    setSettings((prev) =>
                      buildingId === prev.gameSettings.items[item.getId()]
                        ? prev
                        : {
                            ...prev,
                            gameSettings: {
                              ...prev.gameSettings,
                              items: {
                                ...prev.gameSettings.items,
                                [item.getId()]: buildingId,
                              },
                            },
                          }
                    );
                  }}
                >
                  <SpriteImage
                    row={building.getImage().row}
                    col={building.getImage().col}
                  />
                  {building.getName()}
                </div>
              );
            })}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

function GraphNode({
  nodeData,
  padding = 8,
}: {
  nodeData: NodeData;
  padding?: number;
}) {
  const [settings] = useContext(SettingsContext).settingsState;
  const { x, y, width, height, data } = nodeData;
  const { image, buildingName, numOfBuildings, productName } = data;
  const item = getItem(productName, settings.mode);
  const building = getBuilding(buildingName, settings.mode);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="currentColor"
        strokeWidth="1"
        rx="6"
        className="fill-background"
      ></rect>
      <SpriteSheetImage
        row={image.row}
        col={image.col}
        x={x + padding}
        y={y + (height - 32) / 2}
      />
      <text x={x + padding + 40} y={y + (height + 8) / 2} fill="currentColor">
        :
      </text>
      <SpriteSheetImage
        row={building.getImage().row}
        col={building.getImage().col}
        x={x + padding + 50}
        y={y + (height - 32) / 2}
      />
      <text x={x + padding + 90} y={y + (height + 8) / 2} fill="currentColor">
        x {+numOfBuildings.toFixed(3)}
      </text>
      {item.getProducedBy().length > 1 && (
        <rect
          x={x + padding + 47}
          y={y + (height - 38) / 2}
          width={38}
          height={38}
          stroke="currentColor"
          strokeWidth="1"
          rx="6"
          fill="transparent"
        ></rect>
      )}
    </g>
  );
}

function GraphEdge({
  edgeData,
  padding = 8,
}: {
  edgeData: EdgeData;
  padding?: number;
}) {
  const { targetWidth, targetHeight, points, width, height, data } = edgeData;
  const d3Line = d3
    .line<{ x: number; y: number }>()
    .x((d) => d.x + targetWidth / 2)
    .y((d) => d.y + targetHeight / 2)
    .curve(d3.curveBasis);
  const label = {
    x: points[Math.floor(points.length / 2)].x + (targetWidth - width) / 2,
    y: points[Math.floor(points.length / 2)].y + (targetHeight - height) / 2,
  };
  const { t } = useTranslation()
  const [settings] = useContext(SettingsContext).settingsState
  const item = getItem(data.productName, settings.mode)

  return (
    <g>
      <path
        d={d3Line(points ?? []) ?? ""}
        stroke="currentColor"
        strokeWidth="1"
        fill="transparent"
        markerEnd="url(#arrowhead)"
        strokeDasharray={"15 5"}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-40"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      {/* <rect
        x={label.x}
        y={label.y}
        width={width}
        height={height}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1"
      ></rect> */}
      <SpriteSheetImage
        row={item.getImage().row}
        col={item.getImage().col}
        x={padding / 2 + label.x}
        y={label.y + (height - 32) / 2}
      />
      <text x={label.x + 40} y={label.y + (height + 8) / 2} fill="currentColor">
        x {+data.products.toFixed(3)}/{t(settings.displayRate)[0]}
      </text>
    </g>
  );
}

function enableSVGEvents(svgEl: SVGSVGElement | null, viewBox: string) {
  const svg = d3.select(svgEl);
  const viewBoxValues = viewBox.split(" ").map((value) => +value);
  let scale = 1,
    x = viewBoxValues[0],
    y = viewBoxValues[1],
    width = viewBoxValues[2],
    height = viewBoxValues[3],
    dragging = false,
    prevX = x,
    prevY = y;

  function setViewBox() {
    svg.attr("viewBox", `${x} ${y} ${width} ${height}`);
  }

  function point(event: MouseEvent) {
    const clientPoint = new DOMPointReadOnly(event.clientX, event.clientY);
    return clientPoint.matrixTransform(
      (svg.node() as SVGSVGElement).getScreenCTM()!.inverse()
    );
  }

  svg.on("wheel", (event) => {
    event.preventDefault();
    const p = point(event);
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
    scale *= zoomFactor;
    width = viewBoxValues[2] * scale;
    height = viewBoxValues[3] * scale;

    x += (p.x - x) * (1 - zoomFactor);
    y += (p.y - y) * (1 - zoomFactor);

    setViewBox();
  });

  svg.on("mousedown", (event: MouseEvent) => {
    dragging = true;
    prevX = point(event).x;
    prevY = point(event).y;
  });

  d3.select("html").on("mouseup", () => {
    dragging = false;
  });

  d3.select("html").on("mousemove", (event) => {
    event.preventDefault();
    if (!dragging) return;

    const deltaX = point(event).x - prevX;
    const deltaY = point(event).y - prevY;

    x -= deltaX;
    y -= deltaY;

    setViewBox();
    prevX = point(event).x;
    prevY = point(event).y;
  });
}

function getAspectRatioViewBox(bbox: DOMRect, padding = 10) {
  let { x, y, width, height } = bbox;

  const aspectRatio = 16 / 9;

  if (width / height > aspectRatio) {
    const newHeight = width / aspectRatio;
    y -= (newHeight - height) / 2;
    height = newHeight;
  } else {
    const newWidth = height * aspectRatio;
    x -= (newWidth - width) / 2;
    width = newWidth;
  }

  return `${x - padding} ${y - padding} ${width + padding * 2} ${
    height + padding * 2
  }`;
}

function SpriteSheetImage({
  row,
  col,
  x,
  y,
  className,
  onClick,
}: {
  row: number;
  col: number;
  x: number;
  y: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      x={x}
      y={y}
      viewBox={`${col * 32} ${row * 32} 32 32`}
      width={32}
      height={32}
      className={className}
      onClick={onClick}
    >
      <image href="/spritesheet.png" width={32 * 15} height={32 * 15} />
    </svg>
  );
}

function clientRectToSVGSize(rect: DOMRect, svgElement: SVGSVGElement | null) {
  if (!svgElement) return { width: 0, height: 0 };

  const ctm = svgElement.getScreenCTM();
  if (!ctm) return { width: 0, height: 0 };

  const point = svgElement.createSVGPoint();

  point.x = rect.x;
  point.y = rect.y;
  const topLeft = point.matrixTransform(ctm.inverse());

  point.x = rect.x + rect.width;
  point.y = rect.y + rect.height;
  const bottomRight = point.matrixTransform(ctm.inverse());

  return {
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y,
  };
}
