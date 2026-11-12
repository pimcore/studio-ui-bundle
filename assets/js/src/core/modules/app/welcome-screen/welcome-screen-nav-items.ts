/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IMainNavItem } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'

// Widget of the dashboard entries the studio-dashboards-bundle adds for dashboards with a menu shortcut
export const DASHBOARD_WIDGET_COMPONENT = 'dashboard-single-container'

export const getWelcomeScreenNavItems = (navItems: IMainNavItem[]): IMainNavItem[] => {
  return navItems.flatMap((item) => [
    ...(item.widgetConfig?.component === DASHBOARD_WIDGET_COMPONENT ? [item] : []),
    ...getWelcomeScreenNavItems(item.children ?? [])
  ])
}
