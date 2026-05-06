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
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import '@Pimcore/modules/element/editor'
import '@Pimcore/modules/element/search-replace-assignments'
import { TreeWidget } from './tree/tree-widget'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { has } from 'lodash'
import { type WidgetRestorerRegistry } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { elementWidgetRestorer } from './services/element-widget-restorer'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { DeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/element-delete-job'
import { AssetCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/asset-clone-job'
import { DataObjectCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/data-object-clone-job'
import { DocumentCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/document-clone-job'
import { AbstractBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/abstract-batch-edit-job'
import { AbstractFolderBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/abstract-folder-batch-edit-job'
import { CsvDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/csv-download-job'
import { XlsxDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/xlsx-download-job'
import { TagAssignJob } from '@Pimcore/modules/execution-engine/jobs/tag-assign/tag-assign-job'
import { SearchReplaceAssignmentsJob } from '@Pimcore/modules/execution-engine/jobs/search-replace-assignments/search-replace-assignments-job'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    const widgetRestorerRegistry = container.get<WidgetRestorerRegistry>(serviceIds.widgetRestorerRegistry)

    widgetRestorerRegistry.register(elementWidgetRestorer)

    widgetRegistryService.registerWidget({
      name: 'element_tree',
      component: TreeWidget,
      transformConfig: (config) => ({
        ...config,
        translationKey: config.name
      }),
      isVisible: (widget) => {
        if (has(widget, 'elementType')) {
          switch (widget.elementType) {
            case 'document':
              return isAllowed(UserPermission.Documents)
            case 'asset':
              return isAllowed(UserPermission.Assets)
            case 'data-object':
              return isAllowed(UserPermission.Objects)
            default:
              return true
          }
        }
        return true
      }
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(serviceIds['ExecutionEngine/JobRehydrationRegistry'])
    rehydrationRegistry.register(DeleteJob)
    rehydrationRegistry.register(AssetCloneJob)
    rehydrationRegistry.register(DataObjectCloneJob)
    rehydrationRegistry.register(DocumentCloneJob)
    // Abstract classes registered directly: all concrete batch-edit subclasses share the same
    // backend job names and buildHandler, so one registration per abstract class covers them all.
    rehydrationRegistry.register(AbstractBatchEditJob)
    rehydrationRegistry.register(AbstractFolderBatchEditJob)
    rehydrationRegistry.register(CsvDownloadJob)
    rehydrationRegistry.register(XlsxDownloadJob)
    rehydrationRegistry.register(TagAssignJob)
    rehydrationRegistry.register(SearchReplaceAssignmentsJob)
  }
})
