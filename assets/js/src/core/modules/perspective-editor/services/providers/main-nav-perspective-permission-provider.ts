/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { isNil } from 'lodash'
import { type IPerspectivePermissionProvider, type PermissionCategory } from '../../registry/perspective-permission-provider-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type IMainNavItem, type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'

@injectable()
export class MainNavPerspectivePermissionProvider implements IPerspectivePermissionProvider {
  getPermissions (): PermissionCategory[] {
    const mainNavRegistry = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    const tree = mainNavRegistry.getMainNavTree()

    const permissionOrder: string[] = []

    const processItem = (item: IMainNavItem): void => {
      if (!isNil(item.perspectivePermissionHide)) permissionOrder.push(item.perspectivePermissionHide)
      if (!isNil(item.perspectivePermission)) permissionOrder.push(item.perspectivePermission)

      if (!isNil(item.children)) {
        item.children.forEach(child => { processItem(child) })
      }
    }

    tree.forEach(item => { processItem(item) })

    const categories = new Map<string, PermissionCategory>()
    const categoryOrder: string[] = []

    permissionOrder.forEach(fullPermission => {
      const parts = fullPermission.split('.')
      if (parts.length < 2) return

      const categoryKey = parts[0]
      const permissionKey = parts[1]

      if (!categories.has(categoryKey)) {
        categories.set(categoryKey, {
          key: categoryKey,
          permissions: []
        })
        categoryOrder.push(categoryKey)
      }

      const category = categories.get(categoryKey)!
      if (category.permissions.find(p => p.key === permissionKey) == null) {
        category.permissions.push({ key: permissionKey })
      }
    })

    return categoryOrder.map(key => categories.get(key)!)
  }
}
