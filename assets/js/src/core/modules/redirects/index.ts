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
import { RedirectsContainer } from './redirects-container'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Settings/Redirects',
      label: 'navigation.redirects',
      className: 'item-style-modifier',
      permission: UserPermission.Redirects,
      perspectivePermission: NavPermission.Redirects,
      widgetConfig: {
        name: 'Redirects',
        id: 'redirects',
        component: 'redirects',
        config: {
          translationKey: 'widget.redirects',
          icon: {
            type: 'name',
            value: 'redirect'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'redirects',
      component: RedirectsContainer
    })
  }
})