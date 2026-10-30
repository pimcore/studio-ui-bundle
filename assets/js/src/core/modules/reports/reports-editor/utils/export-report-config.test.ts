/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { downloadFile } from '@Pimcore/modules/app/utils/download'
import { api } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { exportReportConfig } from './export-report-config'

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error').default,
  GeneralError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/general-error').default
}))

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

jest.mock('@Pimcore/modules/app/utils/download', () => ({
  downloadFile: jest.fn()
}))

jest.mock('@Pimcore/modules/reports/custom-reports-api-slice-enhanced', () => ({
  api: { endpoints: { customReportsConfigExport: { initiate: jest.fn() } } }
}))

const trackErrorMock = trackError as jest.MockedFunction<typeof trackError>
const downloadFileMock = downloadFile as jest.MockedFunction<typeof downloadFile>
const initiateMock = api.endpoints.customReportsConfigExport.initiate as jest.Mock

const REPORT_NAME = 'sales_by_region'

const dispatchReturning = (result: unknown): AppDispatch => {
  const thunk = { name: 'export-thunk' }
  initiateMock.mockReturnValue(thunk)

  return jest.fn(async (action: unknown) => action === thunk ? result : undefined) as unknown as AppDispatch
}

describe('exportReportConfig', () => {
  beforeEach(() => {
    trackErrorMock.mockClear()
    downloadFileMock.mockClear()
    initiateMock.mockReset()
  })

  it('requests a fresh export without keeping a cache subscription', async () => {
    const dispatch = dispatchReturning({ data: new Blob(['{}']) })

    await exportReportConfig(dispatch, REPORT_NAME)

    expect(initiateMock).toHaveBeenCalledWith({ name: REPORT_NAME }, { forceRefetch: true, subscribe: false })
  })

  it('downloads the returned blob under the report file name', async () => {
    const blob = new Blob(['{}'], { type: 'application/json' })
    const dispatch = dispatchReturning({ data: blob })

    await exportReportConfig(dispatch, REPORT_NAME)

    expect(downloadFileMock).toHaveBeenCalledWith('custom_report_sales_by_region_export.json', blob)
    expect(trackErrorMock).not.toHaveBeenCalled()
  })

  it('reports an api error instead of downloading', async () => {
    const error = { status: 404, data: { message: 'Report not found' } }
    const dispatch = dispatchReturning({ error })

    await exportReportConfig(dispatch, REPORT_NAME)

    expect(downloadFileMock).not.toHaveBeenCalled()
    expect(trackErrorMock).toHaveBeenCalledTimes(1)
    const tracked = trackErrorMock.mock.calls[0][0]
    expect(tracked).toBeInstanceOf(ApiError)
    expect(tracked).toMatchObject({ errorData: error })
  })

  it('reports a general error when the response is not a file', async () => {
    const dispatch = dispatchReturning({ data: { name: REPORT_NAME } })

    await exportReportConfig(dispatch, REPORT_NAME)

    expect(downloadFileMock).not.toHaveBeenCalled()
    expect(trackErrorMock.mock.calls[0][0]).toBeInstanceOf(GeneralError)
  })
})
