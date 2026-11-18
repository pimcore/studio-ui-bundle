/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface WelcomeScreenOption {
  id: string
  label: string
}

/** Offers the pages a user can choose as welcome screen and opens the chosen one after login. */
export interface WelcomeScreenProvider {
  readonly name: string
  /** The pages the logged-in user may open. Called after the app loaders have finished. */
  getOptions: () => WelcomeScreenOption[]
  /** Opens the page with this ID; false when it does not exist or the user may not open it. */
  open: (id: string) => boolean
}

export class WelcomeScreenRegistry {
  protected readonly providers = new Map<string, WelcomeScreenProvider>()

  registerProvider (provider: WelcomeScreenProvider): void {
    if (this.providers.has(provider.name)) {
      throw new Error(`Welcome screen provider with name "${provider.name}" already exists`)
    }

    this.providers.set(provider.name, provider)
  }

  getProviders (): WelcomeScreenProvider[] {
    return Array.from(this.providers.values())
  }

  getOptions (): WelcomeScreenOption[] {
    return this.getProviders().flatMap((provider) => this.callProvider(provider, () => provider.getOptions(), []))
  }

  open (id: string): boolean {
    return this.getProviders().some((provider) => this.callProvider(provider, () => provider.open(id), false))
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
