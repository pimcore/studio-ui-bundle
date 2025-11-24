/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

export interface ExponentialBackoffOptions {
  initialDelay: number
  maxDelay: number
  multiplier: number
}

export class ExponentialBackoff {
  private readonly initialDelay: number
  private readonly maxDelay: number
  private readonly multiplier: number
  private currentDelay: number
  private timeoutId: NodeJS.Timeout | null = null

  constructor (options: ExponentialBackoffOptions) {
    this.initialDelay = options.initialDelay
    this.maxDelay = options.maxDelay
    this.multiplier = options.multiplier
    this.currentDelay = this.initialDelay
  }

  public schedule (callback: () => void): void {
    this.clear()

    this.timeoutId = setTimeout(() => {
      callback()
    }, this.currentDelay)

    this.increase()
  }

  public increase (): void {
    this.currentDelay = Math.min(
      Math.round(this.currentDelay * this.multiplier),
      this.maxDelay
    )
  }

  public reset (): void {
    this.currentDelay = this.initialDelay
  }

  public clear (): void {
    if (!isNil(this.timeoutId)) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  public getCurrentDelay (): number {
    return this.currentDelay
  }
}
