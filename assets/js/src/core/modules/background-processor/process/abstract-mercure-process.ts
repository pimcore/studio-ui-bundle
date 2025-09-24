/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { appConfig } from '@Pimcore/app/config/app-config'
import { AbstractBackgroundProcess, type AbstractMessage } from './abstract-background-process'

export interface AbstractMercureMessage extends AbstractMessage {
  event: MessageEvent
}

export abstract class AbstractMercureProcess extends AbstractBackgroundProcess {
  protected eventSource?: EventSource

  protected abstract getTopics (): string[]

  public start (): void {
    if (this.eventSource !== undefined) {
      this.eventSource.close()
    }

    const url = new URL(appConfig.mercureUrl)

    this.getTopics().forEach(topic => {
      url.searchParams.append('topic', topic)
    })

    this.eventSource = new EventSource(url.toString(), { withCredentials: true })

    this.eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as unknown as string)
      this.sendMessage({
        type: 'update',
        payload: data,
        event
      })
    }

    this.eventSource.onerror = (error: Event) => {
      this.sendMessage({
        type: 'error',
        payload: error,
        event: new MessageEvent('error', { data: error })
      })
      this.cancel()
    }
  };

  public cancel (): void {
    if (this.eventSource !== undefined) {
      this.eventSource.close()
      this.eventSource = undefined
    }

    this.sendMessage({
      type: 'cancel',
      payload: null,
      event: new MessageEvent('cancel')
    })
  };

  protected sendMessage (message: AbstractMercureMessage): void {
    super.sendMessage(message)
  }
}
