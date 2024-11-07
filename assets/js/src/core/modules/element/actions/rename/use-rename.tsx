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
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'

export interface UseRenameHookReturn {
  rename: (parentId: number, currentLabel: string) => void
  renameContextMenuItem: (node: TreeNodeProps) => ItemType
  renameMutation: (parentId: number, value: string) => Promise<void>
}

export const useRename = (elementType: ElementType): UseRenameHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { refreshTree } = useRefreshTree(elementType)
  const { elementPatch } = useElementApi(elementType)

  const rename = (id: number, currentLabel: string, parentId?: number): void => {
    modal.input({
      title: t('element.rename'),
      label: t('element.rename.label'),
      initialValue: currentLabel,
      rule: {
        required: true,
        message: t('element.rename.validation')
      },
      onOk: async (value: string) => { await renameMutation(id, value, parentId) }
    })
  }

  const renameContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.rename'),
      key: 'rename',
      icon: <Icon name={ 'type-square' } />,
      hidden: node.isLocked,
      onClick: () => {
        const id = parseInt(node.id)
        const parentId = node.parentId !== undefined ? parseInt(node.parentId) : undefined
        rename(id, node.label, parentId)
      }
    }
  }

  const renameMutation = async (id: number, value: string, parentId?: number): Promise<void> => {
    const elementRenameTask = elementPatch({
      body: {
        data: [{
          id,
          key: value
        }]
      }
    })

    try {
      await elementRenameTask

      if (parentId !== undefined) {
        refreshTree(parentId)
      }
    } catch (error) {
      console.error('Error renaming ' + elementType, error)
    }
  }

  return {
    rename,
    renameContextMenuItem,
    renameMutation
  }
}
