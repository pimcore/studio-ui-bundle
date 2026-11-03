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
  openMainWidget,
  setActiveWidgetById,
  toggleMainWidgetMaximize,
  updateInnerModel,
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

const maximizedTabset = (json: IJsonModel): string | undefined => Model.fromJson(json).getMaximizedTabset()?.getId()

describe('widget-manager-slice maximize of a split tabset', () => {
  const { reducer } = (injectSliceWithState as jest.Mock).mock.calls[0][0] as { reducer: Reducer<WidgetManagerState, UnknownAction> }
  const createState = (innerModel: IJsonModel): WidgetManagerState => ({ ...initialState, innerModel })

  it('lets the tabset of the main tab fill the main area and undoes it on the second toggle', () => {
    const state = createState(splitLayout)
    const maximized = reducer(state, toggleMainWidgetMaximize('bike'))
    const restored = reducer(maximized, toggleMainWidgetMaximize('bike'))

    expect(maximizedTabset(maximized.innerModel)).toBe('bike_tabset')
    expect(maximizedTabset(restored.innerModel)).toBeUndefined()
    expect(maximized.outerModel).toBe(state.outerModel)
  })

  it('does nothing without a split', () => {
    const maximized = reducer(createState(singleTabset), toggleMainWidgetMaximize('car'))

    expect(maximizedTabset(maximized.innerModel)).toBeUndefined()
  })

  it.each([
    ['the kept main tabset', ['car'], ['bike', 'scooter']],
    ['a removable tabset', ['scooter', 'bike'], ['car']]
  ])('shows the remaining tabs when the last tab of the maximized tabset closes (%s)', (_, closedIds, remainingIds) => {
    const maximized = reducer(createState(splitLayoutKeptMainTabset), toggleMainWidgetMaximize(closedIds[0]))
    const closed = closedIds.reduce((current, tabId) => reducer(current, closeWidget(tabId)), maximized)

    expect(maximizedTabset(closed.innerModel)).toBeUndefined()
    remainingIds.forEach((tabId) => { expect(Model.fromJson(closed.innerModel).getNodeById(tabId)).toBeDefined() })
  })

  it('keeps the maximize when another tab of the maximized tabset remains', () => {
    const maximized = reducer(createState(splitLayoutKeptMainTabset), toggleMainWidgetMaximize('bike'))
    const closed = reducer(maximized, closeWidget('scooter'))

    expect(maximizedTabset(closed.innerModel)).toBe('bike_tabset')
  })

  it.each([
    ['a new main tab', openMainWidget({ id: 'truck', type: 'tab', component: 'element', config: {} })],
    ['an open main tab of the hidden tabset', openMainWidget({ id: 'car', type: 'tab', component: 'element', config: {} })],
    ['a selected main tab of the hidden tabset', setActiveWidgetById('car')]
  ])('shows all tab groups again for %s', (_, action) => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('bike'))
    const opened = reducer(maximized, action)

    expect(maximizedTabset(opened.innerModel)).toBeUndefined()
  })

  it('keeps the maximize for a main tab opened in the maximized tabset', () => {
    const maximized = reducer(createState(splitLayout), toggleMainWidgetMaximize('car'))
    const opened = reducer(maximized, openMainWidget({ id: 'truck', type: 'tab', component: 'element', config: {} }))

    expect(maximizedTabset(opened.innerModel)).toBe('main_tabset')
  })
})
