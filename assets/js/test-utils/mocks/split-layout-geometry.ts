/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const toPx = (value: string): number | undefined => value.endsWith('px') ? parseFloat(value) : undefined

const toRect = (width: number): DOMRect => ({
  width, height: 0, x: 0, y: 0, top: 0, left: 0, bottom: 0, right: width, toJSON: () => ({})
})

/**
 * jsdom does no layout: measures a `.split-layout` as `containerWidth` and each pane by its inline
 * percentage width, clamped by its inline min/max width in px (min wins, as in CSS).
 */
export const mockSplitLayoutGeometry = (containerWidth: number): jest.SpyInstance => jest
  .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
  .mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('split-layout')) {
      return toRect(containerWidth)
    }

    const width = parseFloat(this.style.width) / 100 * containerWidth
    const minWidth = toPx(this.style.minWidth) ?? 0
    const maxWidth = toPx(this.style.maxWidth) ?? Number.POSITIVE_INFINITY

    return toRect(Math.max(Math.min(width, maxWidth), minWidth))
  })
