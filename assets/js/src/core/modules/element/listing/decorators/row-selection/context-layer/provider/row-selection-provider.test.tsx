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
import { act, renderHook } from '@testing-library/react'
import { RowSelectionProvider } from './row-selection-provider'
import { useRowSelection } from './use-row-selection'

const wrapper = ({ children }: { children: ReactNode }): React.JSX.Element => (
  <RowSelectionProvider>{children}</RowSelectionProvider>
)

describe('RowSelectionProvider deselectRows', () => {
  it('removes only the given rows from the selection', () => {
    const { result } = renderHook(() => useRowSelection(), { wrapper })

    act(() => { result.current.setSelectedRows({ 1: true, 2: true, 3: true }) })
    act(() => { result.current.deselectRows([1, 2]) })

    expect(result.current.selectedRows).toEqual({ 3: true })
  })

  it('keeps rows selected after the deselected ids were captured', () => {
    const { result } = renderHook(() => useRowSelection(), { wrapper })

    act(() => { result.current.setSelectedRows({ 1: true, 2: true }) })
    // A batch edit job captures the callback for rows 1 and 2, then the user selects other rows
    const { deselectRows } = result.current
    act(() => { result.current.setSelectedRows({ 3: true, 4: true }) })
    act(() => { deselectRows([1, 2]) })

    expect(result.current.selectedRows).toEqual({ 3: true, 4: true })
  })

  it('accepts string ids', () => {
    const { result } = renderHook(() => useRowSelection(), { wrapper })

    act(() => { result.current.setSelectedRows({ 5: true, 6: true }) })
    act(() => { result.current.deselectRows(['5']) })

    expect(result.current.selectedRows).toEqual({ 6: true })
  })
})
