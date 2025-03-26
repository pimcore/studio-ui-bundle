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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useElementFolderCreateMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useRefreshTree } from '../refresh-tree/use-refresh-tree'
import { useTreeId } from '../../tree/provider/tree-id-provider/use-tree-id'
import { setNodeFetching } from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@Pimcore/app/store'

export interface UseAddFolderHookReturn {
  addFolder: (parentId: number) => void
  addFolderTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  addFolderMutation: (parentId: number, value: string) => Promise<void>
}

export const useAddFolder = (elementType: ElementType): UseAddFolderHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [elementFolderCreateMutation] = useElementFolderCreateMutation()
  const { isTreeActionAllowed } = useTreePermission()
  const { refreshTree } = useRefreshTree(elementType)
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId(true)

  const addFolder = (parentId: number, onBeforeMutation?: () => void, onFailedMutation?: () => void): void => {
    modal.input({
      title: t('element.new-folder'),
      label: t('form.label.new-item'),
      rule: {
        required: true,
        message: t('element.new-folder.validation')
      },
      onOk: async (value: string) => {
        onBeforeMutation?.()
        await addFolderMutation(parentId, value, onFailedMutation)
      }
    })
  }

  const addFolderTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.new-folder'),
      key: 'add-folder',
      icon: <Icon value={ 'add-folder' } />,
      hidden: !isTreeActionAllowed(TreePermission.AddFolder) || node.type !== 'folder' || !checkElementPermission(node.permissions, 'create'),
      onClick: () => {
        const parentId = parseInt(node.id)
        addFolder(
          parentId,
          () => dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: true })),
          () => dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: false }))
        )
      }
    }
  }

  const addFolderMutation = async (parentId: number, value: string, onFailedMutation?: () => void): Promise<void> => {
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
        onFailedMutation?.()
      } else {
        refreshTree(parentId)
      }
    } catch (error) {
      console.error('Error creating folder', error)
    }
  }

  return {
    addFolder,
    addFolderTreeContextMenuItem,
    addFolderMutation
  }
}
