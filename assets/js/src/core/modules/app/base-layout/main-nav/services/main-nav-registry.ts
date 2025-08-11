/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { injectable } from 'inversify'
import type React from 'react'

export interface IMainNavItem {
  path: string
  order?: number
  id?: string
  icon?: string
  label?: string
  divider?: boolean
  children?: IMainNavItem[]
  permission?: string
  perspectivePermission?: string
  perspectivePermissionHide?: string
  onClick?: () => void
  button?: () => React.JSX.Element
  widgetConfig?: WidgetManagerTabConfig
  className?: string
}

@injectable()
export class MainNavRegistry {
  private readonly items: IMainNavItem[] = []

  registerMainNavItem (item: IMainNavItem): void {
    this.items.push(item)
  }

  getMainNavItem (path: string): IMainNavItem | undefined {
    return this.items.find((item) => item.path === path)
  }

  getMainNavItems (): IMainNavItem[] {
    return this.items
  }
}
