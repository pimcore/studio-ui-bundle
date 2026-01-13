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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'
import { useOpenElement } from '@Pimcore/modules/open-element/context/open-element-data-context'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Asset',
      label: 'navigation.open-asset',
      order: 100,
      permission: UserPermission.Assets,
      perspectivePermission: NavPermission.OpenAsset,
      useMainNavItem: () => {
        const { open } = useOpenElement()

        return {
          name: 'OpenAsset',
          onClick: () => { open('asset') }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Data Object',
      label: 'navigation.open-data-object',
      order: 200,
      permission: UserPermission.Objects,
      perspectivePermission: NavPermission.OpenObject,
      useMainNavItem: () => {
        const { open } = useOpenElement()

        return {
          name: 'OpenDataObject',
          onClick: () => { open('data-object') }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Document',
      label: 'navigation.open-document',
      dividerBottom: true,
      order: 300,
      permission: UserPermission.Documents,
      perspectivePermission: NavPermission.OpenDocument,
      useMainNavItem: () => {
        const { open } = useOpenElement()

        return {
          name: 'OpenDocument',
          onClick: () => { open('document') }
        }
      }
    })
  }
})
