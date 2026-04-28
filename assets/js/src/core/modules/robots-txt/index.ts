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
import { RobotsTxtContainer } from './robots-txt-container'
import type { WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

export const ROBOTS_TXT_WIDGET: WidgetManagerTabConfig = {
  name: 'robots.txt',
  id: 'robots-txt',
  component: 'robots-txt',
  config: {
    translationKey: 'widget.robots-txt',
    icon: {
      type: 'name',
      value: 'robot'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce/RobotsTxt',
      label: 'navigation.robots-txt',
      className: 'item-style-modifier',
      order: 610,
      permission: UserPermission.RobotsTxt,
      perspectivePermission: NavPermission.RobotsTxt,
      widgetConfig: ROBOTS_TXT_WIDGET,
      dividerBottom: true
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'robots-txt',
      component: RobotsTxtContainer
    })
  }
})
