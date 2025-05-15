/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { TreeContext } from '../element-tree'
import { useElementTreeNode } from '../hooks/use-element-tree-node'
import { isUndefined } from 'lodash'

interface TreeListNodeProps {
  nodeId: string
  level: number
}

export const TreeListNode = ({ nodeId, level }: TreeListNodeProps): React.JSX.Element => {
  const { renderNode: RenderNode } = useContext(TreeContext)
  const node = useElementTreeNode(nodeId)

  if (isUndefined(node.treeNodeProps)) {
    return <></>
  }

  return (
    <RenderNode
      { ...node.treeNodeProps }
      level={ level }
    />
  )
}
