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

import type React from 'react'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { type MutationResultSelectorResult } from '@reduxjs/toolkit/query'

interface IUseApiErrorHandlerProps {
  errorData: MutationResultSelectorResult<any>
  withAlert?: boolean
}

interface ErrorData {
  status: number
  data: {
    detail: string
    message: string
  }
}

const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

export const useApiErrorHandler: React.FC<IUseApiErrorHandlerProps> = ({ errorData, withAlert = false }) => {
  const modal = useAlertModal()

  const handleErrorData = (): void => {
    const errorInfo = (errorData?.error as ErrorData).data?.message
    const errorContent = errorInfo ?? DEFAULT_ERROR_CONTENT

    withAlert && modal.error({ content: errorContent })
  }

  useEffect(() => {
    if (!isEmpty(errorData) && errorData.isError) {
      handleErrorData()
    }
  }, [errorData, modal])

  return null
}
