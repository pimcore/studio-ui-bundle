/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'

interface EventIdentifier {
  type: string
  id?: any
}

interface ISubscriber {
  identifier: EventIdentifier
  callback: (event: AbstractEvent) => void
}

export interface AbstractEvent {
  identifier: EventIdentifier
  payload?: any
}

interface AbstractEventBus {
  subscribe: (identifier: EventIdentifier, callback: (event: AbstractEvent) => void) => ISubscriber
  unsubscribe: (subscriber: ISubscriber) => void
  publish: (event: AbstractEvent) => void
}

class EventBus implements AbstractEventBus {
  private subscribers: ISubscriber[] = []

  subscribe (identifier: EventIdentifier, callback: (event: AbstractEvent) => void): ISubscriber {
    const newSubscriber = {
      identifier,
      callback
    }

    this.subscribers.push(newSubscriber)

    return newSubscriber
  }

  unsubscribe (subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber)
  }

  publish (event: AbstractEvent): void {
    this.subscribers.forEach(subscriber => {
      const typeMatches = subscriber.identifier.type === event.identifier.type
      const idMatches = isUndefined(subscriber.identifier.id) || subscriber.identifier.id === event.identifier.id

      if (typeMatches && idMatches) {
        subscriber.callback(event)
      }
    })
  }
}

export const eventBus = new EventBus()
export { eventTypes } from './event-types'
