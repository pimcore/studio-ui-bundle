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
const mockUseDataObjectGetGridQuery = jest.fn((args: any, options: any) => queryResult)

const mockTrackError = jest.fn()

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class {
    constructor (public errorData: unknown) {}
  }
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridQuery: (args: any, options: any) => mockUseDataObjectGetGridQuery(args, options)
}))

const relatedObjects = (count: number, subtype: string, firstId: number = 1): any[] =>
  Array.from({ length: count }, (_, index) => ({
    id: firstId + index,
    type: 'object',
    subtype,
    fullPath: `/objects/${firstId + index}`,
    isPublished: true
  }))

const renderGrids = (dataValue: any[], classIds: string[] = ['Car']): ReturnType<typeof useDataObjectGrids> => renderHook(() => useDataObjectGrids({
  classIds,
  convertClassName: (name: string) => ({ id: `${name}-class-id` }) as any,
  columns: [{ key: 'name', type: 'dataobject.adapter', locale: null, config: [] }] as any,
  dataValue
})).result.current

const requestedFilters = (callIndex: number = 0): any => mockUseDataObjectGetGridQuery.mock.calls[callIndex][0].body.filters

describe('useDataObjectGrids', () => {
  beforeEach(() => {
    mockUseDataObjectGetGridQuery.mockClear()
    mockTrackError.mockClear()
    queryResult = { isLoading: false, isFetching: false, isError: false, data: undefined, refetch: jest.fn() }
  })

  // A fixed page size left the rows beyond the first page without visible field values.
  it('requests all related objects of a class in a single page', () => {
    renderGrids(relatedObjects(1100, 'Car'))

    const filters = requestedFilters()
    expect(filters.page).toBe(1)
    expect(filters.pageSize).toBe(1100)
    expect(filters.columnFilters[0].filterValue).toHaveLength(1100)
  })

  it('sizes the page of each class by the related objects of that class', () => {
    renderGrids([...relatedObjects(3, 'Car'), ...relatedObjects(2, 'Bike', 100)], ['Car', 'Bike'])

    expect(requestedFilters(0).pageSize).toBe(3)
    expect(requestedFilters(0).columnFilters[0].filterValue).toEqual([1, 2, 3])
    expect(requestedFilters(1).pageSize).toBe(2)
    expect(requestedFilters(1).columnFilters[0].filterValue).toEqual([100, 101])
  })

  it('reports an error when a grid request fails', () => {
    queryResult = { isLoading: false, isFetching: false, isError: true, data: undefined, refetch: jest.fn() }

    expect(renderGrids(relatedObjects(1, 'Car')).isError).toBe(true)
  })

  it('tracks the error of a failed grid request', () => {
    const error = { status: 500, data: { message: 'failed' } }
    queryResult = { isLoading: false, isFetching: false, isError: true, error, data: undefined, refetch: jest.fn() }

    renderGrids(relatedObjects(1, 'Car'))

    expect(mockTrackError).toHaveBeenCalledTimes(1)
    expect(mockTrackError.mock.calls[0][0].errorData).toBe(error)
  })

  it('reports no error when the grid requests succeed', () => {
    queryResult = { isLoading: false, isFetching: false, isError: false, data: { items: [{ id: 1, columns: [] }] }, refetch: jest.fn() }

    const { isError, data } = renderGrids(relatedObjects(1, 'Car'))

    expect(isError).toBe(false)
    expect(data).toEqual([{ id: 1, columns: [] }])
    expect(mockTrackError).not.toHaveBeenCalled()
  })
})
