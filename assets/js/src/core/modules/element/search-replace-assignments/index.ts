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
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { SearchReplaceAssignmentsContainer } from './search-replace-assignments-container'
import type { WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { isAllowed } from '@sdk/modules/auth'

export const SEARCH_REPLACE_ASSIGNMENTS_WIDGET: WidgetManagerTabConfig = {
  name: 'Search & Replace Assignments',
  id: 'search-replace-assignments',
  component: 'search-replace-assignments',
  config: {
    translationKey: 'widget.search-replace-assignments',
    icon: {
      type: 'name',
      value: 'search'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/Search & Replace Assignments',
      label: 'navigation.search-replace-assignments',
      className: 'item-style-modifier',
      order: 700,
      hidden: () => {
        return !isAllowed(UserPermission.Assets) && !isAllowed(UserPermission.Documents) && !isAllowed(UserPermission.Objects)
      },
      perspectivePermission: NavPermission.SearchReplaceAssignments,
      widgetConfig: SEARCH_REPLACE_ASSIGNMENTS_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'search-replace-assignments',
      component: SearchReplaceAssignmentsContainer
    })
  }
})
