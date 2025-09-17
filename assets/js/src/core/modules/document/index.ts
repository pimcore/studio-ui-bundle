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
import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { type DocumentCloneGlobalProcess } from '@Pimcore/modules/document/background-processes/document-clone-process'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TreeContainer } from '@Pimcore/modules/document/tree/tree-container'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'document-tree',
      component: TreeContainer
    })

    // Register the document clone global process
    const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    const globalProcess = container.get<DocumentCloneGlobalProcess>(serviceIds.documentCloneProcess)
    
    backgroundProcessor.registerProcess(globalProcess)
  }
})
