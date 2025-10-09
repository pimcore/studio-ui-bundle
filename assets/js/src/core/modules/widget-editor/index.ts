/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@sdk/app'
import { type DynamicTypeWidgetTypeElementTree } from './dynmic-types/definitions/dynamic-type-widget-type-element-tree'
import { type DynamicTypeWidgetTypeRegistry } from './dynmic-types/registry/dynamic-type-widget-type-registry'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { WidgetEditorContainer } from './widget-editor-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
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
      permission: UserPermission.WidgetEditor,
      perspectivePermission: NavPermission.Perspectives,
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

    const widgetRegistry = container.get<DynamicTypeWidgetTypeRegistry>(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry'])
    widgetRegistry.registerDynamicType(
      container.get<DynamicTypeWidgetTypeElementTree>(serviceIds['DynamicTypes/WidgetEditor/ElementTree'])
    )
  }
})
