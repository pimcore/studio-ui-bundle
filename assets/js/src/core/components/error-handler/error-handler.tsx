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
import { isEmpty, isObject } from 'lodash'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import type { IApiErrorData } from '@Pimcore/app/store/middleware/rtkQueryErrorLogger'

interface ErrorHandlerProps {
  errorData: IApiErrorData | null
  clear: () => void
}

const DEFAULT_ERROR_CONTENT = 'Something went wrong.'

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ errorData, clear }) => {
  const modal = useAlertModal()

  useEffect(() => {
    if (!isEmpty(errorData)) {
      const errorInfo = isObject(errorData?.data) && 'message' in errorData.data
        ? errorData.data.message
        : errorData?.error
      const errorContent = errorInfo ?? DEFAULT_ERROR_CONTENT

      modal.error({ content: errorContent })

      clear()
    }
  }, [errorData, modal])

  return null
}
