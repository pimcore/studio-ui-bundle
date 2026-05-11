/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import '@Pimcore/modules/document/editor'
import '@Pimcore/modules/document/tree'
import '@Pimcore/modules/document/document-editor-slice'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TreeContainer } from '@Pimcore/modules/document/tree/tree-container'
import { ElementTreeTooltip } from '@Pimcore/components/element-tree/tooltip/element-tree-tooltip'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { TreeNodeNavigationExcludeIcon } from '@Pimcore/modules/document/tree/node/content/tree-node-navigation-exclude-icon'
import { TreeNodeLockIcon } from '@Pimcore/components/element-tree/node/content/tree-node-lock-icon'
import { TreeNodeStaticGeneratorIcon } from '@Pimcore/modules/document/tree/node/content/tree-node-static-generator-icon'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    widgetRegistryService.registerWidget({
      name: 'document-tree',
      component: TreeContainer
    })

    componentRegistry.register({
      name: componentConfig.document.tree.tooltip.name,
      component: ElementTreeTooltip
    })

    componentRegistry.registerToSlot(componentConfig.document.tree.node.meta.name, {
      name: 'staticGeneratorIcon',
      component: TreeNodeStaticGeneratorIcon,
      priority: 100
    })

    componentRegistry.registerToSlot(componentConfig.document.tree.node.meta.name, {
      name: 'navigationExcludeIcon',
      component: TreeNodeNavigationExcludeIcon,
      priority: 200
    })

    componentRegistry.registerToSlot(componentConfig.document.tree.node.meta.name, {
      name: 'lockIcon',
      component: TreeNodeLockIcon,
      priority: 300
    })
  }
})
