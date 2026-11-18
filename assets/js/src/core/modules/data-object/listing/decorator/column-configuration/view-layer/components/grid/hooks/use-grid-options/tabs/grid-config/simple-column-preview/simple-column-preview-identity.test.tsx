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

const captured = jest.fn()
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns }: any) => {
    const { useSelectedColumns } = jest.requireActual('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns')
    const { decodeColumnIdentifier } = useSelectedColumns()
    captured({ id: columns[0].id, accessorKey: columns[0].accessorKey, decoded: decodeColumnIdentifier(columns[0].id) })
    return null
  }
}))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({
  GridContentRenderer: ({ children }: any) => <>{children}</>
}))

const useQueryMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: (...args: unknown[]) => useQueryMock(...args)
}))

const title = { key: 'title', type: 'dataobject.adapter', config: {}, localizable: true, locale: 'en' } as unknown as AvailableColumn
const added = { key: 'added', type: 'dataobject.adapter', config: {}, localizable: false } as unknown as AvailableColumn

const row = { id: 42, columns: [{ key: 'title', locale: 'en', value: 'Hello' }, { key: 'added', value: 'New' }] }

let controls: ReturnType<typeof usePreviewMode>

const Controls = (): null => {
  controls = usePreviewMode()
  return null
}

const tree = (): React.JSX.Element => (
  <PreviewModeProvider defaultEnabled>
    <Controls />
    <SimpleColumnPreviewsProvider columns={ [title, added] }>
      <SimpleColumnPreview column={ title } />
      <SimpleColumnPreview column={ added } />
    </SimpleColumnPreviewsProvider>
  </PreviewModeProvider>
)

describe('SimpleColumnPreview column id', () => {
  beforeEach(() => {
    captured.mockReset()
    useQueryMock.mockReset()
    useQueryMock.mockReturnValue({ data: undefined, currentData: { totalItems: 1, items: [row] }, isLoading: false, isFetching: false, error: undefined })
  })

  it('AC1: the preview grid column id decodes to the draft column', () => {
    render(tree())
    act(() => { controls.setItem({ data: { id: 42, fullpath: '/a' } }) })

    const call = captured.mock.calls.find(([c]) => c.decoded?.key === 'title')
    expect(call?.[0].decoded).toBe(title)
    expect(call?.[0].accessorKey).toBe('value')
    expect(call?.[0].id).not.toBe('value')
  })

  it('AC2: a column added in the modal, not in the listing\'s applied columns, decodes to the draft column', () => {
    render(tree())
    act(() => { controls.setItem({ data: { id: 42, fullpath: '/a' } }) })

    expect(captured.mock.calls.some(([c]) => c.decoded === added)).toBe(true)
  })

  it('AC3: keeps the same column id when the preview re-renders with the same columns', () => {
    const { rerender } = render(tree())
    act(() => { controls.setItem({ data: { id: 42, fullpath: '/a' } }) })
    const ids = (): string[] => captured.mock.calls.filter(([c]) => c.decoded === title).map(([c]) => c.id)
    const before = ids()
    expect(before.length).toBeGreaterThan(0)

    captured.mockClear()
    rerender(tree())

    const after = ids()
    expect(after.length).toBeGreaterThan(0)
    expect(new Set([...before, ...after]).size).toBe(1)
  })
})
