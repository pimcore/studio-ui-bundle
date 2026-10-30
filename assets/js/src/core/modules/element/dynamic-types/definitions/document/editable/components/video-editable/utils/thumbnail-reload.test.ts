/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { hasThumbnailConversionEnded } from './thumbnail-reload'

describe('hasThumbnailConversionEnded', () => {
  it.each([
    ['finished', true],
    ['error', true],
    ['inProgress', false],
    ['queued', false]
  ])('reports the end of the conversion (%s → %s)', (status, expected) => {
    expect(hasThumbnailConversionEnded({ status }, false)).toBe(expected)
  })

  it('reports nothing without a status', () => {
    expect(hasThumbnailConversionEnded(undefined, false)).toBe(false)
  })

  it('reports the end only once per editable instance', () => {
    expect(hasThumbnailConversionEnded({ status: 'finished' }, true)).toBe(false)
  })
})
