/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { isNil } from 'lodash'
import { type IMainNavItem, type MainNavRegistry } from '../services/main-nav-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'

interface IUseMainNavReturn {
  navItems: IMainNavItem[]
}

export const useMainNav = (): IUseMainNavReturn => {
  const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
  const user = useUser()
  const activePerspective = useSelector(selectActivePerspective)
  const [registryUpdate, setRegistryUpdate] = useState(0)

  useEffect(() => {
    return mainNavRegistryService.subscribe(() => {
      setRegistryUpdate((prev) => prev + 1)
    })
  }, [mainNavRegistryService])

  const filterItems = (items: IMainNavItem[]): IMainNavItem[] => {
    return items.filter(item => {
      if (!isNil(item.hidden) && item.hidden()) {
        return false
      }

      if (!isNil(item.permission) && !isAllowed(item.permission)) {
        return false
      }

      if (!isNil(item.perspectivePermissionHide) && isAllowedInPerspective(item.perspectivePermissionHide)) {
        return false
      }

      if (!isNil(item.perspectivePermission) && !isAllowedInPerspective(item.perspectivePermission)) {
        return false
      }

      if (!isNil(item.children)) {
        item.children = filterItems(item.children)

        // If the item has no children left and is not an interactive item (leaf), hide it.
        // This prevents empty menu groups from appearing.
        const isInteractive = !isNil(item.useCustomMainNavItem) || !isNil(item.widgetConfig)
        if (item.children.length === 0 && !isInteractive) {
          return false
        }
      }

      return true
    })
  }

  const navItems = useMemo(() => {
    if (isNil(user) || isNil(activePerspective)) {
      return []
    }

    const tree = mainNavRegistryService.getMainNavTree()
    return filterItems(tree)
  }, [user, activePerspective, registryUpdate])

  return {
    navItems
  }
}
