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
import { useElementHelper } from '../../hooks/use-element-helper'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'

interface UseUnpublishHookReturn {
  unpublishTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useUnpublish = (elementType: ElementType): UseUnpublishHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const { executeElementTask } = useElementHelper()

  const isUnpublishHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Unpublish) || node.isLocked || node.isPublished === false
  }

  const unpublishTreeNode = (node: TreeNodeProps): void => {
    const nodeId = parseInt(node.id)
    executeElementTask(elementType, nodeId, 'unpublish')
  }

  const unpublishTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unpublish'),
      key: 'unpublish',
      icon: <Icon value='eye-off' />,
      hidden: isUnpublishHidden(node),
      onClick: () => { unpublishTreeNode(node) }
    }
  }

  return {
    unpublishTreeContextMenuItem
  }
}
