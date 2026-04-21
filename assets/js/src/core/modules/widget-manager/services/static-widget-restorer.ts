/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRestorer } from './widget-restorer-registry'
import { updateWidget, type WidgetManagerTabConfig } from '../widget-manager-slice'
import { type AppDispatch } from '@sdk/app'
import { merge, isNil } from 'lodash'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'

export class StaticWidgetRestorer implements WidgetRestorer {
  private readonly widgets: WidgetManagerTabConfig[] = []

  registerStaticWidget (config: WidgetManagerTabConfig): void {
    if (!isNil(config.id) && isNil(this.getStaticWidget(config.id))) {
      this.widgets.push(config)
    }
  }

  getStaticWidget (id: string): WidgetManagerTabConfig | undefined {
    return this.widgets.find(w => w.id === id)
  }

  supports (config: WidgetManagerTabConfig): boolean {
    return !isNil(config.id) && !isNil(this.getStaticWidget(config.id))
  }

  cleanConfig (config: WidgetManagerTabConfig): WidgetManagerTabConfig {
    const cleanedConfig: WidgetManagerTabConfig = {
      id: config.id,
      type: 'tab',
      config: {}
    }
    return cleanedConfig
  }

  restore (config: WidgetManagerTabConfig, dispatch: AppDispatch): boolean {
    if (isNil(config.id)) {
      return false
    }

    const staticConfig = this.getStaticWidget(config.id)

    if (!isNil(staticConfig)) {
      if (!isNil(staticConfig.permission) && !isAllowed(staticConfig.permission)) {
        return false
      }

      const mergedConfig = merge({}, config, staticConfig)
      dispatch(updateWidget(mergedConfig))
      return true
    }

    return false
  }
}

export const staticWidgetRestorer = new StaticWidgetRestorer()
