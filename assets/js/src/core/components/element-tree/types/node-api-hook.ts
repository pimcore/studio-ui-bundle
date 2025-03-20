/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
