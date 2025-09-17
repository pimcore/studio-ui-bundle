/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export abstract class AbstractBackgroundJobHandler {
  /**
   * Determines if this handler should process the given message
   */
  abstract shouldHandle(message: any): boolean

  /**
   * Processes the message
   */
  abstract handleMessage(message: any): void

  /**
   * Optional cleanup when handler is removed
   */
  cleanup?(): void

  /**
   * Unique identifier for this handler
   */
  abstract getId(): string | number
}
