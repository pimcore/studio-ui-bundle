import { TreeNode } from "../element-tree-slice"
import { DataObjectGetTreeApiResponse } from "@Pimcore/modules/data-object/data-object-api-slice.gen"
import { AssetGetTreeApiResponse } from "src/sdk/main"
import { NodeState } from "../hooks/use-element-tree"

export type NodeApiHook = (node: DataTransformerSourceNode, pageSize?: number) => NodeApiHookReturnType

export interface DataTransformerSourceNode {
    id: string
    internalKey: string
}

export interface DataTransformerReturnType {
  nodes: TreeNode[]
  total: number
}

export interface NodeApiHookReturnType {
    fetchApiHookResult: (nodeState: NodeState) => Promise<DataTransformerReturnType | undefined>
    dataTransformer: (data: DataObjectGetTreeApiResponse|AssetGetTreeApiResponse) => DataTransformerReturnType
  }