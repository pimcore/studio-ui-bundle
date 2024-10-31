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

import { defaultProps, ElementTree } from '@Pimcore/components/element-tree/element-tree'
import React from 'react'
import { useNodeApiHook } from './hooks/use-node-api-hook'
import { TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { SearchContainer } from './search/search-container'
import { withDraggable } from './node/with-draggable'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { DataObjectTreeContextMenu } from '@Pimcore/modules/data-object/tree/context-menu/context-menu'
import { PagerContainer } from '@Pimcore/modules/element/tree/pager/pager-container'

export interface TreeContainerProps {
  id: number
}

const TreeContainer = ({ id = 1, ...props }: TreeContainerProps): React.JSX.Element => {
  const { openDataObject } = useDataObjectHelper()

  async function onSelect (node: TreeNodeProps): Promise<void> {
    openDataObject({
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <ElementTree
      contextMenu={ DataObjectTreeContextMenu }
      maxItemsPerNode={ 20 }
      nodeApiHook={ useNodeApiHook }
      nodeId={ id }
      onSelect={ onSelect }
      renderFilter={ SearchContainer }
      renderNode={ withDraggable(TreeNode) }
      renderNodeContent={ defaultProps.renderNodeContent }
      renderPager={ PagerContainer }
    />
  )
}

export { TreeContainer }
