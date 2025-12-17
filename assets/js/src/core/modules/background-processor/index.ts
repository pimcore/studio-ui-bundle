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
import { topics } from '../execution-engine/topics'

// Export the global message system
export { GlobalMessageBus } from '../global-message-bus/services/global-message-bus'
export { GlobalMessageBusProcess } from './process/global-message-bus-process'

// Export hooks
export { useGlobalMessageBus } from '../global-message-bus/hooks/use-global-message-bus'

moduleSystem.registerModule({
  onInit: () => {
    // Get services
    const messageRegistry = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
    const globalProcess = container.get<GlobalMessageBusProcess>(serviceIds.globalMessageBusProcess)

    // Register topics with the registry first
    messageRegistry.registerTopics(Object.values(topics))

    // Register the global message process
    const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    backgroundProcessor.registerProcess(globalProcess)

    // Setup visibility change handler for reconnection
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !globalProcess.isConnected()) {
        globalProcess.start()
      }
    })

    // Setup online event handler for network reconnection
    // Always reconnect on network change as the connection is likely stale
    window.addEventListener('online', () => {
      globalProcess.start()
    })
  }
})
