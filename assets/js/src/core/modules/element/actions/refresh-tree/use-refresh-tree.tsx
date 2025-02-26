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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../tree/provider/tree-permission-provider/tree-permission-enum'

export interface UseRefreshTreeHookReturn {
  refreshTree: (parentId: number) => void
  refreshTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  refreshContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
}

export const useRefreshTree = (elementType: ElementType): UseRefreshTreeHookReturn => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()

  const refreshTree = (parentId: number): void => {
    if (elementType === 'asset') {
      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(parentId)
        )
      )
    } else if (elementType === 'data-object') {
      dispatch(
        dataObjectApi.util.invalidateTags(
          invalidatingTags.DATA_OBJECT_TREE_ID(parentId)
        )
      )
    }
  }

  const refreshTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.refresh'),
      key: 'refresh',
      icon: <Icon value={ 'refresh' } />,
      hidden: !isTreeActionAllowed(TreePermission.Refresh),
      onClick: () => {
        refreshTree(parseInt(node.id))
      }
    }
  }

  const refreshContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.tree.refresh'),
      key: 'refresh',
      icon: <Icon value={ 'refresh' } />,
      onClick: () => {
        refreshTree(node.parentId)
        onFinish?.()
      }
    }
  }

  return {
    refreshTree,
    refreshTreeContextMenuItem,
    refreshContextMenuItem
  }
}
