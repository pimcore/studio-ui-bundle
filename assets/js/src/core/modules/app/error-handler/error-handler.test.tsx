/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockState = { 'maintenance-mode': { isLockedOut: false } }

jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => mockState }
}))

// eslint-disable-next-line import/first
import trackError from './error-handler'
// eslint-disable-next-line import/first
import ApiError from './classes/api-error'
// eslint-disable-next-line import/first
import GeneralError from './classes/general-error'
// eslint-disable-next-line import/first
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

  describe('while the maintenance notice is open', () => {
    beforeEach(() => {
      mockState['maintenance-mode'].isLockedOut = true
    })

    afterEach(() => {
      mockState['maintenance-mode'].isLockedOut = false
    })

    it('leaves an HTML 503 to the notice', () => {
      const handler = jest.fn()

      trackError(parseError(503), handler)

      expect(handler).not.toHaveBeenCalled()
    })

    it('still shows other errors', () => {
      const handler = jest.fn()

      trackError(parseError(502), handler)
      trackError(apiError({ status: 503, data: { message: 'Service unavailable' } }), handler)

      expect(handler).toHaveBeenCalledTimes(2)
    })
  })

  it('shows an HTML 503 while no maintenance notice is open', () => {
    const handler = jest.fn()

    trackError(parseError(503), handler)

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
