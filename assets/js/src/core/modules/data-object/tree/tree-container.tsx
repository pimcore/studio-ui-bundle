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
import { TreeNode as TreeNodeComponent } from '@Pimcore/components/element-tree/node/tree-node'
import { SearchContainer } from './search/search-container'
import { withDraggable } from './node/with-draggable'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { DataObjectTreeContextMenu } from '@Pimcore/modules/data-object/tree/context-menu/context-menu'
import { PagerContainer } from '@Pimcore/modules/element/tree/pager/pager-container'
import { useTranslation } from 'react-i18next'
import { type ElementIcon, useDataObjectGetTreeQuery } from '../data-object-api-slice.gen'
import { transformApiDataToNodes } from './utils/transform-api-data-to-node'
import { Box } from '@Pimcore/components/box/box'
import { Skeleton } from '@Pimcore/components/element-tree/skeleton/skeleton'
import { withDroppable } from './node/with-droppable/with-droppable'
import { withDroppableStyling } from './node/with-droppable/with-droppable-styling'
import { withActionStates } from './node/with-action-states'
import { useTreeFilter } from '@Pimcore/modules/element/tree/provider/tree-filter-provider/use-tree-filter'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { NodeApiHookProvider } from '@Pimcore/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider'

export interface TreeContainerProps {
  id: number
  showRoot?: boolean
}

export interface IDefaultRootNodeProps {
  icon: ElementIcon
  level: number
  isRoot: true
}

const defaultRootNodeProps: IDefaultRootNodeProps = {
  icon: { type: 'name', value: 'home-root-folder' },
  level: -1,
  isRoot: true
}

const TreeContainer = ({ id = 1, showRoot = true }: TreeContainerProps): React.JSX.Element => {
  const { openDataObject } = useDataObjectHelper()
  const { pageSize: pagingLimit } = useTreeFilter()
  const rootNodePqlQuery = id === 1 ? undefined : 'id = ' + id
  const { isLoading, data: rootNodeData } = useDataObjectGetTreeQuery({ pageSize: 1, page: 1, excludeFolders: false, pathIncludeParent: true, pathIncludeDescendants: false, pqlQuery: rootNodePqlQuery }, { skip: !showRoot })
  const { t } = useTranslation()

  if (showRoot && (isLoading || rootNodeData === undefined)) {
    return (
      <Box padding={ 'small' }>
        <Skeleton />
      </Box>
    )
  }

  const createRootNode = (): TreeNode | undefined => {
    if (!showRoot || rootNodeData === undefined) {
      return undefined
    }

    const transformedNodes = transformApiDataToNodes(
      {
        id: '0',
        internalKey: '0'
      },
      rootNodeData,
      pagingLimit
    )
    const transformedRootNode = transformedNodes.nodes[0]
    const rootNodeId = transformedRootNode.id

    return {
      ...transformedRootNode,
      ...defaultRootNodeProps,
      label: rootNodeId === '1' ? t('home') : transformedRootNode.label,
      icon: rootNodeId === '1' ? defaultRootNodeProps.icon : transformedRootNode.icon,
      permissions: {
        ...transformedRootNode.permissions,
        delete: false,
        rename: false,
        unpublish: false
      }
    }
  }

  const rootNode: TreeNode | undefined = createRootNode()

  async function onSelect (node: TreeNode): Promise<void> {
    openDataObject({
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <NodeApiHookProvider nodeApiHook={ useNodeApiHook }>
      <ElementTree
        contextMenu={ DataObjectTreeContextMenu }
        nodeId={ id }
        onSelect={ onSelect }
        renderFilter={ SearchContainer }
        renderNode={ withDroppable(withDroppableStyling(withActionStates(withDraggable(TreeNodeComponent)))) }
        renderNodeContent={ defaultProps.renderNodeContent }
        renderPager={ PagerContainer }
        rootNode={ rootNode }
      />
    </NodeApiHookProvider>
  )
}

export { TreeContainer }
