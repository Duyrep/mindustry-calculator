import React from 'react'
import { useNodes, BezierEdge } from '@xyflow/react'
import { SmartEdge } from '../SmartEdge'
import { svgDrawSmoothLinePath, pathfindingAStarDiagonal } from '../functions'
import type { SmartEdgeOptions } from '../SmartEdge'
import type { EdgeProps } from '@xyflow/react'

const BezierConfiguration: SmartEdgeOptions = {
	drawEdge: svgDrawSmoothLinePath,
	generatePath: pathfindingAStarDiagonal,
	fallback: BezierEdge
}

export function SmartBezierEdge<EdgeDataType = unknown, NodeDataType = unknown>(
	props: EdgeProps<EdgeDataType>
) {
	const nodes = useNodes<NodeDataType>()

	return (
		<SmartEdge<EdgeDataType, NodeDataType>
			{...props}
			options={BezierConfiguration}
			nodes={nodes}
		/>
	)
}
