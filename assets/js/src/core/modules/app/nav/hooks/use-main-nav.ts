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

import { container } from '@Pimcore/app/depency-injection'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { type IMainNavItem, type MainNavRegistry } from '../services/main-nav-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { isNil } from 'lodash'

interface IUseMainNavReturn {
  navItems: IMainNavItem[]
}

const addNavItemToItemList = (items: IMainNavItem[], item: IMainNavItem): void => {
  const levels = item.path.split('/')
  if (levels.length > 4) {
    console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', item)
    return
  }

  let currentLevel = items
  levels.forEach((level: string, index) => {
    let existingItem = currentLevel.find(i => i.id === level)
    const isCurrentItem = index === levels.length - 1

    if (existingItem === undefined) {
      existingItem = {
        order: isCurrentItem ? item.order : 100,
        id: level,
        label: item.label ?? level,
        path: levels.slice(0, index + 1).join('/'),
        children: [],
        icon: isCurrentItem ? item.icon : undefined,
        widgetConfig: isCurrentItem ? item.widgetConfig : undefined,
        onClick: isCurrentItem ? item.onClick : undefined,
        button: isCurrentItem ? item.button : undefined,
        className: isCurrentItem ? item.className : undefined,
        perspectivePermission: isCurrentItem ? item.perspectivePermission : undefined,
        perspectivePermissionHide: isCurrentItem ? item.perspectivePermissionHide : undefined
      }
      currentLevel.push(existingItem)
    } else if (index === levels.length - 1) {
      Object.assign(existingItem, {
        icon: item.icon,
        order: item.order ?? 100,
        className: item.className
      })
    }

    currentLevel = existingItem.children ?? []
    currentLevel.sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
  })

  items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
}

export const useMainNav = (): IUseMainNavReturn => {
  const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
  const user = useUser()
  const activePerspective = useSelector(selectActivePerspective)

  const createNavItems = (): IMainNavItem[] => {
    const items: IMainNavItem[] = []

    if (isNil(user) || isNil(activePerspective)) {
      return items
    }

    mainNavRegistryService.getMainNavItems().forEach(item => {
      if (item.permission !== undefined && !isAllowed(item.permission)) {
        return
      }

      if (item.perspectivePermission !== undefined && !isAllowedInPerspective(item.perspectivePermission)) {
        return
      }

      addNavItemToItemList(items, item)
    })

    return items
  }

  const navItems = useMemo(() => {
    return createNavItems()
  }, [mainNavRegistryService.getMainNavItems(), user, activePerspective])

  return {
    navItems
  }
}
