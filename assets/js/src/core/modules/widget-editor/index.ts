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
import { type ElementTreeWidgetPermissionRegistry } from './services/widget-context-menu-item-registry'

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
      perspectivePermission: NavPermission.WidgetEditor,
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

    const permissionRegistry = container.get<ElementTreeWidgetPermissionRegistry>(serviceIds.elementTreeWidgetPermissionRegistry)

    // Asset context menu items
    permissionRegistry.registerItem('asset', { key: 'hideAdd', priority: 100 })
    permissionRegistry.registerItem('asset', { key: 'addUpload', priority: 200 })
    permissionRegistry.registerItem('asset', { key: 'addUploadZip', priority: 300 })
    permissionRegistry.registerItem('asset', { key: 'addFolder', priority: 400 })
    permissionRegistry.registerItem('asset', { key: 'rename', priority: 500 })
    permissionRegistry.registerItem('asset', { key: 'copy', priority: 600 })
    permissionRegistry.registerItem('asset', { key: 'cut', priority: 700 })
    permissionRegistry.registerItem('asset', { key: 'paste', priority: 800 })
    permissionRegistry.registerItem('asset', { key: 'pasteCut', priority: 900 })
    permissionRegistry.registerItem('asset', { key: 'delete', priority: 1000 })
    permissionRegistry.registerItem('asset', { key: 'uploadNewVersion', priority: 1100 })
    permissionRegistry.registerItem('asset', { key: 'lock', priority: 1200 })
    permissionRegistry.registerItem('asset', { key: 'lockAndPropagate', priority: 1300 })
    permissionRegistry.registerItem('asset', { key: 'unlock', priority: 1400 })
    permissionRegistry.registerItem('asset', { key: 'unlockAndPropagate', priority: 1500 })

    // Data Object context menu items
    permissionRegistry.registerItem('data-object', { key: 'addFolder', priority: 100 })
    permissionRegistry.registerItem('data-object', { key: 'addObject', priority: 200 })
    permissionRegistry.registerItem('data-object', { key: 'addVariant', priority: 300 })
    permissionRegistry.registerItem('data-object', { key: 'rename', priority: 400 })
    permissionRegistry.registerItem('data-object', { key: 'copy', priority: 500 })
    permissionRegistry.registerItem('data-object', { key: 'cut', priority: 600 })
    permissionRegistry.registerItem('data-object', { key: 'paste', priority: 700 })
    permissionRegistry.registerItem('data-object', { key: 'publish', priority: 800 })
    permissionRegistry.registerItem('data-object', { key: 'unpublish', priority: 900 })
    permissionRegistry.registerItem('data-object', { key: 'delete', priority: 1000 })
    permissionRegistry.registerItem('data-object', { key: 'refresh', priority: 1100 })
    permissionRegistry.registerItem('data-object', { key: 'changeChildrenSortBy', priority: 1200 })
    permissionRegistry.registerItem('data-object', { key: 'lock', priority: 1300 })
    permissionRegistry.registerItem('data-object', { key: 'lockAndPropagate', priority: 1400 })
    permissionRegistry.registerItem('data-object', { key: 'unlock', priority: 1500 })
    permissionRegistry.registerItem('data-object', { key: 'unlockAndPropagate', priority: 1600 })

    // Document context menu items
    permissionRegistry.registerItem('document', { key: 'addFolder', priority: 100 })
    permissionRegistry.registerItem('document', { key: 'addPage', priority: 200 })
    permissionRegistry.registerItem('document', { key: 'addSnippet', priority: 300 })
    permissionRegistry.registerItem('document', { key: 'addLink', priority: 400 })
    permissionRegistry.registerItem('document', { key: 'addEmail', priority: 500 })
    permissionRegistry.registerItem('document', { key: 'addHardlink', priority: 600 })
    permissionRegistry.registerItem('document', { key: 'rename', priority: 700 })
    permissionRegistry.registerItem('document', { key: 'copy', priority: 800 })
    permissionRegistry.registerItem('document', { key: 'paste', priority: 900 })
    permissionRegistry.registerItem('document', { key: 'cut', priority: 1000 })
    permissionRegistry.registerItem('document', { key: 'pasteCut', priority: 1100 })
    permissionRegistry.registerItem('document', { key: 'publish', priority: 1200 })
    permissionRegistry.registerItem('document', { key: 'unpublish', priority: 1300 })
    permissionRegistry.registerItem('document', { key: 'delete', priority: 1400 })
    permissionRegistry.registerItem('document', { key: 'open', priority: 1500 })
    permissionRegistry.registerItem('document', { key: 'refresh', priority: 1600 })
    permissionRegistry.registerItem('document', { key: 'lock', priority: 1700 })
    permissionRegistry.registerItem('document', { key: 'lockAndPropagate', priority: 1800 })
    permissionRegistry.registerItem('document', { key: 'unlock', priority: 1900 })
    permissionRegistry.registerItem('document', { key: 'unlockAndPropagate', priority: 2000 })
  }
})
