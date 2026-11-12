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
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns, data }: any) => (
    <div data-testid={ `grid-${columns[0].header}` }>{String(data[0]?.[columns[0].accessorKey])}</div>
  )
}))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({
  GridContentRenderer: ({ children }: any) => <>{children}</>
}))

const useQueryMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: (...args: unknown[]) => useQueryMock(...args)
}))

const name = { key: 'name', type: 'dataobject.adapter', group: ['Attributes'], config: { a: 1 }, localizable: false } as unknown as AvailableColumn

const lang = { key: 'title', type: 'dataobject.adapter', config: {}, localizable: true } as unknown as AvailableColumn

const row = { id: 42, columns: [{ key: 'name', value: 'Foo' }, { key: 'title', locale: 'en', value: 'Hello' }] }

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

describe('SimpleColumnPreview arguments', () => {
  beforeEach(() => {
    useQueryMock.mockReset()
  })

  it('AC1: shows the spinner, not the previous value, after the preview item changed', () => {
    settledOnFirstArgs()
    renderPreviews()
    expect(screen.getByTestId('grid-name')).toHaveTextContent('Foo')

    act(() => { controls.setItem({ data: { id: 43, fullpath: '/b' } }) })

    expect(screen.queryByTestId('grid-name')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.ant-spin').length).toBeGreaterThan(0)
  })

  it('AC2: shows the spinner, not the previous value, after the preview language changed', () => {
    settledOnFirstArgs()
    renderPreviews()
    expect(screen.getByTestId('grid-title')).toHaveTextContent('Hello')

    act(() => { controls.setLanguage('de') })

    expect(screen.queryByTestId('grid-title')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.ant-spin').length).toBeGreaterThan(0)
  })

  it('AC3: keeps the value without a spinner while the same arguments refetch', () => {
    const result = { totalItems: 1, items: [row] }
    useQueryMock.mockReturnValue({ data: result, currentData: result, isLoading: false, isFetching: true, error: undefined })
    renderPreviews()

    expect(screen.getByTestId('grid-name')).toHaveTextContent('Foo')
    expect(document.querySelector('.ant-spin')).toBeNull()
  })

  it('AC3: shows the error text, not the previous value, when it settles with an error', () => {
    useQueryMock.mockReturnValue({ data: { totalItems: 1, items: [row] }, currentData: undefined, isLoading: false, isFetching: false, error: { error: 'boom' } })
    renderPreviews()

    expect(screen.getAllByText('grid.advanced-column.error-preview-data')).toHaveLength(2)
    expect(screen.queryByTestId('grid-name')).not.toBeInTheDocument()
  })
})
