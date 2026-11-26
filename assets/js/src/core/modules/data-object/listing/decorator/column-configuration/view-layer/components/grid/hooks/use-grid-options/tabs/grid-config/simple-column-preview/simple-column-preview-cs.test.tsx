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

const csColumn = (overrides: Record<string, unknown> = {}): AvailableColumn => ({
  key: 'color',
  type: 'dataobject.classificationstore',
  config: { keyId: 2, groupId: 20 },
  localizable: false,
  ...overrides
} as unknown as AvailableColumn)

const entry = (keyId: number, groupId: number, value: string, locale: string | null = null, key = 'color'): Record<string, unknown> => ({
  key, locale, value, additionalAttributes: { keyId, groupId }
})

let controls: ReturnType<typeof usePreviewMode>
const Controls = (): null => {
  controls = usePreviewMode()
  return null
}

const renderPreview = (column: AvailableColumn, entries: Array<Record<string, unknown>>, language?: string): void => {
  const result = { totalItems: 1, items: [{ id: 42, columns: entries }] }
  useQueryMock.mockReturnValue({ data: result, currentData: result, isLoading: false, isFetching: false, error: undefined })
  render(
    <PreviewModeProvider defaultEnabled>
      <Controls />
      <SimpleColumnPreviewsProvider columns={ [column] }>
        <SimpleColumnPreview column={ column } />
      </SimpleColumnPreviewsProvider>
    </PreviewModeProvider>
  )
  act(() => {
    controls.setItem({ data: { id: 42, fullpath: '/a' } })
    if (language !== undefined) controls.setLanguage(language)
  })
}

describe('SimpleColumnPreview classification store', () => {
  beforeEach(() => { useQueryMock.mockReset() })

  it('AC1: shows the sibling entry whose key ID and group ID equal the column config', () => {
    renderPreview(csColumn(), [entry(1, 10, 'first'), entry(2, 20, 'second'), entry(3, 30, 'third')])

    expect(screen.getByTestId('grid-color')).toHaveTextContent('second')
  })

  it('AC1: matches an entry whose response key carries a suffix after the first dot', () => {
    renderPreview(csColumn(), [entry(1, 10, 'first', null, 'color.1'), entry(2, 20, 'second', null, 'color.2')])

    expect(screen.getByTestId('grid-color')).toHaveTextContent('second')
  })

  it('AC2: a column without locale takes the entry in the preview language, not the UI language', () => {
    const column = csColumn({ localizable: true })
    renderPreview(column, [entry(2, 20, 'english', 'en'), entry(2, 20, 'german', 'de')], 'de')

    expect(screen.getByTestId('grid-color')).toHaveTextContent('german')
  })

  it('AC2: a column with locale "default" takes the entry with a null locale', () => {
    const column = csColumn({ localizable: true, locale: 'default' })
    renderPreview(column, [entry(2, 20, 'english', 'en'), entry(2, 20, 'neutral', null)], 'de')

    expect(screen.getByTestId('grid-color')).toHaveTextContent('neutral')
  })

  it('AC2: a column with its own locale takes the entry in that locale', () => {
    const column = csColumn({ localizable: true, locale: 'fr' })
    renderPreview(column, [entry(2, 20, 'german', 'de'), entry(2, 20, 'french', 'fr')], 'de')

    expect(screen.getByTestId('grid-color')).toHaveTextContent('french')
  })

  it('AC3: shows the no preview data state when no entry has the column key ID and group ID', () => {
    renderPreview(csColumn(), [entry(1, 10, 'first'), entry(2, 99, 'wrong group'), entry(9, 20, 'wrong key')])

    expect(screen.queryByTestId('grid-color')).not.toBeInTheDocument()
    expect(screen.getByText('grid.advanced-column.no-preview-data')).toBeInTheDocument()
  })
})
