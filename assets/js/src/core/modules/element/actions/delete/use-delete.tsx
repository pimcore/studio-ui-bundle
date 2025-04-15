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

import { useAppDispatch } from '@Pimcore/app/store'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { markNodeDeleting } from '@Pimcore/components/element-tree/element-tree-slice'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type AssetDeleteZipApiArg } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useElementDeleteMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createDeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContextMenuActionName } from '..'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { useRefreshTree } from '../refresh-tree/use-refresh-tree'

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
  const { refreshTree } = useRefreshTree(elementType)
  const { isMainWidgetOpen, closeWidget } = useWidgetManager()
  const [elementDelete, { isError, error }] = useElementDeleteMutation({ fixedCacheKey: cacheKey })
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

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
        await deleteMutation(id, parentId, () => {
          onFinish?.()
          setIsLoading(false)
        })
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

  const deleteMutation = async (id: number, parentId?: number, onFinish?: () => void): Promise<void> => {
    dispatch(markNodeDeleting({ nodeId: String(id), elementType, isDeleting: true }))

    const promise = elementDelete({
      id,
      elementType
    })
    const response = await promise

    if (!isUndefined(response.error)) {
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
        title: t('element.delete.deleting-folder'),
        topics: [topics['deletion-finished'], ...defaultTopics],
        action: async () => {
          return jobRunId
        },
        parentFolder: String(parentId),
        elementType
      }))
    } else if (parentId !== undefined) {
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
