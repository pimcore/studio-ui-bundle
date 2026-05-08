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
import '@Pimcore/modules/asset/editor'
import '@Pimcore/modules/asset/listing'
import { TreeContainer } from './tree/tree-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import '@Pimcore/modules/asset/tree'
import { ElementTreeTooltip } from '@Pimcore/components/element-tree/tooltip/element-tree-tooltip'
import '@Pimcore/modules/asset/listing/decorator/context-menu'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { TreeNodeLockIcon } from '@Pimcore/components/element-tree/node/content/tree-node-lock-icon'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { AssetBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/asset-batch-delete-job'
import { ZipUploadJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/zip-upload-job'
import { ZipDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/zip-download-job'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    widgetRegistryService.registerWidget({
      name: 'asset-tree',
      component: TreeContainer
    })

    componentRegistry.register({
      name: componentConfig.asset.tree.tooltip.name,
      component: ElementTreeTooltip
    })

    componentRegistry.registerToSlot(componentConfig.asset.tree.node.meta.name, {
      name: 'lockIcon',
      component: TreeNodeLockIcon,
      priority: 100
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(serviceIds['ExecutionEngine/JobRehydrationRegistry'])
    rehydrationRegistry.register(AssetBatchDeleteJob)
    rehydrationRegistry.register(ZipUploadJob)
    rehydrationRegistry.register(ZipDownloadJob)
  }
})
