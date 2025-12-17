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

export interface PermissionItem {
  key: string
  label?: string
}

export interface PermissionCategory {
  key: string
  label?: string
  permissions: PermissionItem[]
}

export interface IPerspectivePermissionProvider {
  getPermissions: () => PermissionCategory[]
}

interface RegisteredProvider {
  provider: IPerspectivePermissionProvider
  priority: number
}

@injectable()
export class PerspectivePermissionProviderRegistry {
  private readonly providers: RegisteredProvider[] = []

  registerProvider (provider: IPerspectivePermissionProvider, priority: number = 0): void {
    this.providers.push({ provider, priority })
    this.providers.sort((a, b) => b.priority - a.priority)
  }

  getPermissions (): PermissionCategory[] {
    const mergedCategories = new Map<string, PermissionCategory>()
    const categoryOrder: string[] = []

    for (const { provider } of this.providers) {
      const categories = provider.getPermissions()
      for (const category of categories) {
        if (!mergedCategories.has(category.key)) {
          mergedCategories.set(category.key, { ...category, permissions: [] })
          categoryOrder.push(category.key)
        }

        const existingCategory = mergedCategories.get(category.key)!

        for (const perm of category.permissions) {
          if (existingCategory.permissions.find(p => p.key === perm.key) == null) {
            existingCategory.permissions.push(perm)
          }
        }
      }
    }

    return categoryOrder.map(key => mergedCategories.get(key)!)
  }
}
