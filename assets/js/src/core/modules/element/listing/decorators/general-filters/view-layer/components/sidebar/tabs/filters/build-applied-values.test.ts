/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementFilterValues } from '../../../../../element-filters'
import { buildAppliedValues, type BuildAppliedValuesProps } from './build-applied-values'

const draft: ElementFilterValues = {
  searchTerm: 'ferrari',
  searchMode: 'image',
  directChildren: true,
  unreferenced: true,
  pql: 'fullname:"Ferrari*"',
  fieldFilters: [{ key: 'name', filterValue: 'x', type: 'text', locale: null, meta: { translationKey: 'name' } }]
}

const build = (overrides: Partial<BuildAppliedValuesProps> = {}): ReturnType<typeof buildAppliedValues> =>
  buildAppliedValues({
    draft,
    ownsSearchTerm: true,
    ownsUnreferenced: true,
    isPqlFilterEnabled: true,
    searchModeId: 'fulltext',
    ...overrides
  })

describe('buildAppliedValues', () => {
  it('always publishes the field filters and the direct-children flag', () => {
    const values = build()

    expect(values.fieldFilters).toBe(draft.fieldFilters)
    expect(values.directChildren).toBe(true)
  })

  describe('PQL filter', () => {
    it('publishes the query while the filter is switched on', () => {
      expect(build({ isPqlFilterEnabled: true }).pql).toBe('fullname:"Ferrari*"')
    })

    it('blanks the query while the filter is switched off, so it cannot influence the result', () => {
      expect(build({ isPqlFilterEnabled: false }).pql).toBe('')
    })
  })

  describe('ownership', () => {
    it('publishes the search term and the normalised mode when the panel owns the search', () => {
      const values = build({ ownsSearchTerm: true, searchModeId: 'fulltext' })

      expect(values.searchTerm).toBe('ferrari')
      // the resolved mode, not the draft's stored 'image'
      expect(values.searchMode).toBe('fulltext')
    })

    it('leaves the search term alone when a top bar owns it', () => {
      const values = build({ ownsSearchTerm: false })

      expect(values).not.toHaveProperty('searchTerm')
      expect(values).not.toHaveProperty('searchMode')
    })

    it('publishes the unreferenced flag only where that filter exists', () => {
      expect(build({ ownsUnreferenced: true }).unreferenced).toBe(true)
      expect(build({ ownsUnreferenced: false })).not.toHaveProperty('unreferenced')
    })
  })

  describe('committed values', () => {
    it('overrides what the draft carries, since the draft write lands in the same render', () => {
      const values = build({ committed: { searchTerm: 'alfa' } })

      expect(values.searchTerm).toBe('alfa')
    })

    it('overrides a blanked PQL query, so switching the filter off can publish the clear', () => {
      const values = build({ isPqlFilterEnabled: true, committed: { pql: '' } })

      expect(values.pql).toBe('')
    })

    it('can publish a key the draft does not own yet', () => {
      const fieldFilters = [{ key: 'other', filterValue: 'y', type: 'text', locale: null, meta: { translationKey: 'other' } }]
      const values = build({ committed: { fieldFilters } })

      expect(values.fieldFilters).toBe(fieldFilters)
    })
  })
})
