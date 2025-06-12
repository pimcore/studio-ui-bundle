/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { type BackgroundProcessor, type ISubscribeToProcessMessagesArgs } from '../services/background-processor'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useEffect } from 'react'

export const useBackgroundProcessor = (): BackgroundProcessor => {
  return useInjection<BackgroundProcessor>(serviceIds.backgroundProcessor)
}

export const useBackgroundProcessorMessage = (args: ISubscribeToProcessMessagesArgs): void => {
  const backgroundProcessor = useBackgroundProcessor()

  useEffect(() => {
    const subscriberId = backgroundProcessor.subscribeToProcessMessages(args)

    return () => {
      backgroundProcessor.unsubscribeFromProcessMessages(subscriberId)
    }
  }, [])
}
