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
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { PerspectiveEditorContainer } from './perspective-editor/perspective-editor-container'
import { WidgetEditorContainer } from './custom-view-editor/widget-editor-container'
import '@Pimcore/modules/widget-editor/custom-view-editor'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'perspective-editor',
      component: PerspectiveEditorContainer
    })

    widgetRegistryService.registerWidget({
      name: 'widget-editor',
      component: WidgetEditorContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Widget-Editor',
      label: 'navigation.widget-editor.widget-editor',
      order: 300,
      className: 'item-style-modifier',
      // permission: UserPermission.FOO,
      // perspectivePermission: NavPermission.BAR,
      widgetConfig: {
        name: 'widgetEditor',
        id: 'widget-editor',
        component: 'widget-editor',
        config: {
          translationKey: 'widget.widget-editor.widget-editor',
          icon: {
            type: 'name',
            value: 'layout-grid-02'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Perspective-Editor',
      label: 'navigation.widget-editor.perspective-editor',
      order: 400,
      dividerBottom: true,
      className: 'item-style-modifier',
      // permission: UserPermission.FOO,
      // perspectivePermission: NavPermission.BAR,
      widgetConfig: {
        name: 'perspectiveEditor',
        id: 'perspective-editor',
        component: 'perspective-editor',
        config: {
          translationKey: 'widget.widget-editor.perspective-editor',
          icon: {
            type: 'name',
            value: 'book-open-01'
          }
        }
      }
    })
  }
})
