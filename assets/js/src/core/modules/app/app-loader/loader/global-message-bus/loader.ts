/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { container, serviceIds } from '@sdk/app'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { type GlobalMessageBusProcess } from '@Pimcore/modules/background-processor/process/global-message-bus-process'
import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { topics } from '@Pimcore/modules/execution-engine/topics'

interface UseGlobalMessageBusLoaderReturn {
  initGlobalMessageBus: (userId: number) => void
}

export const useGlobalMessageBusLoader = (): UseGlobalMessageBusLoaderReturn => {
  const isInitialized = useRef(false)

  const initGlobalMessageBus = (userId: number): void => {
    if (isInitialized.current) {
      return
    }

    try {
      const messageRegistry = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
      const globalProcess = container.get<GlobalMessageBusProcess>(serviceIds.globalMessageBusProcess)
      const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)

      messageRegistry.registerTopics([
        ...Object.values(topics),
        `studio-backend-default/user/${userId}`
      ])
      backgroundProcessor.registerProcess(globalProcess)
      messageRegistry.startGlobalSubscription()

      // Reconnect when tab becomes visible again
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !globalProcess.isConnected()) {
          globalProcess.start()
        }
      })

      // Reconnect on network change as the connection is likely stale
      window.addEventListener('online', () => {
        globalProcess.start()
      })

      isInitialized.current = true
    } catch (error) {
      console.error('Failed to initialize global message bus:', error)
    }
  }

  return { initGlobalMessageBus }
}
