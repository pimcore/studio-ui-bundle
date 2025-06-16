/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useBackgroundProcessor, useBackgroundProcessorMessage } from '../background-processor/hooks/use-background-processor'

export const NotificationUpdates = (): React.JSX.Element => {
  // Handle the message from the demo process
  useBackgroundProcessorMessage({
    processName: 'demo-process',
    callback: (message) => {
      console.log('Received message from demo process:', message)
    }
  })

  // Alternative syntax for conditional listening
  const backgroundProcessor = useBackgroundProcessor()
  const shouldListen = true // Replace with your actual condition

  useEffect(() => {
    // Subscribe to the demo process messages if the condition is met
    let subscriberId: string | undefined

    if (shouldListen) {
      subscriberId = backgroundProcessor.subscribeToProcessMessages({
        processName: 'demo-process',
        callback: (message) => {
          console.log('Received message from demo process:', message)
        }
      })
    }

    // Cleanup function to unsubscribe when the component unmounts or condition changes
    return () => {
      if (subscriberId !== undefined) {
        backgroundProcessor.unsubscribeFromProcessMessages(subscriberId)
      }
    }
  })

  return <></>
}
