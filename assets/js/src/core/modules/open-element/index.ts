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
      path: 'File/Open Asset',
      label: 'navigation.open-asset',
      permission: UserPermission.Assets,
      perspectivePermission: NavPermission.OpenAsset,
      button: () => React.createElement(OpenElement, { elementType: 'asset' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'File/Open Document',
      label: 'navigation.open-document',
      permission: UserPermission.Documents,
      perspectivePermission: NavPermission.OpenDocument,
      button: () => React.createElement(OpenElement, { elementType: 'document' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'File/Open Data Object',
      label: 'navigation.open-data-object',
      permission: UserPermission.Objects,
      perspectivePermission: NavPermission.OpenObject,
      button: () => React.createElement(OpenElement, { elementType: 'data-object' })
    })
  }
})
