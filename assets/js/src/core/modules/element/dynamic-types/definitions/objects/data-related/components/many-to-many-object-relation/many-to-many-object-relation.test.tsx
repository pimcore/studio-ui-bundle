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
import { render, screen } from '@testing-library/react'

let currentLanguage = 'de'

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const mockManyToManyRelation = jest.fn((props: any) => null)

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/many-to-many-relation', () => ({
  ManyToManyRelation: (props: any) => mockManyToManyRelation(props)
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

let gridResult = { data: [], isLoading: false, isError: false, refetchAll: jest.fn() }
const mockUseDataObjectGrids = jest.fn((args: GridQueryArgs) => gridResult)

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-data-object-grids', () => ({
  useDataObjectGrids: (args: unknown) => mockUseDataObjectGrids(args as GridQueryArgs)
}))

let availableGridColumnsLoading = false

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

  const availableGridColumnsLoadingResult = { isLoading: true, data: undefined }

  return {
    useDataObjectGetAvailableGridColumnsForRelationQuery: () => availableGridColumnsLoading
      ? availableGridColumnsLoadingResult
      : availableGridColumnsResult
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

describe('ManyToManyObjectRelation visible field loading', () => {
  const relationProps: ManyToManyObjectRelationProps = {
    ...defaultProps,
    value: [{ id: 5, type: 'object', subtype: 'Car', fullPath: '/cars/5', isPublished: true }]
  }

  const renderRelation = (props: Partial<ManyToManyObjectRelationProps> = {}): any => {
    render(<ManyToManyObjectRelation { ...{ ...relationProps, ...props } } />)

    return mockManyToManyRelation.mock.calls[mockManyToManyRelation.mock.calls.length - 1][0]
  }

  beforeEach(() => {
    mockManyToManyRelation.mockClear()
    availableGridColumnsLoading = false
    gridResult = { data: [], isLoading: false, isError: false, refetchAll: jest.fn() }
  })

  // The relation rows are part of the object data and must not wait for the visible field values.
  it('shows the relation rows while the visible field values are loading', () => {
    gridResult = { ...gridResult, isLoading: true }

    expect(renderRelation().isLoading).toBe(false)
  })

  it('shows the loading state while the visible field columns are not known yet', () => {
    availableGridColumnsLoading = true

    expect(renderRelation().isLoading).toBe(true)
  })

  it('shows a loading hint while the visible field values are loading', () => {
    gridResult = { ...gridResult, isLoading: true }

    render(<>{ renderRelation().hint }</>)

    expect(screen.getByText('relations.visible-fields.loading')).toBeTruthy()
  })

  it('shows an error hint when the visible field values could not be loaded', () => {
    gridResult = { ...gridResult, isError: true }

    render(<>{ renderRelation().hint }</>)

    expect(screen.getByText('relations.visible-fields.error')).toBeTruthy()
  })

  it('keeps the hint of the field definition next to the status hint', () => {
    gridResult = { ...gridResult, isError: true }

    render(<>{ renderRelation({ hint: 'Field hint' }).hint }</>)

    expect(screen.getByText('Field hint')).toBeTruthy()
    expect(screen.getByText('relations.visible-fields.error')).toBeTruthy()
  })

  it('passes only the hint of the field definition when the visible field values are loaded', () => {
    expect(renderRelation({ hint: 'Field hint' }).hint).toBe('Field hint')
  })
})
