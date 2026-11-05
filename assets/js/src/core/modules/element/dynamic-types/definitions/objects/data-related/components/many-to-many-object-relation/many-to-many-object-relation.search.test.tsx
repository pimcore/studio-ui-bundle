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
import { act, fireEvent, render, screen } from '@testing-library/react'

// Unlike many-to-many-object-relation.test.tsx, this file runs the real relation field (useValue, search,
// filter context) and mocks only what is rendered or fetched around it.

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => options === undefined ? key : `${key} ${JSON.stringify(options)}`
  })
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

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object', () => ({
  useDataObject: () => ({ id: 1 })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-format-path', () => ({
  useFormatPath: () => ({ formatPath: jest.fn(), hasUncachedItems: () => false })
}))

jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({
  useAlertModal: () => ({ warn: jest.fn() })
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

jest.mock('@Pimcore/components/many-to-many-relation/filters/provider/relation-filters-provider', () => ({
  RelationFiltersProvider: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/many-to-many-relation/filters/filters', () => ({
  useRelationFilters: () => ({ values: [] }),
  relationFilterAdapter: {}
}))

jest.mock('@Pimcore/components/many-to-many-relation/filters', () => ({
  useRelationFilterColumns: () => ({ columns: [] })
}))

jest.mock('@Pimcore/components/filters', () => ({
  useFilterQuery: () => () => ({ matchRow: undefined })
}))

jest.mock('@Pimcore/components/drag-and-drop/droppable', () => ({
  Droppable: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))

jest.mock('@Pimcore/components/many-to-many-relation/hooks/use-columns', () => ({
  useColumns: () => ({ columns: [] })
}))

// The grid lists the rows it is given and the toolbar reduces to its search box.
jest.mock('@Pimcore/components/many-to-many-relation/grid', () => ({
  ManyToManyRelationGrid: ({ value, hint }: { value: Array<{ id: number }> | null, hint: React.ReactNode }) => (
    <div>
      <ul>{ (value ?? []).map(item => (
        <li
          data-testid="row"
          key={ item.id }
        >{ item.id }</li>
      )) }</ul>
      <div data-testid="hint">{ hint }</div>
    </div>
  )
}))

jest.mock('@Pimcore/components/many-to-many-relation/components/toolbar/toolbar', () => ({
  ManyToManyRelationToolbar: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <input
      data-testid="search"
      onChange={ event => { onSearch(event.target.value) } }
    />
  )
}))

interface GridResult {
  data: Array<{ id: number, columns: Array<{ key: string, value: string | number }> }>
  isLoading: boolean
  isError: boolean
  refetchAll: () => void
  loadedCount: number
  totalCount: number
}

let gridResult: GridResult

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-data-object-grids', () => ({
  useDataObjectGrids: () => gridResult
}))

const nameColumn = {
  key: 'name',
  type: 'input',
  frontendType: 'input',
  title: 'Name',
  group: [],
  config: [],
  locale: null,
  localizable: false,
  sortable: false,
  editable: false,
  exportable: false,
  filterable: false,
  additionalAttributes: {}
}

const availableGridColumnsResult = { isLoading: false, data: { columns: [nameColumn] } }

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsForRelationQuery: () => availableGridColumnsResult
}))

// eslint-disable-next-line import/first
import { ManyToManyObjectRelation, type ManyToManyObjectRelationProps } from './many-to-many-object-relation'

const value = [1, 2].map(id => ({ id, type: 'object', subtype: 'Car', fullPath: `/cars/${id}`, isPublished: true }))

const props: ManyToManyObjectRelationProps = {
  allowToClearRelation: false,
  maxItems: null,
  pathFormatterClass: null,
  width: null,
  height: null,
  allowedClasses: ['Car'],
  combinedFieldName: 'items',
  value
}

const rowIds = (): string[] => screen.queryAllByTestId('row').map(row => row.textContent ?? '')

describe('ManyToManyObjectRelation search while the visible fields load', () => {
  it('finds a row by a visible field value as soon as that value has arrived, without further input', async () => {
    gridResult = {
      data: [{ id: 1, columns: [{ key: 'id', value: 1 }, { key: 'name', value: 'Golf' }] }],
      isLoading: true,
      isError: false,
      refetchAll: jest.fn(),
      loadedCount: 1,
      totalCount: 2
    }

    const { rerender } = render(<ManyToManyObjectRelation { ...props } />)

    // The visible fields carry the id column, as the search maps the values to rows by it.
    // Row 2 is only known by the value of a chunk that is still on its way.
    await act(async () => {
      fireEvent.change(screen.getByTestId('search'), { target: { value: 'Passat' } })
    })

    expect(rowIds()).toEqual([])
    expect(screen.getByTestId('hint').textContent).toContain('relations.visible-fields.loading-progress {"loaded":1,"total":2}')

    gridResult = {
      ...gridResult,
      data: [
        { id: 1, columns: [{ key: 'id', value: 1 }, { key: 'name', value: 'Golf' }] },
        { id: 2, columns: [{ key: 'id', value: 2 }, { key: 'name', value: 'Passat' }] }
      ],
      isLoading: false,
      loadedCount: 2
    }
    await act(async () => {
      rerender(<ManyToManyObjectRelation { ...props } />)
    })

    expect(rowIds()).toEqual(['2'])
    expect(screen.getByTestId('hint').textContent).not.toContain('loading')
  })
})
