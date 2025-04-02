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
