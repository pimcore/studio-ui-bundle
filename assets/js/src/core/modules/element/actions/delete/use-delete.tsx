/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { DeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/element-delete-job'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContextMenuActionName } from '..'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useTreePermission } from '../../../../components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { useRecycleBin } from '@Pimcore/modules/recycle-bin/hooks/use-recycle-bin'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'

export interface UseDeleteHookReturn {
  deleteElement: (id: number, label: string, parentId?: number, onFinish?: () => void) => void
  deleteTreeContextMenuItem: (node: TreeNodeProps, onFinish?: () => void) => ItemType
  deleteContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  deleteGridContextMenuItem: (row: any) => ItemType | undefined
  isLoading: boolean
}

export const useDelete = (elementType: ElementType, cacheKey?: string): UseDeleteHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const executionEngine = useExecutionEngine()
  const { refreshGrid } = useRefreshGrid(elementType)
  const { getElementById } = useElementApi(elementType)
  const { refreshRecycleBin } = useRecycleBin()
  const { isMainWidgetOpen, closeWidget } = useWidgetManager()
  const { isTreeActionAllowed } = useTreePermission()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { treeId } = useTreeId(true)

  const deleteElement = (id: number, label: string, parentId?: number, onFinish?: () => void): void => {
    modal.confirm({
      title: t('element.delete.confirmation.title'),
      content: <>
        <span>{t('element.delete.confirmation.text')}</span>
        <br />
        <b>{label}</b>
      </>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => {
        setIsLoading(true)
        try {
          const job = new DeleteJob({
            elementId: id,
            elementType,
            treeId,
            nodeId: String(id),
            parentFolderId: parentId
          })

          await executionEngine.runJob(job)

          // Handle widget closing and recycle bin refresh here since job can't use hooks
          const widgetId = getWidgetId(elementType, id)
          if (isMainWidgetOpen(widgetId)) {
            closeWidget(widgetId)
          }
          refreshRecycleBin()

          onFinish?.()
        } catch (error: any) {
          trackError(new GeneralError(error.message as string))
        } finally {
          setIsLoading(false)
        }
      }
    })
  }

  const deleteTreeContextMenuItem = (node: TreeNodeProps, onFinish?: () => void): ItemType => {
    return {
      label: t('element.delete'),
      key: ContextMenuActionName.delete,
      icon: <Icon value={ 'trash' } />,
      hidden: !isTreeActionAllowed(TreePermission.Delete) || !checkElementPermission(node.permissions, 'delete') || node.isLocked,
      onClick: () => {
        const id = parseInt(node.id)
        const parentId = node.parentId !== undefined ? parseInt(node.parentId) : undefined
        deleteElement(id, node.label, parentId, onFinish)
      }
    }
  }

  const deleteContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.delete'),
      key: ContextMenuActionName.delete,
      isLoading,
      icon: <Icon value={ 'trash' } />,
      hidden: !checkElementPermission(node.permissions, 'delete') || node.isLocked,
      onClick: () => {
        const id = node.id
        const parentId = node.parentId ?? undefined
        deleteElement(id, getElementKey(node, elementType), parentId, onFinish)
      }
    }
  }

  const deleteGridContextMenuItem = (row: any): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
      return
    }

    return {
      label: t('element.delete'),
      key: ContextMenuActionName.delete,
      icon: <Icon value={ 'trash' } />,
      hidden: !checkElementPermission(data.permissions, 'delete') || data.isLocked,
      onClick: async () => {
        await stagedLoading(data.id)
      }
    }
  }

  const stagedLoading = async (id: GridContextMenuProps['id']): Promise<void> => {
    const node = await getElementById(id)

    const parentId = node!.parentId ?? undefined
    deleteElement(
      node!.id,
      getElementKey(node!, elementType),
      parentId,
      () => { void refreshGrid() }
    )
  }

  return {
    deleteElement,
    deleteTreeContextMenuItem,
    deleteContextMenuItem,
    deleteGridContextMenuItem,
    isLoading
  }
}
