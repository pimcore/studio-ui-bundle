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
  order?: number
  id?: string
  icon?: string
  path: string
  label?: string
  children?: IMainNavItem[]
  permission?: string
  widgetConfig?: WidgetManagerTabConfig
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
      const levels = action.payload.path.split('/')
      let currentLevel = state.items

      if (levels.length > 4) {
        console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', action.payload)
        return
      }

      levels.forEach((level, index) => {
        let existingItem = currentLevel.find(item => item.id === level)
        if (existingItem !== undefined && index === levels.length - 1) {
          if (action.payload.icon !== undefined) {
            existingItem.icon = action.payload.icon
          }

          if (action.payload.order !== undefined) {
            existingItem.order = action.payload.order
          }
        }

        if (existingItem === undefined) {
          existingItem = {
            order: index === levels.length - 1 ? action.payload.order : undefined,
            id: level,
            label: level,
            path: levels.slice(0, index + 1).join('/'),
            children: [],
            icon: index === levels.length - 1 ? action.payload.icon : undefined,
            widgetConfig: index === levels.length - 1 ? action.payload.widgetConfig : undefined
          }

          currentLevel.push(existingItem)
        }

        // Sort children by order
        currentLevel = existingItem.children !== undefined
          ? existingItem.children.sort((a, b) => {
            return (a.order ?? 20) - (b.order ?? 20)
          })
          : []
      })

      // Sort items by order
      state.items = state.items.sort((a, b) => {
        return (a.order ?? 20) - (b.order ?? 20)
      })
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
