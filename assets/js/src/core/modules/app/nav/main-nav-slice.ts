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

import { injectSliceWithState } from '@Pimcore/app/store/index'
import { createSlice } from '@reduxjs/toolkit'
import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

export interface IMainNavItem {
  path: string
  order?: number
  id?: string
  icon?: string
  label?: string
  children?: IMainNavItem[]
  permission?: string
  widgetConfig?: WidgetManagerTabConfig
  className?: string
}

export interface IMainNavState {
  items: IMainNavItem[]
}

export const initialState: IMainNavState = {
  items: []
}

export const slice = createSlice({
  name: 'main-nav',
  initialState,
  reducers: {
    addNavItem: (state, action) => {
      const item = action.payload

      const levels = item.path.split('/')
      if (levels.length > 4) {
        console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', item)
        return
      }

      let currentLevel = state.items
      levels.forEach((level: string, index) => {
        let existingItem = currentLevel.find(i => i.id === level)
        const isCurrentItem = index === levels.length - 1

        if (existingItem === undefined) {
          existingItem = {
            order: isCurrentItem ? item.order : 100,
            id: level,
            label: level,
            path: levels.slice(0, index + 1).join('/'),
            children: [],
            icon: isCurrentItem ? item.icon : undefined,
            widgetConfig: isCurrentItem ? item.widgetConfig : undefined,
            className: isCurrentItem ? item.className : undefined
          }
          currentLevel.push(existingItem)
        } else if (index === levels.length - 1) {
          Object.assign(existingItem, {
            icon: item.icon,
            order: item.order ?? 100,
            className: item.className
          })
        }

        currentLevel = existingItem.children ?? []
        currentLevel.sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
      })

      state.items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    }
  },
  selectors: {
    getNavItems: (state) => {
      return state.items
    }
  }
})

export const mainNavSliceName = slice.name

injectSliceWithState(slice)

export const { addNavItem } = slice.actions
