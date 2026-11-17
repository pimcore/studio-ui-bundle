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
import { type TabNode } from 'flexlayout-react'
import { MainTabTitle } from './main-tab-title'
import { type TabTitleLabelContext } from './tab-title-label-context'
import { TabContextMenuContext } from '../hooks/use-context-menu'

jest.mock('@sdk/app', () => ({
  useAppSelector: (selector: () => unknown) => selector()
}))

jest.mock('../widget-manager-slice', () => ({
  selectMainWidgetContext: () => ({ nodeId: 'car' })
}))

jest.mock('../hooks/use-context-menu', () => ({
  TabContextMenuContext: jest.requireActual('react').createContext({ openTabId: null })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: new Proxy({}, { get: (_target, name) => String(name) }) })
}))

// the label part of TabTitleView, which takes the context props, next to the close button
jest.mock('./tab-title-outer-container', () => ({
  TabTitleOuterContainer: ({ node }: { node: TabNode }) => {
    const { useContext } = jest.requireActual<typeof React>('react')
    const labelProps = useContext(jest.requireActual('./tab-title-label-context').TabTitleLabelContext as typeof TabTitleLabelContext)

    return (
      <>
        <span
          { ...labelProps }
          data-testid={ `label-${node.getId()}` }
        >
          {node.getId()}
        </span>
        <button data-testid={ `close-${node.getId()}` }>x</button>
      </>
    )
  }
}))

const car = { getId: () => 'car' } as unknown as TabNode
const bike = { getId: () => 'bike' } as unknown as TabNode

const renderTitles = (openTabId: string | null = null): jest.Mock => {
  const openFromKeyboard = jest.fn()

  render(
    <TabContextMenuContext.Provider value={ { openTabId, openFromKeyboard } }>
      <MainTabTitle node={ car } />
      <MainTabTitle node={ bike } />
    </TabContextMenuContext.Provider>
  )

  return openFromKeyboard
}

describe('MainTabTitle', () => {
  it('makes the icon and name of the active tab, and only those, a menu button', () => {
    renderTitles()

    const label = screen.getByTestId('label-car')
    expect(label.getAttribute('role')).toBe('button')
    expect(label.getAttribute('tabindex')).toBe('0')
    expect(label.getAttribute('aria-haspopup')).toBe('menu')
    expect(label.getAttribute('aria-expanded')).toBe('false')

    expect(screen.getByTestId('label-bike').hasAttribute('tabindex')).toBe(false)
    expect(screen.getByTestId('label-bike').hasAttribute('role')).toBe(false)
  })

  it('marks the menu button as expanded while its menu is open', () => {
    renderTitles('car')

    expect(screen.getByTestId('label-car').getAttribute('aria-expanded')).toBe('true')
  })

  it.each([
    ['Enter', {}],
    ['Space', { key: ' ' }],
    ['the context menu key', { key: 'ContextMenu' }],
    ['Shift+F10', { key: 'F10', shiftKey: true }]
  ])('opens the tab menu from the keyboard with %s', (_, init) => {
    const openFromKeyboard = renderTitles()
    const label = screen.getByTestId('label-car')

    fireEvent.keyDown(label, { key: 'Enter', ...init })

    expect(openFromKeyboard).toHaveBeenCalledWith(car, label)
  })

  it('opens the tab menu for a click without a mouse press, which screen readers send', () => {
    const openFromKeyboard = renderTitles()
    const label = screen.getByTestId('label-car')

    fireEvent.click(label, { detail: 0 })

    expect(openFromKeyboard).toHaveBeenCalledWith(car, label)
  })

  it('leaves a mouse click on the label to the tab', () => {
    const openFromKeyboard = renderTitles()

    fireEvent.click(screen.getByTestId('label-car'), { detail: 1 })

    expect(openFromKeyboard).not.toHaveBeenCalled()
  })

  it.each([
    ['another key on the label', 'label-car', 'a'],
    ['Enter on the close button', 'close-car', 'Enter']
  ])('leaves %s alone', (_, target, key) => {
    const openFromKeyboard = renderTitles()

    fireEvent.keyDown(screen.getByTestId(target), { key })

    expect(openFromKeyboard).not.toHaveBeenCalled()
  })
})
