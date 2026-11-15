/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError from './error-handler'
import ApiError from './classes/api-error'
import GeneralError from './classes/general-error'
import type { ApiErrorData } from './types'

const apiError = (errorData: object): ApiError => new ApiError(errorData as ApiErrorData)

const parseError = (originalStatus: number): ApiError => apiError({
  status: 'PARSING_ERROR',
  originalStatus,
  data: '<html></html>',
  error: 'SyntaxError: Unexpected token \'<\''
})

describe('trackError', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('shows an error that several callers report in the same tick only once', () => {
    const handler = jest.fn()

    trackError(parseError(502), handler)
    trackError(parseError(502), handler)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('shows the same plain-text error reported twice in the same tick only once', () => {
    const handler = jest.fn()

    trackError(apiError({ data: { message: 'Invalid argument' } }), handler)
    trackError(apiError({ data: { message: 'Invalid argument' } }), handler)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('still shows errors that differ, e.g. by HTTP status', () => {
    const handler = jest.fn()

    trackError(parseError(502), handler)
    trackError(parseError(504), handler)

    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('shows the same error again once the current tick is over', () => {
    const handler = jest.fn()

    trackError(parseError(502), handler)
    jest.runOnlyPendingTimers()
    trackError(parseError(502), handler)

    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('keeps throwing for a general error', () => {
    expect(() => { trackError(new GeneralError('boom'), jest.fn()) }).toThrow('boom')
  })
})
