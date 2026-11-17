/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { act, renderHook, type RenderHookResult } from '@testing-library/react'
import { type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { RowSelectionProvider } from '../../../../context-layer/provider/row-selection-provider'
import { useRowSelection, type UseRowSelectionReturn } from '../../../../context-layer/provider/use-row-selection'
import {
  getSelectedGridRows,
  useContextMenuRowSelection,
  type UseContextMenuRowSelectionReturn
} from './use-context-menu-row-selection'

interface RowAndMenuSelection {
  rowSelection: UseRowSelectionReturn
  contextMenu: UseContextMenuRowSelectionReturn
}

const wrapper = ({ children }: { children: ReactNode }): React.JSX.Element => (
  <RowSelectionProvider>{children}</RowSelectionProvider>
)

const gridElement = (id: number): GridContextMenuProps => ({
  id,
  isLocked: false,
  permissions: { view: true } as unknown as GridContextMenuProps['permissions']
})

const gridRow = (id: number): ListGridContextMenuProps['row'] => ({
  id,
  original: gridElement(id)
})

const renderForRow = (id: number): RenderHookResult<RowAndMenuSelection, unknown> => renderHook(() => ({
  rowSelection: useRowSelection(),
  contextMenu: useContextMenuRowSelection(gridRow(id))
}), { wrapper })

describe('useContextMenuRowSelection', () => {
  it('makes the right clicked row the selection when it is outside the selection', () => {
    const { result } = renderForRow(7)

    act(() => { result.current.rowSelection.setSelectedRows({ 1: true, 2: true }) })
    act(() => { result.current.contextMenu.selectRowIfUnselected() })

    expect(result.current.rowSelection.selectedRows).toEqual({ 7: true })
  })

  it('selects the right clicked row when nothing is selected', () => {
    const { result } = renderForRow(7)

    act(() => { result.current.contextMenu.selectRowIfUnselected() })

    expect(result.current.rowSelection.selectedRows).toEqual({ 7: true })
  })

  it('keeps the selection when the right clicked row is part of it', () => {
    const { result } = renderForRow(7)

    act(() => { result.current.rowSelection.setSelectedRows({ 1: true, 7: true, 2: true }) })
    act(() => { result.current.contextMenu.selectRowIfUnselected() })

    expect(result.current.rowSelection.selectedRows).toEqual({ 1: true, 7: true, 2: true })
  })

  it('leaves grids without row selection alone', () => {
    const { result } = renderHook(() => useContextMenuRowSelection(gridRow(7)))

    expect(() => { result.current.selectRowIfUnselected() }).not.toThrow()
  })
})

describe('getSelectedGridRows', () => {
  it('returns the selected rows with their permissions, the right clicked row with its own data', () => {
    const { result } = renderForRow(7)

    act(() => {
      result.current.rowSelection.setSelectedRowsData({
        1: { id: 1, isLocked: true, permissions: { view: false } },
        7: { id: 7, isLocked: true, permissions: { view: false } }
      })
      result.current.rowSelection.setSelectedRows({ 1: true, 7: true })
    })

    expect(getSelectedGridRows(result.current.rowSelection, gridElement(7))).toEqual([
      { id: 1, isLocked: true, permissions: { view: false } },
      { id: 7, isLocked: false, permissions: { view: true } }
    ])
  })

  it('ignores rows that are no longer selected', () => {
    const { result } = renderForRow(7)

    act(() => {
      result.current.rowSelection.setSelectedRowsData({ 1: { id: 1 }, 2: { id: 2 } })
      result.current.rowSelection.setSelectedRows({ 2: true })
    })

    expect(getSelectedGridRows(result.current.rowSelection, gridElement(7))).toEqual([{ id: 2 }])
  })

  it('returns nothing for grids without row selection', () => {
    expect(getSelectedGridRows(undefined, gridElement(7))).toEqual([])
  })
})
