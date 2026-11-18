/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { fireEvent, screen } from '@testing-library/react'

const SLOT_PREFIX = 'content-toolbar-sidebar-layout__'

/** The slot or pane that wraps the given text. */
export const getContainerOf = (text: string): HTMLElement => screen.getByText(text).parentElement!

/** The slot of each child of a content layout in render order, e.g. `['top-bar', 'content']`. */
export const getContentLayoutSlots = (layout: Element): string[] => Array.from(layout.children).map((child) =>
  Array.from(child.classList).find((className) => className.startsWith(SLOT_PREFIX))?.slice(SLOT_PREFIX.length) ?? child.className
)

/**
 * Lists the children of a rendered split layout in order, e.g. `['pane: left', 'divider', 'pane: right']`.
 * Relies on the style keys that mocks/create-styles-mock turns into `style-<key>` classes.
 */
export const getSplitLayoutParts = (layout: Element): string[] => Array.from(layout.children).map((child) => {
  if (child.classList.contains('style-splitLayoutItem')) {
    return `pane: ${child.textContent}`
  }

  if (child.classList.contains('style-dividerContainer')) {
    return 'divider'
  }

  return child.className
})

/** The inline `[width, min-width, max-width]` of a split layout pane. */
export const getPaneSizing = (pane: HTMLElement): string[] => [pane.style.width, pane.style.minWidth, pane.style.maxWidth]

/** The inline width of the pane that wraps the given text, in percent. */
export const getPaneWidth = (text: string): number => Number.parseFloat(getContainerOf(text).style.width)

export const getDivider = (): HTMLElement => screen.getByRole('button').parentElement!

export const pressDividerKey = (key: 'ArrowLeft' | 'ArrowRight', times = 1): void => {
  for (let i = 0; i < times; i++) {
    fireEvent.keyDown(screen.getByRole('button'), { key })
  }
}

/** A mouse move on the document; jsdom does not support `movementX` in the event init. */
export const moveMouse = (movementX: number): void => {
  const event = new MouseEvent('mousemove', { bubbles: true })
  Object.defineProperty(event, 'movementX', { value: movementX })
  fireEvent(document, event)
}
