/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { type GlobalMessageProcess } from '@Pimcore/modules/background-processor/process/global-message-process'
import { type GlobalMessageRegistry } from '@Pimcore/modules/background-processor/services/global-message-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DocumentCloneJobHandler } from '@Pimcore/modules/background-processor/handlers/document-clone-job-handler'

// Export the global message system
export { GlobalMessageRegistry } from './services/global-message-registry'
export { GlobalMessageProcess } from './process/global-message-process'
export { AbstractBackgroundJobHandler } from './handlers/abstract-background-job-handler'
export { AbstractJobRunIdHandler } from './handlers/abstract-job-run-id-handler'

// Export hooks
export { useGlobalMessageRegistry } from './hooks/use-global-message-registry'

// Export example concrete handlers
export { DocumentCloneJobHandler } from './handlers/document-clone-job-handler'

moduleSystem.registerModule({
  onInit: () => {
    // Get services
    const messageRegistry = container.get<GlobalMessageRegistry>(serviceIds.globalMessageRegistry)
    const globalProcess = container.get<GlobalMessageProcess>(serviceIds.globalMessageProcess)
    
    // Register topics with the registry first
    messageRegistry.registerTopics(DocumentCloneJobHandler.TOPICS)
    
    // Register the global message process
    const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    backgroundProcessor.registerProcess(globalProcess)

    // Start the subscription
    messageRegistry.startGlobalSubscription()
  }
})
