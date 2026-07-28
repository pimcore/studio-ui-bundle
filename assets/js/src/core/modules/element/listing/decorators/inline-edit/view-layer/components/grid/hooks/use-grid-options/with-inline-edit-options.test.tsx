/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook, waitFor } from '@testing-library/react'
import { type IInlineEditDecoratorConfig, type IInlineEditDecoratorProps } from '../../../../../inline-edit-decorator'
import { WithInlineEdit } from './with-inline-edit-options'

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useDataQueryHelper: () => ({
      getArgs: () => ({ body: {} })
    })
  })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({
    decodeColumnIdentifier: (columnId: string) => ({ key: columnId, type: 'text' })
  })
}))

const useBaseGridOptions: IInlineEditDecoratorProps['useGridOptions'] = () => ({
  transformGridColumn: () => ({ header: '' }),
  transformGridColumnDefinition: (columns) => columns,
  getGridProps: () => ({})
})

describe('WithInlineEdit', () => {
  const undoMock = jest.fn()
  const updateCacheMock = jest.fn()
  const updateApiDataMock = jest.fn()

  const config: IInlineEditDecoratorConfig = {
    useInlineEditApiUpdate: () => ({
      updateCache: updateCacheMock,
      updateApiData: updateApiDataMock
    })
  }

  const updateCell = (): ReturnType<typeof renderHook<ReturnType<IInlineEditDecoratorProps['useGridOptions']>, unknown>> => {
    const useGridOptions = WithInlineEdit(useBaseGridOptions, config)
    const renderHookResult = renderHook(() => useGridOptions())

    act(() => {
      renderHookResult.result.current.getGridProps().onUpdateCellData?.({
        rowIndex: 0,
        columnId: 'name',
        value: 'new value',
        rowData: { id: 5 }
      })
    })

    return renderHookResult
  }

  const flushUpdateChain = async (): Promise<void> => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    updateCacheMock.mockReturnValue({ undo: undoMock })
  })

  it('reverts the optimistic cache update when the save request fails', async () => {
    updateApiDataMock.mockResolvedValue({ error: { status: 500 } })

    updateCell()

    await waitFor(() => { expect(undoMock).toHaveBeenCalledTimes(1) })
  })

  it('reverts the optimistic cache update when the save request throws', async () => {
    updateApiDataMock.mockRejectedValue(new Error('network error'))

    updateCell()

    await waitFor(() => { expect(undoMock).toHaveBeenCalledTimes(1) })
  })

  it('keeps the optimistic cache update when the save request succeeds', async () => {
    updateApiDataMock.mockResolvedValue({ data: {} })

    updateCell()

    await flushUpdateChain()

    expect(updateApiDataMock).toHaveBeenCalledTimes(1)
    expect(undoMock).not.toHaveBeenCalled()
  })

  it('removes the modified cell marker after a failed save request', async () => {
    updateApiDataMock.mockResolvedValue({ error: { status: 500 } })

    const { result } = updateCell()

    expect(result.current.getGridProps().modifiedCells).toEqual([{ rowIndex: 5, columnId: 'name' }])

    await flushUpdateChain()

    expect(result.current.getGridProps().modifiedCells).toEqual([])
  })
})
