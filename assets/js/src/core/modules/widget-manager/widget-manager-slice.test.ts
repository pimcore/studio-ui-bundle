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
import { closeWidget, initialState, updateInnerModel, type WidgetManagerState } from './widget-manager-slice'

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
