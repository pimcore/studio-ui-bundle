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
import { PagerContainer } from '@Pimcore/modules/element/tree/pager/pager-container'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { SearchContainer } from './search/search-container'
import { withDraggable } from './node/with-draggable'
import { AssetTreeContextMenu } from '@Pimcore/modules/asset/tree/context-menu/context-menu'

export interface TreeContainerProps {
  id: number
}

const TreeContainer = ({ id = 1, ...props }: TreeContainerProps): React.JSX.Element => {
  const { openAsset } = useAssetHelper()

  async function onSelect (node: TreeNodeProps): Promise<void> {
    openAsset({
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <ElementTree
      contextMenu={ AssetTreeContextMenu }
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
