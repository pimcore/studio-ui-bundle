/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
