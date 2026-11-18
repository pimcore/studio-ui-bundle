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
import { fireEvent, render, screen } from '@testing-library/react'
import { useExpandOnDoubleClick } from './use-expand-on-double-click'

const mockExpandMainWidget = jest.fn()

jest.mock('./use-widget-manager', () => ({
  useWidgetManager: () => ({ expandMainWidget: mockExpandMainWidget })
}))

// the markup FlexLayout and MainTabTitle render for a main tab
const MainTabs = ({ generation = 0 }: { generation?: number }): React.JSX.Element => {
  useExpandOnDoubleClick()

  return (
    <>
      {['car', 'bike'].map((id) => (
        <div
          className='flexlayout__tab_button'
          data-testid={ `tab-${id}` }
          key={ `${id}-${generation}` }
        >
          <span
            className='widget-manager__main-tab-title'
            data-tab-id={ id }
          >
            <span data-testid={ `title-${id}` }>{id}</span>
            <button data-testid={ `close-${id}` }>x</button>
          </span>
        </div>
      ))}
    </>
  )
}

const press = (testId: string, detail: number, button = 0): void => {
  fireEvent.mouseDown(screen.getByTestId(testId), { button, detail })
}

describe('useExpandOnDoubleClick', () => {
  beforeEach(() => {
    mockExpandMainWidget.mockClear()
  })

  it.each([
    ['its title', 'title-car'],
    ['its padding', 'tab-car']
  ])('expands a main tab on the second press of a double-click on %s', (_, target) => {
    render(<MainTabs />)

    press(target, 1)
    expect(mockExpandMainWidget).not.toHaveBeenCalled()

    press(target, 2)
    expect(mockExpandMainWidget).toHaveBeenCalledWith('car')
  })

  it.each([
    ['another tab', 'title-bike'],
    ['the close button', 'close-car']
  ])('ignores a double-click whose first press hit %s', (_, firstTarget) => {
    render(<MainTabs />)

    press('title-car', 1)
    press(firstTarget, 1)
    press('title-car', 2)

    expect(mockExpandMainWidget).not.toHaveBeenCalled()
  })

  it.each([
    ['on the close button', 'close-car', 0],
    ['with the middle button, which closes tabs', 'title-car', 1]
  ])('ignores a double-click %s', (_, target, button) => {
    render(<MainTabs />)

    press(target, 1, button)
    press(target, 2, button)

    expect(mockExpandMainWidget).not.toHaveBeenCalled()
  })

  it('expands when the first press remounts the tab, as activating a group beside an empty one does', () => {
    const { rerender } = render(<MainTabs />)

    press('title-car', 1)
    rerender(<MainTabs generation={ 1 } />)
    press('title-car', 2)

    expect(mockExpandMainWidget).toHaveBeenCalledWith('car')
  })
})
