/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { actionTooltipDelay } from '@Pimcore/components/tooltip/tooltip'

type CloseMenu = (trigger: HTMLElement) => void

/** The ways to close a click menu while the pointer stays where it is. */
export const closeMenuActions: Array<[string, CloseMenu]> = [
  ['Escape', () => { fireEvent.keyDown(window, { key: 'Escape', keyCode: 27 }) }],
  ['a click outside', () => { fireEvent.mouseDown(document.body) }],
  ['a second click on the button', (trigger) => { fireEvent.click(trigger) }]
]

const isShown = (tooltipClassName: string | null): boolean => !(tooltipClassName ?? '').split(' ').includes('ant-tooltip-hidden')

/**
 * Closes the menu that shows `menuItemText` and waits until it is gone. Returns whether a tooltip
 * was shown at any moment meanwhile, also for a single render.
 */
export const closeMenuAndCheckTooltipShown = async (
  trigger: HTMLElement,
  menuItemText: string,
  closeMenu: CloseMenu
): Promise<boolean> => {
  const records: MutationRecord[] = []
  const observer = new MutationObserver((mutations) => { records.push(...mutations) })
  observer.observe(document.body, { subtree: true, attributeFilter: ['class'], attributeOldValue: true })

  closeMenu(trigger)
  await waitFor(() => {
    expect(trigger).not.toHaveClass('ant-dropdown-open')
    expect(screen.getByText(menuItemText).closest('.ant-dropdown')).toHaveClass('ant-dropdown-hidden')
  })
  // longer than the tooltip delay, so a tooltip opened by a timer is seen too
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, (actionTooltipDelay * 1000) + 100)) })

  records.push(...observer.takeRecords())
  observer.disconnect()

  const tooltips = Array.from(document.querySelectorAll('.ant-tooltip'))
  const tooltipClassNames = [
    ...records.filter((record) => tooltips.includes(record.target as Element)).map((record) => record.oldValue),
    ...tooltips.map((tooltip) => tooltip.getAttribute('class'))
  ]

  return tooltipClassNames.some(isShown)
}
