/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'
import { PredefinedAssetMetadataContainer } from './predefined-asset-metadata-container'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'AssetManagement/Predefined Asset Metadata',
      label: 'navigation.predefined-asset-metadata',
      order: 102,
      className: 'item-style-modifier',
      permission: UserPermission.AssetMetadata,
      perspectivePermission: NavPermission.PredefinedAssetMetadata,
      widgetConfig: {
        name: 'Predefined Asset Metadata',
        id: 'predefined-asset-metadata',
        component: 'predefined-asset-metadata',
        config: {
          translationKey: 'widget.predefined-asset-metadata',
          icon: {
            type: 'name',
            value: 'custom-metadata'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'predefined-asset-metadata',
      component: PredefinedAssetMetadataContainer
    })
  }
})
