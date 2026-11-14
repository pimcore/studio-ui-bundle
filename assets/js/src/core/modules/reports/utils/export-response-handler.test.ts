/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { type ApiErrorData, type IApiErrorDetails } from '@Pimcore/modules/app/error-handler/types'
import { exportResponseHandler } from './export-response-handler'

const response = (ok: boolean, body: unknown): Response => ({
  ok,
  blob: async () => new Blob([JSON.stringify(body)], { type: 'application/json' }),
  json: async () => body
} as unknown as Response)

describe('exportResponseHandler', () => {
  it('reads a successful response as the export file', async () => {
    const result = await exportResponseHandler(response(true, { name: 'sales' }))

    expect(result).toBeInstanceOf(Blob)
  })

  it('keeps the message and error key of a failed response readable for ApiError', async () => {
    const body = { message: 'Custom report "sales" not found', errorKey: 'custom_report_not_found' }

    const data = await exportResponseHandler(response(false, body))
    const errorData: ApiErrorData = { status: 404, data: data as IApiErrorDetails }
    const error = new ApiError(errorData)

    expect(data).toEqual(body)
    expect(error.getContent()).toEqual({ errorKey: 'custom_report_not_found' })
  })
})
