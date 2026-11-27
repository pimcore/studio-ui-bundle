/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { type IJsonModel } from 'flexlayout-react'
import { loadReduxState } from '../../../utils/redux-state-persistence'
import { isFocusMode } from '@Pimcore/modules/app/focus-mode/focus-mode'
import { setWidgetManagerRestored, updateInnerModel } from '../widget-manager-slice'
import { WidgetRestorer } from './widget-restorer'

const dispatch = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: 2 })
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ restore: async () => true })
  }
}))

jest.mock('../../../utils/redux-state-persistence', () => ({
  loadReduxState: jest.fn()
}))

jest.mock('../widget-manager-persistence', () => ({
  getWidgetManagerStorageKey: (userId: number) => `widget_manager_inner_model_${userId}`
}))

jest.mock('../widget-manager-slice', () => ({
  updateInnerModel: (payload: unknown) => ({ type: 'updateInnerModel', payload }),
  closeWidget: (payload: unknown) => ({ type: 'closeWidget', payload }),
  setWidgetManagerRestored: (payload: unknown) => ({ type: 'setWidgetManagerRestored', payload })
}))

jest.mock('@Pimcore/modules/app/focus-mode/focus-mode', () => ({
  ...jest.requireActual('@Pimcore/modules/app/focus-mode/focus-mode'),
  isFocusMode: jest.fn()
}))

const savedLayout: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [{
      type: 'tabset',
      id: 'main_tabset',
      children: [{ type: 'tab', id: 'saved', name: 'saved', component: 'some-widget', config: {} }]
    }]
  }
}

describe('WidgetRestorer', () => {
  beforeEach(() => {
    dispatch.mockClear()
    jest.mocked(loadReduxState).mockReset().mockReturnValue(savedLayout)
  })

  it('restores the saved layout in the full Studio', async () => {
    jest.mocked(isFocusMode).mockReturnValue(false)

    render(<WidgetRestorer />)

    await waitFor(() => { expect(dispatch).toHaveBeenCalledWith(setWidgetManagerRestored(true)) })
    expect(loadReduxState).toHaveBeenCalledWith('widget_manager_inner_model_2')
    expect(dispatch).toHaveBeenCalledWith(updateInnerModel(savedLayout))
  })

  it('starts the focus view empty without reading the saved layout', async () => {
    jest.mocked(isFocusMode).mockReturnValue(true)

    render(<WidgetRestorer />)

    await waitFor(() => { expect(dispatch).toHaveBeenCalledWith(setWidgetManagerRestored(true)) })
    expect(loadReduxState).not.toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch.mock.calls[0][0].payload.global.tabSetEnableTabStrip).toBe(false)
  })
})
