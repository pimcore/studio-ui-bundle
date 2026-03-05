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
import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { AppearanceForm } from './components/appearance-form/appearance-form'

export const APPEARANCE_BRANDING_WIDGET: WidgetManagerTabConfig = {
  name: 'Appearance & Branding',
  id: 'appearance-branding',
  component: 'appearance-branding',
  config: {
    translationKey: 'widget.appearance-branding',
    icon: {
      type: 'name',
      value: 'appearance-branding'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Appearance-Branding',
      label: 'navigation.appearance-branding',
      className: 'item-style-modifier',
      order: 200,
      permission: UserPermission.Appearance,
      perspectivePermission: NavPermission.Appearance,
      widgetConfig: APPEARANCE_BRANDING_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'appearance-branding',
      component: AppearanceForm
    })
  }
})
