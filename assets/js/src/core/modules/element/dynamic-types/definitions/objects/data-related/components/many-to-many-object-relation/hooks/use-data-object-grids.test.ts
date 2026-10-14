/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useDataObjectGrids } from './use-data-object-grids'

let queryResult: Record<string, any>

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: () => queryResult
}))

const renderGrids = (): ReturnType<typeof useDataObjectGrids> => renderHook(() => useDataObjectGrids({
  classIds: ['Car'],
  convertClassName: () => ({ id: 'car-class-id' }) as any,
  columns: [{ key: 'name', type: 'dataobject.adapter', locale: null, config: [] }] as any,
  dataValue: [{ id: 5, type: 'object', subtype: 'Car', fullPath: '/cars/5', isPublished: true }] as any
})).result.current

describe('useDataObjectGrids', () => {
  it('is loading while the first request has no data yet', () => {
    queryResult = { isLoading: true, isFetching: true, data: undefined, refetch: jest.fn() }

    expect(renderGrids().isLoading).toBe(true)
  })

  // Saving any data object invalidates the grids; the relation field must keep its rows while they refetch.
  it('is not loading while refetching data it already has', () => {
    queryResult = { isLoading: false, isFetching: true, data: { items: [{ id: 5, columns: [] }] }, refetch: jest.fn() }

    const { isLoading, data } = renderGrids()

    expect(isLoading).toBe(false)
    expect(data).toEqual([{ id: 5, columns: [] }])
  })

  it('is loading while fetching without data', () => {
    queryResult = { isLoading: false, isFetching: true, data: undefined, refetch: jest.fn() }

    expect(renderGrids().isLoading).toBe(true)
  })
})
