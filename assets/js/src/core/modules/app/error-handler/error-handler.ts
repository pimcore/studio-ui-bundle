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

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { isFunction } from 'lodash'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import { GeneralError } from '@Pimcore/modules/app/error-handler/classes/general-error'
import { ApiError } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { type ErrorTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'

interface ITrackProps {
  errorType: keyof typeof ErrorTypes
  errorData: FetchBaseQueryError | SerializedError | string
}

const ERROR_HANDLERS_LIST: Record<ITrackProps['errorType'], (errorData: ITrackProps['errorData']) => void> = {
  API_ERROR: (errorData: FetchBaseQueryError | SerializedError) => {
    const error = new ApiError(errorData)

    ErrorModalService.showError(error.getContent())
  },
  GENERAL_ERROR: (errorData: string) => {
    const error = new GeneralError(errorData)

    ErrorModalService.showError(error.getContent())
  }
}

export const trackError = ({ errorType, errorData }: ITrackProps): void => {
  const errorHandler = ERROR_HANDLERS_LIST[errorType]

  if (isFunction(errorHandler)) {
    errorHandler(errorData)
  } else {
    console.error(`Unhandled error type: ${errorType}`)
  }
}
