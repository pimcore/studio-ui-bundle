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
import { OpenElement } from '@Pimcore/modules/open-element/open-element'
import React from 'react'
import { UserPermission } from '../auth/enums/user-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Asset',
      label: 'navigation.open-asset',
      order: 100,
      permission: UserPermission.Assets,
      perspectivePermission: NavPermission.OpenAsset,
      button: () => React.createElement(OpenElement, { elementType: 'asset' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Data Object',
      label: 'navigation.open-data-object',
      order: 200,
      permission: UserPermission.Objects,
      perspectivePermission: NavPermission.OpenObject,
      button: () => React.createElement(OpenElement, { elementType: 'data-object' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Open Document',
      label: 'navigation.open-document',
      dividerBottom: true,
      order: 300,
      permission: UserPermission.Documents,
      perspectivePermission: NavPermission.OpenDocument,
      button: () => React.createElement(OpenElement, { elementType: 'document' })
    })
  }
})
