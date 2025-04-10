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

import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useAppDispatch } from '@Pimcore/app/store'
import { refreshNodeChildren, setNodeExpanded } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useTreeId } from '../../tree/provider/tree-id-provider/use-tree-id'
import { ContextMenuActionName } from '..'

export interface UseRefreshTreeHookReturn {
  refreshTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  refreshTree: (parentId: number) => void
}

export const useRefreshTree = (elementType: ElementType): UseRefreshTreeHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId(true)

  const refreshTree = (parentId: number): void => {
    dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType }))
  }

  const refreshTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.refresh'),
      key: ContextMenuActionName.refresh,
      icon: <Icon value={ 'refresh' } />,
      hidden: !isTreeActionAllowed(TreePermission.Refresh),
      onClick: () => {
        refreshTree(parseInt(node.id))
        dispatch(setNodeExpanded({ treeId, nodeId: String(node.id), expanded: true }))
      }
    }
  }

  return {
    refreshTree,
    refreshTreeContextMenuItem
  }
}
