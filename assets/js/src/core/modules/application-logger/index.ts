/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { ApplicationLogger } from './application-logger-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Tools/Application Logger',
      label: 'navigation.application-logger',
      permission: UserPermission.ApplicationLogger,
      perspectivePermission: NavPermission.ApplicationLogger,
      widgetConfig: {
        name: 'Application Logger',
        id: 'application-logger',
        component: 'application-logger',
        config: {
          translationKey: 'widget.application-logger',
          icon: {
            type: 'name',
            value: 'application-logger'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'application-logger',
      component: ApplicationLogger
    })
  }
})
