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

import { defaultProps, ElementTree, type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import React from 'react'
import { TreeNode as TreeNodeComponent } from '@Pimcore/components/element-tree/node/tree-node'
import { PagerContainer } from '@Pimcore/modules/element/tree/pager/pager-container'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { SearchContainer } from './search/search-container'
import { withDraggable } from './node/with-draggable'
import { Skeleton } from '@Pimcore/components/element-tree/skeleton/skeleton'
import { Box } from '@Pimcore/components/box/box'
import { withDroppable } from './node/with-droppable/with-droppable'
import { withActionStates } from './node/with-action-states'
import { withDroppableStyling } from './node/with-droppable/with-droppable-styling'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { useElementTreeRootNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-root-node'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/use-component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'

export interface TreeContainerProps {
  id: number
  showRoot?: boolean
}

export const AssetTreeNode = withDroppable(withDroppableStyling(withActionStates(withDraggable(TreeNodeComponent))))

const TreeContainer = ({ id = 1, showRoot = true }: TreeContainerProps): React.JSX.Element => {
  const { openAsset } = useAssetHelper()
  const { rootNode, isLoading } = useElementTreeRootNode(id, showRoot)
  const componentRegistry = useComponentRegistry()
  const contextMenu = componentRegistry.get(componentConfig.asset.tree.contextMenu.name)

  if (showRoot && isLoading) {
    return (
      <Box padding={ 'small' }>
        <Skeleton />
      </Box>
    )
  }

  async function onSelect (node: TreeNode): Promise<void> {
    openAsset({
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <ElementTree
      contextMenu={ contextMenu as React.ElementType<TreeContextMenuProps> | undefined }
      nodeId={ id }
      onSelect={ onSelect }
      renderFilter={ SearchContainer }
      renderNode={ AssetTreeNode }
      renderNodeContent={ defaultProps.renderNodeContent }
      renderPager={ PagerContainer }
      rootNode={ rootNode }
      showRoot={ showRoot }
    />
  )
}

export { TreeContainer }
