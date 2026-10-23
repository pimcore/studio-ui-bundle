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
