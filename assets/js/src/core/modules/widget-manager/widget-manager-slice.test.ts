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
import { type IJsonModel, type IJsonTabSetNode, Model, type TabSetNode } from 'flexlayout-react'
import { injectSliceWithState } from '@sdk/app'
import {
  closeWidget,
  expandMainWidget,
  initialState,
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

// like the real inner layout: only the main tabset stays when emptied
const bikeTabsetBesideEmptyMainTabset = (others: IJsonModel['layout']['children'] = []): IJsonModel => ({
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'main_tabset', enableDeleteWhenEmpty: false, children: [] },
      ...others,
      {
        type: 'tabset',
        id: 'bike_tabset',
        selected: 1,
        children: [{ type: 'tab', id: 'bike', component: 'element' }, { type: 'tab', id: 'scooter', component: 'element' }]
      }
    ]
  }
})

const tabsets = (json: IJsonModel): string[] => {
  const result: string[] = []
  Model.fromJson(json).visitNodes((node) => {
    if (node.getType() === 'tabset') {
      result.push(`${node.getId()}:${node.getChildren().map((tab) => tab.getId()).join('+')}`)
    }
  })
  return result
}

describe('widget-manager-slice expand of a main widget tabset', () => {
  const { reducer } = (injectSliceWithState as jest.Mock).mock.calls[0][0] as { reducer: Reducer<WidgetManagerState, UnknownAction> }
  const createState = (innerModel: IJsonModel): WidgetManagerState => ({ ...initialState, innerModel })

  it('moves the tabs into the empty main tabset, which then fills the main area', () => {
    const state = createState(bikeTabsetBesideEmptyMainTabset())
    const expanded = reducer(state, expandMainWidget('bike'))
    const model = Model.fromJson(expanded.innerModel)

    expect(tabsets(expanded.innerModel)).toEqual(['main_tabset:bike+scooter'])
    expect((model.getNodeById('main_tabset') as TabSetNode).getSelectedNode()?.getId()).toBe('bike')
    expect(model.getMaximizedTabset()).toBeUndefined()
    expect(expanded.mainWidgetContext).toEqual({ nodeId: 'bike' })
    expect(expanded.outerModel).toBe(state.outerModel)
  })

  it('moves only the tabs of the double-clicked tabset', () => {
    const car: IJsonTabSetNode = { type: 'tabset', id: 'car_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] }
    const expanded = reducer(createState(bikeTabsetBesideEmptyMainTabset([car])), expandMainWidget('scooter'))

    expect(tabsets(expanded.innerModel)).toEqual(['main_tabset:bike+scooter', 'car_tabset:car'])
  })

  it('moves the tabs in a vertical split, where the tabsets sit in a nested row', () => {
    const vertical = bikeTabsetBesideEmptyMainTabset()
    const expanded = reducer(createState({ ...vertical, layout: { type: 'row', id: 'main', children: [{ ...vertical.layout, id: 'nested' }] } }), expandMainWidget('bike'))

    expect(tabsets(expanded.innerModel)).toEqual(['main_tabset:bike+scooter'])
  })

  it.each([
    ['without a split', singleTabset],
    ['when no tabset is empty', splitLayout]
  ])('leaves the state untouched %s', (_, layout) => {
    const state = createState(layout)

    expect(reducer(state, expandMainWidget('car'))).toBe(state)
  })

  it('gives a collapsed empty main tabset its width back', () => {
    const expanded = reducer(createState(legacyCollapsedSplit), expandMainWidget('car'))
    const mainTabset = Model.fromJson(expanded.innerModel).getNodeById('main_tabset') as TabSetNode

    expect(tabsets(expanded.innerModel)).toEqual(['main_tabset:car'])
    expect(mainTabset.getWeight()).toBeGreaterThan(0)
  })
})
