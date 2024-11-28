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

import { useEffect } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { isEmpty, isString } from 'lodash'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

type UseApiErrorHandler = (errorData: FetchBaseQueryError | SerializedError | undefined | null) => void

interface IErrorData {
  detail: string
  message: string
}

const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

export const useApiErrorHandler: UseApiErrorHandler = (errorData) => {
  const modal = useAlertModal()

  const getErrorContent = (): string | null => {
    if (!isEmpty(errorData)) {
      if ('data' in errorData && !isEmpty((errorData.data as IErrorData)?.message)) {
        return (errorData.data as IErrorData)?.message
      }

      if ('error' in errorData && isString(errorData.error)) {
        return errorData.error
      }
    }

    return null
  }

  const handleErrorData = (): void => {
    const errorInfo = getErrorContent()
    const errorContent = errorInfo ?? DEFAULT_ERROR_CONTENT

    modal.error({ content: errorContent })
  }

  useEffect(() => {
    if (!isEmpty(errorData)) {
      handleErrorData()
    }
  }, [errorData, modal])
}
