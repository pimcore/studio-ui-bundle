/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useValue, type DisplayManyToManyRelationValue, type ManyToManyRelationValue } from './use-value'

// Isolate the hook from its data/UI dependencies; the search path taken here is
// synchronous (no valid pathFormatterConfig), so formatPath is never invoked.
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object', () => ({
  useDataObject: () => ({ id: 1 })
}))
jest.mock('@Pimcore/modules/data-object/hooks/use-format-path', () => ({
  useFormatPath: () => ({ formatPath: jest.fn(), hasUncachedItems: () => false })
}))
jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({
  useAlertModal: () => ({ warn: jest.fn() })
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))
jest.mock('../utils/path-formatter', () => ({
  isValidPathFormatterConfig: () => false
}))

describe('useValue search filter', () => {
  const value: ManyToManyRelationValue = [
    { id: 1, type: 'object', subtype: 'Institut', fullPath: '/institute/first', isPublished: true },
    { id: 2, type: 'object', subtype: 'Institut', fullPath: '/institute/second', isPublished: true }
  ]

  const renderUseValue = (
    visibleFieldsValue?: Array<Record<string, any> | undefined>
  ): { setDisplayedValue: jest.Mock, onSearch: (term: string) => void } => {
    const setDisplayedValue = jest.fn()
    const { result } = renderHook(() =>
      useValue(
        value,
        jest.fn(),
        value as DisplayManyToManyRelationValue,
        setDisplayedValue,
        null,
        false,
        undefined,
        visibleFieldsValue
      )
    )
    return { setDisplayedValue, onSearch: result.current.onSearch }
  }

  // onSearch mutates a ref and calls the (mocked) setDisplayedValue synchronously
  // with no valid pathFormatterConfig, so no React state update needs flushing.
  const search = (onSearch: (term: string) => void, term: string): void => {
    onSearch(term)
  }

  const displayedAfterSearch = (setDisplayedValue: jest.Mock): DisplayManyToManyRelationValue =>
    (setDisplayedValue.mock.calls.at(-1)?.[0] ?? []) as DisplayManyToManyRelationValue

  it('matches a visible column value only reachable via the row id', () => {
    // Entries carry the row id, as the producer now emits them.
    const { setDisplayedValue, onSearch } = renderUseValue([
      { id: 1, bankname: 'Sparkasse Musterstadt' },
      { id: 2, bankname: 'Volksbank Beispiel' }
    ])

    search(onSearch, 'sparkasse')

    // 'sparkasse' appears only in a column value, never in a fullPath.
    expect(displayedAfterSearch(setDisplayedValue).map((item) => item.id)).toEqual([1])
  })

  it('cannot match a column value when entries lack the row id (regression)', () => {
    // Without an id the join drops the entry, so column search is unreachable and
    // the filter falls back to the fullPath only — the bug this fix addresses.
    const { setDisplayedValue, onSearch } = renderUseValue([
      { bankname: 'Sparkasse Musterstadt' },
      { bankname: 'Volksbank Beispiel' }
    ])

    search(onSearch, 'sparkasse')

    expect(displayedAfterSearch(setDisplayedValue)).toEqual([])
  })

  it('still matches the object fullPath (fallback intact)', () => {
    const { setDisplayedValue, onSearch } = renderUseValue([
      { id: 1, bankname: 'Sparkasse Musterstadt' },
      { id: 2, bankname: 'Volksbank Beispiel' }
    ])

    search(onSearch, 'second')

    expect(displayedAfterSearch(setDisplayedValue).map((item) => item.id)).toEqual([2])
  })
})
