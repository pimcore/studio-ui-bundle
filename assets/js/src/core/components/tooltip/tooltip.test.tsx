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
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Tooltip } from './tooltip'

const wait = async (ms: number): Promise<void> => {
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, ms)) })
}

const expectHidden = async (): Promise<void> => {
  await waitFor(() => { expect(screen.queryByRole('tooltip')).toBeNull() })
}

describe('Tooltip', () => {
  it('hides on mouse down and stays hidden while the pointer stays on the button', async () => {
    render(<Tooltip
      mouseEnterDelay={ 0 }
      title="Hint"
           ><button type="button">Trigger</button></Tooltip>)
    const button = screen.getByRole('button')

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint')

    fireEvent.mouseDown(button)
    fireEvent.click(button, { detail: 1 })
    await expectHidden()

    fireEvent.mouseEnter(button)
    await wait(150)
    expect(screen.queryByRole('tooltip')).toBeNull()

    fireEvent.mouseLeave(button)
    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint')
  })

  it('does not open from a hover delay that started before the press', async () => {
    render(<Tooltip
      mouseEnterDelay={ 0.1 }
      title="Hint"
           ><button type="button">Trigger</button></Tooltip>)
    const button = screen.getByRole('button')

    fireEvent.mouseEnter(button)
    fireEvent.mouseDown(button)
    await wait(250)

    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it.each(['Enter', ' '])('hides on the %p key and shows again only after blur', async (key) => {
    render(<Tooltip
      mouseEnterDelay={ 0 }
      title="Hint"
           ><button type="button">Trigger</button></Tooltip>)
    const button = screen.getByRole('button')

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()

    fireEvent.keyDown(button, { key })
    await expectHidden()

    fireEvent.mouseEnter(button)
    await wait(50)
    expect(screen.queryByRole('tooltip')).toBeNull()

    fireEvent.blur(button)
    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('keeps a pointer press hidden when the button loses focus', async () => {
    render(<Tooltip
      mouseEnterDelay={ 0 }
      title="Hint"
           ><button type="button">Trigger</button></Tooltip>)
    const button = screen.getByRole('button')

    fireEvent.mouseEnter(button)
    fireEvent.mouseDown(button)
    fireEvent.blur(button)
    fireEvent.mouseEnter(button)
    await wait(50)

    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('hides a controlled tooltip on press until the pointer leaves', async () => {
    render(<Tooltip
      open
      title="Hint"
           ><button type="button">Trigger</button></Tooltip>)
    const button = screen.getByRole('button')
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()

    fireEvent.mouseDown(button)
    await expectHidden()

    fireEvent.mouseLeave(button)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('leaves click-triggered tooltips alone', async () => {
    render(<Tooltip
      title="Hint"
      trigger="click"
           ><button type="button">Trigger</button></Tooltip>)

    fireEvent.click(screen.getByRole('button'))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint')
  })

  it('still calls the handlers of the wrapped element', () => {
    const handlers = { onMouseDown: jest.fn(), onClick: jest.fn(), onKeyDown: jest.fn(), onMouseLeave: jest.fn(), onBlur: jest.fn() }
    render(<Tooltip title="Hint"><button
      type="button"
      { ...handlers }
                                 >Trigger</button></Tooltip>)
    const button = screen.getByRole('button')

    fireEvent.mouseDown(button)
    fireEvent.click(button)
    fireEvent.keyDown(button, { key: 'Enter' })
    fireEvent.mouseLeave(button)
    fireEvent.blur(button)

    Object.values(handlers).forEach((handler) => { expect(handler).toHaveBeenCalledTimes(1) })
  })
})
