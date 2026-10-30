/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { type IJsonModel, Model, type TabSetNode } from 'flexlayout-react'
import { injectSliceWithState } from '@sdk/app'
import {
  closeWidget,
  initialState,
  openBottomWidget,
  openMainWidget,
  setActiveWidgetById,
  toggleMainWidgetMaximize,
  updateInnerModel,
  updateOuterModel,
  type WidgetManagerState
} from './widget-manager-slice'

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

jest.mock('./utils/widget-manager-outer-model', () => ({
  getInitialModelJson: () => ({ global: {}, layout: { type: 'row', children: [] } })
}))

jest.mock('./widget-manager-persistence', () => ({
  createWidgetManagerPersistedReducer: (sliceReducer: unknown) => sliceReducer
}))

// a layout saved before the min tabset size existed: the splitter was dragged
// fully to the right while the car tab was still open
const legacyCollapsedSplit: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'car_tabset', weight: 50, children: [{ type: 'tab', id: 'car', component: 'element' }] },
      { type: 'tabset', id: 'main_tabset', weight: 0, enableDeleteWhenEmpty: false, children: [] }
    ]
  }
}

describe('widget-manager-slice', () => {
  const { reducer } = (injectSliceWithState as jest.Mock).mock.calls[0][0] as { reducer: Reducer<WidgetManagerState, UnknownAction> }

  it('restores the main tabset weight when closing the last tab beside it', () => {
    const restored = reducer(initialState, updateInnerModel(legacyCollapsedSplit))
    const closed = reducer(restored, closeWidget('car'))

    const mainTabset = Model.fromJson(closed.innerModel).getNodeById('main_tabset') as TabSetNode

    expect(mainTabset.getWeight()).toBeGreaterThan(0)
  })
})

// the tree is open on the left, the right side widget is closed
const outerLayout: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'inner', component: 'inner-widget-manager' }] },
      { type: 'tabset', id: 'bottom_tabset', children: [{ type: 'tab', id: 'jobs', component: 'jobs' }] }
    ]
  },
  borders: [
    { type: 'border', location: 'left', selected: 0, children: [{ type: 'tab', id: 'tree', component: 'tree' }, { type: 'tab', id: 'search', component: 'search' }] },
    { type: 'border', location: 'right', selected: -1, children: [{ type: 'tab', id: 'notes', component: 'notes' }] }
  ]
}

const singleTabset: IJsonModel = {
  global: {},
  layout: { type: 'row', id: 'main', children: [{ type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] }] }
}

const splitLayout: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] },
      { type: 'tabset', id: 'bike_tabset', children: [{ type: 'tab', id: 'bike', component: 'element' }] }
    ]
  }
}

// like the real inner layout: the main tabset stays when emptied, other tabsets are removed
const splitLayoutKeptMainTabset: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'main_tabset', enableDeleteWhenEmpty: false, children: [{ type: 'tab', id: 'car', component: 'element' }] },
      {
        type: 'tabset',
        id: 'bike_tabset',
        children: [{ type: 'tab', id: 'bike', component: 'element' }, { type: 'tab', id: 'scooter', component: 'element' }]
      }
    ]
  }
}

const openSideWidgets = (json: IJsonModel): Array<string | undefined> =>
  Model.fromJson(json).getBorderSet().getBorders().map((border) => border.getSelectedNode()?.getId())

const maximizedTabset = (json: IJsonModel): string | undefined => Model.fromJson(json).getMaximizedTabset()?.getId()

describe('widget-manager-slice maximize of the main area', () => {
  const { reducer } = (injectSliceWithState as jest.Mock).mock.calls[0][0] as { reducer: Reducer<WidgetManagerState, UnknownAction> }
  const createState = (innerModel: IJsonModel): WidgetManagerState => ({ ...initialState, outerModel: outerLayout, innerModel })

  it('hides the bottom panel and closes the open side widgets', () => {
    const state = createState(singleTabset)
    const maximized = reducer(state, toggleMainWidgetMaximize('car'))

    expect(maximizedTabset(maximized.outerModel)).toBe('main_tabset')
    expect(openSideWidgets(maximized.outerModel)).toEqual([undefined, undefined])
    expect(maximized.innerModel).toBe(state.innerModel)
  })

  it('reopens exactly the side widgets that were open before on the second toggle', () => {
    const maximized = reducer(createState(singleTabset), toggleMainWidgetMaximize('car'))
    const restored = reducer(maximized, toggleMainWidgetMaximize('car'))

    expect(maximizedTabset(restored.outerModel)).toBeUndefined()
    expect(openSideWidgets(restored.outerModel)).toEqual(['tree', undefined])
    expect(restored.maximizeRestoreTabIds).toBeUndefined()
  })

  it('maximizes the tabset of the main tab in a split layout and undoes it on restore', () => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('bike'))
    const restored = reducer(maximized, toggleMainWidgetMaximize('bike'))

    expect(maximizedTabset(maximized.innerModel)).toBe('bike_tabset')
    expect(maximizedTabset(restored.innerModel)).toBeUndefined()
  })

  it('ends the mode when a side widget is opened, without reopening the earlier ones', () => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('bike'))
    const opened = reducer(maximized, setActiveWidgetById('search'))

    expect(maximizedTabset(opened.outerModel)).toBeUndefined()
    expect(maximizedTabset(opened.innerModel)).toBeUndefined()
    expect(openSideWidgets(opened.outerModel)).toEqual(['search', undefined])
    expect(opened.maximizeRestoreTabIds).toBeUndefined()
  })

  it('ends the mode when a bottom widget is opened', () => {
    const maximized = reducer(createState(singleTabset), toggleMainWidgetMaximize('car'))
    const opened = reducer(maximized, openBottomWidget({ id: 'jobs', type: 'tab', component: 'jobs', config: {} }))

    expect(maximizedTabset(opened.outerModel)).toBeUndefined()
    expect(openSideWidgets(opened.outerModel)).toEqual([undefined, undefined])
  })

  it('restores the layout when the last main tab is closed', () => {
    const maximized = reducer(createState(singleTabset), toggleMainWidgetMaximize('car'))
    const closed = reducer(maximized, closeWidget('car'))

    expect(maximizedTabset(closed.outerModel)).toBeUndefined()
    expect(openSideWidgets(closed.outerModel)).toEqual(['tree', undefined])
  })

  it.each([
    ['the kept main tabset', ['car']],
    ['a removable tabset', ['scooter', 'bike']]
  ])('ends the mode when the last tab of the maximized tabset in a split layout closes (%s)', (_, tabIds) => {
    const maximized = reducer(createState(splitLayoutKeptMainTabset), toggleMainWidgetMaximize(tabIds[0]))
    const closed = tabIds.reduce((current, tabId) => reducer(current, closeWidget(tabId)), maximized)

    expect(maximizedTabset(closed.outerModel)).toBeUndefined()
    expect(maximizedTabset(closed.innerModel)).toBeUndefined()
    expect(openSideWidgets(closed.outerModel)).toEqual(['tree', undefined])
    expect(closed.maximizeRestoreTabIds).toBeUndefined()
  })

  it('keeps the mode when another tab of the maximized tabset remains', () => {
    const maximized = reducer(createState(splitLayoutKeptMainTabset), toggleMainWidgetMaximize('bike'))
    const closed = reducer(maximized, closeWidget('scooter'))

    expect(maximizedTabset(closed.outerModel)).toBe('main_tabset')
    expect(maximizedTabset(closed.innerModel)).toBe('bike_tabset')
  })

  it.each([
    ['a new main tab', openMainWidget({ id: 'truck', type: 'tab', component: 'element', config: {} })],
    ['an open main tab of the hidden tabset', openMainWidget({ id: 'car', type: 'tab', component: 'element', config: {} })],
    ['a selected main tab of the hidden tabset', setActiveWidgetById('car')]
  ])('shows both tab groups but keeps the mode for %s', (_, action) => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('bike'))
    const opened = reducer(maximized, action)

    expect(maximizedTabset(opened.innerModel)).toBeUndefined()
    expect(maximizedTabset(opened.outerModel)).toBe('main_tabset')
    expect(opened.maximizeRestoreTabIds).toEqual(['tree'])
  })

  it('keeps the split maximize for a main tab opened in the maximized tabset', () => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('car'))
    const opened = reducer(maximized, openMainWidget({ id: 'truck', type: 'tab', component: 'element', config: {} }))

    expect(maximizedTabset(opened.innerModel)).toBe('main_tabset')
  })

  it('drops the split maximize when the outer layout is replaced, e.g. by a perspective switch', () => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('bike'))
    const replaced = reducer(maximized, updateOuterModel(outerLayout))

    expect(maximizedTabset(replaced.innerModel)).toBeUndefined()
    expect(replaced.maximizeRestoreTabIds).toBeUndefined()
  })
})
