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
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type ElementType } from 'types/element-type.d'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useElementFolderCreateMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface UseAddFolderHookReturn {
  addFolder: (parentId: number) => void
  addFolderTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  addFolderContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  addFolderMutation: (parentId: number, value: string) => Promise<void>
}

export const useAddFolder = (elementType: ElementType): UseAddFolderHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { refreshTree } = useRefreshTree(elementType)
  const [elementFolderCreateMutation] = useElementFolderCreateMutation()

  const addFolder = (parentId: number, onFinish?: () => void): void => {
    modal.input({
      title: t('element.new-folder'),
      label: t('element.new-folder.label'),
      rule: {
        required: true,
        message: t('element.new-folder.validation')
      },
      onOk: async (value: string) => { await addFolderMutation(parentId, value, onFinish) }
    })
  }

  const addFolderTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.new-folder'),
      key: 'add-folder',
      icon: <Icon value={ 'add-folder' } />,
      hidden: node.type !== 'folder' || !checkElementPermission(node.permissions, 'create'),
      onClick: () => {
        const parentId = parseInt(node.id)
        addFolder(parentId)
      }
    }
  }

  const addFolderContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.new-folder'),
      key: 'add-folder',
      icon: <Icon value={ 'add-folder' } />,
      hidden: node.type !== 'folder' || !checkElementPermission(node.permissions!, 'create'),
      onClick: () => {
        addFolder(node.id)
        onFinish?.()
      }
    }
  }

  const addFolderMutation = async (parentId: number, value: string, onFinish?: () => void): Promise<void> => {
    const elementFolderCreateMutationTask = elementFolderCreateMutation({
      parentId,
      elementType,
      folderData: {
        folderName: value
      }
    })

    try {
      const response = await elementFolderCreateMutationTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      }

      refreshTree(parentId)

      onFinish?.()
    } catch (error) {
      console.error('Error creating folder', error)
    }
  }

  return {
    addFolder,
    addFolderTreeContextMenuItem,
    addFolderContextMenuItem,
    addFolderMutation
  }
}
