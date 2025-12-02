/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRestorer } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { updateWidget, type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type AppDispatch } from '@sdk/app'
import { container } from '@Pimcore/app/depency-injection'
import { type IMainNavItem, type MainNavRegistry } from './main-nav-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { merge, isNil, isString } from 'lodash'

export class MainNavWidgetRestorer implements WidgetRestorer {
  supports (config: WidgetManagerTabConfig): boolean {
    if (isString(config.config?.mainNavPath)) {
      return true
    }

    return !isNil(this.findItemByWidgetConfig(config))
  }

  restore (config: WidgetManagerTabConfig, dispatch: AppDispatch): boolean {
    const item = this.findItem(config)

    if (isNil(item)) {
      return false
    }

    if (!isNil(item.permission) && !isAllowed(item.permission)) {
      return false
    }

    if (!isNil(item.perspectivePermission) && !isAllowedInPerspective(item.perspectivePermission)) {
      return false
    }

    if (!isNil(item.widgetConfig)) {
      const mergedConfig = merge({}, config, item.widgetConfig)

      if (isNil(mergedConfig.config)) {
        mergedConfig.config = {}
      }
      mergedConfig.config.mainNavPath = item.path

      dispatch(updateWidget(mergedConfig))
      return true
    }

    return false
  }

  private findItem (config: WidgetManagerTabConfig): IMainNavItem | undefined {
    if (isString(config.config?.mainNavPath)) {
      const mainNavRegistry = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
      return mainNavRegistry.getMainNavItem(config.config.mainNavPath)
    }
    return this.findItemByWidgetConfig(config)
  }

  private findItemByWidgetConfig (config: WidgetManagerTabConfig): IMainNavItem | undefined {
    const mainNavRegistry = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    const items = mainNavRegistry.getMainNavItems()

    return items.find(item =>
      item.widgetConfig?.id === config.id &&
      item.widgetConfig?.component === config.component
    )
  }
}
