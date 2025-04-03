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

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TagConfigurationContainer } from '@Pimcore/modules/tags/tag-configuration-container'
import { type MainNavRegistry } from '../app/nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Settings/Tag Configuration',
      label: 'navigation.tag-configuration',
      className: 'item-style-modifier',
      perspectivePermission: NavPermission.TagConfiguration,
      widgetConfig: {
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
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'tag-configuration',
      component: TagConfigurationContainer
    })
  }
})
