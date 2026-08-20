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
import { renewMercureAuthorization } from '@Pimcore/modules/app/mercure/mercure-authorization'
import { AbstractBackgroundProcess, type AbstractMessage } from './abstract-background-process'
import { ExponentialBackoff } from '@Pimcore/utils/exponential-backoff'

export interface AbstractMercureMessage extends AbstractMessage {
  event: MessageEvent
}

export abstract class AbstractMercureProcess extends AbstractBackgroundProcess {
  protected eventSource?: EventSource
  protected storageKey: string
  private readonly reconnectBackoff: ExponentialBackoff
  /**
   * Identifies the current connection attempt. A reconnect waits for a fresh authorization
   * cookie, and `start()` or `cancel()` may run in the meantime, so the pending attempt has to
   * be able to tell that it has been superseded instead of opening a second EventSource.
   */
  private connectionGeneration = 0

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
    const generation = ++this.connectionGeneration
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
      this.handleConnectionLoss(error, generation)
    }
  }

  /**
   * Reconnect under our own control, with a freshly issued authorization cookie.
   *
   * The browser reconnects a dropped EventSource on its own, reusing whatever cookie exists at
   * that moment. Once `mercureAuthorization` has expired that reconnect is anonymous, and a hub
   * that allows anonymous subscribers answers it with `200 OK` and then silently drops every
   * private update - no error, no `onerror`, and `isConnected()` keeps reporting a healthy
   * stream. Closing the source here and reconnecting through `reconnect()` is what keeps the
   * subscription authorised; the hub's `write_timeout` makes this the normal path, roughly every
   * nine minutes, not an error path.
   */
  private handleConnectionLoss (error: Event, generation: number): void {
    if (generation !== this.connectionGeneration) {
      return
    }

    const target = error.target as EventSource
    if (target?.readyState === EventSource.CLOSED) {
      this.sendMessage({
        type: 'error',
        payload: error,
        event: new MessageEvent('error', { data: error })
      })
    }

    this.eventSource?.close()
    this.reconnectBackoff.schedule(() => {
      void this.reconnect(generation)
    })
  }

  private async reconnect (generation: number): Promise<void> {
    if (generation !== this.connectionGeneration) {
      return
    }

    try {
      await renewMercureAuthorization()
    } catch {
      // Reconnecting with the cookie we already hold still beats staying silent, and the backoff
      // covers a backend or hub that stays unreachable.
    }

    if (generation !== this.connectionGeneration) {
      return
    }

    this.start()
  }

  public cancel (): void {
    this.connectionGeneration++
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
