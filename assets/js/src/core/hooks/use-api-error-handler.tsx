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

import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { isEmpty, isString } from 'lodash'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

type ApiErrorData = FetchBaseQueryError | SerializedError

interface IUseApiErrorHandlerReturn {
  track: (errorData: ApiErrorData) => void
}

interface IApiErrorDetails {
  detail: string
  message: string
}

const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

export const useApiErrorHandler = (): IUseApiErrorHandlerReturn => {
  const modal = useAlertModal()

  const handleErrorData = (errorData: ApiErrorData): string => {
    if (!isEmpty(errorData)) {
      if ('data' in errorData && !isEmpty((errorData.data as IApiErrorDetails)?.message)) {
        return (errorData.data as IApiErrorDetails)?.message
      }

      if ('error' in errorData && isString(errorData.error)) {
        return errorData.error
      }
    }

    return DEFAULT_ERROR_CONTENT
  }

  const track = (errorData: ApiErrorData): void => {
    const errorContent = handleErrorData(errorData)

    modal.error({ content: errorContent })
  }

  return {
    track
  }
}
