/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePerspectiveGetConfigByIdQuery } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ElementTreeWidgetPermissionRegistry } from '@Pimcore/modules/widget-editor/services/widget-context-menu-item-registry'

interface UseWidgetTypeFormReturn {
  dataObjectContextMenuItems: string[]
  assetContextMenuItems: string[]
  documentContextMenuItems: string[]
  isLoading: boolean
}

export const useWidgetTypeForm = (): UseWidgetTypeFormReturn => {
  const { data: perspective, isLoading } = usePerspectiveGetConfigByIdQuery({ perspectiveId: 'studio_default_perspective' })
  const registry = container.get<ElementTreeWidgetPermissionRegistry>(serviceIds.elementTreeWidgetPermissionRegistry)

  const dataObjectContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[2]?.contextPermissions ?? {}

    if (!isEmpty(rawPermissions)) {
      const availableKeys = Object.keys(rawPermissions)
      const registeredItems = registry.getItems('data-object')

      return registeredItems.filter((key) => availableKeys.includes(key))
    }

    return []
  }, [perspective])

  const assetContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[1]?.contextPermissions ?? {}

    if (!isEmpty(rawPermissions)) {
      const availableKeys = Object.keys(rawPermissions)
      const registeredItems = registry.getItems('asset')

      return registeredItems.filter((key) => availableKeys.includes(key))
    }

    return []
  }, [perspective, registry])

  const documentContextMenuItems = useMemo((): string[] => {
    const rawPermissions = perspective?.widgetsLeft?.[0]?.contextPermissions ?? {}

    if (!isEmpty(rawPermissions)) {
      const availableKeys = Object.keys(rawPermissions)
      const registeredItems = registry.getItems('document')

      return registeredItems.filter((key) => availableKeys.includes(key))
    }

    return []
  }, [perspective, registry])

  return {
    dataObjectContextMenuItems,
    assetContextMenuItems,
    documentContextMenuItems,
    isLoading
  }
}
