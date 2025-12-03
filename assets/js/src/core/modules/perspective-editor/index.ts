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
import { PerspectiveEditorContainer } from './perspective-editor-container'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'

import { PerspectivePermissionProviderRegistry } from './registry/perspective-permission-provider-registry'
import { MainNavPerspectivePermissionProvider } from './services/providers/main-nav-perspective-permission-provider'
import { SearchPerspectivePermissionProvider } from './services/providers/search-perspective-permission-provider'

moduleSystem.registerModule({
  onInit: () => {
    container.bind(serviceIds.perspectivePermissionProviderRegistry).to(PerspectivePermissionProviderRegistry).inSingletonScope()

    const registry = container.get<PerspectivePermissionProviderRegistry>(serviceIds.perspectivePermissionProviderRegistry)
    registry.registerProvider(new MainNavPerspectivePermissionProvider(), 100)
    registry.registerProvider(new SearchPerspectivePermissionProvider(), 50)

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'perspective-editor',
      component: PerspectiveEditorContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'System/Perspective-Editor',
      label: 'navigation.widget-editor.perspective-editor',
      order: 400,
      dividerBottom: true,
      className: 'item-style-modifier',
      permission: UserPermission.PerspectiveEditor,
      perspectivePermission: NavPermission.PerspectiveEditor,
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
