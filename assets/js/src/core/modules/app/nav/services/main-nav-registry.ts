/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
