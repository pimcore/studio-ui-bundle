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
import { act, render, screen } from '@testing-library/react'
import { PreviewModeProvider, usePreviewMode } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { SimpleColumnPreview, SimpleColumnPreviewsProvider } from './simple-column-preview'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 'CAR', name: 'Car' } })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useGridOptions: () => ({
      transformGridColumn: (column: AvailableColumn) => ({ header: column.key, meta: { type: column.type } })
    }),
    useColumnMapper: () => jest.requireActual('@Pimcore/modules/data-object/listing/column-mapper/use-column-mapper').useDataObjectColumnMapper()
  })
}))

// The grid cell renderers themselves are covered elsewhere; here only what is handed to the grid matters
// The mock renders the relation list the way the relation cells do: from `row.original`
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/grid-cell-preview/relation-list/relation-list', () => ({
  RelationList: ({ relations }: any) => <>{relations.map((r: any) => <span key={ r.id }>{r.fullPath}</span>)}</>
}))
const gridData = jest.fn()
const formatPathMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/hooks/use-format-path', () => ({
  useFormatPath: () => ({ formatPath: formatPathMock })
}))
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns, data }: any) => {
    const { FormattedRelationList } = jest.requireActual('@Pimcore/modules/element/dynamic-types/definitions/objects/grid-cell-preview/relation-list/formatted-relation-list')
    gridData(data)
    const original = data[0]
    return (
      <FormattedRelationList
        dataObjectId={ original.id }
        fieldNameFallback="rel"
        pathFormatterClass="Formatter"
        relations={ original[columns[0].accessorKey] }
      />
    )
  }
}))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({
  GridContentRenderer: ({ children }: any) => <>{children}</>
}))

const useQueryMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: (...args: unknown[]) => useQueryMock(...args)
}))

const rel = { key: 'rel', type: 'dataobject.adapter', config: {}, localizable: false } as unknown as AvailableColumn

const name = { key: 'name', type: 'dataobject.adapter', group: ['Attributes'], config: { a: 1 }, localizable: false } as unknown as AvailableColumn

const lang = { key: 'title', type: 'dataobject.adapter', config: {}, localizable: true } as unknown as AvailableColumn

const relations = [{ id: 7, type: 'object', fullPath: '/raw/path' }]

const row = { id: 42, isLocked: false, permissions: { view: true }, columns: [{ key: 'rel', value: relations }, { key: 'name', value: 'Foo' }, { key: 'title', locale: 'en', value: 'Hello' }] }

let controls: ReturnType<typeof usePreviewMode>

const Controls = (): null => {
  controls = usePreviewMode()
  return null
}

const renderPreviews = (): void => {
  render(
    <PreviewModeProvider defaultEnabled>
      <Controls />
      <SimpleColumnPreviewsProvider columns={ [name, lang] }>
        <SimpleColumnPreview column={ name } />
        <SimpleColumnPreview column={ lang } />
      </SimpleColumnPreviewsProvider>
    </PreviewModeProvider>
  )
  act(() => { controls.setItem({ data: { id: 42, fullpath: '/a' } }) })
}

/** Settled for the first arguments; every other argument set loads, with RTK Query's `data` still the previous result */
const settledOnFirstArgs = (): void => {
  let first: string | undefined
  useQueryMock.mockImplementation((arg: unknown, options: { skip?: boolean }) => {
    if (options?.skip === true) {
      return { data: undefined, currentData: undefined, isLoading: false, isFetching: false, error: undefined }
    }
    first ??= JSON.stringify(arg)
    const same = JSON.stringify(arg) === first
    return { data: { totalItems: 1, items: [row] }, currentData: same ? { totalItems: 1, items: [row] } : undefined, isLoading: false, isFetching: !same, error: undefined }
  })
}

const renderRel = (apiRow: unknown): void => {
  useQueryMock.mockReturnValue({ data: undefined, currentData: { totalItems: 1, items: [apiRow] }, isLoading: false, isFetching: false, error: undefined })
  render(
    <PreviewModeProvider defaultEnabled>
      <Controls />
      <SimpleColumnPreviewsProvider columns={ [rel] }>
        <SimpleColumnPreview column={ rel } />
      </SimpleColumnPreviewsProvider>
    </PreviewModeProvider>
  )
  act(() => { controls.setItem({ data: { id: 42, fullpath: '/a' } }) })
}

describe('SimpleColumnPreview row', () => {
  beforeEach(() => {
    useQueryMock.mockReset()
    gridData.mockReset()
    formatPathMock.mockReset()
    formatPathMock.mockResolvedValue(undefined)
  })

  it('AC1: passes the grid the element id, metadata and API row next to the value', () => {
    renderRel(row)

    expect(gridData).toHaveBeenCalled()
    const [original] = gridData.mock.calls[0][0]
    expect(original.id).toBe(42)
    expect(original.isLocked).toBe(false)
    expect(original.permissions).toEqual({ view: true })
    expect(original['__api-data']).toBe(row)
    expect(Object.values(original)).toContain(relations)
  })

  it('AC2: calls the path formatter with the element id', () => {
    renderRel(row)

    expect(formatPathMock).toHaveBeenCalledWith([{ id: 7, type: 'object', fullPath: '/raw/path' }], 'rel', 42, false)
  })

  it('AC3: renders the raw path without an error when the API row has no id', () => {
    const { id, ...withoutId } = row
    renderRel(withoutId)

    expect(formatPathMock).not.toHaveBeenCalled()
    expect(screen.getByText('/raw/path')).toBeInTheDocument()
  })
})
