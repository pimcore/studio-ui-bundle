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

import { type DragEndEvent } from '@dnd-kit/core'

export type Callback = (event: DragEndEvent) => void

export interface ICallbackRegistry {
  register: (key: string, callback: Callback) => void
  unregister: (key: string) => void
  get: (key: string) => Callback
  getCallbacks: () => Record<string, Callback>
}

export class CallbackRegistry implements ICallbackRegistry {
  private callbacks: Record<string, Callback> = {}

  register (key: string, callback: Callback): void {
    this.callbacks[key] = callback
  }

  unregister (key: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.callbacks[key]
  }

  get (key: string): Callback {
    return this.callbacks[key]
  }

  getCallbacks (): Record<string, Callback> {
    return this.callbacks
  }
}
