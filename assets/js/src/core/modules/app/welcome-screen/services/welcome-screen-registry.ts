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

const TARGET_SEPARATOR = ':'

export interface WelcomeScreenOption {
  id: string
  label: string
}

/** Offers the pages a user can choose as welcome screen and opens the chosen one after login. */
export interface WelcomeScreenProvider {
  /** Stored with the user's choice (`<name>:<id>`), so it must never change and must not contain a colon. */
  readonly name: string
  /** The pages the logged-in user may open, labels shown as they are. Called after the app loaders have finished. */
  getOptions: () => WelcomeScreenOption[]
  /** Opens the page with this ID; false when it does not exist or the user may not open it. */
  open: (id: string) => boolean
}

export interface WelcomeScreenTargetOption {
  target: string
  label: string
}

@injectable()
export class WelcomeScreenRegistry {
  protected readonly providers = new Map<string, WelcomeScreenProvider>()

  registerProvider (provider: WelcomeScreenProvider): void {
    if (provider.name.includes(TARGET_SEPARATOR)) {
      throw new Error(`Welcome screen provider name "${provider.name}" must not contain "${TARGET_SEPARATOR}"`)
    }

    if (this.providers.has(provider.name)) {
      throw new Error(`Welcome screen provider with name "${provider.name}" already exists`)
    }

    this.providers.set(provider.name, provider)
  }

  getProviders (): WelcomeScreenProvider[] {
    return Array.from(this.providers.values())
  }

  getOptions (): WelcomeScreenTargetOption[] {
    return this.getProviders().flatMap((provider) => this.callProvider(provider, () => provider.getOptions(), [])
      .map((option) => ({ target: `${provider.name}${TARGET_SEPARATOR}${option.id}`, label: option.label })))
  }

  open (target: string): boolean {
    const separatorIndex = target.indexOf(TARGET_SEPARATOR)

    if (separatorIndex === -1) {
      return false
    }

    const provider = this.providers.get(target.slice(0, separatorIndex))

    if (provider === undefined) {
      return false
    }

    return this.callProvider(provider, () => provider.open(target.slice(separatorIndex + 1)), false)
  }

  // a failing provider of one bundle must not break the login of the user
  private callProvider<T>(provider: WelcomeScreenProvider, call: () => T, fallback: T): T {
    try {
      return call()
    } catch (error) {
      console.warn(`Welcome screen provider ${provider.name} failed:`, error)

      return fallback
    }
  }
}
