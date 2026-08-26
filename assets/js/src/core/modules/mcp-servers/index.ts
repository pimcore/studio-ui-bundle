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
import { McpServersContainer } from './mcp-servers-container'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'AutomationIntegration/MCP Servers',
      label: 'navigation.mcp-servers',
      // High order so the entry sits at the bottom of the Automation & Integration
      // group, below Pimcore Copilot and the Data Hub configuration.
      order: 9000,
      // Intentionally NOT permission-gated: the screen is reachable by read-only
      // consumers, and the server list is row-filtered server-side. Write actions
      // (create, edit, delete) remain gated inside the rail/editor.
      widgetConfig: {
        name: 'MCP Servers',
        id: 'mcp-servers',
        component: 'mcp-servers',
        config: {
          translationKey: 'widget.mcp-servers',
          icon: {
            type: 'name',
            value: 'automation-integration'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'mcp-servers',
      component: McpServersContainer
    })
  }
})
