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

import React from 'react'
import { useAppDispatch } from '@Pimcore/app/store'
import { setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useTranslation } from 'react-i18next'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'

export interface PublishHookReturn {
  publishTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  setTreeNodePublished: (nodeId: number, isPublished: boolean) => void
}

export const usePublish = (elementType: ElementType): PublishHookReturn => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()

  const isPublishHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Publish) || node.isLocked || node.isPublished === true
  }

  const setTreeNodePublished = (nodeId: number, isPublished: boolean): void => {
    dispatch(setNodePublished({ nodeId: String(nodeId), elementType, isPublished }))
  }

  const publishTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.publish'),
      key: 'publish',
      icon: <Icon value='eye' />,
      hidden: isPublishHidden(node),
      onClick: () => {
        console.log('TBI')
      }
    }
  }

  return {
    setTreeNodePublished,
    publishTreeContextMenuItem
  }
}
