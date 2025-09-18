/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMercureMessage } from "@Pimcore/modules/background-processor/process/abstract-mercure-process";


export abstract class AbstractMessageHandler {
  /**
   * Static topics that this handler type needs to listen to
   * Override in concrete implementations
   */
  static readonly TOPICS: string[] = []

  /**
   * Determines if this handler should process the given message
   */
  abstract shouldHandle (message: AbstractMercureMessage): boolean

  /**
   * Processes the message
   */
  abstract handleMessage (message: AbstractMercureMessage): void

  /**
   * Optional lifecycle method called when handler is registered
   */
  onRegister? (): void

  /**
   * Optional lifecycle method called when handler is unregistered
   */
  onUnregister? (): void

  /**
   * Unique identifier for this handler
   */
  abstract getId (): string | number
}
