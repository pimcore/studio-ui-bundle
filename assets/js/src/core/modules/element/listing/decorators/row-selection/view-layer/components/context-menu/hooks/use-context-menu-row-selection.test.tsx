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
import { RowSelectionProvider } from '../../../../context-layer/provider/row-selection-provider'
import { useRowSelection, type UseRowSelectionReturn } from '../../../../context-layer/provider/use-row-selection'
import { useContextMenuRowSelection, type UseContextMenuRowSelectionReturn } from './use-context-menu-row-selection'

interface RowAndMenuSelection {
  rowSelection: UseRowSelectionReturn
  contextMenu: UseContextMenuRowSelectionReturn
}

const wrapper = ({ children }: { children: ReactNode }): React.JSX.Element => (
  <RowSelectionProvider>{children}</RowSelectionProvider>
)

const gridRow = (id: number): ListGridContextMenuProps['row'] => ({
  id,
  original: { id, isLocked: false, permissions: { view: true } }
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

  it('hands the selected rows with their permissions to the menu', () => {
    const { result } = renderForRow(7)

    act(() => {
      result.current.rowSelection.setSelectedRowsData({ 1: { id: 1, isLocked: true, permissions: { view: false } } })
      result.current.rowSelection.setSelectedRows({ 1: true, 7: true })
    })

    expect(result.current.contextMenu.selection).toEqual([
      { id: 1, isLocked: true, permissions: { view: false } },
      { id: 7, isLocked: false, permissions: { view: true } }
    ])
  })

  it('leaves grids without row selection alone', () => {
    const { result } = renderHook(() => useContextMenuRowSelection(gridRow(7)))

    expect(result.current.selection).toBeUndefined()
    expect(() => { result.current.selectRowIfUnselected() }).not.toThrow()
  })
})
