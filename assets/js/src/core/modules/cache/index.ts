/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '@sdk/modules/app'
import { UserPermission } from '@sdk/modules/auth'
import { clearCache, clearFullPageCache, clearTemporaryFiles } from './cache-actions'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Cache',
      label: 'navigation.cache',
      order: 100,
      permission: UserPermission.ClearCache
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Cache/ClearCache',
      label: 'navigation.cache.clear-cache',
      order: 100,
      permission: UserPermission.ClearCache,
      useCustomMainNavItem: () => {
        return {
          name: 'CacheClearCache',
          onClick: () => { void clearCache() }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Cache/ClearFullPageCache',
      label: 'navigation.cache.clear-full-page-cache',
      order: 200,
      permission: UserPermission.ClearCache,
      useCustomMainNavItem: () => {
        return {
          name: 'CacheClearFullPageCache',
          onClick: () => { void clearFullPageCache() }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Cache/ClearTemporaryFiles',
      label: 'navigation.cache.clear-temporary-files',
      order: 300,
      permission: UserPermission.ClearCache,
      useCustomMainNavItem: () => {
        return {
          name: 'CacheClearTemporaryFiles',
          onClick: () => { void clearTemporaryFiles() }
        }
      }
    })
  }
})
