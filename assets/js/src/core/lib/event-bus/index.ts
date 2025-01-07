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

interface EventIdentifier {
  type: string
  id?: any
}

interface ISubscriber {
  identifier: EventIdentifier
  callback: (event: AbstractEvent) => void
}

interface AbstractEvent {
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
      if (subscriber.identifier.type === event.identifier.type && subscriber.identifier.id === event.identifier.id) {
        subscriber.callback(event)
      }
    })
  }
}

export const eventBus = new EventBus()
