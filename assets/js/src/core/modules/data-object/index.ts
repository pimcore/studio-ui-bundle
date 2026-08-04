/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import '@Pimcore/modules/data-object/editor'
import '@Pimcore/modules/data-object/listing'
import '@Pimcore/modules/data-object/tree'
import '@Pimcore/modules/data-object/listing/decorator/context-menu'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TreeContainer } from '@Pimcore/modules/data-object/tree/tree-container'
import { ElementTreeTooltip } from '@Pimcore/components/element-tree/tooltip/element-tree-tooltip'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { TreeNodeLockIcon } from '@Pimcore/components/element-tree/node/content/tree-node-lock-icon'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { DataObjectBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/data-object-batch-delete-job'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    widgetRegistryService.registerWidget({
      name: 'data-object-tree',
      component: TreeContainer
    })

    componentRegistry.register({
      name: componentConfig.dataObject.tree.tooltip.name,
      component: ElementTreeTooltip
    })

    componentRegistry.registerToSlot(componentConfig.dataObject.tree.node.meta.name, {
      name: 'lockIcon',
      component: TreeNodeLockIcon,
      priority: 100
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(serviceIds['ExecutionEngine/JobRehydrationRegistry'])
    rehydrationRegistry.register(DataObjectBatchDeleteJob)
  }
})
