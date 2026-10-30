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
import { MainTabTitle } from './main-tab-title'

const mockDispatch = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch
}))

jest.mock('../widget-manager-slice', () => ({
  toggleMainWidgetMaximize: (nodeId: string) => ({ type: 'toggle', payload: nodeId })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: new Proxy({}, { get: (_target, name) => String(name) }) })
}))

jest.mock('./tab-title-outer-container', () => ({
  TabTitleOuterContainer: ({ node }: { node: TabNode }) => <span data-testid={ node.getId() }>{node.getId()}</span>
}))

describe('MainTabTitle', () => {
  const node = { getId: () => 'title' } as unknown as TabNode

  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it('toggles the maximized main area on the second press of a double-click', () => {
    render(<MainTabTitle node={ node } />)

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 1 })
    expect(mockDispatch).not.toHaveBeenCalled()

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 2 })
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'toggle', payload: 'title' })
  })

  it.each([
    ['another tab title', 'car'],
    ['a close button', 'close']
  ])('ignores a double-click whose first press hit %s', (_, firstTarget) => {
    render(
      <>
        <MainTabTitle node={ node } />
        <MainTabTitle node={ { getId: () => 'car' } as unknown as TabNode } />
        <button data-testid='close'>x</button>
      </>
    )

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 1 })
    fireEvent.mouseDown(screen.getByTestId(firstTarget), { button: 0, detail: 1 })
    fireEvent.mouseDown(screen.getByTestId('title'), { button: 0, detail: 2 })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('ignores a middle-click double-click, which closes tabs', () => {
    render(<MainTabTitle node={ node } />)

    fireEvent.mouseDown(screen.getByTestId('title'), { button: 1, detail: 2 })

    expect(mockDispatch).not.toHaveBeenCalled()
  })
})
