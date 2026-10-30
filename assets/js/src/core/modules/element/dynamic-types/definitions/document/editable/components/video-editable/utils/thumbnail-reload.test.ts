/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { shouldReloadForThumbnailStatus } from './thumbnail-reload'

describe('shouldReloadForThumbnailStatus', () => {
  it.each([
    ['finished', true],
    ['error', true],
    ['inProgress', false],
    ['queued', false]
  ])('reloads once the conversion ended (%s → %s)', (status, expected) => {
    expect(shouldReloadForThumbnailStatus({ status }, { alreadyTriggered: false, deferReload: false })).toBe(expected)
  })

  it('does not reload without a status', () => {
    expect(shouldReloadForThumbnailStatus(undefined, { alreadyTriggered: false, deferReload: false })).toBe(false)
  })

  it('reloads only once per editable instance', () => {
    expect(shouldReloadForThumbnailStatus({ status: 'finished' }, { alreadyTriggered: true, deferReload: false })).toBe(false)
  })

  it('holds the reload back while the owner (e.g. an open editable dialog) defers reloads', () => {
    expect(shouldReloadForThumbnailStatus({ status: 'finished' }, { alreadyTriggered: false, deferReload: true })).toBe(false)
  })
})
