/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { defaultTreeProps, ElementTree, type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import React from 'react'
import { TreeNode as TreeNodeComponent } from '@Pimcore/components/element-tree/node/tree-node'
import { PagerContainer } from '@Pimcore/components/element-tree/pager/pager-container'
import { assetOpeningService } from '@Pimcore/modules/asset/services/asset-opening-service'
import { SearchContainer } from './search/search-container'
import { withDraggable } from './node/with-draggable'
import { Skeleton } from '@Pimcore/components/element-tree/skeleton/skeleton'
import { Box } from '@Pimcore/components/box/box'
import { withDroppable } from './node/with-droppable/with-droppable'
import { withActionStates } from './node/with-action-states'
import { withDroppableStyling } from '@Pimcore/modules/element/tree/node/with-droppable/with-droppable-styling'
import { setNodeOpeningInAllTree, type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { useElementTreeRootNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-root-node'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/use-component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { useAppDispatch } from '@sdk/app'
import { withDndUpload } from './node/with-dnd-upload'
import { withContextMenu } from './node/with-context-menu'

export interface TreeContainerProps {
  id: number
  showRoot?: boolean
}

export const AssetTreeNode = withDroppableStyling(withDroppable((withDndUpload(withActionStates(withDraggable(withContextMenu(TreeNodeComponent)))))))

const TreeContainer = ({ id = 1, showRoot = true }: TreeContainerProps): React.JSX.Element => {
  const { rootNode, isLoading } = useElementTreeRootNode(id, showRoot)
  const componentRegistry = useComponentRegistry()
  const dispatch = useAppDispatch()
  const contextMenu = componentRegistry.get(componentConfig.asset.tree.contextMenu.name)

  if (showRoot && isLoading) {
    return (
      <Box padding={ 'small' }>
        <Skeleton />
      </Box>
    )
  }

  async function onSelect (node: TreeNode): Promise<void> {
    dispatch(setNodeOpeningInAllTree({ nodeId: node.id, elementType: 'asset', opening: true }))

    try {
      await assetOpeningService.openAsset({
        id: parseInt(node.id)
      })
    } finally {
      dispatch(setNodeOpeningInAllTree({ nodeId: node.id, elementType: 'asset', opening: false }))
    }
  }

  return (
    <ElementTree
      contextMenu={ contextMenu as React.ElementType<TreeContextMenuProps> | undefined }
      nodeId={ id }
      onSelect={ onSelect }
      renderFilter={ SearchContainer }
      renderNode={ AssetTreeNode }
      renderNodeContent={ defaultTreeProps.renderNodeContent }
      renderPager={ PagerContainer }
      rootNode={ rootNode }
      showRoot={ showRoot }
      tooltipSlotName={ componentConfig.asset.tree.tooltip.name }
    />
  )
}

export { TreeContainer }
