/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerTabConfig } from '../widget-manager-slice'
import { type AppDispatch } from '@sdk/app'
import { isNil } from 'lodash'
import { injectable } from 'inversify'

export interface WidgetRestorer {
  supports: (config: WidgetManagerTabConfig) => boolean
  restore: (config: WidgetManagerTabConfig, dispatch: AppDispatch) => boolean | Promise<boolean>
  cleanConfig?: (config: WidgetManagerTabConfig) => WidgetManagerTabConfig
}

@injectable()
export class WidgetRestorerRegistry {
  private readonly restorers: WidgetRestorer[] = []

  register (restorer: WidgetRestorer): void {
    this.restorers.push(restorer)
  }

  supports (config: WidgetManagerTabConfig): boolean {
    return this.restorers.some(r => r.supports(config))
  }

  cleanConfig (config: WidgetManagerTabConfig): WidgetManagerTabConfig {
    const restorer = this.restorers.find(r => r.supports(config))
    if (!isNil(restorer?.cleanConfig)) {
      return restorer.cleanConfig(config)
    }
    return config
  }

  async restore (config: WidgetManagerTabConfig, dispatch: AppDispatch): Promise<boolean> {
    const restorer = this.restorers.find(r => r.supports(config))
    if (!isNil(restorer)) {
      return await restorer.restore(config, dispatch)
    }
    return false
  }
}
