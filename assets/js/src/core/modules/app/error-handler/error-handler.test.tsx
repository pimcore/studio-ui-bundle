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

const mockLockedOut = { value: false }
const mockInIframe = { value: false }

jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => ({}) }
}))
jest.mock('@Pimcore/modules/maintenance-mode/maintenance-mode-slice', () => ({
  selectIsLockedOut: () => mockLockedOut.value
}))
jest.mock('@Pimcore/utils/iframe', () => ({
  isInIframe: () => mockInIframe.value
}))

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
      mockLockedOut.value = true
    })

    afterEach(() => {
      mockLockedOut.value = false
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

    it('still shows an HTML 503 in the document editor iframe, which has no notice', () => {
      mockInIframe.value = true
      const handler = jest.fn()

      try {
        trackError(parseError(503), handler)
      } finally {
        mockInIframe.value = false
      }

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  it('shows an HTML 503 while no maintenance notice is open', () => {
    const handler = jest.fn()

    trackError(parseError(503), handler)

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
