/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  useReactFlow,
  MarkerType,
  BaseEdge,
  EdgeLabelRenderer,
  useNodes,
  getConnectedEdges,
} from "@xyflow/react";
import type {
  NodeChange,
  EdgeChange,
  NodeProps,
  EdgeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./reactflow.css";
import {
  BoxlineEdgeType,
  BoxlineNodeType,
  layoutBoxlineGraph,
  VisualizeEdgeData,
  VisualizeNodeData,
} from "./graphLayout";
import SpriteImage from "@/components/SpriteImage";
import { useTranslation } from "react-i18next";
import { getBuilding, getItem } from "@/utils";
import { SettingsContext } from "@/context/SettingsContext";
import {
  getSmartEdge,
  pathfindingAStarDiagonal,
  svgDrawSmoothLinePath,
} from "./smart-edge";

type BoxlineFlowNode = {
  id: string;
  data: VisualizeNodeData & Record<string, unknown> & { direction: string };
} & Node;

type BoxlineFlowEdge = {
  id: string;
  source: string;
  target: string;
  data: VisualizeEdgeData &
    Record<string, unknown> & {
      width: number;
      height: number;
    };
} & Edge;

export default function BoxlineFlow({
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
  const [graphNodes, setGraphNodes] = useState<BoxlineFlowNode[]>([]);
  const [graphEdges, setGraphEdges] = useState<BoxlineFlowEdge[]>([]);
  const { fitView } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setGraphNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as BoxlineFlowNode[]
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setGraphEdges(
        (nodesSnapshot) =>
          applyEdgeChanges(changes, nodesSnapshot) as BoxlineFlowEdge[]
      ),
    []
  );

  useEffect(() => {
    const layout = layoutBoxlineGraph(
      nodes,
      edges,
      direction,
      specialNodeLabels
    );
    console.log("layout", layout);
    setGraphNodes(
      layout.nodes.map((node, idx) => ({
        id: node.label ?? "" + idx,
        position: { x: node.x, y: node.y },
        data: { ...node.data, label: node.label, direction },
        width: node.width,
        height: node.height,
        type: "custom",
      }))
    );

    setGraphEdges(
      layout.edges.map((edge) => ({
        id: edge.id,
        target: edge.target,
        source: edge.source,
        targetHandle: edge.target+edge.id+"target",
        sourceHandle: edge.source+edge.id+"source",
        data: { ...edge.data, width: edge.width, height: edge.height },
        animated: true,
        type: "custom",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
        },
      }))
    );

    fitView();
  }, [nodes, edges, direction]);

  useEffect(() => {
    const resizeHandler = () => fitView();
    window.addEventListener("resize", resizeHandler, true);

    return () => window.removeEventListener("resize", resizeHandler, true);
  }, []);

  return (
    <ReactFlow
      minZoom={0.1}
      nodeTypes={{
        custom: CustomNode,
      }}
      edgeTypes={{
        custom: CustomEdge,
      }}
      nodes={graphNodes}
      edges={graphEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      style={{
        color: "var(--foreground)",
      }}
    >
      <Controls />
    </ReactFlow>
  );
}

function CustomNode({ id, data }: NodeProps & BoxlineNodeType) {
  const { t } = useTranslation();
  const [settings, setSettings] = useContext(SettingsContext).settingsState;
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const showDropdownButton = useRef<HTMLDivElement>(null);
  const { getNodes, getEdges } = useReactFlow();
  const item = getItem(data.productName, settings.mode);
  const building = getBuilding(data.buildingName, settings.mode);

  const node = getNodes().find((n) => n.id === id);
  const connectedEdges = getConnectedEdges(node ? [node] : [], getEdges());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | SVGElement;
      if (
        !dropdown.current?.contains(target) &&
        !showDropdownButton.current?.contains(target)
      )
        setOpen(false);
    };

    document.addEventListener("click", handleClick, true);

    return document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {connectedEdges.map((edge) => (
        <Handle
          key={edge.id}
          id={id+edge.id+"target"}
          type="target"
          position={data.direction === "TB" ? Position.Top : Position.Left}
        />
      ))}
      <div className="w-full h-full flex justify-center items-center border border-foreground rounded-md">
        {data.label === "output" ? (
          <span>{t("Output")}</span>
        ) : data.label === "surplus" ? (
          <span>{t("Surplus")}</span>
        ) : (
          <div className="flex items-center gap-1.5">
            <SpriteImage row={data.image.row} col={data.image.col} />
            <span>:</span>
            <div
              ref={showDropdownButton}
              className={`p-0.5 ${
                item.getProducedBy().length > 1 &&
                " rounded-md cursor-pointer  duration-200 border border-foreground hover:border-primary"
              }`}
              onClick={() => setOpen((prev) => !prev)}
            >
              <SpriteImage
                row={building.getImage().row}
                col={building.getImage().col}
              />
            </div>
            <span>x {+data.numOfBuildings.toFixed(3)}</span>
          </div>
        )}
      </div>
      {item.getProducedBy().length > 1 && (
        <div
          ref={dropdown}
          className={`absolute my-1 cursor-auto ${
            !open && "pointer-events-none"
          }`}
        >
          <div
            className={`p-1 flex flex-col gap-1 bg-surface-a20 rounded-md border border-surface-a50 duration-200 origin-top ${
              !open && "scale-y-75 opacity-0"
            }`}
          >
            {item.getProducedBy().map((buildingId) => {
              const building = getBuilding(buildingId, settings.mode);
              return (
                <div
                  key={buildingId}
                  className={`flex items-center gap-1 p-1 cursor-pointer whitespace-nowrap rounded-md duration-200 ${
                    settings.gameSettings.items[item.getId()] === buildingId
                      ? "bg-primary text-background"
                      : "hover:bg-surface-a30"
                  }`}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      gameSettings: {
                        ...prev.gameSettings,
                        items: {
                          ...prev.gameSettings.items,
                          [item.getId()]: buildingId,
                        },
                      },
                    }))
                  }
                >
                  <SpriteImage
                    row={building.getImage().row}
                    col={building.getImage().col}
                  />
                  <span>{t(building.getName())}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {connectedEdges.map((edge) => (
        <Handle
          key={edge.id}
          id={id+edge.id+"source"}
          type="source"
          position={data.direction === "TB" ? Position.Bottom : Position.Right}
        />
      ))}
    </>
  );
}

function CustomEdge({
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps & BoxlineFlowEdge) {
  // const [edgePath, labelX, labelY] = getBezierPath({
  //   sourceX,
  //   sourceY,
  //   sourcePosition,
  //   targetX,
  //   targetY,
  //   targetPosition,
  // });
  const { width, height } = data;

  const nodes = useNodes();

  const smartResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    options: {
      drawEdge: svgDrawSmoothLinePath,
      generatePath: pathfindingAStarDiagonal,
    },
    nodes,
  });

  if (!smartResponse) {
    return;
  }

  return (
    <>
      <BaseEdge
        path={smartResponse.svgPathString}
        labelX={smartResponse.edgeCenterX}
        labelY={smartResponse.edgeCenterY}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          className="react-flow__edgelabel-renderer-item absolute flex items-center gap-1 whitespace-nowrap"
          style={{
            transform: "translate(-50%, -50%)",
            top: smartResponse.edgeCenterY,
            left: smartResponse.edgeCenterX,
            width,
            height,
          }}
        >
          <SpriteImage row={data.image.row} col={data.image.col} />
          <span>x {+data.products.toFixed(3)}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
