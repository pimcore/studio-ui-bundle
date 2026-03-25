/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isString, isUndefined } from 'lodash'
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
      return {
        title: errorKey,
        errorKey: errorMessage!
      }
    }

    if (!isEmpty(errorKey) && errorKey !== ErrorKeyTypes.GENERIC_ERROR && errorKey !== ErrorKeyTypes.INVALID_ARGUMENT) {
      return { errorKey: errorKey! }
    }

    if (!isEmpty(errorMessage)) { return errorMessage! }

    if (!isEmpty(errorValue)) { return errorValue! }
  }

  public getContent (): IErrorGetContent['data'] {
    if (!isEmpty(this.errorData)) {
      if (!isEmpty((this.errorData as Error)?.message)) {
        return (this.errorData as Error).message
      }

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
