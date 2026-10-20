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
    })
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
const price = { key: 'price', type: 'dataobject.adapter', config: {}, localizable: false } as unknown as AvailableColumn
const advanced = { key: 'advanced', type: 'dataobject.advanced', config: {}, __meta: { uniqueId: 'x' } } as unknown as AvailableColumn
const columns = [name, advanced, price]

const row = {
  id: 42,
  columns: [{ key: 'name', value: 'Foo' }, { key: 'price', value: 5 }]
}

const Picker = (): React.JSX.Element => {
  const { setEnabled, setItem } = usePreviewMode()
  React.useEffect(() => {
    setEnabled(true)
    setItem({ data: { id: 42, fullpath: '/a' } })
  }, [])
  return <></>
}

const renderPreviews = ({ on = true, picked = true, fallback = null }: { on?: boolean, picked?: boolean, fallback?: { id: number } | null } = {}): void => {
  render(
    <PreviewModeProvider
      defaultEnabled={ on }
      fallbackItem={ fallback }
    >
      {picked && on && <Picker />}
      <SimpleColumnPreviewsProvider columns={ columns }>
        <SimpleColumnPreview column={ name } />
        <SimpleColumnPreview column={ price } />
      </SimpleColumnPreviewsProvider>
    </PreviewModeProvider>
  )
}

const activeCalls = (): any[][] => useQueryMock.mock.calls.filter(([, options]) => options?.skip !== true)

describe('SimpleColumnPreview', () => {
  beforeEach(() => {
    useQueryMock.mockReset()
    useQueryMock.mockReturnValue({ data: { totalItems: 1, items: [row] }, isLoading: false, error: undefined })
  })

  it('AC1: shows each simple column value for the picked item below its column', () => {
    renderPreviews()

    expect(screen.getByTestId('grid-name')).toHaveTextContent('Foo')
    expect(screen.getByTestId('grid-price')).toHaveTextContent('5')
  })

  it('AC1: uses the fallback item while nothing is picked', () => {
    renderPreviews({ picked: false, fallback: { id: 9 } })

    expect(activeCalls().at(-1)?.[0].body.filters.columnFilters).toEqual([{ type: 'system.ids', filterValue: [9] }])
  })

  it('AC2: makes one request with all simple columns (not the advanced one) and the id filter', () => {
    renderPreviews()

    const calls = activeCalls()
    expect(calls.length).toBeGreaterThan(0)
    const [firstArg] = calls[0]
    calls.forEach(([arg]) => { expect(arg).toEqual(firstArg) })
    expect(firstArg.classId).toBe('CAR')
    expect(firstArg.body.columns.map((c: any) => c.key)).toEqual(['name', 'price'])
    expect(firstArg.body.filters.columnFilters).toEqual([{ type: 'system.ids', filterValue: [42] }])
  })

  it('AC3: shows the advanced preview error state when the request fails', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false, error: { error: 'boom' } })
    renderPreviews()

    expect(screen.getAllByText(/grid\.advanced-column\.error-preview-data/)).toHaveLength(2)
    expect(screen.queryByTestId('grid-name')).not.toBeInTheDocument()
  })

  it('AC3: shows the advanced preview empty state when no row is returned', () => {
    useQueryMock.mockReturnValue({ data: { totalItems: 0, items: [] }, isLoading: false, error: undefined })
    renderPreviews()

    expect(screen.getAllByText('grid.advanced-column.no-preview-data')).toHaveLength(2)
  })

  it('AC3: shows the empty state when the row has no value for the column', () => {
    useQueryMock.mockReturnValue({ data: { totalItems: 1, items: [{ id: 42, columns: [{ key: 'name', value: 'Foo' }] }] }, isLoading: false })
    renderPreviews()

    expect(screen.getByTestId('grid-name')).toBeInTheDocument()
    expect(screen.getByText('grid.advanced-column.no-preview-data')).toBeInTheDocument()
  })

  it('AC3: says no preview is available when there is no item at all', () => {
    renderPreviews({ picked: false })

    expect(screen.getAllByText('grid.advanced-column.no-preview')).toHaveLength(2)
    activeCalls().forEach(() => { throw new Error('no request expected without an item') })
  })

  it('AC4: renders nothing and skips the request while preview mode is off', () => {
    const { container } = render(
      <PreviewModeProvider>
        <SimpleColumnPreviewsProvider columns={ columns }>
          <SimpleColumnPreview column={ name } />
        </SimpleColumnPreviewsProvider>
      </PreviewModeProvider>
    )

    expect(container).toBeEmptyDOMElement()
    expect(useQueryMock).toHaveBeenCalled()
    expect(activeCalls()).toHaveLength(0)
  })
})
