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

import { useTranslation } from 'react-i18next'
import { type ElementType } from 'types/element-type.d'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useElementFolderCreateMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export interface UseAddFolderHookReturn {
  addFolder: (parentId: number) => void
  addFolderContextMenuItem: (node: TreeNodeProps) => ItemType
  addFolderMutation: (parentId: number, value: string) => Promise<void>
}

export const useAddFolder = (elementType: ElementType): UseAddFolderHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { refreshTree } = useRefreshTree(elementType)
  const [elementFolderCreateMutation] = useElementFolderCreateMutation()

  const addFolder = (parentId: number): void => {
    modal.input({
      title: t('element.add-folder'),
      label: t('element.add-folder.label'),
      rule: {
        required: true,
        message: t('element.add-folder.validation')
      },
      onOk: async (value: string) => { await addFolderMutation(parentId, value) }
    })
  }

  const addFolderContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.add-folder'),
      key: 'add-folder',
      icon: <Icon name={ 'folder' } />,
      hidden: node.type !== 'folder' || !checkElementPermission(node.permissions, 'create'),
      onClick: () => {
        const parentId = parseInt(node.id)
        addFolder(parentId)
      }
    }
  }

  const addFolderMutation = async (parentId: number, value: string): Promise<void> => {
    const elementFolderCreateMutationTask = elementFolderCreateMutation({
      parentId,
      elementType,
      folderData: {
        folderName: value
      }
    })

    try {
      await elementFolderCreateMutationTask

      refreshTree(parentId)
    } catch (error) {
      console.error('Error creating folder', error)
    }
  }

  return {
    addFolder,
    addFolderContextMenuItem,
    addFolderMutation
  }
}
