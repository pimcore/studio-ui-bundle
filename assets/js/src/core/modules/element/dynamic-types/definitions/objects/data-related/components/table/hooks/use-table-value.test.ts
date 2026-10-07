/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { useTableValue, type TableValue } from './use-table-value'

const grid = (): TableValue => [
  ['a1', 'b1'],
  ['a2', 'b2']
]

interface Setup {
  result: { current: ReturnType<typeof useTableValue> }
  onChange: jest.Mock
  selectCell: (rowIndex: number, columnIndex: number) => void
}

const setup = (initialValue: TableValue | null = grid()): Setup => {
  const onChange = jest.fn()

  const { result } = renderHook(() => useTableValue({
    initialValue,
    onChange,
    cols: 2,
    rows: 2,
    columnConfigActivated: false,
    emptyValue: null
  }))

  const selectCell = (rowIndex: number, columnIndex: number): void => {
    act(() => {
      result.current.setActiveCell({ rowIndex, columnIndex, columnId: String(columnIndex) })
    })
  }

  return { result, onChange, selectCell }
}

describe('useTableValue insert positions', () => {
  describe('newRow', () => {
    it('inserts above the selected row by default, preserving the previous behaviour', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(1, 0)

      act(() => { result.current.newRow() })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1'], ['', ''], ['a2', 'b2']])
    })

    it('inserts above the selected row for "before"', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(1, 0)

      act(() => { result.current.newRow('before') })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1'], ['', ''], ['a2', 'b2']])
    })

    it('inserts below the selected row for "after"', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(0, 0)

      act(() => { result.current.newRow('after') })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1'], ['', ''], ['a2', 'b2']])
    })

    it('appends for "end" even while a cell is selected', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(0, 0)

      act(() => { result.current.newRow('end') })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1'], ['a2', 'b2'], ['', '']])
    })

    it('appends when nothing is selected', () => {
      const { result, onChange } = setup()

      act(() => { result.current.newRow('after') })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1'], ['a2', 'b2'], ['', '']])
    })
  })

  describe('newColumn', () => {
    it('inserts left of the selected column by default', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(0, 1)

      act(() => { result.current.newColumn() })

      expect(onChange).toHaveBeenCalledWith([['a1', '', 'b1'], ['a2', '', 'b2']])
    })

    it('inserts right of the selected column for "after"', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(0, 0)

      act(() => { result.current.newColumn('after') })

      expect(onChange).toHaveBeenCalledWith([['a1', '', 'b1'], ['a2', '', 'b2']])
    })

    it('appends for "end" even while a cell is selected', () => {
      const { result, onChange, selectCell } = setup()
      selectCell(0, 0)

      act(() => { result.current.newColumn('end') })

      expect(onChange).toHaveBeenCalledWith([['a1', 'b1', ''], ['a2', 'b2', '']])
    })

    it('does nothing when the column config is active', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() => useTableValue({
        initialValue: [{ first: 'a1', second: 'b1' }],
        onChange,
        cols: 2,
        rows: 1,
        columnConfigActivated: true,
        columnConfig: [{ key: 'first', label: 'First' }, { key: 'second', label: 'Second' }],
        emptyValue: null
      }))

      act(() => { result.current.newColumn('after') })

      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
