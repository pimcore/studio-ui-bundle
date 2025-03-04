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
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useElementTree } from '@Pimcore/components/element-tree/hooks/use-element-tree'

export interface UseRefreshTreeHookReturn {
  refreshTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useRefreshTree = (elementType: ElementType): UseRefreshTreeHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const { refreshChildren } = useElementTree()

  const refreshTree = (parentId: number, forceLoading?: boolean): void => {
    refreshChildren(String(parentId), forceLoading ?? true)
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

  return {
    refreshTreeContextMenuItem
  }
}
