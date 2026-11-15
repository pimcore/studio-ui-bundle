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
import { act, render } from '@testing-library/react'

const mockGrid = jest.fn((props: any) => null)

jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: (props: any) => mockGrid(props)
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/drag-and-drop/hooks/use-droppable', () => ({
  useDroppable: () => ({ getStateClasses: () => [] })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ mapToLegacyElementType: (type: string) => type })
}))

jest.mock('./hooks/use-columns', () => ({
  useColumns: () => ({ columns: [] })
}))

jest.mock('./grid.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

// eslint-disable-next-line import/first
import { ManyToManyRelationGrid, type ManyToManyRelationGridProps } from './grid'

const value = [
  { id: 1, type: 'object', subtype: 'Car', fullPath: '/cars/1', isPublished: true },
  { id: 2, type: 'object', subtype: 'Car', fullPath: '/cars/2', isPublished: true }
]

const gridProps = (props: Partial<ManyToManyRelationGridProps> = {}): ManyToManyRelationGridProps => ({
  value,
  deleteItem: jest.fn(),
  assetInlineDownloadAllowed: false,
  width: null,
  height: null,
  enableRowDrag: true,
  enableRowVirtualizer: false,
  handleOrderChange: jest.fn(),
  ...props
})

const lastGridProps = (): any => mockGrid.mock.calls[mockGrid.mock.calls.length - 1][0]

describe('ManyToManyRelationGrid', () => {
  beforeEach(() => {
    mockGrid.mockClear()
  })

  // Visible field values can arrive after the rows; the rows must pick them up without a value change.
  it('enriches the rows again when the row enrichment changes', () => {
    const { rerender } = render(<ManyToManyRelationGrid { ...gridProps({ enrichRowData: (row) => ({ ...row, name: undefined }) }) } />)

    expect(lastGridProps().data.map((row: any) => row.name)).toEqual([undefined, undefined])

    rerender(<ManyToManyRelationGrid { ...gridProps({ enrichRowData: (row) => ({ ...row, name: `Car ${row.id}` }) }) } />)

    expect(lastGridProps().data.map((row: any) => row.name)).toEqual(['Car 1', 'Car 2'])
  })

  it('passes the reordered, enriched rows on drag and drop', () => {
    const handleOrderChange = jest.fn()
    render(<ManyToManyRelationGrid { ...gridProps({ handleOrderChange, enrichRowData: (row) => ({ ...row, name: `Car ${row.id}` }) }) } />)

    // Rows are identified by their position, which allows the same element to be assigned twice
    act(() => {
      lastGridProps().handleDragEnd({ active: { id: '1' }, over: { id: '0' } })
    })

    expect(handleOrderChange.mock.calls[0][0].map((row: any) => [row.id, row.name])).toEqual([[2, 'Car 2'], [1, 'Car 1']])
    expect(lastGridProps().data.map((row: any) => row.id)).toEqual([2, 1])
  })
})
