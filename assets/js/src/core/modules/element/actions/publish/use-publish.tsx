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

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Element } from '../../element-helper'
import { useElementHelper } from '../../hooks/use-element-helper'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import { ContextMenuActionName } from '..'

export interface PublishHookReturn {
  publishTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  publishNode: (node: TreeNodeProps | Element) => void
}

export const usePublish = (elementType: ElementType): PublishHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const { executeElementTask } = useElementHelper()

  const isPublishHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Publish) || node.isLocked || node.isPublished === true
  }

  const publishNode = (node: TreeNodeProps | Element): void => {
    const nodeId = typeof node.id === 'string' ? parseInt(node.id) : node.id
    executeElementTask(elementType, nodeId, SaveTaskType.Publish)
  }

  const publishTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.publish'),
      key: ContextMenuActionName.publish,
      icon: <Icon value='eye' />,
      hidden: isPublishHidden(node),
      onClick: () => {
        publishNode(node)
      }
    }
  }

  return {
    publishNode,
    publishTreeContextMenuItem
  }
}
