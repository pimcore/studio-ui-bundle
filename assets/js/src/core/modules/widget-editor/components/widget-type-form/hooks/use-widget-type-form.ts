/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePerspectiveGetConfigByIdQuery, type AssetContextPermissions, type DataObjectContextPermissions, type DocumentContextPermissions } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'

interface UseWidgetTypeFormReturn {
  dataObjectContextMenuItems: string[]
  assetContextMenuItems: string[]
  documentContextMenuItems: string[]
  isLoading: boolean
}

export const useWidgetTypeForm = (): UseWidgetTypeFormReturn => {
  const { data: perspective, isLoading } = usePerspectiveGetConfigByIdQuery({ perspectiveId: 'studio_default_perspective' })

  const dataObjectContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[2]?.contextPermissions as DataObjectContextPermissions

    // Transform the data by omitting additionalAttributes
    if (!isEmpty(rawPermissions)) {
      const { additionalAttributes, ...cleanPermissions } = rawPermissions
      const keys = Object.keys(cleanPermissions).filter((key) => key !== 'searchAndMove')
      const priorityKeys = ['addFolder', 'add', 'rename', 'copy', 'cut', 'paste', 'publish', 'unpublish', 'delete', 'refresh', 'changeChildrenSortBy', 'lock', 'lockAndPropagate', 'unlock', 'unlockAndPropagate']

      const sortedKeys = keys.filter((key) => !priorityKeys.includes(key)).sort()
      const presentPriorityKeys = priorityKeys.filter((key) => keys.includes(key))

      return [...presentPriorityKeys, ...sortedKeys]
    }

    return []
  }, [perspective])

  const assetContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[1]?.contextPermissions as AssetContextPermissions

    // Transform the data by omitting additionalAttributes
    if (!isEmpty(rawPermissions)) {
      const { additionalAttributes, ...cleanPermissions } = rawPermissions
      const keys = Object.keys(cleanPermissions).filter((key) => key !== 'searchAndMove')
      const priorityKeys = ['hideAdd', 'addUpload', 'addUploadZip', 'addFolder', 'rename', 'copy', 'cut', 'paste', 'pasteCut', 'delete', 'uploadNewVersion', 'lock', 'lockAndPropagate', 'unlock', 'unlockAndPropagate']

      const sortedKeys = keys.filter((key) => !priorityKeys.includes(key)).sort()
      const presentPriorityKeys = priorityKeys.filter((key) => keys.includes(key))

      return [...presentPriorityKeys, ...sortedKeys]
    }

    return []
  }, [perspective])

  const documentContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[0]?.contextPermissions as DocumentContextPermissions

    // Transform the data by omitting additionalAttributes
    if (!isEmpty(rawPermissions)) {
      const { additionalAttributes, ...cleanPermissions } = rawPermissions
      const keys = Object.keys(cleanPermissions).filter((key) => !['addHeadlessDocument', 'addNewsletter', 'searchAndMove', 'addPrintPage'].includes(key))
      const priorityKeys = ['addFolder', 'add', 'addSnippet', 'addLink', 'addEmail', 'addHardlink', 'rename', 'copy', 'paste', 'cut', 'pasteCut', 'publish', 'unpublish', 'delete', 'open', 'refresh', 'lock', 'lockAndPropagate', 'unlock', 'unlockAndPropagate']

      const sortedKeys = keys.filter((key) => !priorityKeys.includes(key)).sort()
      const presentPriorityKeys = priorityKeys.filter((key) => keys.includes(key))

      return [...presentPriorityKeys, ...sortedKeys]
    }

    return []
  }, [perspective])

  return {
    dataObjectContextMenuItems,
    assetContextMenuItems,
    documentContextMenuItems,
    isLoading
  }
}
