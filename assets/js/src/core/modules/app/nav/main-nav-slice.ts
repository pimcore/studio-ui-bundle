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

export interface IMainNavItem {
  id?: string
  icon: string
  path: string
  label?: string
  children?: IMainNavItem[]
  key?: string
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

      levels.forEach((level, index) => {
        let existingItem = currentLevel.find(item => item.id === level)

        if (existingItem === undefined) {
          existingItem = {
            id: level,
            label: level,
            key: `${index}-${index}`,
            icon: 'DataObjectOutlined',
            path: levels.slice(0, index + 1).join('/'),
            children: []
          }
          currentLevel.push(existingItem)
        }

        currentLevel = existingItem.children ?? []
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
