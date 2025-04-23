/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { isEmpty, isString, isUndefined } from 'lodash'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'

export type ApiErrorData = FetchBaseQueryError | SerializedError

export interface IApiErrorDetails {
  detail?: string
  errorKey?: string
  message?: string
  error?: string
}

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

    if (!isEmpty(errorKey) && errorKey !== ErrorKeyTypes.GENERIC_ERROR) {
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
