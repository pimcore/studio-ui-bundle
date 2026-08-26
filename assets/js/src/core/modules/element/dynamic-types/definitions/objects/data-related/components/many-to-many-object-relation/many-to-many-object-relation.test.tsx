/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render } from '@testing-library/react'

let currentLanguage = 'de'

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/many-to-many-relation', () => ({
  ManyToManyRelation: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider', () => ({
  DynamicTypeRegistryProvider: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider', () => ({
  SelectedColumnsProvider: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/utils/column-definition', () => ({
  visibleFieldsToColumnDefinitions: () => [],
  enrichRowData: (defs: unknown, row: unknown) => row
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

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options', () => ({
  useGridOptions: () => ({
    transformGridColumn: (column: unknown) => column,
    getDefaultVisibleFieldDefinitions: () => []
  })
}))

// The user's profile language must NOT drive the visible-field columns —
// the content language selected in the editor's language switcher must.
jest.mock('@Pimcore/modules/auth/hooks/use-user-content-language', () => ({
  useUserContentLanguage: () => 'profile-language'
}))

interface GridQueryArgs {
  columns: Array<{ key: string, locale?: string }>
}

const gridResult = { data: [], isLoading: false, refetchAll: jest.fn() }
const mockUseDataObjectGrids = jest.fn((args: GridQueryArgs) => gridResult)

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-data-object-grids', () => ({
  useDataObjectGrids: (args: unknown) => mockUseDataObjectGrids(args as GridQueryArgs)
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

// eslint-disable-next-line import/first
import { ManyToManyObjectRelation, type ManyToManyObjectRelationProps } from './many-to-many-object-relation'

const defaultProps: ManyToManyObjectRelationProps = {
  allowToClearRelation: false,
  maxItems: null,
  pathFormatterClass: null,
  width: null,
  height: null,
  allowedClasses: ['Car'],
  combinedFieldName: 'items',
  value: []
}

const renderWithLanguage = (language: string): ReturnType<typeof render> => {
  currentLanguage = language

  return render(<ManyToManyObjectRelation { ...defaultProps } />)
}

const lastRequestedLocale = (): string | undefined => {
  const lastCall = mockUseDataObjectGrids.mock.calls[mockUseDataObjectGrids.mock.calls.length - 1]
  return lastCall[0].columns.find(column => column.key === 'name')?.locale
}

describe('ManyToManyObjectRelation content language', () => {
  beforeEach(() => {
    mockUseDataObjectGrids.mockClear()
  })

  it('requests localized visible fields in the selected content language, not the profile language', () => {
    renderWithLanguage('de')

    expect(mockUseDataObjectGrids).toHaveBeenCalled()
    expect(lastRequestedLocale()).toBe('de')
  })

  it('re-requests localized visible fields when the selected content language changes', () => {
    const { rerender } = renderWithLanguage('de')
    expect(lastRequestedLocale()).toBe('de')

    currentLanguage = 'fr'
    rerender(<ManyToManyObjectRelation { ...defaultProps } />)

    expect(lastRequestedLocale()).toBe('fr')
  })
})
