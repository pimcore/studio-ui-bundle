/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { Actions, type IJsonModel, Model } from 'flexlayout-react'
import { getSideWidgetMotion, useSideWidgetMotion } from './use-side-widget-motion'
import { motionDuration } from '@Pimcore/utils/motion'

const createModel = (selected: number): Model => Model.fromJson({
  global: {},
  borders: [{
    type: 'border',
    location: 'left',
    selected,
    children: [
      { type: 'tab', id: 'tree', name: 'Tree', component: 'tree' },
      { type: 'tab', id: 'search', name: 'Search', component: 'search' }
    ]
  }],
  layout: {
    type: 'row',
    children: [{
      type: 'tabset',
      children: [{ type: 'tab', id: 'editor', name: 'Editor', component: 'editor' }]
    }]
  }
} satisfies IJsonModel)

describe('getSideWidgetMotion', () => {
  it('opens a side bar when none of its widgets is selected', () => {
    expect(getSideWidgetMotion(createModel(-1), Actions.selectTab('tree'))).toBe('opening')
  })

  it('closes a side bar when its selected widget is selected again', () => {
    expect(getSideWidgetMotion(createModel(0), Actions.selectTab('tree'))).toBe('closing')
  })

  it('ignores switching between widgets of an open side bar', () => {
    expect(getSideWidgetMotion(createModel(0), Actions.selectTab('search'))).toBeNull()
  })

  it('ignores tabs of the main area and other actions', () => {
    const model = createModel(-1)

    expect(getSideWidgetMotion(model, Actions.selectTab('editor'))).toBeNull()
    expect(getSideWidgetMotion(model, Actions.deleteTab('tree'))).toBeNull()
  })
})

describe('useSideWidgetMotion', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('tracks a closing side bar for as long as it animates', () => {
    const { result } = renderHook(() => useSideWidgetMotion(createModel(0)))

    act(() => { result.current.onAction(Actions.selectTab('tree')) })

    expect(result.current.motion).toBe('closing')

    act(() => { jest.advanceTimersByTime(motionDuration.panelLeave) })

    expect(result.current.motion).toBeNull()
  })
})
