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
import { TagConfigurationContainer } from '@Pimcore/modules/tags/tag-configuration-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'
import type { WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

export const TAG_CONFIGURATION_WIDGET: WidgetManagerTabConfig = {
  name: 'Tag Configuration',
  id: 'tag-configuration',
  component: 'tag-configuration',
  config: {
    translationKey: 'widget.tag-configuration',
    icon: {
      type: 'name',
      value: 'tag-configuration'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/Tag Configuration',
      dividerBottom: true,
      label: 'navigation.tag-configuration',
      className: 'item-style-modifier',
      order: 1000,
      permission: UserPermission.TagsConfiguration,
      perspectivePermission: NavPermission.TagConfiguration,
      widgetConfig: TAG_CONFIGURATION_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'tag-configuration',
      component: TagConfigurationContainer
    })
  }
})
