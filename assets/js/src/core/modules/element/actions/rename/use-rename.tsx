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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useAppDispatch } from '@Pimcore/app/store'
import { renameNode } from '@Pimcore/components/element-tree/element-tree-slice'

export interface UseRenameHookReturn {
  rename: (parentId: number, currentLabel: string) => void
  renameTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  renameContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  renameGridContextMenuItem: (row: any) => ItemType | undefined
  renameMutation: (parentId: number, value: string) => Promise<void>
}

export const useRename = (elementType: ElementType, cacheKey?: string): UseRenameHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { refreshGrid } = useRefreshGrid(elementType)
  const { elementPatch, getElementById } = useElementApi(elementType, cacheKey)
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()

  const rename = (
    id: number,
    currentLabel: string,
    parentId?: number,
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('element.rename'),
      label: t('element.rename.label'),
      initialValue: currentLabel,
      rule: {
        required: true,
        message: t('element.rename.validation')
      },
      onOk: async (value: string) => {
        await renameMutation(id, value, parentId)
        onFinish?.(value)
      }
    })
  }

  const renameContextMenuItem = (
    node: Element,
    onFinish?: (newName: string) => void
  ): ItemType => {
    return {
      label: t('element.rename'),
      key: 'rename',
      icon: <Icon value={ 'rename' } />,
      hidden: !checkElementPermission(node.permissions, 'rename') || node.isLocked,
      onClick: () => {
        const parentId = node.parentId ?? undefined
        rename(node.id, getElementKey(node, elementType), parentId, onFinish)
      }
    }
  }

  const renameGridContextMenuItem = (row: any): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
      return
    }

    return {
      label: t('element.rename'),
      key: 'rename',
      icon: <Icon value={ 'rename' } />,
      hidden: !checkElementPermission(data.permissions, 'rename') || data.isLocked,
      onClick: async () => {
        await stagedLoading(data.id)
      }
    }
  }

  const stagedLoading = async (id: GridContextMenuProps['id']): Promise<void> => {
    const node = await getElementById(id)

    const parentId = node!.parentId ?? undefined
    rename(
      id,
      getElementKey(node!, elementType),
      parentId,
      () => { refreshGrid() }
    )
  }

  const renameTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.rename'),
      key: 'rename',
      icon: <Icon value={ 'rename' } />,
      hidden: !isTreeActionAllowed(TreePermission.Rename) || !checkElementPermission(node.permissions, 'rename') || node.isLocked,
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
      const success = await elementRenameTask

      if (success) {
        dispatch(renameNode({ elementType, nodeId: String(id), newLabel: value }))
      }
    } catch (error) {
      console.error('Error renaming ' + elementType, error)
    }
  }

  return {
    rename,
    renameTreeContextMenuItem,
    renameContextMenuItem,
    renameGridContextMenuItem,
    renameMutation
  }
}
