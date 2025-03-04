import { TreeNode } from "../element-tree-slice"
import { NodeState } from "../hooks/use-element-tree-node"

export type NodeApiHook = () => NodeApiHookReturnType

export interface DataTransformerSourceNode {
    id: string
    internalKey: string
}

export interface DataTransformerReturnType {
  nodes: TreeNode[]
  total: number
}

export interface NodeApiHookReturnType {
    fetchApiHookResult: (node: DataTransformerSourceNode, nodeState: NodeState) => Promise<DataTransformerReturnType | undefined>
  }