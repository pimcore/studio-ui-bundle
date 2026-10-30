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
import { DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'
import { useReportData } from './useReportData'

const mockGetDynamicType = jest.fn()
const mockReportQuery = jest.fn()
const mockChartQuery = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ getDynamicType: mockGetDynamicType }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/reports/custom-reports-api-slice-enhanced', () => ({
  useCustomReportsReportQuery: (...args: unknown[]) => mockReportQuery(...args),
  useCustomReportsChartQuery: (...args: unknown[]) => mockChartQuery(...args)
}))

class GenericAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'generic'
  getLabel (): any { return null }
  getPagination (): boolean { return true }
  getCustomReportData (): any { return null }
}

class CustomViewAdapter extends GenericAdapter {
  getCustomReportView (): any { return null }
}

const queryResult = { isLoading: false, isFetching: false, refetch: jest.fn().mockResolvedValue(undefined) }

const setup = (currentData: unknown, adapter?: unknown, data: unknown = currentData): ReturnType<typeof useReportData> => {
  mockReportQuery.mockReturnValue({ ...queryResult, data, currentData })
  mockChartQuery.mockReturnValue({ ...queryResult, data: { items: ['previous'] } })
  mockGetDynamicType.mockReturnValue(adapter)

  return renderHook(() => useReportData({ name: 'report', page: 1, pageSize: 50 })).result.current
}

const chartQuerySkipped = (): boolean => mockChartQuery.mock.calls.at(-1)?.[1].skip

describe('useReportData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('loads the chart data for adapters without their own view', () => {
    setup({ name: 'report', dataSourceConfig: { type: 'generic' } }, new GenericAdapter())

    expect(chartQuerySkipped()).toBe(false)
  })

  it('does not load the chart data for adapters with their own view', () => {
    setup({ name: 'report', dataSourceConfig: { type: 'custom' } }, new CustomViewAdapter())

    expect(chartQuerySkipped()).toBe(true)
  })

  it('does not use the adapter of a previously loaded report', () => {
    setup(undefined, new CustomViewAdapter(), { name: 'previous', dataSourceConfig: { type: 'custom' } })

    expect(chartQuerySkipped()).toBe(true)
    expect(mockGetDynamicType).not.toHaveBeenCalled()
  })

  it('neither refetches nor returns the chart data of a skipped query', () => {
    const result = setup({ name: 'report', dataSourceConfig: { type: 'custom' } }, new CustomViewAdapter())

    expect(result.chartDetailData).toBeUndefined()
    expect(() => { result.refetchAll() }).not.toThrow()
    expect(queryResult.refetch).toHaveBeenCalledTimes(1)
  })

  it('waits for the report details before loading the chart data', () => {
    setup(undefined)

    expect(chartQuerySkipped()).toBe(true)
  })
})
