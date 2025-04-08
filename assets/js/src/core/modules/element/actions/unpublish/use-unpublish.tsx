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
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useElementHelper } from '../../hooks/use-element-helper'
import { checkElementPermission } from '../../permissions/permission-helper'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { ContextMenuActionName } from '..'

type Element = DataObject

interface UseUnpublishHookReturn {
  unpublishTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  unpublishContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
}

export const useUnpublish = (elementType: ElementType): UseUnpublishHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const { executeElementTask } = useElementHelper()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isUnpublishHidden = (node: TreeNodeProps | Element): boolean => {
    return !checkElementPermission(node.permissions, 'unpublish') ||
      node.type === 'folder' ||
      node.isLocked
  }

  const unpublishTreeNode = (node: TreeNodeProps | Element, onFinish?: () => void): void => {
    const nodeId = typeof node.id === 'string' ? parseInt(node.id) : node.id
    executeElementTask(elementType, nodeId, SaveTaskType.Unpublish, onFinish)
  }

  const unpublishContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.unpublish'),
      key: ContextMenuActionName.unpublish,
      isLoading,
      icon: <Icon value='eye-off' />,
      hidden: node.published === false || isUnpublishHidden(node),
      onClick: () => {
        setIsLoading(true)
        unpublishTreeNode(node, () => {
          onFinish?.()
          setIsLoading(false)
        })
      }
    }
  }

  const unpublishTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unpublish'),
      key: ContextMenuActionName.unpublish,
      isLoading,
      icon: <Icon value='eye-off' />,
      hidden: node.isPublished === false || !isTreeActionAllowed(TreePermission.Unpublish) || isUnpublishHidden(node),
      onClick: () => { unpublishTreeNode(node) }
    }
  }

  return {
    unpublishTreeContextMenuItem,
    unpublishContextMenuItem
  }
}
