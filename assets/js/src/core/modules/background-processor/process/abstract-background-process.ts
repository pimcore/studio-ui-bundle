/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface AbstractMessage {
  type: string
  payload: unknown
}

export const ProcessTypes = {
  DAEMON: 'daemon'
} as const

export type IProcessTypes = typeof ProcessTypes[keyof typeof ProcessTypes]

export abstract class AbstractBackgroundProcess {
  protected abstract readonly name: string
  protected abstract readonly description?: string
  protected type: IProcessTypes = ProcessTypes.DAEMON

  abstract start (): void
  abstract cancel (): void

  public onMessage?: (message: AbstractMessage) => void

  public getName (): string {
    return this.name
  }

  public getDescription (): string | undefined {
    return this.description
  }

  public getType (): IProcessTypes {
    return this.type
  }

  protected sendMessage (message: AbstractMessage): void {
    if (this.onMessage !== undefined) {
      this.onMessage(message)
    }
  }
}
