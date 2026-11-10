/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import ApiError, { DEFAULT_ERROR_CONTENT } from './api-error'
import type { ApiErrorData } from '@Pimcore/modules/app/error-handler/types'

const htmlBody = '<html><body><h1>502 Bad Gateway</h1></body></html>'
const syntaxError = 'SyntaxError: Unexpected token \'<\', "<html><bod"... is not valid JSON'

const apiError = (errorData: object): ApiError => new ApiError(errorData as ApiErrorData)

describe('ApiError', () => {
  describe('getContent', () => {
    it('reports the HTTP status when the response body is not valid JSON', () => {
      const error = apiError({
        status: 'PARSING_ERROR',
        originalStatus: 502,
        data: htmlBody,
        error: syntaxError
      })

      expect(error.getContent()).toEqual({ errorKey: 'error_response_not_json_with_status', params: { status: 502 } })
    })

    it('reports an unexpected status 200 response, e.g. an HTML page instead of JSON', () => {
      const error = apiError({
        status: 'PARSING_ERROR',
        originalStatus: 200,
        data: htmlBody,
        error: syntaxError
      })

      expect(error.getContent()).toEqual({ errorKey: 'error_response_not_json_with_status', params: { status: 200 } })
    })

    it('still gives a readable message when the parse error carries no HTTP status', () => {
      const error = apiError({
        status: 'PARSING_ERROR',
        data: htmlBody,
        error: syntaxError
      })

      expect(error.getContent()).toEqual({ errorKey: 'error_response_not_json' })
    })

    it('never exposes the raw response body', () => {
      const error = apiError({
        status: 'PARSING_ERROR',
        originalStatus: 502,
        data: htmlBody,
        error: syntaxError
      })

      expect(JSON.stringify(error.getContent())).not.toContain('<')
    })

    it('keeps returning the message of a regular API error', () => {
      const error = apiError({
        status: 400,
        data: { message: 'Invalid argument' }
      })

      expect(error.getContent()).toBe('Invalid argument')
    })

    it('keeps returning the error string of other fetch errors', () => {
      const error = apiError({
        status: 'FETCH_ERROR',
        error: 'TypeError: Failed to fetch'
      })

      expect(error.getContent()).toBe('TypeError: Failed to fetch')
    })

    it('falls back to the default content for an empty error', () => {
      expect(apiError({}).getContent()).toBe(DEFAULT_ERROR_CONTENT)
    })
  })
})
