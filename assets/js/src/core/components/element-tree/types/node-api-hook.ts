/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TreeNode } from '../element-tree-slice'
import { type NodeState } from '../hooks/use-element-tree-node'

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
  fetchRoot: (id: number) => Promise<DataTransformerReturnType | undefined>
  fetchChildren: (node: DataTransformerSourceNode, nodeState: NodeState) => Promise<DataTransformerReturnType | undefined>
}
