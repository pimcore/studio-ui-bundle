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

import { isEmpty, isString } from 'lodash'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

type ApiErrorData = FetchBaseQueryError | SerializedError

interface IApiErrorDetails {
  detail?: string
  message?: string
  error?: string
}

const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

export class ApiError extends Error {
  private readonly errorData: ApiErrorData

  constructor (errorData: ApiErrorData) {
    super()

    this.errorData = errorData
  }

  public getContent (): string {
    if (!isEmpty(this.errorData)) {
      if (!isEmpty((this.errorData as Error)?.message)) {
        return (this.errorData as Error).message
      }

      if ('data' in this.errorData && !isEmpty((this.errorData.data as IApiErrorDetails)?.message)) {
        return (this.errorData.data as IApiErrorDetails).message!
      }

      if ('data' in this.errorData && !isEmpty((this.errorData.data as IApiErrorDetails)?.error)) {
        return (this.errorData.data as IApiErrorDetails).error!
      }

      if ('error' in this.errorData && isString(this.errorData.error)) {
        return this.errorData.error
      }
    }

    return DEFAULT_ERROR_CONTENT
  }
}
