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
import { createJob as createDeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { type AssetDeleteZipApiArg } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useElementDeleteMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useRefreshTree } from '../refresh-tree/use-refresh-tree'
import { isUndefined } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useAppDispatch } from '@Pimcore/app/store'
import { markNodeDeleting } from '@Pimcore/components/element-tree/element-tree-slice'

export interface UseDeleteHookReturn {
  deleteElement: (id: number, label: string, parentId?: number) => void
  deleteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  deleteContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  deleteGridContextMenuItem: (row: any) => ItemType | undefined
  deleteMutation: (id: number, parentId?: number) => Promise<void>
}

export const useDelete = (elementType: ElementType, cacheKey?: string): UseDeleteHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { addJob } = useJobs()
  const { refreshGrid } = useRefreshGrid(elementType)
  const { getElementById } = useElementApi(elementType)
  const { refreshElement } = useElementRefresh(elementType)
  const { refreshTree } = useRefreshTree(elementType)
  const { isMainWidgetOpen, closeWidget } = useWidgetManager()
  const [elementDelete] = useElementDeleteMutation({ fixedCacheKey: cacheKey })
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()

  const deleteElement = (id: number, label: string, parentId?: number, onFinish?: () => void): void => {
    modal.confirm({
      title: t('element.delete.confirmation.title'),
      content: <>
        <span>{t('element.delete.confirmation.text')}</span>
        <br />
        <b>{label}</b>
      </>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => { await deleteMutation(id, parentId, onFinish) }
    })
  }

  const deleteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.delete'),
      key: 'delete',
      icon: <Icon value={ 'trash' } />,
      hidden: !isTreeActionAllowed(TreePermission.Delete) || !checkElementPermission(node.permissions, 'delete') || node.isLocked,
      onClick: () => {
        const id = parseInt(node.id)
        const parentId = node.parentId !== undefined ? parseInt(node.parentId) : undefined
        deleteElement(id, node.label, parentId)
      }
    }
  }

  const deleteContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.delete'),
      key: 'delete',
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
      key: 'delete',
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
      () => { refreshGrid() }
    )
  }

  const deleteMutation = async (id: number, parentId?: number, onFinish?: () => void): Promise<void> => {
    dispatch(markNodeDeleting({ nodeId: String(id), elementType, isDeleting: true }))

    const promise = elementDelete({
      id,
      elementType
    })

    promise.catch(() => {
      console.error('Error deleting ' + elementType)
    })

    const response = await promise

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      dispatch(markNodeDeleting({ nodeId: String(id), elementType, isDeleting: false }))
      return
    }

    let jobRunId: any = null
    if ((response.data ?? false) !== false) {
      const data = response.data as AssetDeleteZipApiArg
      jobRunId = data.jobRunId ?? null
    }

    if (jobRunId !== null) {
      addJob(createDeleteJob({
        title: 'Deleting Folder',
        topics: [topics['deletion-finished'], ...defaultTopics],
        action: async () => {
          return jobRunId
        },
        parentFolder: String(parentId),
        elementType
      }))
    } else if (parentId !== undefined) {
      refreshElement(parentId)
      refreshTree(parentId)
    }

    const widgetId = getWidgetId(elementType, id)
    if (isMainWidgetOpen(widgetId)) {
      closeWidget(widgetId)
    }

    onFinish?.()
  }

  return {
    deleteElement,
    deleteTreeContextMenuItem,
    deleteContextMenuItem,
    deleteGridContextMenuItem,
    deleteMutation
  }
}
