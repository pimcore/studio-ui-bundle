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
import { NotesAndEventsContainer } from '@Pimcore/modules/notes-and-events/notes-and-events-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'
import type { WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

export const NOTES_AND_EVENTS_WIDGET: WidgetManagerTabConfig = {
  name: 'Notes & Events',
  id: 'notes-and-events',
  component: 'notes-and-events',
  config: {
    translationKey: 'widget.notes-and-events',
    icon: {
      type: 'name',
      value: 'notes-events'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/Notes & Events',
      label: 'navigation.notes-and-events',
      dividerBottom: true,
      order: 400,
      className: 'item-style-modifier',
      permission: UserPermission.NotesAndEvents,
      perspectivePermission: NavPermission.NotesAndEvents,
      widgetConfig: NOTES_AND_EVENTS_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'notes-and-events',
      component: NotesAndEventsContainer
    })
  }
})
