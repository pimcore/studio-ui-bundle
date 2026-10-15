/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isNumber, isString, isUndefined } from 'lodash'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'
import { type ApiErrorData, type IApiErrorDetails, type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'

export const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

class ApiError extends Error {
  private readonly errorData: ApiErrorData

  constructor (errorData: ApiErrorData) {
    super()

    this.errorData = errorData
  }

  private handleApiErrorDetails (errorData: IApiErrorDetails): IErrorGetContent['data'] | undefined {
    const errorKey = errorData?.errorKey
    const errorMessage = errorData?.message
    const errorValue = errorData?.error

    if (!isEmpty(errorKey) && errorKey === ErrorKeyTypes.ELEMENT_VALIDATION_FAILED) {
      // `errorKey` keeps carrying the message for SDK consumers that read it; render `message` instead.
      return {
        title: errorKey,
        errorKey: errorMessage!,
        message: errorMessage,
        ...(isEmpty(errorData.validationErrors) ? {} : { validationErrors: errorData.validationErrors })
      }
    }

    if (!isEmpty(errorKey) && errorKey !== ErrorKeyTypes.GENERIC_ERROR && errorKey !== ErrorKeyTypes.INVALID_ARGUMENT) {
      return { errorKey: errorKey! }
    }

    if (!isEmpty(errorMessage)) { return errorMessage! }

    if (!isEmpty(errorValue)) { return errorValue! }
  }

  /**
   * RTK Query reports a response whose body is not JSON (e.g. an HTML error page from a proxy
   * or a PHP fatal error) as a `PARSING_ERROR` whose `error` is only the JSON parser's
   * `SyntaxError`. That says nothing about what went wrong, so a translatable message carrying
   * the HTTP status is returned instead. The raw body is deliberately not shown.
   */
  private getParsingErrorContent (): IErrorGetContent['data'] | undefined {
    if (!('status' in this.errorData) || this.errorData.status !== 'PARSING_ERROR') {
      return undefined
    }

    const originalStatus = (this.errorData as { originalStatus?: unknown }).originalStatus

    return isNumber(originalStatus)
      ? { errorKey: 'error_response_not_json_with_status', params: { status: originalStatus } }
      : { errorKey: 'error_response_not_json' }
  }

  public getContent (): IErrorGetContent['data'] {
    if (!isEmpty(this.errorData)) {
      if (!isEmpty((this.errorData as Error)?.message)) {
        return (this.errorData as Error).message
      }

      const parsingErrorContent = this.getParsingErrorContent()

      if (!isUndefined(parsingErrorContent)) return parsingErrorContent

      if ('data' in this.errorData) {
        const apiErrorDetails = this.handleApiErrorDetails(this.errorData.data as IApiErrorDetails)

        if (!isUndefined(apiErrorDetails)) return apiErrorDetails
      }

      if ('error' in this.errorData && isString(this.errorData.error)) {
        return this.errorData.error
      }
    }

    return DEFAULT_ERROR_CONTENT
  }
}

export default ApiError

/** Narrows an unknown caught value to the ApiErrorData shape accepted by the ApiError constructor. */
export function isApiErrorData (error: unknown): error is ConstructorParameters<typeof ApiError>[0] {
  return typeof error === 'object' && error !== null && !(error instanceof Error)
}
