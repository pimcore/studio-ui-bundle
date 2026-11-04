/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useImperativeHandle, useRef } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type IJsonModel, Model, type TabNode } from 'flexlayout-react'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useContextMenu } from './use-context-menu'

jest.mock('@Pimcore/modules/widget-manager/hooks/use-widget-manager', () => ({
  useWidgetManager: () => ({ closeWidget: jest.fn() })
}))

jest.mock('@Pimcore/utils/hooks/use-click-outside', () => ({ useClickOutside: jest.fn() }))

jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: ({ menu, menuRef }: DropdownProps): React.JSX.Element => {
    const list = useRef<HTMLUListElement>(null)
    useImperativeHandle(menuRef, () => ({ menu: { list: list.current }, focus: () => list.current?.focus() }) as any)

    return (
      <ul
        data-testid='menu'
        onKeyDown={ menu.onKeyDown }
        ref={ list }
        role='menu'
        tabIndex={ -1 }
      />
    )
  }
}))

const model = Model.fromJson({
  global: {},
  layout: { type: 'row', id: 'main', children: [{ type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] }] }
} satisfies IJsonModel)

const Tab = (): React.JSX.Element => {
  const { showContextMenu, dropdown } = useContextMenu(model, () => [{ key: 'close-tab', label: 'Close Tab' }])

  return (
    <>
      <button
        data-testid='tab'
        onContextMenu={ (event) => { showContextMenu?.(model.getNodeById('car') as TabNode, event) } }
      >
        car
      </button>
      { dropdown }
    </>
  )
}

describe('useContextMenu', () => {
  it.each(['Escape', 'Tab'])('moves the focus into a menu opened by keyboard and back to the tab on %s', async (key) => {
    render(<Tab />)
    const tab = screen.getByTestId('tab')
    tab.focus()

    fireEvent.contextMenu(tab, { button: -1 })
    await waitFor(() => { expect(document.activeElement).toBe(screen.getByTestId('menu')) })

    fireEvent.keyDown(screen.getByTestId('menu'), { key })

    expect(screen.queryByTestId('menu')).toBeNull()
    await waitFor(() => { expect(document.activeElement).toBe(tab) })
  })

  it('leaves the focus where it is for a menu opened with the mouse', async () => {
    render(<Tab />)

    fireEvent.contextMenu(screen.getByTestId('tab'), { button: 2 })
    await new Promise((resolve) => requestAnimationFrame(resolve))

    expect(screen.getByTestId('menu')).toBeTruthy()
    expect(document.activeElement).toBe(document.body)
  })
})
