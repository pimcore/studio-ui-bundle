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
import { type ManyToManyObjectRelationProps } from '../../../many-to-many-object-relation'

let currentLanguage = 'de'

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { className: 'Car' } })
}))

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({ getByName: () => ({ id: 'car-class-id' }) })
}))

jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelectionOptional: () => null
}))

// The user's profile language must NOT drive the combo field data —
// the content language selected in the editor's language switcher must.
jest.mock('@Pimcore/modules/auth/hooks/use-user-content-language', () => ({
  useUserContentLanguage: () => 'profile-language'
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => {
  // A stable reference, as RTK Query would return it from its cache.
  const availableGridColumnsResult = {
    isLoading: false,
    data: {
      columns: [
        {
          key: 'name',
          type: 'input',
          frontendType: 'input',
          title: 'Name',
          group: [],
          config: [],
          locale: null,
          localizable: true,
          sortable: false,
          editable: false,
          exportable: false,
          filterable: false,
          additionalAttributes: {}
        }
      ]
    }
  }

  return {
    useDataObjectGetAvailableGridColumnsForRelationQuery: () => availableGridColumnsResult
  }
})

interface SearchQueryArgs {
  body: {
    columns: Array<{ key: string, locale: string | null }>
  }
}

// Results are cached per args so repeated renders receive stable references,
// mirroring RTK Query's cache behavior.
const searchResultCache = new Map<string, { data: object, isFetching: boolean }>()

// When true, search requests stay pending instead of returning data,
// mirroring the window between a language switch and its refetch response.
let simulatePendingSearch = false

const mockUseDataObjectGetSearchQuery = jest.fn((args: SearchQueryArgs, options?: { skip?: boolean }) => {
  if (options?.skip === true || simulatePendingSearch) {
    return { data: undefined, isFetching: simulatePendingSearch }
  }

  const cacheKey = JSON.stringify(args)

  if (!searchResultCache.has(cacheKey)) {
    const locale = args.body.columns.find(column => column.key === 'name')?.locale ?? 'none'

    // totalItems above BACKGROUND_LOAD_THRESHOLD: not all items get loaded,
    // so nothing but the language-change reset clears accumulated options.
    searchResultCache.set(cacheKey, {
      data: {
        totalItems: 1500,
        items: [
          {
            id: 5,
            columns: [
              { key: 'fullpath', value: '/five' },
              { key: 'classname', value: 'Car' },
              { key: 'name', value: `name-${locale}` }
            ]
          }
        ]
      },
      isFetching: false
    })
  }

  return searchResultCache.get(cacheKey)
})

jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({
  useDataObjectGetSearchQuery: (args: unknown, options?: { skip?: boolean }) => mockUseDataObjectGetSearchQuery(args as never, options)
}))

// eslint-disable-next-line import/first
import { useComboFieldData } from './use-combo-field-data'

const props: ManyToManyObjectRelationProps = {
  allowToClearRelation: false,
  maxItems: null,
  pathFormatterClass: null,
  width: null,
  height: null,
  allowedClasses: ['Car'],
  combinedFieldName: 'items',
  value: [{ id: 5, type: 'object', subtype: 'Car', fullPath: '/five', isPublished: null }]
}

const lastRequestedLocale = (): string | null | undefined => {
  const nonSkippedCalls = mockUseDataObjectGetSearchQuery.mock.calls.filter(call => call[1]?.skip !== true)
  const lastCall = nonSkippedCalls[nonSkippedCalls.length - 1]
  return lastCall?.[0].body.columns.find(column => column.key === 'name')?.locale
}

describe('useComboFieldData content language', () => {
  beforeEach(() => {
    mockUseDataObjectGetSearchQuery.mockClear()
    searchResultCache.clear()
    simulatePendingSearch = false
  })

  it('requests localized columns in the selected content language, not the profile language', () => {
    currentLanguage = 'de'
    renderHook(() => useComboFieldData(props))

    expect(lastRequestedLocale()).toBe('de')
  })

  it('refreshes cached labels when the selected content language changes', () => {
    currentLanguage = 'de'
    const { result, rerender } = renderHook(() => useComboFieldData(props))

    expect(result.current.options.find(option => option.value === 5)?.label).toBe('name-de')

    currentLanguage = 'fr'
    rerender()

    expect(lastRequestedLocale()).toBe('fr')
    expect(result.current.options.find(option => option.value === 5)?.label).toBe('name-fr')
  })

  it('drops labels accumulated in the previous content language while the refetch is pending', () => {
    currentLanguage = 'de'
    const { result, rerender } = renderHook(() => useComboFieldData(props))

    expect(result.current.options.find(option => option.value === 5)?.label).toBe('name-de')

    simulatePendingSearch = true
    currentLanguage = 'fr'
    rerender()

    // No stale 'name-de' label may survive; the selected item falls back to
    // its full path until the new-language labels arrive.
    expect(result.current.options.find(option => option.value === 5)?.label).toBe('/five')
  })
})
