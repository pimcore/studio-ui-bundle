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
import { type WidgetRegistry } from '@sdk/modules/widget-manager'
import { GDPRDataExtractorContainer } from './gdpr-data-extractor-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { type DynamicTypeGDPRProviderRegistry } from './dynamic-types/registry/dynamic-type-gdpr-provider-registry'
import { type DynamicTypeDataObjectGDPRProvider } from './dynamic-types/definitions/dynamic-type-data-object-gdpr-provider'
import { type DynamicTypeAssetsGDPRProvider } from './dynamic-types/definitions/dynamic-type-assets-gdpr-provider'
import { type DynamicTypeUsersGDPRProvider } from './dynamic-types/definitions/dynamic-type-users-gdpr-provider'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { DynamicTypeEmailsGDPRProvider } from './dynamic-types/definitions/dynamic-type-email-gdpr-provider'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'gdpr-data-extractor',
      component: GDPRDataExtractorContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/GDPR Extractor',
      label: 'navigation.gdpr-extractor',
      order: 500,
      className: 'item-style-modifier',
      permission: UserPermission.GDPRDataExtractor,
      perspectivePermission: NavPermission.GDPRDataExtractor,
      widgetConfig: {
        name: 'gdpr-extractor',
        id: 'gdpr-extractor',
        component: 'gdpr-data-extractor',
        config: {
          translationKey: 'widget.gdpr-extractor',
          icon: {
            type: 'name',
            value: 'lock-circle'
          }
        }
      }
    })

    const gdprProviderRegistry = container.get<DynamicTypeGDPRProviderRegistry>(serviceIds['DynamicTypes/GDPRProviderRegistry'])
    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeDataObjectGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/DataObjects'])
    )

    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeAssetsGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/Assets'])
    )

    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeUsersGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/Users'])
    )

    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeEmailsGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/Emails'])
    )
  }
})
