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
import { ExponentialBackoff } from '@Pimcore/utils/exponential-backoff'

export interface AbstractMercureMessage extends AbstractMessage {
  event: MessageEvent
}

export abstract class AbstractMercureProcess extends AbstractBackgroundProcess {
  protected eventSource?: EventSource
  protected storageKey: string
  private readonly reconnectBackoff: ExponentialBackoff

  constructor () {
    super()
    this.storageKey = `mercure_last_event_id_${this.constructor.name}`
    this.reconnectBackoff = new ExponentialBackoff({
      initialDelay: 2000,
      maxDelay: 300000,
      multiplier: 2
    })
  }

  public start (): void {
    this.reconnectBackoff.clear()

    if (this.eventSource !== undefined) {
      this.eventSource.close()
    }

    const url = new URL(appConfig.mercureUrl)

    this.getTopics().forEach(topic => {
      url.searchParams.append('topic', topic)
    })

    if (this.lastEventId !== undefined) {
      url.searchParams.append('lastEventID', this.lastEventId)
    }

    this.eventSource = new EventSource(url.toString(), { withCredentials: true })

    this.eventSource.onopen = () => {
      this.reconnectBackoff.reset()
    }

    this.eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as unknown as string)

      if (event.lastEventId !== '') {
        this.lastEventId = event.lastEventId
      }

      this.sendMessage({
        type: 'update',
        payload: data,
        event
      })
    }

    this.eventSource.onerror = (error: Event) => {
      const target = error.target as EventSource
      if (target?.readyState === EventSource.CLOSED) {
        this.sendMessage({
          type: 'error',
          payload: error,
          event: new MessageEvent('error', { data: error })
        })
        this.reconnectBackoff.schedule(() => {
          this.start()
        })
      }
    }
  }

  public cancel (): void {
    this.reconnectBackoff.clear()

    if (this.eventSource !== undefined) {
      this.eventSource.close()
      this.eventSource = undefined
    }

    this.lastEventId = undefined
    this.reconnectBackoff.reset()

    this.sendMessage({
      type: 'cancel',
      payload: null,
      event: new MessageEvent('cancel')
    })
  }

  public isConnected (): boolean {
    return this.eventSource?.readyState === EventSource.OPEN
  }

  protected abstract getTopics (): string[]

  protected get lastEventId (): string | undefined {
    const value = sessionStorage.getItem(this.storageKey)
    return value ?? undefined
  }

  protected set lastEventId (value: string | undefined) {
    if (value !== undefined) {
      sessionStorage.setItem(this.storageKey, value)
    } else {
      sessionStorage.removeItem(this.storageKey)
    }
  }

  protected sendMessage (message: AbstractMercureMessage): void {
    super.sendMessage(message)
  }
}
