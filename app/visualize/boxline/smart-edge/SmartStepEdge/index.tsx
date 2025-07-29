import React from 'react'
import { useNodes, StepEdge } from '@xyflow/react'
import { SmartEdge } from '../SmartEdge'
import {
	svgDrawStraightLinePath,
	pathfindingJumpPointNoDiagonal
} from '../functions'
import type { SmartEdgeOptions } from '../SmartEdge'
import type { EdgeProps } from '@xyflow/react'

const StepConfiguration: SmartEdgeOptions = {
	drawEdge: svgDrawStraightLinePath,
	generatePath: pathfindingJumpPointNoDiagonal,
	fallback: StepEdge
}

export function SmartStepEdge<EdgeDataType = unknown, NodeDataType = unknown>(
	props: EdgeProps<EdgeDataType>
) {
	const nodes = useNodes<NodeDataType>()

	return (
		<SmartEdge<EdgeDataType, NodeDataType>
			{...props}
			options={StepConfiguration}
			nodes={nodes}
		/>
	)
}
