/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { withoutLookedUpPublishedState, withPublishedState } from './published-state'

describe('withPublishedState', () => {
  it('adds the looked up state to a reference without one', () => {
    expect(withPublishedState({ id: 7, type: 'document', isPublished: null }, { 'document:7': false }))
      .toEqual({ id: 7, type: 'document', isPublished: false })
  })

  it('keeps a boolean state the reference carries over an older looked up one', () => {
    const reference = { id: 7, type: 'document', isPublished: true }

    expect(withPublishedState(reference, { 'document:7': false })).toBe(reference)
  })
})

describe('withoutLookedUpPublishedState', () => {
  it('restores the stored state of a reference that was enriched', () => {
    const enriched = { id: 7, type: 'document', isPublished: false }

    expect(withoutLookedUpPublishedState(enriched, [{ id: 7, type: 'document', isPublished: null }], { 'document:7': false }))
      .toEqual({ id: 7, type: 'document', isPublished: null })
  })

  it('drops the state when the stored reference had none', () => {
    const enriched = { id: 7, type: 'document', isPublished: false }

    expect(withoutLookedUpPublishedState(enriched, [{ id: 7, type: 'document' }], { 'document:7': false }))
      .toEqual({ id: 7, type: 'document' })
  })

  it('leaves references alone that were not enriched', () => {
    const added = { id: 9, type: 'document', isPublished: true }

    expect(withoutLookedUpPublishedState(added, [{ id: 7, type: 'document' }], { 'document:7': false })).toBe(added)
  })
})
