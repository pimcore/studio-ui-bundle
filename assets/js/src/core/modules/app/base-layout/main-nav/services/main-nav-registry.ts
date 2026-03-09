/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { injectable } from 'inversify'
import { isNil, isUndefined } from 'lodash'

export interface IMainNavItem {
  path: string
  order?: number
  id?: string
  icon?: string
  groupIcon?: string
  label?: string
  group?: string
  dividerTop?: boolean
  dividerBottom?: boolean
  children?: IMainNavItem[]
  permission?: string
  perspectivePermission?: string
  perspectivePermissionHide?: string
  useCustomMainNavItem?: () => {
    onClick: () => void
    name?: string
    icon?: string | { type: string, value: string }
    translationKey?: string
  }
  widgetConfig?: WidgetManagerTabConfig
  className?: string
  hidden?: () => boolean
}

@injectable()
export class MainNavRegistry {
  private readonly items: IMainNavItem[] = []
  private readonly listeners: Array<() => void> = []

  registerMainNavItem (item: IMainNavItem): void {
    if (!isNil(item.widgetConfig)) {
      if (isNil(item.widgetConfig.config)) {
        item.widgetConfig.config = {}
      }
      item.widgetConfig.config.mainNavPath = item.path
    }

    const existingIndex = this.items.findIndex((existingItem) => existingItem.path === item.path)

    if (existingIndex !== -1) {
      this.items[existingIndex] = item
    } else {
      this.items.push(item)
    }

    this.notifyListeners()
  }

  unregisterMainNavItem (path: string): void {
    const index = this.items.findIndex((item) => item.path === path)
    if (index !== -1) {
      this.items.splice(index, 1)
      this.notifyListeners()
    }
  }

  subscribe (listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index !== -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notifyListeners (): void {
    this.listeners.forEach(listener => { listener() })
  }

  getMainNavItem (path: string): IMainNavItem | undefined {
    return this.items.find((item) => item.path === path)
  }

  getMainNavItems (): IMainNavItem[] {
    return this.items
  }

  getMainNavTree (): IMainNavItem[] {
    const tree: IMainNavItem[] = []

    this.items.forEach(item => {
      this.addNavItemToItemList(tree, item)
    })

    this.sortTree(tree)

    return tree
  }

  private addNavItemToItemList (items: IMainNavItem[], item: IMainNavItem): void {
    const levels = item.path.split('/')
    if (levels.length > 4) {
      console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', item)
      return
    }

    let currentLevel = items
    levels.forEach((level: string, index) => {
      let existingItem = currentLevel.find(i => i.id === level)
      const isCurrentItem = index === levels.length - 1

      if (isUndefined(existingItem)) {
        let levelLabel = level

        if (!isCurrentItem && !isUndefined(item.group) && level === item.group) {
          levelLabel = item.group
        } else if (isCurrentItem) {
          levelLabel = item.label ?? level
        }

        existingItem = {
          order: isCurrentItem ? item.order : 1000,
          id: level,
          label: levelLabel,
          path: levels.slice(0, index + 1).join('/'),
          children: [],
          ...(isCurrentItem && {
            dividerTop: item.dividerTop,
            dividerBottom: item.dividerBottom,
            icon: item.icon,
            groupIcon: item.groupIcon,
            widgetConfig: item.widgetConfig,
            useCustomMainNavItem: item.useCustomMainNavItem,
            className: item.className,
            permission: item.permission,
            perspectivePermission: item.perspectivePermission,
            perspectivePermissionHide: item.perspectivePermissionHide,
            hidden: item.hidden
          })
        }
        currentLevel.push(existingItem)
      } else if (index === levels.length - 1) {
        Object.assign(existingItem, {
          icon: item.icon,
          groupIcon: item.groupIcon,
          order: item.order ?? 1000,
          className: item.className,
          permission: item.permission,
          perspectivePermission: item.perspectivePermission,
          perspectivePermissionHide: item.perspectivePermissionHide,
          hidden: item.hidden,
          widgetConfig: item.widgetConfig,
          useCustomMainNavItem: item.useCustomMainNavItem,
          dividerBottom: item.dividerBottom,
          dividerTop: item.dividerTop,
          label: item.label ?? existingItem.label
        })
      }

      currentLevel = existingItem.children ?? []
    })
  }

  private sortTree (items: IMainNavItem[]): void {
    items.sort((a, b) => (a.order ?? 1000) - (b.order ?? 1000))
    items.forEach(item => {
      if (!isNil(item.children)) {
        this.sortTree(item.children)
      }
    })
  }
}
