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
import { type GlobalMessageBusProcess } from '@Pimcore/modules/background-processor/process/global-message-bus-process'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DocumentCloneJobHandler } from '@Pimcore/modules/global-message-bus/handlers/document-clone-job-handler'

// Export the global message system
export { GlobalMessageBus } from '../global-message-bus/services/global-message-bus'
export { GlobalMessageBusProcess } from './process/global-message-bus-process'

// Export hooks
export { useGlobalMessageBus } from '../global-message-bus/hooks/use-global-message-bus'

// Export example concrete handlers
export { DocumentCloneJobHandler } from '../global-message-bus/handlers/document-clone-job-handler'

moduleSystem.registerModule({
  onInit: () => {
    // Get services
    const messageRegistry = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
    const globalProcess = container.get<GlobalMessageBusProcess>(serviceIds.globalMessageBusProcess)

    // Register topics with the registry first
    messageRegistry.registerTopics(DocumentCloneJobHandler.TOPICS)

    // Register the global message process
    const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    backgroundProcessor.registerProcess(globalProcess)

    // Start the subscription
    messageRegistry.startGlobalSubscription()
  }
})
