/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

/**
 * Opens what a Studio deep link points to: `<studio base url>?link=<name>&…`
 * is passed to the handler registered under `<name>`.
 */
export interface DeepLinkHandler {
  /** The value of the `link` query parameter this handler answers to, unique across Studio. */
  name: string

  /**
   * Called once after the widget layout is restored, with all query parameters of the link
   * (`link` included). A thrown error or a rejected promise is reported by Studio.
   */
  handle: (params: URLSearchParams) => void | Promise<void>
}

/**
 * Registry of deep link handlers, available as
 * `container.get<DeepLinkRegistryInterface>(serviceIds['App/DeepLinkRegistry/DeepLinkRegistry'])`.
 */
export interface DeepLinkRegistryInterface {
  /** Registers a handler under its name. A second handler with the same name is reported and ignored. */
  register: (handler: DeepLinkHandler) => void

  /** Returns the handler registered under the given name, or `undefined`. */
  get: (name: string) => DeepLinkHandler | undefined
}

@injectable()
export class DeepLinkRegistry implements DeepLinkRegistryInterface {
  private readonly handlers = new Map<string, DeepLinkHandler>()

  register (handler: DeepLinkHandler): void {
    if (this.handlers.has(handler.name)) {
      try {
        trackError(new GeneralError(`Deep link handler with the name "${handler.name}" already exists`))
      } catch {
        // trackError re-throws GeneralError; a name clash must not stop the module init
      }

      return
    }

    this.handlers.set(handler.name, handler)
  }

  get (name: string): DeepLinkHandler | undefined {
    return this.handlers.get(name)
  }
}
