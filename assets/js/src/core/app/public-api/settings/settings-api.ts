/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SystemSettingsGetApiResponse } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { type store } from '@Pimcore/app/store'
import { getSettings } from '@Pimcore/modules/app/settings/settings-slice'

/**
 * Settings API for iframe communication
 * Provides access to system settings from parent window to iframes
 */
export class SettingsApi {
  private store: typeof store | null = null

  /**
   * Initialize the settings API with the Redux store
   * This should be called during app initialization
   */
  public initialize (appStore: typeof store): void {
    this.store = appStore
  }

  /**
   * Get current system settings
   * Returns the settings from the Redux store if available
   */
  public getSettings (): SystemSettingsGetApiResponse | null {
    if (this.store === null) {
      console.warn('Settings API not initialized - Redux store not available')
      return null
    }

    try {
      return getSettings(this.store.getState())
    } catch (error) {
      console.error('Failed to get settings from store:', error)
      return null
    }
  }

  /**
   * Check if settings are available
   */
  public areSettingsAvailable (): boolean {
    return this.store !== null && getSettings(this.store.getState()) !== null
  }
}

export const settingsApi = new SettingsApi()
