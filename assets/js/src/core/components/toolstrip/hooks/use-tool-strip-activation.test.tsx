/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { useToolStripActivation, type UseToolStripActivationProps } from './use-tool-strip-activation'

// Stands in for ToolStrip: the same activation props on the outer element, a non-focusable
// head (drag handle plus title) and the actions that are clipped while collapsed.
const ToolStripHarness = ({
  activateOnHover = true,
  disabled = false,
  label = 'Headline'
}: Partial<UseToolStripActivationProps>): React.JSX.Element => {
  const { isActivated, containerProps } = useToolStripActivation({ activateOnHover, disabled, label })

  return (
    <div
      { ...containerProps }
      data-activated={ isActivated }
      data-testid="tool-strip"
    >
      <span data-testid="head">{label}</span>
      <button data-testid="first-action">first</button>
      <button data-testid="last-action">last</button>
    </div>
  )
}

const strip = (): HTMLElement => screen.getByTestId('tool-strip')
const isActivated = (): boolean => strip().getAttribute('data-activated') === 'true'

describe('useToolStripActivation', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('stays collapsed until it is hovered', async () => {
    render(<ToolStripHarness />)
    expect(isActivated()).toBe(false)

    await user.hover(strip())
    expect(isActivated()).toBe(true)

    await user.unhover(strip())
    expect(isActivated()).toBe(false)
  })

  it('makes the strip head focusable and names it', () => {
    render(<ToolStripHarness />)

    expect(strip()).toHaveAttribute('tabindex', '0')
    expect(strip()).toHaveAttribute('role', 'group')
    expect(strip()).toHaveAccessibleName('Headline')
  })

  it('reveals the actions when tabbing to the strip head', async () => {
    render(<ToolStripHarness />)

    await user.tab()

    expect(strip()).toHaveFocus()
    expect(isActivated()).toBe(true)
  })

  it('stays revealed while tabbing through the actions', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.tab()
    expect(screen.getByTestId('first-action')).toHaveFocus()
    expect(isActivated()).toBe(true)

    await user.tab()
    expect(screen.getByTestId('last-action')).toHaveFocus()
    expect(isActivated()).toBe(true)
  })

  it('stays revealed while shift-tabbing back through the actions to the head', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.tab()
    await user.tab()
    expect(screen.getByTestId('last-action')).toHaveFocus()

    await user.tab({ shift: true })
    expect(screen.getByTestId('first-action')).toHaveFocus()
    expect(isActivated()).toBe(true)

    await user.tab({ shift: true })
    expect(strip()).toHaveFocus()
    expect(isActivated()).toBe(true)
  })

  it('collapses once focus leaves the strip', async () => {
    render(
      <>
        <ToolStripHarness />
        <button data-testid="outside">outside</button>
      </>
    )

    // Tabbed, not clicked: a click would park the pointer over the strip, and hover
    // alone keeps it revealed.
    await user.tab()
    await user.tab()
    await user.tab()
    expect(screen.getByTestId('last-action')).toHaveFocus()
    expect(isActivated()).toBe(true)

    await user.tab()

    expect(screen.getByTestId('outside')).toHaveFocus()
    expect(isActivated()).toBe(false)
  })

  it('stays revealed after focus leaves while the pointer is still over the strip', async () => {
    render(
      <>
        <ToolStripHarness />
        <button data-testid="outside">outside</button>
      </>
    )

    await user.click(screen.getByTestId('last-action'))
    await user.tab()

    expect(screen.getByTestId('outside')).toHaveFocus()
    expect(isActivated()).toBe(true)
  })

  it('reveals the actions on a click on the non-focusable head', async () => {
    render(<ToolStripHarness />)

    await user.click(screen.getByTestId('head'))

    expect(isActivated()).toBe(true)
    expect(strip()).toHaveFocus()
  })

  it('leaves focus on a clicked action instead of pulling it to the head', async () => {
    render(<ToolStripHarness />)

    const action = screen.getByTestId('first-action')
    await user.click(action)

    expect(isActivated()).toBe(true)
    expect(action).toHaveFocus()
  })

  it('collapses on escape but keeps focus on the strip head', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.tab()
    expect(screen.getByTestId('first-action')).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(isActivated()).toBe(false)
    expect(strip()).toHaveFocus()
  })

  it('re-reveals the actions when tabbing on after an escape', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.keyboard('{Escape}')
    expect(isActivated()).toBe(false)

    // Tabbing on must not leave focus on an action that is still clipped.
    await user.tab()

    expect(screen.getByTestId('first-action')).toHaveFocus()
    expect(isActivated()).toBe(true)
  })

  it('keeps hover working after an escape', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.keyboard('{Escape}')
    await user.hover(strip())

    expect(isActivated()).toBe(true)
  })

  it('forgets an escape collapse once focus has left the strip', async () => {
    render(
      <>
        <ToolStripHarness />
        <button data-testid="outside">outside</button>
      </>
    )

    await user.tab()
    await user.keyboard('{Escape}')
    await user.click(screen.getByTestId('outside'))

    await user.click(screen.getByTestId('head'))

    expect(isActivated()).toBe(true)
  })

  it('ignores keys other than escape', async () => {
    render(<ToolStripHarness />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(isActivated()).toBe(true)
  })

  it('is neither focusable nor activatable when disabled', async () => {
    render(<ToolStripHarness disabled />)

    expect(strip()).not.toHaveAttribute('tabindex')
    expect(strip()).not.toHaveAttribute('role')

    await user.hover(strip())
    await user.click(screen.getByTestId('first-action'))

    expect(isActivated()).toBe(false)
  })

  // Activation being turned off mid-life detaches the leave and blur handlers, so anything
  // that leaves while it is off cannot clear its flag. Without a reset the strip would come
  // back expanded while it is neither hovered nor focused.
  it('does not come back expanded after being disabled while hovered', async () => {
    const { rerender } = render(<ToolStripHarness />)

    await user.hover(strip())
    expect(isActivated()).toBe(true)

    rerender(<ToolStripHarness disabled />)
    expect(isActivated()).toBe(false)

    // The pointer leaves while disabled — no onMouseLeave is attached to notice it.
    await user.unhover(strip())

    rerender(<ToolStripHarness />)
    expect(isActivated()).toBe(false)
  })

  it('does not come back expanded after activateOnHover was toggled off while hovered', async () => {
    const { rerender } = render(<ToolStripHarness />)

    await user.hover(strip())
    expect(isActivated()).toBe(true)

    rerender(<ToolStripHarness activateOnHover={ false } />)
    await user.unhover(strip())

    rerender(<ToolStripHarness />)
    expect(isActivated()).toBe(false)
  })

  it('does not come back expanded after being disabled while focused', async () => {
    const { rerender } = render(
      <>
        <ToolStripHarness />
        <button data-testid="outside">outside</button>
      </>
    )

    await user.tab()
    await user.tab()
    expect(screen.getByTestId('first-action')).toHaveFocus()

    rerender(
      <>
        <ToolStripHarness disabled />
        <button data-testid="outside">outside</button>
      </>
    )
    screen.getByTestId('outside').focus()

    rerender(
      <>
        <ToolStripHarness />
        <button data-testid="outside">outside</button>
      </>
    )
    expect(isActivated()).toBe(false)
  })

  it('is permanently activated and adds no tab stop when it does not activate on hover', () => {
    render(<ToolStripHarness activateOnHover={ false } />)

    expect(isActivated()).toBe(true)
    expect(strip()).not.toHaveAttribute('tabindex')
  })
})
