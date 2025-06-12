/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { uuid } from '@Pimcore/utils/uuid'
import { type AbstractMessage } from '../process/abstract-background-process'

export type SubscriberConstructor = new (
  callback: (message: AbstractMessage) => void
) => AbstractBackgroundSubscriber

export abstract class AbstractBackgroundSubscriber {
  protected readonly id: string = uuid()

  protected callback: (message: AbstractMessage) => void

  constructor (callback: (message: AbstractMessage) => void) {
    this.callback = callback
  }

  public getId (): string {
    return this.id
  }

  public getCallback (): (message: AbstractMessage) => void {
    return this.callback
  }
}
