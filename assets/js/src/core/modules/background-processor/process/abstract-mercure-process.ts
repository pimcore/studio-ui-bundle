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
import { AbstractBackgroundProcess } from './abstract-background-process'

export abstract class AbstractMercureProcess extends AbstractBackgroundProcess {
  protected abstract readonly topics: string[]
  protected eventSource?: EventSource

  public start (): void {
    if (this.eventSource !== undefined) {
      this.eventSource.close()
    }

    const url = new URL(appConfig.mercureUrl)

    this.topics.forEach(topic => {
      url.searchParams.append('topic', topic)
    })

    this.eventSource = new EventSource(url.toString())

    this.eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as unknown as string)
      this.sendMessage({
        type: 'update',
        payload: data
      })
    }

    this.eventSource.onerror = (error: Event) => {
      this.sendMessage({
        type: 'error',
        payload: error
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
      payload: null
    })
  };
}
