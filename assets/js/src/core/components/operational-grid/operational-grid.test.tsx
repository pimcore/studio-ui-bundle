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
import { OperationalGrid, type OperationalGridProps } from './operational-grid'
import { type UseOperationsReturn } from './hooks/use-operations'

// OperationalGrid.Grid pulls in the full data grid (tanstack table/virtualizer, DI, antd, ...)
// which is irrelevant to these tests - only OperationalGrid.Operations (backed by useOperations)
// is exercised here, so the grid rendering itself is stubbed out
jest.mock('../grid/grid', () => ({
  Grid: () => null
}))

let operations: UseOperationsReturn

const renderOperationalGrid = (value: OperationalGridProps['value'], onChange?: (value: any[]) => void, extraProps?: Partial<OperationalGridProps>): ReturnType<typeof render> => (
  render(
    <OperationalGrid
      columns={ [] }
      onChange={ onChange }
      value={ value }
      { ...extraProps }
    >
      <OperationalGrid.Operations>
        {(ops) => {
          operations = ops
          return null
        }}
      </OperationalGrid.Operations>
    </OperationalGrid>
  )
)

describe('OperationalGrid (regression platform-version#260)', () => {
  // the class-definition API serializes an unconfigured field's "options" as `null`, not `[]` -
  // a default parameter (`value = []`) does not cover an explicit `null`, only `undefined`.
  // Before the fix, addRow did `[...value, data]`, which threw "TypeError: e is not iterable"
  // when value was null - exactly the crash reported for the Studio class editor's "Select
  // Options" grid on a field with no configured options.
  it('addRow does not throw when value is null and reports the new row as the whole value', () => {
    const onChange = jest.fn()

    renderOperationalGrid(null, onChange)

    expect(() => { operations.addRow({ key: '', value: '' }) }).not.toThrow()
    expect(onChange).toHaveBeenCalledWith([{ key: '', value: '' }])
  })

  it('addRow does not throw when value is undefined', () => {
    const onChange = jest.fn()

    renderOperationalGrid(undefined, onChange)

    expect(() => { operations.addRow({ key: '', value: '' }) }).not.toThrow()
    expect(onChange).toHaveBeenCalledWith([{ key: '', value: '' }])
  })

  it('deleteSelectedRows and getSelectedRowsData operate on the normalized empty array when value is null and rows are selected', () => {
    const onChange = jest.fn()

    // without a non-empty row selection both operations return early and never touch `value`,
    // so the selection is what makes this test actually reach `value.filter` on the null value
    renderOperationalGrid(null, onChange, { selectedRows: { 0: true } })

    expect(() => { operations.deleteSelectedRows() }).not.toThrow()
    expect(onChange).toHaveBeenCalledWith([])
    expect(operations.getSelectedRowsData()).toEqual([])
  })

  it('addRow appends to an already-populated value as before', () => {
    const onChange = jest.fn()

    renderOperationalGrid([{ key: 'a', value: 'a' }], onChange)

    operations.addRow({ key: 'b', value: 'b' })

    expect(onChange).toHaveBeenCalledWith([{ key: 'a', value: 'a' }, { key: 'b', value: 'b' }])
  })
})
