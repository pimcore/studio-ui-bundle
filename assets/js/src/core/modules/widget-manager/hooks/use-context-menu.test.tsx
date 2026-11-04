/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useImperativeHandle, useRef, useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type IJsonModel, Model, type TabNode } from 'flexlayout-react'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useContextMenu } from './use-context-menu'

jest.mock('@Pimcore/modules/widget-manager/hooks/use-widget-manager', () => ({
  useWidgetManager: () => ({ closeWidget: jest.fn(), expandMainWidget: jest.fn() })
}))

jest.mock('@Pimcore/utils/hooks/use-click-outside', () => ({ useClickOutside: jest.fn() }))

jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: ({ menu, menuRef }: DropdownProps): React.JSX.Element => {
    const list = useRef<HTMLUListElement>(null)
    useImperativeHandle(menuRef, () => ({ menu: { list: list.current } }) as any)

    return (
      <ul
        data-testid='menu'
        onKeyDown={ menu.onKeyDown }
        ref={ list }
        role='menu'
      >
        {menu.items?.map((item: any) => (
          <li
            className='ant-dropdown-menu-item'
            key={ item.key }
            onClick={ item.onClick }
            onKeyDown={ item.onClick }
            role='menuitem'
            tabIndex={ -1 }
          >
            {item.label}
          </li>
        ))}
      </ul>
    )
  }
}))

const model = Model.fromJson({
  global: {},
  layout: { type: 'row', id: 'main', children: [{ type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] }] }
} satisfies IJsonModel)

const node = model.getNodeById('car') as TabNode

// a main tab rendered like a custom title without `active`; "Remount" stands for an action that rebuilds the tab
const Tab = (): React.JSX.Element => {
  const [generation, setGeneration] = useState(0)
  const { showContextMenu, dropdown, openFromKeyboard, openTabId } = useContextMenu(model, ({ closeContextMenu }) => [
    { key: 'close-tab', label: 'Close Tab', onClick: () => { closeContextMenu() } },
    { key: 'remount', label: 'Remount', onClick: () => { setGeneration((value) => value + 1); closeContextMenu() } }
  ])

  return (
    <>
      <span className='widget-manager-tab-title'>
        <button
          aria-haspopup='menu'
          className='widget-manager-tab-title__label'
          data-open={ openTabId ?? 'none' }
          data-testid={ `label-${generation}` }
          key={ generation }
          onContextMenu={ (event) => { showContextMenu?.(node, event) } }
          onKeyDown={ (event) => { if (event.key === 'Enter') { openFromKeyboard?.(node, event.currentTarget) } } }
        >
          car
        </button>
      </span>
      { dropdown }
    </>
  )
}

const openByKeyboard = async (): Promise<HTMLElement> => {
  render(<Tab />)
  const label = screen.getByTestId('label-0')
  label.focus()
  fireEvent.keyDown(label, { key: 'Enter' })
  await waitFor(() => { expect(document.activeElement?.textContent).toBe('Close Tab') })
  return label
}

describe('useContextMenu', () => {
  it.each(['Escape', 'Tab'])('focuses the first entry of a menu opened from the keyboard and returns the focus on %s', async (key) => {
    const label = await openByKeyboard()

    fireEvent.keyDown(screen.getByTestId('menu'), { key })

    expect(screen.queryByTestId('menu')).toBeNull()
    await waitFor(() => { expect(document.activeElement).toBe(label) })
  })

  it('returns the focus after an entry was chosen', async () => {
    const label = await openByKeyboard()

    fireEvent.click(screen.getByText('Close Tab'))

    await waitFor(() => { expect(document.activeElement).toBe(label) })
  })

  it('gives the focus to the active main tab when the action rebuilt the opening tab', async () => {
    await openByKeyboard()

    fireEvent.click(screen.getByText('Remount'))

    await waitFor(() => { expect(document.activeElement).toBe(screen.getByTestId('label-1')) })
  })

  it('tells which tab has its menu open', async () => {
    await openByKeyboard()
    expect(screen.getByTestId('label-0').dataset.open).toBe('car')

    fireEvent.keyDown(screen.getByTestId('menu'), { key: 'Escape' })
    expect(screen.getByTestId('label-0').dataset.open).toBe('none')
  })

  it('leaves the focus where it is for a menu opened with the mouse', async () => {
    const nextFrame = async (): Promise<void> => { await new Promise((resolve) => requestAnimationFrame(resolve)) }
    render(<Tab />)
    await nextFrame()
    const focusedBefore = document.activeElement

    fireEvent.contextMenu(screen.getByTestId('label-0'), { button: 2 })
    await nextFrame()

    expect(screen.getByTestId('menu')).toBeTruthy()
    expect(document.activeElement).toBe(focusedBefore)
  })
})
