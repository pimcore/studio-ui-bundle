/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePerspectiveGetConfigByIdQuery, type AssetContextPermissions, type DataObjectContextPermissions, type DocumentContextPermissions } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
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
      return Object.keys(cleanPermissions)
    }

    return []
  }, [perspective])

  const assetContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[1]?.contextPermissions as AssetContextPermissions

    // Transform the data by omitting additionalAttributes
    if (!isEmpty(rawPermissions)) {
      const { additionalAttributes, ...cleanPermissions } = rawPermissions
      return Object.keys(cleanPermissions)
    }

    return []
  }, [perspective])

  const documentContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[0]?.contextPermissions as DocumentContextPermissions

    // Transform the data by omitting additionalAttributes
    if (!isEmpty(rawPermissions)) {
      const { additionalAttributes, ...cleanPermissions } = rawPermissions
      return Object.keys(cleanPermissions)
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
