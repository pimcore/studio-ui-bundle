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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { OpenElement } from '@Pimcore/modules/open-element/open-element'
import React from 'react'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'File/Open Asset',
      label: 'Open Asset',
      perspectivePermission: NavPermission.OpenAsset,
      button: () => React.createElement(OpenElement, { elementType: 'asset' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'File/Open Document',
      label: 'Open Document',
      perspectivePermission: NavPermission.OpenDocument,
      button: () => React.createElement(OpenElement, { elementType: 'document' })
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'File/Open Data Object',
      label: 'Open Data Object',
      perspectivePermission: NavPermission.OpenObject,
      button: () => React.createElement(OpenElement, { elementType: 'data-object' })
    })
  }
})
