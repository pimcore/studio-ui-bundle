/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A double-click on the title of a main tab toggles the maximized main area. FlexLayout's drag
 * handling swallows the dblclick event, so the second press of the double-click is the trigger.
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { type TabNode } from 'flexlayout-react'

const dispatch = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('../widget-manager-slice', () => ({
  toggleMainWidgetMaximize: (nodeId: string) => ({ type: 'toggle', payload: nodeId })
}))

jest.mock('./tab-title-outer-container', () => ({
  TabTitleOuterContainer: () => <span data-testid='title'>car</span>
}))

// eslint-disable-next-line import/first
import { MainTabTitle } from './main-tab-title'

describe('MainTabTitle', () => {
  const node = { getId: () => 'car' } as unknown as TabNode

  beforeEach(() => {
    dispatch.mockClear()
  })

  it('toggles the maximized main area on the second press of a double-click', () => {
    render(<MainTabTitle node={ node } />)

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 1 })
    expect(dispatch).not.toHaveBeenCalled()

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 2 })
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggle', payload: 'car' })
  })

  it('ignores a middle-click double-click, which closes tabs', () => {
    render(<MainTabTitle node={ node } />)

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 1, detail: 2 })

    expect(dispatch).not.toHaveBeenCalled()
  })
})
