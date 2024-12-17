/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useEffect } from 'react'
import { type topics } from '../../modules/execution-engine/topics'
import { type NonEmptyArray } from 'types/non-empty-array'
import { appConfig } from '@Pimcore/app/config/app-config'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

const ServerSideEventDomain = appConfig.mercureUrl

export interface UseServerSideEventProps {
  topics: NonEmptyArray<(typeof topics)[string]>
  messageHandler?: (event: MessageEvent) => void
  openHandler?: () => void
}

interface UseServerSideEventReturn {
  open: () => void
  close: () => void
}

export const useServerSideEvent = ({ topics, messageHandler, openHandler }: UseServerSideEventProps): UseServerSideEventReturn => {
  let event: EventSource | undefined

  if (topics.length === 0) {
    trackError(new GeneralError('No topics provided'))
  }

  function open (): void {
    const url = new URL(ServerSideEventDomain)
    topics.forEach(topic => {
      url.searchParams.append('topic', topic)
    })

    event = new EventSource(url.toString())

    if (messageHandler !== undefined) {
      event.onmessage = messageHandler
    }

    if (openHandler !== undefined) {
      event.onopen = openHandler
    }
  }

  function close (): void {
    if (event !== undefined) {
      event.close()
    }
  }

  useEffect(() => {
    return () => {
      close()
    }
  }, [])

  return { open, close }
}
