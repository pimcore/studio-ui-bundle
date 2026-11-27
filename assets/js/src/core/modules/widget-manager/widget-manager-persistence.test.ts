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
import { type IJsonModel } from 'flexlayout-react'
import { setLocalStorageItem } from '../../utils/local-storage'
import { isFocusMode } from '@Pimcore/modules/app/focus-mode/focus-mode'
import { createWidgetManagerPersistedReducer } from './widget-manager-persistence'
import { type WidgetManagerState } from './widget-manager-slice'

jest.mock('@sdk/app', () => ({
  store: { getState: () => ({}) }
}))

jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  selectCurrentUser: () => ({ id: 2 })
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({
      supports: () => true,
      cleanConfig: (config: unknown) => config
    })
  }
}))

jest.mock('../../utils/local-storage', () => ({
  getLocalStorageItem: jest.fn(),
  setLocalStorageItem: jest.fn()
}))

jest.mock('@Pimcore/modules/app/focus-mode/focus-mode', () => ({
  isFocusMode: jest.fn()
}))

const layoutWith = (tabId: string): IJsonModel => ({
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [{
      type: 'tabset',
      id: 'main_tabset',
      children: [{ type: 'tab', id: tabId, name: tabId, component: 'some-widget', config: {} }]
    }]
  }
})

const sliceReducer: Reducer<WidgetManagerState, UnknownAction> = (state, action) => {
  const current = state ?? { outerModel: layoutWith('outer'), innerModel: layoutWith('start'), mainWidgetContext: null, restored: false }

  return action.type === 'open' ? { ...current, innerModel: (action as UnknownAction & { payload: IJsonModel }).payload } : current
}

describe('widget manager persistence', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.mocked(setLocalStorageItem).mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const openTab = (focus: boolean): void => {
    jest.mocked(isFocusMode).mockReturnValue(focus)
    const reducer = createWidgetManagerPersistedReducer(sliceReducer)
    const state = reducer(undefined, { type: 'init' })

    reducer(state, { type: 'open', payload: layoutWith('change-request') })
    jest.runAllTimers()
  }

  it('saves the layout per user in the full Studio', () => {
    openTab(false)

    expect(setLocalStorageItem).toHaveBeenCalledTimes(1)
    expect(jest.mocked(setLocalStorageItem).mock.calls[0][0]).toBe('widget_manager_inner_model_2')
    expect(jest.mocked(setLocalStorageItem).mock.calls[0][1]).toContain('change-request')
  })

  it('leaves the saved layout alone in the focus view', () => {
    openTab(true)

    expect(setLocalStorageItem).not.toHaveBeenCalled()
  })
})
